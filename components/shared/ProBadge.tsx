import React from "react";
import { Crown, Lock } from "lucide-react";
import { cn } from "../../lib/utils/cn";
import { useSubscription } from "../../contexts/SubscriptionContext";

export interface ProBadgeProps {
  /** Whether to show lock icon (default: true for free users) */
  showLock?: boolean;
  /** Size variant */
  size?: "sm" | "md" | "lg";
  /** Position - "top-right", "top-left", "inline" */
  position?: "top-right" | "top-left" | "inline";
  /** Show only for free users (default: true) */
  showForFreeOnly?: boolean;
  /** Required plan level */
  requiredPlan?: "pro" | "enterprise";
  /** Custom className */
  className?: string;
  /** Tooltip text */
  tooltip?: string;
}

/**
 * ProBadge - Visual indicator for Pro/Enterprise features
 * Shows a crown or lock icon to indicate premium features
 */
export function ProBadge({
  showLock = true,
  size = "sm",
  position = "inline",
  showForFreeOnly = true,
  requiredPlan = "pro",
  className,
  tooltip,
}: ProBadgeProps) {
  const { isPro, isEnterprise, isLoading } = useSubscription();

  // Don't show for Pro/Enterprise users if showForFreeOnly is true
  if (showForFreeOnly && (isPro || isEnterprise || isLoading)) {
    return null;
  }

  const hasAccess =
    requiredPlan === "pro" ? isPro || isEnterprise : isEnterprise;

  // If user has access, show crown icon
  if (hasAccess && !isLoading) {
    const sizeClasses = {
      sm: "w-3.5 h-3.5",
      md: "w-4 h-4",
      lg: "w-5 h-5",
    };

    const textSizeClasses = {
      sm: "text-[9px] px-1 py-0.5",
      md: "text-[10px] px-1.5 py-0.5",
      lg: "text-xs px-2 py-1",
    };

    return (
      <span
        className={cn(
          "inline-flex items-center gap-0.5 bg-yellow-500/20 text-yellow-600 rounded-full font-semibold",
          textSizeClasses[size],
          position === "top-right" && "absolute -top-1 -right-1",
          position === "top-left" && "absolute -top-1 -left-1",
          className
        )}
        title={tooltip || "Pro Feature"}
      >
        <Crown className={cn("text-yellow-600", sizeClasses[size])} />
        {size !== "sm" && <span>Pro</span>}
      </span>
    );
  }

  // Show lock for free users
  if (showLock && !isLoading) {
    const sizeClasses = {
      sm: "w-3 h-3",
      md: "w-3.5 h-3.5",
      lg: "w-4 h-4",
    };

    const badgeSizeClasses = {
      sm: "w-4 h-4",
      md: "w-5 h-5",
      lg: "w-6 h-6",
    };

    return (
      <span
        className={cn(
          "inline-flex items-center justify-center bg-accent/10 text-accent rounded-full shrink-0",
          badgeSizeClasses[size],
          position === "top-right" && "absolute -top-1 -right-1",
          position === "top-left" && "absolute -top-1 -left-1",
          className
        )}
        title={
          tooltip ||
          `Upgrade to ${
            requiredPlan === "pro" ? "Pro" : "Enterprise"
          } to unlock`
        }
      >
        <Lock className={cn("text-accent", sizeClasses[size])} />
      </span>
    );
  }

  return null;
}

/**
 * ProLabel - Inline label showing "Pro" or "Enterprise" tag
 */
export function ProLabel({
  requiredPlan = "pro",
  size = "sm",
  className,
}: {
  requiredPlan?: "pro" | "enterprise";
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const sizeClasses = {
    sm: "text-[10px] px-1.5 py-0.5",
    md: "text-xs px-2 py-1",
    lg: "text-sm px-2.5 py-1",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 bg-yellow-500/20 text-yellow-600 rounded-full font-semibold",
        sizeClasses[size],
        className
      )}
    >
      <Crown className="w-3 h-3 text-yellow-600" />
      <span>{requiredPlan === "pro" ? "Pro" : "Enterprise"}</span>
    </span>
  );
}
