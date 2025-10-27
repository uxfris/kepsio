import { useState, useEffect, useCallback } from "react";
import type { UploadedCaption } from "../types/brand-voice";

interface UseTrainingSamplesReturn {
  samples: UploadedCaption[];
  count: number;
  isLoading: boolean;
  error: Error | null;
  refreshSamples: () => Promise<void>;
}

export function useTrainingSamples(): UseTrainingSamplesReturn {
  const [samples, setSamples] = useState<UploadedCaption[]>([]);
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchSamples = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch("/api/brand-voice/training");

      if (!response.ok) {
        throw new Error("Failed to fetch training samples");
      }

      const data = await response.json();
      setSamples(data.samples || []);
      setCount(data.count || 0);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unknown error"));
      console.error("Error fetching training samples:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSamples();
  }, [fetchSamples]);

  return {
    samples,
    count,
    isLoading,
    error,
    refreshSamples: fetchSamples,
  };
}
