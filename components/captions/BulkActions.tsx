import { Copy, Download, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";

interface BulkActionsProps {
  selectedCount: number;
  totalCount: number;
  isAllSelected: boolean;
  onSelectAll: () => void;
  onBulkAction: (action: string) => void;
}

export function BulkActions({
  selectedCount,
  totalCount,
  isAllSelected,
  onSelectAll,
  onBulkAction,
}: BulkActionsProps) {
  if (selectedCount === 0) return null;

  return (
    <Card className="mb-6 bg-linear-to-r from-accent/10 via-accent/5 to-accent/10 border-accent/30 shadow-lg">
      <CardContent padding="lg">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center">
                <span className="text-accent font-bold text-sm">
                  {selectedCount}
                </span>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-primary">
                  {selectedCount} caption{selectedCount !== 1 ? "s" : ""}{" "}
                  selected
                </h3>
                <p className="text-xs text-text-body">
                  Choose an action to perform on selected items
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onSelectAll}
              className="text-accent hover:text-accent-hover hover:bg-accent/10 transition-colors"
            >
              {isAllSelected ? "Deselect All" : "Select All"}
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              leftIcon={<Copy className="w-4 h-4" />}
              onClick={() => onBulkAction("Copy")}
              className="border-accent/30 text-accent hover:bg-accent/10 hover:border-accent/50 transition-all"
            >
              Copy All
            </Button>
            <Button
              variant="outline"
              size="sm"
              leftIcon={<Download className="w-4 h-4" />}
              onClick={() => onBulkAction("Export")}
              className="border-accent/30 text-accent hover:bg-accent/10 hover:border-accent/50 transition-all"
            >
              Export
            </Button>
            <Button
              variant="outline"
              size="sm"
              leftIcon={<Trash2 className="w-4 h-4" />}
              onClick={() => onBulkAction("Delete")}
              className="border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 transition-all"
            >
              Delete
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
