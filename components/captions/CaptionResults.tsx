import React, { useState } from "react";
import {
  Copy,
  Check,
  Zap,
  Edit3,
  Bookmark,
  BookmarkCheck,
  Star,
  Filter,
  Sparkles,
  RefreshCw,
  AlertCircle,
} from "lucide-react";
import { Button } from "../ui/Button";
import { Card, CardContent } from "../ui/Card";
import { EnhancedCaption, CaptionMetadata } from "../../types";

interface CaptionResultsProps {
  captions: string[];
  copiedIndex: number | null;
  onCopyCaption: (caption: string, index: number) => void;
  onGenerateNew: () => void;
  platform?: string;
  onSaveCaption?: (caption: string, index: number) => void;
  onEditCaption?: (caption: string, index: number) => void;
}

type FilterType =
  | "all"
  | "short"
  | "medium"
  | "long"
  | "question-based"
  | "story-led"
  | "direct";
type SuggestionType = "more-playful" | "add-urgency" | "shorter";

// Helper functions
const analyzeCaption = (caption: string): CaptionMetadata => {
  const wordCount = caption.split(" ").length;
  const characterCount = caption.length;

  let length: "short" | "medium" | "long";
  if (wordCount <= 10) length = "short";
  else if (wordCount <= 25) length = "medium";
  else length = "long";

  let style:
    | "hook-first"
    | "story-driven"
    | "cta-focused"
    | "question-based"
    | "direct";
  if (caption.includes("?")) style = "question-based";
  else if (
    caption.includes("story") ||
    caption.includes("journey") ||
    caption.includes("behind")
  )
    style = "story-driven";
  else if (
    caption.includes("click") ||
    caption.includes("link") ||
    caption.includes("buy") ||
    caption.includes("shop")
  )
    style = "cta-focused";
  else if (
    caption.startsWith("Did you know") ||
    caption.startsWith("Have you ever") ||
    caption.startsWith("What if")
  )
    style = "hook-first";
  else style = "direct";

  const engagementScore: "high" | "medium" | "low" =
    caption.includes("?") ||
    caption.includes("!") ||
    caption.includes("💡") ||
    caption.includes("✨")
      ? "high"
      : caption.length > 50 && caption.length < 150
      ? "medium"
      : "low";

  return { length, style, engagementScore, wordCount, characterCount };
};

const getPreview = (caption: string): string => {
  const lines = caption.split("\n");
  if (lines.length <= 2) return caption;
  return lines.slice(0, 2).join("\n");
};

const getStyleLabel = (style: string): string => {
  const labels = {
    "hook-first": "Hook-first",
    "story-driven": "Story-driven",
    "cta-focused": "CTA-focused",
    "question-based": "Question-based",
    direct: "Direct",
  };
  return labels[style as keyof typeof labels] || style;
};

const getLengthLabel = (length: string): string => {
  const labels = {
    short: "Short",
    medium: "Medium",
    long: "Long",
  };
  return labels[length as keyof typeof labels] || length;
};

export const CaptionResults = ({
  captions,
  copiedIndex,
  onCopyCaption,
  onGenerateNew,
  platform = "Instagram",
  onSaveCaption,
  onEditCaption,
}: CaptionResultsProps) => {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set());
  const [savedCaptions, setSavedCaptions] = useState<Set<number>>(new Set());
  const [showToast, setShowToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  // Convert captions to enhanced format
  const enhancedCaptions: EnhancedCaption[] = captions.map(
    (caption, index) => ({
      id: `caption-${index}`,
      content: caption,
      preview: getPreview(caption),
      metadata: analyzeCaption(caption),
      isTopPick: index === 0,
      isSaved: savedCaptions.has(index),
    })
  );

  // Filter captions based on active filter
  const filteredCaptions = enhancedCaptions.filter((caption) => {
    if (activeFilter === "all") return true;
    if (
      activeFilter === "short" ||
      activeFilter === "medium" ||
      activeFilter === "long"
    ) {
      return caption.metadata.length === activeFilter;
    }
    if (activeFilter === "question-based")
      return caption.metadata.style === "question-based";
    if (activeFilter === "story-led")
      return caption.metadata.style === "story-driven";
    if (activeFilter === "direct") return caption.metadata.style === "direct";
    return true;
  });

  const handleCopy = async (caption: string, index: number) => {
    const success = await onCopyCaption(caption, index);
    if (success) {
      showToastMessage("Caption copied to clipboard!", "success");
    }
  };

  const handleSave = (caption: string, index: number) => {
    setSavedCaptions((prev) => new Set([...prev, index]));
    onSaveCaption?.(caption, index);
    showToastMessage("Caption saved to library!", "success");
  };

  const handleEdit = (caption: string, index: number) => {
    onEditCaption?.(caption, index);
  };

  const toggleExpanded = (index: number) => {
    setExpandedCards((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  const showToastMessage = (message: string, type: "success" | "error") => {
    setShowToast({ message, type });
    setTimeout(() => setShowToast(null), 3000);
  };

  const handleSuggestionClick = (suggestion: SuggestionType) => {
    // This would trigger a new generation with the suggestion
    console.log("Suggestion clicked:", suggestion);
  };

  if (captions.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="flex-1 bg-section">
      {/* Toast Notification */}
      {showToast && (
        <div
          className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-300 ${
            showToast.type === "success"
              ? "bg-green-500 text-white"
              : "bg-red-500 text-white"
          }`}
        >
          <div className="flex items-center gap-2">
            {showToast.type === "success" ? (
              <Check className="w-4 h-4" />
            ) : (
              <AlertCircle className="w-4 h-4" />
            )}
            <span className="text-sm font-medium">{showToast.message}</span>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto p-6">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-primary mb-2">
                ✨ {captions.length} captions ready for {platform}
              </h2>
              <p className="text-text-body">
                Choose your favorite or customize to match your voice
              </p>
            </div>
            <Button
              variant="ghost"
              onClick={onGenerateNew}
              leftIcon={<RefreshCw className="w-4 h-4" />}
              className="text-text-body hover:text-primary"
            >
              Generate 5 More
            </Button>
          </div>

          {/* Filter Chips */}
          <div className="flex flex-wrap gap-2">
            {[
              { key: "all", label: "All" },
              { key: "short", label: "Short" },
              { key: "medium", label: "Medium" },
              { key: "long", label: "Long" },
              { key: "question-based", label: "Question-based" },
              { key: "story-led", label: "Story-led" },
              { key: "direct", label: "Direct" },
            ].map((filter) => (
              <button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key as FilterType)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeFilter === filter.key
                    ? "bg-primary text-white"
                    : "bg-surface text-text-body hover:bg-section-light border border-border"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Caption Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {filteredCaptions.map((caption, index) => (
            <Card
              key={caption.id}
              variant="elevated"
              className={`group hover:shadow-xl transition-all duration-300 cursor-pointer ${
                caption.isTopPick ? "lg:col-span-2" : ""
              } ${caption.isTopPick ? "ring-2 ring-primary/20" : ""}`}
            >
              <CardContent padding="lg">
                {/* Top Pick Badge */}
                {caption.isTopPick && (
                  <div className="flex items-center gap-2 mb-4 text-primary">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm font-semibold">
                      Our top pick for you
                    </span>
                  </div>
                )}

                {/* Caption Content */}
                <div className="mb-4">
                  <p className="text-text-body leading-relaxed mb-2">
                    {expandedCards.has(index)
                      ? caption.content
                      : caption.preview}
                  </p>
                  {!expandedCards.has(index) &&
                    caption.content !== caption.preview && (
                      <button
                        onClick={() => toggleExpanded(index)}
                        className="text-primary hover:text-primary/80 text-sm font-medium"
                      >
                        Read more
                      </button>
                    )}
                  {expandedCards.has(index) &&
                    caption.content !== caption.preview && (
                      <button
                        onClick={() => toggleExpanded(index)}
                        className="text-primary hover:text-primary/80 text-sm font-medium"
                      >
                        Show less
                      </button>
                    )}
                </div>

                {/* Metadata Badges */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      caption.metadata.length === "short"
                        ? "bg-blue-100 text-blue-700"
                        : caption.metadata.length === "medium"
                        ? "bg-green-100 text-green-700"
                        : "bg-purple-100 text-purple-700"
                    }`}
                  >
                    {getLengthLabel(caption.metadata.length)}
                  </span>
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                    {getStyleLabel(caption.metadata.style)}
                  </span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${
                      caption.metadata.engagementScore === "high"
                        ? "bg-yellow-100 text-yellow-700"
                        : caption.metadata.engagementScore === "medium"
                        ? "bg-orange-100 text-orange-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    <Star className="w-3 h-3" />
                    {caption.metadata.engagementScore === "high"
                      ? "High Potential"
                      : caption.metadata.engagementScore === "medium"
                      ? "Good Potential"
                      : "Standard"}
                  </span>
                </div>

                {/* Interaction Buttons */}
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleCopy(caption.content, index)}
                    leftIcon={
                      copiedIndex === index ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )
                    }
                    className="flex-1"
                  >
                    {copiedIndex === index ? "Copied!" : "Copy"}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(caption.content, index)}
                    leftIcon={<Edit3 className="w-4 h-4" />}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleSave(caption.content, index)}
                    leftIcon={
                      savedCaptions.has(index) ? (
                        <BookmarkCheck className="w-4 h-4" />
                      ) : (
                        <Bookmark className="w-4 h-4" />
                      )
                    }
                    className={
                      savedCaptions.has(index)
                        ? "text-green-600 border-green-200"
                        : ""
                    }
                  >
                    {savedCaptions.has(index) ? "Saved" : "Save"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom Action Bar */}
        <div className="bg-surface rounded-xl p-6 border border-border">
          <div className="text-center">
            <p className="text-text-body mb-4">Need different options? Try:</p>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { key: "more-playful", label: "More playful", icon: "🎭" },
                { key: "add-urgency", label: "Add urgency", icon: "⚡" },
                { key: "shorter", label: "Shorter", icon: "✂️" },
              ].map((suggestion) => (
                <button
                  key={suggestion.key}
                  onClick={() =>
                    handleSuggestionClick(suggestion.key as SuggestionType)
                  }
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-section hover:bg-section-light border border-border text-text-body hover:text-primary transition-all duration-200"
                >
                  <span>{suggestion.icon}</span>
                  <span className="text-sm font-medium">
                    {suggestion.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Empty State Component
const EmptyState = () => (
  <div className="flex-1 flex items-center justify-center bg-section">
    <div className="text-center max-w-md mx-auto p-8">
      <div className="w-16 h-16 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
        <AlertCircle className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="text-xl font-semibold text-primary mb-2">
        Hmm, we hit a snag
      </h3>
      <p className="text-text-body mb-6">
        Couldn't generate captions this time. This helps:
      </p>
      <ul className="text-left text-text-body space-y-2 mb-6">
        <li className="flex items-start gap-2">
          <span className="text-primary mt-1">•</span>
          <span>Add more context about your content</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-primary mt-1">•</span>
          <span>Try a different description</span>
        </li>
      </ul>
      <Button variant="primary" leftIcon={<RefreshCw className="w-4 h-4" />}>
        Try Again
      </Button>
    </div>
  </div>
);
