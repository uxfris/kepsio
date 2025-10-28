"use client";

import React, { useState } from "react";
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
  Settings,
} from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "../../../../components/ui/Button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/Card";
import { useSubscription } from "../../../../hooks/use-subscription";
import { useUserUsage } from "../../../../hooks/use-user-usage";
import { useToast } from "../../../../components/ui/Toast";
import { subscriptionPlans } from "../../../../config/plans";

const BillingSettingsContent = () => {
  const router = useRouter();
  const { subscription, isLoading: subscriptionLoading } = useSubscription();
  const { usage, isLoading: usageLoading } = useUserUsage();
  const { showToast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);

  const isPaidPlan =
    subscription?.plan === "pro" || subscription?.plan === "enterprise";

  const handleUpgrade = () => {
    router.push("/upgrade");
  };

  const handleManageSubscription = async () => {
    setIsProcessing(true);
    try {
      const response = await fetch("/api/billing/portal", {
        method: "POST",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to open customer portal");
      }

      // Redirect to Stripe Customer Portal
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error("No portal URL received");
      }
    } catch (error) {
      console.error("Portal error:", error);
      showToast(
        error instanceof Error
          ? error.message
          : "Failed to access billing portal. Please try again.",
        "error"
      );
      setIsProcessing(false);
    }
  };

  const currentPlan = subscriptionPlans[subscription?.plan || "free"];
  const daysUntilReset = subscription?.currentPeriodEnd
    ? Math.ceil(
        (new Date(subscription.currentPeriodEnd).getTime() - Date.now()) /
          (1000 * 60 * 60 * 24)
      )
    : 0;

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
                You're currently on the {currentPlan?.name || "Free"} plan
              </p>
            </div>
            <span className="px-3 py-1 bg-chip-bg text-text-body rounded-full text-sm font-medium capitalize">
              {subscription?.plan || "Free"}
            </span>
          </div>
        </CardHeader>
        <CardContent padding="none" className="mt-4">
          {/* Usage Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="p-4 bg-section-light rounded-xl border border-border">
              <p className="text-xs text-hint mb-2 font-medium">
                {isPaidPlan ? "Generations Used" : "Captions Remaining"}
              </p>
              <p className="text-2xl font-display font-bold text-primary">
                {usageLoading
                  ? "..."
                  : isPaidPlan
                  ? usage?.generationsUsed || 0
                  : usage?.generationsLeft || 0}
              </p>
            </div>
            <div className="p-4 bg-section-light rounded-xl border border-border">
              <p className="text-xs text-hint mb-2 font-medium">
                Monthly Limit
              </p>
              <p className="text-2xl font-display font-bold text-primary">
                {currentPlan?.limits.captionsPerMonth === -1
                  ? "∞"
                  : currentPlan?.limits.captionsPerMonth || 0}
              </p>
            </div>
            <div className="p-4 bg-section-light rounded-xl border border-border">
              <p className="text-xs text-hint mb-2 font-medium">Resets In</p>
              <p className="text-2xl font-display font-bold text-primary">
                {daysUntilReset}d
              </p>
            </div>
          </div>

          {/* Progress Bar - Only show for free plan */}
          {!isPaidPlan && (
            <div className="mb-6">
              <div className="flex justify-between text-xs text-hint mb-2">
                <span>Usage this month</span>
                <span>
                  {(usage?.generationsLimit || 0) -
                    (usage?.generationsLeft || 0)}
                  /{usage?.generationsLimit || 0}
                </span>
              </div>
              <div className="w-full bg-section-light rounded-full h-2">
                <div
                  className="bg-accent h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${
                      (((usage?.generationsLimit || 0) -
                        (usage?.generationsLeft || 0)) /
                        (usage?.generationsLimit || 1)) *
                      100
                    }%`,
                  }}
                />
              </div>
            </div>
          )}

          {/* Action Button */}
          {isPaidPlan ? (
            <Button
              onClick={handleManageSubscription}
              className="w-full"
              size="lg"
              variant="outline"
              leftIcon={<Settings className="w-5 h-5" />}
              disabled={isProcessing}
            >
              {isProcessing ? "Opening Portal..." : "Manage Subscription"}
            </Button>
          ) : (
            <Button
              onClick={handleUpgrade}
              className="w-full"
              size="lg"
              leftIcon={<Zap className="w-5 h-5" />}
            >
              Upgrade to Pro - $19/month
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Pro Plan Features - Only show for free users */}
      {!isPaidPlan && (
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
      )}
    </div>
  );
};

export default function BillingSettingsPage() {
  return <BillingSettingsContent />;
}
