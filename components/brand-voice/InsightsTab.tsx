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

    // Generate dynamic recommendations based on actual data
    const getRecommendations = () => {
      const recommendations: Array<{
        icon: React.ReactNode;
        title: string;
        description: string;
        variant: "success" | "info" | "accent" | "warning" | "primary";
      }> = [];

      // Check if voice has been analyzed
      if (!voiceInsights.tone) {
        recommendations.push({
          icon: <Sparkles className="w-4 h-4 text-accent" />,
          title: "Analyze Your Voice",
          description:
            "Click 'Analyze Voice' to get AI-powered insights about your writing style",
          variant: "accent",
        });
      }

      // Check sample count
      if (uploadedCaptions < MAX_SAMPLES) {
        recommendations.push({
          icon: <TrendingUp className="w-4 h-4 text-warning" />,
          title: "Add More Samples",
          description: `Upload ${samplesRemaining} more caption${
            samplesRemaining !== 1 ? "s" : ""
          } for optimal AI training results`,
          variant: "warning",
        });
      } else {
        recommendations.push({
          icon: <Check className="w-4 h-4 text-success" />,
          title: "Excellent Sample Size",
          description:
            "You have enough samples for high-quality voice analysis",
          variant: "success",
        });
      }

      // Check emoji usage
      if (voiceInsights.emojiUsage) {
        const emojiLower = voiceInsights.emojiUsage.toLowerCase();
        if (emojiLower.includes("none") || emojiLower.includes("minimal")) {
          recommendations.push({
            icon: <Sparkles className="w-4 h-4 text-info" />,
            title: "Consider Adding Emojis",
            description:
              "Emojis can increase engagement by up to 48% on social media",
            variant: "info",
          });
        } else if (emojiLower.includes("heavy") || emojiLower.includes("5+")) {
          recommendations.push({
            icon: <AlertCircle className="w-4 h-4 text-info" />,
            title: "Emoji Balance",
            description:
              "Your heavy emoji use is distinctive - ensure it aligns with your brand",
            variant: "info",
          });
        } else {
          recommendations.push({
            icon: <Check className="w-4 h-4 text-success" />,
            title: "Balanced Emoji Usage",
            description:
              "Your emoji usage strikes a good balance for engagement",
            variant: "success",
          });
        }
      }

      // Check question frequency
      if (voiceInsights.questionFrequency) {
        const freqLower = voiceInsights.questionFrequency.toLowerCase();
        const hasPercentage = freqLower.match(/(\d+)%/);

        if (hasPercentage) {
          const percentage = parseInt(hasPercentage[1]);
          if (percentage > 50) {
            recommendations.push({
              icon: <Zap className="w-4 h-4 text-success" />,
              title: "Great Engagement Strategy",
              description: `Your ${percentage}% question rate drives excellent audience interaction`,
              variant: "success",
            });
          } else if (percentage < 20) {
            recommendations.push({
              icon: <Target className="w-4 h-4 text-info" />,
              title: "Boost Engagement",
              description:
                "Try adding more questions to encourage audience interaction",
              variant: "info",
            });
          }
        } else if (
          freqLower.includes("rarely") ||
          freqLower.includes("seldom")
        ) {
          recommendations.push({
            icon: <Target className="w-4 h-4 text-info" />,
            title: "Boost Engagement",
            description:
              "Try adding more questions to encourage audience interaction",
            variant: "info",
          });
        }
      }

      // Check caption length
      if (voiceInsights.avgLength) {
        const lengthLower = voiceInsights.avgLength.toLowerCase();
        const hasNumbers = lengthLower.match(/(\d+)/);

        if (hasNumbers) {
          const length = parseInt(hasNumbers[0]);
          if (length < 80) {
            recommendations.push({
              icon: <AlertCircle className="w-4 h-4 text-info" />,
              title: "Consider Longer Captions",
              description:
                "Longer captions (100-150 chars) often perform better for storytelling",
              variant: "info",
            });
          } else if (length > 200) {
            recommendations.push({
              icon: <AlertCircle className="w-4 h-4 text-info" />,
              title: "Caption Length Balance",
              description:
                "Mix in some shorter captions for variety and quick engagement",
              variant: "info",
            });
          } else {
            recommendations.push({
              icon: <Check className="w-4 h-4 text-success" />,
              title: "Optimal Caption Length",
              description: "Your caption length is perfect for engagement",
              variant: "success",
            });
          }
        }
      }

      // Check diversity of themes
      if (voiceInsights.keyThemes && voiceInsights.keyThemes.length > 0) {
        if (voiceInsights.keyThemes.length === 1) {
          recommendations.push({
            icon: <Target className="w-4 h-4 text-primary" />,
            title: "Diversify Your Content",
            description:
              "Consider exploring related themes to reach a broader audience",
            variant: "primary",
          });
        } else if (voiceInsights.keyThemes.length >= 3) {
          recommendations.push({
            icon: <Check className="w-4 h-4 text-success" />,
            title: "Great Theme Diversity",
            description:
              "Your varied content themes help reach different audience segments",
            variant: "success",
          });
        }
      }

      // Training quality recommendation
      if (uploadedCaptions >= 7 && voiceInsights.tone) {
        recommendations.push({
          icon: <Check className="w-4 h-4 text-success" />,
          title: "Strong Voice Consistency",
          description:
            "Your captions maintain a clear, consistent voice across all samples",
          variant: "success",
        });
      }

      // Limit to 6 recommendations max
      return recommendations.slice(0, 6);
    };

    const dynamicRecommendations = getRecommendations();

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
            {dynamicRecommendations.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {dynamicRecommendations.map((rec, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-xl border ${
                      rec.variant === "success"
                        ? "bg-success/10 border-success/20"
                        : rec.variant === "info"
                        ? "bg-info/10 border-info/20"
                        : rec.variant === "accent"
                        ? "bg-accent/10 border-accent/20"
                        : rec.variant === "warning"
                        ? "bg-warning/10 border-warning/20"
                        : "bg-primary/10 border-primary/20"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                          rec.variant === "success"
                            ? "bg-success/20"
                            : rec.variant === "info"
                            ? "bg-info/20"
                            : rec.variant === "accent"
                            ? "bg-accent/20"
                            : rec.variant === "warning"
                            ? "bg-warning/20"
                            : "bg-primary/20"
                        }`}
                      >
                        {rec.icon}
                      </div>
                      <div>
                        <p
                          className={`font-medium mb-1 text-sm ${
                            rec.variant === "success"
                              ? "text-success"
                              : rec.variant === "info"
                              ? "text-info"
                              : rec.variant === "accent"
                              ? "text-accent"
                              : rec.variant === "warning"
                              ? "text-warning"
                              : "text-primary"
                          }`}
                        >
                          {rec.title}
                        </p>
                        <p
                          className={`text-xs ${
                            rec.variant === "success"
                              ? "text-success/80"
                              : rec.variant === "info"
                              ? "text-info/80"
                              : rec.variant === "accent"
                              ? "text-accent/80"
                              : rec.variant === "warning"
                              ? "text-warning/80"
                              : "text-primary/80"
                          }`}
                        >
                          {rec.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-hint/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-hint" />
                </div>
                <h3 className="text-lg font-medium text-text-head mb-2">
                  Upload samples to get recommendations
                </h3>
                <p className="text-text-body max-w-md mx-auto">
                  Add training samples and analyze your voice to receive
                  personalized recommendations.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }
);

InsightsTab.displayName = "InsightsTab";
