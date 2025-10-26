"use client";

import React, { memo } from "react";
import { ArrowRight, Play, Check } from "lucide-react";
import { Button } from "../ui/Button";

interface HeroSectionProps {
  onSignupClick: () => void;
  onVideoClick: () => void;
}

export const HeroSection = memo(function HeroSection({
  onSignupClick,
  onVideoClick,
}: HeroSectionProps) {
  return (
    <section className="max-w-7xl mx-auto px-6 pt-20 pb-24">
      <div className="text-center max-w-4xl mx-auto">
        {/* Social Proof Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-surface border border-border rounded-full mb-8 shadow-sm">
          <div className="flex -space-x-2">
            {["#c96442", "#d17a5a", "#d99072", "#e1a68a"].map((color, i) => (
              <div
                key={i}
                className="w-6 h-6 rounded-full border-2 border-surface"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
          <span className="text-sm text-primary font-medium">
            Trusted by 12,000+ creators
          </span>
        </div>

        {/* Hero Headline */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-primary mb-6 leading-tight">
          Your content. Your voice.
          <span className="block text-accent">Zero blank screens.</span>
        </h1>

        {/* Subheadline */}
        <p className="text-xl md:text-2xl text-text-body mb-10 leading-relaxed max-w-3xl mx-auto">
          Generate scroll-stopping captions in seconds. Try free—no card
          required.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Button
            variant="accent"
            size="lg"
            rightIcon={<ArrowRight className="w-5 h-5" />}
            className="text-lg px-8 py-4"
            onClick={onSignupClick}
          >
            Generate Your First Caption
          </Button>
          <Button
            variant="outline"
            size="lg"
            leftIcon={<Play className="w-5 h-5" />}
            onClick={onVideoClick}
            className="text-lg px-8 py-4"
          >
            See How It Works
          </Button>
        </div>

        {/* Trust Indicators */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-hint">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4" />
            <span>Free forever plan</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4" />
            <span>No credit card required</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4" />
            <span>10 captions/month free</span>
          </div>
        </div>
      </div>
    </section>
  );
});
