import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { subscriptionPlans } from "@/config/plans";

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

    // Fetch user's voice profile with examples and platform details
    const voiceProfile = await prisma.voiceProfile.findFirst({
      where: { userId: user.id },
      select: {
        examples: true,
        platform: {
          select: {
            name: true,
          },
        },
      },
    });

    // Transform examples array into structured data
    const trainingSamples = (voiceProfile?.examples || []).map(
      (text, index) => ({
        id: index,
        text,
        platform: voiceProfile?.platform?.name || "general",
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

    // Check subscription to enforce voice profile limits
    const subscription = await prisma.subscription.findFirst({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    });

    const plan = subscription?.plan || "free";
    const planConfig =
      subscriptionPlans[plan as keyof typeof subscriptionPlans];
    const voiceProfileLimit = planConfig?.limits.voiceProfiles || 1;

    // Find or create voice profile
    let voiceProfile = await prisma.voiceProfile.findFirst({
      where: { userId: user.id },
    });

    if (!voiceProfile) {
      // Check if user can create a new voice profile
      const existingProfilesCount = await prisma.voiceProfile.count({
        where: { userId: user.id },
      });

      // For unlimited plans, limit is -1
      if (
        voiceProfileLimit !== -1 &&
        existingProfilesCount >= voiceProfileLimit
      ) {
        return NextResponse.json(
          {
            error: "Voice profile limit exceeded",
            message: `You've reached your limit of ${voiceProfileLimit} voice profile${
              voiceProfileLimit > 1 ? "s" : ""
            }. Upgrade to ${
              plan === "free" ? "Pro" : "Enterprise"
            } for more voice profiles.`,
            voiceProfileLimitReached: true,
            voiceProfiles: {
              used: existingProfilesCount,
              limit: voiceProfileLimit,
            },
            requiredPlan: plan === "free" ? "pro" : "enterprise",
          },
          { status: 429 }
        );
      }

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

// PUT - Update a training sample by index
export async function PUT(request: Request) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { index, text } = await request.json();

    if (typeof index !== "number" || index < 0) {
      return NextResponse.json({ error: "Invalid index" }, { status: 400 });
    }

    if (!text || typeof text !== "string" || text.trim().length === 0) {
      return NextResponse.json(
        { error: "Caption text is required" },
        { status: 400 }
      );
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

    // Update the example at the specified index
    const updatedExamples = [...voiceProfile.examples];
    if (index >= updatedExamples.length) {
      return NextResponse.json(
        { error: "Index out of bounds" },
        { status: 400 }
      );
    }

    updatedExamples[index] = text.trim();

    // Update the voice profile
    await prisma.voiceProfile.update({
      where: { id: voiceProfile.id },
      data: {
        examples: updatedExamples,
      },
    });

    return NextResponse.json({
      success: true,
      text: text.trim(),
    });
  } catch (error) {
    console.error("Error updating training sample:", error);
    return NextResponse.json(
      { error: "Failed to update training sample" },
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
