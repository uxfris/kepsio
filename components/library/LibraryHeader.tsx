import React from "react";
import { BookMarked, RefreshCw, Download } from "lucide-react";
import { Button } from "../ui/Button";

interface LibraryHeaderProps {
  onRefresh: () => void;
  onExport: () => void;
  isExportDisabled: boolean;
}

export const LibraryHeader: React.FC<LibraryHeaderProps> = ({
  onRefresh,
  onExport,
  isExportDisabled,
}) => {
  return (
    <div className="flex items-center justify-between mb-4">
      <div>
        <h1 className="text-2xl font-display font-semibold text-text-head mb-1 flex items-center gap-2">
          <BookMarked className="w-6 h-6 text-accent" />
          Caption Library
        </h1>
        <p className="text-text-body text-sm">
          Your collection of high-performing captions
        </p>
      </div>
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          onClick={onRefresh}
          leftIcon={<RefreshCw className="w-4 h-4" />}
          title="Refresh library"
        >
          Refresh
        </Button>
        <Button
          variant="outline"
          leftIcon={<Download className="w-4 h-4" />}
          onClick={onExport}
          disabled={isExportDisabled}
        >
          Export All
        </Button>
      </div>
    </div>
  );
};
