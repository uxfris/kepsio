import React, { useState } from "react";
import {
  Check,
  Sparkles,
  Target,
  FileText,
  TrendingUp,
  Wand2,
  Zap,
} from "lucide-react";
import { SocialIcon } from "react-social-icons";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/Card";
import { Slider } from "../ui/Slider";
import { Switch } from "../ui/Switch";
import { Button } from "../ui/Button";
import { SegmentedControl } from "../ui/SegmentedControl";
import { LoadingSpinner } from "./LoadingSpinner";
import {
  generateInstantPreview,
  getVoiceStrengthLabel,
  getVoiceStrengthDescription,
} from "@/lib/utils/voice-preview";
import type {
  OnboardingOptions,
  StylePreferences,
} from "../../types/brand-voice";

type PreviewMode = "instant" | "ai";

interface ToneTabProps {
  onboardingOptions: OnboardingOptions;
  selectedPlatformId: string;
  selectedToneId: string;
  selectedContentTypes: string[];
  voiceStrength: number;
  stylePreferences: StylePreferences;
  isLoading: boolean;
  onPlatformChange: (platformId: string) => void;
  onToneChange: (toneId: string) => void;
  onContentTypeToggle: (typeId: string) => void;
  onVoiceStrengthChange: (value: number) => void;
  onVoiceStrengthChangeComplete?: (value: number) => void; // Called when dragging ends
  onStylePreferencesChange: (preferences: StylePreferences) => void;
}

export const ToneTab: React.FC<ToneTabProps> = React.memo(
  ({
    onboardingOptions,
    selectedPlatformId,
    selectedToneId,
    selectedContentTypes,
    voiceStrength,
    stylePreferences,
    isLoading,
    onPlatformChange,
    onToneChange,
    onContentTypeToggle,
    onVoiceStrengthChange,
    onVoiceStrengthChangeComplete,
    onStylePreferencesChange,
  }) => {
    // State for preview mode toggle
    const [previewMode, setPreviewMode] = useState<PreviewMode>("instant");

    // State for AI preview
    const [aiPreview, setAiPreview] = useState<string | null>(null);
    const [isGeneratingAI, setIsGeneratingAI] = useState(false);
    const [aiError, setAiError] = useState<string | null>(null);

    const selectedTone = onboardingOptions.brandTones.find(
      (t) => t.id === selectedToneId
    );

    const selectedPlatform = onboardingOptions.platforms.find(
      (p) => p.id === selectedPlatformId
    );

    const selectedContentType =
      selectedContentTypes.length > 0
        ? onboardingOptions.contentTypes.find(
            (ct) => ct.id === selectedContentTypes[0]
          )
        : null;

    // Generate instant preview using utility function
    const instantPreview = generateInstantPreview({
      toneName: selectedTone?.name || "Casual & Friendly",
      platformName: selectedPlatform?.name || "Instagram",
      contentTypeName: selectedContentType?.name,
      voiceStrength,
      stylePreferences,
    });

    // Handle AI preview generation
    const handleGenerateAIPreview = async () => {
      setIsGeneratingAI(true);
      setAiError(null);

      try {
        const response = await fetch("/api/brand-voice/preview", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            platformName: selectedPlatform?.name || "Instagram",
            toneName: selectedTone?.name || "Casual & Friendly",
            contentTypeName: selectedContentType?.name || "General",
            voiceStrength,
            stylePreferences,
          }),
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || "Failed to generate preview");
        }

        const data = await response.json();
        setAiPreview(data.preview);
      } catch (error) {
        console.error("Error generating AI preview:", error);
        setAiError(
          error instanceof Error
            ? error.message
            : "Failed to generate AI preview. Please try again."
        );
      } finally {
        setIsGeneratingAI(false);
      }
    };

    return (
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
            {isLoading ? (
              <LoadingSpinner message="Loading options..." />
            ) : (
              <div className="grid grid-cols-3 gap-3">
                {onboardingOptions.platforms.map((platform) => {
                  const isSelected = selectedPlatformId === platform.id;
                  const isMultiPlatform = platform.id === "multi";
                  return (
                    <button
                      key={platform.id}
                      onClick={() => onPlatformChange(platform.id)}
                      className={`relative p-4 rounded-lg border transition-all duration-200 text-center group focus:outline-none focus:ring-2 focus:ring-accent/20 ${
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
              Select the tone that best represents your brand personality and
              resonates with your audience
            </p>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <LoadingSpinner message="Loading options..." />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {onboardingOptions.brandTones.map((tone) => (
                  <button
                    key={tone.id}
                    onClick={() => onToneChange(tone.id)}
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
            {isLoading ? (
              <LoadingSpinner message="Loading options..." />
            ) : (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                  {onboardingOptions.contentTypes.map((type) => {
                    const isSelected = selectedContentTypes.includes(type.id);
                    return (
                      <button
                        key={type.id}
                        onClick={() => onContentTypeToggle(type.id)}
                        className={`px-3 py-2 rounded-lg border transition-all duration-200 font-medium text-sm flex items-center justify-center gap-1.5 focus:outline-none ${
                          isSelected
                            ? "border-accent bg-accent text-surface"
                            : "border-border bg-surface text-text-body hover:border-accent hover:bg-accent/5"
                        }`}
                      >
                        <span className="truncate">{type.name}</span>
                        {isSelected && <Check className="w-3 h-3 shrink-0" />}
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
                    {getVoiceStrengthLabel(voiceStrength)}
                  </div>
                </div>
                <Slider
                  value={voiceStrength}
                  onChange={onVoiceStrengthChange}
                  onChangeComplete={onVoiceStrengthChangeComplete}
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
                    {getVoiceStrengthDescription(voiceStrength)}
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
                {[
                  {
                    key: "useQuestions" as const,
                    emoji: "❓",
                    title: "Use Questions",
                    description: "End captions with engaging questions",
                    variant: "primary" as const,
                  },
                  {
                    key: "includeEmojis" as const,
                    emoji: "😊",
                    title: "Include Emojis",
                    description: "Add emojis to captions automatically",
                    variant: "accent" as const,
                  },
                  {
                    key: "includeCTA" as const,
                    emoji: "📢",
                    title: "Call-to-Action",
                    description: "Always include a CTA in captions",
                    variant: "success" as const,
                  },
                ].map(({ key, emoji, title, description, variant }) => (
                  <div
                    key={key}
                    className="flex items-center justify-between p-4 bg-section rounded-lg border border-border"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 bg-${variant}/10 rounded-lg flex items-center justify-center`}
                      >
                        <span className="text-sm">{emoji}</span>
                      </div>
                      <div>
                        <p className="font-medium text-text-head text-sm">
                          {title}
                        </p>
                        <p className="text-xs text-text-body">{description}</p>
                      </div>
                    </div>
                    <Switch
                      checked={stylePreferences[key]}
                      onChange={(checked) =>
                        onStylePreferencesChange({
                          ...stylePreferences,
                          [key]: checked,
                        })
                      }
                    />
                  </div>
                ))}
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
            {/* Preview Mode Toggle */}
            <div className="mb-6">
              <SegmentedControl
                value={previewMode}
                onChange={(value) => setPreviewMode(value as PreviewMode)}
                options={[
                  {
                    value: "instant",
                    label: "Instant Preview",
                    icon: <Zap className="w-4 h-4" />,
                  },
                  {
                    value: "ai",
                    label: "AI Preview",
                    icon: <Wand2 className="w-4 h-4" />,
                  },
                ]}
              />
            </div>

            {/* Instant Preview Mode */}
            {previewMode === "instant" && (
              <div className="p-6 bg-section rounded-lg border border-border">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center shrink-0">
                    <span className="text-lg">
                      {selectedTone?.emoji || "✨"}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-text-head mb-1 flex items-center gap-2">
                      <Zap className="w-4 h-4 text-accent" />
                      Instant Preview
                    </p>
                    <p className="text-xs text-text-body">
                      {selectedPlatform?.name || "Platform"} •{" "}
                      {selectedTone?.name || "Tone"} • {voiceStrength}% strength
                    </p>
                  </div>
                  <div className="px-3 py-1 bg-accent/10 rounded-full">
                    <span className="text-xs font-medium text-accent">
                      {getVoiceStrengthLabel(voiceStrength)}
                    </span>
                  </div>
                </div>

                <div className="p-4 bg-surface rounded-lg border border-border mb-4">
                  <p className="text-sm text-text-body leading-relaxed whitespace-pre-line">
                    {instantPreview}
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
                  <div className="flex items-center gap-1.5 text-xs text-text-body">
                    <Sparkles className="w-3 h-3 text-accent" />
                    <span>{selectedTone?.name || "Tone"}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-text-body">
                    <Target className="w-3 h-3 text-primary" />
                    <span>{selectedPlatform?.name || "Platform"}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-text-body">
                    <FileText className="w-3 h-3 text-info" />
                    <span>{selectedContentType?.name || "General"}</span>
                  </div>
                  {stylePreferences.includeEmojis && (
                    <div className="flex items-center gap-1.5 text-xs text-accent">
                      <Check className="w-3 h-3" />
                      <span>Emojis</span>
                    </div>
                  )}
                  {stylePreferences.useQuestions && (
                    <div className="flex items-center gap-1.5 text-xs text-accent">
                      <Check className="w-3 h-3" />
                      <span>Questions</span>
                    </div>
                  )}
                  {stylePreferences.includeCTA && (
                    <div className="flex items-center gap-1.5 text-xs text-accent">
                      <Check className="w-3 h-3" />
                      <span>CTA</span>
                    </div>
                  )}
                </div>

                <div className="p-3 bg-info/5 border border-info/20 rounded-lg">
                  <p className="text-xs text-info leading-relaxed">
                    💡 <span className="font-medium">Instant:</span> This
                    preview updates in real-time as you change settings. No API
                    calls, no cost.
                  </p>
                </div>
              </div>
            )}

            {/* AI Preview Mode */}
            {previewMode === "ai" && (
              <div className="p-6 bg-linear-to-br from-accent/5 to-primary/5 rounded-lg border-2 border-accent/20">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 bg-linear-to-br from-accent to-primary rounded-lg flex items-center justify-center shrink-0">
                    <Wand2 className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-text-head mb-1 flex items-center gap-2">
                      <Wand2 className="w-4 h-4 text-accent" />
                      AI-Powered Preview
                    </p>
                    <p className="text-xs text-text-body">
                      Authentic preview using your training samples
                    </p>
                  </div>
                </div>

                {aiPreview && !isGeneratingAI && (
                  <div className="p-4 bg-surface rounded-lg border border-accent/20 mb-4">
                    <p className="text-sm text-text-body leading-relaxed whitespace-pre-line">
                      {aiPreview}
                    </p>
                  </div>
                )}

                {isGeneratingAI && (
                  <div className="p-6 bg-surface rounded-lg border border-accent/20 mb-4 flex items-center justify-center">
                    <LoadingSpinner message="Generating AI preview..." />
                  </div>
                )}

                {aiError && (
                  <div className="p-4 bg-error/10 border border-error/20 rounded-lg mb-4">
                    <p className="text-sm text-error">{aiError}</p>
                  </div>
                )}

                <Button
                  onClick={handleGenerateAIPreview}
                  disabled={isGeneratingAI}
                  variant="primary"
                  className="w-full mb-4"
                >
                  <Wand2 className="w-4 h-4 mr-2" />
                  {isGeneratingAI
                    ? "Generating..."
                    : aiPreview
                    ? "Regenerate AI Preview"
                    : "Generate AI Preview"}
                </Button>

                <div className="p-3 bg-warning/5 border border-warning/20 rounded-lg">
                  <p className="text-xs text-warning leading-relaxed">
                    ⚡ <span className="font-medium">AI Preview:</span>{" "}
                    Generates real captions using your training samples.
                    Requires at least 3 uploaded samples.
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }
);

ToneTab.displayName = "ToneTab";
