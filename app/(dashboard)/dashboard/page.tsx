"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Sparkles,
  Plus,
  RotateCcw,
  Bookmark,
  BookmarkCheck,
  Clock,
  Crown,
  History,
} from "lucide-react";
import { Button } from "../../../components/ui/Button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../../components/ui/Card";
import { CaptionCard } from "../../../components/captions/CaptionCard";
import {
  CaptionCardSkeleton,
  StatCardSkeleton,
} from "../../../components/ui/Skeleton";
import { dataCache, CACHE_KEYS, CACHE_TTL } from "../../../lib/utils/cache";
import { useUserUsage } from "../../../hooks/use-user-usage";
import { useSubscription } from "../../../hooks/use-subscription";
import { createClient } from "../../../lib/supabase/client";

function DashboardContent() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [recentCaptions, setRecentCaptions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [savingCaptionId, setSavingCaptionId] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>("there");
  const [totalCaptions, setTotalCaptions] = useState(0);
  const [savedCaptions, setSavedCaptions] = useState(0);
  const [timeSavedHours, setTimeSavedHours] = useState(0);
  const [statsLoading, setStatsLoading] = useState(true);

  // Fetch real user data
  const { usage, isLoading: usageLoading } = useUserUsage();
  const { subscription, isLoading: subscriptionLoading } = useSubscription();

  // Get user's first name from Supabase
  useEffect(() => {
    const fetchUserName = async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        // Try to get name from user metadata or email
        const fullName =
          user.user_metadata?.full_name || user.user_metadata?.name;
        if (fullName) {
          // Extract first name
          const firstName = fullName.split(" ")[0];
          setUserName(firstName);
        } else if (user.email) {
          // Use part of email as fallback
          const emailName = user.email.split("@")[0];
          setUserName(emailName.charAt(0).toUpperCase() + emailName.slice(1));
        }
      }
    };

    fetchUserName();
  }, []);

  // Fetch dashboard stats
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/analytics");
        if (response.ok) {
          const data = await response.json();
          if (data.success && data.analytics?.overview) {
            setTotalCaptions(data.analytics.overview.totalCaptions || 0);
            setSavedCaptions(data.analytics.overview.savedCaptions || 0);
            setTimeSavedHours(data.analytics.overview.timeSavedHours || 0);
          }
        }
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setStatsLoading(false);
      }
    };

    fetchStats();
  }, []);

  // Calculate contextual stats
  const captionsCreated = usage?.captionsUsed || 0;
  const captionsLimit = usage?.captionsLimit || 10;

  // Fetch recent captions with caching
  const fetchCaptions = async (forceRefresh = false) => {
    try {
      // Check cache first (skip if force refresh)
      if (!forceRefresh) {
        const cachedData = dataCache.get<any[]>(
          CACHE_KEYS.RECENT_CAPTIONS,
          CACHE_TTL.SHORT
        );

        if (cachedData) {
          setRecentCaptions(cachedData);
          setIsLoading(false);
          return;
        }
      }

      setIsLoading(true);
      const response = await fetch("/api/captions/recent?limit=6");
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setRecentCaptions(data.captions);
          // Cache the data
          dataCache.set(CACHE_KEYS.RECENT_CAPTIONS, data.captions);
        }
      }
    } catch (error) {
      console.error("Error fetching captions:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchCaptions();
  }, []);

  // Refetch when page becomes visible (user navigates back)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        // Check if cache was invalidated while away
        const cachedData = dataCache.get<any[]>(
          CACHE_KEYS.RECENT_CAPTIONS,
          CACHE_TTL.SHORT
        );
        if (!cachedData) {
          // Cache was invalidated, refetch
          fetchCaptions(true);
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
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

  const handleSaveCaption = async (captionId: string) => {
    try {
      // Optimistic update - update UI immediately
      setRecentCaptions((prev) =>
        prev.map((caption) =>
          caption.id === captionId
            ? { ...caption, isSaved: !caption.isSaved }
            : caption
        )
      );

      // Then sync with server
      const response = await fetch("/api/captions/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ captionId }),
      });

      if (!response.ok) {
        // If server update fails, revert the optimistic update
        setRecentCaptions((prev) =>
          prev.map((caption) =>
            caption.id === captionId
              ? { ...caption, isSaved: !caption.isSaved }
              : caption
          )
        );
        throw new Error("Failed to save caption");
      } else {
        // Invalidate cache so next load fetches fresh data
        dataCache.invalidate(CACHE_KEYS.RECENT_CAPTIONS);
        dataCache.invalidate(CACHE_KEYS.SAVED_CAPTIONS);
      }
    } catch (error) {
      console.error("Failed to save caption:", error);
    }
  };

  const progressPercentage =
    captionsLimit > 0 ? (captionsCreated / captionsLimit) * 100 : 0;

  // Combined loading state for stats cards
  const cardsLoading =
    isLoading || usageLoading || subscriptionLoading || statsLoading;

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
                Hey {userName}, ready to create? 👋
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
          {cardsLoading ? (
            <>
              <StatCardSkeleton />
              <StatCardSkeleton />
              <StatCardSkeleton />
            </>
          ) : (
            <>
              {/* Pro/Enterprise: Show Total Captions Generated */}
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
                          Total Captions
                        </h3>
                        <p className="text-xs text-hint">All time</p>
                      </div>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-primary">
                        {totalCaptions}
                      </span>
                      <span className="text-sm text-hint">generated</span>
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
                        <p className="text-xs text-hint">All time</p>
                      </div>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-primary">
                        {timeSavedHours}
                      </span>
                      <span className="text-sm text-hint">hours</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              {/* Pro/Enterprise: Show Saved to Library */}
              <Card
                variant="outlined"
                className="hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 "
              >
                <CardContent padding="none">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                        <Bookmark className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-primary">
                          Saved to Library
                        </h3>
                        <p className="text-xs text-hint">Your favorites</p>
                      </div>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-primary">
                        {savedCaptions}
                      </span>
                      <span className="text-sm text-hint">captions</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <CaptionCardSkeleton key={i} />
              ))}
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
                <CaptionCard
                  key={caption.id}
                  id={caption.id}
                  caption={caption.fullText}
                  platform={caption.platform as any}
                  style={caption.style}
                  date={caption.date}
                  hoveredCard={hoveredCard}
                  onHoverChange={(id) => setHoveredCard(id as number | null)}
                  isCopied={copiedIndex === index}
                  onCopy={() => handleCopyCaption(caption.fullText, index)}
                  variant="grid"
                  actions={[
                    {
                      icon: <RotateCcw className="w-4 h-4 shrink-0" />,
                      label: "Regenerate",
                      onClick: () => {},
                      variant: "ghost",
                    },
                    {
                      icon: caption.isSaved ? (
                        <BookmarkCheck className="w-4 h-4 shrink-0 text-accent" />
                      ) : (
                        <Bookmark className="w-4 h-4 shrink-0" />
                      ),
                      label: caption.isSaved ? "Saved" : "Save",
                      onClick: () => handleSaveCaption(caption.id),
                      variant: "ghost",
                      className: caption.isSaved ? "text-accent" : "",
                    },
                  ]}
                />
              ))}
            </div>
          )}
        </div>

        {/* Upgrade Prompt */}
        {subscription?.plan === "free" && (
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
                    Get 10 variations per generation, advanced voice cloning,
                    and detailed analytics
                  </p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <Link href="/upgrade">
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
        )}
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return <DashboardContent />;
}
