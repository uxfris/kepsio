"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  Plus,
  Copy,
  RotateCcw,
  Bookmark,
  TrendingUp,
  Clock,
  Zap,
  Crown,
  History,
} from "lucide-react";
import { SocialIcon } from "react-social-icons";
import { Button } from "../../../components/ui/Button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../../components/ui/Card";
import { ToastProvider, useToast } from "../../../components/ui/Toast";

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

const recentCaptions = [
  {
    id: 1,
    snippet: "Exciting news! 🎉 We're launching something special next week...",
    fullText:
      "Exciting news! 🎉 We're launching something special next week that's going to change how you create content. Can you guess what it is? Drop your guesses below! 👇",
    date: "2 hours ago",
    platform: "instagram",
    style: "Teaser",
  },
  {
    id: 2,
    snippet: "Behind the scenes of building a product people actually want...",
    fullText:
      "Behind the scenes of building a product people actually want: Talk to users early, ship fast, and don't be afraid to pivot. What's your #1 product lesson?",
    date: "Yesterday",
    platform: "linkedin",
    style: "Thought Leadership",
  },
  {
    id: 3,
    snippet: "Coffee first, creativity second ☕️ What's your morning ritual?",
    fullText:
      "Coffee first, creativity second ☕️ What's your morning ritual that helps you stay productive? Mine: 1. Coffee 2. Quick workout 3. Review goals. Let me know yours!",
    date: "2 days ago",
    platform: "instagram",
    style: "Engagement",
  },
  {
    id: 4,
    snippet: "Quick tip: Your audience doesn't want perfection...",
    fullText:
      "Quick tip: Your audience doesn't want perfection, they want authenticity. Show up as you are, share your process, and watch engagement soar. 📈",
    date: "3 days ago",
    platform: "x",
    style: "Educational",
  },
  {
    id: 5,
    snippet: "5 things I learned launching my first product...",
    fullText:
      "5 things I learned launching my first product: 1. Launch before you're ready 2. Listen more than you talk 3. Iterate based on feedback 4. Celebrate small wins 5. Community > marketing budget",
    date: "5 days ago",
    platform: "linkedin",
    style: "Listicle",
  },
  {
    id: 6,
    snippet: "That feeling when you finally solve a problem you've been...",
    fullText:
      "That feeling when you finally solve a problem you've been stuck on for days... 🎯 What's your latest win? Celebrate with me in the comments!",
    date: "1 week ago",
    platform: "instagram",
    style: "Relatable",
  },
];

function DashboardContent() {
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
    return "bg-gray-100 text-gray-600 border-gray-200";
  };

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
            <Link href="/library">
              <Button
                variant="ghost"
                size="sm"
                className="text-accent hover:text-accent-hover"
              >
                View all →
              </Button>
            </Link>
          </div>

          {/* Caption Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentCaptions.map((caption) => (
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
                          onClick={() => handleCopyCaption(caption.fullText)}
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
                <Link href="/settings/billing">
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
  return (
    <ToastProvider>
      <DashboardContent />
    </ToastProvider>
  );
}
