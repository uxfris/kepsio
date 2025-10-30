import { TeamPageWrapper } from "../../../components/team/TeamPageWrapper";
import type {
  TeamMember,
  PendingInvite,
  SharedCaption,
} from "../../../types/team";
import { ToastProvider } from "../../../components/ui/Toast";
import { getServerUser } from "../../../lib/auth/server";
import { prisma } from "../../../lib/db/prisma";
import { redirect } from "next/navigation";

async function getTeamData(userId: string) {
  try {
    // Fetch team members with their user data and caption counts
    const teamMembers = await prisma.$queryRaw<
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
      WHERE tm."userId" = ${userId}::uuid OR tm."userId" IN (
        SELECT "userId" FROM team_members WHERE "userId" = ${userId}::uuid
      )
      GROUP BY tm.id, tm."userId", tm.role, tm.status, tm."joinedAt", tm."lastActiveAt", u.name, u.email
      ORDER BY tm."joinedAt" ASC
    `;

    // If no team members exist, create owner entry for current user
    if (teamMembers.length === 0) {
      await prisma.$executeRaw`
        INSERT INTO team_members ("userId", role, status, "joinedAt", "lastActiveAt", "createdAt", "updatedAt")
        VALUES (${userId}::uuid, 'owner', 'active', NOW(), NOW(), NOW(), NOW())
        ON CONFLICT DO NOTHING
      `;

      // Fetch again after creating
      return getTeamData(userId);
    }

    // Fetch pending invites
    const invites = await prisma.$queryRaw<
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
    `;

    // Fetch shared captions
    const sharedCaptions = await prisma.$queryRaw<
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
      WHERE sc."sharedBy" = ${userId}::uuid 
         OR ${userId}::uuid = ANY(sc."sharedWith")
      GROUP BY sc.id, c.content, sc.status, sc."createdAt", sc."sharedBy", u.name, sc."sharedWith"
      ORDER BY sc."createdAt" DESC
    `;

    // Format team members
    const formattedMembers: TeamMember[] = teamMembers.map((member) => ({
      id: member.id,
      name: member.name || "Unknown",
      email: member.email,
      role: member.role as any,
      avatar:
        member.name
          ?.split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase() || "U",
      status: member.status as any,
      joinedDate: new Date(member.joinedAt).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      }),
      captionsCreated: Number(member.captionsCreated),
      lastActive: getLastActiveText(member.lastActiveAt || member.joinedAt),
    }));

    // Format invites
    const formattedInvites: PendingInvite[] = invites.map((invite) => ({
      id: invite.id,
      email: invite.email,
      role: invite.role as any,
      sentBy: invite.inviterName || "Unknown",
      sentDate: getTimeAgo(invite.createdAt),
    }));

    // Format shared captions
    const formattedCaptions: SharedCaption[] = await Promise.all(
      sharedCaptions.map(async (caption) => {
        // Get names of users shared with
        const sharedWithNames = await prisma.$queryRaw<
          Array<{ name: string | null }>
        >`
          SELECT name FROM users WHERE id = ANY(${caption.sharedWith}::uuid[])
        `;

        return {
          id: caption.id,
          text: caption.captionContent,
          createdBy: caption.sharedByName || "Unknown",
          createdDate: getTimeAgo(caption.createdAt),
          status: caption.status as any,
          comments: Number(caption.commentCount),
          sharedWith: sharedWithNames.map((u) => u.name || "Unknown"),
        };
      })
    );

    return {
      teamMembers: formattedMembers,
      pendingInvites: formattedInvites,
      sharedCaptions: formattedCaptions,
    };
  } catch (error) {
    console.error("Failed to fetch team data:", error);
    return {
      teamMembers: [] as TeamMember[],
      pendingInvites: [] as PendingInvite[],
      sharedCaptions: [] as SharedCaption[],
    };
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

export default async function TeamPage() {
  const user = await getServerUser();

  if (!user) {
    redirect("/login");
  }

  const { teamMembers, pendingInvites, sharedCaptions } = await getTeamData(
    user.id
  );

  // Get current user's role
  const currentUserMember = teamMembers.find((m) => m.email === user.email);
  const currentUserRole = currentUserMember?.role || "viewer";

  return (
    <ToastProvider>
      <TeamPageWrapper
        initialTeamMembers={teamMembers}
        initialPendingInvites={pendingInvites}
        initialSharedCaptions={sharedCaptions}
        currentUserRole={currentUserRole}
      />
    </ToastProvider>
  );
}
