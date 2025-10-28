import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

export async function GET() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch user's voice profile
    const voiceProfile = await prisma.voiceProfile.findFirst({
      where: { userId: user.id },
      select: {
        platformId: true,
        toneId: true,
        contentTypeIds: true,
        style: true,
        voiceStrength: true,
      },
    });

    return NextResponse.json({
      platformId: voiceProfile?.platformId || null,
      toneId: voiceProfile?.toneId || null,
      contentTypeIds: voiceProfile?.contentTypeIds || [],
      voiceInsights: voiceProfile?.style || null,
      voiceStrength: voiceProfile?.voiceStrength ?? 75,
    });
  } catch (error) {
    console.error("Error fetching onboarding data:", error);
    return NextResponse.json(
      { error: "Failed to fetch onboarding data" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { onboardingData, onboardingCompleted } = await request.json();

    // Update user's onboarding status
    await prisma.user.update({
      where: { id: user.id },
      data: {
        onboardingCompleted: onboardingCompleted ?? true,
      },
    });

    // Create or update voice profile with onboarding preferences using IDs
    if (onboardingData) {
      const voiceProfile = await prisma.voiceProfile.findFirst({
        where: { userId: user.id },
      });

      if (voiceProfile) {
        // Update existing voice profile - only update fields that are provided
        const updateData: {
          platformId?: string | null;
          toneId?: string | null;
          contentTypeIds?: string[];
          voiceStrength?: number;
        } = {};

        if (onboardingData.platformId !== undefined) {
          updateData.platformId = onboardingData.platformId || null;
        }
        if (onboardingData.toneId !== undefined) {
          updateData.toneId = onboardingData.toneId || null;
        }
        if (onboardingData.contentTypeIds !== undefined) {
          updateData.contentTypeIds = onboardingData.contentTypeIds;
        }
        if (onboardingData.voiceStrength !== undefined) {
          updateData.voiceStrength = onboardingData.voiceStrength;
        }

        await prisma.voiceProfile.update({
          where: { id: voiceProfile.id },
          data: updateData,
        });
      } else {
        // Create new voice profile with onboarding data
        await prisma.voiceProfile.create({
          data: {
            userId: user.id,
            name: "Brand Voice",
            description: "Your brand voice profile",
            platformId: onboardingData.platformId || null,
            toneId: onboardingData.toneId || null,
            style: "",
            contentTypeIds: onboardingData.contentTypeIds || [],
            examples: [],
            voiceStrength: onboardingData.voiceStrength ?? 75,
          },
        });
      }
    }

    console.log("Onboarding completed for user:", user.id, onboardingData);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating onboarding status:", error);
    return NextResponse.json(
      { error: "Failed to update onboarding status" },
      { status: 500 }
    );
  }
}
