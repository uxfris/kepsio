"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Subscription } from "../types";

interface SubscriptionContextType {
  subscription: Subscription | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
  isPro: boolean;
  isEnterprise: boolean;
  isFree: boolean;
  isActive: boolean;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(
  undefined
);

export function SubscriptionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSubscription = async (showLoading = true) => {
    try {
      if (showLoading) {
        setIsLoading(true);
      }

      // Add timestamp to prevent caching
      const response = await fetch(`/api/user/subscription?t=${Date.now()}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch subscription");
      }

      setSubscription(data.subscription);
      setError(null);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An error occurred";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscription();
  }, []);

  // Computed values
  const isPro = subscription?.plan === "pro";
  const isEnterprise = subscription?.plan === "enterprise";
  const isFree = subscription?.plan === "free" || !subscription;
  const isActive = subscription?.status === "active";

  return (
    <SubscriptionContext.Provider
      value={{
        subscription,
        isLoading,
        error,
        refetch: () => fetchSubscription(false),
        isPro,
        isEnterprise,
        isFree,
        isActive,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
}

export function useSubscription() {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error(
      "useSubscription must be used within a SubscriptionProvider"
    );
  }
  return context;
}
