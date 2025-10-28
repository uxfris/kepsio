/**
 * Stripe Configuration
 *
 * IMPORTANT: Set these environment variables in your .env.local file:
 * - STRIPE_PRICE_PRO_MONTHLY
 * - STRIPE_PRICE_PRO_ANNUAL
 * - STRIPE_PRICE_ENTERPRISE_MONTHLY
 *
 * Get these Price IDs from your Stripe Dashboard after creating products.
 */

export const STRIPE_CONFIG = {
  prices: {
    pro: {
      monthly: process.env.STRIPE_PRICE_PRO_MONTHLY || "",
      annual: process.env.STRIPE_PRICE_PRO_ANNUAL || "",
    },
    enterprise: {
      monthly: process.env.STRIPE_PRICE_ENTERPRISE_MONTHLY || "",
      annual: process.env.STRIPE_PRICE_ENTERPRISE_MONTHLY || "", // Enterprise only has monthly for now
    },
  },
  successUrl: `${
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
  }/success?session_id={CHECKOUT_SESSION_ID}`,
  cancelUrl: `${
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
  }/upgrade`,
  portalReturnUrl: `${
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
  }/settings/billing`,
} as const;

/**
 * Get Stripe Price ID based on plan and billing cycle
 */
export function getStripePriceId(
  plan: "pro" | "enterprise",
  billingCycle: "monthly" | "annual" = "monthly"
): string {
  const priceId = STRIPE_CONFIG.prices[plan][billingCycle];

  if (!priceId) {
    throw new Error(
      `Missing Stripe Price ID for ${plan} ${billingCycle}. ` +
        `Please set STRIPE_PRICE_${plan.toUpperCase()}_${billingCycle.toUpperCase()} in your environment variables.`
    );
  }

  return priceId;
}

/**
 * Map Stripe plan to internal plan ID
 */
export function mapStripePlanToInternal(stripePriceId: string): string {
  const { prices } = STRIPE_CONFIG;

  if (
    stripePriceId === prices.pro.monthly ||
    stripePriceId === prices.pro.annual
  ) {
    return "pro";
  }

  if (
    stripePriceId === prices.enterprise.monthly ||
    stripePriceId === prices.enterprise.annual
  ) {
    return "enterprise";
  }

  return "free";
}
