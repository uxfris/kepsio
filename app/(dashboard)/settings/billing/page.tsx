"use client";

import React from "react";
import {
  Zap,
  Check,
  ExternalLink,
  CreditCard,
  Calendar,
  TrendingUp,
  Users,
  BarChart3,
  Headphones,
  Download,
} from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "../../../../components/ui/Button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/Card";

const BillingSettingsContent = () => {
  const router = useRouter();

  // Billing Info
  const planType = "Free";
  const captionsRemaining = 6;
  const monthlyLimit = 10;
  const daysUntilReset = 8;

  const handleUpgrade = () => {
    // TODO: Implement actual upgrade logic with Stripe
    // For now, redirect to success page for testing
    router.push("/success");
  };

  const proFeatures = [
    { icon: Zap, text: "Unlimited caption generation" },
    { icon: TrendingUp, text: "10 variations per generation (vs 5)" },
    { icon: Users, text: "Advanced voice cloning" },
    { icon: Users, text: "Team collaboration" },
    { icon: BarChart3, text: "Analytics & insights" },
    { icon: Headphones, text: "Priority support" },
    { icon: Download, text: "Export to scheduling tools" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <h2 className="text-lg font-semibold text-primary tracking-tight flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-accent" />
          Billing & Plan
        </h2>
        <p className="text-sm font-medium text-text-body">
          Manage your subscription and payment methods
        </p>
      </div>

      {/* Current Plan */}
      <Card variant="outlined" className="overflow-hidden">
        <CardHeader padding="none" className="border-b border-border mb-4 pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base font-semibold text-primary">
                Current Plan
              </CardTitle>
              <p className="text-sm text-hint mt-1">
                You're currently on the Free plan
              </p>
            </div>
            <span className="px-3 py-1 bg-chip-bg text-text-body rounded-full text-sm font-medium">
              {planType}
            </span>
          </div>
        </CardHeader>
        <CardContent padding="none" className="mt-4">
          {/* Usage Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="p-4 bg-section-light rounded-xl border border-border">
              <p className="text-xs text-hint mb-2 font-medium">
                Captions Remaining
              </p>
              <p className="text-2xl font-display font-bold text-primary">
                {captionsRemaining}
              </p>
            </div>
            <div className="p-4 bg-section-light rounded-xl border border-border">
              <p className="text-xs text-hint mb-2 font-medium">
                Monthly Limit
              </p>
              <p className="text-2xl font-display font-bold text-primary">
                {monthlyLimit}
              </p>
            </div>
            <div className="p-4 bg-section-light rounded-xl border border-border">
              <p className="text-xs text-hint mb-2 font-medium">Resets In</p>
              <p className="text-2xl font-display font-bold text-primary">
                {daysUntilReset}d
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between text-xs text-hint mb-2">
              <span>Usage this month</span>
              <span>
                {monthlyLimit - captionsRemaining}/{monthlyLimit}
              </span>
            </div>
            <div className="w-full bg-section-light rounded-full h-2">
              <div
                className="bg-accent h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${
                    ((monthlyLimit - captionsRemaining) / monthlyLimit) * 100
                  }%`,
                }}
              />
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
      <Card
        padding="none"
        variant="outlined"
        className="bg-accent/5 border-accent/20 overflow-hidden"
      >
        <CardHeader
          padding="lg"
          className="border-b border-accent/20 mb-4 pb-4"
        >
          <CardTitle className="text-base font-semibold text-primary">
            Why upgrade to Pro?
          </CardTitle>
        </CardHeader>
        <CardContent padding="lg" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {proFeatures.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-3 rounded-lg bg-white/50"
                >
                  <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-accent" />
                  </div>
                  <span className="text-sm text-text-body font-medium">
                    {feature.text}
                  </span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Test Success Page Link */}
      <Card
        variant="outlined"
        className="border-dashed border-border bg-section-light/50"
      >
        <CardContent padding="none" className="mt-4">
          <div className="text-center">
            <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mx-auto mb-4">
              <ExternalLink className="w-6 h-6 text-accent" />
            </div>
            <h3 className="text-base font-semibold text-primary mb-2">
              Test Success Page
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
