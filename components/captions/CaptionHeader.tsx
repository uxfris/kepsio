import Link from "next/link";
import { ArrowLeft, Search, Filter, Grid, List } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader } from "@/components/ui/Card";
import { CaptionFilters, ViewMode } from "@/types/captions";
import { getActiveFiltersCount } from "@/lib/utils/captions";

interface CaptionHeaderProps {
  totalCaptions: number;
  currentPage: number;
  totalPages: number;
  filters: CaptionFilters;
  viewMode: ViewMode;
  showSearchPanel: boolean;
  showFilterPanel: boolean;
  onToggleSearchPanel: () => void;
  onToggleFilterPanel: () => void;
  onViewModeChange: (mode: ViewMode) => void;
}

export function CaptionHeader({
  totalCaptions,
  currentPage,
  totalPages,
  filters,
  viewMode,
  showSearchPanel,
  showFilterPanel,
  onToggleSearchPanel,
  onToggleFilterPanel,
  onViewModeChange,
}: CaptionHeaderProps) {
  const activeFiltersCount = getActiveFiltersCount(filters);

  return (
    <Card
      variant="outlined"
      padding="none"
      className="border-0 border-b border-border rounded-none bg-section"
    >
      <CardHeader padding="lg">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button
                variant="ghost"
                size="sm"
                leftIcon={<ArrowLeft className="w-4 h-4" />}
                className="text-text-body hover:text-primary"
              >
                Back to Dashboard
              </Button>
            </Link>
            <div className="space-y-1">
              <h1 className="text-xl sm:text-2xl font-semibold text-primary tracking-tight">
                All Captions
              </h1>
              <p className="text-sm font-medium text-text-body">
                {totalCaptions} captions found
                {totalPages > 1 && ` • Page ${currentPage} of ${totalPages}`}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {/* Search and Filter Toggle */}
            <div className="flex items-center gap-1">
              <Button
                variant={showSearchPanel ? "primary" : "ghost"}
                size="sm"
                onClick={onToggleSearchPanel}
                leftIcon={<Search className="w-4 h-4" />}
                className="h-8 px-3"
                title="Toggle search panel"
              >
                Search
              </Button>
              <div className="relative">
                <Button
                  variant={showFilterPanel ? "primary" : "ghost"}
                  size="sm"
                  onClick={onToggleFilterPanel}
                  leftIcon={<Filter className="w-4 h-4" />}
                  className="h-8 px-3"
                  title="Toggle filter panel"
                >
                  Filter
                </Button>
                {/* Active filters indicator */}
                {activeFiltersCount > 0 && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full border-2 border-section flex items-center justify-center">
                    <span className="text-[8px] text-white font-bold">
                      {activeFiltersCount}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-1 bg-surface rounded-lg p-1">
              <Button
                variant={viewMode === "grid" ? "primary" : "ghost"}
                size="sm"
                onClick={() => onViewModeChange("grid")}
                leftIcon={<Grid className="w-4 h-4" />}
                className="h-8 px-3"
              >
                Grid
              </Button>
              <Button
                variant={viewMode === "list" ? "primary" : "ghost"}
                size="sm"
                onClick={() => onViewModeChange("list")}
                leftIcon={<List className="w-4 h-4" />}
                className="h-8 px-3"
              >
                List
              </Button>
            </div>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}
