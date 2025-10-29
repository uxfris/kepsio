import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { getServerUser } from "@/lib/auth/server";

export async function GET(req: NextRequest) {
  try {
    const user = await getServerUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

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
        captionsCreated: number;
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
        COALESCE(COUNT(c.id), 0)::int as "captionsCreated"
      FROM team_members tm
      INNER JOIN users u ON tm."userId" = u.id
      LEFT JOIN captions c ON c."userId" = u.id
      WHERE tm."userId" = ${user.id}::uuid OR tm."userId" IN (
        SELECT "userId" FROM team_members WHERE "userId" = ${user.id}::uuid
      )
      GROUP BY tm.id, tm."userId", tm.role, tm.status, tm."joinedAt", tm."lastActiveAt", u.name, u.email
      ORDER BY tm."joinedAt" ASC
    `;

    // If no team members exist, create owner entry for current user
    if (teamMembers.length === 0) {
      await prisma.$executeRaw`
        INSERT INTO team_members ("userId", role, status, "joinedAt", "lastActiveAt", "createdAt", "updatedAt")
        VALUES (${user.id}::uuid, 'owner', 'active', NOW(), NOW(), NOW(), NOW())
        ON CONFLICT DO NOTHING
      `;

      // Fetch again after creating
      return GET(req);
    }

    // Format response
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
      captionsCreated: member.captionsCreated,
      lastActive: getLastActiveText(member.lastActiveAt || member.joinedAt),
    }));

    return NextResponse.json({ members: formattedMembers });
  } catch (error) {
    console.error("Failed to fetch team members:", error);
    return NextResponse.json(
      { error: "Failed to fetch team members" },
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
