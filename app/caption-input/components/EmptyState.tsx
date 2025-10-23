import React from "react";
import { Sparkles } from "lucide-react";

export const EmptyState = () => {
  return (
    <div className="flex-1 flex items-center justify-center p-12 bg-section">
      <div className="text-center">
        {/* Illustration */}
        <div className="mb-8 relative">
          <div className="inline-flex items-center justify-center w-32 h-32 bg-accent/10 rounded-2xl shadow-lg mb-6">
            <div className="relative">
              <Sparkles className="w-16 h-16 text-accent" />
            </div>
          </div>
        </div>

        {/* Empty State Text */}
        <h2 className="text-2xl font-semibold mb-3">
          Your captions will appear here
        </h2>
        <p className="mb-8 leading-relaxed">
          Describe your content on the left, and we'll generate 5 variations in
          your voice
        </p>

        {/* Tip Callout */}
        <div className="inline-flex items-center gap-3 px-4 py-3 bg-surface rounded-lg border border-border">
          <span className="text-xl">💡</span>
          <p className="text-sm text-left">
            <span className="font-medium text-primary">Pro tip:</span> The more
            context you add, the better your captions
          </p>
        </div>
      </div>
    </div>
  );
};
