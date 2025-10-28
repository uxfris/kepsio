import React, { useState, useMemo } from "react";
import {
  Copy,
  Check,
  Zap,
  Edit3,
  Bookmark,
  Star,
  ChevronDown,
  Sparkles,
  RefreshCw,
} from "lucide-react";
import { Button } from "../ui/Button";
import { Card, CardContent, CardHeader } from "../ui/Card";
import { Chip } from "../ui/Chip";
import { useToast, toast } from "../ui/Toast";
import EditCaptionModal from "./EditCaptionModal";

interface CaptionResultsProps {
  captions: string[];
  copiedIndex: number | null;
  onCopyCaption: (caption: string, index: number) => void;
  onGenerateNew: () => void;
  onCaptionUpdate?: (index: number, newCaption: string) => void;
  onGenerateVariation?: (variation: string) => void;
  platform?: string;
  isGenerating?: boolean;
}

type FilterType =
  | "all"
  | "short"
  | "medium"
  | "long"
  | "question"
  | "story"
  | "direct";
type CaptionStyle = "hook-first" | "story-driven" | "cta-focused";

interface CaptionMetadata {
  length: "short" | "medium" | "long";
  style: CaptionStyle;
  engagementScore: "high" | "medium" | "low";
  isQuestion: boolean;
  isStory: boolean;
  isDirect: boolean;
}

const getCaptionMetadata = (caption: string): CaptionMetadata => {
  const length = caption.length;
  const isQuestion = caption.includes("?");
  const isStory =
    caption.includes("story") ||
    caption.includes("journey") ||
    caption.includes("experience");
  const isDirect =
    caption.includes("!") ||
    caption.includes("now") ||
    caption.includes("today");

  let lengthCategory: "short" | "medium" | "long";
  if (length < 100) lengthCategory = "short";
  else if (length < 200) lengthCategory = "medium";
  else lengthCategory = "long";

  let style: CaptionStyle;
  if (
    caption.startsWith("Did you know") ||
    caption.startsWith("Have you ever") ||
    isQuestion
  ) {
    style = "hook-first";
  } else if (isStory) {
    style = "story-driven";
  } else {
    style = "cta-focused";
  }

  let engagementScore: "high" | "medium" | "low";
  if (isQuestion && length > 50 && length < 150) {
    engagementScore = "high";
  } else if (isStory || isDirect) {
    engagementScore = "medium";
  } else {
    engagementScore = "low";
  }

  return {
    length: lengthCategory,
    style,
    engagementScore,
    isQuestion,
    isStory,
    isDirect,
  };
};

const CaptionCard: React.FC<{
  caption: string;
  index: number;
  metadata: CaptionMetadata;
  isTopPick: boolean;
  isCopied: boolean;
  onCopy: () => void;
  onEdit: () => void;
  onSave: () => void;
}> = ({
  caption,
  index,
  metadata,
  isTopPick,
  isCopied,
  onCopy,
  onEdit,
  onSave,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  // const { addToast } = useToast();

  const handleCopy = () => {
    onCopy();
    // addToast(toast.copied());
  };

  const handleSave = () => {
    onSave();
    // addToast(toast.saved());
  };

  const getEngagementIcon = () => {
    switch (metadata.engagementScore) {
      case "high":
        return <Star className="w-3 h-3 text-warning" />;
      case "medium":
        return <Star className="w-3 h-3 text-hint" />;
      default:
        return null;
    }
  };

  const getEngagementText = () => {
    switch (metadata.engagementScore) {
      case "high":
        return "High Potential";
      case "medium":
        return "Good Potential";
      default:
        return "Standard";
    }
  };

  const previewText = isExpanded
    ? caption
    : caption.substring(0, 120) + (caption.length > 120 ? "..." : "");

  return (
    <Card
      padding="none"
      variant="elevated"
      className={`group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden ${
        isTopPick ? "ring-1 ring-primary/10" : ""
      }`}
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
              {previewText}
            </p>
            {caption.length > 120 && (
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
          <div className="flex flex-wrap items-center gap-1">
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
            <Chip
              variant="outline"
              size="sm"
              className="bg-surface text-text-body"
            >
              {metadata.style === "hook-first"
                ? "Hook-first"
                : metadata.style === "story-driven"
                ? "Story-driven"
                : "CTA-focused"}
            </Chip>
            {/* Engagement Badge */}
            <Chip
              variant="outline"
              size="sm"
              className="bg-surface text-text-body"
            >
              {getEngagementText()}
            </Chip>
          </div>
        </div>
      </CardHeader>

      <CardContent
        padding="md"
        className="pt-0 group-hover:pt-3 h-0 group-hover:h-auto overflow-hidden transition-all duration-200"
      >
        {/* Action buttons */}
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          {/* Primary Action - Copy */}
          <Button
            variant="primary"
            size="md"
            onClick={handleCopy}
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

          {/* Secondary Actions */}
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="sm"
              onClick={onEdit}
              className="h-10 w-10 p-0 flex items-center justify-center overflow-hidden transition-all duration-200 hover:w-auto hover:px-3 hover:justify-start [&:hover_.edit-label]:block"
              title="Edit caption"
            >
              <Edit3 className="w-4 h-4 shrink-0" />
              <span className="edit-label ml-2 text-sm font-medium hidden whitespace-nowrap">
                Edit
              </span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleSave}
              className="h-10 w-10 p-0 flex items-center justify-center overflow-hidden transition-all duration-200 hover:w-auto hover:px-3 hover:justify-start [&:hover_.save-label]:block"
              title="Save to library"
            >
              <Bookmark className="w-4 h-4 shrink-0 " />
              <span className="save-label ml-2 text-sm font-medium hidden whitespace-nowrap">
                Save
              </span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export const CaptionResults = ({
  captions,
  copiedIndex,
  onCopyCaption,
  onGenerateNew,
  onCaptionUpdate,
  onGenerateVariation,
  platform = "Instagram",
  isGenerating = false,
}: CaptionResultsProps) => {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [savedCaptions, setSavedCaptions] = useState<Set<number>>(new Set());
  const [editingCaptionIndex, setEditingCaptionIndex] = useState<number | null>(
    null
  );
  const [editedCaptions, setEditedCaptions] = useState<string[]>(captions);

  // Update edited captions when captions prop changes
  React.useEffect(() => {
    setEditedCaptions(captions);
  }, [captions]);

  const captionsWithMetadata = useMemo(
    () =>
      editedCaptions.map((caption, index) => ({
        caption,
        index,
        metadata: getCaptionMetadata(caption),
      })),
    [editedCaptions]
  );

  const filteredCaptions = useMemo(() => {
    if (activeFilter === "all") return captionsWithMetadata;

    return captionsWithMetadata.filter(({ metadata }) => {
      switch (activeFilter) {
        case "short":
          return metadata.length === "short";
        case "medium":
          return metadata.length === "medium";
        case "long":
          return metadata.length === "long";
        case "question":
          return metadata.isQuestion;
        case "story":
          return metadata.isStory;
        case "direct":
          return metadata.isDirect;
        default:
          return true;
      }
    });
  }, [captionsWithMetadata, activeFilter]);

  const handleSaveCaption = (index: number) => {
    setSavedCaptions((prev) => new Set([...prev, index]));
  };

  const handleEditCaption = (index: number) => {
    setEditingCaptionIndex(index);
  };

  const handleSaveEditedCaption = (newCaption: string) => {
    if (editingCaptionIndex !== null) {
      const updatedCaptions = [...editedCaptions];
      updatedCaptions[editingCaptionIndex] = newCaption;
      setEditedCaptions(updatedCaptions);
      onCaptionUpdate?.(editingCaptionIndex, newCaption);
      setEditingCaptionIndex(null);
    }
  };

  const handleCloseEditModal = () => {
    setEditingCaptionIndex(null);
  };

  const filterOptions = [
    { id: "all", label: "All" },
    { id: "short", label: "Short" },
    { id: "medium", label: "Medium" },
    { id: "long", label: "Long" },
    { id: "question", label: "Question-based" },
    { id: "story", label: "Story-led" },
    { id: "direct", label: "Direct" },
  ] as const;

  return (
    <div className="flex-1 bg-section overflow-y-auto">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 animate-slide-in-up">
          <div className="space-y-1">
            <h2 className="text-lg font-semibold text-primary tracking-tight flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-accent" />
              {captions.length} captions ready for {platform}
            </h2>
            <p className="text-sm font-medium text-text-body">
              Choose your favorite or copy to use right away
            </p>
          </div>
          <Button
            variant="ghost"
            size="lg"
            onClick={onGenerateNew}
            leftIcon={<RefreshCw className="w-5 h-5" />}
            className="self-start sm:self-center hover:bg-accent/10 transition-all duration-200"
          >
            Generate 5 More
          </Button>
        </div>

        {/* Filter Chips */}
        <div className="flex flex-wrap items-center gap-2 mb-7 animate-slide-in-up animate-delay-100">
          {filterOptions.map((option, index) => (
            <Chip
              key={option.id}
              size="md"
              variant={activeFilter === option.id ? "selected" : "default"}
              onClick={() => setActiveFilter(option.id)}
              className="transition-all duration-200 hover:scale-105 animate-scale-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {option.label}
            </Chip>
          ))}
        </div>

        {/* Results Count */}
        {/* <div className="mb-6 animate-slide-in-up animate-delay-200">
          <p className="text-sm text-hint">
            Showing {filteredCaptions.length} of {captions.length} captions
          </p>
        </div> */}

        {/* Caption Cards Grid */}
        <div className="space-y-8 mb-12">
          {filteredCaptions.length > 0 && (
            <>
              {/* Top Pick Card - Full Width */}
              {activeFilter === "all" && (
                <div className="animate-slide-in-up animate-delay-100">
                  <CaptionCard
                    caption={filteredCaptions[0].caption}
                    index={filteredCaptions[0].index}
                    metadata={filteredCaptions[0].metadata}
                    isTopPick={true}
                    isCopied={copiedIndex === filteredCaptions[0].index}
                    onCopy={() =>
                      onCopyCaption(
                        filteredCaptions[0].caption,
                        filteredCaptions[0].index
                      )
                    }
                    onEdit={() => handleEditCaption(filteredCaptions[0].index)}
                    onSave={() => handleSaveCaption(filteredCaptions[0].index)}
                  />
                </div>
              )}

              {/* Regular Cards - 2 Column Grid */}
              {filteredCaptions.length > 1 && (
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                  {filteredCaptions
                    .slice(activeFilter === "all" ? 1 : 0)
                    .map(({ caption, index, metadata }, cardIndex) => (
                      <div
                        key={index}
                        className={`animate-slide-in-up ${
                          cardIndex === 0
                            ? "animate-delay-200"
                            : cardIndex === 1
                            ? "animate-delay-300"
                            : cardIndex === 2
                            ? "animate-delay-400"
                            : cardIndex === 3
                            ? "animate-delay-500"
                            : "animate-delay-600"
                        }`}
                      >
                        <CaptionCard
                          caption={caption}
                          index={index}
                          metadata={metadata}
                          isTopPick={false}
                          isCopied={copiedIndex === index}
                          onCopy={() => onCopyCaption(caption, index)}
                          onEdit={() => handleEditCaption(index)}
                          onSave={() => handleSaveCaption(index)}
                        />
                      </div>
                    ))}
                </div>
              )}

              {/* Single Card when filtered (not "all") */}
              {filteredCaptions.length === 1 && activeFilter !== "all" && (
                <div className="animate-slide-in-up animate-delay-100">
                  <CaptionCard
                    caption={filteredCaptions[0].caption}
                    index={filteredCaptions[0].index}
                    metadata={filteredCaptions[0].metadata}
                    isTopPick={false}
                    isCopied={copiedIndex === filteredCaptions[0].index}
                    onCopy={() =>
                      onCopyCaption(
                        filteredCaptions[0].caption,
                        filteredCaptions[0].index
                      )
                    }
                    onEdit={() => handleEditCaption(filteredCaptions[0].index)}
                    onSave={() => handleSaveCaption(filteredCaptions[0].index)}
                  />
                </div>
              )}
            </>
          )}
        </div>

        {/* Bottom Action Bar */}
        <div className="text-center p-8 bg-surface rounded-2xl border border-border shadow-sm animate-slide-in-up animate-delay-300">
          <h3 className="text-sm font-semibold text-primary mb-2">
            Need different options?
          </h3>
          <p className="text-sm text-text-body mb-6">Try these variations:</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Chip
              variant="default"
              size="md"
              onClick={() => onGenerateVariation?.("playful")}
              disabled={isGenerating}
              className="border border-border transition-all duration-200 hover:scale-105 hover:bg-accent/10 hover:border-accent rounded-xl text-text-head cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ✨ More playful
            </Chip>
            <Chip
              variant="default"
              size="md"
              onClick={() => onGenerateVariation?.("urgent")}
              disabled={isGenerating}
              className="border border-border transition-all duration-200 hover:scale-105 hover:bg-accent/10 hover:border-accent rounded-xl text-text-head cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ⚡ Add urgency
            </Chip>
            <Chip
              variant="default"
              size="md"
              onClick={() => onGenerateVariation?.("shorter")}
              disabled={isGenerating}
              className="border border-border transition-all duration-200 hover:scale-105 hover:bg-accent/10 hover:border-accent rounded-xl text-text-head cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              📏 Shorter
            </Chip>
            <Chip
              variant="default"
              size="md"
              onClick={() => onGenerateVariation?.("professional")}
              disabled={isGenerating}
              className="border border-border transition-all duration-200 hover:scale-105 hover:bg-accent/10 hover:border-accent rounded-xl text-text-head cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              💼 More professional
            </Chip>
            <Chip
              variant="default"
              size="md"
              onClick={() => onGenerateVariation?.("casual")}
              disabled={isGenerating}
              className="border border-border transition-all duration-200 hover:scale-105 hover:bg-accent/10 hover:border-accent rounded-xl text-text-head cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              😊 More casual
            </Chip>
            <Chip
              variant="default"
              size="md"
              onClick={() => onGenerateVariation?.("emotional")}
              disabled={isGenerating}
              className="border border-border transition-all duration-200 hover:scale-105 hover:bg-accent/10 hover:border-accent rounded-xl text-text-head cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ❤️ More emotional
            </Chip>
          </div>
          {isGenerating && (
            <div className="mt-4 flex items-center justify-center gap-2 text-sm text-accent">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-accent"></div>
              <span>Generating variations...</span>
            </div>
          )}
        </div>
      </div>

      {/* Edit Caption Modal */}
      {editingCaptionIndex !== null && (
        <EditCaptionModal
          isOpen={editingCaptionIndex !== null}
          originalCaption={captions[editingCaptionIndex]}
          onClose={handleCloseEditModal}
          onSave={handleSaveEditedCaption}
          onCopy={(caption) => onCopyCaption(caption, editingCaptionIndex)}
        />
      )}
    </div>
  );
};
