"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, Brain, Target, Palette, Star } from "lucide-react";

interface LoadingPhase {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  duration: number;
}

interface ImmersiveLoadingProps {
  isVisible: boolean;
  onComplete: () => void;
  onError?: () => void;
}

const LOADING_PHASES: LoadingPhase[] = [
  {
    id: "analyzing",
    title: "Analyzing your content...",
    description: "Understanding context and intent",
    icon: <Brain className="w-6 h-6" />,
    duration: 1000,
  },
  {
    id: "hooking",
    title: "Finding the perfect hooks...",
    description: "Crafting attention-grabbing openings",
    icon: <Target className="w-6 h-6" />,
    duration: 1000,
  },
  {
    id: "matching",
    title: "Matching your brand voice...",
    description: "Personalizing tone and style",
    icon: <Palette className="w-6 h-6" />,
    duration: 1000,
  },
];

const PRO_TIPS = [
  "Pro tip: Questions boost engagement by 23%",
  "Pro tip: Emojis increase likes by 15%",
  "Pro tip: Storytelling captions get 3x more shares",
  "Pro tip: Call-to-actions improve click-through rates by 40%",
  "Pro tip: Hashtags expand reach by 12.6%",
];

export default function ImmersiveLoading({
  isVisible,
  onComplete,
  onError,
}: ImmersiveLoadingProps) {
  const [currentPhase, setCurrentPhase] = useState(0);
  const [progress, setProgress] = useState(0);
  const [showPreviewCards, setShowPreviewCards] = useState(false);
  const [currentTip, setCurrentTip] = useState(0);
  const [isLongGeneration, setIsLongGeneration] = useState(false);

  useEffect(() => {
    if (!isVisible) {
      // Reset state when loading starts
      setCurrentPhase(0);
      setProgress(0);
      setShowPreviewCards(false);
      setCurrentTip(0);
      setIsLongGeneration(false);
      return;
    }

    let phaseTimer: NodeJS.Timeout;
    let progressTimer: NodeJS.Timeout;
    let tipTimer: NodeJS.Timeout;
    let longGenerationTimer: NodeJS.Timeout;

    // Start the loading sequence
    const startLoading = () => {
      let totalElapsed = 0;
      let currentPhaseIndex = 0;

      // Phase progression
      const advancePhase = () => {
        if (currentPhaseIndex < LOADING_PHASES.length - 1) {
          currentPhaseIndex++;
          setCurrentPhase(currentPhaseIndex);

          // Show preview cards during the second phase
          if (currentPhaseIndex === 1) {
            setShowPreviewCards(true);
          }

          phaseTimer = setTimeout(
            advancePhase,
            LOADING_PHASES[currentPhaseIndex].duration
          );
        } else {
          // All phases complete, but keep loading until onComplete is called
          setIsLongGeneration(true);
        }
      };

      // Start first phase
      phaseTimer = setTimeout(advancePhase, LOADING_PHASES[0].duration);

      // Progress animation
      const updateProgress = () => {
        setProgress((prev) => {
          const newProgress = prev + 0.5;
          if (newProgress >= 100) {
            return 100;
          }
          return newProgress;
        });
      };

      progressTimer = setInterval(updateProgress, 20);

      // Rotate tips
      const rotateTip = () => {
        setCurrentTip((prev) => (prev + 1) % PRO_TIPS.length);
      };

      tipTimer = setInterval(rotateTip, 2000);

      // Long generation message
      longGenerationTimer = setTimeout(() => {
        setIsLongGeneration(true);
      }, 10000);
    };

    startLoading();

    return () => {
      clearTimeout(phaseTimer);
      clearInterval(progressTimer);
      clearInterval(tipTimer);
      clearTimeout(longGenerationTimer);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="flex-1 bg-section overflow-y-auto">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header Section - Matching CaptionResults */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 animate-slide-in-up">
          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-primary tracking-tight flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-accent animate-pulse" />
              Crafting your captions...
            </h2>
            <p className="text-sm font-medium text-text-body">
              Our AI is analyzing your content and finding the perfect hooks
            </p>
          </div>
        </div>

        {/* Loading Content */}
        <div className="flex items-center justify-center py-12">
          <div className="bg-surface border border-border rounded-2xl p-8 max-w-lg w-full shadow-lg animate-scale-in">
            {/* Loading Icon */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                <Sparkles className="w-8 h-8 text-primary animate-pulse" />
              </div>
            </div>

            {/* Current Phase */}
            <div className="text-center mb-6">
              <div className="flex items-center justify-center gap-3 mb-3">
                <div className="text-primary animate-spin">
                  {LOADING_PHASES[currentPhase]?.icon}
                </div>
                <h3 className="text-lg font-medium text-primary">
                  {LOADING_PHASES[currentPhase]?.title}
                </h3>
              </div>
              <p className="text-sm text-secondary">
                {LOADING_PHASES[currentPhase]?.description}
              </p>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="w-full bg-border rounded-full h-2 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${Math.min(progress, 100)}%` }}
                />
              </div>
            </div>

            {/* Pro Tips */}
            <div className="text-center">
              <div className="h-6 flex items-center justify-center">
                <p className="text-xs text-hint animate-fade-in-out">
                  {PRO_TIPS[currentTip]}
                </p>
              </div>
            </div>

            {/* Long Generation Message */}
            {isLongGeneration && (
              <div className="mt-4 p-3 bg-accent/10 border border-accent/20 rounded-lg">
                <p className="text-sm text-accent text-center">
                  Taking a bit longer... crafting something great ✨
                </p>
              </div>
            )}

            {/* Particle Effects */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-primary/30 rounded-full animate-float"
                  style={{
                    left: `${20 + i * 15}%`,
                    top: `${30 + (i % 3) * 20}%`,
                    animationDelay: `${i * 0.5}s`,
                    animationDuration: `${2 + i * 0.3}s`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Preview Cards (Phase 2+) - Full Width Layout */}
        {showPreviewCards && (
          <div className="space-y-8 mb-12">
            {/* <p className="text-sm text-secondary text-center mb-6 animate-slide-in-up">
              Preview cards appearing...
            </p> */}

            {/* Top Pick Preview Card */}
            <div
              className={`animate-slide-in-up animate-delay-100 transition-all duration-500 ${
                currentPhase >= 1 ? "opacity-100 blur-0" : "opacity-50 blur-sm"
              }`}
            >
              <div className="bg-surface border border-border rounded-2xl p-6 shadow-lg">
                {/* Top Pick Badge */}
                <div className="mb-4 p-3 bg-section-light/50 rounded-lg border border-border-alt">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-text-head animate-pulse" />
                    <span className="text-xs font-semibold text-text-head">
                      Our top pick for you
                    </span>
                  </div>
                </div>

                {/* Engagement Badge */}
                <div className="inline-flex items-center gap-1.5 px-2 py-1 bg-section-light rounded-full mb-4">
                  <Star className="w-3 h-3 text-warning animate-pulse" />
                  <span className="text-xs font-medium text-text-body">
                    High Potential
                  </span>
                </div>

                {/* Caption Preview */}
                <div className="space-y-3 mb-4">
                  <div className="h-4 bg-section-light rounded animate-shimmer"></div>
                  <div
                    className="h-4 bg-section-light rounded w-3/4 animate-shimmer"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                  <div
                    className="h-4 bg-section-light rounded w-1/2 animate-shimmer"
                    style={{ animationDelay: "0.4s" }}
                  ></div>
                </div>

                {/* Metadata badges */}
                <div className="flex flex-wrap items-center gap-1 mb-4">
                  <div className="h-6 w-16 bg-section-light rounded-full animate-pulse"></div>
                  <div
                    className="h-6 w-20 bg-section-light rounded-full animate-pulse"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                </div>

                {/* Action buttons */}
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-10 bg-primary/20 rounded-lg animate-pulse"></div>
                  <div
                    className="h-10 w-10 bg-section-light rounded-lg animate-pulse"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="h-10 w-10 bg-section-light rounded-lg animate-pulse"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Regular Cards Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              {[1, 2].map((index) => (
                <div
                  key={index}
                  className={`animate-slide-in-up transition-all duration-500 ${
                    currentPhase >= 2
                      ? "opacity-100 blur-0"
                      : "opacity-50 blur-sm"
                  } ${index === 1 ? "animate-delay-200" : "animate-delay-300"}`}
                >
                  <div className="bg-surface border border-border rounded-2xl p-6 shadow-lg">
                    {/* Engagement Badge */}
                    <div className="inline-flex items-center gap-1.5 px-2 py-1 bg-section-light rounded-full mb-4">
                      <Star className="w-3 h-3 text-hint animate-pulse" />
                      <span className="text-xs font-medium text-text-body">
                        Good Potential
                      </span>
                    </div>

                    {/* Caption Preview */}
                    <div className="space-y-3 mb-4">
                      <div className="h-4 bg-section-light rounded animate-shimmer"></div>
                      <div
                        className="h-4 bg-section-light rounded w-4/5 animate-shimmer"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                      <div
                        className="h-4 bg-section-light rounded w-2/3 animate-shimmer"
                        style={{ animationDelay: "0.4s" }}
                      ></div>
                    </div>

                    {/* Metadata badges */}
                    <div className="flex flex-wrap items-center gap-1 mb-4">
                      <div className="h-6 w-14 bg-section-light rounded-full animate-pulse"></div>
                      <div
                        className="h-6 w-18 bg-section-light rounded-full animate-pulse"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-10 bg-primary/20 rounded-lg animate-pulse"></div>
                      <div
                        className="h-10 w-10 bg-section-light rounded-lg animate-pulse"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="h-10 w-10 bg-section-light rounded-lg animate-pulse"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
