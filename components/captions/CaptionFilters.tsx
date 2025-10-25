import {
  Search,
  Filter,
  SortDesc,
  SortAsc,
  TrendingUp,
  Grid,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/Select";
import { CaptionFilters as CaptionFiltersType } from "@/types/captions";
import {
  PLATFORMS,
  CAPTION_STYLES,
  SORT_OPTIONS,
} from "@/lib/constants/captions";
import { getPlatformColor } from "@/lib/utils/captions";
import { PlatformIcon } from "./PlatformIcon";

interface CaptionFiltersProps {
  filters: CaptionFiltersType;
  onFilterChange: <K extends keyof CaptionFiltersType>(
    key: K,
    value: CaptionFiltersType[K]
  ) => void;
  onResetFilters: () => void;
}

export function CaptionFilters({
  filters,
  onFilterChange,
  onResetFilters,
}: CaptionFiltersProps) {
  const hasActiveFilters =
    filters.selectedPlatform !== "All" ||
    filters.selectedStyle !== "All" ||
    filters.sortBy !== "newest";

  return (
    <div className="px-6 py-6">
      <Card className="mb-6">
        <CardContent padding="lg">
          <div className="space-y-6">
            {/* Search Section */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-primary flex items-center gap-2">
                <Search className="w-4 h-4 text-accent" />
                Search Captions
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-hint" />
                <Input
                  placeholder="Search by content, style, or platform..."
                  value={filters.searchQuery}
                  onChange={(e) =>
                    onFilterChange("searchQuery", e.target.value)
                  }
                  className="pl-10 h-12 text-sm"
                />
                {filters.searchQuery && (
                  <button
                    onClick={() => onFilterChange("searchQuery", "")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-hint hover:text-primary transition-colors"
                  >
                    ✕
                  </button>
                )}
              </div>
              {filters.searchQuery && (
                <p className="text-xs text-text-body">
                  Searching for:{" "}
                  <span className="font-medium text-primary">
                    "{filters.searchQuery}"
                  </span>
                </p>
              )}
            </div>

            {/* Filters Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold text-primary flex items-center gap-2">
                  <Filter className="w-4 h-4 text-accent" />
                  Filters
                </label>
                <div className="flex items-center gap-2">
                  {hasActiveFilters && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={onResetFilters}
                      className="text-xs text-hint hover:text-primary"
                    >
                      Clear all filters
                    </Button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Platform Filter */}
                <div className="space-y-2">
                  <label className="text-xs font-medium text-text-body uppercase tracking-wide">
                    Platform
                  </label>
                  <Select
                    value={filters.selectedPlatform}
                    onValueChange={(value) =>
                      onFilterChange("selectedPlatform", value)
                    }
                  >
                    <SelectTrigger className="h-11">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {PLATFORMS.map((platform) => (
                        <SelectItem key={platform} value={platform}>
                          <div className="flex items-center gap-2">
                            {platform !== "All" && (
                              <PlatformIcon platform={platform} />
                            )}
                            <span>
                              {platform === "All"
                                ? "All Platforms"
                                : platform.charAt(0).toUpperCase() +
                                  platform.slice(1)}
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Style Filter */}
                <div className="space-y-2">
                  <label className="text-xs font-medium text-text-body uppercase tracking-wide">
                    Style
                  </label>
                  <Select
                    value={filters.selectedStyle}
                    onValueChange={(value) =>
                      onFilterChange("selectedStyle", value)
                    }
                  >
                    <SelectTrigger className="h-11">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {CAPTION_STYLES.map((style) => (
                        <SelectItem key={style} value={style}>
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-accent/60"></span>
                            <span>
                              {style === "All" ? "All Styles" : style}
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Sort Filter */}
                <div className="space-y-2">
                  <label className="text-xs font-medium text-text-body uppercase tracking-wide">
                    Sort by
                  </label>
                  <Select
                    value={filters.sortBy}
                    onValueChange={(value) =>
                      onFilterChange("sortBy", value as any)
                    }
                  >
                    <SelectTrigger className="h-11">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {SORT_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          <div className="flex items-center gap-2">
                            {option.value === "newest" && (
                              <SortDesc className="w-3 h-3" />
                            )}
                            {option.value === "oldest" && (
                              <SortAsc className="w-3 h-3" />
                            )}
                            {option.value === "engagement" && (
                              <TrendingUp className="w-3 h-3" />
                            )}
                            {option.value === "platform" && (
                              <Grid className="w-3 h-3" />
                            )}
                            <span>{option.label}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Active Filters Display */}
              {hasActiveFilters && (
                <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-border">
                  <span className="text-xs font-medium text-text-body">
                    Active filters:
                  </span>
                  {filters.selectedPlatform !== "All" && (
                    <div className="inline-flex items-center gap-1 px-2 py-1 bg-accent/10 text-accent text-xs font-medium rounded-md">
                      <PlatformIcon platform={filters.selectedPlatform} />
                      <span className="capitalize">
                        {filters.selectedPlatform}
                      </span>
                      <button
                        onClick={() =>
                          onFilterChange("selectedPlatform", "All")
                        }
                        className="ml-1 hover:text-accent-hover"
                      >
                        ✕
                      </button>
                    </div>
                  )}
                  {filters.selectedStyle !== "All" && (
                    <div className="inline-flex items-center gap-1 px-2 py-1 bg-accent/10 text-accent text-xs font-medium rounded-md">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                      <span>{filters.selectedStyle}</span>
                      <button
                        onClick={() => onFilterChange("selectedStyle", "All")}
                        className="ml-1 hover:text-accent-hover"
                      >
                        ✕
                      </button>
                    </div>
                  )}
                  {filters.sortBy !== "newest" && (
                    <div className="inline-flex items-center gap-1 px-2 py-1 bg-accent/10 text-accent text-xs font-medium rounded-md">
                      <span>
                        {
                          SORT_OPTIONS.find(
                            (opt) => opt.value === filters.sortBy
                          )?.label
                        }
                      </span>
                      <button
                        onClick={() => onFilterChange("sortBy", "newest")}
                        className="ml-1 hover:text-accent-hover"
                      >
                        ✕
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
