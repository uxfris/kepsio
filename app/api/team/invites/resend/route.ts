import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { getServerUser } from "@/lib/auth/server";

export async function POST(req: NextRequest) {
  try {
    const user = await getServerUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { inviteId } = await req.json();

    if (!inviteId) {
      return NextResponse.json(
        { error: "Invite ID is required" },
        { status: 400 }
      );
    }

    // Update the expiration date
    const newExpiresAt = new Date();
    newExpiresAt.setDate(newExpiresAt.getDate() + 7);

    await prisma.$executeRaw`
      UPDATE team_invites
      SET "expiresAt" = ${newExpiresAt}, "updatedAt" = NOW()
      WHERE id = ${inviteId} AND "invitedBy" = ${user.id}::uuid
    `;

    // TODO: Resend email invitation

    return NextResponse.json({
      success: true,
      message: "Invitation resent successfully",
    });
  } catch (error) {
    console.error("Failed to resend invitation:", error);
    return NextResponse.json(
      { error: "Failed to resend invitation" },
      { status: 500 }
    );
  }
}
