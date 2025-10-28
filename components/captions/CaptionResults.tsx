import React, { useState, useMemo } from "react";
import {
  Edit3,
  Bookmark,
  BookmarkCheck,
  Star,
  Sparkles,
  RefreshCw,
} from "lucide-react";
import { Button } from "../ui/Button";
import { Chip } from "../ui/Chip";
import { useToast, toast } from "../ui/Toast";
import { CaptionCard } from "./CaptionCard";
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
  captionIds?: string[];
  savedStates?: boolean[];
  onSaveCaption?: (captionId: string, index: number) => void;
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

export const CaptionResults = ({
  captions,
  copiedIndex,
  onCopyCaption,
  onGenerateNew,
  onCaptionUpdate,
  onGenerateVariation,
  platform = "Instagram",
  isGenerating = false,
  captionIds = [],
  savedStates = [],
  onSaveCaption,
}: CaptionResultsProps) => {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
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
    if (onSaveCaption && captionIds[index]) {
      onSaveCaption(captionIds[index], index);
    }
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
                    variant="elevated"
                    isTopPick={true}
                    isCopied={copiedIndex === filteredCaptions[0].index}
                    onCopy={() =>
                      onCopyCaption(
                        filteredCaptions[0].caption,
                        filteredCaptions[0].index
                      )
                    }
                    metadata={{
                      length: filteredCaptions[0].metadata.length,
                      style:
                        filteredCaptions[0].metadata.style === "hook-first"
                          ? "Hook-first"
                          : filteredCaptions[0].metadata.style ===
                            "story-driven"
                          ? "Story-driven"
                          : "CTA-focused",
                      engagementScore:
                        filteredCaptions[0].metadata.engagementScore,
                    }}
                    actions={[
                      {
                        icon: <Edit3 className="w-4 h-4 shrink-0" />,
                        label: "Edit",
                        onClick: () =>
                          handleEditCaption(filteredCaptions[0].index),
                        variant: "outline",
                      },
                      {
                        icon: savedStates[filteredCaptions[0].index] ? (
                          <BookmarkCheck className="w-4 h-4 shrink-0 text-accent" />
                        ) : (
                          <Bookmark className="w-4 h-4 shrink-0" />
                        ),
                        label: savedStates[filteredCaptions[0].index]
                          ? "Saved"
                          : "Save",
                        onClick: () =>
                          handleSaveCaption(filteredCaptions[0].index),
                        variant: "outline",
                        className: savedStates[filteredCaptions[0].index]
                          ? "border-accent text-accent"
                          : "",
                      },
                    ]}
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
                          variant="elevated"
                          isTopPick={false}
                          isCopied={copiedIndex === index}
                          onCopy={() => onCopyCaption(caption, index)}
                          metadata={{
                            length: metadata.length,
                            style:
                              metadata.style === "hook-first"
                                ? "Hook-first"
                                : metadata.style === "story-driven"
                                ? "Story-driven"
                                : "CTA-focused",
                            engagementScore: metadata.engagementScore,
                          }}
                          actions={[
                            {
                              icon: <Edit3 className="w-4 h-4 shrink-0" />,
                              label: "Edit",
                              onClick: () => handleEditCaption(index),
                              variant: "outline",
                            },
                            {
                              icon: savedStates[index] ? (
                                <BookmarkCheck className="w-4 h-4 shrink-0 text-accent" />
                              ) : (
                                <Bookmark className="w-4 h-4 shrink-0" />
                              ),
                              label: savedStates[index] ? "Saved" : "Save",
                              onClick: () => handleSaveCaption(index),
                              variant: "outline",
                              className: savedStates[index]
                                ? "border-accent text-accent"
                                : "",
                            },
                          ]}
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
                    variant="elevated"
                    isTopPick={false}
                    isCopied={copiedIndex === filteredCaptions[0].index}
                    onCopy={() =>
                      onCopyCaption(
                        filteredCaptions[0].caption,
                        filteredCaptions[0].index
                      )
                    }
                    metadata={{
                      length: filteredCaptions[0].metadata.length,
                      style:
                        filteredCaptions[0].metadata.style === "hook-first"
                          ? "Hook-first"
                          : filteredCaptions[0].metadata.style ===
                            "story-driven"
                          ? "Story-driven"
                          : "CTA-focused",
                      engagementScore:
                        filteredCaptions[0].metadata.engagementScore,
                    }}
                    actions={[
                      {
                        icon: <Edit3 className="w-4 h-4 shrink-0" />,
                        label: "Edit",
                        onClick: () =>
                          handleEditCaption(filteredCaptions[0].index),
                        variant: "outline",
                      },
                      {
                        icon: savedStates[filteredCaptions[0].index] ? (
                          <BookmarkCheck className="w-4 h-4 shrink-0 text-accent" />
                        ) : (
                          <Bookmark className="w-4 h-4 shrink-0" />
                        ),
                        label: savedStates[filteredCaptions[0].index]
                          ? "Saved"
                          : "Save",
                        onClick: () =>
                          handleSaveCaption(filteredCaptions[0].index),
                        variant: "outline",
                        className: savedStates[filteredCaptions[0].index]
                          ? "border-accent text-accent"
                          : "",
                      },
                    ]}
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
