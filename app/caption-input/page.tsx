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
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../../components/ui/Select";
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

  // Context data state
  const [productLink, setProductLink] = useState("");
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedPreviousPost, setSelectedPreviousPost] = useState("");
  const [previousPosts] = useState([
    { id: "1", title: "Launching our new product line", date: "2 days ago" },
    {
      id: "2",
      title: "Behind the scenes of our design process",
      date: "1 week ago",
    },
    {
      id: "3",
      title: "Client success story: 300% growth",
      date: "2 weeks ago",
    },
  ]);

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

    // Clear associated data when removing context items
    if (itemId === "product-link") {
      setProductLink("");
    } else if (itemId === "upload-image") {
      setUploadedImage(null);
      setImagePreview(null);
    } else if (itemId === "previous-post") {
      setSelectedPreviousPost("");
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setUploadedImage(null);
    setImagePreview(null);
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

    // Build context information
    const contextInfo = [];
    if (selectedContextItems.includes("product-link") && productLink) {
      contextInfo.push(`Product link: ${productLink}`);
    }
    if (selectedContextItems.includes("upload-image") && uploadedImage) {
      contextInfo.push(`Image: ${uploadedImage.name}`);
    }
    if (
      selectedContextItems.includes("previous-post") &&
      selectedPreviousPost
    ) {
      const post = previousPosts.find((p) => p.id === selectedPreviousPost);
      contextInfo.push(`Related to: ${post?.title}`);
    }

    // Mock generated captions with context
    const baseContent = contentInput.slice(0, 50);
    const contextText =
      contextInfo.length > 0 ? `\n\nContext: ${contextInfo.join(", ")}` : "";

    const mockCaptions = [
      `🚀 Excited to share this new chapter! ${baseContent}... What do you think? #innovation #growth${contextText}`,
      `Just launched something I've been working on! ${contentInput.slice(
        0,
        40
      )}... Can't wait to hear your thoughts! 💫${contextText}`,
      `Behind the scenes: ${contentInput.slice(
        0,
        60
      )}... The journey has been incredible! 🌟 #behindthescenes${contextText}`,
      `New project alert! ${contentInput.slice(
        0,
        45
      )}... This is just the beginning! ✨ #newbeginnings${contextText}`,
      `Sharing something special today: ${contentInput.slice(
        0,
        55
      )}... What's your take? 🤔 #community${contextText}`,
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
      <div className="w-full lg:w-[500px] bg-section border-r border-border flex flex-col">
        {/* Header */}
        <Card
          variant="outlined"
          padding="none"
          className="border-0 border-b border-border rounded-none bg-section"
        >
          <CardHeader padding="sm">
            <div className="flex items-center gap-3 mb-2">
              <Wand2
                className="w-5 h-5 text-text-head
              "
              />
              <div>
                <CardTitle className="text-lg font-semibold text-primary">
                  New Caption
                </CardTitle>
                <p className="text-sm font-medium">
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
            <div className="relative bg-surface rounded-xl border border-border">
              <Textarea
                value={contentInput}
                onChange={handleInputChange}
                placeholder="Launching a new product... Sharing a client win... Behind-the-scenes of my process..."
                error={
                  showError
                    ? "Tell us what your content is about first"
                    : undefined
                }
                autoExpand={true}
                className="min-h-10 text-sm border-none rounded-xl"
                maxLength={500}
              />
              <div className="flex items-end justify-between mt-2">
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
                <div className="flex items-center justify-between mr-2 mb-2">
                  <span className="text-xs text-hint">
                    {contentInput.length}/500
                  </span>
                  {contentInput.length > 400 && (
                    <span className="ml-2 text-xs text-warning">
                      Getting close to limit
                    </span>
                  )}
                </div>
              </div>
              {selectedContextItems.length > 0 && (
                <div className="border-t border-border" />
              )}
              {/* Selected Context Items */}
              {selectedContextItems.length > 0 && (
                <div className="flex flex-wrap gap-2 py-4 px-2 bg-section rounded-b-xl">
                  {selectedContextItems.map((itemId) => {
                    const option = contextOptions.find(
                      (opt) => opt.id === itemId
                    );
                    if (!option) return null;
                    const IconComponent = option.icon;

                    return (
                      <div
                        key={itemId}
                        className="inline-flex items-center gap-2 px-3 py-2 bg-surface border border-border rounded-xl text-sm"
                      >
                        <div className="p-1 bg-section-light rounded">
                          <IconComponent className="w-[14px] h-[14px] text-text-body" />
                        </div>
                        <span className="text-text-head font-medium text-sm">
                          {option.label}
                        </span>
                        <button
                          onClick={() => handleRemoveContextItem(itemId)}
                          className="p-1 hover:bg-section-light rounded transition-colors"
                        >
                          <X className="w-[14px] h-[14px] text-text-body" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Context Input Fields */}
              {selectedContextItems.includes("product-link") && (
                <div className="border-t border-border p-4 bg-section">
                  <label className="block text-sm font-medium text-primary mb-2">
                    Product Link
                  </label>
                  <Input
                    type="url"
                    value={productLink}
                    onChange={(e) => setProductLink(e.target.value)}
                    placeholder="https://example.com/product"
                    className="w-full"
                  />
                </div>
              )}

              {selectedContextItems.includes("upload-image") && (
                <div className="border-t border-border p-4 bg-section">
                  <label className="block text-sm font-medium text-primary mb-2">
                    Upload Image
                  </label>
                  {!imagePreview ? (
                    <div className="border-2 border-dashed border-border rounded-xl p-6 text-center">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="image-upload"
                      />
                      <label
                        htmlFor="image-upload"
                        className="cursor-pointer flex flex-col items-center gap-2"
                      >
                        <Image className="w-8 h-8 text-text-body" />
                        <span className="text-sm text-text-body">
                          Click to upload an image
                        </span>
                        <span className="text-xs text-hint">
                          PNG, JPG, GIF up to 10MB
                        </span>
                      </label>
                    </div>
                  ) : (
                    <div className="relative">
                      <img
                        src={imagePreview}
                        alt="Uploaded preview"
                        className="w-full h-32 object-cover rounded-xl"
                      />
                      <button
                        onClick={removeImage}
                        className="absolute top-2 right-2 p-1 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              )}

              {selectedContextItems.includes("previous-post") && (
                <div className="border-t border-border p-4 bg-section">
                  <label className="block text-sm font-medium text-primary mb-2">
                    Select Previous Post
                  </label>
                  <Select
                    value={selectedPreviousPost}
                    onValueChange={setSelectedPreviousPost}
                  >
                    <SelectTrigger className="w-full border border-border rounded-xl bg-surface text-sm">
                      <SelectValue placeholder="Choose a previous post" />
                    </SelectTrigger>
                    <SelectContent>
                      {previousPosts.map((post) => (
                        <SelectItem key={post.id} value={post.title}>
                          <div className="flex flex-col">
                            <span className="font-medium">{post.title}</span>
                            <span className="text-xs text-hint">
                              {post.date}
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          </div>

          {/* Floating Context Menu */}
          {showContextMenu && (
            <div
              ref={contextMenuRef}
              className="absolute z-9999 mb-3 w-56 bg-white border border-gray-200 rounded-xl shadow-xl p-1"
              style={{
                top: "9%",
                left: "32px",
              }}
            >
              {contextOptions.map((option) => {
                const IconComponent = option.icon;
                const isSelected = selectedContextItems.includes(option.id);

                return (
                  <button
                    key={option.id}
                    onClick={() => handleContextItemToggle(option.id)}
                    className={`w-full flex items-center gap-3 px-4 py-2 rounded-xl text-sm transition-colors first:rounded-t-xl last:rounded-b-xl ${
                      isSelected
                        ? "bg-section text-text-head"
                        : "text-text-head hover:bg-section"
                    }`}
                  >
                    <div className="bg-section-light rounded-sm p-1">
                      <IconComponent
                        className={`w-[14px] h-[14px] ${
                          isSelected ? "text-primary" : "text-text-body"
                        }`}
                      />
                    </div>
                    <span className="flex-1 text-left font-medium text-sm">
                      {option.label}
                    </span>
                    {isSelected && (
                      <div className="p-1 bg-section rounded-full">
                        <Check className="w-3 h-3 text-primary" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          )}

          {/* Advanced Options Accordion */}
          <div>
            <Card
              variant="outlined"
              className="overflow-hidden bg-section"
              padding="none"
            >
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
                    <Select value={ctaType} onValueChange={setCtaType}>
                      <SelectTrigger className="w-full border border-border rounded-xl bg-surface text-sm">
                        <SelectValue placeholder="Choose a CTA" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="link-in-bio">Link in bio</SelectItem>
                        <SelectItem value="shop-now">Shop now</SelectItem>
                        <SelectItem value="dm-me">DM me</SelectItem>
                        <SelectItem value="comment-below">
                          Comment below
                        </SelectItem>
                        <SelectItem value="custom">Custom</SelectItem>
                      </SelectContent>
                    </Select>
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
        <div className="px-6 py-4 border-t border-border">
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
            <div className="text-center">
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
              <div className="inline-flex items-center gap-3 px-4 py-3 bg-surface rounded-lg border border-border">
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
