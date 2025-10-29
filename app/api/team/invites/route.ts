import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { getServerUser } from "@/lib/auth/server";

export async function GET(req: NextRequest) {
  try {
    const user = await getServerUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch pending invites with inviter information
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

    // Format response
    const formattedInvites = invites.map((invite) => ({
      id: invite.id,
      email: invite.email,
      role: invite.role,
      sentBy: invite.inviterName || "Unknown",
      sentDate: getTimeAgo(invite.createdAt),
    }));

    return NextResponse.json({ invites: formattedInvites });
  } catch (error) {
    console.error("Failed to fetch invites:", error);
    return NextResponse.json(
      { error: "Failed to fetch invites" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const user = await getServerUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const inviteId = searchParams.get("id");

    if (!inviteId) {
      return NextResponse.json(
        { error: "Invite ID is required" },
        { status: 400 }
      );
    }

    // Delete the invitation
    await prisma.$executeRaw`
      DELETE FROM team_invites
      WHERE id = ${inviteId} AND "invitedBy" = ${user.id}::uuid
    `;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete invitation:", error);
    return NextResponse.json(
      { error: "Failed to delete invitation" },
      { status: 500 }
    );
  }
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
