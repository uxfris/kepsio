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

  const fetchUsage = async () => {
    try {
      const response = await fetch("/api/user/usage");
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch usage");
      }

      setUsage(data.usage);
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
    refetch: fetchUsage,
  };
}
