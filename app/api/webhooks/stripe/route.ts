import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";
import { stripe } from "../../../../lib/stripe/client";
import { prisma } from "../../../../lib/db/prisma";

const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET!;

/**
 * Stripe Webhook Handler
 *
 * Handles Stripe events to keep subscriptions in sync
 *
 * Important: This endpoint must receive the raw body for signature verification
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const headersList = await headers();
    const signature = headersList.get("stripe-signature");

    if (!signature) {
      console.error("No Stripe signature found");
      return NextResponse.json(
        { error: "No signature found" },
        { status: 400 }
      );
    }

    if (!WEBHOOK_SECRET) {
      console.error("STRIPE_WEBHOOK_SECRET is not set");
      return NextResponse.json(
        { error: "Webhook secret not configured" },
        { status: 500 }
      );
    }

    // Verify webhook signature
    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, WEBHOOK_SECRET);
    } catch (err) {
      console.error("Webhook signature verification failed:", err);
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    console.log(`Processing webhook event: ${event.type}`);

    // Handle the event
    try {
      switch (event.type) {
        case "checkout.session.completed": {
          const session = event.data.object as Stripe.Checkout.Session;
          await handleCheckoutCompleted(session);
          break;
        }

        case "customer.subscription.created":
        case "customer.subscription.updated": {
          const subscription = event.data.object as Stripe.Subscription;
          await handleSubscriptionUpdate(subscription);
          break;
        }

        case "customer.subscription.deleted": {
          const subscription = event.data.object as Stripe.Subscription;
          await handleSubscriptionDeleted(subscription);
          break;
        }

        case "invoice.payment_succeeded": {
          const invoice = event.data.object as Stripe.Invoice;
          await handlePaymentSucceeded(invoice);
          break;
        }

        case "invoice.payment_failed": {
          const invoice = event.data.object as Stripe.Invoice;
          await handlePaymentFailed(invoice);
          break;
        }

        default:
          console.log(`Unhandled event type: ${event.type}`);
      }

      return NextResponse.json({ received: true });
    } catch (handlerError) {
      console.error(
        `Error handling event ${event.type} (${event.id}):`,
        handlerError
      );
      // Return 500 so Stripe knows to retry
      return NextResponse.json(
        {
          error: "Event handler failed",
          eventType: event.type,
          eventId: event.id,
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error processing webhook:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}

/**
 * Handle successful checkout session
 */
async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  try {
    console.log(
      `[handleCheckoutCompleted] Processing session ${session.id}`,
      JSON.stringify(
        {
          metadata: session.metadata,
          subscription: session.subscription,
          customer: session.customer,
          mode: session.mode,
        },
        null,
        2
      )
    );

    const userId = session.metadata?.userId;
    const planId = session.metadata?.planId;

    if (!userId || !planId) {
      console.error(
        `[handleCheckoutCompleted] Missing metadata in checkout session ${session.id}`,
        { userId, planId, metadata: session.metadata }
      );
      throw new Error("Missing userId or planId in session metadata");
    }

    const stripeSubscriptionId = session.subscription as string;
    const stripeCustomerId = session.customer as string;

    console.log(`[handleCheckoutCompleted] Session details:`, {
      subscriptionId: stripeSubscriptionId,
      customerId: stripeCustomerId,
      subscriptionType: typeof session.subscription,
    });

    if (!stripeSubscriptionId) {
      console.error(
        `[handleCheckoutCompleted] No subscription ID in checkout session ${session.id}`
      );
      throw new Error("No subscription ID in checkout session");
    }

    console.log(
      `[handleCheckoutCompleted] Retrieving subscription ${stripeSubscriptionId}`
    );

    // Get the full subscription details from Stripe
    const stripeSubscription = (await stripe.subscriptions.retrieve(
      stripeSubscriptionId
    )) as Stripe.Subscription;

    // Get current_period_end from subscription items
    // In newer Stripe API versions, this is nested in items.data[0]
    const subscriptionData = stripeSubscription as any;
    let periodEndTimestamp =
      subscriptionData.current_period_end ||
      subscriptionData.items?.data?.[0]?.current_period_end;

    console.log(
      `[handleCheckoutCompleted] Subscription data:`,
      JSON.stringify(
        {
          status: stripeSubscription.status,
          current_period_end: periodEndTimestamp,
          current_period_end_type: typeof periodEndTimestamp,
          billing_cycle_anchor: subscriptionData.billing_cycle_anchor,
          has_items: !!subscriptionData.items?.data?.length,
          items_period_end:
            subscriptionData.items?.data?.[0]?.current_period_end,
        },
        null,
        2
      )
    );

    // Validate and convert the period end timestamp
    if (!periodEndTimestamp || typeof periodEndTimestamp !== "number") {
      console.error(
        `[handleCheckoutCompleted] Invalid current_period_end: ${periodEndTimestamp}`
      );
      throw new Error(
        `Invalid current_period_end timestamp: ${periodEndTimestamp}`
      );
    }

    const currentPeriodEnd = new Date(periodEndTimestamp * 1000);
    if (isNaN(currentPeriodEnd.getTime())) {
      console.error(
        `[handleCheckoutCompleted] Invalid date created from timestamp: ${periodEndTimestamp}`
      );
      throw new Error(
        `Invalid date from timestamp: ${periodEndTimestamp} -> ${currentPeriodEnd}`
      );
    }

    console.log(
      `[handleCheckoutCompleted] Updating database for user ${userId}, period end: ${currentPeriodEnd.toISOString()}`
    );

    // Update or create subscription in database
    const existingSubscription = await prisma.subscription.findFirst({
      where: { userId },
    });

    if (existingSubscription) {
      await prisma.subscription.update({
        where: { id: existingSubscription.id },
        data: {
          plan: planId,
          status: stripeSubscription.status,
          stripeCustomerId,
          stripeSubscriptionId,
          currentPeriodEnd,
          generationsUsed: 0, // Reset usage on new subscription
        },
      });
    } else {
      await prisma.subscription.create({
        data: {
          userId,
          plan: planId,
          status: stripeSubscription.status,
          stripeCustomerId,
          stripeSubscriptionId,
          currentPeriodEnd,
          generationsUsed: 0,
        },
      });
    }

    console.log(
      `[handleCheckoutCompleted] ✅ Subscription created for user ${userId}: ${planId}`
    );
  } catch (error) {
    console.error(
      `[handleCheckoutCompleted] ❌ Error processing checkout session ${session.id}:`,
      error
    );
    throw error; // Re-throw to trigger webhook retry
  }
}

/**
 * Handle subscription updates (plan changes, renewals, etc.)
 */
async function handleSubscriptionUpdate(subscription: Stripe.Subscription) {
  try {
    console.log(
      `[handleSubscriptionUpdate] Processing subscription ${subscription.id}`,
      JSON.stringify({ metadata: subscription.metadata }, null, 2)
    );

    const userId = subscription.metadata?.userId;

    if (!userId) {
      console.log(
        `[handleSubscriptionUpdate] No userId in metadata, searching by Stripe subscription ID`
      );
      // Try to find subscription by Stripe subscription ID
      const existingSubscription = await prisma.subscription.findFirst({
        where: { stripeSubscriptionId: subscription.id },
      });

      if (!existingSubscription) {
        console.error(
          `[handleSubscriptionUpdate] ❌ Cannot find user for subscription ${subscription.id}`
        );
        throw new Error(
          `Cannot find existing subscription for ${subscription.id}`
        );
      }

      console.log(
        `[handleSubscriptionUpdate] Found existing subscription for user ${existingSubscription.userId}`
      );
      await updateSubscriptionInDb(existingSubscription.userId, subscription);
    } else {
      await updateSubscriptionInDb(userId, subscription);
    }

    console.log(
      `[handleSubscriptionUpdate] ✅ Successfully updated subscription ${subscription.id}`
    );
  } catch (error) {
    console.error(
      `[handleSubscriptionUpdate] ❌ Error processing subscription ${subscription.id}:`,
      error
    );
    throw error;
  }
}

/**
 * Update subscription in database
 */
async function updateSubscriptionInDb(
  userId: string,
  subscription: Stripe.Subscription
) {
  const planId = subscription.metadata?.planId || "pro"; // Default to pro if not specified

  // Get current_period_end from subscription items
  // In newer Stripe API versions, this is nested in items.data[0]
  const subscriptionData = subscription as any;
  const periodEndTimestamp =
    subscriptionData.current_period_end ||
    subscriptionData.items?.data?.[0]?.current_period_end;

  console.log(
    `[updateSubscriptionInDb] Updating subscription for user ${userId}`,
    JSON.stringify(
      {
        status: subscription.status,
        current_period_end: periodEndTimestamp,
        current_period_end_type: typeof periodEndTimestamp,
        has_items: !!subscriptionData.items?.data?.length,
      },
      null,
      2
    )
  );

  // Validate and convert the period end timestamp
  if (!periodEndTimestamp || typeof periodEndTimestamp !== "number") {
    console.error(
      `[updateSubscriptionInDb] Invalid current_period_end: ${periodEndTimestamp}`
    );
    throw new Error(
      `Invalid current_period_end timestamp: ${periodEndTimestamp}`
    );
  }

  const currentPeriodEnd = new Date(periodEndTimestamp * 1000);
  if (isNaN(currentPeriodEnd.getTime())) {
    console.error(
      `[updateSubscriptionInDb] Invalid date created from timestamp: ${periodEndTimestamp}`
    );
    throw new Error(
      `Invalid date from timestamp: ${periodEndTimestamp} -> ${currentPeriodEnd}`
    );
  }

  const existingSubscription = await prisma.subscription.findFirst({
    where: { userId },
  });

  if (existingSubscription) {
    await prisma.subscription.update({
      where: { id: existingSubscription.id },
      data: {
        plan: planId,
        status: subscription.status,
        stripeSubscriptionId: subscription.id,
        stripeCustomerId: subscription.customer as string,
        currentPeriodEnd,
      },
    });
  } else {
    await prisma.subscription.create({
      data: {
        userId,
        plan: planId,
        status: subscription.status,
        stripeSubscriptionId: subscription.id,
        stripeCustomerId: subscription.customer as string,
        currentPeriodEnd,
        generationsUsed: 0,
      },
    });
  }

  console.log(
    `[updateSubscriptionInDb] ✅ Subscription updated for user ${userId}: ${subscription.status}`
  );
}

/**
 * Handle subscription deletion/cancellation
 */
async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  const userId = subscription.metadata?.userId;

  if (!userId) {
    // Try to find subscription by Stripe subscription ID
    const existingSubscription = await prisma.subscription.findFirst({
      where: { stripeSubscriptionId: subscription.id },
    });

    if (!existingSubscription) {
      console.error("Cannot find user for subscription", subscription.id);
      return;
    }

    await downgradeToFree(existingSubscription.userId);
  } else {
    await downgradeToFree(userId);
  }
}

/**
 * Downgrade user to free plan
 */
async function downgradeToFree(userId: string) {
  await prisma.subscription.updateMany({
    where: { userId },
    data: {
      plan: "free",
      status: "canceled",
      stripeSubscriptionId: null,
    },
  });

  console.log(`User ${userId} downgraded to free plan`);
}

/**
 * Handle successful payment (renewal, etc.)
 */
async function handlePaymentSucceeded(invoice: Stripe.Invoice) {
  const invoiceData = invoice as any;
  const subscriptionId =
    typeof invoiceData.subscription === "string"
      ? invoiceData.subscription
      : invoiceData.subscription?.id;

  if (!subscriptionId) {
    return;
  }

  const subscription = (await stripe.subscriptions.retrieve(
    subscriptionId
  )) as Stripe.Subscription;
  const userId = subscription.metadata?.userId;

  // Get current_period_end from subscription items
  const subscriptionData = subscription as any;
  const periodEnd =
    subscriptionData.current_period_end ||
    subscriptionData.items?.data?.[0]?.current_period_end;

  if (!userId) {
    // Try to find subscription by Stripe subscription ID
    const existingSubscription = await prisma.subscription.findFirst({
      where: { stripeSubscriptionId: subscriptionId },
    });

    if (existingSubscription) {
      await updateSubscriptionStatus(
        existingSubscription.userId,
        subscriptionId,
        "active",
        periodEnd
      );
    }
  } else {
    await updateSubscriptionStatus(userId, subscriptionId, "active", periodEnd);
  }
}

/**
 * Handle failed payment
 */
async function handlePaymentFailed(invoice: Stripe.Invoice) {
  const invoiceData = invoice as any;
  const subscriptionId =
    typeof invoiceData.subscription === "string"
      ? invoiceData.subscription
      : invoiceData.subscription?.id;

  if (!subscriptionId) {
    return;
  }

  const subscription = (await stripe.subscriptions.retrieve(
    subscriptionId
  )) as Stripe.Subscription;
  const userId = subscription.metadata?.userId;

  // Get current_period_end from subscription items
  const subscriptionData = subscription as any;
  const periodEnd =
    subscriptionData.current_period_end ||
    subscriptionData.items?.data?.[0]?.current_period_end;

  if (!userId) {
    const existingSubscription = await prisma.subscription.findFirst({
      where: { stripeSubscriptionId: subscriptionId },
    });

    if (existingSubscription) {
      await updateSubscriptionStatus(
        existingSubscription.userId,
        subscriptionId,
        "past_due",
        periodEnd
      );
    }
  } else {
    await updateSubscriptionStatus(
      userId,
      subscriptionId,
      "past_due",
      periodEnd
    );
  }
}

/**
 * Update subscription status
 */
async function updateSubscriptionStatus(
  userId: string,
  subscriptionId: string,
  status: string,
  periodEnd: number
) {
  console.log(
    `[updateSubscriptionStatus] Updating status for user ${userId}`,
    JSON.stringify(
      {
        status,
        periodEnd,
        periodEndType: typeof periodEnd,
      },
      null,
      2
    )
  );

  // Validate and convert the period end timestamp
  if (!periodEnd || typeof periodEnd !== "number") {
    console.error(`[updateSubscriptionStatus] Invalid periodEnd: ${periodEnd}`);
    throw new Error(`Invalid periodEnd timestamp: ${periodEnd}`);
  }

  const currentPeriodEnd = new Date(periodEnd * 1000);
  if (isNaN(currentPeriodEnd.getTime())) {
    console.error(
      `[updateSubscriptionStatus] Invalid date created from timestamp: ${periodEnd}`
    );
    throw new Error(
      `Invalid date from timestamp: ${periodEnd} -> ${currentPeriodEnd}`
    );
  }

  await prisma.subscription.updateMany({
    where: {
      userId,
      stripeSubscriptionId: subscriptionId,
    },
    data: {
      status,
      currentPeriodEnd,
      // Reset usage counter on renewal if payment succeeded
      ...(status === "active" && { generationsUsed: 0 }),
    },
  });

  console.log(
    `[updateSubscriptionStatus] ✅ Subscription status updated: ${userId} -> ${status}`
  );
}
