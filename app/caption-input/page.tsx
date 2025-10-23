"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Sparkles,
  Image,
  Link2,
  Clock,
  ChevronDown,
  ChevronUp,
  Wand2,
  Zap,
  Copy,
  Check,
  Plus,
  X,
} from "lucide-react";
import { Button } from "../../components/ui/Button";
import { Textarea } from "../../components/ui/Textarea";
import { Input } from "../../components/ui/Input";
import { SegmentedControl } from "../../components/ui/SegmentedControl";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/Card";

export default function CaptionInputPage() {
  const [contentInput, setContentInput] = useState("");
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [ctaType, setCtaType] = useState("link-in-bio");
  const [hashtagCount, setHashtagCount] = useState(5);
  const [captionLength, setCaptionLength] = useState("medium");
  const [emojiStyle, setEmojiStyle] = useState("minimal");
  const [showError, setShowError] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCaptions, setGeneratedCaptions] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  // Context menu state
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [selectedContextItems, setSelectedContextItems] = useState<string[]>(
    []
  );
  const contextMenuRef = useRef<HTMLDivElement>(null);
  const plusButtonRef = useRef<HTMLButtonElement>(null);

  // Context menu options
  const contextOptions = [
    { id: "product-link", label: "Add product link", icon: Link2 },
    { id: "upload-image", label: "Upload image", icon: Image },
    { id: "previous-post", label: "Use previous post", icon: Clock },
  ];

  // Close context menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        contextMenuRef.current &&
        !contextMenuRef.current.contains(event.target as Node) &&
        plusButtonRef.current &&
        !plusButtonRef.current.contains(event.target as Node)
      ) {
        setShowContextMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleContextItemToggle = (itemId: string) => {
    setSelectedContextItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
    setShowContextMenu(false);
  };

  const handleRemoveContextItem = (itemId: string) => {
    setSelectedContextItems((prev) => prev.filter((id) => id !== itemId));
  };

  const handleGenerate = async () => {
    if (contentInput.trim() === "") {
      setShowError(true);
      setTimeout(() => setShowError(false), 2000);
      return;
    }

    setIsGenerating(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Mock generated captions
    const mockCaptions = [
      `🚀 Excited to share this new chapter! ${contentInput.slice(
        0,
        50
      )}... What do you think? #innovation #growth`,
      `Just launched something I've been working on! ${contentInput.slice(
        0,
        40
      )}... Can't wait to hear your thoughts! 💫`,
      `Behind the scenes: ${contentInput.slice(
        0,
        60
      )}... The journey has been incredible! 🌟 #behindthescenes`,
      `New project alert! ${contentInput.slice(
        0,
        45
      )}... This is just the beginning! ✨ #newbeginnings`,
      `Sharing something special today: ${contentInput.slice(
        0,
        55
      )}... What's your take? 🤔 #community`,
    ];

    setGeneratedCaptions(mockCaptions);
    setIsGenerating(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContentInput(e.target.value);
    if (showError) setShowError(false);
  };

  const handleCopyCaption = async (caption: string, index: number) => {
    try {
      await navigator.clipboard.writeText(caption);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const creditsRemaining = 9;
  const totalCredits = 10;

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Panel - Input Section */}
      <div className="w-full lg:w-[500px] bg-surface border-r border-border flex flex-col">
        {/* Header */}
        <Card
          variant="outlined"
          padding="none"
          className="border-0 border-b border-border rounded-none"
        >
          <CardHeader padding="sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-accent/10 rounded-lg">
                <Wand2 className="w-5 h-5 text-accent" />
              </div>
              <div>
                <CardTitle className="text-lg font-semibold text-primary">
                  New Caption
                </CardTitle>
                <p className="text-sm ">
                  Describe your content and we'll craft the perfect caption
                </p>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          {/* Primary Input with Context */}
          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              What's your content about?
            </label>

            {/* Input Container */}
            <div className="relative bg-surface rounded-lg border border-border">
              <Textarea
                value={contentInput}
                onChange={handleInputChange}
                placeholder="Launching a new product... Sharing a client win... Behind-the-scenes of my process..."
                error={
                  showError
                    ? "Tell us what your content is about first"
                    : undefined
                }
                resize="none"
                className="min-h-[120px] text-sm border-none"
                maxLength={500}
              />
              {/* Plus Button */}
              <button
                ref={plusButtonRef}
                onClick={() => setShowContextMenu(!showContextMenu)}
                className={`m-2 p-2 rounded-lg transition-all duration-200 border border-border group ${"bg-surface hover:bg-section-light text-text-body"}`}
                title="Add context"
              >
                <Plus
                  className={`w-4 h-4 transition-transform duration-200 ${
                    showContextMenu ? "rotate-45" : "rotate-0"
                  }`}
                />
              </button>
            </div>

            {/* Floating Context Menu */}
            {showContextMenu && (
              <div
                ref={contextMenuRef}
                className="absolute z-9999 mb-3 w-72 bg-white border border-gray-200 rounded-xl shadow-xl py-3"
                style={{
                  top: "6%",
                  left: "20px",
                }}
              >
                {contextOptions.map((option) => {
                  const IconComponent = option.icon;
                  const isSelected = selectedContextItems.includes(option.id);

                  return (
                    <button
                      key={option.id}
                      onClick={() => handleContextItemToggle(option.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors first:rounded-t-xl last:rounded-b-xl ${
                        isSelected
                          ? "bg-blue-50 text-blue-700"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <div
                        className={`p-2 rounded-lg ${
                          isSelected ? "bg-blue-100" : "bg-gray-100"
                        }`}
                      >
                        <IconComponent
                          className={`w-4 h-4 ${
                            isSelected ? "text-blue-600" : "text-gray-600"
                          }`}
                        />
                      </div>
                      <span className="flex-1 text-left font-medium">
                        {option.label}
                      </span>
                      {isSelected && (
                        <div className="p-1 bg-blue-100 rounded-full">
                          <Check className="w-3 h-3 text-blue-600" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Selected Context Items */}
            {selectedContextItems.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {selectedContextItems.map((itemId) => {
                  const option = contextOptions.find(
                    (opt) => opt.id === itemId
                  );
                  if (!option) return null;
                  const IconComponent = option.icon;

                  return (
                    <div
                      key={itemId}
                      className="inline-flex items-center gap-2 px-3 py-2 bg-blue-50 border border-blue-200 rounded-lg text-sm"
                    >
                      <div className="p-1 bg-blue-100 rounded">
                        <IconComponent className="w-3 h-3 text-blue-600" />
                      </div>
                      <span className="text-blue-700 font-medium">
                        {option.label}
                      </span>
                      <button
                        onClick={() => handleRemoveContextItem(itemId)}
                        className="p-1 hover:bg-blue-100 rounded transition-colors"
                      >
                        <X className="w-3 h-3 text-blue-500" />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}

            <div className="flex items-center justify-between mt-2">
              <span className="text-xs text-hint">
                {contentInput.length}/500
              </span>
              {contentInput.length > 400 && (
                <span className="text-xs text-warning">
                  Getting close to limit
                </span>
              )}
            </div>
          </div>

          {/* Advanced Options Accordion */}
          <div>
            <Card variant="outlined" className="overflow-hidden" padding="none">
              <button
                onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
                className="w-full flex items-center justify-between px-4 py-4 hover:bg-section-light transition-colors rounded-lg"
              >
                <span className="text-sm font-medium text-text-head">
                  Advanced Options
                </span>
                <div
                  className={`transition-transform duration-300 ease-in-out ${
                    isAdvancedOpen ? "rotate-180" : "rotate-0"
                  }`}
                >
                  <ChevronDown className="w-4 h-4 text-secondary" />
                </div>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  isAdvancedOpen
                    ? "max-h-[600px] opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-4 pb-6 space-y-6 border-t border-divider">
                  {/* Call-to-Action */}
                  <div className="pt-4">
                    <label className="block text-xs font-medium text-primary mb-2">
                      Call-to-Action
                    </label>
                    <select
                      value={ctaType}
                      onChange={(e) => setCtaType(e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-focus focus:border-focus bg-surface"
                    >
                      <option value="link-in-bio">Link in bio</option>
                      <option value="shop-now">Shop now</option>
                      <option value="dm-me">DM me</option>
                      <option value="comment-below">Comment below</option>
                      <option value="custom">Custom</option>
                    </select>
                  </div>

                  {/* Hashtag Preference */}
                  <div>
                    <label className="block text-xs font-medium text-primary mb-3">
                      Hashtags:{" "}
                      {hashtagCount === 0 ? "None" : `${hashtagCount}`}
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="10"
                      value={hashtagCount}
                      onChange={(e) =>
                        setHashtagCount(parseInt(e.target.value))
                      }
                      className="w-full h-2 bg-section-light rounded-full appearance-none cursor-pointer accent-accent"
                    />
                    <div className="flex justify-between text-xs text-hint mt-2">
                      <span>None</span>
                      <span>Max</span>
                    </div>
                  </div>

                  {/* Caption Length */}
                  <div>
                    <label className="block text-xs font-medium text-primary mb-3">
                      Caption Length
                    </label>
                    <SegmentedControl
                      options={[
                        { value: "short", label: "Short" },
                        { value: "medium", label: "Medium" },
                        { value: "long", label: "Long" },
                      ]}
                      value={captionLength}
                      onChange={setCaptionLength}
                      className="w-full"
                    />
                  </div>

                  {/* Emoji Style */}
                  <div>
                    <label className="block text-xs font-medium text-primary mb-3">
                      Emoji Style
                    </label>
                    <SegmentedControl
                      options={[
                        { value: "none", label: "None" },
                        { value: "minimal", label: "Minimal" },
                        { value: "generous", label: "Generous" },
                      ]}
                      value={emojiStyle}
                      onChange={setEmojiStyle}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Fixed Bottom - Generate Button */}
        <div className="px-6 py-4 border-t border-border bg-surface">
          <Button
            onClick={handleGenerate}
            variant="primary"
            size="lg"
            loading={isGenerating}
            leftIcon={<Sparkles className="w-5 h-5" />}
            className="w-full text-base font-semibold"
            disabled={!contentInput.trim()}
          >
            {isGenerating ? "Generating..." : "Generate Captions"}
          </Button>
          <div className="mt-3 text-center">
            <span className="text-sm text-secondary">
              <span className="font-semibold text-accent">
                {creditsRemaining}/{totalCredits}
              </span>{" "}
              free captions left
            </span>
          </div>
        </div>
      </div>

      {/* Right Panel - Results Area */}
      <div className="flex-1 flex flex-col">
        {generatedCaptions.length === 0 ? (
          /* Empty State */
          <div className="flex-1 flex items-center justify-center p-12 bg-section">
            <div className="text-center max-w-md">
              {/* Illustration */}
              <div className="mb-8 relative">
                <div className="inline-flex items-center justify-center w-32 h-32 bg-accent/10 rounded-2xl shadow-lg mb-6">
                  <div className="relative">
                    <Sparkles className="w-16 h-16 text-accent" />
                  </div>
                </div>
              </div>

              {/* Empty State Text */}
              <h2 className="text-2xl font-semibold mb-3">
                Your captions will appear here
              </h2>
              <p className="mb-8 leading-relaxed">
                Describe your content on the left, and we'll generate 5
                variations in your voice
              </p>

              {/* Tip Callout */}
              <div className="inline-flex items-start gap-3 px-4 py-3 bg-surface rounded-lg border border-border">
                <span className="text-xl">💡</span>
                <p className="text-sm text-left">
                  <span className="font-medium text-primary">Pro tip:</span> The
                  more context you add, the better your captions
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* Results State */
          <div className="flex-1 p-6 bg-section">
            <div className="max-w-4xl mx-auto">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-primary mb-2">
                  Generated Captions
                </h2>
                <p>Choose your favorite or copy to use right away</p>
              </div>

              <div className="space-y-4">
                {generatedCaptions.map((caption, index) => (
                  <div key={index}>
                    <Card
                      variant="elevated"
                      className="group hover:shadow-lg transition-all duration-300"
                    >
                      <CardContent padding="md">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <p className="leading-relaxed mb-3">{caption}</p>
                            <div className="flex items-center gap-2 text-xs text-hint">
                              <span>#{index + 1}</span>
                              <span>•</span>
                              <span>{caption.length} characters</span>
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleCopyCaption(caption, index)}
                            leftIcon={
                              copiedIndex === index ? (
                                <Check className="w-4 h-4" />
                              ) : (
                                <Copy className="w-4 h-4" />
                              )
                            }
                            className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                          >
                            {copiedIndex === index ? "Copied!" : "Copy"}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>

              <div className="mt-8 text-center">
                <Button
                  variant="outline"
                  onClick={() => setGeneratedCaptions([])}
                  leftIcon={<Zap className="w-4 h-4" />}
                >
                  Generate New Set
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
