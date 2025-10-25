import { Copy, RotateCcw, Bookmark } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { CaptionItem } from "@/types/captions";
import { getPlatformColor } from "@/lib/utils/captions";
import { PlatformIcon } from "./PlatformIcon";

interface CaptionCardProps {
  caption: CaptionItem;
  isSelected: boolean;
  isHovered: boolean;
  onSelect: (id: number) => void;
  onCopy: (text: string) => void;
  onRegenerate: (id: number) => void;
  onSave: (id: number) => void;
  onHover: (id: number | null) => void;
}

export function CaptionCard({
  caption,
  isSelected,
  isHovered,
  onSelect,
  onCopy,
  onRegenerate,
  onSave,
  onHover,
}: CaptionCardProps) {
  return (
    <Card
      variant="outlined"
      className={`cursor-pointer group overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 ${
        isSelected ? "ring-2 ring-accent" : ""
      }`}
      onMouseEnter={() => onHover(caption.id)}
      onMouseLeave={() => onHover(null)}
      onClick={() => onSelect(caption.id)}
    >
      <CardContent padding="none" className="transition-all duration-200">
        <div className={`space-y-4 ${isHovered ? "" : "-mb-3"}`}>
          {/* Platform Badge and Date */}
          <div className="flex items-center justify-between">
            <div
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border ${getPlatformColor(
                caption.platform
              )}`}
            >
              <PlatformIcon platform={caption.platform} />
              <span className="capitalize">{caption.platform}</span>
            </div>
            <span className="text-xs text-hint font-medium">
              {caption.date}
            </span>
          </div>

          {/* Caption Preview */}
          <div className="space-y-3">
            <p className="text-sm text-text-body line-clamp-3 leading-relaxed">
              {caption.snippet}
            </p>

            {/* Style Tag */}
            <div>
              <span className="inline-block px-3 py-1.5 bg-surface text-text-body text-xs font-medium rounded-lg border border-border">
                {caption.style}
              </span>
            </div>
          </div>

          {/* Action Buttons - Show on Hover with Height Animation */}
          <div
            className={`transition-all duration-200 overflow-hidden ${
              isHovered
                ? "opacity-100 max-h-12 translate-y-0"
                : "opacity-0 max-h-0 -translate-y-2"
            }`}
          >
            <div className="flex items-center gap-2 pt-2">
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  onCopy(caption.fullText);
                }}
                variant="primary"
                size="sm"
                leftIcon={<Copy className="w-3.5 h-3.5" />}
                className="flex-1 text-xs font-semibold"
              >
                Copy
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-9 w-9 p-0 flex items-center justify-center overflow-hidden transition-all duration-200 hover:w-auto hover:px-3 hover:justify-start [&:hover_.rotate-label]:block"
                title="Regenerate caption"
                onClick={(e) => {
                  e.stopPropagation();
                  onRegenerate(caption.id);
                }}
              >
                <RotateCcw className="w-4 h-4 shrink-0" />
                <span className="rotate-label ml-2 text-sm font-medium hidden whitespace-nowrap">
                  Regenerate
                </span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-9 w-9 p-0 flex items-center justify-center overflow-hidden transition-all duration-200 hover:w-auto hover:px-3 hover:justify-start [&:hover_.bookmark-label]:block"
                title="Save to library"
                onClick={(e) => {
                  e.stopPropagation();
                  onSave(caption.id);
                }}
              >
                <Bookmark className="w-4 h-4 shrink-0" />
                <span className="bookmark-label ml-2 text-sm font-medium hidden whitespace-nowrap">
                  Save
                </span>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
