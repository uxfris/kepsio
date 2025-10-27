import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

// GET - Fetch all training samples for the user's voice profile
export async function GET() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch user's voice profile with examples
    const voiceProfile = await prisma.voiceProfile.findFirst({
      where: { userId: user.id },
      select: {
        examples: true,
        platformId: true,
      },
    });

    // Transform examples array into structured data
    const trainingSamples = (voiceProfile?.examples || []).map(
      (text, index) => ({
        id: index,
        text,
        platform: voiceProfile?.platformId || "unknown",
        date: "Recently added", // We could enhance this by storing timestamps
      })
    );

    return NextResponse.json({
      samples: trainingSamples,
      count: trainingSamples.length,
    });
  } catch (error) {
    console.error("Error fetching training samples:", error);
    return NextResponse.json(
      { error: "Failed to fetch training samples" },
      { status: 500 }
    );
  }
}

// POST - Add new training samples
export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { captions } = await request.json();

    if (!captions || typeof captions !== "string") {
      return NextResponse.json(
        { error: "Invalid captions data" },
        { status: 400 }
      );
    }

    // Parse captions (one per line)
    const newExamples = captions
      .split("\n")
      .map((line: string) => line.trim())
      .filter((line: string) => line.length > 0);

    if (newExamples.length === 0) {
      return NextResponse.json(
        { error: "No valid captions provided" },
        { status: 400 }
      );
    }

    // Find or create voice profile
    let voiceProfile = await prisma.voiceProfile.findFirst({
      where: { userId: user.id },
    });

    if (!voiceProfile) {
      // Create a new voice profile if one doesn't exist
      voiceProfile = await prisma.voiceProfile.create({
        data: {
          userId: user.id,
          name: "Brand Voice",
          description: "Your brand voice profile",
          style: "default",
          examples: newExamples,
        },
      });
    } else {
      // Update existing voice profile by appending new examples
      const currentExamples = voiceProfile.examples || [];
      const maxExamples = 50; // Set a reasonable limit
      const updatedExamples = [...currentExamples, ...newExamples].slice(
        -maxExamples
      );

      voiceProfile = await prisma.voiceProfile.update({
        where: { id: voiceProfile.id },
        data: {
          examples: updatedExamples,
        },
      });
    }

    return NextResponse.json({
      success: true,
      count: newExamples.length,
      totalExamples: voiceProfile.examples.length,
    });
  } catch (error) {
    console.error("Error adding training samples:", error);
    return NextResponse.json(
      { error: "Failed to add training samples" },
      { status: 500 }
    );
  }
}

// DELETE - Remove a training sample by index
export async function DELETE(request: Request) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const indexStr = searchParams.get("index");

    if (indexStr === null) {
      return NextResponse.json(
        { error: "Sample index is required" },
        { status: 400 }
      );
    }

    const index = parseInt(indexStr, 10);

    if (isNaN(index) || index < 0) {
      return NextResponse.json({ error: "Invalid index" }, { status: 400 });
    }

    // Find voice profile
    const voiceProfile = await prisma.voiceProfile.findFirst({
      where: { userId: user.id },
    });

    if (!voiceProfile) {
      return NextResponse.json(
        { error: "Voice profile not found" },
        { status: 404 }
      );
    }

    // Remove the example at the specified index
    const updatedExamples = [...voiceProfile.examples];
    if (index >= updatedExamples.length) {
      return NextResponse.json(
        { error: "Index out of bounds" },
        { status: 400 }
      );
    }

    updatedExamples.splice(index, 1);

    // Update the voice profile
    await prisma.voiceProfile.update({
      where: { id: voiceProfile.id },
      data: {
        examples: updatedExamples,
      },
    });

    return NextResponse.json({
      success: true,
      remainingExamples: updatedExamples.length,
    });
  } catch (error) {
    console.error("Error removing training sample:", error);
    return NextResponse.json(
      { error: "Failed to remove training sample" },
      { status: 500 }
    );
  }
}
