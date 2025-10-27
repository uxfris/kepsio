import React from "react";
import { Check, Sparkles, Target, FileText, TrendingUp } from "lucide-react";
import { SocialIcon } from "react-social-icons";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/Card";
import { Slider } from "../ui/Slider";
import { Switch } from "../ui/Switch";
import { LoadingSpinner } from "./LoadingSpinner";
import type {
  OnboardingOptions,
  StylePreferences,
} from "../../types/brand-voice";

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
    onStylePreferencesChange,
  }) => {
    const selectedTone = onboardingOptions.brandTones.find(
      (t) => t.id === selectedToneId
    );

    const getVoiceStrengthLabel = (strength: number) => {
      if (strength < 40) return "Creative & Varied";
      if (strength < 70) return "Balanced Approach";
      return "Strictly Your Voice";
    };

    const getVoiceStrengthDescription = (strength: number) => {
      if (strength < 40)
        return "AI will be more creative and vary from your samples";
      if (strength < 70)
        return "Balanced mix of your voice and creative variations";
      return "Captions will closely mirror your training samples";
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
            <div className="p-6 bg-section rounded-lg border border-border">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center shrink-0">
                  <span className="text-sm">{selectedTone?.emoji || "✨"}</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-text-head mb-1">
                    Sample Caption Preview
                  </p>
                  <p className="text-xs text-text-body">
                    Based on your {selectedTone?.name.toLowerCase() || "tone"}{" "}
                    tone and {voiceStrength}% voice strength
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
                  {stylePreferences.includeEmojis ? "With emojis" : "No emojis"}
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
    );
  }
);

ToneTab.displayName = "ToneTab";
