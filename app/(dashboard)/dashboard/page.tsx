"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Sparkles,
  Plus,
  Copy,
  Check,
  RotateCcw,
  Bookmark,
  BookmarkCheck,
  TrendingUp,
  Clock,
  Zap,
  Crown,
  History,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Button } from "../../../components/ui/Button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../../components/ui/Card";
import { Badge } from "../../../components/ui/Badge";

// Mock data - in real app this would come from API/hooks
const mockUser = {
  name: "Sarah",
  captionsCreated: 4,
  captionsRemaining: 6,
  totalCredits: 10,
  avgEngagement: 4.2,
  engagementChange: 12,
  timeSaved: 2.5,
};

function DashboardContent() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [savedCaptions, setSavedCaptions] = useState<Set<number>>(new Set());
  const [expandedCaptions, setExpandedCaptions] = useState<Set<number>>(
    new Set()
  );
  const [recentCaptions, setRecentCaptions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch recent captions
  useEffect(() => {
    const fetchCaptions = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/captions/recent?limit=6");
        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            setRecentCaptions(data.captions);
          }
        }
      } catch (error) {
        console.error("Error fetching captions:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCaptions();
  }, []);

  const handleCopyCaption = async (captionText: string, index: number) => {
    try {
      await navigator.clipboard.writeText(captionText);
      setCopiedIndex(index);
      // Reset the copied state after 2 seconds
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (error) {
      console.error("Failed to copy caption:", error);
    }
  };

  const handleSaveCaption = (index: number) => {
    setSavedCaptions((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  const toggleCaptionExpansion = (index: number) => {
    setExpandedCaptions((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  // Helper function to determine if content needs truncation
  // Using the same logic as CaptionResults.tsx for consistency
  const needsTruncation = (content: string) => {
    return content.length > 120;
  };

  const progressPercentage =
    (mockUser.captionsCreated / mockUser.totalCredits) * 100;

  return (
    <div className="min-h-screen bg-section">
      {/* Header */}
      <Card
        variant="outlined"
        padding="none"
        className="border-0 border-b border-border rounded-none bg-section pt-12 sm:pt-0"
      >
        <CardHeader padding="lg">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="space-y-1">
              <h1 className="text-xl sm:text-2xl font-semibold text-primary tracking-tight flex items-center gap-2">
                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
                Hey {mockUser.name}, ready to create? 👋
              </h1>
              <p className="text-sm font-medium text-text-body">
                Generate engaging captions that match your unique voice
              </p>
            </div>
            <div className="shrink-0">
              <Link href="/generate">
                <Button
                  variant="primary"
                  size="lg"
                  leftIcon={<Plus className="w-5 h-5" />}
                  className="shadow-sm w-full sm:w-auto"
                >
                  New Caption
                </Button>
              </Link>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Dashboard Content */}
      <div className="px-6 py-6">
        {/* Quick Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card
            variant="outlined"
            className="hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 "
          >
            <CardContent padding="none">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-primary">
                      Captions Created
                    </h3>
                    <p className="text-xs text-hint">This month</p>
                  </div>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-primary">
                    {mockUser.captionsCreated}
                  </span>
                  <span className="text-sm text-hint">
                    of {mockUser.totalCredits}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card
            variant="outlined"
            className="hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 "
          >
            <CardContent padding="none">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-primary">
                      Avg. Engagement
                    </h3>
                    <p className="text-xs text-hint">Performance</p>
                  </div>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-primary">
                    {mockUser.avgEngagement}%
                  </span>
                  <span className="text-sm text-green-600 font-semibold">
                    +{mockUser.engagementChange}%
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card
            variant="outlined"
            className="hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 "
          >
            <CardContent padding="none">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Clock className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-primary">
                      Time Saved
                    </h3>
                    <p className="text-xs text-hint">This month</p>
                  </div>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-primary">
                    {mockUser.timeSaved}
                  </span>
                  <span className="text-sm text-hint">hours</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Captions Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="space-y-1">
              <h2 className="text-lg font-semibold text-primary tracking-tight flex items-center gap-2">
                <History className="w-5 h-5 text-accent" />
                Recent Captions
              </h2>
              <p className="text-sm text-text-body">
                Your latest caption creations
              </p>
            </div>
          </div>

          {/* Caption Cards Grid */}
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent mx-auto mb-4"></div>
                <p className="text-sm text-text-body">
                  Loading your captions...
                </p>
              </div>
            </div>
          ) : recentCaptions.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-text-body mb-4">
                You haven't created any captions yet.
              </p>
              <Link href="/generate">
                <Button variant="primary" size="lg">
                  Create Your First Caption
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentCaptions.map((caption, index) => (
                <Card
                  key={caption.id}
                  variant="outlined"
                  className="cursor-pointer group overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                  onMouseEnter={() => setHoveredCard(caption.id)}
                  onMouseLeave={() => setHoveredCard(null)}
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
                        <Badge
                          variant="platform"
                          platform={caption.platform as any}
                          size="md"
                        />
                        <span className="text-xs text-hint font-medium">
                          {caption.date}
                        </span>
                      </div>

                      {/* Caption Preview */}
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-text-body leading-relaxed">
                            {expandedCaptions.has(index)
                              ? caption.fullText
                              : caption.fullText.substring(0, 120) +
                                (caption.fullText.length > 120 ? "..." : "")}
                          </p>
                          {needsTruncation(caption.fullText) && (
                            <button
                              onClick={() => toggleCaptionExpansion(index)}
                              className="text-xs text-accent hover:text-accent-hover font-medium mt-1 flex items-center gap-1"
                            >
                              {expandedCaptions.has(index) ? (
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

                        {/* Style Tag */}
                        <div>
                          <Badge variant="style" size="md">
                            {caption.style}
                          </Badge>
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
                            onClick={() =>
                              handleCopyCaption(caption.fullText, index)
                            }
                            variant="primary"
                            size="md"
                            leftIcon={
                              copiedIndex === index ? (
                                <Check className="w-3.5 h-3.5" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )
                            }
                            className="flex-1 text-xs font-semibold"
                          >
                            {copiedIndex === index ? "Copied!" : "Copy"}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-9 w-9 p-0 flex items-center justify-center overflow-hidden transition-all duration-200 hover:w-auto hover:px-3 hover:justify-start [&:hover_.rotate-label]:block border border-border"
                            title="Regenerate caption"
                          >
                            <RotateCcw className="w-4 h-4 shrink-0" />
                            <span className="rotate-label ml-2 text-sm font-medium hidden whitespace-nowrap">
                              Regenerate
                            </span>
                          </Button>
                          <Button
                            onClick={() => handleSaveCaption(index)}
                            variant="ghost"
                            size="sm"
                            className="h-9 w-9 p-0 flex items-center justify-center overflow-hidden transition-all duration-200 hover:w-auto hover:px-3 hover:justify-start [&:hover_.bookmark-label]:block border border-border"
                            title={
                              savedCaptions.has(index)
                                ? "Remove from library"
                                : "Save to library"
                            }
                          >
                            {savedCaptions.has(index) ? (
                              <BookmarkCheck className="w-4 h-4 shrink-0" />
                            ) : (
                              <Bookmark className="w-4 h-4 shrink-0" />
                            )}
                            <span className="bookmark-label ml-2 text-sm font-medium hidden whitespace-nowrap">
                              {savedCaptions.has(index) ? "Unsave" : "Save"}
                            </span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Upgrade Prompt */}
        <Card className="bg-linear-to-r from-accent to-accent/80 border-accent/20 overflow-hidden">
          <CardContent padding="lg">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Crown className="w-5 h-5 text-white" />
                  <h3 className="text-base sm:text-lg font-semibold text-white tracking-tight">
                    Ready to unlock unlimited captions?
                  </h3>
                </div>
                <p className="text-white/90 text-sm font-medium">
                  Get 10 variations per generation, advanced voice cloning, and
                  detailed analytics
                </p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <Link href="/pricing">
                  <Button
                    variant="outline"
                    size="lg"
                    className="bg-white hover:bg-gray-50 text-accent border-white font-semibold shadow-lg transition-all duration-200 hover:shadow-xl w-full sm:w-auto"
                  >
                    Upgrade to Pro
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return <DashboardContent />;
}
