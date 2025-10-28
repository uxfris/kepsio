"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  Search,
  Filter,
  Grid3x3,
  List,
  Edit2,
  Download,
  Check,
  BookMarked,
  BookmarkCheck,
  Copy,
  RefreshCw,
} from "lucide-react";
import { SocialIcon } from "react-social-icons";
import { Button } from "../../../components/ui/Button";
import { Card, CardHeader, CardTitle } from "../../../components/ui/Card";
import { ToastProvider } from "../../../components/ui/Toast";
import { CaptionCard } from "../../../components/captions/CaptionCard";
import EditCaptionModal from "../../../components/captions/EditCaptionModal";
import {
  CaptionCardSkeleton,
  StatCardSkeleton,
} from "../../../components/ui/Skeleton";
import { dataCache, CACHE_KEYS, CACHE_TTL } from "../../../lib/utils/cache";

// Note: savedCaptions data is now fetched from the API instead of using mock data
const mockSavedCaptions = [
  {
    id: "1",
    content:
      "Exciting news! 🎉 We're launching something special next week that's going to change how you create content. Can you guess what it is? Drop your guesses below! 👇",
    platform: "instagram",
    style: "Teaser",
    savedDate: "2024-01-20",
    tags: ["product launch", "engagement"],
    createdAt: new Date("2024-01-20"),
    isSaved: true,
  },
  {
    id: "2",
    content:
      "Behind the scenes of building a product people actually want: Talk to users early, ship fast, and don't be afraid to pivot. What's your #1 product lesson?",
    platform: "linkedin",
    style: "Thought Leadership",
    savedDate: "2024-01-19",
    tags: ["product", "lessons"],
    createdAt: new Date("2024-01-19"),
  },
  {
    id: "3",
    content:
      "Coffee first, creativity second ☕️ What's your morning ritual that helps you stay productive? Mine: 1. Coffee 2. Quick workout 3. Review goals. Let me know yours!",
    platform: "instagram",
    style: "Engagement",
    savedDate: "2024-01-18",
    tags: ["lifestyle", "routine"],
    createdAt: new Date("2024-01-18"),
  },
  {
    id: "4",
    content:
      "Quick tip: Your audience doesn't want perfection, they want authenticity. Show up as you are, share your process, and watch engagement soar. 📈",
    platform: "x",
    style: "Educational",
    savedDate: "2024-01-17",
    tags: ["tips", "authenticity"],
    createdAt: new Date("2024-01-17"),
  },
  {
    id: "5",
    content:
      "5 things I learned launching my first product: 1. Launch before you're ready 2. Listen more than you talk 3. Iterate based on feedback 4. Celebrate small wins 5. Community > marketing budget",
    platform: "linkedin",
    style: "Listicle",
    savedDate: "2024-01-15",
    tags: ["product launch", "lessons"],
    createdAt: new Date("2024-01-15"),
  },
  {
    id: "6",
    content:
      "That feeling when you finally solve a problem you've been stuck on for days... 🎯 What's your latest win? Celebrate with me in the comments!",
    platform: "instagram",
    style: "Relatable",
    savedDate: "2024-01-14",
    tags: ["wins", "celebration"],
    createdAt: new Date("2024-01-14"),
  },
  {
    id: "7",
    content:
      "Hot take: Your content doesn't need to go viral. It needs to resonate with the RIGHT people. Quality audience > vanity metrics every time. 💯",
    platform: "x",
    style: "Hot Take",
    savedDate: "2024-01-12",
    tags: ["marketing", "strategy"],
    createdAt: new Date("2024-01-12"),
  },
  {
    id: "8",
    content:
      "New week, new opportunities. What's one goal you're crushing this week? Let's keep each other accountable! 💪",
    platform: "instagram",
    style: "Motivational",
    savedDate: "2024-01-10",
    tags: ["motivation", "goals"],
    createdAt: new Date("2024-01-10"),
  },
];

export default function LibraryPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("recent");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [editingCaptionIndex, setEditingCaptionIndex] = useState<number | null>(
    null
  );
  const [editedCaptions, setEditedCaptions] = useState(mockSavedCaptions);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [savingCaptionId, setSavingCaptionId] = useState<string | null>(null);

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
      x: <SocialIcon network="x" style={{ width: 16, height: 16 }} />,
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

  // Event handlers
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

  // Fetch saved captions from API with caching
  const fetchSavedCaptions = async (forceRefresh = false) => {
    try {
      // Check cache first (skip if force refresh)
      if (!forceRefresh) {
        const cachedData = dataCache.get<any[]>(
          CACHE_KEYS.SAVED_CAPTIONS,
          CACHE_TTL.MEDIUM
        );

        if (cachedData) {
          setEditedCaptions(cachedData);
          setIsLoading(false);
          return;
        }
      }

      setIsLoading(true);
      const response = await fetch("/api/captions/recent?limit=100");
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          // Filter only saved captions
          const saved = data.captions
            .filter((c: any) => c.isSaved)
            .map((c: any) => ({
              id: c.id,
              content: c.fullText,
              platform: c.platform,
              style: c.style,
              savedDate: c.createdAt,
              tags: [],
              createdAt: new Date(c.createdAt),
              isSaved: c.isSaved,
            }));
          setEditedCaptions(saved);
          // Cache the data
          dataCache.set(CACHE_KEYS.SAVED_CAPTIONS, saved);
        }
      }
    } catch (error) {
      console.error("Error fetching saved captions:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchSavedCaptions();
  }, []);

  // Refetch when page becomes visible (user navigates back)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        // Check if cache was invalidated while away
        const cachedData = dataCache.get<any[]>(
          CACHE_KEYS.SAVED_CAPTIONS,
          CACHE_TTL.MEDIUM
        );
        if (!cachedData) {
          // Cache was invalidated, refetch
          fetchSavedCaptions(true);
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  // Handle save/unsave caption
  const handleSaveCaption = async (captionId: string) => {
    try {
      setSavingCaptionId(captionId);
      const response = await fetch("/api/captions/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ captionId }),
      });

      if (response.ok) {
        const data = await response.json();
        // If unsaved, remove from the list
        if (!data.isSaved) {
          setEditedCaptions((prev) =>
            prev.filter((caption) => caption.id !== captionId)
          );
          setToastMessage("Caption removed from library");
          setShowToast(true);
          setTimeout(() => setShowToast(false), 2000);

          // Invalidate cache
          dataCache.invalidate(CACHE_KEYS.SAVED_CAPTIONS);
          dataCache.invalidate(CACHE_KEYS.RECENT_CAPTIONS);
        }
      }
    } catch (error) {
      console.error("Failed to save caption:", error);
    } finally {
      setSavingCaptionId(null);
    }
  };

  // Calculate stats
  const totalSaved = editedCaptions.length;
  const topPlatform = editedCaptions.reduce((acc, caption) => {
    acc[caption.platform] = (acc[caption.platform] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const topPlatformName =
    Object.keys(topPlatform).length > 0
      ? Object.keys(topPlatform).reduce((a, b) =>
          topPlatform[a] > topPlatform[b] ? a : b
        )
      : "instagram";

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
                  variant="ghost"
                  onClick={() => fetchSavedCaptions(true)}
                  leftIcon={<RefreshCw className="w-4 h-4" />}
                  title="Refresh library"
                >
                  Refresh
                </Button>
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
                          {["instagram", "linkedin", "x"].map((platform) => (
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
                          ))}
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

        {/* Content Area */}
        <div className="px-6 py-6">
          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {isLoading ? (
              <>
                <StatCardSkeleton />
                <StatCardSkeleton />
                <StatCardSkeleton />
              </>
            ) : (
              <>
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
              </>
            )}
          </div>

          {/* Caption Grid/List */}
          {isLoading ? (
            viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <CaptionCardSkeleton key={i} />
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {[...Array(6)].map((_, i) => (
                  <CaptionCardSkeleton key={i} />
                ))}
              </div>
            )
          ) : filteredCaptions.length === 0 ? (
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
              {viewMode === "grid" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCaptions.map((caption, index) => (
                    <div key={caption.id}>
                      <CaptionCard
                        id={caption.id}
                        caption={caption.content}
                        platform={caption.platform as any}
                        style={caption.style}
                        date={new Date(caption.savedDate).toLocaleDateString(
                          "en-US",
                          { month: "short", day: "numeric" }
                        )}
                        hoveredCard={hoveredCard}
                        onHoverChange={(id) =>
                          setHoveredCard(id as string | null)
                        }
                        isCopied={copiedIndex === index}
                        onCopy={() => handleCopy(caption.content, index)}
                        variant="grid"
                        actions={[
                          {
                            icon: <Edit2 className="w-4 h-4 shrink-0" />,
                            label: "Edit",
                            onClick: () => handleEditCaption(index),
                            variant: "ghost",
                          },
                          {
                            icon: (
                              <BookmarkCheck className="w-4 h-4 shrink-0" />
                            ),
                            label: "Unsave",
                            onClick: () => handleSaveCaption(caption.id),
                            variant: "ghost",
                            className:
                              savingCaptionId === caption.id
                                ? "opacity-50"
                                : "",
                          },
                        ]}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredCaptions.map((caption, index) => (
                    <div key={caption.id}>
                      <CaptionCard
                        id={caption.id}
                        caption={caption.content}
                        platform={caption.platform as any}
                        style={caption.style}
                        date={new Date(caption.savedDate).toLocaleDateString(
                          "en-US",
                          { month: "short", day: "numeric" }
                        )}
                        variant="list"
                        actions={[
                          {
                            icon: <Copy className="w-4 h-4" />,
                            label: "Copy",
                            onClick: () => handleCopy(caption.content, index),
                            className: `p-2 rounded transition-colors ${
                              copiedIndex === index
                                ? "bg-accent/10 text-accent"
                                : "hover:bg-accent/5 text-hint hover:text-accent"
                            }`,
                          },
                          {
                            icon: <Edit2 className="w-4 h-4" />,
                            label: "Edit",
                            onClick: () => handleEditCaption(index),
                            className:
                              "p-2 hover:bg-accent/5 text-hint hover:text-accent rounded transition-colors",
                          },
                          {
                            icon: <BookmarkCheck className="w-4 h-4" />,
                            label: "Unsave",
                            onClick: () => handleSaveCaption(caption.id),
                            className: `p-2 hover:bg-error/10 text-hint hover:text-error rounded transition-colors ${
                              savingCaptionId === caption.id ? "opacity-50" : ""
                            }`,
                          },
                        ]}
                      />
                    </div>
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
