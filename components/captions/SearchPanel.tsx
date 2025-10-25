import { Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { CaptionFilters as CaptionFiltersType } from "@/types/captions";

interface SearchPanelProps {
  filters: CaptionFiltersType;
  onFilterChange: <K extends keyof CaptionFiltersType>(
    key: K,
    value: CaptionFiltersType[K]
  ) => void;
}

export function SearchPanel({ filters, onFilterChange }: SearchPanelProps) {
  return (
    <div className="px-6 pt-6">
      <Card className="">
        <CardContent padding="none">
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
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
