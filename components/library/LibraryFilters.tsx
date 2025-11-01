import React, { useRef, useEffect } from "react";
import { Search, Filter, Grid3x3, List, Check } from "lucide-react";
import { Button } from "../ui/Button";
import { getPlatformIcon, getPlatformColor } from "../../lib/utils/library";

interface LibraryFiltersProps {
  // Search
  searchQuery: string;
  onSearchChange: (query: string) => void;

  // Filter state
  filterOpen: boolean;
  onFilterOpenChange: (open: boolean) => void;
  selectedPlatforms: string[];
  selectedStyles: string[];
  availablePlatforms: string[];
  availableStyles: string[];

  // Filter actions
  onTogglePlatform: (platform: string) => void;
  onToggleStyle: (style: string) => void;
  onClearFilters: () => void;

  // Sort
  sortBy: string;
  onSortChange: (sort: string) => void;

  // View mode
  viewMode: "grid" | "list";
  onViewModeChange: (mode: "grid" | "list") => void;

  // Computed
  activeFilterCount: number;
}

export const LibraryFilters: React.FC<LibraryFiltersProps> = ({
  searchQuery,
  onSearchChange,
  filterOpen,
  onFilterOpenChange,
  selectedPlatforms,
  selectedStyles,
  availablePlatforms,
  availableStyles,
  onTogglePlatform,
  onToggleStyle,
  onClearFilters,
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
  activeFilterCount,
}) => {
  const filterRef = useRef<HTMLDivElement>(null);

  // Close filter dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        onFilterOpenChange(false);
      }
    };

    if (filterOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [filterOpen, onFilterOpenChange]);

  return (
    <div className="flex items-center gap-3">
      {/* Search Bar */}
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-hint" />
        <input
          type="text"
          placeholder="Search captions, tags, or platforms..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 text-sm border border-border rounded-xl bg-surface text-text-head placeholder:text-hint focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-colors"
        />
      </div>

      {/* Filter Button & Dropdown */}
      <div className="relative" ref={filterRef}>
        <Button
          variant="outline"
          onClick={() => onFilterOpenChange(!filterOpen)}
          leftIcon={<Filter className="w-4 h-4" />}
          className={
            activeFilterCount > 0 ? "border-accent bg-accent/5 text-accent" : ""
          }
        >
          Filter
          {activeFilterCount > 0 && (
            <span className="ml-1 px-1.5 py-0.5 bg-accent text-surface text-xs rounded-full">
              {activeFilterCount}
            </span>
          )}
        </Button>

        {/* Filter Dropdown */}
        {filterOpen && (
          <div className="absolute right-0 top-full mt-2 w-80 bg-surface rounded-lg border border-border shadow-lg z-10">
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-text-head">Filters</h3>
                <button
                  onClick={onClearFilters}
                  className="text-sm text-accent hover:text-accent-hover font-medium"
                >
                  Clear all
                </button>
              </div>

              {/* Platform Filters */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-text-head mb-2">
                  Platform
                </label>
                <div className="flex flex-wrap gap-2">
                  {availablePlatforms.length > 0 ? (
                    availablePlatforms.map((platform) => (
                      <button
                        key={platform}
                        onClick={() => onTogglePlatform(platform)}
                        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all border ${
                          selectedPlatforms.includes(platform)
                            ? `${getPlatformColor(platform)} border-2`
                            : "bg-chip-bg text-text-body hover:bg-section-light border-border"
                        }`}
                      >
                        {getPlatformIcon(platform)}
                        <span className="capitalize">{platform}</span>
                        {selectedPlatforms.includes(platform) && (
                          <Check className="w-3 h-3" />
                        )}
                      </button>
                    ))
                  ) : (
                    <p className="text-sm text-hint">No platforms available</p>
                  )}
                </div>
              </div>

              {/* Style Filters */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-text-head mb-2">
                  Style
                </label>
                <div className="flex flex-wrap gap-2">
                  {availableStyles.length > 0 ? (
                    availableStyles.map((style) => (
                      <button
                        key={style}
                        onClick={() => onToggleStyle(style)}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all border ${
                          selectedStyles.includes(style)
                            ? "bg-accent/10 text-accent border-accent border-2"
                            : "bg-chip-bg text-text-body hover:bg-section-light border-border"
                        }`}
                      >
                        {style}
                      </button>
                    ))
                  ) : (
                    <p className="text-sm text-hint">No styles available</p>
                  )}
                </div>
              </div>

              {/* Sort By */}
              <div>
                <label className="block text-sm font-medium text-text-head mb-2">
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => onSortChange(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg text-sm bg-surface text-text-head focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
                >
                  <option value="recent">Recently Saved</option>
                  <option value="platform">Platform</option>
                  <option value="style">Style</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* View Mode Toggle */}
      <div className="flex items-center gap-1 border border-border rounded-lg p-1 bg-surface">
        <button
          onClick={() => onViewModeChange("grid")}
          className={`p-2 rounded transition-colors ${
            viewMode === "grid"
              ? "bg-section-light text-text-head"
              : "text-hint hover:text-text-body"
          }`}
          aria-label="Grid view"
        >
          <Grid3x3 className="w-4 h-4" />
        </button>
        <button
          onClick={() => onViewModeChange("list")}
          className={`p-2 rounded transition-colors ${
            viewMode === "list"
              ? "bg-section-light text-text-head"
              : "text-hint hover:text-text-body"
          }`}
          aria-label="List view"
        >
          <List className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
