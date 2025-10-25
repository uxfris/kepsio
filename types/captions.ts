// Caption-related types for the recent captions page

export interface CaptionItem {
  id: number;
  snippet: string;
  fullText: string;
  date: string;
  platform: Platform;
  style: CaptionStyle;
  engagement: number;
  createdAt: Date;
}

export type Platform = "instagram" | "linkedin" | "x";

export type CaptionStyle =
  | "Teaser"
  | "Thought Leadership"
  | "Engagement"
  | "Educational"
  | "Listicle"
  | "Relatable"
  | "Behind the Scenes"
  | "Personal Story"
  | "Discussion"
  | "Lifestyle";

export interface SortOption {
  value: SortBy;
  label: string;
}

export type SortBy = "newest" | "oldest" | "engagement" | "platform";

export type ViewMode = "grid" | "list";

export interface CaptionFilters {
  searchQuery: string;
  selectedPlatform: string;
  selectedStyle: string;
  sortBy: SortBy;
}

export interface PaginationState {
  currentPage: number;
  itemsPerPage: number;
  totalPages: number;
}

export interface BulkAction {
  type: "copy" | "export" | "delete";
  captionIds: number[];
}
