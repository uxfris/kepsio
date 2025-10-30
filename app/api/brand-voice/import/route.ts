import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { subscriptionPlans } from "@/config/plans";

// POST - Import voice profile from JSON
export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check subscription for Pro/Enterprise
    const subscription = await prisma.subscription.findFirst({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    });

    const plan = subscription?.plan || "free";
    if (plan === "free") {
      return NextResponse.json(
        {
          error: "Feature requires Pro plan",
          message:
            "Voice import is available for Pro and Enterprise plans only.",
          requiredPlan: "pro",
        },
        { status: 403 }
      );
    }

    const { importData } = await request.json();

    if (!importData || typeof importData !== "object") {
      return NextResponse.json(
        { error: "Invalid import data" },
        { status: 400 }
      );
    }

    // Check voice profile limits
    const planConfig =
      subscriptionPlans[plan as keyof typeof subscriptionPlans];
    const voiceProfileLimit = planConfig?.limits.voiceProfiles || 1;

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
          }. Delete an existing profile or upgrade to Enterprise for unlimited profiles.`,
          voiceProfileLimitReached: true,
          voiceProfiles: {
            used: existingProfilesCount,
            limit: voiceProfileLimit,
          },
        },
        { status: 429 }
      );
    }

    // Find platform and tone by name if provided
    let platformId = null;
    if (importData.platform) {
      const platform = await prisma.platform.findUnique({
        where: { name: importData.platform },
      });
      platformId = platform?.id || null;
    }

    let toneId = null;
    if (importData.tone) {
      const tone = await prisma.brandTone.findFirst({
        where: { name: importData.tone },
      });
      toneId = tone?.id || null;
    }

    // Create new voice profile from import
    const voiceProfile = await prisma.voiceProfile.create({
      data: {
        userId: user.id,
        name: importData.name || "Imported Voice",
        description: importData.description || "Imported voice profile",
        platformId,
        toneId,
        contentTypeIds: importData.contentTypeIds || [],
        voiceStrength: importData.voiceStrength ?? 75,
        stylePreferences: importData.stylePreferences || {
          includeCTA: true,
          useQuestions: true,
          includeEmojis: true,
        },
        examples: importData.examples || [],
        style: importData.style ? JSON.stringify(importData.style) : "",
      },
    });

    return NextResponse.json({
      success: true,
      message: "Voice profile imported successfully",
      voiceProfileId: voiceProfile.id,
    });
  } catch (error) {
    console.error("Error importing voice profile:", error);
    return NextResponse.json(
      { error: "Failed to import voice profile" },
      { status: 500 }
    );
  }
}
