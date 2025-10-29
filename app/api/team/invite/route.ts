import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { getServerUser } from "@/lib/auth/server";
import { randomBytes } from "crypto";

export async function POST(req: NextRequest) {
  try {
    const user = await getServerUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { email, role } = await req.json();

    if (!email || !role) {
      return NextResponse.json(
        { error: "Email and role are required" },
        { status: 400 }
      );
    }

    // Validate role
    if (!["admin", "editor", "viewer"].includes(role)) {
      return NextResponse.json({ error: "Invalid role" }, { status: 400 });
    }

    // Check if user has permission to invite (must be owner or admin)
    const inviter = await prisma.$queryRaw<Array<{ role: string }>>`
      SELECT role FROM team_members WHERE "userId" = ${user.id}::uuid LIMIT 1
    `;

    if (inviter.length === 0 || !["owner", "admin"].includes(inviter[0].role)) {
      return NextResponse.json(
        { error: "You don't have permission to invite team members" },
        { status: 403 }
      );
    }

    // Check if user already exists in team
    const existingUser = await prisma.$queryRaw<Array<{ id: string }>>`
      SELECT u.id FROM users u
      INNER JOIN team_members tm ON tm."userId" = u.id
      WHERE u.email = ${email}
      LIMIT 1
    `;

    if (existingUser.length > 0) {
      return NextResponse.json(
        { error: "User is already a team member" },
        { status: 400 }
      );
    }

    // Check if there's already a pending invite
    const existingInvite = await prisma.$queryRaw<Array<{ id: string }>>`
      SELECT id FROM team_invites
      WHERE email = ${email} AND status = 'pending'
      LIMIT 1
    `;

    if (existingInvite.length > 0) {
      return NextResponse.json(
        { error: "An invitation has already been sent to this email" },
        { status: 400 }
      );
    }

    // Generate unique token
    const token = randomBytes(32).toString("hex");
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // Expires in 7 days

    // Create invitation
    await prisma.$executeRaw`
      INSERT INTO team_invites (email, role, "invitedBy", token, "expiresAt", "createdAt", "updatedAt")
      VALUES (${email}, ${role}, ${user.id}::uuid, ${token}, ${expiresAt}, NOW(), NOW())
    `;

    // TODO: Send email invitation with token
    // For now, we'll just return success

    return NextResponse.json({
      success: true,
      message: "Invitation sent successfully",
    });
  } catch (error) {
    console.error("Failed to send invitation:", error);
    return NextResponse.json(
      { error: "Failed to send invitation" },
      { status: 500 }
    );
  }
}
