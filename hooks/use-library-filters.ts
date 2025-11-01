import { useState, useMemo, useCallback } from "react";
import {
  filterCaptions,
  sortCaptions,
  getUniqueValues,
  type LibraryCaption,
} from "../lib/utils/library";

interface UseLibraryFiltersOptions {
  captions: LibraryCaption[];
}

interface UseLibraryFiltersReturn {
  // State
  searchQuery: string;
  selectedPlatforms: string[];
  selectedStyles: string[];
  sortBy: string;
  filterOpen: boolean;

  // Derived data
  filteredCaptions: LibraryCaption[];
  availablePlatforms: string[];
  availableStyles: string[];
  hasActiveFilters: boolean;

  // Actions
  setSearchQuery: (query: string) => void;
  togglePlatformFilter: (platform: string) => void;
  toggleStyleFilter: (style: string) => void;
  setSortBy: (sort: string) => void;
  setFilterOpen: (open: boolean) => void;
  clearAllFilters: () => void;
}

/**
 * Custom hook for managing library filters and search
 */
export function useLibraryFilters({
  captions,
}: UseLibraryFiltersOptions): UseLibraryFiltersReturn {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("recent");
  const [filterOpen, setFilterOpen] = useState(false);

  // Get available filter options from actual data
  const availablePlatforms = useMemo(
    () => getUniqueValues(captions, "platform"),
    [captions]
  );

  const availableStyles = useMemo(
    () => getUniqueValues(captions, "style"),
    [captions]
  );

  // Filter and sort captions
  const filteredCaptions = useMemo(() => {
    const filtered = filterCaptions(
      captions,
      searchQuery,
      selectedPlatforms,
      selectedStyles
    );
    return sortCaptions(filtered, sortBy);
  }, [captions, searchQuery, selectedPlatforms, selectedStyles, sortBy]);

  // Check if any filters are active
  const hasActiveFilters = useMemo(
    () =>
      searchQuery !== "" ||
      selectedPlatforms.length > 0 ||
      selectedStyles.length > 0,
    [searchQuery, selectedPlatforms, selectedStyles]
  );

  // Toggle platform filter
  const togglePlatformFilter = useCallback((platform: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platform)
        ? prev.filter((p) => p !== platform)
        : [...prev, platform]
    );
  }, []);

  // Toggle style filter
  const toggleStyleFilter = useCallback((style: string) => {
    setSelectedStyles((prev) =>
      prev.includes(style) ? prev.filter((s) => s !== style) : [...prev, style]
    );
  }, []);

  // Clear all filters
  const clearAllFilters = useCallback(() => {
    setSearchQuery("");
    setSelectedPlatforms([]);
    setSelectedStyles([]);
  }, []);

  return {
    // State
    searchQuery,
    selectedPlatforms,
    selectedStyles,
    sortBy,
    filterOpen,

    // Derived data
    filteredCaptions,
    availablePlatforms,
    availableStyles,
    hasActiveFilters,

    // Actions
    setSearchQuery,
    togglePlatformFilter,
    toggleStyleFilter,
    setSortBy,
    setFilterOpen,
    clearAllFilters,
  };
}
