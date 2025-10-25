"use client";

import React, { useState, useMemo } from "react";
import {
  Search,
  Filter,
  Grid3x3,
  List,
  Copy,
  Edit2,
  Trash2,
  MoreVertical,
  Download,
  Tag,
  Check,
  X,
  Calendar,
  TrendingUp,
  BookMarked,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { SocialIcon } from "react-social-icons";
import { Button } from "../../../components/ui/Button";
import { Card, CardHeader, CardTitle } from "../../../components/ui/Card";
import { ToastProvider } from "../../../components/ui/Toast";
import EditCaptionModal from "../../../components/captions/EditCaptionModal";

// Mock data - replace with actual API calls
const savedCaptions = [
  {
    id: "1",
    content:
      "Exciting news! 🎉 We're launching something special next week that's going to change how you create content. Can you guess what it is? Drop your guesses below! 👇",
    platform: "instagram",
    style: "Teaser",
    savedDate: "2024-01-20",
    performance: "high",
    tags: ["product launch", "engagement"],
    engagementRate: "6.2%",
    createdAt: new Date("2024-01-20"),
  },
  {
    id: "2",
    content:
      "Behind the scenes of building a product people actually want: Talk to users early, ship fast, and don't be afraid to pivot. What's your #1 product lesson?",
    platform: "linkedin",
    style: "Thought Leadership",
    savedDate: "2024-01-19",
    performance: "high",
    tags: ["product", "lessons"],
    engagementRate: "5.8%",
    createdAt: new Date("2024-01-19"),
  },
  {
    id: "3",
    content:
      "Coffee first, creativity second ☕️ What's your morning ritual that helps you stay productive? Mine: 1. Coffee 2. Quick workout 3. Review goals. Let me know yours!",
    platform: "instagram",
    style: "Engagement",
    savedDate: "2024-01-18",
    performance: "medium",
    tags: ["lifestyle", "routine"],
    engagementRate: "4.3%",
    createdAt: new Date("2024-01-18"),
  },
  {
    id: "4",
    content:
      "Quick tip: Your audience doesn't want perfection, they want authenticity. Show up as you are, share your process, and watch engagement soar. 📈",
    platform: "twitter",
    style: "Educational",
    savedDate: "2024-01-17",
    performance: "medium",
    tags: ["tips", "authenticity"],
    engagementRate: "4.1%",
    createdAt: new Date("2024-01-17"),
  },
  {
    id: "5",
    content:
      "5 things I learned launching my first product: 1. Launch before you're ready 2. Listen more than you talk 3. Iterate based on feedback 4. Celebrate small wins 5. Community > marketing budget",
    platform: "linkedin",
    style: "Listicle",
    savedDate: "2024-01-15",
    performance: "high",
    tags: ["product launch", "lessons"],
    engagementRate: "7.1%",
    createdAt: new Date("2024-01-15"),
  },
  {
    id: "6",
    content:
      "That feeling when you finally solve a problem you've been stuck on for days... 🎯 What's your latest win? Celebrate with me in the comments!",
    platform: "instagram",
    style: "Relatable",
    savedDate: "2024-01-14",
    performance: "medium",
    tags: ["wins", "celebration"],
    engagementRate: "3.9%",
    createdAt: new Date("2024-01-14"),
  },
  {
    id: "7",
    content:
      "Hot take: Your content doesn't need to go viral. It needs to resonate with the RIGHT people. Quality audience > vanity metrics every time. 💯",
    platform: "twitter",
    style: "Hot Take",
    savedDate: "2024-01-12",
    performance: "high",
    tags: ["marketing", "strategy"],
    engagementRate: "6.8%",
    createdAt: new Date("2024-01-12"),
  },
  {
    id: "8",
    content:
      "New week, new opportunities. What's one goal you're crushing this week? Let's keep each other accountable! 💪",
    platform: "instagram",
    style: "Motivational",
    savedDate: "2024-01-10",
    performance: "low",
    tags: ["motivation", "goals"],
    engagementRate: "2.7%",
    createdAt: new Date("2024-01-10"),
  },
];

export default function LibraryPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedCaptions, setSelectedCaptions] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("recent");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [expandedCaptions, setExpandedCaptions] = useState<Set<string>>(
    new Set()
  );
  const [editingCaptionIndex, setEditingCaptionIndex] = useState<number | null>(
    null
  );
  const [editedCaptions, setEditedCaptions] = useState(savedCaptions);

  // Filter and sort captions
  const filteredCaptions = useMemo(() => {
    let filtered = editedCaptions;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (caption) =>
          caption.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
          caption.tags.some((tag) =>
            tag.toLowerCase().includes(searchQuery.toLowerCase())
          ) ||
          caption.platform.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Platform filter
    if (selectedPlatforms.length > 0) {
      filtered = filtered.filter((caption) =>
        selectedPlatforms.includes(caption.platform)
      );
    }

    // Style filter
    if (selectedStyles.length > 0) {
      filtered = filtered.filter((caption) =>
        selectedStyles.includes(caption.style)
      );
    }

    // Sort
    switch (sortBy) {
      case "recent":
        filtered.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        break;
      case "performance":
        filtered.sort((a, b) => {
          const aRate = parseFloat(a.engagementRate);
          const bRate = parseFloat(b.engagementRate);
          return bRate - aRate;
        });
        break;
      case "platform":
        filtered.sort((a, b) => a.platform.localeCompare(b.platform));
        break;
      case "style":
        filtered.sort((a, b) => a.style.localeCompare(b.style));
        break;
    }

    return filtered;
  }, [editedCaptions, searchQuery, selectedPlatforms, selectedStyles, sortBy]);

  // Helper functions
  const getPlatformIcon = (platform: string) => {
    const icons = {
      instagram: (
        <SocialIcon network="instagram" style={{ width: 16, height: 16 }} />
      ),
      linkedin: (
        <SocialIcon network="linkedin" style={{ width: 16, height: 16 }} />
      ),
      twitter: (
        <SocialIcon network="twitter" style={{ width: 16, height: 16 }} />
      ),
    };
    return icons[platform as keyof typeof icons];
  };

  const getPlatformColor = (platform: string) => {
    const colors = {
      instagram: "bg-pink-50 text-pink-600 border-pink-200",
      linkedin: "bg-blue-50 text-blue-600 border-blue-200",
      x: "bg-gray-100 text-gray-600 border-gray-200",
      default: "bg-gray-100 text-gray-600 border-gray-200",
    };
    return colors[platform as keyof typeof colors];
  };

  const getPerformanceColor = (performance: string) => {
    const colors = {
      high: "text-success bg-green-50 border-green-200",
      medium: "text-warning bg-yellow-50 border-yellow-200",
      low: "text-text-body bg-gray-50 border-gray-200",
    };
    return colors[performance as keyof typeof colors];
  };

  // Event handlers
  const handleSelectCaption = (id: string) => {
    setSelectedCaptions((prev) =>
      prev.includes(id) ? prev.filter((cid) => cid !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedCaptions.length === filteredCaptions.length) {
      setSelectedCaptions([]);
    } else {
      setSelectedCaptions(filteredCaptions.map((caption) => caption.id));
    }
  };

  const handleCopy = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setToastMessage("Caption copied! 📋");
      setShowToast(true);
      setCopiedIndex(index);
      setTimeout(() => {
        setShowToast(false);
        setCopiedIndex(null);
      }, 2000);
    } catch (error) {
      setToastMessage("Failed to copy caption");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    }
  };

  const handleDelete = () => {
    setToastMessage(`${selectedCaptions.length} caption(s) deleted`);
    setShowToast(true);
    setSelectedCaptions([]);
    setTimeout(() => setShowToast(false), 2000);
  };

  const togglePlatformFilter = (platform: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platform)
        ? prev.filter((p) => p !== platform)
        : [...prev, platform]
    );
  };

  const toggleStyleFilter = (style: string) => {
    setSelectedStyles((prev) =>
      prev.includes(style) ? prev.filter((s) => s !== style) : [...prev, style]
    );
  };

  const clearAllFilters = () => {
    setSelectedPlatforms([]);
    setSelectedStyles([]);
    setSearchQuery("");
  };

  const toggleCaptionExpansion = (captionId: string) => {
    setExpandedCaptions((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(captionId)) {
        newSet.delete(captionId);
      } else {
        newSet.add(captionId);
      }
      return newSet;
    });
  };

  // Edit caption handlers
  const handleEditCaption = (index: number) => {
    setEditingCaptionIndex(index);
  };

  const handleSaveEditedCaption = (newCaption: string) => {
    if (editingCaptionIndex !== null) {
      const updatedCaptions = [...editedCaptions];
      updatedCaptions[editingCaptionIndex] = {
        ...updatedCaptions[editingCaptionIndex],
        content: newCaption,
      };
      setEditedCaptions(updatedCaptions);
      setEditingCaptionIndex(null);
      setToastMessage("Caption updated successfully! ✏️");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    }
  };

  const handleCloseEditModal = () => {
    setEditingCaptionIndex(null);
  };

  // Helper function to determine if content needs truncation
  // Using the same logic as CaptionResults.tsx for consistency
  const needsTruncation = (content: string) => {
    return content.length > 120;
  };

  // Calculate stats
  const totalSaved = savedCaptions.length;
  const avgEngagement = (
    savedCaptions.reduce(
      (sum, caption) => sum + parseFloat(caption.engagementRate),
      0
    ) / savedCaptions.length
  ).toFixed(1);
  const topPlatform = savedCaptions.reduce((acc, caption) => {
    acc[caption.platform] = (acc[caption.platform] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const topPlatformName = Object.keys(topPlatform).reduce((a, b) =>
    topPlatform[a] > topPlatform[b] ? a : b
  );

  return (
    <ToastProvider>
      <div className="min-h-screen bg-section">
        {/* Header */}
        <div className="bg-surface border-b border-border">
          <div className="px-6 py-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-display font-semibold text-text-head mb-1 flex items-center gap-2">
                  <BookMarked className="w-6 h-6 text-accent" />
                  Caption Library
                </h1>
                <p className="text-text-body text-sm">
                  Your collection of high-performing captions
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  leftIcon={<Download className="w-4 h-4" />}
                >
                  Export All
                </Button>
              </div>
            </div>

            {/* Search and Filters Bar */}
            <div className="flex items-center gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-hint" />
                <input
                  type="text"
                  placeholder="Search captions, tags, or platforms..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-sm border border-border rounded-xl bg-surface text-text-head placeholder:text-hint focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-colors"
                />
              </div>

              <div className="relative">
                <Button
                  variant="outline"
                  onClick={() => setFilterOpen(!filterOpen)}
                  leftIcon={<Filter className="w-4 h-4" />}
                  className={
                    selectedPlatforms.length > 0 || selectedStyles.length > 0
                      ? "border-accent bg-accent/5 text-accent"
                      : ""
                  }
                >
                  Filter
                  {(selectedPlatforms.length > 0 ||
                    selectedStyles.length > 0) && (
                    <span className="ml-1 px-1.5 py-0.5 bg-accent text-surface text-xs rounded-full">
                      {selectedPlatforms.length + selectedStyles.length}
                    </span>
                  )}
                </Button>

                {/* Filter Dropdown */}
                {filterOpen && (
                  <div className="absolute right-0 top-full mt-2 w-80 bg-surface rounded-lg border border-border shadow-lg z-10">
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-text-head">
                          Filters
                        </h3>
                        <button
                          onClick={clearAllFilters}
                          className="text-sm text-accent hover:text-accent-hover font-medium"
                        >
                          Clear all
                        </button>
                      </div>

                      {/* Platform Filters */}
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-text-head mb-2">
                          Platform
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {["instagram", "linkedin", "twitter"].map(
                            (platform) => (
                              <button
                                key={platform}
                                onClick={() => togglePlatformFilter(platform)}
                                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all border ${
                                  selectedPlatforms.includes(platform)
                                    ? `${getPlatformColor(platform)} border-2`
                                    : "bg-chip-bg text-text-body hover:bg-section-light border-border"
                                }`}
                              >
                                {getPlatformIcon(platform)}
                                <span className="capitalize">{platform}</span>
                                {selectedPlatforms.includes(platform) && (
                                  <Check className="w-3 h-3" />
                                )}
                              </button>
                            )
                          )}
                        </div>
                      </div>

                      {/* Style Filters */}
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-text-head mb-2">
                          Style
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {[
                            "Teaser",
                            "Educational",
                            "Engagement",
                            "Thought Leadership",
                            "Listicle",
                            "Relatable",
                            "Hot Take",
                            "Motivational",
                          ].map((style) => (
                            <button
                              key={style}
                              onClick={() => toggleStyleFilter(style)}
                              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all border ${
                                selectedStyles.includes(style)
                                  ? "bg-accent/10 text-accent border-accent border-2"
                                  : "bg-chip-bg text-text-body hover:bg-section-light border-border"
                              }`}
                            >
                              {style}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Sort By */}
                      <div>
                        <label className="block text-sm font-medium text-text-head mb-2">
                          Sort By
                        </label>
                        <select
                          value={sortBy}
                          onChange={(e) => setSortBy(e.target.value)}
                          className="w-full px-3 py-2 border border-border rounded-lg text-sm bg-surface text-text-head focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
                        >
                          <option value="recent">Recently Saved</option>
                          <option value="performance">Best Performance</option>
                          <option value="platform">Platform</option>
                          <option value="style">Style</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-1 border border-border rounded-lg p-1 bg-surface">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded transition-colors ${
                    viewMode === "grid"
                      ? "bg-section-light text-text-head"
                      : "text-hint hover:text-text-body"
                  }`}
                >
                  <Grid3x3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded transition-colors ${
                    viewMode === "list"
                      ? "bg-section-light text-text-head"
                      : "text-hint hover:text-text-body"
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bulk Actions Bar - Shows when items selected */}
        {selectedCaptions.length > 0 && (
          <div className="bg-accent/5 border-b border-accent/20 px-6 py-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-accent">
                {selectedCaptions.length} caption
                {selectedCaptions.length > 1 ? "s" : ""} selected
              </span>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  leftIcon={<Download className="w-4 h-4" />}
                >
                  Export
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  leftIcon={<Trash2 className="w-4 h-4" />}
                  onClick={handleDelete}
                  className="hover:bg-error/10 hover:border-error/30 hover:text-error"
                >
                  Delete
                </Button>
                <button
                  onClick={() => setSelectedCaptions([])}
                  className="p-1.5 hover:bg-surface rounded-lg transition-colors"
                >
                  <X className="w-4 h-4 text-hint" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Content Area */}
        <div className="px-6 py-6">
          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card
              padding="none"
              className="hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 "
            >
              <div className="p-4">
                <div className="text-sm text-hint mb-1">Total Saved</div>
                <div className="text-2xl font-display font-semibold text-text-head">
                  {totalSaved}
                </div>
              </div>
            </Card>
            <Card
              padding="none"
              className="hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 "
            >
              <div className="p-4">
                <div className="text-sm text-hint mb-1">Avg. Engagement</div>
                <div className="text-2xl font-display font-semibold text-text-head">
                  {avgEngagement}%
                </div>
              </div>
            </Card>
            <Card
              padding="none"
              className="hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 "
            >
              <div className="p-4">
                <div className="text-sm text-hint mb-1">Top Platform</div>
                <div className="flex items-center gap-2 mt-1">
                  {getPlatformIcon(topPlatformName)}
                  <span className="text-lg font-display font-semibold text-text-head capitalize">
                    {topPlatformName}
                  </span>
                </div>
              </div>
            </Card>
            <Card
              padding="none"
              className="hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 "
            >
              <div className="p-4">
                <div className="text-sm text-hint mb-1">Best Style</div>
                <div className="text-lg font-display font-semibold text-text-head">
                  Thought Leadership
                </div>
              </div>
            </Card>
          </div>

          {/* Caption Grid/List */}
          {filteredCaptions.length === 0 ? (
            <Card
              padding="lg"
              className="text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="max-w-md mx-auto">
                <BookMarked className="w-12 h-12 text-hint mx-auto mb-4" />
                <h3 className="text-lg font-display font-semibold text-text-head mb-2">
                  No captions found
                </h3>
                <p className="text-text-body mb-4">
                  {searchQuery ||
                  selectedPlatforms.length > 0 ||
                  selectedStyles.length > 0
                    ? "Try adjusting your search or filters to find what you're looking for."
                    : "Start creating captions to build your library."}
                </p>
                {(searchQuery ||
                  selectedPlatforms.length > 0 ||
                  selectedStyles.length > 0) && (
                  <Button variant="outline" onClick={clearAllFilters}>
                    Clear Filters
                  </Button>
                )}
              </div>
            </Card>
          ) : (
            <>
              {/* Select All */}
              <div className="mb-4">
                <label className="flex items-center gap-2 text-sm text-text-body cursor-pointer relative">
                  <input
                    type="checkbox"
                    checked={
                      selectedCaptions.length === filteredCaptions.length
                    }
                    onChange={handleSelectAll}
                    className="peer h-4 w-4 appearance-none rounded border border-border checked:bg-accent cursor-pointer transition"
                  />
                  <Check className="pointer-events-none absolute left-[2px] h-3 w-3 text-white opacity-0 peer-checked:opacity-100 transition" />
                  <span>Select all ({filteredCaptions.length} captions)</span>
                </label>
              </div>

              {viewMode === "grid" ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {filteredCaptions.map((caption, index) => (
                    <Card
                      key={caption.id}
                      padding="none"
                      className={`transition-all hover:shadow-2xl duration-300 hover:-translate-y-2`}
                    >
                      <div className="p-5">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <div
                              className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium border ${getPlatformColor(
                                caption.platform
                              )}`}
                            >
                              {getPlatformIcon(caption.platform)}
                              <span className="capitalize">
                                {caption.platform}
                              </span>
                            </div>
                            <span
                              className={`px-2 py-1 rounded-md text-xs font-medium border ${getPerformanceColor(
                                caption.performance
                              )}`}
                            >
                              <TrendingUp className="w-3 h-3 inline mr-1" />
                              {caption.engagementRate}
                            </span>
                          </div>
                          <label className="relative flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={selectedCaptions.includes(caption.id)}
                              onChange={() => handleSelectCaption(caption.id)}
                              className="peer h-4 w-4 appearance-none rounded border border-border checked:bg-accent cursor-pointer transition"
                            />
                            <Check className="pointer-events-none absolute left-[2px] top-[2px] h-3 w-3 text-white opacity-0 peer-checked:opacity-100 transition" />
                          </label>
                        </div>

                        {/* Caption Text */}
                        <div className="mb-4">
                          <p className="text-sm text-text-body leading-relaxed">
                            {expandedCaptions.has(caption.id)
                              ? caption.content
                              : caption.content.substring(0, 120) +
                                (caption.content.length > 120 ? "..." : "")}
                          </p>
                          {needsTruncation(caption.content) && (
                            <button
                              onClick={() => toggleCaptionExpansion(caption.id)}
                              className="text-xs text-accent hover:text-accent-hover font-medium mt-1 flex items-center gap-1"
                            >
                              {expandedCaptions.has(caption.id) ? (
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

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {caption.tags.map((tag) => (
                            <span
                              key={tag}
                              className="inline-flex items-center gap-1 px-2 py-0.5 bg-chip-bg text-text-body text-xs rounded border border-border"
                            >
                              <Tag className="w-3 h-3" />
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-between pt-4 border-t border-border">
                          <div className="flex items-center gap-1 text-xs text-hint">
                            <Calendar className="w-3 h-3" />
                            {new Date(caption.savedDate).toLocaleDateString(
                              "en-US",
                              { month: "short", day: "numeric" }
                            )}
                          </div>
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handleCopy(caption.content, index)}
                              className={`p-2 rounded transition-colors ${
                                copiedIndex === index
                                  ? "bg-accent/10 text-accent"
                                  : "hover:bg-accent/5 text-hint hover:text-accent"
                              }`}
                              title="Copy"
                            >
                              <Copy className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleEditCaption(index)}
                              className="p-2 hover:bg-accent/5 text-hint hover:text-accent rounded transition-colors"
                              title="Edit"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              className="p-2 hover:bg-error/10 text-hint hover:text-error rounded transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredCaptions.map((caption, index) => (
                    <Card
                      key={caption.id}
                      padding="none"
                      className={`transition-all hover:shadow-2xl duration-300 hover:-translate-y-2 `}
                    >
                      <div className="p-4 flex items-center gap-4">
                        <label className="relative flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedCaptions.includes(caption.id)}
                            onChange={() => handleSelectCaption(caption.id)}
                            className="peer h-4 w-4 appearance-none rounded border border-border checked:bg-accent cursor-pointer transition"
                          />
                          <Check className="pointer-events-none absolute left-[2px] top-[2px] h-3 w-3 text-white opacity-0 peer-checked:opacity-100 transition" />
                        </label>
                        <div className="flex-1 min-w-0">
                          <div className="mb-2">
                            <p className="text-sm text-text-body">
                              {expandedCaptions.has(caption.id)
                                ? caption.content
                                : caption.content.substring(0, 120) +
                                  (caption.content.length > 120 ? "..." : "")}
                            </p>
                            {needsTruncation(caption.content) && (
                              <button
                                onClick={() =>
                                  toggleCaptionExpansion(caption.id)
                                }
                                className="text-xs text-accent hover:text-accent-hover font-medium mt-1 flex items-center gap-1"
                              >
                                {expandedCaptions.has(caption.id) ? (
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
                            <div
                              className={`inline-flex items-center gap-1 ${getPlatformColor(
                                caption.platform
                              )} px-2 py-0.5 rounded border`}
                            >
                              {getPlatformIcon(caption.platform)}
                              <span className="capitalize">
                                {caption.platform}
                              </span>
                            </div>
                            <span className="px-2 py-0.5 bg-chip-bg text-text-body rounded border border-border">
                              {caption.style}
                            </span>
                            <span
                              className={`px-2 py-0.5 rounded border ${getPerformanceColor(
                                caption.performance
                              )}`}
                            >
                              {caption.engagementRate}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {new Date(caption.savedDate).toLocaleDateString(
                                "en-US",
                                { month: "short", day: "numeric" }
                              )}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            onClick={() => handleCopy(caption.content, index)}
                            className={`p-2 rounded transition-colors ${
                              copiedIndex === index
                                ? "bg-accent/10 text-accent"
                                : "hover:bg-accent/5 text-hint hover:text-accent"
                            }`}
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleEditCaption(index)}
                            className="p-2 hover:bg-accent/5 text-hint hover:text-accent rounded transition-colors"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button className="p-2 hover:bg-error/10 text-hint hover:text-error rounded transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        {/* Toast Notification */}
        {showToast && (
          <div className="fixed bottom-6 right-6 bg-text-head text-surface px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-slide-in-up z-50">
            <Check className="w-4 h-4" />
            <span className="text-sm font-medium">{toastMessage}</span>
          </div>
        )}

        {/* Edit Caption Modal */}
        {editingCaptionIndex !== null && (
          <EditCaptionModal
            isOpen={editingCaptionIndex !== null}
            originalCaption={editedCaptions[editingCaptionIndex].content}
            onClose={handleCloseEditModal}
            onSave={handleSaveEditedCaption}
            onCopy={(caption) => handleCopy(caption, editingCaptionIndex)}
          />
        )}
      </div>
    </ToastProvider>
  );
}
