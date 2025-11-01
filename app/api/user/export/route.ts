import { NextRequest, NextResponse } from "next/server";
import { createClient } from "../../../../lib/supabase/server";
import prisma from "../../../../lib/db/prisma";

export async function GET(req: NextRequest) {
  try {
    const supabase = await createClient();

    // Check authentication
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch all user data from various tables
    const [userData, captions, voiceProfiles, subscription, teamMembership] =
      await Promise.all([
        // User data from public.users
        prisma.user.findUnique({
          where: { id: user.id },
          select: {
            id: true,
            email: true,
            name: true,
            image: true,
            createdAt: true,
            updatedAt: true,
            onboardingCompleted: true,
            notificationPreferences: true,
          },
        }),
        // Captions
        prisma.caption.findMany({
          where: { userId: user.id },
          select: {
            id: true,
            content: true,
            context: true,
            platform: true,
            style: true,
            metadata: true,
            isSaved: true,
            createdAt: true,
            updatedAt: true,
          },
          orderBy: { createdAt: "desc" },
        }),
        // Voice profiles
        prisma.voiceProfile.findMany({
          where: { userId: user.id },
          select: {
            id: true,
            name: true,
            description: true,
            style: true,
            examples: true,
            platformId: true,
            toneId: true,
            contentTypeIds: true,
            voiceStrength: true,
            stylePreferences: true,
            createdAt: true,
            updatedAt: true,
          },
        }),
        // Subscription
        prisma.subscription.findUnique({
          where: { userId: user.id },
          select: {
            plan: true,
            status: true,
            currentPeriodEnd: true,
            generationsUsed: true,
            createdAt: true,
            updatedAt: true,
          },
        }),
        // Team membership
        prisma.teamMember.findMany({
          where: { userId: user.id },
          select: {
            role: true,
            status: true,
            joinedAt: true,
            lastActiveAt: true,
          },
        }),
      ]);

    // Compile all data into a single export object
    const exportData = {
      exportDate: new Date().toISOString(),
      user: userData,
      captions: captions || [],
      voiceProfiles: voiceProfiles || [],
      subscription: subscription,
      teamMembership: teamMembership || [],
      statistics: {
        totalCaptions: captions?.length || 0,
        savedCaptions: captions?.filter((c) => c.isSaved).length || 0,
        totalVoiceProfiles: voiceProfiles?.length || 0,
      },
    };

    // Return as JSON download
    return new NextResponse(JSON.stringify(exportData, null, 2), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Content-Disposition": `attachment; filename="kepsio-data-export-${
          new Date().toISOString().split("T")[0]
        }.json"`,
      },
    });
  } catch (error) {
    console.error("Error exporting data:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
