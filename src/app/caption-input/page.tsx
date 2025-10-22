"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const captionVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4 },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.3 },
    },
  };

  return (
    <div className="min-h-screen bg-bg flex flex-col lg:flex-row">
      {/* Left Panel - Input Section */}
      <motion.div
        className="w-full lg:w-[480px] bg-surface border-r border-primary flex flex-col"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <Card
          variant="outlined"
          padding="none"
          className="border-0 border-b border-primary rounded-none"
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
                <p className="text-sm text-secondary mt-1">
                  Describe your content and we'll craft the perfect caption
                </p>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          {/* Primary Input */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
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
          </motion.div>

          {/* Quick Context Chips */}
          <motion.div
            className="flex flex-wrap gap-3"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            <Button
              variant="outline"
              size="sm"
              leftIcon={<Link2 className="w-4 h-4" />}
              className="text-sm"
            >
              Add product link
            </Button>
            <Button
              variant="outline"
              size="sm"
              leftIcon={<Image className="w-4 h-4" />}
              className="text-sm"
            >
              Upload image
            </Button>
            <Button
              variant="outline"
              size="sm"
              leftIcon={<Clock className="w-4 h-4" />}
              className="text-sm"
            >
              Use previous post
            </Button>
          </motion.div>

          {/* Advanced Options Accordion */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            <Card variant="outlined" className="overflow-hidden">
              <button
                onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
                className="w-full flex items-center justify-between px-4 py-4 hover:bg-bg-highlight transition-colors"
              >
                <span className="text-sm font-medium text-primary">
                  Advanced Options
                </span>
                <motion.div
                  animate={{ rotate: isAdvancedOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="w-4 h-4 text-secondary" />
                </motion.div>
              </button>

              <AnimatePresence>
                {isAdvancedOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-6 space-y-6 border-t border-primary">
                      {/* Call-to-Action */}
                      <div className="pt-4">
                        <label className="block text-xs font-medium text-primary mb-2">
                          Call-to-Action
                        </label>
                        <select
                          value={ctaType}
                          onChange={(e) => setCtaType(e.target.value)}
                          className="w-full px-3 py-2 border border-primary rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-focus focus:border-focus bg-surface"
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
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          </motion.div>
        </div>

        {/* Fixed Bottom - Generate Button */}
        <div className="px-6 py-4 border-t border-primary bg-surface">
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
      </motion.div>

      {/* Right Panel - Results Area */}
      <motion.div
        className="flex-1 flex flex-col"
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {generatedCaptions.length === 0 ? (
          /* Empty State */
          <div className="flex-1 flex items-center justify-center p-12 bg-gradient-to-br from-bg to-bg-highlight">
            <motion.div
              className="text-center max-w-md"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Illustration */}
              <motion.div className="mb-8 relative" variants={itemVariants}>
                <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-accent/10 to-accent/5 rounded-2xl shadow-lg mb-6">
                  <div className="relative">
                    <Sparkles className="w-16 h-16 text-accent animate-pulse" />
                    {/* Floating caption bubbles */}
                    <motion.div
                      className="absolute -top-4 -right-8 w-20 h-12 bg-surface rounded-lg shadow-md transform rotate-12 opacity-70 flex items-center justify-center"
                      animate={{ y: [-2, 2, -2] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <div className="w-12 h-1.5 bg-primary rounded-full"></div>
                    </motion.div>
                    <motion.div
                      className="absolute -bottom-2 -left-8 w-16 h-10 bg-surface rounded-lg shadow-md transform -rotate-6 opacity-70 flex items-center justify-center"
                      animate={{ y: [2, -2, 2] }}
                      transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                    >
                      <div className="w-10 h-1.5 bg-primary rounded-full"></div>
                    </motion.div>
                    <motion.div
                      className="absolute top-2 -left-12 w-4 h-4 bg-accent rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    ></motion.div>
                    <motion.div
                      className="absolute bottom-4 -right-4 w-3 h-3 bg-accent/60 rounded-full"
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                    ></motion.div>
                  </div>
                </div>
              </motion.div>

              {/* Empty State Text */}
              <motion.h2
                className="text-2xl font-semibold text-primary mb-3"
                variants={itemVariants}
              >
                Your captions will appear here
              </motion.h2>
              <motion.p
                className="text-secondary mb-8 leading-relaxed"
                variants={itemVariants}
              >
                Describe your content on the left, and we'll generate 5
                variations in your voice
              </motion.p>

              {/* Tip Callout */}
              <motion.div
                className="inline-flex items-start gap-3 px-4 py-3 bg-surface rounded-lg border border-primary shadow-sm"
                variants={itemVariants}
              >
                <span className="text-xl">💡</span>
                <p className="text-sm text-secondary text-left">
                  <span className="font-medium text-primary">Pro tip:</span> The
                  more context you add, the better your captions
                </p>
              </motion.div>
            </motion.div>
          </div>
        ) : (
          /* Results State */
          <div className="flex-1 p-6 bg-bg">
            <motion.div
              className="max-w-4xl mx-auto"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div className="mb-6" variants={itemVariants}>
                <h2 className="text-xl font-semibold text-primary mb-2">
                  Generated Captions
                </h2>
                <p className="text-secondary">
                  Choose your favorite or copy to use right away
                </p>
              </motion.div>

              <div className="space-y-4">
                <AnimatePresence>
                  {generatedCaptions.map((caption, index) => (
                    <motion.div
                      key={index}
                      variants={captionVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      layout
                    >
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
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              <motion.div className="mt-8 text-center" variants={itemVariants}>
                <Button
                  variant="outline"
                  onClick={() => setGeneratedCaptions([])}
                  leftIcon={<Zap className="w-4 h-4" />}
                >
                  Generate New Set
                </Button>
              </motion.div>
            </motion.div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
