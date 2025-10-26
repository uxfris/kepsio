"use client";

import React, { useState, useCallback, lazy, Suspense } from "react";
import {
  HeroSection,
  PlatformComparison,
  FeaturesSection,
  TestimonialsSection,
  FinalCTASection,
  VideoModal,
  PricingSection,
} from "../../components/marketing";
import SignupModal from "../../components/shared/SignupModal";
import {
  PLATFORM_EXAMPLES,
  FEATURES,
  TESTIMONIALS,
} from "../../lib/constants/marketing";

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

  const handleUpgrade = useCallback((planId: string) => {
    console.log(`Upgrading to ${planId}`);
    // Here you would typically redirect to signup or billing
    setShowSignupModal(true);
  }, []);

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
      <PricingSection onUpgrade={handleUpgrade} />

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
