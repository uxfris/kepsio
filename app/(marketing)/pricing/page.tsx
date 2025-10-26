"use client";

import React, { useState, useCallback } from "react";
import { Zap } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "../../../components/ui";
import { SegmentedControl } from "../../../components/ui/SegmentedControl";
import {
  PricingCard,
  TestimonialCarousel,
  FAQSection,
} from "../../../components/pricing";
import { useSubscription } from "../../../hooks/use-subscription";
import { usePricing, type BillingCycle } from "../../../hooks/use-pricing";
import { subscriptionPlans } from "../../../config/plans";
import {
  TESTIMONIALS,
  FAQ_ITEMS,
  PRICING_CONFIG,
} from "../../../lib/constants/pricing";

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("annual");
  const { subscription, isLoading } = useSubscription();
  const router = useRouter();

  const { formatPrice, getAnnualSavings } = usePricing({
    billingCycle,
    annualDiscountPercentage: PRICING_CONFIG.annualDiscountPercentage,
  });

  const handleUpgrade = useCallback((planId: string) => {
    // TODO: Implement upgrade logic
    console.log(`Upgrading to ${planId}`);
  }, []);

  const handleBillingCycleChange = useCallback((value: string) => {
    setBillingCycle(value as BillingCycle);
  }, []);

  const handleBackToDashboard = useCallback(() => {
    router.back();
  }, [router]);

  const planOrder = ["free", "pro", "enterprise"] as const;

  return (
    <div className="min-h-screen bg-section">
      {/* Header Section */}
      <header className="relative px-8 pt-24">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center justify-center text-center gap-8 max-w-3xl mx-auto">
            <Zap className="w-10 h-10 text-text-body mb-4" />
            <h1 className="text-4xl md:text-5xl font-display font-bold text-text-head mb-4">
              Choose Your Plan
            </h1>
          </div>
        </div>
      </header>

      {/* Pricing Section */}
      <main className="px-8 py-16">
        <div className="max-w-7xl mx-auto">
          {/* Billing Toggle */}
          <div className="flex items-center justify-center mb-12">
            <SegmentedControl
              options={[
                { value: "monthly", label: "Monthly" },
                { value: "annual", label: "Annual" },
              ]}
              value={billingCycle}
              onChange={handleBillingCycleChange}
              className="min-w-[200px]"
            />
          </div>

          {/* Pricing Cards */}
          <section className="grid md:grid-cols-3 gap-8 mb-16">
            {planOrder.map((planId) => (
              <PricingCard
                key={planId}
                plan={subscriptionPlans[planId]}
                billingCycle={billingCycle}
                onUpgrade={handleUpgrade}
                formatPrice={formatPrice}
                getAnnualSavings={getAnnualSavings}
              />
            ))}
          </section>

          {/* Social Proof Section */}
          <TestimonialCarousel
            testimonials={TESTIMONIALS}
            autoRotateInterval={PRICING_CONFIG.autoRotateInterval}
          />

          {/* FAQ Section */}
          <FAQSection faqs={FAQ_ITEMS} />
        </div>
      </main>
    </div>
  );
}
