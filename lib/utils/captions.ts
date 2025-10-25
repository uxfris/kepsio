import {
  CaptionItem,
  CaptionFilters,
  SortBy,
  Platform,
} from "@/types/captions";
import { PLATFORM_COLORS } from "@/lib/constants/captions";

/**
 * Filters and sorts captions based on provided criteria
 */
export function filterAndSortCaptions(
  captions: CaptionItem[],
  filters: CaptionFilters
): CaptionItem[] {
  let filtered = captions.filter((caption) => {
    const matchesSearch =
      caption.fullText
        .toLowerCase()
        .includes(filters.searchQuery.toLowerCase()) ||
      caption.snippet.toLowerCase().includes(filters.searchQuery.toLowerCase());
    const matchesPlatform =
      filters.selectedPlatform === "All" ||
      caption.platform === filters.selectedPlatform;
    const matchesStyle =
      filters.selectedStyle === "All" ||
      caption.style === filters.selectedStyle;

    return matchesSearch && matchesPlatform && matchesStyle;
  });

  // Sort captions
  filtered.sort((a, b) => {
    switch (filters.sortBy) {
      case "newest":
        return b.createdAt.getTime() - a.createdAt.getTime();
      case "oldest":
        return a.createdAt.getTime() - b.createdAt.getTime();
      case "engagement":
        return b.engagement - a.engagement;
      case "platform":
        return a.platform.localeCompare(b.platform);
      default:
        return 0;
    }
  });

  return filtered;
}

/**
 * Paginates an array of captions
 */
export function paginateCaptions(
  captions: CaptionItem[],
  currentPage: number,
  itemsPerPage: number
): {
  paginatedCaptions: CaptionItem[];
  totalPages: number;
  startIndex: number;
  endIndex: number;
} {
  const totalPages = Math.ceil(captions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedCaptions = captions.slice(startIndex, endIndex);

  return {
    paginatedCaptions,
    totalPages,
    startIndex,
    endIndex,
  };
}

/**
 * Gets the platform color class for styling
 */
export function getPlatformColor(platform: Platform): string {
  return PLATFORM_COLORS[platform] || PLATFORM_COLORS.x;
}

/**
 * Calculates the number of active filters
 */
export function getActiveFiltersCount(filters: CaptionFilters): number {
  let count = 0;
  if (filters.selectedPlatform !== "All") count++;
  if (filters.selectedStyle !== "All") count++;
  if (filters.sortBy !== "newest") count++;
  if (filters.searchQuery) count++;
  return count;
}

/**
 * Checks if any filters are active
 */
export function hasActiveFilters(filters: CaptionFilters): boolean {
  return getActiveFiltersCount(filters) > 0;
}

/**
 * Resets all filters to default values
 */
export function resetFilters(): CaptionFilters {
  return {
    searchQuery: "",
    selectedPlatform: "All",
    selectedStyle: "All",
    sortBy: "newest",
  };
}

/**
 * Copies text to clipboard
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error("Failed to copy text:", error);
    return false;
  }
}

/**
 * Generates page numbers for pagination
 */
export function generatePageNumbers(
  currentPage: number,
  totalPages: number
): number[] {
  const maxVisiblePages = 5;
  const pages: number[] = [];

  if (totalPages <= maxVisiblePages) {
    // Show all pages if total is less than max visible
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else if (currentPage <= 3) {
    // Show first 5 pages
    for (let i = 1; i <= maxVisiblePages; i++) {
      pages.push(i);
    }
  } else if (currentPage >= totalPages - 2) {
    // Show last 5 pages
    for (let i = totalPages - maxVisiblePages + 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    // Show pages around current page
    for (let i = currentPage - 2; i <= currentPage + 2; i++) {
      pages.push(i);
    }
  }

  return pages;
}
