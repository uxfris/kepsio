import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { toggleCaptionSaved } from "@/lib/db/queries/captions";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { captionId } = body;

    if (!captionId) {
      return NextResponse.json(
        { error: "Caption ID is required" },
        { status: 400 }
      );
    }

    const updatedCaption = await toggleCaptionSaved(captionId, user.id);

    return NextResponse.json({
      success: true,
      caption: updatedCaption,
      isSaved: updatedCaption.isSaved,
    });
  } catch (error) {
    console.error("Error toggling caption save status:", error);
    return NextResponse.json(
      { error: "Failed to update caption" },
      { status: 500 }
    );
  }
}
