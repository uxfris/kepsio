import { useState, useMemo } from "react";
import { CaptionItem, CaptionFilters, ViewMode } from "@/types/captions";
import { filterAndSortCaptions, paginateCaptions } from "@/lib/utils/captions";
import {
  DEFAULT_ITEMS_PER_PAGE,
  DEFAULT_CURRENT_PAGE,
} from "@/lib/constants/captions";

interface UseCaptionsFiltersProps {
  captions: CaptionItem[];
}

export function useCaptionsFilters({ captions }: UseCaptionsFiltersProps) {
  const [filters, setFilters] = useState<CaptionFilters>({
    searchQuery: "",
    selectedPlatform: "All",
    selectedStyle: "All",
    sortBy: "newest",
  });

  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [currentPage, setCurrentPage] = useState(DEFAULT_CURRENT_PAGE);
  const [itemsPerPage, setItemsPerPage] = useState(DEFAULT_ITEMS_PER_PAGE);
  const [showSearchPanel, setShowSearchPanel] = useState(false);
  const [showFilterPanel, setShowFilterPanel] = useState(false);

  // Filter and sort captions
  const filteredAndSortedCaptions = useMemo(() => {
    return filterAndSortCaptions(captions, filters);
  }, [captions, filters]);

  // Paginate captions
  const pagination = useMemo(() => {
    return paginateCaptions(
      filteredAndSortedCaptions,
      currentPage,
      itemsPerPage
    );
  }, [filteredAndSortedCaptions, currentPage, itemsPerPage]);

  // Reset pagination when filters change
  useMemo(() => {
    setCurrentPage(DEFAULT_CURRENT_PAGE);
  }, [
    filters.searchQuery,
    filters.selectedPlatform,
    filters.selectedStyle,
    filters.sortBy,
  ]);

  const updateFilter = <K extends keyof CaptionFilters>(
    key: K,
    value: CaptionFilters[K]
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters({
      searchQuery: "",
      selectedPlatform: "All",
      selectedStyle: "All",
      sortBy: "newest",
    });
  };

  const toggleSearchPanel = () => {
    setShowSearchPanel((prev) => !prev);
    // Close filter panel when opening search panel
    if (!showSearchPanel) {
      setShowFilterPanel(false);
    }
  };

  const toggleFilterPanel = () => {
    setShowFilterPanel((prev) => !prev);
    // Close search panel when opening filter panel
    if (!showFilterPanel) {
      setShowSearchPanel(false);
    }
  };

  const updatePagination = (page: number) => {
    setCurrentPage(page);
  };

  const updateItemsPerPage = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(DEFAULT_CURRENT_PAGE);
  };

  return {
    // State
    filters,
    viewMode,
    currentPage,
    itemsPerPage,
    showSearchPanel,
    showFilterPanel,

    // Computed values
    filteredAndSortedCaptions,
    pagination,

    // Actions
    updateFilter,
    resetFilters,
    setViewMode,
    toggleSearchPanel,
    toggleFilterPanel,
    updatePagination,
    updateItemsPerPage,
  };
}
