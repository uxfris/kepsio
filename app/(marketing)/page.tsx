"use client";

import React, { useState, useCallback, lazy, Suspense } from "react";
import {
  HeroSection,
  PlatformComparison,
  FeaturesSection,
  TestimonialsSection,
  FinalCTASection,
  VideoModal,
} from "../../components/marketing";
import { PricingCard } from "../../components/pricing";
import { SegmentedControl } from "../../components/ui/SegmentedControl";
import SignupModal from "../../components/shared/SignupModal";
import { usePricing, type BillingCycle } from "../../hooks/use-pricing";
import { subscriptionPlans } from "../../config/plans";
import {
  PLATFORM_EXAMPLES,
  FEATURES,
  TESTIMONIALS,
} from "../../lib/constants/marketing";
import { PRICING_CONFIG } from "../../lib/constants/pricing";

// Lazy load heavy components
const LazyTestimonialsSection = lazy(() =>
  import("../../components/marketing").then((module) => ({
    default: module.TestimonialsSection,
  }))
);

// Loading component for Suspense fallback
const SectionLoader = () => (
  <div className="flex items-center justify-center py-24">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
  </div>
);

export default function HomePage() {
  const [showVideo, setShowVideo] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("annual");

  const handleSignupClick = useCallback(() => {
    setShowSignupModal(true);
  }, []);

  const handleVideoClick = useCallback(() => {
    setShowVideo(true);
  }, []);

  const handleVideoClose = useCallback(() => {
    setShowVideo(false);
  }, []);

  const handleSignupClose = useCallback(() => {
    setShowSignupModal(false);
  }, []);

  const handleSignupSuccess = useCallback((email: string) => {
    console.log("Signup successful for:", email);
    // Here you would typically redirect to the dashboard or show a success message
  }, []);

  const handleBillingCycleChange = useCallback((value: string) => {
    setBillingCycle(value as BillingCycle);
  }, []);

  const handleUpgrade = useCallback((planId: string) => {
    console.log(`Upgrading to ${planId}`);
    // Here you would typically redirect to signup or billing
    setShowSignupModal(true);
  }, []);

  const { formatPrice, getAnnualSavings } = usePricing({
    billingCycle,
    annualDiscountPercentage: PRICING_CONFIG.annualDiscountPercentage,
  });

  const planOrder = ["free", "pro", "enterprise"] as const;

  return (
    <>
      {/* Hero Section */}
      <HeroSection
        onSignupClick={handleSignupClick}
        onVideoClick={handleVideoClick}
      />

      {/* Live Comparison Demo */}
      <PlatformComparison examples={PLATFORM_EXAMPLES} />

      {/* Features Section */}
      <FeaturesSection features={FEATURES as any} />

      {/* Social Proof / Testimonials */}
      <Suspense fallback={<SectionLoader />}>
        <LazyTestimonialsSection testimonials={TESTIMONIALS as any} />
      </Suspense>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              Start free, upgrade when you're ready
            </h2>
            <p className="text-xl text-text-body">
              No credit card. No tricks. Just value.
            </p>
          </div>

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
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {planOrder.map((planId) => {
              const plan = subscriptionPlans[planId];
              // Override button text and style for marketing page
              const marketingPlan = {
                ...plan,
                buttonText: "Try Kepsio Free",
                buttonVariant: "primary" as const, // Make all buttons primary style
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

      {/* Final CTA */}
      <FinalCTASection onSignupClick={handleSignupClick} />

      {/* Video Modal */}
      <VideoModal isOpen={showVideo} onClose={handleVideoClose} />

      {/* Signup Modal */}
      <SignupModal
        isOpen={showSignupModal}
        onClose={handleSignupClose}
        onSuccess={handleSignupSuccess}
      />
    </>
  );
}
