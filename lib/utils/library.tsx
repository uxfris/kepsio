/**
 * Utility functions for the Library page
 */

import { SocialIcon } from "react-social-icons";

export interface LibraryCaption {
  id: string;
  content: string;
  platform: string;
  style: string;
  savedDate: string;
  tags: string[];
  createdAt: Date;
  isSaved?: boolean;
}

export interface LibraryStats {
  totalSaved: number;
  topPlatform: string;
  topStyle: string;
}

/**
 * Get platform icon component
 */
export const getPlatformIcon = (platform: string) => {
  const icons = {
    instagram: (
      <SocialIcon network="instagram" style={{ width: 16, height: 16 }} />
    ),
    linkedin: (
      <SocialIcon network="linkedin" style={{ width: 16, height: 16 }} />
    ),
    x: <SocialIcon network="x" style={{ width: 16, height: 16 }} />,
  };
  return icons[platform as keyof typeof icons];
};

/**
 * Get platform color classes
 */
export const getPlatformColor = (platform: string): string => {
  const colors: Record<string, string> = {
    instagram: "bg-pink-50 text-pink-600 border-pink-200",
    linkedin: "bg-blue-50 text-blue-600 border-blue-200",
    x: "bg-gray-100 text-gray-600 border-gray-200",
  };
  return colors[platform] || "bg-gray-100 text-gray-600 border-gray-200";
};

/**
 * Calculate library statistics
 */
export const calculateLibraryStats = (
  captions: LibraryCaption[]
): LibraryStats => {
  const totalSaved = captions.length;

  // Calculate top platform
  const platformCounts = captions.reduce((acc, caption) => {
    acc[caption.platform] = (acc[caption.platform] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const topPlatform =
    Object.keys(platformCounts).length > 0
      ? Object.keys(platformCounts).reduce((a, b) =>
          platformCounts[a] > platformCounts[b] ? a : b
        )
      : "instagram";

  // Calculate top style
  const styleCounts = captions.reduce((acc, caption) => {
    acc[caption.style] = (acc[caption.style] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const topStyle =
    Object.keys(styleCounts).length > 0
      ? Object.keys(styleCounts).reduce((a, b) =>
          styleCounts[a] > styleCounts[b] ? a : b
        )
      : "Thought Leadership";

  return { totalSaved, topPlatform, topStyle };
};

/**
 * Get unique values from captions
 */
export const getUniqueValues = (
  captions: LibraryCaption[],
  key: keyof LibraryCaption
): string[] => {
  const values = new Set(captions.map((c) => c[key] as string));
  return Array.from(values).sort();
};

/**
 * Export captions to CSV
 */
export const exportCaptionsToCSV = (captions: LibraryCaption[]): Blob => {
  const headers = ["Content", "Platform", "Style", "Date"];
  const csvContent = [
    headers.join(","),
    ...captions.map((caption) =>
      [
        `"${caption.content.replace(/"/g, '""')}"`, // Escape quotes
        caption.platform,
        caption.style,
        new Date(caption.savedDate).toLocaleDateString(),
      ].join(",")
    ),
  ].join("\n");

  return new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
};

/**
 * Download a blob as a file
 */
export const downloadBlob = (blob: Blob, filename: string): void => {
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * Sort captions based on sort criteria
 */
export const sortCaptions = (
  captions: LibraryCaption[],
  sortBy: string
): LibraryCaption[] => {
  const sorted = [...captions];

  switch (sortBy) {
    case "recent":
      return sorted.sort(
        (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
      );
    case "platform":
      return sorted.sort((a, b) => a.platform.localeCompare(b.platform));
    case "style":
      return sorted.sort((a, b) => a.style.localeCompare(b.style));
    default:
      return sorted;
  }
};

/**
 * Filter captions based on search and filter criteria
 */
export const filterCaptions = (
  captions: LibraryCaption[],
  searchQuery: string,
  selectedPlatforms: string[],
  selectedStyles: string[]
): LibraryCaption[] => {
  let filtered = captions;

  // Search filter
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filtered = filtered.filter(
      (caption) =>
        caption.content.toLowerCase().includes(query) ||
        caption.tags.some((tag) => tag.toLowerCase().includes(query)) ||
        caption.platform.toLowerCase().includes(query)
    );
  }

  // Platform filter
  if (selectedPlatforms.length > 0) {
    filtered = filtered.filter((caption) =>
      selectedPlatforms.includes(caption.platform)
    );
  }

  // Style filter
  if (selectedStyles.length > 0) {
    filtered = filtered.filter((caption) =>
      selectedStyles.includes(caption.style)
    );
  }

  return filtered;
};
