"use client";

import React, { memo } from "react";
import { Zap, MessageSquare, TrendingUp, Check } from "lucide-react";
import { Card } from "../ui/Card";

interface Feature {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  benefits: readonly string[];
}

interface FeaturesSectionProps {
  features: readonly Feature[];
}

export const FeaturesSection = memo(function FeaturesSection({
  features,
}: FeaturesSectionProps) {
  return (
    <section id="features" className="bg-surface py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Built for creators who refuse to sound generic
          </h2>
          <p className="text-xl text-text-body max-w-2xl mx-auto">
            Every feature designed to save time while keeping your unique voice
            intact
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="p-8 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-6">
                <feature.icon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">
                {feature.title}
              </h3>
              <p className="text-text-body leading-relaxed mb-4">
                {feature.description}
              </p>
              <ul className="space-y-2">
                {feature.benefits.map((benefit, benefitIndex) => (
                  <li
                    key={benefitIndex}
                    className="flex items-start gap-2 text-sm text-text-body"
                  >
                    <Check className="w-4 h-4  mt-0.5 shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
});
