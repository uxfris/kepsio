"use client";

import { useState, useEffect } from "react";
import {
  TrendingUp,
  Sparkles,
  ArrowRight,
  Check,
  ArrowLeft,
  SkipForward,
} from "lucide-react";
import { SocialIcon } from "react-social-icons";
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
      network: "instagram",
      description: "Visual storytelling & engagement",
    },
    {
      id: "tiktok",
      name: "TikTok",
      network: "tiktok",
      description: "Short-form video content",
    },
    {
      id: "linkedin",
      name: "LinkedIn",
      network: "linkedin",
      description: "Professional networking",
    },
    {
      id: "x",
      name: "X",
      network: "x",
      description: "Real-time conversations",
    },
    {
      id: "multi",
      name: "Multi-platform",
      icon: Sparkles,
      description: "Cross-platform strategy",
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

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter" && canProceed()) {
        handleNext();
      } else if (event.key === "Escape") {
        handleSkip();
      } else if (event.key === "ArrowLeft" && currentStep > 1) {
        handleBack();
      } else if (event.key === "ArrowRight" && canProceed()) {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentStep, onboardingData]);

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
    <div className="flex items-center justify-center p-4 sm:p-6 min-h-screen">
      <div className="w-full max-w-3xl">
        {/* Compact Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-text-body">
              Step {currentStep} of 3
            </span>
            <span className="text-xs text-hint">
              {currentStep === 1 && "Quick setup"}
              {currentStep === 2 && "Almost done"}
              {currentStep === 3 && "Final step"}
            </span>
          </div>
          <div className="h-1.5 bg-border rounded-full overflow-hidden">
            <div
              className="h-full bg-accent transition-all duration-500 ease-out"
              style={{ width: `${(currentStep / 3) * 100}%` }}
            />
          </div>
          {/* Compact Progress Dots */}
          <div className="flex items-center justify-center gap-1.5 mt-3">
            {[1, 2, 3].map((step) => (
              <div
                key={step}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  step === currentStep
                    ? "w-6 bg-accent"
                    : step < currentStep
                    ? "w-1.5 bg-accent"
                    : "w-1.5 bg-border"
                )}
              />
            ))}
          </div>
        </div>

        {/* Compact Main Content Card */}
        <Card className="border-border-alt">
          <CardHeader className="text-center pb-4 px-6 pt-6">
            <CardTitle className="text-xl sm:text-2xl font-display text-text-head mb-1">
              {getStepTitle()}
            </CardTitle>
            <p className="text-text-body text-sm sm:text-base">
              {getStepDescription()}
            </p>
          </CardHeader>

          <CardContent className="px-6 pb-6">
            {/* Step 1: Platform Selection */}
            {currentStep === 1 && (
              <div className="animate-fade-in">
                <div className="grid grid-cols-3 gap-3">
                  {platforms.map((platform) => {
                    const isSelected = onboardingData.platform === platform.id;
                    const isMultiPlatform = platform.id === "multi";
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
                          "relative p-4 rounded-lg border border-border-alt transition-all duration-200 text-center group focus:outline-none focus:ring-2 focus:ring-accent/20",
                          isSelected
                            ? "border-accent bg-accent/5"
                            : "border-border bg-surface hover:border-border-alt hover:bg-section-light hover:scale-102",
                          isMultiPlatform && "col-span-2"
                        )}
                      >
                        {isSelected && (
                          <div className="absolute -top-1 -right-1 w-5 h-5 bg-accent rounded-full flex items-center justify-center">
                            <Check className="w-3 h-3 text-surface" />
                          </div>
                        )}
                        <div className="w-10 h-10 mx-auto mb-3 flex items-center justify-center">
                          {platform.network ? (
                            <SocialIcon
                              network={platform.network}
                              style={{ width: 40, height: 40 }}
                              className="rounded-lg"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-linear-to-r from-purple-600 to-pink-600 flex items-center justify-center">
                              <Sparkles className="w-5 h-5 text-white" />
                            </div>
                          )}
                        </div>
                        <div className="font-semibold text-text-head text-sm mb-1">
                          {platform.name}
                        </div>
                        <div className="text-xs text-text-body leading-tight">
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
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
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
                          "w-full p-4 rounded-lg border border-border-alt transition-all duration-200 text-left group focus:outline-none",
                          isSelected
                            ? "border-accent bg-accent/5"
                            : "border-border bg-surface hover:border-border-alt hover:bg-section-light hover:scale-102"
                        )}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-start gap-3 flex-1">
                            <span className="text-2xl -mt-1">{tone.emoji}</span>
                            <div className="flex-1">
                              <div className="font-semibold text-text-head text-sm mb-1">
                                {tone.name}
                              </div>
                              <div className="text-xs text-text-body mb-1">
                                {tone.description}
                              </div>
                              <div className="text-xs text-hint italic">
                                "{tone.example}"
                              </div>
                            </div>
                          </div>
                          {isSelected && (
                            <div className="w-5 h-5 bg-accent rounded-full flex items-center justify-center shrink-0 ml-2">
                              <Check className="w-3 h-3 text-surface" />
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
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                  {contentTypes.map((type) => {
                    const isSelected =
                      onboardingData.contentTypes.includes(type);
                    return (
                      <button
                        key={type}
                        onClick={() => toggleContentType(type)}
                        className={cn(
                          "px-3 py-2 rounded-lg border border-border-alt transition-all duration-200 font-medium text-sm flex items-center justify-center gap-1.5 focus:outline-none",
                          isSelected
                            ? "border-accent bg-accent text-surface"
                            : "border-border bg-surface text-text-body hover:border-accent hover:bg-accent/5 hover:scale-102"
                        )}
                      >
                        <span className="truncate">{type}</span>
                        {isSelected && <Check className="w-3 h-3 shrink-0" />}
                      </button>
                    );
                  })}
                </div>

                {onboardingData.contentTypes.length > 0 && (
                  <div className="text-center mt-4">
                    <div className="text-xs text-text-body">
                      <span className="font-semibold text-accent">
                        {onboardingData.contentTypes.length}
                      </span>{" "}
                      selected
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Compact Action Buttons */}
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
              <Button
                variant="ghost"
                onClick={handleBack}
                disabled={currentStep === 1}
                leftIcon={<ArrowLeft className="w-4 h-4" />}
                className={cn(
                  "text-sm",
                  currentStep === 1 && "opacity-50 cursor-not-allowed"
                )}
              >
                <span className="hidden sm:inline">Back</span>
              </Button>

              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  onClick={handleSkip}
                  leftIcon={<SkipForward className="w-4 h-4" />}
                  className="text-xs text-hint hover:text-text-body"
                >
                  <span className="hidden sm:inline">Skip for now</span>
                  <span className="sm:hidden">Skip</span>
                </Button>

                <Button
                  variant="primary"
                  onClick={handleNext}
                  disabled={!canProceed()}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                  className="min-w-[100px] sm:min-w-[120px] text-sm"
                >
                  {currentStep === 3 ? "Get Started" : "Continue"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Compact Skip All Option */}
        <div className="text-center mt-4">
          <button
            className="text-xs text-hint hover:text-text-body transition-colors underline"
            onClick={handleSkip}
          >
            Skip and use smart defaults
          </button>
          <div className="text-xs text-hint mt-2">
            <span className="hidden sm:inline">
              Use ← → arrow keys to navigate, Enter to continue, Esc to skip
            </span>
            <span className="sm:hidden">Tap to select, swipe to navigate</span>
          </div>
        </div>
      </div>
    </div>
  );
}
