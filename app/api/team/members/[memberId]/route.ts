import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { getServerUser } from "@/lib/auth/server";

// Update member role
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ memberId: string }> }
) {
  try {
    const user = await getServerUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { role } = await req.json();
    const { memberId } = await params;

    if (!role || !["owner", "admin", "editor", "viewer"].includes(role)) {
      return NextResponse.json({ error: "Invalid role" }, { status: 400 });
    }

    // Check current user's permissions
    const currentUserMember = await prisma.$queryRaw<Array<{ role: string }>>`
      SELECT role FROM team_members WHERE "userId" = ${user.id}::uuid LIMIT 1
    `;

    if (currentUserMember.length === 0) {
      return NextResponse.json(
        { error: "You are not a team member" },
        { status: 403 }
      );
    }

    const currentUserRole = currentUserMember[0].role;

    // Get the member being updated
    const targetMember = await prisma.$queryRaw<Array<{ role: string }>>`
      SELECT role FROM team_members WHERE id = ${memberId} LIMIT 1
    `;

    if (targetMember.length === 0) {
      return NextResponse.json({ error: "Member not found" }, { status: 404 });
    }

    // Permission checks
    if (currentUserRole !== "owner") {
      if (targetMember[0].role === "owner") {
        return NextResponse.json(
          { error: "Only owners can modify owner roles" },
          { status: 403 }
        );
      }
      if (currentUserRole !== "admin") {
        return NextResponse.json(
          { error: "You don't have permission to change roles" },
          { status: 403 }
        );
      }
    }

    // Update the role
    await prisma.$executeRaw`
      UPDATE team_members
      SET role = ${role}, "updatedAt" = NOW()
      WHERE id = ${memberId}
    `;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to update member role:", error);
    return NextResponse.json(
      { error: "Failed to update member role" },
      { status: 500 }
    );
  }
}

// Remove member from team
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ memberId: string }> }
) {
  try {
    const user = await getServerUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { memberId } = await params;

    // Check current user's permissions
    const currentUserMember = await prisma.$queryRaw<Array<{ role: string }>>`
      SELECT role FROM team_members WHERE "userId" = ${user.id}::uuid LIMIT 1
    `;

    if (currentUserMember.length === 0) {
      return NextResponse.json(
        { error: "You are not a team member" },
        { status: 403 }
      );
    }

    const currentUserRole = currentUserMember[0].role;

    // Get the member being removed
    const targetMember = await prisma.$queryRaw<Array<{ role: string }>>`
      SELECT role FROM team_members WHERE id = ${memberId} LIMIT 1
    `;

    if (targetMember.length === 0) {
      return NextResponse.json({ error: "Member not found" }, { status: 404 });
    }

    // Permission checks
    if (targetMember[0].role === "owner") {
      return NextResponse.json(
        { error: "Cannot remove the owner" },
        { status: 403 }
      );
    }

    if (currentUserRole === "admin" && targetMember[0].role === "admin") {
      return NextResponse.json(
        { error: "Admins cannot remove other admins" },
        { status: 403 }
      );
    }

    if (currentUserRole !== "owner" && currentUserRole !== "admin") {
      return NextResponse.json(
        { error: "You don't have permission to remove members" },
        { status: 403 }
      );
    }

    // Delete the member
    await prisma.$executeRaw`
      DELETE FROM team_members WHERE id = ${memberId}
    `;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to remove member:", error);
    return NextResponse.json(
      { error: "Failed to remove member" },
      { status: 500 }
    );
  }
}
