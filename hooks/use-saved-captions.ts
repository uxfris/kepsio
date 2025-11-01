import { useState, useEffect, useCallback } from "react";
import { dataCache, CACHE_KEYS, CACHE_TTL } from "../lib/utils/cache";
import type { LibraryCaption } from "../lib/utils/library";

interface ApiCaption {
  id: string;
  fullText: string;
  platform: string;
  style: string;
  createdAt: string;
  isSaved: boolean;
}

interface UseSavedCaptionsReturn {
  captions: LibraryCaption[];
  isLoading: boolean;
  error: Error | null;
  savingCaptionId: string | null;
  refetch: (forceRefresh?: boolean) => Promise<void>;
  updateCaption: (captionId: string, content: string) => void;
  toggleSave: (captionId: string) => Promise<void>;
}

/**
 * Custom hook for managing saved captions
 */
export function useSavedCaptions(): UseSavedCaptionsReturn {
  const [captions, setCaptions] = useState<LibraryCaption[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [savingCaptionId, setSavingCaptionId] = useState<string | null>(null);

  /**
   * Transform API caption to LibraryCaption format
   */
  const transformCaption = useCallback(
    (apiCaption: ApiCaption): LibraryCaption => {
      return {
        id: apiCaption.id,
        content: apiCaption.fullText,
        platform: apiCaption.platform,
        style: apiCaption.style,
        savedDate: apiCaption.createdAt,
        tags: [],
        createdAt: new Date(apiCaption.createdAt),
        isSaved: apiCaption.isSaved,
      };
    },
    []
  );

  /**
   * Fetch saved captions from API
   */
  const fetchCaptions = useCallback(
    async (forceRefresh = false) => {
      try {
        // Check cache first (skip if force refresh)
        if (!forceRefresh) {
          const cachedData = dataCache.get<LibraryCaption[]>(
            CACHE_KEYS.SAVED_CAPTIONS,
            CACHE_TTL.MEDIUM
          );

          if (cachedData) {
            setCaptions(cachedData);
            setIsLoading(false);
            return;
          }
        }

        setIsLoading(true);
        const response = await fetch("/api/captions/recent?limit=100");

        if (!response.ok) {
          throw new Error("Failed to fetch captions");
        }

        const data = await response.json();

        if (data.success) {
          // Filter and transform only saved captions
          const savedCaptions = data.captions
            .filter((c: ApiCaption) => c.isSaved)
            .map(transformCaption);

          setCaptions(savedCaptions);
          dataCache.set(CACHE_KEYS.SAVED_CAPTIONS, savedCaptions);
        } else {
          throw new Error(data.error || "Failed to fetch captions");
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err : new Error("Unknown error");
        setError(errorMessage);
        console.error("Error fetching saved captions:", err);
      } finally {
        setIsLoading(false);
      }
    },
    [transformCaption]
  );

  /**
   * Update caption content locally
   */
  const updateCaption = useCallback((captionId: string, content: string) => {
    setCaptions((prev) =>
      prev.map((caption) =>
        caption.id === captionId ? { ...caption, content } : caption
      )
    );

    // Invalidate cache
    dataCache.invalidate(CACHE_KEYS.SAVED_CAPTIONS);
    dataCache.invalidate(CACHE_KEYS.RECENT_CAPTIONS);
  }, []);

  /**
   * Toggle save status of a caption (optimistic update)
   */
  const toggleSave = useCallback(
    async (captionId: string) => {
      const captionToUpdate = captions.find((c) => c.id === captionId);
      if (!captionToUpdate) return;

      try {
        setSavingCaptionId(captionId);

        // Optimistic update: remove from list
        setCaptions((prev) =>
          prev.filter((caption) => caption.id !== captionId)
        );

        const response = await fetch("/api/captions/save", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ captionId }),
        });

        if (!response.ok) {
          // Revert on failure
          setCaptions((prev) => [...prev, captionToUpdate]);
          throw new Error("Failed to update caption");
        }

        // Invalidate cache on success
        dataCache.invalidate(CACHE_KEYS.SAVED_CAPTIONS);
        dataCache.invalidate(CACHE_KEYS.RECENT_CAPTIONS);
      } catch (err) {
        // Revert on error
        setCaptions((prev) => [...prev, captionToUpdate]);
        throw err;
      } finally {
        setSavingCaptionId(null);
      }
    },
    [captions]
  );

  // Initial fetch on mount
  useEffect(() => {
    fetchCaptions();
  }, [fetchCaptions]);

  // Refetch when page becomes visible
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        const cachedData = dataCache.get<LibraryCaption[]>(
          CACHE_KEYS.SAVED_CAPTIONS,
          CACHE_TTL.MEDIUM
        );

        if (!cachedData) {
          fetchCaptions(true);
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [fetchCaptions]);

  return {
    captions,
    isLoading,
    error,
    savingCaptionId,
    refetch: fetchCaptions,
    updateCaption,
    toggleSave,
  };
}
