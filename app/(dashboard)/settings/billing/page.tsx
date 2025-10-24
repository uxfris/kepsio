"use client";

import React from "react";
import { Zap, Check, ExternalLink } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "../../../../components/ui/Button";
import { Card, CardContent } from "../../../../components/ui/Card";

const BillingSettingsContent = () => {
  const router = useRouter();

  // Billing Info
  const planType = "Free";
  const captionsRemaining = 6;

  const handleUpgrade = () => {
    // TODO: Implement actual upgrade logic with Stripe
    // For now, redirect to success page for testing
    router.push("/success");
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-display font-bold text-primary mb-1">
          Billing & Plan
        </h2>
        <p className="text-sm text-hint">
          Manage your subscription and payment methods
        </p>
      </div>

      {/* Current Plan */}
      <Card variant="outlined" className="mb-6">
        <CardContent padding="lg">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-primary">
                Current Plan
              </h3>
              <p className="text-sm text-hint mt-1">
                You're currently on the Free plan
              </p>
            </div>
            <span className="px-3 py-1 bg-chip-bg text-text-body rounded-full text-sm font-medium">
              {planType}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="p-4 bg-section-light rounded-lg">
              <p className="text-sm text-hint mb-1">Captions Remaining</p>
              <p className="text-2xl font-display font-bold text-primary">
                {captionsRemaining}
              </p>
            </div>
            <div className="p-4 bg-section-light rounded-lg">
              <p className="text-sm text-hint mb-1">Monthly Limit</p>
              <p className="text-2xl font-display font-bold text-primary">10</p>
            </div>
            <div className="p-4 bg-section-light rounded-lg">
              <p className="text-sm text-hint mb-1">Resets In</p>
              <p className="text-2xl font-display font-bold text-primary">8d</p>
            </div>
          </div>

          <Button
            onClick={handleUpgrade}
            className="w-full"
            size="lg"
            leftIcon={<Zap className="w-5 h-5" />}
          >
            Upgrade to Pro - $19/month
          </Button>
        </CardContent>
      </Card>

      {/* Pro Plan Features */}
      <Card variant="outlined" className="bg-accent/5 border-accent/20">
        <CardContent padding="lg">
          <h3 className="text-lg font-semibold text-primary mb-4">
            Why upgrade to Pro?
          </h3>
          <div className="space-y-3">
            {[
              "Unlimited caption generation",
              "10 variations per generation (vs 5)",
              "Advanced voice cloning",
              "Team collaboration",
              "Analytics & insights",
              "Priority support",
              "Export to scheduling tools",
            ].map((feature, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className="w-5 h-5 bg-accent rounded-full flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 text-white" />
                </div>
                <span className="text-sm text-text-body">{feature}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Test Success Page Link */}
      <Card variant="outlined" className="mt-6 border-dashed border-border">
        <CardContent padding="lg">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-primary mb-2">
              🧪 Test Success Page
            </h3>
            <p className="text-sm text-text-body mb-4">
              Click below to preview the Post-Upgrade Success page
            </p>
            <Button
              onClick={() => router.push("/success")}
              variant="outline"
              size="md"
              rightIcon={<ExternalLink className="w-4 h-4" />}
            >
              View Success Page
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default function BillingSettingsPage() {
  return <BillingSettingsContent />;
}
