import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { getServerUser } from "@/lib/auth/server";

export async function GET(req: NextRequest) {
  try {
    const user = await getServerUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch shared captions with related data
    const sharedCaptions = await prisma.$queryRaw<
      Array<{
        id: string;
        captionContent: string;
        status: string;
        createdAt: Date;
        sharedBy: string;
        sharedByName: string | null;
        sharedWith: string[];
        commentCount: number;
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
        COALESCE(COUNT(cc.id), 0)::int as "commentCount"
      FROM shared_captions sc
      INNER JOIN captions c ON sc."captionId" = c.id
      INNER JOIN users u ON sc."sharedBy" = u.id
      LEFT JOIN caption_comments cc ON cc."sharedCaptionId" = sc.id
      WHERE sc."sharedBy" = ${user.id}::uuid 
         OR ${user.id}::uuid = ANY(sc."sharedWith")
      GROUP BY sc.id, c.content, sc.status, sc."createdAt", sc."sharedBy", u.name, sc."sharedWith"
      ORDER BY sc."createdAt" DESC
    `;

    // Format response
    const formattedCaptions = await Promise.all(
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
          status: caption.status,
          comments: caption.commentCount,
          sharedWith: sharedWithNames.map((u) => u.name || "Unknown"),
        };
      })
    );

    return NextResponse.json({ captions: formattedCaptions });
  } catch (error) {
    console.error("Failed to fetch shared captions:", error);
    return NextResponse.json(
      { error: "Failed to fetch shared captions" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getServerUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { captionId, sharedWith } = await req.json();

    if (!captionId || !sharedWith || !Array.isArray(sharedWith)) {
      return NextResponse.json(
        { error: "Caption ID and shared with users are required" },
        { status: 400 }
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

export async function PATCH(req: NextRequest) {
  try {
    const user = await getServerUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { sharedCaptionId, status } = await req.json();

    if (!sharedCaptionId || !status) {
      return NextResponse.json(
        { error: "Shared caption ID and status are required" },
        { status: 400 }
      );
    }

    // Validate status
    if (!["approved", "needs-changes", "pending-review"].includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    // Update status
    await prisma.$executeRaw`
      UPDATE shared_captions
      SET status = ${status}, "updatedAt" = NOW()
      WHERE id = ${sharedCaptionId}
    `;

    return NextResponse.json({
      success: true,
      message: "Caption status updated successfully",
    });
  } catch (error) {
    console.error("Failed to update caption status:", error);
    return NextResponse.json(
      { error: "Failed to update caption status" },
      { status: 500 }
    );
  }
}

function getTimeAgo(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - new Date(date).getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(hours / 24);

  if (hours < 1) return "Just now";
  if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;
  return `${Math.floor(days / 7)} week${
    Math.floor(days / 7) > 1 ? "s" : ""
  } ago`;
}
