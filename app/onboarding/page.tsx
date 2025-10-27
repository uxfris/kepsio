"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
import { createClient } from "@/lib/supabase/client";

interface Platform {
  id: string;
  name: string;
  network?: string;
  description: string;
}

interface BrandTone {
  id: string;
  name: string;
  emoji: string;
  description: string;
  example: string;
}

interface ContentType {
  id: string;
  name: string;
}

interface OnboardingData {
  platformId: string | null;
  toneId: string | null;
  contentTypeIds: string[];
}

interface OnboardingOptions {
  platforms: Platform[];
  brandTones: BrandTone[];
  contentTypes: ContentType[];
}

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({
    platformId: null,
    toneId: null,
    contentTypeIds: [],
  });
  const [isCompleting, setIsCompleting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [options, setOptions] = useState<OnboardingOptions>({
    platforms: [],
    brandTones: [],
    contentTypes: [],
  });

  // Fetch onboarding options from API
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await fetch("/api/onboarding/options");
        if (!response.ok) throw new Error("Failed to fetch options");
        const data = await response.json();
        setOptions(data);
      } catch (error) {
        console.error("Error fetching onboarding options:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOptions();
  }, []);

  const completeOnboarding = async (dataToSubmit?: OnboardingData) => {
    setIsCompleting(true);
    try {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        throw new Error("User not authenticated");
      }

      // Use provided data or fall back to current state
      const dataToSend = dataToSubmit || onboardingData;

      // Update user's onboarding status
      const response = await fetch("/api/user/onboarding", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          onboardingData: dataToSend,
          onboardingCompleted: true,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to complete onboarding");
      }

      // Redirect to dashboard
      router.push("/dashboard");
    } catch (error) {
      console.error("Error completing onboarding:", error);
      setIsCompleting(false);
    }
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete onboarding
      completeOnboarding();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    // Skip onboarding without setting defaults (null values)
    completeOnboarding();
  };

  const handleSkipWithDefaults = () => {
    // Skip onboarding with smart defaults
    if (
      options.platforms.length === 0 ||
      options.brandTones.length === 0 ||
      options.contentTypes.length === 0
    ) {
      // If options haven't loaded yet, just skip without defaults
      completeOnboarding();
      return;
    }

    // Find smart defaults
    const multiPlatform = options.platforms.find(
      (p) => p.name === "Multi-platform"
    );
    const professionalTone = options.brandTones.find(
      (t) => t.name === "Professional & Polished"
    );
    const allContentTypeIds = options.contentTypes.map((ct) => ct.id);

    // Create defaults object
    const defaultsData: OnboardingData = {
      platformId: multiPlatform?.id || null,
      toneId: professionalTone?.id || null,
      contentTypeIds: allContentTypeIds,
    };

    // Pass defaults directly to completeOnboarding
    completeOnboarding(defaultsData);
  };

  const toggleContentType = (type: string) => {
    setOnboardingData((prev) => ({
      ...prev,
      contentTypeIds: prev.contentTypeIds.includes(type)
        ? prev.contentTypeIds.filter((t) => t !== type)
        : [...prev.contentTypeIds, type],
    }));
  };

  const canProceed = () => {
    if (currentStep === 1) return onboardingData.platformId !== null;
    if (currentStep === 2) return onboardingData.toneId !== null;
    if (currentStep === 3) return onboardingData.contentTypeIds.length > 0;
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
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-8 h-8 border-3 border-border border-t-accent rounded-full animate-spin" />
                  <p className="text-sm text-text-body">Loading options...</p>
                </div>
              </div>
            ) : (
              <>
                {/* Step 1: Platform Selection */}
                {currentStep === 1 && (
                  <div className="animate-fade-in">
                    <div className="grid grid-cols-3 gap-3">
                      {options.platforms.map((platform) => {
                        const isSelected =
                          onboardingData.platformId === platform.id;
                        const isMultiPlatform = platform.id === "multi";
                        return (
                          <button
                            key={platform.id}
                            onClick={() =>
                              setOnboardingData((prev) => ({
                                ...prev,
                                platformId: platform.id,
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
                      {options.brandTones.map((tone) => {
                        const isSelected = onboardingData.toneId === tone.id;
                        return (
                          <button
                            key={tone.id}
                            onClick={() =>
                              setOnboardingData((prev) => ({
                                ...prev,
                                toneId: tone.id,
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
                                <span className="text-2xl -mt-1">
                                  {tone.emoji}
                                </span>
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
                      {options.contentTypes.map((type) => {
                        const isSelected =
                          onboardingData.contentTypeIds.includes(type.id);
                        return (
                          <button
                            key={type.id}
                            onClick={() => toggleContentType(type.id)}
                            className={cn(
                              "px-3 py-2 rounded-lg border border-border-alt transition-all duration-200 font-medium text-sm flex items-center justify-center gap-1.5 focus:outline-none",
                              isSelected
                                ? "border-accent bg-accent text-surface"
                                : "border-border bg-surface text-text-body hover:border-accent hover:bg-accent/5 hover:scale-102"
                            )}
                          >
                            <span className="truncate">{type.name}</span>
                            {isSelected && (
                              <Check className="w-3 h-3 shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {onboardingData.contentTypeIds.length > 0 && (
                      <div className="text-center mt-4">
                        <div className="text-xs text-text-body">
                          <span className="font-semibold text-accent">
                            {onboardingData.contentTypeIds.length}
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
                      disabled={!canProceed() || isCompleting}
                      loading={isCompleting}
                      rightIcon={<ArrowRight className="w-4 h-4" />}
                      className="min-w-[100px] sm:min-w-[120px] text-sm"
                    >
                      {isCompleting
                        ? "Setting up..."
                        : currentStep === 3
                        ? "Get Started"
                        : "Continue"}
                    </Button>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Compact Skip All Option */}
        <div className="text-center mt-4">
          <button
            className="text-xs text-hint hover:text-text-body transition-colors underline"
            onClick={handleSkipWithDefaults}
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
