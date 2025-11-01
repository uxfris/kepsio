import { NextRequest, NextResponse } from "next/server";
import { createClient } from "../../../../lib/supabase/server";
import { stripe } from "../../../../lib/stripe/client";
import { prisma } from "../../../../lib/db/prisma";

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const sessionId = searchParams.get("session_id");

    if (!sessionId) {
      return NextResponse.json(
        { error: "Missing session_id" },
        { status: 400 }
      );
    }

    // Retrieve the checkout session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (!session) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }

    // Check if the session belongs to this user
    if (session.metadata?.userId !== user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    // Get the updated subscription from database
    const subscription = await prisma.subscription.findFirst({
      where: { userId: user.id },
    });

    return NextResponse.json({
      session: {
        id: session.id,
        status: session.status,
        payment_status: session.payment_status,
      },
      subscription,
      success: session.payment_status === "paid",
    });
  } catch (error) {
    console.error("Error verifying session:", error);

    const errorMessage =
      error instanceof Error ? error.message : "Failed to verify session";

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
