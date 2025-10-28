import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/db/prisma";
import { subscriptionPlans } from "@/config/plans";

export async function GET() {
  try {
    // Get the authenticated user from Supabase
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch the user's subscription
    let subscription = await prisma.subscription.findFirst({
      where: {
        userId: user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Default to free plan if no subscription found
    const plan = subscription?.plan || "free";
    let currentPeriodEnd =
      subscription?.currentPeriodEnd ||
      new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

    // Check if billing period has ended and reset if needed
    const now = new Date();
    if (subscription && now > currentPeriodEnd) {
      // Reset counter and move to next period
      const nextPeriodEnd = new Date(currentPeriodEnd);
      nextPeriodEnd.setDate(nextPeriodEnd.getDate() + 30);

      subscription = await prisma.subscription.update({
        where: { id: subscription.id },
        data: {
          generationsUsed: 0,
          currentPeriodEnd: nextPeriodEnd,
        },
      });

      currentPeriodEnd = nextPeriodEnd;
    }

    // Get usage directly from subscription table
    const generationsUsed = subscription?.generationsUsed || 0;

    // Get the limit from the plan configuration
    const planConfig =
      subscriptionPlans[plan as keyof typeof subscriptionPlans];
    const generationsLimit = planConfig?.limits.captionsPerMonth || 10;

    return NextResponse.json(
      {
        usage: {
          captionsUsed: generationsUsed, // Direct counter from subscriptions table
          captionsLimit: generationsLimit,
          resetDate: currentPeriodEnd,
        },
      },
      {
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
        },
      }
    );
  } catch (error) {
    console.error("Error fetching usage:", error);
    return NextResponse.json(
      { error: "Failed to fetch usage" },
      { status: 500 }
    );
  }
}
