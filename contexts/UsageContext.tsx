"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface UsageStats {
  captionsUsed: number;
  captionsLimit: number;
  resetDate: Date;
}

interface UsageContextType {
  usage: UsageStats | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
  incrementUsage: () => void;
}

const UsageContext = createContext<UsageContextType | undefined>(undefined);

export function UsageProvider({ children }: { children: React.ReactNode }) {
  const [usage, setUsage] = useState<UsageStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsage = async (showLoading = true) => {
    try {
      if (showLoading) {
        setIsLoading(true);
      }

      // Add timestamp to prevent caching
      const response = await fetch(`/api/user/usage?t=${Date.now()}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch usage");
      }

      setUsage(data.usage);
      setError(null);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An error occurred";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Optimistic update - immediately update the UI before server confirms
  const incrementUsage = () => {
    setUsage((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        captionsUsed: prev.captionsUsed + 1,
      };
    });
  };

  useEffect(() => {
    fetchUsage();
  }, []);

  return (
    <UsageContext.Provider
      value={{
        usage,
        isLoading,
        error,
        refetch: () => fetchUsage(false),
        incrementUsage,
      }}
    >
      {children}
    </UsageContext.Provider>
  );
}

export function useUsage() {
  const context = useContext(UsageContext);
  if (context === undefined) {
    throw new Error("useUsage must be used within a UsageProvider");
  }
  return context;
}
