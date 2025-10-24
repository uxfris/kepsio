import { useState, useEffect } from "react";
import { Subscription } from "../types";

export function useSubscription() {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSubscription();
  }, []);

  const fetchSubscription = async () => {
    try {
      const response = await fetch("/api/user/subscription");
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch subscription");
      }

      setSubscription(data.subscription);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An error occurred";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const isPro = subscription?.plan === "pro";
  const isEnterprise = subscription?.plan === "enterprise";
  const isActive = subscription?.status === "active";

  return {
    subscription,
    isLoading,
    error,
    isPro,
    isEnterprise,
    isActive,
    refetch: fetchSubscription,
  };
}
