"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  Plus,
  Copy,
  RotateCcw,
  Bookmark,
  TrendingUp,
  Clock,
  Instagram,
  Linkedin,
  Twitter,
  Zap,
  Crown,
} from "lucide-react";
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
    platform: "twitter",
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
        return <Instagram className="w-4 h-4" />;
      case "linkedin":
        return <Linkedin className="w-4 h-4" />;
      case "twitter":
        return <Twitter className="w-4 h-4" />;
      default:
        return <Instagram className="w-4 h-4" />;
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case "instagram":
        return "bg-pink-100 text-pink-600 border-pink-200";
      case "linkedin":
        return "bg-blue-100 text-blue-600 border-blue-200";
      case "twitter":
        return "bg-sky-100 text-sky-600 border-sky-200";
      default:
        return "bg-gray-100 text-gray-600 border-gray-200";
    }
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
      <div className="bg-surface border-b border-border">
        <div className="px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-display font-semibold text-primary mb-1">
                Hey {mockUser.name}, ready to create? 👋
              </h1>
              <p className="text-text-body">
                Generate engaging captions that match your unique voice
              </p>
            </div>
            <Link href="/generate">
              <Button
                variant="primary"
                size="lg"
                leftIcon={<Plus className="w-5 h-5" />}
                className="shadow-sm"
              >
                New Caption
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="px-6 py-8">
        {/* Quick Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card
            variant="outlined"
            className="hover:shadow-sm transition-shadow"
          >
            <CardContent padding="lg">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-accent" />
                </div>
                <span className="text-sm font-medium text-text-body">
                  Captions Created
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-display font-bold text-primary">
                  {mockUser.captionsCreated}
                </span>
                <span className="text-sm text-hint">this month</span>
              </div>
            </CardContent>
          </Card>

          <Card
            variant="outlined"
            className="hover:shadow-sm transition-shadow"
          >
            <CardContent padding="lg">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                </div>
                <span className="text-sm font-medium text-text-body">
                  Avg. Engagement
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-display font-bold text-primary">
                  {mockUser.avgEngagement}%
                </span>
                <span className="text-sm text-green-600 font-medium">
                  +{mockUser.engagementChange}%
                </span>
              </div>
            </CardContent>
          </Card>

          <Card
            variant="outlined"
            className="hover:shadow-sm transition-shadow"
          >
            <CardContent padding="lg">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-blue-600" />
                </div>
                <span className="text-sm font-medium text-text-body">
                  Time Saved
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-display font-bold text-primary">
                  {mockUser.timeSaved}
                </span>
                <span className="text-sm text-hint">hours</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Captions Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-display font-semibold text-primary">
              Recent Captions
            </h2>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentCaptions.map((caption) => (
              <Card
                key={caption.id}
                variant="outlined"
                className="hover:border-accent/30 hover:shadow-sm transition-all cursor-pointer group"
                onMouseEnter={() => setHoveredCard(caption.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <CardContent padding="md">
                  {/* Platform Badge */}
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium border ${getPlatformColor(
                        caption.platform
                      )}`}
                    >
                      {getPlatformIcon(caption.platform)}
                      <span className="capitalize">{caption.platform}</span>
                    </div>
                    <span className="text-xs text-hint">{caption.date}</span>
                  </div>

                  {/* Caption Preview */}
                  <p className="text-sm text-text-body mb-3 line-clamp-3 leading-relaxed">
                    {caption.snippet}
                  </p>

                  {/* Style Tag */}
                  <div className="mb-4">
                    <span className="inline-block px-2 py-1 bg-chip-bg text-text-body text-xs rounded-md border border-border">
                      {caption.style}
                    </span>
                  </div>

                  {/* Action Buttons - Show on Hover */}
                  <div
                    className={`flex items-center gap-2 transition-opacity duration-200 ${
                      hoveredCard === caption.id ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <Button
                      onClick={() => handleCopyCaption(caption.fullText)}
                      variant="primary"
                      size="sm"
                      leftIcon={<Copy className="w-3.5 h-3.5" />}
                      className="flex-1 text-xs"
                    >
                      Copy
                    </Button>
                    <Button variant="ghost" size="icon" className="w-9 h-9">
                      <RotateCcw className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="w-9 h-9">
                      <Bookmark className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Upgrade Prompt */}
        <Card className="bg-linear-to-r from-accent to-accent/80 border-accent/20">
          <CardContent padding="lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-display font-semibold text-white mb-1">
                  Ready to unlock unlimited captions?
                </h3>
                <p className="text-white/90 text-sm">
                  Get 10 variations per generation, advanced voice cloning, and
                  analytics
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 text-white/90 text-sm">
                  <Crown className="w-4 h-4" />
                  <span>Pro features</span>
                </div>
                <Link href="/settings/billing">
                  <Button
                    variant="outline"
                    size="lg"
                    className="bg-white hover:bg-gray-50 text-accent border-white font-semibold shadow-lg"
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
