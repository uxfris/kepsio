import { Platform, CaptionStyle, SortOption } from "@/types/captions";

// Platform options for filtering
export const PLATFORMS: string[] = ["All", "instagram", "linkedin", "x"];

// Caption style options for filtering
export const CAPTION_STYLES: string[] = [
  "All",
  "Teaser",
  "Thought Leadership",
  "Engagement",
  "Educational",
  "Listicle",
  "Relatable",
  "Behind the Scenes",
  "Personal Story",
  "Discussion",
  "Lifestyle",
];

// Sort options for caption ordering
export const SORT_OPTIONS: SortOption[] = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "engagement", label: "Highest Engagement" },
  { value: "platform", label: "Platform" },
];

// Pagination options
export const ITEMS_PER_PAGE_OPTIONS = [
  { value: "6", label: "6 per page" },
  { value: "12", label: "12 per page" },
  { value: "24", label: "24 per page" },
  { value: "48", label: "48 per page" },
];

// Default pagination settings
export const DEFAULT_ITEMS_PER_PAGE = 12;
export const DEFAULT_CURRENT_PAGE = 1;

// Platform colors for UI styling
export const PLATFORM_COLORS: Record<Platform, string> = {
  instagram: "bg-pink-100 text-pink-600 border-pink-200",
  linkedin: "bg-blue-100 text-blue-600 border-blue-200",
  x: "bg-gray-100 text-gray-600 border-gray-200",
};

// Toast messages
export const TOAST_MESSAGES = {
  COPY_SUCCESS: {
    type: "success" as const,
    title: "Caption copied! 📋",
    description: "Ready to paste and share",
  },
  COPY_ERROR: {
    type: "error" as const,
    title: "Copy failed",
    description: "Please try again",
  },
  NO_SELECTION: {
    type: "error" as const,
    title: "No captions selected",
    description: "Please select captions first",
  },
  BULK_ACTION_SUCCESS: (action: string, count: number) => ({
    type: "success" as const,
    title: `${action} completed`,
    description: `${count} captions ${action.toLowerCase()}ed`,
  }),
} as const;
