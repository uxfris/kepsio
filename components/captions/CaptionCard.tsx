import React, { useState } from "react";
import {
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Calendar,
} from "lucide-react";
import { Button } from "../ui/Button";
import { Card, CardContent, CardHeader } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { Chip } from "../ui/Chip";

export interface CaptionCardAction {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  variant?: "primary" | "outline" | "ghost";
  expandOnHover?: boolean;
  className?: string;
}

export interface CaptionCardProps {
  caption: string;
  platform?: "instagram" | "linkedin" | "x" | "facebook" | "tiktok";
  style?: string;
  date?: string;
  index?: number;
  isTopPick?: boolean;
  isCopied?: boolean;
  onCopy?: () => void;
  actions?: CaptionCardAction[];
  tags?: string[];
  metadata?: {
    length?: "short" | "medium" | "long";
    style?: string;
    engagementScore?: "high" | "medium" | "low";
  };
  hoveredCard?: string | number | null;
  onHoverChange?: (id: string | number | null) => void;
  id?: string | number;
  variant?: "grid" | "list" | "elevated";
  className?: string;
}

const TRUNCATE_LENGTH = 120;

export const CaptionCard: React.FC<CaptionCardProps> = ({
  caption,
  platform,
  style,
  date,
  index,
  isTopPick = false,
  isCopied = false,
  onCopy,
  actions = [],
  tags = [],
  metadata,
  hoveredCard,
  onHoverChange,
  id,
  variant = "grid",
  className = "",
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const needsTruncation = caption.length > TRUNCATE_LENGTH;
  const displayText = isExpanded
    ? caption
    : caption.substring(0, TRUNCATE_LENGTH) + (needsTruncation ? "..." : "");

  const isHovered = hoveredCard === id;

  const handleMouseEnter = () => {
    if (onHoverChange && id !== undefined) {
      onHoverChange(id);
    }
  };

  const handleMouseLeave = () => {
    if (onHoverChange) {
      onHoverChange(null);
    }
  };

  // Filter actions into primary (copy) and secondary
  const primaryAction = actions.find((a) => a.variant === "primary");
  const secondaryActions = actions.filter((a) => a.variant !== "primary");

  // Render for "elevated" variant (CaptionResults style)
  if (variant === "elevated") {
    return (
      <Card
        padding="none"
        variant="elevated"
        className={`group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden ${
          isTopPick ? "ring-1 ring-primary/10" : ""
        } ${className}`}
      >
        {/* Top Pick Badge */}
        {isTopPick && (
          <div className="absolute top-0 left-0 right-0 bg-linear-to-r from-section-light/50 to-section-light/0 p-3 border-b border-border-alt">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-text-head" />
              <span className="text-xs font-semibold text-text-head">
                Our top pick for you
              </span>
            </div>
          </div>
        )}

        <CardHeader padding="md" className={isTopPick ? "pt-16" : ""}>
          <div className="space-y-4">
            {/* Caption Content */}
            <div className="space-y-3">
              <p className="text-sm leading-relaxed text-text-head font-medium">
                {displayText}
              </p>
              {needsTruncation && (
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="text-sm text-accent hover:text-accent-hover font-medium flex items-center gap-2 transition-colors duration-200"
                >
                  {isExpanded ? "Show less" : "Read more"}
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isExpanded ? "rotate-180" : ""
                    }`}
                  />
                </button>
              )}
            </div>

            {/* Metadata badges */}
            {metadata && (
              <div className="flex flex-wrap items-center gap-1">
                {metadata.length && (
                  <Chip
                    variant="outline"
                    size="sm"
                    className="bg-surface text-text-body"
                  >
                    {metadata.length === "short"
                      ? "Short"
                      : metadata.length === "medium"
                      ? "Medium"
                      : "Long"}
                  </Chip>
                )}
                {metadata.style && (
                  <Chip
                    variant="outline"
                    size="sm"
                    className="bg-surface text-text-body"
                  >
                    {metadata.style}
                  </Chip>
                )}
              </div>
            )}
          </div>
        </CardHeader>

        <CardContent
          padding="md"
          className="pt-0 group-hover:pt-3 h-0 group-hover:h-auto overflow-hidden transition-all duration-200"
        >
          {/* Action buttons */}
          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            {/* Primary Action - Copy */}
            {onCopy && (
              <Button
                variant="primary"
                size="md"
                onClick={onCopy}
                leftIcon={
                  isCopied ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )
                }
                className="flex-1 text-sm font-semibold h-10"
              >
                {isCopied ? "Copied!" : "Copy"}
              </Button>
            )}

            {/* Secondary Actions */}
            {secondaryActions.length > 0 && (
              <div className="flex items-center gap-1">
                {secondaryActions.map((action, idx) => (
                  <Button
                    key={idx}
                    variant={action.variant || "outline"}
                    size="sm"
                    onClick={action.onClick}
                    className={`h-10 w-10 p-0 flex items-center justify-center overflow-hidden transition-all duration-200 hover:w-auto hover:px-3 hover:justify-start [&:hover_.action-label]:block ${
                      action.className || ""
                    }`}
                    title={action.label}
                  >
                    {action.icon}
                    <span className="action-label ml-2 text-sm font-medium hidden whitespace-nowrap">
                      {action.label}
                    </span>
                  </Button>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  // Render for "list" variant
  if (variant === "list") {
    return (
      <Card
        padding="none"
        className={`transition-all hover:shadow-2xl duration-300 hover:-translate-y-2 ${className}`}
      >
        <div className="p-4 flex items-center gap-4">
          {/* Selection checkbox if needed - can be passed as an action */}
          <div className="flex-1 min-w-0">
            <div className="mb-2">
              <p className="text-sm text-text-body">{displayText}</p>
              {needsTruncation && (
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="text-xs text-accent hover:text-accent-hover font-medium mt-1 flex items-center gap-1"
                >
                  {isExpanded ? (
                    <>
                      <ChevronUp className="w-3 h-3" />
                      Show less
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-3 h-3" />
                      Read more
                    </>
                  )}
                </button>
              )}
            </div>
            <div className="flex items-center gap-3 text-xs text-hint flex-wrap">
              {platform && (
                <Badge variant="platform" platform={platform} size="sm" />
              )}
              {style && (
                <span className="px-2 py-0.5 bg-chip-bg text-text-body rounded border border-border">
                  {style}
                </span>
              )}
              {date && (
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {date}
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            {actions.map((action, idx) => (
              <button
                key={idx}
                onClick={action.onClick}
                className={
                  action.className ||
                  "p-2 hover:bg-accent/5 text-hint hover:text-accent rounded transition-colors"
                }
              >
                {action.icon}
              </button>
            ))}
          </div>
        </div>
      </Card>
    );
  }

  // Default "grid" variant (Dashboard/Library style)
  return (
    <Card
      variant="outlined"
      className={`cursor-pointer group overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={`space-y-4 ${isHovered ? "" : "-mb-3"}`}>
        {/* Platform Badge and Date */}
        <div className="flex items-center justify-between">
          {platform && (
            <Badge variant="platform" platform={platform} size="md" />
          )}
          {date && (
            <span className="text-xs text-hint font-medium flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {date}
            </span>
          )}
        </div>

        {/* Caption Preview */}
        <div className="space-y-3">
          <div>
            <p className="text-sm text-text-body leading-relaxed">
              {displayText}
            </p>
            {needsTruncation && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-xs text-accent hover:text-accent-hover font-medium mt-1 flex items-center gap-1"
              >
                {isExpanded ? (
                  <>
                    <ChevronUp className="w-3 h-3" />
                    Show less
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-3 h-3" />
                    Read more
                  </>
                )}
              </button>
            )}
          </div>

          {/* Style Tag and Tags */}
          <div className="flex flex-wrap gap-2">
            {style && (
              <Badge variant="style" size="md">
                {style}
              </Badge>
            )}
            {tags.map((tag, idx) => (
              <span
                key={idx}
                className="text-xs text-hint bg-chip-bg px-2 py-1 rounded-lg border border-border"
              >
                {tag}
              </span>
            ))}
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
            {/* Primary Copy Button */}
            {onCopy && (
              <Button
                onClick={onCopy}
                variant="primary"
                size="md"
                leftIcon={
                  isCopied ? (
                    <Check className="w-3.5 h-3.5" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )
                }
                className="flex-1 text-xs font-semibold"
              >
                {isCopied ? "Copied!" : "Copy"}
              </Button>
            )}
            {/* Secondary Actions with Expand on Hover */}
            {secondaryActions.map((action, idx) => (
              <Button
                key={idx}
                onClick={action.onClick}
                variant={action.variant || "ghost"}
                size="sm"
                className={`h-9 w-9 p-0 flex items-center justify-center overflow-hidden transition-all duration-200 hover:w-auto hover:px-3 hover:justify-start [&:hover_.action-label]:block border border-border ${
                  action.className || ""
                }`}
                title={action.label}
              >
                {action.icon}
                <span className="action-label ml-2 text-sm font-medium hidden whitespace-nowrap">
                  {action.label}
                </span>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CaptionCard;
