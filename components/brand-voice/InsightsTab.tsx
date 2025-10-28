import React from "react";
import {
  TrendingUp,
  Sparkles,
  Target,
  Check,
  AlertCircle,
  Zap,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/Card";
import { VoiceStatCard } from "./VoiceStatCard";
import type { VoiceInsights } from "../../types/brand-voice";
import { MAX_SAMPLES } from "../../lib/constants/brand-voice";

interface InsightsTabProps {
  uploadedCaptions: number;
  voiceInsights: VoiceInsights;
}

const RECOMMENDATIONS = [
  {
    icon: <Check className="w-4 h-4 text-success" />,
    title: "Strong Voice Consistency",
    description:
      "Your captions maintain a clear conversational tone across platforms",
    variant: "success" as const,
  },
  {
    icon: <AlertCircle className="w-4 h-4 text-info" />,
    title: "Add LinkedIn Content",
    description:
      "Upload 3-5 LinkedIn posts to improve professional voice matching",
    variant: "info" as const,
  },
  {
    icon: <Sparkles className="w-4 h-4 text-accent" />,
    title: "Vary Caption Length",
    description: "Experiment with longer storytelling formats occasionally",
    variant: "accent" as const,
  },
  {
    icon: <TrendingUp className="w-4 h-4 text-warning" />,
    title: "Add More Samples",
    description: (samplesRemaining: number) =>
      `Upload ${samplesRemaining} more captions for optimal results`,
    variant: "warning" as const,
  },
  {
    icon: <Target className="w-4 h-4 text-primary" />,
    title: "Platform Diversity",
    description:
      "Add samples from different social platforms for better adaptation",
    variant: "primary" as const,
  },
  {
    icon: <Zap className="w-4 h-4 text-success" />,
    title: "Great Engagement",
    description:
      "Your question frequency of 60% drives excellent audience interaction",
    variant: "success" as const,
  },
];

export const InsightsTab: React.FC<InsightsTabProps> = React.memo(
  ({ uploadedCaptions, voiceInsights }) => {
    const trainingQuality = Math.round((uploadedCaptions / MAX_SAMPLES) * 100);
    const samplesRemaining = MAX_SAMPLES - uploadedCaptions;

    const getQualityLabel = () => {
      if (uploadedCaptions < 3) return "Getting started - add more samples";
      if (uploadedCaptions < 7) return "Good progress - almost there";
      return "Excellent - well trained voice";
    };

    return (
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
              {/* Overall Tone - Show if available from OpenAI */}
              {voiceInsights.tone && (
                <div className="mb-6 p-6 bg-primary/5 rounded-xl border border-primary/20">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 bg-primary/10 rounded-lg flex items-center justify-center">
                      <span className="text-xs">🎯</span>
                    </div>
                    <p className="text-sm font-medium text-text-head">
                      Overall Tone
                    </p>
                  </div>
                  <p className="text-lg font-semibold text-text-head">
                    {voiceInsights.tone}
                  </p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Signature Phrases */}
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
                    {voiceInsights.topPhrases?.map((phrase, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-accent/10 text-accent text-xs font-medium rounded-full hover:bg-accent/20 transition-colors cursor-default"
                      >
                        {phrase}
                      </span>
                    ))}
                  </div>
                </div>

                <VoiceStatCard
                  icon="😊"
                  title="Emoji Usage"
                  value={voiceInsights.emojiUsage}
                  subtitle="Consistent emoji style detected"
                  variant="accent"
                />

                <VoiceStatCard
                  icon="📏"
                  title="Average Length"
                  value={voiceInsights.avgLength}
                  subtitle="Optimal for engagement"
                  variant="primary"
                />

                <VoiceStatCard
                  icon="❓"
                  title="Question Frequency"
                  value={voiceInsights.questionFrequency}
                  subtitle="High engagement style"
                  variant="info"
                />
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
              </div>

              {/* Key Themes - Show if available from OpenAI */}
              {voiceInsights.keyThemes &&
                voiceInsights.keyThemes.length > 0 && (
                  <div className="mt-6 p-6 bg-section rounded-xl border border-border">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-6 h-6 bg-info/10 rounded-lg flex items-center justify-center">
                        <span className="text-xs">📚</span>
                      </div>
                      <p className="text-sm font-medium text-text-head">
                        Key Themes
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {voiceInsights.keyThemes.map((theme, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-info/10 text-info text-xs font-medium rounded-full"
                        >
                          {theme}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

              {/* Additional Insights Grid */}
              {(voiceInsights.sentenceStructure ||
                voiceInsights.vocabularyStyle ||
                voiceInsights.uniqueCharacteristics) && (
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  {voiceInsights.sentenceStructure && (
                    <div className="p-6 bg-section rounded-xl border border-border">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-6 h-6 bg-warning/10 rounded-lg flex items-center justify-center">
                          <span className="text-xs">📝</span>
                        </div>
                        <p className="text-sm font-medium text-text-head">
                          Sentence Structure
                        </p>
                      </div>
                      <p className="text-sm text-text-body">
                        {voiceInsights.sentenceStructure}
                      </p>
                    </div>
                  )}

                  {voiceInsights.vocabularyStyle && (
                    <div className="p-6 bg-section rounded-xl border border-border">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-6 h-6 bg-accent/10 rounded-lg flex items-center justify-center">
                          <span className="text-xs">📖</span>
                        </div>
                        <p className="text-sm font-medium text-text-head">
                          Vocabulary Style
                        </p>
                      </div>
                      <p className="text-sm text-text-body">
                        {voiceInsights.vocabularyStyle}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Unique Characteristics - Highlight Box */}
              {voiceInsights.uniqueCharacteristics && (
                <div className="mt-6 p-6 bg-accent/5 rounded-xl border border-accent/20">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 bg-accent/10 rounded-lg flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-accent" />
                    </div>
                    <p className="text-sm font-medium text-text-head">
                      What Makes Your Voice Unique
                    </p>
                  </div>
                  <p className="text-sm text-text-body leading-relaxed">
                    {voiceInsights.uniqueCharacteristics}
                  </p>
                </div>
              )}
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
                    {trainingQuality}%
                  </span>
                </div>
                <p className="text-sm font-medium text-text-head mb-2">
                  Training Quality
                </p>
                <p className="text-xs text-text-body mb-4">
                  {getQualityLabel()}
                </p>
                <div className="w-full bg-section rounded-full h-2 mb-2">
                  <div
                    className="bg-accent h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${Math.min(trainingQuality, 100)}%`,
                    }}
                  ></div>
                </div>
                <p className="text-xs text-hint">
                  {uploadedCaptions}/{MAX_SAMPLES} samples
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
              {RECOMMENDATIONS.map((rec, index) => {
                const description =
                  typeof rec.description === "function"
                    ? rec.description(samplesRemaining)
                    : rec.description;

                return (
                  <div
                    key={index}
                    className={`p-4 bg-${rec.variant}/10 border border-${rec.variant}/20 rounded-xl`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-8 h-8 bg-${rec.variant}/20 rounded-lg flex items-center justify-center shrink-0`}
                      >
                        {rec.icon}
                      </div>
                      <div>
                        <p
                          className={`font-medium text-${rec.variant} mb-1 text-sm`}
                        >
                          {rec.title}
                        </p>
                        <p className={`text-xs text-${rec.variant}/80`}>
                          {description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
);

InsightsTab.displayName = "InsightsTab";
