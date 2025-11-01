import { NextRequest, NextResponse } from "next/server";
import { getServerUser } from "@/lib/auth/server";
import { prisma } from "@/lib/db/prisma";

/**
 * GET /api/team/data
 * Fetches all team-related data (members, invites, shared captions)
 */
export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const user = await getServerUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Run all queries in parallel for better performance
    const [teamMembers, invites, sharedCaptions] = await Promise.all([
      // Fetch team members with their user data and caption counts
      prisma.$queryRaw<
        Array<{
          id: string;
          userId: string;
          role: string;
          status: string;
          joinedAt: Date;
          lastActiveAt: Date | null;
          name: string | null;
          email: string;
          captionsCreated: bigint;
        }>
      >`
        SELECT 
          tm.id,
          tm."userId",
          tm.role,
          tm.status,
          tm."joinedAt",
          tm."lastActiveAt",
          u.name,
          u.email,
          COALESCE(COUNT(c.id), 0) as "captionsCreated"
        FROM team_members tm
        INNER JOIN users u ON tm."userId" = u.id
        LEFT JOIN captions c ON c."userId" = u.id
        WHERE tm."userId" = ${user.id}::uuid
        GROUP BY tm.id, tm."userId", tm.role, tm.status, tm."joinedAt", tm."lastActiveAt", u.name, u.email
        ORDER BY tm."joinedAt" ASC
      `,

      // Fetch pending invites
      prisma.$queryRaw<
        Array<{
          id: string;
          email: string;
          role: string;
          createdAt: Date;
          inviterName: string | null;
        }>
      >`
        SELECT 
          ti.id,
          ti.email,
          ti.role,
          ti."createdAt",
          u.name as "inviterName"
        FROM team_invites ti
        INNER JOIN users u ON ti."invitedBy" = u.id
        WHERE ti.status = 'pending' AND ti."expiresAt" > NOW()
        ORDER BY ti."createdAt" DESC
      `,

      // Fetch shared captions
      prisma.$queryRaw<
        Array<{
          id: string;
          captionContent: string;
          status: string;
          createdAt: Date;
          sharedBy: string;
          sharedByName: string | null;
          sharedWith: string[];
          commentCount: bigint;
        }>
      >`
        SELECT 
          sc.id,
          c.content as "captionContent",
          sc.status,
          sc."createdAt",
          sc."sharedBy",
          u.name as "sharedByName",
          sc."sharedWith",
          COALESCE(COUNT(cc.id), 0) as "commentCount"
        FROM shared_captions sc
        INNER JOIN captions c ON sc."captionId" = c.id
        INNER JOIN users u ON sc."sharedBy" = u.id
        LEFT JOIN caption_comments cc ON cc."sharedCaptionId" = sc.id
        WHERE sc."sharedBy" = ${user.id}::uuid 
           OR ${user.id}::uuid = ANY(sc."sharedWith")
        GROUP BY sc.id, c.content, sc.status, sc."createdAt", sc."sharedBy", u.name, sc."sharedWith"
        ORDER BY sc."createdAt" DESC
      `,
    ]);

    // If no team members exist, create owner entry for current user
    if (teamMembers.length === 0) {
      await prisma.$executeRaw`
        INSERT INTO team_members ("userId", role, status, "joinedAt", "lastActiveAt", "createdAt", "updatedAt")
        VALUES (${user.id}::uuid, 'owner', 'active', NOW(), NOW(), NOW(), NOW())
        ON CONFLICT DO NOTHING
      `;

      // Return recursive call to get the newly created member
      const response = await GET(req);
      return response;
    }

    // Collect all unique user IDs from sharedWith arrays (Fix N+1 query)
    const allSharedUserIds = Array.from(
      new Set(sharedCaptions.flatMap((caption) => caption.sharedWith))
    );

    // Fetch all shared user names in one query
    let sharedUserMap = new Map<string, string>();
    if (allSharedUserIds.length > 0) {
      const sharedUsers = await prisma.$queryRaw<
        Array<{ id: string; name: string | null }>
      >`
        SELECT id, name FROM users WHERE id = ANY(${allSharedUserIds}::uuid[])
      `;
      sharedUserMap = new Map(
        sharedUsers.map((u) => [u.id, u.name || "Unknown"])
      );
    }

    // Format team members
    const formattedMembers = teamMembers.map((member) => ({
      id: member.id,
      name: member.name || "Unknown",
      email: member.email,
      role: member.role,
      avatar:
        member.name
          ?.split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase() || "U",
      status: member.status,
      joinedDate: new Date(member.joinedAt).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      }),
      captionsCreated: Number(member.captionsCreated),
      lastActive: getLastActiveText(member.lastActiveAt || member.joinedAt),
    }));

    // Format invites
    const formattedInvites = invites.map((invite) => ({
      id: invite.id,
      email: invite.email,
      role: invite.role,
      sentBy: invite.inviterName || "Unknown",
      sentDate: getTimeAgo(invite.createdAt),
    }));

    // Format shared captions (no more N+1 query!)
    const formattedCaptions = sharedCaptions.map((caption) => ({
      id: caption.id,
      text: caption.captionContent,
      createdBy: caption.sharedByName || "Unknown",
      createdDate: getTimeAgo(caption.createdAt),
      status: caption.status,
      comments: Number(caption.commentCount),
      sharedWith: caption.sharedWith.map(
        (userId) => sharedUserMap.get(userId) || "Unknown"
      ),
    }));

    // Get current user's role
    const currentUserMember = formattedMembers.find(
      (m) => m.email === user.email
    );
    const currentUserRole = currentUserMember?.role || "viewer";

    return NextResponse.json({
      teamMembers: formattedMembers,
      pendingInvites: formattedInvites,
      sharedCaptions: formattedCaptions,
      currentUserRole,
    });
  } catch (error) {
    console.error("Failed to fetch team data:", error);
    return NextResponse.json(
      { error: "Failed to fetch team data" },
      { status: 500 }
    );
  }
}

function getLastActiveText(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - new Date(date).getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(hours / 24);

  if (hours < 1) return "Just now";
  if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;
  if (days < 30)
    return `${Math.floor(days / 7)} week${
      Math.floor(days / 7) > 1 ? "s" : ""
    } ago`;
  return `${Math.floor(days / 30)} month${
    Math.floor(days / 30) > 1 ? "s" : ""
  } ago`;
}

function getTimeAgo(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - new Date(date).getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;
  if (days < 30)
    return `${Math.floor(days / 7)} week${
      Math.floor(days / 7) > 1 ? "s" : ""
    } ago`;
  return `${Math.floor(days / 30)} month${
    Math.floor(days / 30) > 1 ? "s" : ""
  } ago`;
}
