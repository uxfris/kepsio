"use client";

import React, { useState, memo } from "react";
import { Card } from "../ui/Card";
import { SegmentedControl } from "../ui/SegmentedControl";

interface PlatformExample {
  generic: string;
  ours: string;
}

interface PlatformComparisonProps {
  examples: Record<string, PlatformExample>;
}

export const PlatformComparison = memo(function PlatformComparison({
  examples,
}: PlatformComparisonProps) {
  const [selectedPlatform, setSelectedPlatform] = useState("instagram");

  const platformOptions = [
    { value: "instagram", label: "Instagram" },
    { value: "linkedin", label: "LinkedIn" },
    { value: "x", label: "X" },
  ];

  return (
    <div id="examples" className="my-20 max-w-5xl mx-auto">
      <div className="text-center mb-8">
        <h3 className="text-5xl font-bold text-primary mb-3">
          See the difference instantly
        </h3>
        <p className="text-text-body">
          Toggle between generic AI and captions that actually sound like you
        </p>
      </div>

      {/* Platform Selector */}
      <div className="flex justify-center mb-6">
        <SegmentedControl
          options={platformOptions}
          value={selectedPlatform}
          onChange={setSelectedPlatform}
        />
      </div>

      {/* Comparison Cards */}
      <div className="grid md:grid-cols-2 gap-6 px-4">
        {/* Generic AI */}
        <Card className="p-6 border-border bg-section">
          <div className="flex items-center justify-between mb-4 border-b border-border pb-4">
            <span className="text-sm font-semibold text-hint uppercase tracking-wide">
              Generic AI
            </span>
            <span className="px-3 py-1 bg-section-light text-text-body text-xs font-medium rounded-full">
              Robotic
            </span>
          </div>
          <p className="text-text-body leading-relaxed whitespace-pre-line">
            {examples[selectedPlatform].generic}
          </p>
        </Card>

        {/* Our AI */}
        <Card className="p-6  bg-surface relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-accent rounded-full filter blur-3xl opacity-20" />
          <div className="flex items-center justify-between mb-4 border-b border-border pb-4 relative z-10">
            <span className="text-sm font-semibold text-primary uppercase tracking-wide">
              Kepsio
            </span>
            <span className="px-3 py-1 bg-accent text-surface text-xs font-medium rounded-full flex items-center gap-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              Authentic
            </span>
          </div>
          <p className="text-primary leading-relaxed whitespace-pre-line relative z-10">
            {examples[selectedPlatform].ours}
          </p>
        </Card>
      </div>
    </div>
  );
});
