"use client";

import React, { useState, useCallback } from "react";
import { PricingCard } from "../pricing";
import { SegmentedControl } from "../ui/SegmentedControl";
import { usePricing, type BillingCycle } from "../../hooks/use-pricing";
import { subscriptionPlans } from "../../config/plans";
import { PRICING_CONFIG } from "../../lib/constants/pricing";

export interface PricingSectionProps {
  onUpgrade?: (planId: string) => void;
  showBillingToggle?: boolean;
  customButtonText?: string;
  customButtonVariant?: "primary" | "outline";
}

export const PricingSection = ({
  onUpgrade = () => {},
  showBillingToggle = true,
  customButtonText,
  customButtonVariant = "primary",
}: PricingSectionProps) => {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("annual");

  const handleBillingCycleChange = useCallback((value: string) => {
    setBillingCycle(value as BillingCycle);
  }, []);

  const handleUpgrade = useCallback(
    (planId: string) => {
      onUpgrade(planId);
    },
    [onUpgrade]
  );

  const { formatPrice, getAnnualSavings } = usePricing({
    billingCycle,
    annualDiscountPercentage: PRICING_CONFIG.annualDiscountPercentage,
  });

  const planOrder = ["free", "pro", "enterprise"] as const;

  return (
    <section id="pricing" className="py-24">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Start free, upgrade when you're ready
          </h2>
          <p className="text-xl text-text-body">
            No credit card. No tricks. Just value.
          </p>
        </div>

        {/* Billing Toggle */}
        {showBillingToggle && (
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
        )}

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {planOrder.map((planId) => {
            const plan = subscriptionPlans[planId];
            // Override button text and style for marketing page
            const marketingPlan = {
              ...plan,
              buttonText: customButtonText || "Try Kepsio Free",
              buttonVariant: customButtonVariant,
            };

            return (
              <PricingCard
                key={planId}
                plan={marketingPlan}
                billingCycle={billingCycle}
                onUpgrade={handleUpgrade}
                formatPrice={formatPrice}
                getAnnualSavings={getAnnualSavings}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};
