import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { updateCaption } from "@/lib/db/queries/captions";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { content } = body;

    if (!content || content.trim() === "") {
      return NextResponse.json(
        { error: "Caption content is required" },
        { status: 400 }
      );
    }

    const { id: captionId } = await params;
    const updatedCaption = await updateCaption(captionId, user.id, content);

    return NextResponse.json({
      success: true,
      caption: updatedCaption,
    });
  } catch (error) {
    console.error("Error updating caption:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Failed to update caption";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
