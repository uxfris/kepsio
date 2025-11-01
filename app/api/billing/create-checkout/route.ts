import { NextRequest, NextResponse } from "next/server";
import { createClient } from "../../../../lib/supabase/server";
import { stripe } from "../../../../lib/stripe/client";
import { getStripePriceId } from "../../../../lib/stripe/config";
import { prisma } from "../../../../lib/db/prisma";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { planId, billingCycle = "monthly" } = body;

    // Validate plan
    if (!planId || (planId !== "pro" && planId !== "enterprise")) {
      return NextResponse.json(
        { error: "Invalid plan selected" },
        { status: 400 }
      );
    }

    // Validate billing cycle
    if (billingCycle !== "monthly" && billingCycle !== "annual") {
      return NextResponse.json(
        { error: "Invalid billing cycle" },
        { status: 400 }
      );
    }

    // Get or create subscription record
    let subscription = await prisma.subscription.findFirst({
      where: { userId: user.id },
    });

    if (!subscription) {
      // Create a free subscription if it doesn't exist
      subscription = await prisma.subscription.create({
        data: {
          userId: user.id,
          plan: "free",
          status: "active",
          currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        },
      });
    }

    // Get user details
    const dbUser = await prisma.user.findUnique({
      where: { id: user.id },
    });

    if (!dbUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Create or retrieve Stripe customer
    let customerId = subscription.stripeCustomerId;

    if (!customerId) {
      const customer = await stripe.customers.create({
        email: dbUser.email,
        name: dbUser.name || undefined,
        metadata: {
          userId: user.id,
        },
      });

      customerId = customer.id;

      // Update subscription with customer ID
      await prisma.subscription.update({
        where: { id: subscription.id },
        data: { stripeCustomerId: customerId },
      });
    }

    // Get the Stripe price ID
    const priceId = getStripePriceId(
      planId as "pro" | "enterprise",
      billingCycle as "monthly" | "annual"
    );

    // Get the base URL for redirects
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    console.log(
      `[create-checkout] Creating checkout session for user ${user.id}, plan: ${planId}, cycle: ${billingCycle}`
    );
    console.log(`[create-checkout] Success URL: ${baseUrl}/success`);

    // Create Checkout Session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/upgrade`,
      metadata: {
        userId: user.id,
        planId,
        billingCycle,
      },
      subscription_data: {
        metadata: {
          userId: user.id,
          planId,
        },
      },
      allow_promotion_codes: true,
      // Ensure automatic tax calculation is disabled if not configured
      automatic_tax: { enabled: false },
    });

    console.log(
      `[create-checkout] ✅ Checkout session created: ${session.id}, URL: ${session.url}`
    );

    return NextResponse.json({
      url: session.url,
      sessionId: session.id,
    });
  } catch (error) {
    console.error("Error creating checkout session:", error);

    const errorMessage =
      error instanceof Error
        ? error.message
        : "Failed to create checkout session";

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
