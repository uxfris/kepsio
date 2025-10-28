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
    const subscription = await prisma.subscription.findFirst({
      where: {
        userId: user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Default to free plan if no subscription found
    const plan = subscription?.plan || "free";
    const currentPeriodEnd =
      subscription?.currentPeriodEnd ||
      new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

    // Calculate the start of the current billing period
    const periodStart = new Date(currentPeriodEnd);
    periodStart.setDate(periodStart.getDate() - 30);

    // Count captions generated in the current period
    const captionsUsed = await prisma.caption.count({
      where: {
        userId: user.id,
        createdAt: {
          gte: periodStart,
          lte: currentPeriodEnd,
        },
      },
    });

    // Get the limit from the plan configuration
    const planConfig =
      subscriptionPlans[plan as keyof typeof subscriptionPlans];
    const captionsLimit = planConfig?.limits.captionsPerMonth || 10;

    return NextResponse.json({
      usage: {
        captionsUsed,
        captionsLimit,
        resetDate: currentPeriodEnd,
      },
    });
  } catch (error) {
    console.error("Error fetching usage:", error);
    return NextResponse.json(
      { error: "Failed to fetch usage" },
      { status: 500 }
    );
  }
}
