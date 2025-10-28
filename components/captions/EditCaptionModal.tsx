import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  X,
  Smile,
  Hash,
  Lightbulb,
  AlertCircle,
  Copy,
  Check,
  Save,
  RotateCcw,
  Sparkles,
  TrendingUp,
  MessageCircle,
  Heart,
} from "lucide-react";
import { Button } from "../ui/Button";
import { Card, CardHeader, CardContent } from "../ui/Card";
import { Textarea } from "../ui/Textarea";
import { Chip } from "../ui/Chip";
import { useToast } from "../ui/Toast";

interface EditCaptionModalProps {
  isOpen: boolean;
  originalCaption: string;
  onClose: () => void;
  onSave: (editedCaption: string) => void;
  onCopy?: (caption: string) => void;
  captionId?: string;
  platform?: string;
  saveToDatabase?: boolean;
}

interface CaptionInsights {
  characterCount: number;
  wordCount: number;
  hasQuestion: boolean;
  hasEmojis: boolean;
  hasHashtags: boolean;
  engagementScore: number;
  readabilityScore: number;
}

const getCaptionInsights = (caption: string): CaptionInsights => {
  const characterCount = caption.length;
  const wordCount = caption.split(/\s+/).filter((w) => w).length;
  const hasQuestion = caption.includes("?");
  const hasEmojis =
    /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/u.test(
      caption
    );
  const hasHashtags = caption.includes("#");

  // Simple engagement score calculation
  let engagementScore = 0;
  if (hasQuestion) engagementScore += 30;
  if (hasEmojis) engagementScore += 20;
  if (hasHashtags) engagementScore += 15;
  if (caption.includes("!")) engagementScore += 10;
  if (caption.includes("you") || caption.includes("your"))
    engagementScore += 15;
  if (caption.includes("comment") || caption.includes("share"))
    engagementScore += 10;

  // Simple readability score (shorter sentences = better)
  const sentences = caption.split(/[.!?]+/).filter((s) => s.trim().length > 0);
  const avgSentenceLength =
    sentences.length > 0 ? wordCount / sentences.length : wordCount;
  const readabilityScore = Math.max(0, 100 - avgSentenceLength * 2);

  return {
    characterCount,
    wordCount,
    hasQuestion,
    hasEmojis,
    hasHashtags,
    engagementScore: Math.min(100, engagementScore),
    readabilityScore: Math.min(100, readabilityScore),
  };
};

const suggestedHashtags = [
  "#BehindTheScenes",
  "#ContentCreation",
  "#SocialMedia",
  "#Marketing",
  "#Business",
  "#Entrepreneur",
  "#Growth",
  "#Success",
  "#Inspiration",
  "#Motivation",
  "#Tips",
  "#Strategy",
];

const quickEmojis = [
  "😊",
  "🔥",
  "✨",
  "💯",
  "👏",
  "❤️",
  "🎉",
  "🌟",
  "💪",
  "🙌",
  "👇",
  "📸",
  "🚀",
  "💡",
  "🎯",
  "⚡",
  "🌈",
  "🎨",
  "📈",
  "🏆",
];

export default function EditCaptionModal({
  isOpen,
  originalCaption,
  onClose,
  onSave,
  onCopy,
  captionId,
  platform = "Instagram",
  saveToDatabase = false,
}: EditCaptionModalProps) {
  const [editedCaption, setEditedCaption] = useState(originalCaption);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showHashtagSuggestions, setShowHashtagSuggestions] = useState(false);
  const [copied, setCopied] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [showInsights, setShowInsights] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const emojiPickerRef = useRef<HTMLDivElement>(null);
  const hashtagPickerRef = useRef<HTMLDivElement>(null);
  const { showToast } = useToast();

  // Platform-specific character limits
  const platformLimits: Record<string, number> = {
    instagram: 2200,
    linkedin: 3000,
    x: 280,
    twitter: 280,
    facebook: 63206,
    tiktok: 2200,
  };

  const maxCharacters = platformLimits[platform.toLowerCase()] || 2200;
  const insights = getCaptionInsights(editedCaption);
  const originalInsights = getCaptionInsights(originalCaption);
  const isOverLimit = insights.characterCount > maxCharacters;
  const isNearLimit = insights.characterCount > maxCharacters * 0.9;

  // Track changes
  useEffect(() => {
    setHasChanges(editedCaption !== originalCaption);
  }, [editedCaption, originalCaption]);

  // Reset state when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setEditedCaption(originalCaption);
      setHasChanges(false);
      setCopied(false);
      setShowEmojiPicker(false);
      setShowHashtagSuggestions(false);
      // Focus textarea after modal opens
      setTimeout(() => {
        textareaRef.current?.focus();
      }, 100);
    }
  }, [isOpen, originalCaption]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target as Node)
      ) {
        setShowEmojiPicker(false);
      }
      if (
        hashtagPickerRef.current &&
        !hashtagPickerRef.current.contains(event.target as Node)
      ) {
        setShowHashtagSuggestions(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return;

      if (event.metaKey || event.ctrlKey) {
        if (event.key === "Enter") {
          event.preventDefault();
          handleSave();
        } else if (event.key === "s") {
          event.preventDefault();
          handleSave();
        }
      } else if (event.key === "Escape") {
        event.preventDefault();
        handleClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, editedCaption, originalCaption]);

  const handleEmojiClick = useCallback(
    (emoji: string) => {
      const textarea = textareaRef.current;
      if (!textarea) return;

      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newText =
        editedCaption.substring(0, start) +
        emoji +
        editedCaption.substring(end);
      setEditedCaption(newText);

      // Set cursor position after emoji
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start + emoji.length, start + emoji.length);
      }, 0);
    },
    [editedCaption]
  );

  const handleHashtagClick = useCallback(
    (hashtag: string) => {
      const newText =
        editedCaption + (editedCaption.endsWith("\n") ? "" : "\n\n") + hashtag;
      setEditedCaption(newText);
      setShowHashtagSuggestions(false);
    },
    [editedCaption]
  );

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(editedCaption);
      setCopied(true);
      showToast("Copied to clipboard! 📋");
      onCopy?.(editedCaption);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      showToast("Failed to copy caption", "error");
    }
  }, [editedCaption, onCopy, showToast]);

  const handleSave = useCallback(async () => {
    if (isOverLimit) {
      showToast("Caption is too long. Please shorten it.", "error");
      return;
    }

    setIsSaving(true);

    try {
      // If we have a captionId and should save to database
      if (saveToDatabase && captionId) {
        const response = await fetch(`/api/captions/${captionId}/edit`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ content: editedCaption }),
        });

        if (!response.ok) {
          throw new Error("Failed to save caption to database");
        }

        const data = await response.json();
        if (!data.success) {
          throw new Error(data.error || "Failed to save caption");
        }
      }

      // Call the onSave callback (for local state updates)
      onSave(editedCaption);
      showToast("Caption saved successfully ✅");
      onClose();
    } catch (error) {
      console.error("Error saving caption:", error);
      showToast(
        error instanceof Error ? error.message : "Failed to save caption",
        "error"
      );
    } finally {
      setIsSaving(false);
    }
  }, [
    editedCaption,
    isOverLimit,
    onSave,
    showToast,
    saveToDatabase,
    captionId,
    onClose,
  ]);

  const handleReset = useCallback(() => {
    setEditedCaption(originalCaption);
    showToast("Caption reset to original", "info");
  }, [originalCaption, showToast]);

  const handleClose = useCallback(() => {
    if (hasChanges) {
      const confirmed = window.confirm(
        "You have unsaved changes. Are you sure you want to close?"
      );
      if (!confirmed) return;
    }
    onClose();
  }, [hasChanges, onClose]);

  const getEngagementColor = (score: number) => {
    if (score >= 70) return "text-success";
    if (score >= 40) return "text-warning";
    return "text-hint";
  };

  const getEngagementIcon = (score: number) => {
    if (score >= 70) return <TrendingUp className="w-4 h-4" />;
    if (score >= 40) return <MessageCircle className="w-4 h-4" />;
    return <Heart className="w-4 h-4" />;
  };

  // Platform-specific guidelines
  const getPlatformGuidelines = () => {
    const platformName = platform.toLowerCase();
    switch (platformName) {
      case "instagram":
        return {
          name: "Instagram",
          icon: "📸",
          tips: [
            "First 125 characters are most important",
            "Use line breaks for readability",
            "3-5 hashtags perform best",
            "Include a clear CTA",
          ],
          idealLength: "138-150 characters",
        };
      case "linkedin":
        return {
          name: "LinkedIn",
          icon: "💼",
          tips: [
            "First 2 lines hook readers",
            "Professional yet conversational tone",
            "Use hashtags sparingly (3-5)",
            "Ask thought-provoking questions",
          ],
          idealLength: "150-300 characters",
        };
      case "x":
      case "twitter":
        return {
          name: "X (Twitter)",
          icon: "✖️",
          tips: [
            "Be concise and punchy",
            "Front-load key message",
            "Use threads for longer content",
            "1-2 hashtags maximum",
          ],
          idealLength: "71-100 characters",
        };
      case "facebook":
        return {
          name: "Facebook",
          icon: "👥",
          tips: [
            "First 3 lines show in feed",
            "Conversational and relatable",
            "Questions boost engagement",
            "Minimal hashtags (1-2)",
          ],
          idealLength: "100-250 characters",
        };
      case "tiktok":
        return {
          name: "TikTok",
          icon: "🎵",
          tips: [
            "Short and catchy hooks",
            "Use trending hashtags",
            "Encourage comments/duets",
            "Emoji-friendly platform",
          ],
          idealLength: "100-150 characters",
        };
      default:
        return {
          name: "Social Media",
          icon: "📱",
          tips: [
            "Keep it engaging",
            "Include a clear message",
            "Use relevant hashtags",
            "Add a call-to-action",
          ],
          idealLength: "150-200 characters",
        };
    }
  };

  const platformGuide = getPlatformGuidelines();

  // Contextual AI suggestions based on content analysis
  const getContextualSuggestions = () => {
    const suggestions = [];
    const lowerCaption = editedCaption.toLowerCase();

    // Length-based suggestions
    if (
      platform.toLowerCase() === "x" ||
      platform.toLowerCase() === "twitter"
    ) {
      if (insights.characterCount > 200) {
        suggestions.push({
          type: "warning",
          message: "Consider splitting into a thread",
          action: "X works best with concise messages or engaging threads",
        });
      }
    }

    if (
      platform.toLowerCase() === "instagram" &&
      insights.characterCount > 150
    ) {
      suggestions.push({
        type: "tip",
        message: "Front-load your hook",
        action: "First 125 characters show before 'more' - make them count!",
      });
    }

    // Engagement-based suggestions
    if (insights.engagementScore < 40) {
      if (!insights.hasQuestion) {
        suggestions.push({
          type: "tip",
          message: "Add a question",
          action: "Questions drive 2x more comments and engagement",
        });
      }
      if (!insights.hasEmojis && platform.toLowerCase() !== "linkedin") {
        suggestions.push({
          type: "tip",
          message: "Add emojis",
          action: "Emojis increase engagement by 48% on most platforms",
        });
      }
    }

    // Platform-specific suggestions
    if (platform.toLowerCase() === "linkedin") {
      if (
        insights.hasEmojis &&
        editedCaption.match(/[\u{1F600}-\u{1F64F}]/gu)?.length! > 2
      ) {
        suggestions.push({
          type: "caution",
          message: "Keep emojis professional",
          action: "LinkedIn prefers minimal, professional emoji usage",
        });
      }
      if (!lowerCaption.includes("?") && insights.characterCount > 100) {
        suggestions.push({
          type: "tip",
          message: "Add thought leadership",
          action: "Ask a thought-provoking question to spark discussions",
        });
      }
    }

    // CTA suggestions
    if (
      !lowerCaption.includes("comment") &&
      !lowerCaption.includes("share") &&
      !lowerCaption.includes("link in bio") &&
      !lowerCaption.includes("dm") &&
      insights.characterCount > 50
    ) {
      suggestions.push({
        type: "tip",
        message: "Add a call-to-action",
        action: "Guide your audience on what to do next",
      });
    }

    // Hashtag suggestions
    if (platform.toLowerCase() === "instagram" && !insights.hasHashtags) {
      suggestions.push({
        type: "tip",
        message: "Consider hashtags",
        action: "3-5 relevant hashtags can boost discoverability",
      });
    }

    if (
      platform.toLowerCase() === "x" &&
      editedCaption.match(/#\w+/g)?.length! > 2
    ) {
      suggestions.push({
        type: "caution",
        message: "Too many hashtags",
        action: "X performs best with 1-2 hashtags maximum",
      });
    }

    return suggestions.slice(0, 3); // Return top 3 suggestions
  };

  const contextualSuggestions = getContextualSuggestions();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-surface rounded-2xl shadow-2xl max-w-7xl w-full max-h-[95vh] flex flex-col border border-border">
        {/* Header */}
        <CardHeader padding="md" className="border-b border-border">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-xl font-semibold text-primary tracking-tight flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-accent" />
                Edit Caption
              </h2>
              <p className="text-sm text-text-body">
                Optimize for {platformGuide.icon} {platformGuide.name} •{" "}
                {platformGuide.idealLength} recommended
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClose}
              className="text-text-body hover:text-text-head"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </CardHeader>

        {/* Main Content */}
        <div className="flex-1 overflow-hidden flex">
          {/* Left Side - Original Caption & Insights */}
          <div className="w-1/2 border-r border-border p-6 overflow-y-auto bg-section">
            <div className="space-y-6">
              {/* Original Caption */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-semibold text-text-body uppercase tracking-wide">
                    AI Generated
                  </span>
                  <Chip
                    variant="outline"
                    size="sm"
                    className="bg-accent/10 text-accent border-accent/20"
                  >
                    Original
                  </Chip>
                </div>
                <Card variant="outlined" padding="md">
                  <p className="text-text-body whitespace-pre-wrap leading-relaxed">
                    {originalCaption}
                  </p>
                </Card>
              </div>

              {/* Original Stats */}
              <div className="grid grid-cols-2 gap-3">
                <Card variant="outlined" padding="sm">
                  <div className="text-xs text-hint mb-1">Characters</div>
                  <div className="text-lg font-semibold text-text-head">
                    {originalInsights.characterCount}
                  </div>
                </Card>
                <Card variant="outlined" padding="sm">
                  <div className="text-xs text-hint mb-1">Words</div>
                  <div className="text-lg font-semibold text-text-head">
                    {originalInsights.wordCount}
                  </div>
                </Card>
              </div>

              {/* Insights Toggle */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-text-head">
                  Smart Insights
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowInsights(!showInsights)}
                  className="text-hint hover:text-text-head"
                >
                  {showInsights ? "Hide" : "Show"}
                </Button>
              </div>

              {/* Platform Guidelines */}
              <div className="bg-accent/5 border border-accent/20 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">{platformGuide.icon}</span>
                  <span className="text-sm font-semibold text-accent">
                    {platformGuide.name} Best Practices
                  </span>
                </div>
                <ul className="space-y-1">
                  {platformGuide.tips.map((tip, index) => (
                    <li
                      key={index}
                      className="text-xs text-text-body flex items-start gap-2"
                    >
                      <span className="text-accent mt-0.5">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Smart Insights */}
              {showInsights && (
                <div className="space-y-3">
                  <Card variant="outlined" padding="sm">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-hint">
                        Engagement Potential
                      </span>
                      <div
                        className={`flex items-center gap-1 ${getEngagementColor(
                          insights.engagementScore
                        )}`}
                      >
                        {getEngagementIcon(insights.engagementScore)}
                        <span className="text-sm font-semibold">
                          {insights.engagementScore}%
                        </span>
                      </div>
                    </div>
                    <div className="w-full bg-section-light rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${
                          insights.engagementScore >= 70
                            ? "bg-success"
                            : insights.engagementScore >= 40
                            ? "bg-warning"
                            : "bg-hint"
                        }`}
                        style={{ width: `${insights.engagementScore}%` }}
                      />
                    </div>
                  </Card>

                  <Card variant="outlined" padding="sm">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-hint">Readability</span>
                      <span className="text-sm font-semibold text-text-head">
                        {insights.readabilityScore}%
                      </span>
                    </div>
                    <div className="w-full bg-section-light rounded-full h-2">
                      <div
                        className="h-2 rounded-full bg-accent transition-all duration-300"
                        style={{ width: `${insights.readabilityScore}%` }}
                      />
                    </div>
                  </Card>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center gap-2 text-xs text-text-body">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          insights.hasQuestion ? "bg-success" : "bg-hint"
                        }`}
                      />
                      {insights.hasQuestion ? "Has question" : "No question"}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-text-body">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          insights.hasEmojis ? "bg-success" : "bg-hint"
                        }`}
                      />
                      {insights.hasEmojis ? "Has emojis" : "No emojis"}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-text-body">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          insights.hasHashtags ? "bg-success" : "bg-hint"
                        }`}
                      />
                      {insights.hasHashtags ? "Has hashtags" : "No hashtags"}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-text-body">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          insights.characterCount <= 150
                            ? "bg-success"
                            : insights.characterCount <= 300
                            ? "bg-warning"
                            : "bg-error"
                        }`}
                      />
                      {insights.characterCount <= 150
                        ? "Optimal length"
                        : insights.characterCount <= 300
                        ? "Good length"
                        : "Long"}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Side - Editor */}
          <div className="w-1/2 p-6 overflow-y-auto flex flex-col">
            <div className="space-y-4">
              {/* Editor Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-text-body uppercase tracking-wide">
                    Your Edit
                  </span>
                  <Chip
                    variant="outline"
                    size="sm"
                    className="bg-success/10 text-success border-success/20"
                  >
                    {hasChanges ? "Modified" : "Unchanged"}
                  </Chip>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopy}
                  leftIcon={
                    copied ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )
                  }
                  className="text-text-body hover:text-text-head"
                >
                  {copied ? "Copied!" : "Copy"}
                </Button>
              </div>

              {/* Toolbar */}
              <div className="flex items-center gap-2">
                <div className="relative" ref={emojiPickerRef}>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    leftIcon={<Smile className="w-4 h-4" />}
                    className="text-text-body hover:text-text-head"
                  >
                    Emoji
                  </Button>

                  {showEmojiPicker && (
                    <div className="absolute top-full left-0 mt-2 bg-surface rounded-lg shadow-lg border border-border p-3 z-10 w-64">
                      <div className="grid grid-cols-6 gap-2">
                        {quickEmojis.map((emoji, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleEmojiClick(emoji)}
                            className="text-2xl hover:bg-section-light rounded p-2 transition-colors"
                          >
                            {emoji}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="relative" ref={hashtagPickerRef}>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setShowHashtagSuggestions(!showHashtagSuggestions)
                    }
                    leftIcon={<Hash className="w-4 h-4" />}
                    className="text-text-body hover:text-text-head"
                  >
                    Hashtags
                  </Button>

                  {showHashtagSuggestions && (
                    <div className="absolute top-full left-0 mt-2 bg-surface rounded-lg shadow-lg border border-border p-3 z-10 w-72">
                      <div className="text-xs font-medium text-text-head mb-2">
                        Suggested hashtags
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {suggestedHashtags.map((tag, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleHashtagClick(tag)}
                            className="px-3 py-1.5 bg-accent/10 hover:bg-accent/20 text-accent text-sm rounded-full transition-colors"
                          >
                            {tag}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Textarea Editor */}
              <Textarea
                ref={textareaRef}
                value={editedCaption}
                onChange={(e) => setEditedCaption(e.target.value)}
                placeholder="Start editing your caption..."
                autoExpand={true}
                className="min-h-48 text-text-head border-2 focus:border-accent focus:ring-4 focus:ring-accent/10"
                maxLength={maxCharacters}
              />

              {/* Character Count & Stats */}
              <div className="flex items-center justify-between">
                <div
                  className={`text-sm font-medium ${
                    isOverLimit
                      ? "text-error"
                      : isNearLimit
                      ? "text-warning"
                      : "text-hint"
                  }`}
                >
                  {insights.characterCount.toLocaleString()} /{" "}
                  {maxCharacters.toLocaleString()} characters
                  {isOverLimit && (
                    <span className="ml-2 text-xs">
                      (Over by {insights.characterCount - maxCharacters})
                    </span>
                  )}
                </div>
                <div className="text-sm text-hint">
                  {insights.wordCount} words
                </div>
              </div>

              {/* Contextual AI Suggestions */}
              {contextualSuggestions.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4 text-accent" />
                    <span className="text-sm font-semibold text-text-head">
                      AI Recommendations
                    </span>
                  </div>
                  {contextualSuggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className={`flex items-start gap-3 p-3 rounded-lg border ${
                        suggestion.type === "warning"
                          ? "bg-warning/10 border-warning/20"
                          : suggestion.type === "caution"
                          ? "bg-error/10 border-error/20"
                          : "bg-accent/10 border-accent/20"
                      }`}
                    >
                      {suggestion.type === "warning" ? (
                        <AlertCircle
                          className={`w-4 h-4 shrink-0 mt-0.5 ${
                            suggestion.type === "warning"
                              ? "text-warning"
                              : suggestion.type === "caution"
                              ? "text-error"
                              : "text-accent"
                          }`}
                        />
                      ) : (
                        <Lightbulb
                          className={`w-4 h-4 shrink-0 mt-0.5 ${
                            suggestion.type === "warning"
                              ? "text-warning"
                              : suggestion.type === "caution"
                              ? "text-error"
                              : "text-accent"
                          }`}
                        />
                      )}
                      <div>
                        <div
                          className={`text-sm font-medium ${
                            suggestion.type === "warning"
                              ? "text-warning"
                              : suggestion.type === "caution"
                              ? "text-error"
                              : "text-accent"
                          }`}
                        >
                          {suggestion.message}
                        </div>
                        <div
                          className={`text-xs mt-0.5 ${
                            suggestion.type === "warning"
                              ? "text-warning/80"
                              : suggestion.type === "caution"
                              ? "text-error/80"
                              : "text-accent/80"
                          }`}
                        >
                          {suggestion.action}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <CardContent
          padding="md"
          className="border-t border-border bg-section rounded-b-2xl"
        >
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-2 text-sm text-hint">
              <kbd className="px-2 py-1 bg-surface border border-border rounded text-xs font-mono">
                ⌘
              </kbd>
              <span>+</span>
              <kbd className="px-2 py-1 bg-surface border border-border rounded text-xs font-mono">
                Enter
              </kbd>
              <span>to save</span>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="md"
                onClick={handleReset}
                leftIcon={<RotateCcw className="w-4 h-4" />}
                disabled={!hasChanges}
                className="text-text-body hover:text-text-head"
              >
                Reset
              </Button>
              <Button
                variant="outline"
                size="md"
                onClick={handleClose}
                className="text-text-body hover:text-text-head"
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="md"
                onClick={handleSave}
                leftIcon={<Save className="w-4 h-4" />}
                disabled={isOverLimit || !hasChanges || isSaving}
                loading={isSaving}
                className="font-semibold"
              >
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </div>
        </CardContent>
      </div>
    </div>
  );
}
