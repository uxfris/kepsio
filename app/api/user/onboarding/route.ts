import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

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

    // Update user's onboarding status in the database
    await prisma.user.update({
      where: { id: user.id },
      data: {
        onboardingCompleted: onboardingCompleted ?? true,
        // You can optionally store the onboarding preferences here
        // For example, you might want to add fields to the User model
        // to store platform, tone, and contentTypes
      },
    });

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
