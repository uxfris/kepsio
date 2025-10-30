import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

// GET - Export voice profile as JSON
export async function GET() {
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
            "Voice export is available for Pro and Enterprise plans only.",
          requiredPlan: "pro",
        },
        { status: 403 }
      );
    }

    // Fetch user's voice profile with all data
    const voiceProfile = await prisma.voiceProfile.findFirst({
      where: { userId: user.id },
      include: {
        platform: true,
        tone: true,
      },
    });

    if (!voiceProfile) {
      return NextResponse.json(
        { error: "Voice profile not found" },
        { status: 404 }
      );
    }

    // Prepare export data
    const exportData = {
      name: voiceProfile.name,
      description: voiceProfile.description,
      platform: voiceProfile.platform?.name || null,
      tone: voiceProfile.tone?.name || null,
      contentTypeIds: voiceProfile.contentTypeIds || [],
      voiceStrength: voiceProfile.voiceStrength,
      stylePreferences: voiceProfile.stylePreferences || {},
      examples: voiceProfile.examples || [],
      style: voiceProfile.style ? JSON.parse(voiceProfile.style) : null,
      exportedAt: new Date().toISOString(),
      version: "1.0",
    };

    return NextResponse.json({
      success: true,
      data: exportData,
    });
  } catch (error) {
    console.error("Error exporting voice profile:", error);
    return NextResponse.json(
      { error: "Failed to export voice profile" },
      { status: 500 }
    );
  }
}
