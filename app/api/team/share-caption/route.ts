import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { getServerUser } from "@/lib/auth/server";

export async function POST(req: NextRequest) {
  try {
    const user = await getServerUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { captionId, sharedWith, message } = await req.json();

    if (!captionId || !sharedWith || !Array.isArray(sharedWith)) {
      return NextResponse.json(
        { error: "Caption ID and shared with users are required" },
        { status: 400 }
      );
    }

    // Verify caption exists and belongs to user
    const caption = await prisma.caption.findFirst({
      where: {
        id: captionId,
        userId: user.id,
      },
    });

    if (!caption) {
      return NextResponse.json({ error: "Caption not found" }, { status: 404 });
    }

    // Check if user is a team member
    const teamMember = await prisma.$queryRaw<Array<{ role: string }>>`
      SELECT role FROM team_members WHERE "userId" = ${user.id}::uuid LIMIT 1
    `;

    if (teamMember.length === 0) {
      return NextResponse.json(
        { error: "You are not a team member" },
        { status: 403 }
      );
    }

    // Create shared caption
    await prisma.$executeRaw`
      INSERT INTO shared_captions ("captionId", "sharedBy", "sharedWith", "createdAt", "updatedAt")
      VALUES (${captionId}, ${user.id}::uuid, ${sharedWith}::uuid[], NOW(), NOW())
    `;

    return NextResponse.json({
      success: true,
      message: "Caption shared successfully",
    });
  } catch (error) {
    console.error("Failed to share caption:", error);
    return NextResponse.json(
      { error: "Failed to share caption" },
      { status: 500 }
    );
  }
}

