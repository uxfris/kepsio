"use client";

import React from "react";
import Link from "next/link";
import { Lock, Crown, CheckCircle, LucideIcon } from "lucide-react";
import { Button } from "../ui/Button";
import { Card, CardContent } from "../ui/Card";
import { useSubscription } from "../../contexts/SubscriptionContext";

export interface Feature {
  title: string;
  description: string;
}

export interface FeatureLockProps {
  /** Icon to display (usually the feature icon) */
  icon: LucideIcon;
  /** Icon color class (optional, defaults to white for accent background) */
  iconColor?: string;
  /** Main headline */
  title: string;
  /** Subtitle description */
  description: string;
  /** List of features to highlight */
  features: Feature[];
  /** Required plan to unlock ("pro" | "enterprise") */
  requiredPlan?: "pro" | "enterprise";
  /** Whether to show as full page (centered) or inline component */
  fullPage?: boolean;
  /** Custom upgrade button text */
  upgradeButtonText?: string;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Reusable component for locking features behind subscription plans.
 * Can be used as a full-page lock or inline component.
 *
 * @example
 * ```tsx
 * <FeatureLock
 *   icon={Users}
 *   title="Unlock Team Collaboration"
 *   description="Upgrade to Pro to collaborate with your team"
 *   features={[
 *     { title: "Team Members", description: "Invite up to 3 team members" },
 *     { title: "Shared Workspace", description: "Collaborate on captions" }
 *   ]}
 *   requiredPlan="pro"
 *   fullPage={true}
 * />
 * ```
 */
export function FeatureLock({
  icon: Icon,
  iconColor = "text-accent",
  title,
  description,
  features,
  requiredPlan = "pro",
  fullPage = true,
  upgradeButtonText,
  className,
}: FeatureLockProps) {
  const { isPro, isEnterprise, isLoading } = useSubscription();

  // Determine if user has required plan
  const hasAccess =
    requiredPlan === "pro" ? isPro || isEnterprise : isEnterprise;

  // Don't show lock if user has access or still loading
  if (hasAccess || isLoading) {
    return null;
  }

  // Determine button text
  const defaultUpgradeText =
    requiredPlan === "pro"
      ? "Upgrade to Pro - $19/month"
      : "Upgrade to Enterprise - $100/month";
  const buttonText = upgradeButtonText || defaultUpgradeText;

  const content = (
    <Card
      variant="outlined"
      className={`w-full shadow-2xl border-2 border-accent/20 bg-surface ${
        !fullPage ? "my-6" : ""
      } ${className || ""}`}
    >
      <CardContent padding="lg">
        <div className="text-center space-y-6">
          {/* Icon */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-20 h-20 bg-linear-to-br from-accent to-accent-hover rounded-2xl flex items-center justify-center shadow-lg">
                <Icon className={`w-10 h-10 ${iconColor || "text-white"}`} />
              </div>
              <div className="absolute -top-1 -right-1 w-8 h-8 bg-linear-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-md">
                <Lock className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>

          {/* Headline */}
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-primary">{title}</h2>
            <p className="text-lg text-text-body max-w-md mx-auto">
              {description}
            </p>
          </div>

          {/* Features */}
          {features && features.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left max-w-lg mx-auto py-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-primary">
                      {feature.title}
                    </p>
                    <p className="text-xs text-hint">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
            <Link
              href={requiredPlan === "pro" ? "/upgrade" : "/pricing"}
              className="w-full sm:w-auto"
            >
              <Button
                variant="primary"
                size="lg"
                leftIcon={<Crown className="w-5 h-5" />}
                className="w-full shadow-lg hover:shadow-xl transition-all duration-200"
              >
                {buttonText}
              </Button>
            </Link>
            <Link href="/pricing" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full">
                View All Plans
              </Button>
            </Link>
          </div>

          {/* Small note */}
          <p className="text-xs text-hint">
            No credit card required • Cancel anytime
          </p>
        </div>
      </CardContent>
    </Card>
  );

  // Return full-page centered layout or inline component
  if (fullPage) {
    return (
      <div className="min-h-screen flex items-center justify-center overflow-hidden">
        <div className="py-8 px-4 w-full flex items-center justify-center">
          {content}
        </div>
      </div>
    );
  }

  return content;
}
