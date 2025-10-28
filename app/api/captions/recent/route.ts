import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getUserCaptions } from "@/lib/db/queries/captions";

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const limit = parseInt(searchParams.get("limit") || "10");

    const captions = await getUserCaptions(user.id, limit);

    // Transform captions for the frontend
    const transformedCaptions = captions.map((caption) => {
      // Use platform from database or fall back to context/default
      let platform = caption.platform || "instagram";

      // Use style from database or determine from content
      let style = caption.style || determineStyle(caption.content);

      // Calculate time ago
      const timeAgo = getTimeAgo(caption.createdAt);

      return {
        id: caption.id,
        snippet:
          caption.content.substring(0, 80) +
          (caption.content.length > 80 ? "..." : ""),
        fullText: caption.content,
        date: timeAgo,
        platform,
        style,
        createdAt: caption.createdAt,
        metadata: caption.metadata,
        isSaved: caption.isSaved,
      };
    });

    return NextResponse.json({
      success: true,
      captions: transformedCaptions,
    });
  } catch (error) {
    console.error("Error fetching recent captions:", error);
    return NextResponse.json(
      { error: "Failed to fetch captions" },
      { status: 500 }
    );
  }
}

function determineStyle(content: string): string {
  const lowerContent = content.toLowerCase();

  if (content.includes("?")) {
    return "Question-based";
  } else if (lowerContent.includes("tip") || lowerContent.includes("how to")) {
    return "Educational";
  } else if (
    lowerContent.includes("story") ||
    lowerContent.includes("journey")
  ) {
    return "Story-driven";
  } else if (lowerContent.includes("behind") || lowerContent.includes("bts")) {
    return "Behind the Scenes";
  } else if (
    content.split("\n").filter((line) => line.trim().match(/^\d+\./)).length > 2
  ) {
    return "Listicle";
  } else if (
    lowerContent.includes("exciting") ||
    lowerContent.includes("announcing")
  ) {
    return "Teaser";
  } else if (
    lowerContent.includes("think") ||
    lowerContent.includes("believe")
  ) {
    return "Thought Leadership";
  } else if (
    lowerContent.includes("relatable") ||
    lowerContent.includes("feeling")
  ) {
    return "Relatable";
  } else {
    return "Engagement";
  }
}

function getTimeAgo(date: Date): string {
  const now = new Date();
  const diffInMs = now.getTime() - new Date(date).getTime();
  const diffInMinutes = Math.floor(diffInMs / 60000);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes !== 1 ? "s" : ""} ago`;
  } else if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours !== 1 ? "s" : ""} ago`;
  } else if (diffInDays === 1) {
    return "Yesterday";
  } else if (diffInDays < 7) {
    return `${diffInDays} days ago`;
  } else if (diffInDays < 30) {
    const weeks = Math.floor(diffInDays / 7);
    return `${weeks} week${weeks !== 1 ? "s" : ""} ago`;
  } else {
    const months = Math.floor(diffInDays / 30);
    return `${months} month${months !== 1 ? "s" : ""} ago`;
  }
}
