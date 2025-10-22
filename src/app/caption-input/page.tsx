"use client";

import React, { useState } from "react";
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
} from "lucide-react";
import { Button } from "../../../design-system/components/ui/Button";
import { Textarea } from "../../../design-system/components/ui/Textarea";
import { Input } from "../../../design-system/components/ui/Input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../design-system/components/ui/Card";

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
    <div className="min-h-screen bg-bg flex flex-col lg:flex-row">
      {/* Left Panel - Input Section */}
      <div className="w-full lg:w-[480px] bg-surface border-r border-border flex flex-col">
        {/* Header */}
        <Card
          variant="outlined"
          padding="none"
          className="border-0 border-b border-border rounded-none"
        >
          <CardHeader padding="md">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-accent/10 rounded-lg">
                <Wand2 className="w-5 h-5 text-accent" />
              </div>
              <div>
                <CardTitle className="text-lg font-semibold text-primary">
                  New Caption
                </CardTitle>
                <p className="text-sm text-text-body mt-1">
                  Describe your content and we'll craft the perfect caption
                </p>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          {/* Primary Input */}
          <div>
            <Textarea
              label="What's your content about?"
              value={contentInput}
              onChange={handleInputChange}
              placeholder="Launching a new product... Sharing a client win... Behind-the-scenes of my process..."
              error={
                showError
                  ? "Tell us what your content is about first"
                  : undefined
              }
              resize="none"
              className="min-h-[120px] text-base"
              maxLength={500}
            />
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

          {/* Quick Context Chips */}
          <div className="flex flex-wrap gap-3">
            <Button
              variant="outline"
              size="sm"
              leftIcon={<Link2 className="w-4 h-4" />}
              className="text-sm bg-border text-text-body shadow-border"
            >
              Add product link
            </Button>
            <Button
              variant="outline"
              size="sm"
              leftIcon={<Image className="w-4 h-4" />}
              className="text-sm bg-border text-text-body shadow-border"
            >
              Upload image
            </Button>
            <Button
              variant="outline"
              size="sm"
              leftIcon={<Clock className="w-4 h-4" />}
              className="text-sm bg-border text-text-body shadow-border"
            >
              Use previous post
            </Button>
          </div>

          {/* Advanced Options Accordion */}
          <div>
            <Card variant="outlined" className="overflow-hidden" padding="none">
              <button
                onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
                className="w-full flex items-center justify-between px-4 py-4 hover:bg-bg-highlight transition-colors rounded-lg"
              >
                <span className="text-sm font-medium text-text-head">
                  Advanced Options
                </span>
                <div>
                  <ChevronDown className="w-4 h-4 text-secondary" />
                </div>
              </button>

              {isAdvancedOpen && (
                <div className="overflow-hidden">
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
                        className="w-full h-2 bg-bg-highlight rounded-full appearance-none cursor-pointer accent-accent"
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
                      <div className="flex gap-2">
                        {["short", "medium", "long"].map((length) => (
                          <Button
                            key={length}
                            variant={
                              captionLength === length ? "primary" : "outline"
                            }
                            size="sm"
                            onClick={() => setCaptionLength(length)}
                            className="flex-1 text-sm"
                          >
                            {length.charAt(0).toUpperCase() + length.slice(1)}
                          </Button>
                        ))}
                      </div>
                    </div>

                    {/* Emoji Style */}
                    <div>
                      <label className="block text-xs font-medium text-primary mb-3">
                        Emoji Style
                      </label>
                      <div className="flex gap-2">
                        {[
                          { value: "none", label: "None" },
                          { value: "minimal", label: "Minimal" },
                          { value: "generous", label: "Generous" },
                        ].map((option) => (
                          <Button
                            key={option.value}
                            variant={
                              emojiStyle === option.value
                                ? "primary"
                                : "outline"
                            }
                            size="sm"
                            onClick={() => setEmojiStyle(option.value)}
                            className="flex-1 text-sm"
                          >
                            {option.label}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
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
          <div className="flex-1 flex items-center justify-center p-12 bg-linear-to-br from-bg to-bg-highlight">
            <div className="text-center max-w-md">
              {/* Illustration */}
              <div className="mb-8 relative">
                <div className="inline-flex items-center justify-center w-32 h-32 bg-linear-to-br from-accent/10 to-accent/5 rounded-2xl shadow-lg mb-6">
                  <div className="relative">
                    <Sparkles className="w-16 h-16 text-accent" />
                  </div>
                </div>
              </div>

              {/* Empty State Text */}
              <h2 className="text-2xl font-semibold text-text-head mb-3">
                Your captions will appear here
              </h2>
              <p className="text-text-body mb-8 leading-relaxed">
                Describe your content on the left, and we'll generate 5
                variations in your voice
              </p>

              {/* Tip Callout */}
              <div className="inline-flex items-start gap-3 px-4 py-3 bg-surface rounded-lg border border-border">
                <span className="text-xl">💡</span>
                <p className="text-sm text-secondary text-left">
                  <span className="font-medium text-primary">Pro tip:</span> The
                  more context you add, the better your captions
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* Results State */
          <div className="flex-1 p-6 bg-bg">
            <div className="max-w-4xl mx-auto">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-primary mb-2">
                  Generated Captions
                </h2>
                <p className="text-secondary">
                  Choose your favorite or copy to use right away
                </p>
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
                            <p className="text-secondary leading-relaxed mb-3">
                              {caption}
                            </p>
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
