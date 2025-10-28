import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/db/prisma";
import { subscriptionPlans } from "@/config/plans";

export async function GET() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get all captions for the user
    const allCaptions = await prisma.caption.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    });

    // Get subscription info
    const subscription = await prisma.subscription.findFirst({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    });

    const plan = subscription?.plan || "free";
    const planConfig =
      subscriptionPlans[plan as keyof typeof subscriptionPlans];

    // Calculate statistics
    const totalCaptions = allCaptions.length;
    const savedCaptions = allCaptions.filter((c) => c.isSaved).length;
    const generationsUsed = subscription?.generationsUsed || 0;
    const generationsLimit = planConfig?.limits.captionsPerMonth || 10;

    // Calculate unique generation batches (each batch is one generation click)
    const uniqueBatches = new Set(
      allCaptions.map((c) => c.generationBatchId).filter((id) => id !== null)
    ).size;

    // Platform distribution
    const platformStats = allCaptions.reduce((acc: any, caption) => {
      const platform = caption.platform || "instagram";
      acc[platform] = (acc[platform] || 0) + 1;
      return acc;
    }, {});

    // Style distribution
    const styleStats = allCaptions.reduce((acc: any, caption) => {
      const style = caption.style || "casual";
      acc[style] = (acc[style] || 0) + 1;
      return acc;
    }, {});

    // Recent activity (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const recentCaptions = allCaptions.filter(
      (c) => new Date(c.createdAt) >= thirtyDaysAgo
    );

    // Activity by day for the last 7 days
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const activityByDay = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(sevenDaysAgo);
      date.setDate(date.getDate() + i);
      const dateStr = date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });

      const count = allCaptions.filter((c) => {
        const captionDate = new Date(c.createdAt);
        return captionDate.toDateString() === date.toDateString();
      }).length;

      return { date: dateStr, count };
    });

    // Time saved calculation (avg 15 minutes per caption)
    const timeSavedMinutes = totalCaptions * 15;
    const timeSavedHours = Math.round(timeSavedMinutes / 60);

    // Save rate
    const saveRate =
      totalCaptions > 0 ? Math.round((savedCaptions / totalCaptions) * 100) : 0;

    // Growth stats (compare last 7 days to previous 7 days)
    const fourteenDaysAgo = new Date();
    fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 14);

    const lastWeekCaptions = allCaptions.filter((c) => {
      const date = new Date(c.createdAt);
      return date >= sevenDaysAgo;
    }).length;

    const previousWeekCaptions = allCaptions.filter((c) => {
      const date = new Date(c.createdAt);
      return date >= fourteenDaysAgo && date < sevenDaysAgo;
    }).length;

    const growthPercentage =
      previousWeekCaptions > 0
        ? Math.round(
            ((lastWeekCaptions - previousWeekCaptions) / previousWeekCaptions) *
              100
          )
        : lastWeekCaptions > 0
        ? 100
        : 0;

    return NextResponse.json(
      {
        success: true,
        analytics: {
          overview: {
            totalCaptions,
            savedCaptions,
            generationsUsed,
            generationsLimit,
            uniqueGenerations: uniqueBatches,
            timeSavedHours,
            saveRate,
            currentPeriodEnd: subscription?.currentPeriodEnd,
            plan,
          },
          platforms: platformStats,
          styles: styleStats,
          activity: {
            last30Days: recentCaptions.length,
            last7Days: lastWeekCaptions,
            byDay: activityByDay,
            growthPercentage,
          },
        },
      },
      {
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
        },
      }
    );
  } catch (error) {
    console.error("Error fetching analytics:", error);
    return NextResponse.json(
      { error: "Failed to fetch analytics" },
      { status: 500 }
    );
  }
}
