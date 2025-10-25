"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Search,
  Filter,
  SortAsc,
  SortDesc,
  Copy,
  RotateCcw,
  Bookmark,
  MoreVertical,
  Calendar,
  Grid,
  List,
  Trash2,
  Edit,
  Download,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
} from "lucide-react";
import { SocialIcon } from "react-social-icons";
import { Button } from "../../../components/ui/Button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../../components/ui/Card";
import { Input } from "../../../components/ui/Input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../../../components/ui/Select";
import { ToastProvider, useToast } from "../../../components/ui/Toast";

// Extended mock data with more captions for demonstration
const allCaptions = [
  {
    id: 1,
    snippet: "Exciting news! 🎉 We're launching something special next week...",
    fullText:
      "Exciting news! 🎉 We're launching something special next week that's going to change how you create content. Can you guess what it is? Drop your guesses below! 👇",
    date: "2 hours ago",
    platform: "instagram",
    style: "Teaser",
    engagement: 4.2,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
  },
  {
    id: 2,
    snippet: "Behind the scenes of building a product people actually want...",
    fullText:
      "Behind the scenes of building a product people actually want: Talk to users early, ship fast, and don't be afraid to pivot. What's your #1 product lesson?",
    date: "Yesterday",
    platform: "linkedin",
    style: "Thought Leadership",
    engagement: 3.8,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
  },
  {
    id: 3,
    snippet: "Coffee first, creativity second ☕️ What's your morning ritual?",
    fullText:
      "Coffee first, creativity second ☕️ What's your morning ritual that helps you stay productive? Mine: 1. Coffee 2. Quick workout 3. Review goals. Let me know yours!",
    date: "2 days ago",
    platform: "instagram",
    style: "Engagement",
    engagement: 4.5,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
  },
  {
    id: 4,
    snippet: "Quick tip: Your audience doesn't want perfection...",
    fullText:
      "Quick tip: Your audience doesn't want perfection, they want authenticity. Show up as you are, share your process, and watch engagement soar. 📈",
    date: "3 days ago",
    platform: "x",
    style: "Educational",
    engagement: 3.9,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
  },
  {
    id: 5,
    snippet: "5 things I learned launching my first product...",
    fullText:
      "5 things I learned launching my first product: 1. Launch before you're ready 2. Listen more than you talk 3. Iterate based on feedback 4. Celebrate small wins 5. Community > marketing budget",
    date: "5 days ago",
    platform: "linkedin",
    style: "Listicle",
    engagement: 4.1,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
  },
  {
    id: 6,
    snippet: "That feeling when you finally solve a problem you've been...",
    fullText:
      "That feeling when you finally solve a problem you've been stuck on for days... 🎯 What's your latest win? Celebrate with me in the comments!",
    date: "1 week ago",
    platform: "instagram",
    style: "Relatable",
    engagement: 4.3,
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 week ago
  },
  {
    id: 7,
    snippet: "Building in public: Day 30 of my startup journey...",
    fullText:
      "Building in public: Day 30 of my startup journey. Today I hit 1000 users! 🚀 The biggest lesson? Ship fast, listen to feedback, and don't overthink. What's your biggest startup lesson?",
    date: "1 week ago",
    platform: "x",
    style: "Behind the Scenes",
    engagement: 3.7,
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 week ago
  },
  {
    id: 8,
    snippet: "Why I switched from perfectionism to progress...",
    fullText:
      "Why I switched from perfectionism to progress: Done is better than perfect. Your audience wants to see your journey, not just the polished result. Share the process!",
    date: "2 weeks ago",
    platform: "linkedin",
    style: "Personal Story",
    engagement: 4.0,
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), // 2 weeks ago
  },
  {
    id: 9,
    snippet: "The content creator's dilemma: Quality vs Quantity...",
    fullText:
      "The content creator's dilemma: Quality vs Quantity. Here's what I learned after posting daily for 6 months: Consistency beats perfection every time. What's your take?",
    date: "2 weeks ago",
    platform: "instagram",
    style: "Discussion",
    engagement: 3.6,
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), // 2 weeks ago
  },
  {
    id: 10,
    snippet: "My morning routine that changed everything...",
    fullText:
      "My morning routine that changed everything: 5 AM wake up, 20 min meditation, 30 min workout, 1 hour deep work. The key? Start with intention, not reaction. What's yours?",
    date: "3 weeks ago",
    platform: "linkedin",
    style: "Lifestyle",
    engagement: 4.4,
    createdAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000), // 3 weeks ago
  },
];

const platforms = ["All", "instagram", "linkedin", "x"];
const styles = [
  "All",
  "Teaser",
  "Thought Leadership",
  "Engagement",
  "Educational",
  "Listicle",
  "Relatable",
  "Behind the Scenes",
  "Personal Story",
  "Discussion",
  "Lifestyle",
];
const sortOptions = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "engagement", label: "Highest Engagement" },
  { value: "platform", label: "Platform" },
];

function RecentCaptionsContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState("All");
  const [selectedStyle, setSelectedStyle] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedCaptions, setSelectedCaptions] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const { addToast } = useToast();

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "instagram":
        return (
          <SocialIcon network="instagram" style={{ width: 16, height: 16 }} />
        );
      case "linkedin":
        return (
          <SocialIcon network="linkedin" style={{ width: 16, height: 16 }} />
        );
      case "x":
        return <SocialIcon network="x" style={{ width: 16, height: 16 }} />;
      default:
        return (
          <SocialIcon network="instagram" style={{ width: 16, height: 16 }} />
        );
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case "instagram":
        return "bg-pink-100 text-pink-600 border-pink-200";
      case "linkedin":
        return "bg-blue-100 text-blue-600 border-blue-200";
      case "x":
        return "bg-gray-100 text-gray-600 border-gray-200";
      default:
        return "bg-gray-100 text-gray-600 border-gray-200";
    }
  };

  const filteredAndSortedCaptions = useMemo(() => {
    let filtered = allCaptions.filter((caption) => {
      const matchesSearch =
        caption.fullText.toLowerCase().includes(searchQuery.toLowerCase()) ||
        caption.snippet.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPlatform =
        selectedPlatform === "All" || caption.platform === selectedPlatform;
      const matchesStyle =
        selectedStyle === "All" || caption.style === selectedStyle;

      return matchesSearch && matchesPlatform && matchesStyle;
    });

    // Sort captions
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return b.createdAt.getTime() - a.createdAt.getTime();
        case "oldest":
          return a.createdAt.getTime() - b.createdAt.getTime();
        case "engagement":
          return b.engagement - a.engagement;
        case "platform":
          return a.platform.localeCompare(b.platform);
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchQuery, selectedPlatform, selectedStyle, sortBy]);

  // Pagination logic
  const totalPages = Math.ceil(filteredAndSortedCaptions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedCaptions = filteredAndSortedCaptions.slice(
    startIndex,
    endIndex
  );

  // Reset to first page when filters change
  const resetPagination = () => {
    setCurrentPage(1);
  };

  // Update pagination when filters change
  useMemo(() => {
    resetPagination();
  }, [searchQuery, selectedPlatform, selectedStyle, sortBy]);

  const handleCopyCaption = async (captionText: string) => {
    try {
      await navigator.clipboard.writeText(captionText);
      addToast({
        type: "success",
        title: "Caption copied! 📋",
        description: "Ready to paste and share",
      });
    } catch (error) {
      addToast({
        type: "error",
        title: "Copy failed",
        description: "Please try again",
      });
    }
  };

  const handleSelectCaption = (captionId: number) => {
    setSelectedCaptions((prev) =>
      prev.includes(captionId)
        ? prev.filter((id) => id !== captionId)
        : [...prev, captionId]
    );
  };

  const handleSelectAll = () => {
    if (selectedCaptions.length === filteredAndSortedCaptions.length) {
      setSelectedCaptions([]);
    } else {
      setSelectedCaptions(
        filteredAndSortedCaptions.map((caption) => caption.id)
      );
    }
  };

  const handleBulkAction = (action: string) => {
    if (selectedCaptions.length === 0) {
      addToast({
        type: "error",
        title: "No captions selected",
        description: "Please select captions first",
      });
      return;
    }

    addToast({
      type: "success",
      title: `${action} completed`,
      description: `${
        selectedCaptions.length
      } captions ${action.toLowerCase()}ed`,
    });
    setSelectedCaptions([]);
  };

  return (
    <div className="min-h-screen bg-section">
      {/* Header */}
      <Card
        variant="outlined"
        padding="none"
        className="border-0 border-b border-border rounded-none bg-section"
      >
        <CardHeader padding="lg">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex flex-col items-center gap-2">
              <Link href="/dashboard">
                <Button
                  variant="ghost"
                  size="sm"
                  leftIcon={<ArrowLeft className="w-4 h-4" />}
                  className="text-text-body hover:text-primary"
                >
                  Back to Dashboard
                </Button>
              </Link>
              <div className="space-y-1">
                <h1 className="text-xl sm:text-2xl font-semibold text-primary tracking-tight">
                  All Captions
                </h1>
                <p className="text-sm font-medium text-text-body">
                  {filteredAndSortedCaptions.length} captions found
                  {totalPages > 1 && ` • Page ${currentPage} of ${totalPages}`}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {/* View Mode Toggle */}
              <div className="flex items-center gap-1 bg-surface rounded-lg p-1">
                <Button
                  variant={viewMode === "grid" ? "primary" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  leftIcon={<Grid className="w-4 h-4" />}
                  className="h-8 px-3"
                >
                  Grid
                </Button>
                <Button
                  variant={viewMode === "list" ? "primary" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  leftIcon={<List className="w-4 h-4" />}
                  className="h-8 px-3"
                >
                  List
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Filters and Search */}
      <div className="px-6 py-6">
        <Card className="mb-6">
          <CardContent padding="lg">
            <div className="space-y-6">
              {/* Search Section */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-primary flex items-center gap-2">
                  <Search className="w-4 h-4 text-accent" />
                  Search Captions
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-hint" />
                  <Input
                    placeholder="Search by content, style, or platform..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className=" h-12 text-sm"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-hint hover:text-primary transition-colors"
                    >
                      ✕
                    </button>
                  )}
                </div>
                {searchQuery && (
                  <p className="text-xs text-text-body">
                    Searching for:{" "}
                    <span className="font-medium text-primary">
                      "{searchQuery}"
                    </span>
                  </p>
                )}
              </div>

              {/* Filters Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-semibold text-primary flex items-center gap-2">
                    <Filter className="w-4 h-4 text-accent" />
                    Filters
                  </label>
                  <div className="flex items-center gap-2">
                    {(selectedPlatform !== "All" ||
                      selectedStyle !== "All" ||
                      sortBy !== "newest") && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedPlatform("All");
                          setSelectedStyle("All");
                          setSortBy("newest");
                        }}
                        className="text-xs text-hint hover:text-primary"
                      >
                        Clear all filters
                      </Button>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Platform Filter */}
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-text-body uppercase tracking-wide">
                      Platform
                    </label>
                    <Select
                      value={selectedPlatform}
                      onValueChange={setSelectedPlatform}
                    >
                      <SelectTrigger className="h-11">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {platforms.map((platform) => (
                          <SelectItem key={platform} value={platform}>
                            <div className="flex items-center gap-2">
                              {platform !== "All" && getPlatformIcon(platform)}
                              <span>
                                {platform === "All"
                                  ? "All Platforms"
                                  : platform.charAt(0).toUpperCase() +
                                    platform.slice(1)}
                              </span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Style Filter */}
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-text-body uppercase tracking-wide">
                      Style
                    </label>
                    <Select
                      value={selectedStyle}
                      onValueChange={setSelectedStyle}
                    >
                      <SelectTrigger className="h-11">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {styles.map((style) => (
                          <SelectItem key={style} value={style}>
                            <div className="flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-accent/60"></span>
                              <span>
                                {style === "All" ? "All Styles" : style}
                              </span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Sort Filter */}
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-text-body uppercase tracking-wide">
                      Sort by
                    </label>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="h-11">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {sortOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            <div className="flex items-center gap-2">
                              {option.value === "newest" && (
                                <SortDesc className="w-3 h-3" />
                              )}
                              {option.value === "oldest" && (
                                <SortAsc className="w-3 h-3" />
                              )}
                              {option.value === "engagement" && (
                                <TrendingUp className="w-3 h-3" />
                              )}
                              {option.value === "platform" && (
                                <Grid className="w-3 h-3" />
                              )}
                              <span>{option.label}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Active Filters Display */}
                {(selectedPlatform !== "All" ||
                  selectedStyle !== "All" ||
                  sortBy !== "newest") && (
                  <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-border">
                    <span className="text-xs font-medium text-text-body">
                      Active filters:
                    </span>
                    {selectedPlatform !== "All" && (
                      <div className="inline-flex items-center gap-1 px-2 py-1 bg-accent/10 text-accent text-xs font-medium rounded-md">
                        {getPlatformIcon(selectedPlatform)}
                        <span className="capitalize">{selectedPlatform}</span>
                        <button
                          onClick={() => setSelectedPlatform("All")}
                          className="ml-1 hover:text-accent-hover"
                        >
                          ✕
                        </button>
                      </div>
                    )}
                    {selectedStyle !== "All" && (
                      <div className="inline-flex items-center gap-1 px-2 py-1 bg-accent/10 text-accent text-xs font-medium rounded-md">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                        <span>{selectedStyle}</span>
                        <button
                          onClick={() => setSelectedStyle("All")}
                          className="ml-1 hover:text-accent-hover"
                        >
                          ✕
                        </button>
                      </div>
                    )}
                    {sortBy !== "newest" && (
                      <div className="inline-flex items-center gap-1 px-2 py-1 bg-accent/10 text-accent text-xs font-medium rounded-md">
                        <span>
                          {
                            sortOptions.find((opt) => opt.value === sortBy)
                              ?.label
                          }
                        </span>
                        <button
                          onClick={() => setSortBy("newest")}
                          className="ml-1 hover:text-accent-hover"
                        >
                          ✕
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bulk Actions */}
        {selectedCaptions.length > 0 && (
          <Card className="mb-6 bg-linear-to-r from-accent/10 via-accent/5 to-accent/10 border-accent/30 shadow-lg">
            <CardContent padding="lg">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center">
                      <span className="text-accent font-bold text-sm">
                        {selectedCaptions.length}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-primary">
                        {selectedCaptions.length} caption
                        {selectedCaptions.length !== 1 ? "s" : ""} selected
                      </h3>
                      <p className="text-xs text-text-body">
                        Choose an action to perform on selected items
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleSelectAll}
                    className="text-accent hover:text-accent-hover hover:bg-accent/10 transition-colors"
                  >
                    {selectedCaptions.length ===
                    filteredAndSortedCaptions.length
                      ? "Deselect All"
                      : "Select All"}
                  </Button>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    leftIcon={<Copy className="w-4 h-4" />}
                    onClick={() => handleBulkAction("Copy")}
                    className="border-accent/30 text-accent hover:bg-accent/10 hover:border-accent/50 transition-all"
                  >
                    Copy All
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    leftIcon={<Download className="w-4 h-4" />}
                    onClick={() => handleBulkAction("Export")}
                    className="border-accent/30 text-accent hover:bg-accent/10 hover:border-accent/50 transition-all"
                  >
                    Export
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    leftIcon={<Trash2 className="w-4 h-4" />}
                    onClick={() => handleBulkAction("Delete")}
                    className="border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 transition-all"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Captions Grid/List */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedCaptions.map((caption) => (
              <Card
                key={caption.id}
                variant="outlined"
                className={`cursor-pointer group overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 ${
                  selectedCaptions.includes(caption.id)
                    ? "ring-2 ring-accent"
                    : ""
                }`}
                onMouseEnter={() => setHoveredCard(caption.id)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => handleSelectCaption(caption.id)}
              >
                <CardContent
                  padding="none"
                  className={`transition-all duration-200`}
                >
                  <div
                    className={` space-y-4 ${
                      hoveredCard === caption.id ? "" : "-mb-3"
                    }`}
                  >
                    {/* Platform Badge and Date */}
                    <div className="flex items-center justify-between">
                      <div
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border ${getPlatformColor(
                          caption.platform
                        )}`}
                      >
                        {getPlatformIcon(caption.platform)}
                        <span className="capitalize">{caption.platform}</span>
                      </div>
                      <span className="text-xs text-hint font-medium">
                        {caption.date}
                      </span>
                    </div>

                    {/* Caption Preview */}
                    <div className="space-y-3">
                      <p className="text-sm text-text-body line-clamp-3 leading-relaxed">
                        {caption.snippet}
                      </p>

                      {/* Style Tag */}
                      <div>
                        <span className="inline-block px-3 py-1.5 bg-surface text-text-body text-xs font-medium rounded-lg border border-border">
                          {caption.style}
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons - Show on Hover with Height Animation */}
                    <div
                      className={`transition-all duration-200 overflow-hidden ${
                        hoveredCard === caption.id
                          ? "opacity-100 max-h-12 translate-y-0"
                          : "opacity-0 max-h-0 -translate-y-2"
                      }`}
                    >
                      <div className="flex items-center gap-2 pt-2">
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCopyCaption(caption.fullText);
                          }}
                          variant="primary"
                          size="sm"
                          leftIcon={<Copy className="w-3.5 h-3.5" />}
                          className="flex-1 text-xs font-semibold"
                        >
                          Copy
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-9 w-9 p-0 flex items-center justify-center overflow-hidden transition-all duration-200 hover:w-auto hover:px-3 hover:justify-start [&:hover_.rotate-label]:block"
                          title="Regenerate caption"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <RotateCcw className="w-4 h-4 shrink-0" />
                          <span className="rotate-label ml-2 text-sm font-medium hidden whitespace-nowrap">
                            Regenerate
                          </span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-9 w-9 p-0 flex items-center justify-center overflow-hidden transition-all duration-200 hover:w-auto hover:px-3 hover:justify-start [&:hover_.bookmark-label]:block"
                          title="Save to library"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Bookmark className="w-4 h-4 shrink-0" />
                          <span className="bookmark-label ml-2 text-sm font-medium hidden whitespace-nowrap">
                            Save
                          </span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {paginatedCaptions.map((caption) => (
              <Card
                key={caption.id}
                variant="outlined"
                className={`cursor-pointer hover:shadow-lg transition-all duration-200 ${
                  selectedCaptions.includes(caption.id)
                    ? "ring-2 ring-accent"
                    : ""
                }`}
                onClick={() => handleSelectCaption(caption.id)}
              >
                <CardContent padding="lg">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center gap-3">
                        <div
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border ${getPlatformColor(
                            caption.platform
                          )}`}
                        >
                          {getPlatformIcon(caption.platform)}
                          <span className="capitalize">{caption.platform}</span>
                        </div>
                        <span className="inline-block px-3 py-1.5 bg-surface text-text-body text-xs font-medium rounded-lg border border-border">
                          {caption.style}
                        </span>
                        <div className="flex items-center gap-1 text-xs text-green-600">
                          <span>↑</span>
                          <span>{caption.engagement}%</span>
                        </div>
                      </div>
                      <p className="text-sm text-text-body leading-relaxed">
                        {caption.fullText}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-hint">
                        <Calendar className="w-3 h-3" />
                        <span>{caption.date}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopyCaption(caption.fullText);
                        }}
                        variant="primary"
                        size="sm"
                        leftIcon={<Copy className="w-3.5 h-3.5" />}
                      >
                        Copy
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-9 w-9 p-0 flex items-center justify-center"
                        title="More options"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <Card className="mt-6">
            <CardContent padding="lg">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <span className="text-sm text-text-body">
                    Showing {startIndex + 1}-
                    {Math.min(endIndex, filteredAndSortedCaptions.length)} of{" "}
                    {filteredAndSortedCaptions.length} captions
                  </span>
                  <Select
                    value={itemsPerPage.toString()}
                    onValueChange={(value) => {
                      setItemsPerPage(parseInt(value));
                      setCurrentPage(1);
                    }}
                  >
                    <SelectTrigger placeholder="Items per page">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="6">6 per page</SelectItem>
                      <SelectItem value="12">12 per page</SelectItem>
                      <SelectItem value="24">24 per page</SelectItem>
                      <SelectItem value="48">48 per page</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    leftIcon={<ChevronLeft className="w-4 h-4" />}
                  >
                    Previous
                  </Button>

                  <div className="flex items-center gap-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum: number;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }

                      return (
                        <Button
                          key={pageNum}
                          variant={
                            currentPage === pageNum ? "primary" : "outline"
                          }
                          size="sm"
                          onClick={() => setCurrentPage(pageNum)}
                          className="w-10 h-10 p-0"
                        >
                          {pageNum}
                        </Button>
                      );
                    })}
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setCurrentPage(Math.min(totalPages, currentPage + 1))
                    }
                    disabled={currentPage === totalPages}
                    rightIcon={<ChevronRight className="w-4 h-4" />}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Empty State */}
        {filteredAndSortedCaptions.length === 0 && (
          <Card>
            <CardContent padding="lg" className="text-center py-12">
              <div className="space-y-4">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-primary">
                    No captions found
                  </h3>
                  <p className="text-text-body">
                    Try adjusting your search or filter criteria
                  </p>
                </div>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedPlatform("All");
                    setSelectedStyle("All");
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

export default function RecentCaptionsPage() {
  return (
    <ToastProvider>
      <RecentCaptionsContent />
    </ToastProvider>
  );
}
