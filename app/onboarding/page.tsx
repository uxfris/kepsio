"use client";

import React, { useState } from "react";
import {
  Instagram,
  Linkedin,
  Twitter,
  TrendingUp,
  Sparkles,
  ArrowRight,
  Check,
  ArrowLeft,
  SkipForward,
} from "lucide-react";
import { Button } from "../../components/ui/Button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../components/ui/Card";
import { cn } from "../../lib/utils/cn";

interface OnboardingData {
  platform: string | null;
  tone: string | null;
  contentTypes: string[];
}

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({
    platform: null,
    tone: null,
    contentTypes: [],
  });

  const platforms = [
    {
      id: "instagram",
      name: "Instagram",
      icon: Instagram,
      description: "Visual storytelling & engagement",
      color: "from-pink-500 to-purple-600",
    },
    {
      id: "tiktok",
      name: "TikTok",
      icon: TrendingUp,
      description: "Short-form video content",
      color: "from-gray-900 to-gray-700",
    },
    {
      id: "linkedin",
      name: "LinkedIn",
      icon: Linkedin,
      description: "Professional networking",
      color: "from-blue-600 to-blue-700",
    },
    {
      id: "twitter",
      name: "Twitter/X",
      icon: Twitter,
      description: "Real-time conversations",
      color: "from-gray-900 to-gray-600",
    },
    {
      id: "multi",
      name: "Multi-platform",
      icon: Sparkles,
      description: "Cross-platform strategy",
      color: "from-purple-600 to-pink-600",
    },
  ];

  const tones = [
    {
      id: "casual",
      name: "Casual & Friendly",
      emoji: "🌟",
      description: "Approachable and conversational",
      example: "Hey friends! Let me tell you about...",
    },
    {
      id: "professional",
      name: "Professional & Polished",
      emoji: "💼",
      description: "Authoritative and credible",
      example: "I'm excited to share insights on...",
    },
    {
      id: "bold",
      name: "Bold & Edgy",
      emoji: "🔥",
      description: "Confident and attention-grabbing",
      example: "Real talk: here's what nobody tells you...",
    },
    {
      id: "warm",
      name: "Warm & Authentic",
      emoji: "💛",
      description: "Personal and genuine",
      example: "I wanted to share something close to my heart...",
    },
    {
      id: "witty",
      name: "Witty & Playful",
      emoji: "😄",
      description: "Clever and entertaining",
      example: "Plot twist: this actually works...",
    },
  ];

  const contentTypes = [
    "Product launches",
    "Behind-the-scenes",
    "Educational content",
    "Personal stories",
    "Motivational posts",
    "Promotional content",
    "Industry insights",
    "Tips & tutorials",
  ];

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete onboarding
      console.log("Onboarding complete:", onboardingData);
      // Here you would typically save to backend and redirect
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    console.log("Skipped onboarding, using defaults");
    // Here you would typically redirect to dashboard with defaults
  };

  const toggleContentType = (type: string) => {
    setOnboardingData((prev) => ({
      ...prev,
      contentTypes: prev.contentTypes.includes(type)
        ? prev.contentTypes.filter((t) => t !== type)
        : [...prev.contentTypes, type],
    }));
  };

  const canProceed = () => {
    if (currentStep === 1) return onboardingData.platform !== null;
    if (currentStep === 2) return onboardingData.tone !== null;
    if (currentStep === 3) return onboardingData.contentTypes.length > 0;
    return false;
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1:
        return "Where do you post most?";
      case 2:
        return "What vibe matches your brand?";
      case 3:
        return "What do you create?";
      default:
        return "";
    }
  };

  const getStepDescription = () => {
    switch (currentStep) {
      case 1:
        return "We'll optimize captions for your primary platform";
      case 2:
        return "Choose the tone that feels most like you";
      case 3:
        return "Select all that apply—we'll tailor suggestions for you";
      default:
        return "";
    }
  };

  return (
    <div className="flex items-center justify-center p-6">
      <div className="w-full max-w-4xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-text-body">
              Step {currentStep} of 3
            </span>
            <span className="text-sm text-hint">
              {currentStep === 1 && "2 min setup"}
              {currentStep === 2 && "Almost there"}
              {currentStep === 3 && "Final step"}
            </span>
          </div>
          <div className="h-2 bg-border rounded-full overflow-hidden">
            <div
              className="h-full bg-accent transition-all duration-500 ease-out"
              style={{ width: `${(currentStep / 3) * 100}%` }}
            />
          </div>
          {/* Progress Dots */}
          <div className="flex items-center justify-center gap-2 mt-4">
            {[1, 2, 3].map((step) => (
              <div
                key={step}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  step === currentStep
                    ? "w-8 bg-accent"
                    : step < currentStep
                    ? "w-2 bg-accent"
                    : "w-2 bg-border"
                )}
              />
            ))}
          </div>
        </div>

        {/* Main Content Card */}
        <Card className="shadow-xl border-border-alt">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl font-display text-text-head mb-2">
              {getStepTitle()}
            </CardTitle>
            <p className="text-text-body text-base">{getStepDescription()}</p>
          </CardHeader>

          <CardContent className="px-8 pb-8">
            {/* Step 1: Platform Selection */}
            {currentStep === 1 && (
              <div className="animate-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {platforms.map((platform) => {
                    const Icon = platform.icon;
                    const isSelected = onboardingData.platform === platform.id;
                    return (
                      <button
                        key={platform.id}
                        onClick={() =>
                          setOnboardingData((prev) => ({
                            ...prev,
                            platform: platform.id,
                          }))
                        }
                        className={cn(
                          "relative p-6 rounded-xl border-2 transition-all duration-200 text-left group",
                          isSelected
                            ? "border-accent bg-accent/5 scale-105 shadow-lg"
                            : "border-border bg-surface hover:border-border-alt hover:bg-section-light"
                        )}
                      >
                        {isSelected && (
                          <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent rounded-full flex items-center justify-center">
                            <Check className="w-4 h-4 text-surface" />
                          </div>
                        )}
                        <div
                          className={cn(
                            "w-12 h-12 mb-4 rounded-lg bg-linear-to-r flex items-center justify-center",
                            platform.color
                          )}
                        >
                          <Icon className="w-6 h-6 text-surface" />
                        </div>
                        <div className="font-semibold text-text-head mb-1">
                          {platform.name}
                        </div>
                        <div className="text-sm text-text-body">
                          {platform.description}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 2: Tone Selection */}
            {currentStep === 2 && (
              <div className="animate-fade-in">
                <div className="space-y-3">
                  {tones.map((tone) => {
                    const isSelected = onboardingData.tone === tone.id;
                    return (
                      <button
                        key={tone.id}
                        onClick={() =>
                          setOnboardingData((prev) => ({
                            ...prev,
                            tone: tone.id,
                          }))
                        }
                        className={cn(
                          "w-full p-5 rounded-xl border-2 transition-all duration-200 text-left group",
                          isSelected
                            ? "border-accent bg-accent/5 shadow-md"
                            : "border-border bg-surface hover:border-border-alt hover:bg-section-light"
                        )}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-4 flex-1">
                            <span className="text-3xl">{tone.emoji}</span>
                            <div className="flex-1">
                              <div className="font-semibold text-text-head mb-1">
                                {tone.name}
                              </div>
                              <div className="text-sm text-text-body mb-2">
                                {tone.description}
                              </div>
                              <div className="text-sm text-hint italic">
                                "{tone.example}"
                              </div>
                            </div>
                          </div>
                          {isSelected && (
                            <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center shrink-0 ml-3">
                              <Check className="w-4 h-4 text-surface" />
                            </div>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 3: Content Type */}
            {currentStep === 3 && (
              <div className="animate-fade-in">
                <div className="flex flex-wrap gap-3 justify-center">
                  {contentTypes.map((type) => {
                    const isSelected =
                      onboardingData.contentTypes.includes(type);
                    return (
                      <button
                        key={type}
                        onClick={() => toggleContentType(type)}
                        className={cn(
                          "px-5 py-3 rounded-full border-2 transition-all duration-200 font-medium flex items-center gap-2",
                          isSelected
                            ? "border-accent bg-accent text-surface shadow-md scale-105"
                            : "border-border bg-surface text-text-body hover:border-accent hover:bg-accent/5"
                        )}
                      >
                        {type}
                        {isSelected && <Check className="w-4 h-4" />}
                      </button>
                    );
                  })}
                </div>

                {onboardingData.contentTypes.length > 0 && (
                  <div className="text-center mt-6">
                    <div className="text-sm text-text-body">
                      <span className="font-semibold text-accent">
                        {onboardingData.contentTypes.length}
                      </span>{" "}
                      content types selected
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
              <Button
                variant="ghost"
                onClick={handleBack}
                disabled={currentStep === 1}
                leftIcon={<ArrowLeft className="w-4 h-4" />}
                className={cn(
                  currentStep === 1 && "opacity-50 cursor-not-allowed"
                )}
              >
                Back
              </Button>

              <Button
                variant="ghost"
                onClick={handleSkip}
                leftIcon={<SkipForward className="w-4 h-4" />}
                className="text-hint hover:text-text-body"
              >
                Skip for now
              </Button>

              <Button
                variant="primary"
                onClick={handleNext}
                disabled={!canProceed()}
                rightIcon={<ArrowRight className="w-4 h-4" />}
                className="min-w-[140px]"
              >
                {currentStep === 3 ? "Get Started" : "Continue"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Skip All Option */}
        <div className="text-center mt-6">
          <button
            className="text-sm text-hint hover:text-text-body transition-colors underline"
            onClick={handleSkip}
          >
            Skip and use smart defaults
          </button>
        </div>
      </div>
    </div>
  );
}
