import { Copy, MoreVertical, Calendar, Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { CaptionItem } from "@/types/captions";
import { getPlatformColor } from "@/lib/utils/captions";
import { PlatformIcon } from "./PlatformIcon";

interface CaptionListItemProps {
  caption: CaptionItem;
  isSelected: boolean;
  onSelect: (id: number) => void;
  onCopy: (text: string, id: number) => void;
  copiedId?: number | null;
}

export function CaptionListItem({
  caption,
  isSelected,
  onSelect,
  onCopy,
  copiedId,
}: CaptionListItemProps) {
  const isCopied = copiedId === caption.id;
  return (
    <Card
      variant="outlined"
      className={`cursor-pointer hover:shadow-lg transition-all duration-200 ${
        isSelected ? "ring-2 ring-accent" : ""
      }`}
      onClick={() => onSelect(caption.id)}
    >
      <CardContent padding="lg">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-3">
            <div className="flex items-center gap-3">
              <div
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border ${getPlatformColor(
                  caption.platform
                )}`}
              >
                <PlatformIcon platform={caption.platform} />
                <span className="capitalize">{caption.platform}</span>
              </div>
              <span className="inline-block px-3 py-1.5 bg-surface text-text-body text-xs font-medium rounded-lg border border-border">
                {caption.style}
              </span>
              <div className="flex items-center gap-1 text-xs text-green-600">
                <span>↑</span>
                <span>{caption.engagement}%</span>
              </div>
            </div>
            <p className="text-sm text-text-body leading-relaxed">
              {caption.fullText}
            </p>
            <div className="flex items-center gap-2 text-xs text-hint">
              <Calendar className="w-3 h-3" />
              <span>{caption.date}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              onClick={(e) => {
                e.stopPropagation();
                onCopy(caption.fullText, caption.id);
              }}
              variant="primary"
              size="sm"
              leftIcon={
                isCopied ? (
                  <Check className="w-3.5 h-3.5" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )
              }
            >
              {isCopied ? "Copied!" : "Copy"}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-9 w-9 p-0 flex items-center justify-center"
              title="More options"
              onClick={(e) => e.stopPropagation()}
            >
              <MoreVertical className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
