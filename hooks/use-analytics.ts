import { useState, useEffect } from "react";

interface AnalyticsOverview {
  totalCaptions: number;
  savedCaptions: number;
  generationsUsed: number;
  generationsLimit: number;
  uniqueGenerations: number;
  timeSavedHours: number;
  saveRate: number;
  currentPeriodEnd: Date;
  plan: string;
}

interface ActivityData {
  last30Days: number;
  last7Days: number;
  byDay: Array<{ date: string; count: number }>;
  growthPercentage: number;
}

interface AnalyticsData {
  overview: AnalyticsOverview;
  platforms: Record<string, number>;
  styles: Record<string, number>;
  activity: ActivityData;
}

export function useAnalytics() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/analytics?t=${Date.now()}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch analytics");
      }

      setAnalytics(data.analytics);
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
    analytics,
    isLoading,
    error,
    refetch: fetchAnalytics,
  };
}
