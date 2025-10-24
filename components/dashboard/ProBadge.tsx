"use client";

import { motion } from "framer-motion";
import { Zap, Crown, Star } from "lucide-react";
import { useUserUsage } from "@/hooks/use-user-usage";
import { useSubscription } from "@/hooks/use-subscription";
import { subscriptionPlans } from "../../config/plans";
import Link from "next/link";

interface ProBadgeProps {
  isCollapsed: boolean;
}

export default function ProBadge({ isCollapsed }: ProBadgeProps) {
  const { usage, isLoading: usageLoading } = useUserUsage();
  const { subscription, isLoading: subscriptionLoading } = useSubscription();

  if (subscriptionLoading || usageLoading) {
    return (
      <div className="px-6 py-4 border-t border-border">
        <div className="animate-pulse">
          <div className="h-16 bg-section-light rounded-xl"></div>
        </div>
      </div>
    );
  }

  const currentPlan = subscription?.plan || "free";
  const planConfig = subscriptionPlans[currentPlan];
  const isPro = currentPlan === "pro" || currentPlan === "enterprise";

  const captionsUsed = usage?.captionsUsed || 0;
  const captionsLimit = planConfig.limits.captionsPerDay;
  const usagePercentage = (captionsUsed / captionsLimit) * 100;

  const getPlanIcon = () => {
    if (currentPlan === "enterprise")
      return <Crown className="h-4 w-4 text-white" />;
    if (currentPlan === "pro") return <Star className="h-4 w-4 text-white" />;
    return <Zap className="h-4 w-4 text-white" />;
  };

  const getPlanColor = () => {
    if (currentPlan === "enterprise")
      return "bg-gradient-to-r from-accent to-primary";
    if (currentPlan === "pro")
      return "bg-gradient-to-r from-accent to-accent/80";
    return "bg-gradient-to-r from-primary to-primary/80";
  };

  if (isCollapsed) {
    return (
      <div className="px-6 py-4 border-t border-border">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
          className="flex justify-center"
        >
          <Link href="/settings/billing">
            <div
              className={`w-10 h-10 ${getPlanColor()} rounded-lg flex items-center justify-center border border-border hover:scale-105 transition-transform duration-200 cursor-pointer`}
            >
              {getPlanIcon()}
            </div>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="px-6 py-4">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="bg-surface rounded-xl border border-border p-4 hover:shadow-md transition-shadow duration-200"
      >
        {/* Header with plan name and icon */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div
              className={`w-8 h-8 ${getPlanColor()} rounded-lg flex items-center justify-center`}
            >
              {getPlanIcon()}
            </div>
            <div>
              <p className="text-sm font-semibold text-primary">
                {planConfig.name} Plan
              </p>
              {isPro && (
                <p className="text-xs text-accent font-medium">Active</p>
              )}
            </div>
          </div>
        </div>

        {/* Credit counter - made to stand out */}
        <div className="mb-4">
          <div>
            <span className="text-2xl font-bold text-primary">
              {captionsUsed}{" "}
            </span>
            <span className="text-xs text-text-body">
              / {captionsLimit} left
            </span>
          </div>

          <div className="flex-1 bg-border rounded-full h-2 overflow-hidden mt-1">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${usagePercentage}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="h-full bg-linear-to-r from-primary to-accent rounded-full transition-all duration-300 ease-out"
            />
          </div>
        </div>

        {/* CTA Button */}
        {!isPro ? (
          <Link href="/settings/billing">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-accent hover:bg-accent/90 text-white text-sm font-medium py-2.5 px-4 rounded-lg transition-colors duration-200"
            >
              Upgrade to Pro
            </motion.button>
          </Link>
        ) : (
          <Link href="/settings/billing">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-section-light hover:bg-section border border-border text-primary text-sm font-medium py-2.5 px-4 rounded-lg transition-colors duration-200"
            >
              Manage Plan
            </motion.button>
          </Link>
        )}
      </motion.div>
    </div>
  );
}
