"use client";

import { useState } from "react";
import Link from "next/link";
import {
  BarChart3,
  TrendingUp,
  Sparkles,
  Clock,
  Bookmark,
  Target,
  Plus,
  ArrowUp,
  ArrowDown,
  Calendar,
  PieChart,
  Zap,
} from "lucide-react";
import { Button } from "../../../components/ui/Button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../../components/ui/Card";
import { useAnalytics } from "../../../hooks";
import { StatCardSkeleton } from "../../../components/ui/Skeleton";

// Platform icons/colors mapping
const platformConfig: Record<
  string,
  { color: string; bgColor: string; label: string }
> = {
  instagram: {
    color: "text-pink-600",
    bgColor: "bg-pink-100",
    label: "Instagram",
  },
  linkedin: {
    color: "text-blue-600",
    bgColor: "bg-blue-100",
    label: "LinkedIn",
  },
  twitter: {
    color: "text-sky-500",
    bgColor: "bg-sky-100",
    label: "Twitter/X",
  },
  facebook: {
    color: "text-blue-700",
    bgColor: "bg-blue-100",
    label: "Facebook",
  },
  tiktok: { color: "text-black", bgColor: "bg-gray-100", label: "TikTok" },
};

// Style colors mapping
const styleConfig: Record<string, { color: string; bgColor: string }> = {
  casual: { color: "text-green-600", bgColor: "bg-green-100" },
  professional: { color: "text-blue-600", bgColor: "bg-blue-100" },
  playful: { color: "text-purple-600", bgColor: "bg-purple-100" },
  inspirational: { color: "text-orange-600", bgColor: "bg-orange-100" },
  educational: { color: "text-indigo-600", bgColor: "bg-indigo-100" },
  promotional: { color: "text-red-600", bgColor: "bg-red-100" },
};

function AnalyticsContent() {
  const { analytics, isLoading, error } = useAnalytics();

  if (error) {
    return (
      <div className="min-h-screen bg-section flex items-center justify-center">
        <Card variant="outlined" className="max-w-md">
          <CardContent>
            <p className="text-text-body text-center">
              Failed to load analytics. Please try again.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Calculate max value for chart scaling
  const maxDayCount = analytics
    ? Math.max(...analytics.activity.byDay.map((d) => d.count), 1)
    : 1;

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
                <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
                Analytics
              </h1>
              <p className="text-sm font-medium text-text-body">
                Track your content performance and insights
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

      {/* Main Content */}
      <div className="px-6 py-6 space-y-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading ? (
            <>
              <StatCardSkeleton />
              <StatCardSkeleton />
              <StatCardSkeleton />
              <StatCardSkeleton />
            </>
          ) : (
            <>
              {/* Total Captions */}
              <Card
                variant="outlined"
                className="hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
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
                        {analytics?.overview.totalCaptions || 0}
                      </span>
                      {analytics &&
                        analytics.activity.growthPercentage !== 0 && (
                          <span
                            className={`text-sm flex items-center gap-1 ${
                              analytics.activity.growthPercentage > 0
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {analytics.activity.growthPercentage > 0 ? (
                              <ArrowUp className="w-3 h-3" />
                            ) : (
                              <ArrowDown className="w-3 h-3" />
                            )}
                            {Math.abs(analytics.activity.growthPercentage)}%
                          </span>
                        )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Time Saved */}
              <Card
                variant="outlined"
                className="hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
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
                        <p className="text-xs text-hint">~15 min per caption</p>
                      </div>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-primary">
                        {analytics?.overview.timeSavedHours || 0}
                      </span>
                      <span className="text-sm text-hint">hours</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Saved Captions */}
              <Card
                variant="outlined"
                className="hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >
                <CardContent padding="none">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                        <Bookmark className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-primary">
                          Saved Captions
                        </h3>
                        <p className="text-xs text-hint">Your favorites</p>
                      </div>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-primary">
                        {analytics?.overview.savedCaptions || 0}
                      </span>
                      <span className="text-sm text-hint">
                        ({analytics?.overview.saveRate || 0}% rate)
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Generations Used - only show for users with limits */}
              {analytics?.overview.generationsLimit !== -1 ? (
                <Card
                  variant="outlined"
                  className="hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                >
                  <CardContent padding="none">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                          <Zap className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold text-primary">
                            Generations Left
                          </h3>
                          <p className="text-xs text-hint">This period</p>
                        </div>
                      </div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold text-primary">
                          {Math.max(
                            0,
                            (analytics?.overview.generationsLimit || 0) -
                              (analytics?.overview.generationsUsed || 0)
                          )}
                        </span>
                        <span className="text-sm text-hint">
                          / {analytics?.overview.generationsLimit}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card
                  variant="outlined"
                  className="hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                >
                  <CardContent padding="none">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                          <TrendingUp className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold text-primary">
                            Recent Activity
                          </h3>
                          <p className="text-xs text-hint">Last 7 days</p>
                        </div>
                      </div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold text-primary">
                          {analytics?.activity.last7Days || 0}
                        </span>
                        <span className="text-sm text-hint">captions</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </>
          )}
        </div>

        {/* Activity Chart & Platform Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Activity Over Time */}
          <Card variant="outlined" className="lg:col-span-2" padding="sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-accent" />
                    Activity Trend
                  </CardTitle>
                  <p className="text-xs text-hint">
                    Last 7 days • {analytics?.activity.last7Days || 0} captions
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-4">
                  {/* Skeleton Chart */}
                  <div className="flex items-end justify-between gap-2 h-40">
                    {[...Array(7)].map((_, index) => {
                      // Random heights for visual variety
                      const heights = [60, 40, 80, 50, 70, 45, 65];
                      return (
                        <div
                          key={index}
                          className="flex-1 flex flex-col items-center gap-2"
                        >
                          <div className="w-full flex flex-col justify-end h-32">
                            <div
                              className="w-full bg-section rounded-t-lg animate-pulse"
                              style={{
                                height: `${heights[index]}%`,
                              }}
                            />
                          </div>
                          <div className="w-12 h-3 bg-section rounded animate-pulse" />
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : analytics && analytics.activity.byDay.length > 0 ? (
                <div className="space-y-4">
                  {/* Bar Chart */}
                  <div className="flex items-end justify-between gap-2 h-40">
                    {analytics.activity.byDay.map((day, index) => {
                      const heightPercent =
                        maxDayCount > 0 ? (day.count / maxDayCount) * 100 : 0;
                      return (
                        <div
                          key={index}
                          className="flex-1 flex flex-col items-center gap-2"
                        >
                          <div className="w-full flex flex-col justify-end h-32">
                            <div
                              className="w-full bg-accent/20 hover:bg-accent/30 transition-colors rounded-t-lg relative group"
                              style={{
                                height: `${Math.max(heightPercent, 5)}%`,
                              }}
                            >
                              {day.count > 0 && (
                                <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                                  {day.count}
                                </div>
                              )}
                            </div>
                          </div>
                          <span className="text-xs text-hint">{day.date}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="h-48 flex flex-col items-center justify-center text-center">
                  <Calendar className="w-12 h-12 text-hint mb-3" />
                  <p className="text-text-body mb-2">No activity yet</p>
                  <p className="text-sm text-hint mb-4">
                    Start generating captions to see your activity trend
                  </p>
                  <Link href="/generate">
                    <Button variant="primary" size="sm">
                      Generate Caption
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Platform Distribution */}
          <Card variant="outlined" padding="sm">
            <CardHeader>
              <div className="space-y-1">
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-accent" />
                  Platforms
                </CardTitle>
                <p className="text-xs text-hint">Where you create content</p>
              </div>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-3">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="h-8 bg-section rounded animate-pulse"
                    />
                  ))}
                </div>
              ) : analytics && Object.keys(analytics.platforms).length > 0 ? (
                <div className="space-y-3">
                  {Object.entries(analytics.platforms)
                    .sort(([, a], [, b]) => b - a)
                    .slice(0, 5)
                    .map(([platform, count]) => {
                      const config =
                        platformConfig[platform] || platformConfig.instagram;
                      const percentage = analytics.overview.totalCaptions
                        ? Math.round(
                            (count / analytics.overview.totalCaptions) * 100
                          )
                        : 0;

                      return (
                        <div key={platform} className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2">
                              <div
                                className={`w-2 h-2 rounded-full ${config.bgColor}`}
                              />
                              <span className="text-primary font-medium capitalize">
                                {config.label}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-hint">{count}</span>
                              <span className="text-xs text-hint">
                                ({percentage}%)
                              </span>
                            </div>
                          </div>
                          <div className="w-full h-2 bg-section rounded-full overflow-hidden">
                            <div
                              className={`h-full ${config.bgColor} transition-all duration-500`}
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                </div>
              ) : (
                <div className="text-center py-8">
                  <PieChart className="w-12 h-12 text-hint mx-auto mb-3" />
                  <p className="text-sm text-hint">No platform data yet</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Style Breakdown */}
        <Card variant="outlined" padding="sm">
          <CardHeader>
            <div className="space-y-1">
              <CardTitle className="flex items-center gap-2">
                <PieChart className="w-5 h-5 text-accent" />
                Style Breakdown
              </CardTitle>
              <p className="text-xs text-hint">Your most used content styles</p>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="h-20 bg-section rounded animate-pulse"
                  />
                ))}
              </div>
            ) : analytics && Object.keys(analytics.styles).length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {Object.entries(analytics.styles)
                  .sort(([, a], [, b]) => b - a)
                  .map(([style, count]) => {
                    const config = styleConfig[style] || styleConfig.casual;
                    const percentage = analytics.overview.totalCaptions
                      ? Math.round(
                          (count / analytics.overview.totalCaptions) * 100
                        )
                      : 0;

                    return (
                      <div
                        key={style}
                        className="p-4 border border-border rounded-xl hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
                      >
                        <div className="space-y-2">
                          <div
                            className={`w-10 h-10 ${config.bgColor} rounded-lg flex items-center justify-center mb-2`}
                          >
                            <span className={`text-lg ${config.color}`}>
                              {style.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <h4 className="text-sm font-semibold text-primary capitalize">
                            {style}
                          </h4>
                          <div className="flex items-baseline gap-1">
                            <span className="text-xl font-bold text-primary">
                              {count}
                            </span>
                            <span className="text-xs text-hint">
                              ({percentage}%)
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            ) : (
              <div className="text-center py-12">
                <Sparkles className="w-12 h-12 text-hint mx-auto mb-3" />
                <p className="text-text-body mb-2">No style data yet</p>
                <p className="text-sm text-hint mb-4">
                  Generate captions to see your style preferences
                </p>
                <Link href="/generate">
                  <Button variant="primary" size="sm">
                    Get Started
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function AnalyticsPage() {
  return <AnalyticsContent />;
}
