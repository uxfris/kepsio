import React from "react";
import { Edit2, Copy, BookmarkCheck, BookMarked } from "lucide-react";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { CaptionCard } from "../captions/CaptionCard";
import { CaptionCardSkeleton } from "../ui/Skeleton";
import type { LibraryCaption } from "../../lib/utils/library";

interface LibraryCaptionListProps {
  captions: LibraryCaption[];
  isLoading: boolean;
  viewMode: "grid" | "list";

  // State
  copiedCaptionId: string | null;
  hoveredCard: string | null;
  savingCaptionId: string | null;

  // Callbacks
  onCopy: (caption: LibraryCaption) => void;
  onEdit: (caption: LibraryCaption) => void;
  onToggleSave: (captionId: string) => void;
  onHoverChange: (id: string | null) => void;

  // Filter state for empty state
  hasActiveFilters: boolean;
  onClearFilters: () => void;
}

export const LibraryCaptionList: React.FC<LibraryCaptionListProps> = ({
  captions,
  isLoading,
  viewMode,
  copiedCaptionId,
  hoveredCard,
  savingCaptionId,
  onCopy,
  onEdit,
  onToggleSave,
  onHoverChange,
  hasActiveFilters,
  onClearFilters,
}) => {
  // Loading state
  if (isLoading) {
    return viewMode === "grid" ? (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <CaptionCardSkeleton key={i} />
        ))}
      </div>
    ) : (
      <div className="space-y-3">
        {[...Array(6)].map((_, i) => (
          <CaptionCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  // Empty state
  if (captions.length === 0) {
    return (
      <Card
        padding="lg"
        className="text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
      >
        <div className="max-w-md mx-auto">
          <BookMarked className="w-12 h-12 text-hint mx-auto mb-4" />
          <h3 className="text-lg font-display font-semibold text-text-head mb-2">
            No captions found
          </h3>
          <p className="text-text-body mb-4">
            {hasActiveFilters
              ? "Try adjusting your search or filters to find what you're looking for."
              : "Start creating captions to build your library."}
          </p>
          {hasActiveFilters && (
            <Button variant="outline" onClick={onClearFilters}>
              Clear Filters
            </Button>
          )}
        </div>
      </Card>
    );
  }

  // Grid view
  if (viewMode === "grid") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {captions.map((caption) => (
          <CaptionCard
            key={caption.id}
            id={caption.id}
            caption={caption.content}
            platform={caption.platform as any}
            style={caption.style}
            date={new Date(caption.savedDate).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}
            hoveredCard={hoveredCard}
            onHoverChange={onHoverChange}
            isCopied={copiedCaptionId === caption.id}
            onCopy={() => onCopy(caption)}
            variant="grid"
            actions={[
              {
                icon: <Edit2 className="w-4 h-4 shrink-0" />,
                label: "Edit",
                onClick: () => onEdit(caption),
                variant: "ghost",
              },
              {
                icon: <BookmarkCheck className="w-4 h-4 shrink-0" />,
                label: "Unsave",
                onClick: () => onToggleSave(caption.id),
                variant: "ghost",
                className: savingCaptionId === caption.id ? "opacity-50" : "",
              },
            ]}
          />
        ))}
      </div>
    );
  }

  // List view
  return (
    <div className="space-y-3">
      {captions.map((caption) => (
        <CaptionCard
          key={caption.id}
          id={caption.id}
          caption={caption.content}
          platform={caption.platform as any}
          style={caption.style}
          date={new Date(caption.savedDate).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })}
          variant="list"
          actions={[
            {
              icon: <Copy className="w-4 h-4" />,
              label: "Copy",
              onClick: () => onCopy(caption),
              className: `p-2 rounded transition-colors ${
                copiedCaptionId === caption.id
                  ? "bg-accent/10 text-accent"
                  : "hover:bg-accent/5 text-hint hover:text-accent"
              }`,
            },
            {
              icon: <Edit2 className="w-4 h-4" />,
              label: "Edit",
              onClick: () => onEdit(caption),
              className:
                "p-2 hover:bg-accent/5 text-hint hover:text-accent rounded transition-colors",
            },
            {
              icon: <BookmarkCheck className="w-4 h-4" />,
              label: "Unsave",
              onClick: () => onToggleSave(caption.id),
              className: `p-2 hover:bg-error/10 text-hint hover:text-error rounded transition-colors ${
                savingCaptionId === caption.id ? "opacity-50" : ""
              }`,
            },
          ]}
        />
      ))}
    </div>
  );
};
