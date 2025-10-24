import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";

interface PaywallState {
  isOpen: boolean;
  currentUsage: {
    used: number;
    limit: number;
  };
}

export function usePaywall() {
  const [paywallState, setPaywallState] = useState<PaywallState>({
    isOpen: false,
    currentUsage: { used: 0, limit: 10 },
  });
  const router = useRouter();

  const showPaywall = useCallback((usage: { used: number; limit: number }) => {
    setPaywallState({
      isOpen: true,
      currentUsage: usage,
    });
  }, []);

  const hidePaywall = useCallback(() => {
    setPaywallState((prev) => ({
      ...prev,
      isOpen: false,
    }));
  }, []);

  const handleUpgrade = useCallback(
    (plan: "pro" | "enterprise") => {
      // Close the paywall modal
      hidePaywall();

      // Redirect to billing/checkout page
      if (plan === "pro") {
        router.push("/settings/billing?plan=pro");
      } else {
        router.push("/settings/billing?plan=enterprise");
      }
    },
    [hidePaywall, router]
  );

  const checkUsageLimit = useCallback(
    (currentUsage: number, limit: number) => {
      if (currentUsage >= limit) {
        showPaywall({ used: currentUsage, limit });
        return true; // Hit limit
      }
      return false; // Within limit
    },
    [showPaywall]
  );

  return {
    isPaywallOpen: paywallState.isOpen,
    currentUsage: paywallState.currentUsage,
    showPaywall,
    hidePaywall,
    handleUpgrade,
    checkUsageLimit,
  };
}
