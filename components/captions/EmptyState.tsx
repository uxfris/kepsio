import React from "react";
import { Sparkles, AlertCircle, RefreshCw, Lightbulb } from "lucide-react";
import { Button } from "../ui/Button";
import { Card, CardContent } from "../ui/Card";

interface EmptyStateProps {
  type?: "default" | "error";
  onRetry?: () => void;
}

export const EmptyState = ({ type = "default", onRetry }: EmptyStateProps) => {
  if (type === "error") {
    return (
      <div className="flex-1 flex items-center justify-center p-6 bg-section h-full">
        <div className="max-w-md mx-auto text-center">
          <Card variant="elevated" className="p-8">
            <CardContent padding="none">
              <div className="w-16 h-16 mx-auto mb-6 bg-warning/10 rounded-full flex items-center justify-center">
                <AlertCircle className="w-8 h-8 text-warning" />
              </div>
              <h3 className="text-xl font-semibold text-primary mb-3">
                Hmm, we hit a snag
              </h3>
              <p className="text-text-body mb-6 leading-relaxed">
                Couldn't generate captions this time. This helps:
              </p>
              <div className="text-left space-y-3 mb-6">
                <div className="flex items-start gap-3">
                  <Lightbulb className="w-4 h-4 text-accent mt-1 shrink-0" />
                  <span className="text-sm text-text-body">
                    Add more context about your content
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <Lightbulb className="w-4 h-4 text-accent mt-1 shrink-0" />
                  <span className="text-sm text-text-body">
                    Try a different description
                  </span>
                </div>
              </div>
              {onRetry && (
                <Button
                  variant="primary"
                  onClick={onRetry}
                  leftIcon={<RefreshCw className="w-4 h-4" />}
                >
                  Try Again
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex items-center justify-center p-8 bg-section h-full">
      <div className="max-w-lg mx-auto text-center">
        {/* Illustration */}
        <div className="mb-10 relative">
          <div className="inline-flex items-center justify-center w-40 h-40 bg-linear-to-br from-accent/10 to-accent/5 rounded-3xl shadow-xl mb-8">
            <div className="relative">
              <Sparkles className="w-20 h-20 text-accent" />
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent/20 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Empty State Text */}
        <div className="space-y-4 mb-10">
          <h2 className="text-3xl font-bold text-primary tracking-tight">
            Your captions will appear here
          </h2>
          <p className="text-lg text-text-body leading-relaxed">
            Describe your content on the left, and we'll generate 5 variations
            in your voice
          </p>
        </div>

        {/* Tip Callout */}
        <div className="inline-flex items-center gap-2 px-5 py-3 bg-surface rounded-2xl border border-border shadow-sm">
          <span className="text-2xl">💡 </span>
          <p className="text-sm font-medium text-primary inline-flex items-center gap-1">
            Pro tip:
            <span className="text-sm text-text-body">
              The more context you add, the better your captions
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};
