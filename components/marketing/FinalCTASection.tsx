"use client";

import React, { memo } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "../ui/Button";

interface FinalCTASectionProps {
  onSignupClick: () => void;
}

export const FinalCTASection = memo(function FinalCTASection({
  onSignupClick,
}: FinalCTASectionProps) {
  return (
    <section className="py-24 bg-linear-to-br from-accent to-accent/90">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-surface mb-6">
          Stop staring at blank screens
        </h2>
        <p className="text-xl text-white/50 mb-10 leading-relaxed">
          Join 12,000+ creators who post consistently without burning out. Start
          free today.
        </p>
        <Button
          variant="primary"
          size="lg"
          rightIcon={<ArrowRight className="w-5 h-5" />}
          className="bg-surface text-accent hover:bg-section-light text-lg px-10 py-5"
          onClick={onSignupClick}
        >
          Generate Your First Caption Free
        </Button>
        <p className="text-white/50 text-sm mt-6">
          No credit card required • 10 free captions/month forever
        </p>
      </div>
    </section>
  );
});
