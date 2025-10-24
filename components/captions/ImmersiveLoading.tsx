"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, Brain, Target, Palette } from "lucide-react";

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
    <div className="flex-1 flex items-center justify-center p-8 bg-section">
      <div className="bg-surface border border-border rounded-2xl p-8 max-w-lg w-full shadow-lg animate-scale-in">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
            <Sparkles className="w-8 h-8 text-primary animate-pulse" />
          </div>
          <h2 className="text-xl font-semibold text-primary mb-2">
            Crafting Your Captions
          </h2>
          <p className="text-sm text-secondary">
            Our AI is working its magic...
          </p>
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

        {/* Preview Cards (Phase 2+) */}
        {showPreviewCards && (
          <div className="mb-6 space-y-3">
            <p className="text-sm text-secondary text-center mb-3">
              Preview cards appearing...
            </p>
            <div className="space-y-2">
              {[1, 2, 3].map((index) => (
                <div
                  key={index}
                  className={`h-12 bg-section border border-border rounded-lg transition-all duration-500 ${
                    index <= currentPhase
                      ? "opacity-100 blur-0 animate-slide-in-up"
                      : "opacity-50 blur-sm"
                  }`}
                  style={{
                    animationDelay: `${index * 200}ms`,
                  }}
                />
              ))}
            </div>
          </div>
        )}

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
  );
}
