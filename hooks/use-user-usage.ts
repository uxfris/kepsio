import { useState, useEffect } from "react";

interface UsageStats {
  captionsUsed: number;
  captionsLimit: number;
  resetDate: Date;
}

export function useUserUsage() {
  const [usage, setUsage] = useState<UsageStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUsage();
  }, []);

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

  return {
    usage,
    isLoading,
    error,
    refetch: () => fetchUsage(false), // Don't show loading spinner on refetch
  };
}
