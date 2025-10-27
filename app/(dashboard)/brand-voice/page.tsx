"use client";

import React, { useState, useEffect } from "react";
import {
  Target,
  Upload,
  Check,
  Wand2,
  TrendingUp,
  AlertCircle,
  FileText,
  Trash2,
  Edit3,
  Plus,
  Zap,
  Sparkles,
} from "lucide-react";
import { SocialIcon } from "react-social-icons";

import { Button } from "../../../components/ui/Button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../../components/ui/Card";
import { Textarea } from "../../../components/ui/Textarea";
import { UnderlineTabs } from "../../../components/ui/UnderlineTabs";
import { Slider } from "../../../components/ui/Slider";
import { Switch } from "../../../components/ui/Switch";
import { Progress } from "../../../components/ui/Progress";
import { ToastProvider, useToast } from "../../../components/ui/Toast";

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

interface OnboardingOptions {
  platforms: Platform[];
  brandTones: BrandTone[];
  contentTypes: ContentType[];
}

const BrandVoiceContent = () => {
  const [activeTab, setActiveTab] = useState("training");
  const [voiceStrength, setVoiceStrength] = useState(75);
  const [selectedToneId, setSelectedToneId] = useState("");
  const [selectedPlatformId, setSelectedPlatformId] = useState("");
  const [selectedContentTypes, setSelectedContentTypes] = useState<string[]>(
    []
  );
  const [uploadedCaptions, setUploadedCaptions] = useState(3);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [pastedCaptions, setPastedCaptions] = useState("");
  const [showOnboarding, setShowOnboarding] = useState(uploadedCaptions === 0);
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [stylePreferences, setStylePreferences] = useState({
    useQuestions: true,
    includeEmojis: true,
    includeCTA: true,
  });
  const [onboardingOptions, setOnboardingOptions] = useState<OnboardingOptions>(
    {
      platforms: [],
      brandTones: [],
      contentTypes: [],
    }
  );
  const [isLoadingOptions, setIsLoadingOptions] = useState(true);

  const { addToast } = useToast();

  // Fetch onboarding options
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [optionsResponse, userDataResponse] = await Promise.all([
          fetch("/api/onboarding/options"),
          fetch("/api/user/onboarding"),
        ]);

        if (!optionsResponse.ok) throw new Error("Failed to fetch options");
        const optionsData = await optionsResponse.json();
        setOnboardingOptions(optionsData);

        // Fetch user's saved onboarding data
        let userPlatformId = optionsData.platforms[0]?.id || "";
        let userToneId = optionsData.brandTones[0]?.id || "";
        let userContentTypeIds: string[] = [];

        if (userDataResponse.ok) {
          const userData = await userDataResponse.json();
          userPlatformId = userData.platformId || userPlatformId;
          userToneId = userData.toneId || userToneId;
          userContentTypeIds = userData.contentTypeIds || [];
        }

        setSelectedPlatformId(userPlatformId);
        setSelectedToneId(userToneId);
        setSelectedContentTypes(userContentTypeIds);
      } catch (error) {
        console.error("Error fetching onboarding options:", error);
      } finally {
        setIsLoadingOptions(false);
      }
    };

    fetchOptions();
  }, []);

  const tabOptions = [
    { value: "training", label: "Voice Training" },
    { value: "tone", label: "Tone & Style" },
    { value: "insights", label: "Voice Insights" },
  ];

  const onboardingSteps = [
    {
      title: "Welcome to Brand Voice! 🎉",
      description:
        "Let's train the AI to write captions in your unique style. This will make your content more authentic and engaging.",
      icon: <Sparkles className="w-8 h-8 text-accent" />,
    },
    {
      title: "Upload Your Past Captions",
      description:
        "Start by uploading 3-5 of your best captions. The AI will analyze your writing style, tone, and voice patterns.",
      icon: <Upload className="w-8 h-8 text-accent" />,
    },
    {
      title: "Choose Your Tone",
      description:
        "Select the tone that best represents your brand. You can always adjust this later based on your audience.",
      icon: <Target className="w-8 h-8 text-accent" />,
    },
    {
      title: "You're All Set! ✨",
      description:
        "Your brand voice is now configured. Start generating captions that sound authentically like you!",
      icon: <Check className="w-8 h-8 text-success" />,
    },
  ];

  const handleOnboardingNext = () => {
    if (onboardingStep < onboardingSteps.length - 1) {
      setOnboardingStep(onboardingStep + 1);
    } else {
      setShowOnboarding(false);
    }
  };

  const handleOnboardingSkip = () => {
    setShowOnboarding(false);
  };

  const voiceInsights = {
    topPhrases: [
      "excited to share",
      "quick tip",
      "let me know",
      "in the comments",
    ],
    emojiUsage: "Moderate (3-5 per caption)",
    avgLength: "145 characters",
    questionFrequency: "60% of captions",
    ctaStyle: "Conversational asks",
  };

  const uploadedSamples = [
    {
      id: 1,
      text: "Behind the scenes of building a product people actually...",
      platform: "instagram",
      date: "2 days ago",
    },
    {
      id: 2,
      text: "Quick tip: Your audience doesn't want perfection...",
      platform: "linkedin",
      date: "1 week ago",
    },
    {
      id: 3,
      text: "Coffee first, creativity second ☕️ What's your morning...",
      platform: "instagram",
      date: "2 weeks ago",
    },
  ];

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2500));
      addToast({
        type: "success",
        title: "Voice Updated Successfully! 🎉",
        description: "Your brand voice has been analyzed and updated.",
      });
    } catch (error) {
      addToast({
        type: "error",
        title: "Analysis Failed",
        description:
          "There was an error analyzing your voice. Please try again.",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleAddCaptions = () => {
    if (pastedCaptions.trim()) {
      setUploadedCaptions((prev) => prev + 1);
      setPastedCaptions("");
      addToast({
        type: "success",
        title: "Captions Added",
        description: "Your captions have been added to the training data.",
      });
    }
  };

  const handleRemoveSample = (id: number) => {
    setUploadedCaptions((prev) => Math.max(0, prev - 1));
    addToast({
      type: "success",
      title: "Sample Removed",
      description: "The caption sample has been removed.",
    });
  };

  const toggleContentType = (type: string) => {
    setSelectedContentTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  // Save onboarding data to database
  const saveOnboardingData = async (
    platformId?: string,
    toneId?: string,
    contentTypeIds?: string[]
  ) => {
    try {
      const response = await fetch("/api/user/onboarding", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          onboardingData: {
            platformId: platformId ?? selectedPlatformId,
            toneId: toneId ?? selectedToneId,
            contentTypeIds: contentTypeIds ?? selectedContentTypes,
          },
          onboardingCompleted: true,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save settings");
      }

      addToast({
        type: "success",
        title: "Settings Saved",
        description: "Your brand voice settings have been updated.",
      });
    } catch (error) {
      console.error("Error saving onboarding data:", error);
      addToast({
        type: "error",
        title: "Save Failed",
        description: "Could not save your settings. Please try again.",
      });
    }
  };

  // Handle platform change
  const handlePlatformChange = (platformId: string) => {
    setSelectedPlatformId(platformId);
    saveOnboardingData(platformId, undefined, undefined);
  };

  // Handle tone change
  const handleToneChange = (toneId: string) => {
    setSelectedToneId(toneId);
    saveOnboardingData(undefined, toneId, undefined);
  };

  // Handle content type toggle
  const handleContentTypeToggle = (type: string) => {
    const updatedTypes = selectedContentTypes.includes(type)
      ? selectedContentTypes.filter((t) => t !== type)
      : [...selectedContentTypes, type];
    setSelectedContentTypes(updatedTypes);
    saveOnboardingData(undefined, undefined, updatedTypes);
  };

  const selectedTone = onboardingOptions.brandTones.find(
    (t) => t.id === selectedToneId
  );
  const selectedPlatform = onboardingOptions.platforms.find(
    (p) => p.id === selectedPlatformId
  );

  return (
    <div className="min-h-screen bg-section">
      {/* Onboarding Modal */}
      {showOnboarding && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-surface rounded-2xl max-w-md w-full p-6 animate-scale-in">
            <div className="text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                {onboardingSteps[onboardingStep].icon}
              </div>
              <h2 className="text-xl font-bold text-text-head mb-2">
                {onboardingSteps[onboardingStep].title}
              </h2>
              <p className="text-text-body mb-6">
                {onboardingSteps[onboardingStep].description}
              </p>

              {/* Progress Dots */}
              <div className="flex justify-center gap-2 mb-6">
                {onboardingSteps.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === onboardingStep
                        ? "bg-accent"
                        : index < onboardingStep
                        ? "bg-accent/50"
                        : "bg-border"
                    }`}
                  />
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={handleOnboardingSkip}
                  className="flex-1"
                >
                  Skip
                </Button>
                <Button
                  variant="accent"
                  onClick={handleOnboardingNext}
                  className="flex-1"
                >
                  {onboardingStep === onboardingSteps.length - 1
                    ? "Get Started"
                    : "Next"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Header */}
      <div className="bg-linear-to-r from-surface to-section border-b border-border">
        <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-text-head">
                    Brand Voice
                  </h1>
                  <p className="text-text-body text-base sm:text-lg">
                    Train the AI to write in your unique style
                  </p>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  <span className="text-sm font-medium text-text-body">
                    Voice Active
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-hint" />
                  <span className="text-sm text-text-body">
                    {uploadedCaptions} training samples
                  </span>
                </div>
                {selectedTone && (
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-hint" />
                    <span className="text-sm text-text-body capitalize">
                      {selectedTone.name} tone
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-surface border-b border-border px-4 sm:px-6 lg:px-8">
        <UnderlineTabs
          options={tabOptions}
          value={activeTab}
          onChange={setActiveTab}
          className="mb-0"
        />
      </div>

      {/* Content Area */}
      <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Voice Training Tab */}
        {activeTab === "training" && (
          <div className="space-y-8">
            {/* Training Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Progress Card */}
              <Card className="lg:col-span-2" padding="none">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
                          <TrendingUp className="w-4 h-4 text-accent" />
                        </div>
                        Training Progress
                      </CardTitle>
                      <p className="text-sm text-text-body mt-2">
                        Upload your past captions to help the AI learn your
                        unique writing style
                      </p>
                    </div>
                    <div className="px-3 py-1 bg-accent/10 text-accent text-xs font-semibold rounded-full">
                      {uploadedCaptions}/10 samples
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Enhanced Progress Indicator */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-text-head">
                        Training Progress
                      </span>
                      <span className="text-sm text-text-body">
                        {Math.round((uploadedCaptions / 10) * 100)}% complete
                      </span>
                    </div>
                    <Progress value={uploadedCaptions} max={10} />
                    <div className="flex justify-between text-xs text-hint mt-2">
                      <span>Getting started</span>
                      <span>Good</span>
                      <span>Excellent</span>
                    </div>
                  </div>

                  {/* Status Message */}
                  {uploadedCaptions < 3 ? (
                    <div className="flex items-start gap-3 p-3 bg-warning/5 border border-warning/10 rounded-lg">
                      <AlertCircle className="w-4 h-4 text-warning shrink-0 mt-0.5" />
                      <div className="text-sm text-warning">
                        <p className="font-medium mb-0.5">Getting Started</p>
                        <p className="text-warning/70 text-xs">
                          Upload at least 3 captions to begin training your
                          voice. More samples = better results.
                        </p>
                      </div>
                    </div>
                  ) : uploadedCaptions < 7 ? (
                    <div className="flex items-start gap-3 p-3 bg-info/5 border border-info/10 rounded-lg">
                      <AlertCircle className="w-4 h-4 text-info shrink-0 mt-0.5" />
                      <div className="text-sm text-info">
                        <p className="font-medium mb-0.5">Good Progress</p>
                        <p className="text-info/70 text-xs">
                          Add {7 - uploadedCaptions} more samples for optimal
                          voice matching.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start gap-3 p-3 bg-success/5 border border-success/10 rounded-lg">
                      <Check className="w-4 h-4 text-success shrink-0 mt-0.5" />
                      <div className="text-sm text-success">
                        <p className="font-medium mb-0.5">
                          Excellent Training Data
                        </p>
                        <p className="text-success/70 text-xs">
                          You have enough samples for high-quality voice
                          matching.
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Training Tips Card */}
              <Card padding="none">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-primary" />
                    </div>
                    Training Tips
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex gap-2 ">
                      <span className="text-accent font-bold shrink-0">1.</span>
                      <p className="text-text-body text-sm">
                        Upload diverse captions from different periods
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-accent font-bold shrink-0">2.</span>
                      <p className="text-text-body text-sm">
                        Include your best-performing posts
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-accent font-bold shrink-0">3.</span>
                      <p className="text-text-body text-sm">
                        Mix different caption styles and lengths
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-accent font-bold shrink-0">4.</span>
                      <p className="text-text-body text-sm">
                        More samples = better voice accuracy
                      </p>
                    </div>
                  </div>
                  <div className="pt-3 border-t border-border/50">
                    <p className="text-sm text-hint">
                      Pro tip: Aim for at least 10 captions for optimal results.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Upload Section */}
            <Card padding="none">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
                    <Upload className="w-4 h-4 text-accent" />
                  </div>
                  Add Training Content
                </CardTitle>
                <p className="text-sm text-text-body">
                  Upload your past captions or paste them directly to train the
                  AI
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* File Upload Area */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium text-text-head">
                      Upload Files
                    </h4>
                    <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-accent hover:bg-accent/5 transition-all cursor-pointer group">
                      <div className="w-16 h-16 bg-accent/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 transition-colors">
                        <Upload className="w-8 h-8 text-accent" />
                      </div>
                      <p className="text-text-head font-medium mb-2">
                        Drop your captions here
                      </p>
                      <p className="text-sm text-text-body mb-4">
                        Supports .txt, .csv, .docx files
                      </p>
                      <Button variant="accent" size="sm">
                        Choose Files
                      </Button>
                    </div>
                  </div>

                  {/* Manual Input Area */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium text-text-head">
                      Paste Directly
                    </h4>
                    <div>
                      <Textarea
                        placeholder="Paste one or more captions here (one per line)..."
                        value={pastedCaptions}
                        onChange={(e) => setPastedCaptions(e.target.value)}
                        className="mb-4"
                        rows={8}
                      />
                      <div className="flex items-center justify-between">
                        <div className="text-xs text-hint">
                          {
                            pastedCaptions
                              .split("\n")
                              .filter((line) => line.trim()).length
                          }{" "}
                          captions ready
                        </div>
                        <Button
                          variant="accent"
                          size="sm"
                          onClick={handleAddCaptions}
                          disabled={!pastedCaptions.trim()}
                          leftIcon={<Plus className="w-4 h-4" />}
                        >
                          Add Captions
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Uploaded Samples List */}
            <Card padding="none">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                      <FileText className="w-4 h-4 text-primary" />
                    </div>
                    Training Samples ({uploadedCaptions})
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                {uploadedCaptions > 0 ? (
                  <div className="space-y-3">
                    {uploadedSamples.map((sample, index) => (
                      <div
                        key={sample.id}
                        className="group flex items-start gap-4 p-4 bg-section rounded-xl border border-border hover:border-accent/30 hover:bg-accent/5 transition-all"
                      >
                        <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center shrink-0 mt-1">
                          <span className="text-xs font-semibold text-accent">
                            {index + 1}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-text-body mb-2 line-clamp-2">
                            {sample.text}
                          </p>
                          <div className="flex items-center gap-3 text-xs text-hint">
                            <span className="capitalize bg-chip-bg px-2 py-1 rounded-md">
                              {sample.platform}
                            </span>
                            <span>•</span>
                            <span>{sample.date}</span>
                            <span>•</span>
                            <span>{sample.text.length} chars</span>
                          </div>
                        </div>
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <Edit3 className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 hover:bg-error/10 hover:text-error"
                            onClick={() => handleRemoveSample(sample.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-hint/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <FileText className="w-8 h-8 text-hint" />
                    </div>
                    <h3 className="text-lg font-medium text-text-head mb-2">
                      No training samples yet
                    </h3>
                    <p className="text-text-body mb-6 max-w-md mx-auto">
                      Upload your past captions to help the AI learn your unique
                      writing style and voice.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <Button
                        variant="accent"
                        leftIcon={<Plus className="w-4 h-4" />}
                        onClick={() => setShowOnboarding(true)}
                      >
                        Start Setup Guide
                      </Button>
                      <Button
                        variant="outline"
                        leftIcon={<Upload className="w-4 h-4" />}
                      >
                        Upload Files
                      </Button>
                    </div>
                  </div>
                )}

                {uploadedCaptions >= 3 && (
                  <div className="mt-6 p-4 bg-accent/5 border border-accent/20 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
                          <Wand2 className="w-4 h-4 text-accent" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-text-head">
                            Ready to analyze your voice
                          </p>
                          <p className="text-xs text-text-body">
                            You have enough samples to train your brand voice
                          </p>
                        </div>
                      </div>
                      <Button
                        onClick={handleAnalyze}
                        loading={isAnalyzing}
                        variant="accent"
                        size="md"
                        leftIcon={<Wand2 className="w-4 h-4" />}
                      >
                        {isAnalyzing ? "Analyzing..." : "Analyze Voice"}
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Tone & Style Tab */}
        {activeTab === "tone" && (
          <div className="space-y-8">
            {/* Platform Selection */}
            <Card padding="none">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-accent" />
                  </div>
                  Primary Platform
                </CardTitle>
                <p className="text-sm text-text-body">
                  Select the platform where you post most of your content
                </p>
              </CardHeader>
              <CardContent>
                {isLoadingOptions ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="text-center">
                      <div className="w-8 h-8 border-3 border-border border-t-accent rounded-full animate-spin mx-auto mb-2" />
                      <p className="text-sm text-text-body">
                        Loading options...
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-3 gap-3">
                    {onboardingOptions.platforms.map((platform) => {
                      const isSelected = selectedPlatformId === platform.id;
                      const isMultiPlatform = platform.id === "multi";
                      return (
                        <button
                          key={platform.id}
                          onClick={() => handlePlatformChange(platform.id)}
                          className={`relative p-4 rounded-lg border border-border-alt transition-all duration-200 text-center group focus:outline-none focus:ring-2 focus:ring-accent/20 ${
                            isSelected
                              ? "border-accent bg-accent/5"
                              : "border-border bg-surface hover:border-border-alt hover:bg-section-light"
                          } ${isMultiPlatform ? "col-span-2" : ""}`}
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
                )}
              </CardContent>
            </Card>

            {/* Tone Selector */}
            <Card padding="none">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
                    <Target className="w-4 h-4 text-accent" />
                  </div>
                  Choose Your Voice Tone
                </CardTitle>
                <p className="text-sm text-text-body">
                  Select the tone that best represents your brand personality
                  and resonates with your audience
                </p>
              </CardHeader>
              <CardContent>
                {isLoadingOptions ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="text-center">
                      <div className="w-8 h-8 border-3 border-border border-t-accent rounded-full animate-spin mx-auto mb-2" />
                      <p className="text-sm text-text-body">
                        Loading options...
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {onboardingOptions.brandTones.map((tone) => (
                      <button
                        key={tone.id}
                        onClick={() => handleToneChange(tone.id)}
                        className={`group p-6 rounded-xl border-2 text-left transition-all duration-200 hover:scale-[1.02] ${
                          selectedToneId === tone.id
                            ? "border-accent bg-accent/5 shadow-lg shadow-accent/10"
                            : "border-border hover:border-accent/50 bg-surface hover:bg-accent/5"
                        }`}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <span className="text-3xl">{tone.emoji}</span>
                            <div>
                              <h3 className="font-semibold text-text-head text-sm">
                                {tone.name}
                              </h3>
                            </div>
                          </div>
                          {selectedToneId === tone.id && (
                            <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center">
                              <Check className="w-4 h-4 text-surface" />
                            </div>
                          )}
                        </div>
                        <p className="text-xs text-text-body mb-2">
                          {tone.description}
                        </p>
                        <p className="text-sm text-text-body italic leading-relaxed">
                          {tone.example}
                        </p>
                        {selectedToneId === tone.id && (
                          <div className="mt-3 pt-3 border-t border-accent/20">
                            <div className="flex items-center gap-2 text-xs text-accent font-medium">
                              <div className="w-2 h-2 bg-accent rounded-full"></div>
                              Currently selected
                            </div>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Content Type Selection */}
            <Card padding="none">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <FileText className="w-4 h-4 text-primary" />
                  </div>
                  Content Types
                </CardTitle>
                <p className="text-sm text-text-body">
                  Select all the content types you create or plan to create
                </p>
              </CardHeader>
              <CardContent>
                {isLoadingOptions ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="text-center">
                      <div className="w-8 h-8 border-3 border-border border-t-accent rounded-full animate-spin mx-auto mb-2" />
                      <p className="text-sm text-text-body">
                        Loading options...
                      </p>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                      {onboardingOptions.contentTypes.map((type) => {
                        const isSelected = selectedContentTypes.includes(
                          type.id
                        );
                        return (
                          <button
                            key={type.id}
                            onClick={() => handleContentTypeToggle(type.id)}
                            className={`px-3 py-2 rounded-lg border border-border-alt transition-all duration-200 font-medium text-sm flex items-center justify-center gap-1.5 focus:outline-none ${
                              isSelected
                                ? "border-accent bg-accent text-surface"
                                : "border-border bg-surface text-text-body hover:border-accent hover:bg-accent/5"
                            }`}
                          >
                            <span className="truncate">{type.name}</span>
                            {isSelected && (
                              <Check className="w-3 h-3 shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {selectedContentTypes.length > 0 && (
                      <div className="text-center mt-4">
                        <div className="text-xs text-text-body">
                          <span className="font-semibold text-accent">
                            {selectedContentTypes.length}
                          </span>{" "}
                          selected
                        </div>
                      </div>
                    )}
                  </>
                )}
              </CardContent>
            </Card>

            {/* Voice Settings Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Voice Strength Slider */}
              <Card padding="none">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 text-primary" />
                    </div>
                    Voice Strength
                  </CardTitle>
                  <p className="text-sm text-text-body">
                    How closely should captions match your training samples?
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-accent mb-2">
                        {voiceStrength}%
                      </div>
                      <div className="text-sm text-text-body">
                        {voiceStrength < 40
                          ? "Creative & Varied"
                          : voiceStrength < 70
                          ? "Balanced Approach"
                          : "Strictly Your Voice"}
                      </div>
                    </div>
                    <Slider
                      value={voiceStrength}
                      onChange={setVoiceStrength}
                      min={0}
                      max={100}
                    />
                    <div className="flex justify-between text-xs text-hint">
                      <span>More Creative</span>
                      <span>Balanced</span>
                      <span>More Consistent</span>
                    </div>
                    <div className="p-3 bg-section rounded-lg">
                      <p className="text-sm text-text-body">
                        {voiceStrength < 40
                          ? "AI will be more creative and vary from your samples"
                          : voiceStrength < 70
                          ? "Balanced mix of your voice and creative variations"
                          : "Captions will closely mirror your training samples"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Style Preferences */}
              <Card padding="none">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-accent" />
                    </div>
                    Style Preferences
                  </CardTitle>
                  <p className="text-sm text-text-body">
                    Customize how your captions are structured
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-section rounded-lg border border-border">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                          <span className="text-sm">❓</span>
                        </div>
                        <div>
                          <p className="font-medium text-text-head text-sm">
                            Use Questions
                          </p>
                          <p className="text-xs text-text-body">
                            End captions with engaging questions
                          </p>
                        </div>
                      </div>
                      <Switch
                        checked={stylePreferences.useQuestions}
                        onChange={(checked) =>
                          setStylePreferences((prev) => ({
                            ...prev,
                            useQuestions: checked,
                          }))
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-section rounded-lg border border-border">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
                          <span className="text-sm">😊</span>
                        </div>
                        <div>
                          <p className="font-medium text-text-head text-sm">
                            Include Emojis
                          </p>
                          <p className="text-xs text-text-body">
                            Add emojis to captions automatically
                          </p>
                        </div>
                      </div>
                      <Switch
                        checked={stylePreferences.includeEmojis}
                        onChange={(checked) =>
                          setStylePreferences((prev) => ({
                            ...prev,
                            includeEmojis: checked,
                          }))
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-section rounded-lg border border-border">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center">
                          <span className="text-sm">📢</span>
                        </div>
                        <div>
                          <p className="font-medium text-text-head text-sm">
                            Call-to-Action
                          </p>
                          <p className="text-xs text-text-body">
                            Always include a CTA in captions
                          </p>
                        </div>
                      </div>
                      <Switch
                        checked={stylePreferences.includeCTA}
                        onChange={(checked) =>
                          setStylePreferences((prev) => ({
                            ...prev,
                            includeCTA: checked,
                          }))
                        }
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Voice Preview */}
            <Card padding="none">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-info/10 rounded-lg flex items-center justify-center">
                    <FileText className="w-4 h-4 text-info" />
                  </div>
                  Voice Preview
                </CardTitle>
                <p className="text-sm text-text-body">
                  See how your current settings would generate a caption
                </p>
              </CardHeader>
              <CardContent>
                <div className="p-6 bg-section rounded-lg border border-border">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center shrink-0">
                      <span className="text-sm">
                        {selectedTone?.emoji || "✨"}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-text-head mb-1">
                        Sample Caption Preview
                      </p>
                      <p className="text-xs text-text-body">
                        Based on your{" "}
                        {selectedTone?.name.toLowerCase() || "tone"} tone and{" "}
                        {voiceStrength}% voice strength
                      </p>
                    </div>
                  </div>
                  <div className="p-4 bg-surface rounded-lg border border-border">
                    <p className="text-sm text-text-body italic">
                      "Excited to share something that's been on my mind lately!{" "}
                      {stylePreferences.includeEmojis ? "✨" : ""}
                      {stylePreferences.useQuestions
                        ? " What do you think about this approach?"
                        : ""}
                      {stylePreferences.includeCTA
                        ? " Let me know your thoughts in the comments below!"
                        : ""}
                      "
                    </p>
                  </div>
                  <div className="mt-4 flex items-center gap-2 text-xs text-hint flex-wrap">
                    <span>•</span>
                    <span>{selectedTone?.name.toLowerCase() || "tone"}</span>
                    <span>•</span>
                    <span>{voiceStrength}% voice strength</span>
                    <span>•</span>
                    <span>
                      {stylePreferences.includeEmojis
                        ? "With emojis"
                        : "No emojis"}
                    </span>
                    <span>•</span>
                    <span>
                      {stylePreferences.useQuestions
                        ? "With questions"
                        : "No questions"}
                    </span>
                    <span>•</span>
                    <span>
                      {stylePreferences.includeCTA ? "With CTA" : "No CTA"}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Voice Insights Tab */}
        {activeTab === "insights" && (
          <div className="space-y-8">
            {/* Voice Analysis Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Analysis Card */}
              <Card className="lg:col-span-2" padding="none">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <CardTitle>Voice Analysis</CardTitle>
                      <p className="text-sm text-text-body">
                        Based on {uploadedCaptions} uploaded captions
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Top Phrases */}
                    <div className="p-6 bg-section rounded-xl border border-border">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-6 h-6 bg-accent/10 rounded-lg flex items-center justify-center">
                          <span className="text-xs">💬</span>
                        </div>
                        <p className="text-sm font-medium text-text-head">
                          Signature Phrases
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {voiceInsights.topPhrases.map((phrase, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-accent/10 text-accent text-xs font-medium rounded-full hover:bg-accent/20 transition-colors cursor-default"
                          >
                            {phrase}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Emoji Usage */}
                    <div className="p-6 bg-section rounded-xl border border-border">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-6 h-6 bg-accent/10 rounded-lg flex items-center justify-center">
                          <span className="text-xs">😊</span>
                        </div>
                        <p className="text-sm font-medium text-text-head">
                          Emoji Usage
                        </p>
                      </div>
                      <p className="text-2xl font-bold text-text-head mb-1">
                        {voiceInsights.emojiUsage}
                      </p>
                      <p className="text-xs text-text-body">
                        Consistent emoji style detected
                      </p>
                    </div>

                    {/* Average Length */}
                    <div className="p-6 bg-section rounded-xl border border-border">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-6 h-6 bg-primary/10 rounded-lg flex items-center justify-center">
                          <span className="text-xs">📏</span>
                        </div>
                        <p className="text-sm font-medium text-text-head">
                          Average Length
                        </p>
                      </div>
                      <p className="text-2xl font-bold text-text-head mb-1">
                        {voiceInsights.avgLength}
                      </p>
                      <p className="text-xs text-text-body">
                        Optimal for engagement
                      </p>
                    </div>

                    {/* Question Frequency */}
                    <div className="p-6 bg-section rounded-xl border border-border">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-6 h-6 bg-info/10 rounded-lg flex items-center justify-center">
                          <span className="text-xs">❓</span>
                        </div>
                        <p className="text-sm font-medium text-text-head">
                          Question Frequency
                        </p>
                      </div>
                      <p className="text-2xl font-bold text-text-head mb-1">
                        {voiceInsights.questionFrequency}
                      </p>
                      <p className="text-xs text-text-body">
                        High engagement style
                      </p>
                    </div>
                  </div>

                  {/* CTA Style */}
                  <div className="mt-6 p-6 bg-section rounded-xl border border-border">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-6 h-6 bg-success/10 rounded-lg flex items-center justify-center">
                        <span className="text-xs">📢</span>
                      </div>
                      <p className="text-sm font-medium text-text-head">
                        Call-to-Action Style
                      </p>
                    </div>
                    <p className="text-lg font-semibold text-text-head mb-2">
                      {voiceInsights.ctaStyle}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-success/10 text-success text-xs font-medium rounded-full">
                        "Let me know below"
                      </span>
                      <span className="px-3 py-1 bg-success/10 text-success text-xs font-medium rounded-full">
                        "Drop a comment"
                      </span>
                      <span className="px-3 py-1 bg-success/10 text-success text-xs font-medium rounded-full">
                        "Tell me your thoughts"
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Voice Strength Indicator */}
              <Card padding="none">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Target className="w-4 h-4 text-primary" />
                    </div>
                    Voice Strength
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="w-24 h-24 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-accent">
                        {Math.round((uploadedCaptions / 10) * 100)}%
                      </span>
                    </div>
                    <p className="text-sm font-medium text-text-head mb-2">
                      Training Quality
                    </p>
                    <p className="text-xs text-text-body mb-4">
                      {uploadedCaptions < 3
                        ? "Getting started - add more samples"
                        : uploadedCaptions < 7
                        ? "Good progress - almost there"
                        : "Excellent - well trained voice"}
                    </p>
                    <div className="w-full bg-section rounded-full h-2 mb-2">
                      <div
                        className="bg-accent h-2 rounded-full transition-all duration-300"
                        style={{
                          width: `${Math.min(
                            (uploadedCaptions / 10) * 100,
                            100
                          )}%`,
                        }}
                      ></div>
                    </div>
                    <p className="text-xs text-hint">
                      {uploadedCaptions}/10 samples
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Voice Recommendations */}
            <Card padding="none">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-info/10 rounded-lg flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-info" />
                  </div>
                  AI Recommendations
                </CardTitle>
                <p className="text-sm text-text-body">
                  Personalized suggestions to improve your brand voice
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="p-4 bg-success/10 border border-success/20 rounded-xl">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-success/20 rounded-lg flex items-center justify-center shrink-0">
                        <Check className="w-4 h-4 text-success" />
                      </div>
                      <div>
                        <p className="font-medium text-success mb-1 text-sm">
                          Strong Voice Consistency
                        </p>
                        <p className="text-xs text-success/80">
                          Your captions maintain a clear conversational tone
                          across platforms
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-info/10 border border-info/20 rounded-xl">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-info/20 rounded-lg flex items-center justify-center shrink-0">
                        <AlertCircle className="w-4 h-4 text-info" />
                      </div>
                      <div>
                        <p className="font-medium text-info mb-1 text-sm">
                          Add LinkedIn Content
                        </p>
                        <p className="text-xs text-info/80">
                          Upload 3-5 LinkedIn posts to improve professional
                          voice matching
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-accent/10 border border-accent/20 rounded-xl">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-accent/20 rounded-lg flex items-center justify-center shrink-0">
                        <Sparkles className="w-4 h-4 text-accent" />
                      </div>
                      <div>
                        <p className="font-medium text-accent mb-1 text-sm">
                          Vary Caption Length
                        </p>
                        <p className="text-xs text-accent/80">
                          Experiment with longer storytelling formats
                          occasionally
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-warning/10 border border-warning/20 rounded-xl">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-warning/20 rounded-lg flex items-center justify-center shrink-0">
                        <TrendingUp className="w-4 h-4 text-warning" />
                      </div>
                      <div>
                        <p className="font-medium text-warning mb-1 text-sm">
                          Add More Samples
                        </p>
                        <p className="text-xs text-warning/80">
                          Upload {10 - uploadedCaptions} more captions for
                          optimal results
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-primary/10 border border-primary/20 rounded-xl">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center shrink-0">
                        <Target className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-primary mb-1 text-sm">
                          Platform Diversity
                        </p>
                        <p className="text-xs text-primary/80">
                          Add samples from different social platforms for better
                          adaptation
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-success/10 border border-success/20 rounded-xl">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-success/20 rounded-lg flex items-center justify-center shrink-0">
                        <Zap className="w-4 h-4 text-success" />
                      </div>
                      <div>
                        <p className="font-medium text-success mb-1 text-sm">
                          Great Engagement
                        </p>
                        <p className="text-xs text-success/80">
                          Your question frequency of 60% drives excellent
                          audience interaction
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

const BrandVoicePage = () => {
  return (
    <ToastProvider>
      <BrandVoiceContent />
    </ToastProvider>
  );
};

export default BrandVoicePage;
