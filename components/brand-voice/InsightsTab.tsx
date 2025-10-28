import React from "react";
import {
  TrendingUp,
  Sparkles,
  Target,
  Check,
  AlertCircle,
  Zap,
  AlertTriangle,
  BarChart3,
  TrendingDown,
  CheckCircle2,
  Lightbulb,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/Card";
import { VoiceStatCard } from "./VoiceStatCard";
import type { VoiceInsights } from "../../types/brand-voice";
import { MAX_SAMPLES } from "../../lib/constants/brand-voice";

interface InsightsTabProps {
  uploadedCaptions: number;
  voiceInsights: VoiceInsights | null;
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

    // Get contextual voice strength state
    const getVoiceStrength = () => {
      const isAnalyzed =
        voiceInsights &&
        (voiceInsights.tone || voiceInsights.topPhrases?.length > 0);

      // No samples yet
      if (uploadedCaptions === 0) {
        return {
          percentage: 0,
          color: "error",
          bgColor: "bg-error/10",
          barColor: "bg-error",
          textColor: "text-error",
          icon: <AlertTriangle className="w-5 h-5 text-error" />,
          title: "Not Started",
          description: "Upload training samples to begin",
          action: "Add your first caption to train your voice",
        };
      }

      // Has samples but not analyzed
      if (!isAnalyzed) {
        if (uploadedCaptions < 3) {
          return {
            percentage: trainingQuality,
            color: "warning",
            bgColor: "bg-warning/10",
            barColor: "bg-warning",
            textColor: "text-warning",
            icon: <BarChart3 className="w-5 h-5 text-warning" />,
            title: "Getting Started",
            description: `${samplesRemaining} more samples recommended`,
            action: "Add more samples for better analysis",
          };
        } else if (uploadedCaptions < 7) {
          return {
            percentage: trainingQuality,
            color: "info",
            bgColor: "bg-info/10",
            barColor: "bg-info",
            textColor: "text-info",
            icon: <TrendingUp className="w-5 h-5 text-info" />,
            title: "Good Progress",
            description: `${samplesRemaining} more for optimal results`,
            action: "Ready to analyze - or add more samples",
          };
        } else {
          return {
            percentage: trainingQuality,
            color: "primary",
            bgColor: "bg-primary/10",
            barColor: "bg-primary",
            textColor: "text-primary",
            icon: <Check className="w-5 h-5 text-primary" />,
            title: "Ready to Analyze",
            description: "Excellent sample size",
            action: "Click 'Analyze Voice' to unlock insights",
          };
        }
      }

      // Analyzed with good samples
      if (uploadedCaptions >= 7) {
        return {
          percentage: 100,
          color: "success",
          bgColor: "bg-success/10",
          barColor: "bg-success",
          textColor: "text-success",
          icon: <CheckCircle2 className="w-5 h-5 text-success" />,
          title: "Fully Trained",
          description: "Voice is well-trained and ready",
          action: "Your AI voice is generating great content",
        };
      }

      // Analyzed but could use more samples
      return {
        percentage: Math.min(trainingQuality + 20, 100), // Bonus for being analyzed
        color: "accent",
        bgColor: "bg-accent/10",
        barColor: "bg-accent",
        textColor: "text-accent",
        icon: <Lightbulb className="w-5 h-5 text-accent" />,
        title: "Voice Active",
        description: `Add ${samplesRemaining} more for better accuracy`,
        action: "Voice analyzed - more samples will improve it",
      };
    };

    const voiceStrength = getVoiceStrength();

    // Generate dynamic recommendations based on actual data
    const getRecommendations = () => {
      const recommendations: Array<{
        icon: React.ReactNode;
        title: string;
        description: string;
        variant: "success" | "info" | "accent" | "warning" | "primary";
      }> = [];

      // Check if voice has been analyzed
      if (!voiceInsights || !voiceInsights.tone) {
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
      if (voiceInsights?.emojiUsage) {
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
      if (voiceInsights?.questionFrequency) {
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
      if (voiceInsights?.avgLength) {
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
      if (voiceInsights?.keyThemes && voiceInsights.keyThemes.length > 0) {
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
      if (uploadedCaptions >= 7 && voiceInsights?.tone) {
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

    // Check if voice has been analyzed
    const hasAnalysis =
      voiceInsights &&
      (voiceInsights.tone || voiceInsights.topPhrases?.length > 0);

    return (
      <div className="space-y-4 sm:space-y-6 lg:space-y-8">
        {/* Voice Analysis Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Main Analysis Card */}
          <Card className="lg:col-span-2" padding="none">
            <CardHeader>
              <div className="flex items-center gap-2.5 sm:gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-accent/10 rounded-xl flex items-center justify-center shrink-0">
                  <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
                </div>
                <div className="min-w-0">
                  <CardTitle className="text-base sm:text-lg">
                    Voice Analysis
                  </CardTitle>
                  <p className="text-xs sm:text-sm text-text-body">
                    Based on {uploadedCaptions} uploaded captions
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {hasAnalysis ? (
                <>
                  {/* Overall Tone - Show if available from OpenAI */}
                  {voiceInsights?.tone && (
                    <div className="mb-4 sm:mb-6 p-4 sm:p-6 bg-primary/5 rounded-xl border border-primary/20">
                      <div className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                        <div className="w-5 h-5 sm:w-6 sm:h-6 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                          <span className="text-[10px] sm:text-xs">🎯</span>
                        </div>
                        <p className="text-xs sm:text-sm font-medium text-text-head">
                          Overall Tone
                        </p>
                      </div>
                      <p className="text-base sm:text-lg font-semibold text-text-head">
                        {voiceInsights.tone}
                      </p>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    {/* Signature Phrases */}
                    {voiceInsights?.topPhrases &&
                      voiceInsights.topPhrases.length > 0 && (
                        <div className="p-4 sm:p-6 bg-section rounded-xl border border-border">
                          <div className="flex items-center gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                            <div className="w-5 h-5 sm:w-6 sm:h-6 bg-accent/10 rounded-lg flex items-center justify-center shrink-0">
                              <span className="text-[10px] sm:text-xs">💬</span>
                            </div>
                            <p className="text-xs sm:text-sm font-medium text-text-head">
                              Signature Phrases
                            </p>
                          </div>
                          <div className="flex flex-wrap gap-1.5 sm:gap-2">
                            {voiceInsights.topPhrases.map((phrase, idx) => (
                              <span
                                key={idx}
                                className="px-2 sm:px-3 py-0.5 sm:py-1 bg-accent/10 text-accent text-[10px] sm:text-xs font-medium rounded-full hover:bg-accent/20 transition-colors cursor-default"
                              >
                                {phrase}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                    {voiceInsights?.emojiUsage && (
                      <VoiceStatCard
                        icon="😊"
                        title="Emoji Usage"
                        value={voiceInsights.emojiUsage}
                        subtitle="Consistent emoji style detected"
                        variant="accent"
                      />
                    )}

                    {voiceInsights?.avgLength && (
                      <VoiceStatCard
                        icon="📏"
                        title="Average Length"
                        value={voiceInsights.avgLength}
                        subtitle="Optimal for engagement"
                        variant="primary"
                      />
                    )}

                    {voiceInsights?.questionFrequency && (
                      <VoiceStatCard
                        icon="❓"
                        title="Question Frequency"
                        value={voiceInsights.questionFrequency}
                        subtitle="High engagement style"
                        variant="info"
                      />
                    )}
                  </div>

                  {/* CTA Style */}
                  {voiceInsights?.ctaStyle && (
                    <div className="mt-4 sm:mt-6 p-4 sm:p-6 bg-section rounded-xl border border-border">
                      <div className="flex items-center gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                        <div className="w-5 h-5 sm:w-6 sm:h-6 bg-success/10 rounded-lg flex items-center justify-center shrink-0">
                          <span className="text-[10px] sm:text-xs">📢</span>
                        </div>
                        <p className="text-xs sm:text-sm font-medium text-text-head">
                          Call-to-Action Style
                        </p>
                      </div>
                      <p className="text-base sm:text-lg font-semibold text-text-head mb-1 sm:mb-2">
                        {voiceInsights.ctaStyle}
                      </p>
                    </div>
                  )}

                  {/* Key Themes - Show if available from OpenAI */}
                  {voiceInsights?.keyThemes &&
                    voiceInsights.keyThemes.length > 0 && (
                      <div className="mt-4 sm:mt-6 p-4 sm:p-6 bg-section rounded-xl border border-border">
                        <div className="flex items-center gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                          <div className="w-5 h-5 sm:w-6 sm:h-6 bg-info/10 rounded-lg flex items-center justify-center shrink-0">
                            <span className="text-[10px] sm:text-xs">📚</span>
                          </div>
                          <p className="text-xs sm:text-sm font-medium text-text-head">
                            Key Themes
                          </p>
                        </div>
                        <div className="flex flex-wrap gap-1.5 sm:gap-2">
                          {voiceInsights.keyThemes.map((theme, idx) => (
                            <span
                              key={idx}
                              className="px-2 sm:px-3 py-0.5 sm:py-1 bg-info/10 text-info text-[10px] sm:text-xs font-medium rounded-full"
                            >
                              {theme}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                  {/* Additional Insights Grid */}
                  {(voiceInsights?.sentenceStructure ||
                    voiceInsights?.vocabularyStyle) && (
                    <div className="mt-4 sm:mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                      {voiceInsights?.sentenceStructure && (
                        <div className="p-4 sm:p-6 bg-section rounded-xl border border-border">
                          <div className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                            <div className="w-5 h-5 sm:w-6 sm:h-6 bg-warning/10 rounded-lg flex items-center justify-center shrink-0">
                              <span className="text-[10px] sm:text-xs">📝</span>
                            </div>
                            <p className="text-xs sm:text-sm font-medium text-text-head">
                              Sentence Structure
                            </p>
                          </div>
                          <p className="text-xs sm:text-sm text-text-body leading-relaxed">
                            {voiceInsights.sentenceStructure}
                          </p>
                        </div>
                      )}

                      {voiceInsights?.vocabularyStyle && (
                        <div className="p-4 sm:p-6 bg-section rounded-xl border border-border">
                          <div className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                            <div className="w-5 h-5 sm:w-6 sm:h-6 bg-accent/10 rounded-lg flex items-center justify-center shrink-0">
                              <span className="text-[10px] sm:text-xs">📖</span>
                            </div>
                            <p className="text-xs sm:text-sm font-medium text-text-head">
                              Vocabulary Style
                            </p>
                          </div>
                          <p className="text-xs sm:text-sm text-text-body leading-relaxed">
                            {voiceInsights.vocabularyStyle}
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Unique Characteristics - Highlight Box */}
                  {voiceInsights?.uniqueCharacteristics && (
                    <div className="mt-4 sm:mt-6 p-4 sm:p-6 bg-accent/5 rounded-xl border border-accent/20">
                      <div className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                        <div className="w-5 h-5 sm:w-6 sm:h-6 bg-accent/10 rounded-lg flex items-center justify-center shrink-0">
                          <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-accent" />
                        </div>
                        <p className="text-xs sm:text-sm font-medium text-text-head">
                          What Makes Your Voice Unique
                        </p>
                      </div>
                      <p className="text-xs sm:text-sm text-text-body leading-relaxed">
                        {voiceInsights.uniqueCharacteristics}
                      </p>
                    </div>
                  )}
                </>
              ) : (
                // Empty State - No Analysis Yet
                <div className="text-center py-10 sm:py-16 px-4">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
                    <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-accent" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-text-head mb-2 sm:mb-3">
                    No Voice Analysis Yet
                  </h3>
                  <p className="text-xs sm:text-sm text-text-body max-w-md mx-auto mb-4 sm:mb-6 leading-relaxed">
                    Upload training samples and click the{" "}
                    <span className="font-medium text-accent">
                      "Analyze Voice"
                    </span>{" "}
                    button in the Training tab to discover your unique writing
                    style.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-hint">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                        <span className="text-[10px] sm:text-xs">1️⃣</span>
                      </div>
                      <span>
                        Upload {MAX_SAMPLES - uploadedCaptions} samples
                      </span>
                    </div>
                    <div className="hidden sm:block text-hint">→</div>
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-hint">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 bg-accent/10 rounded-lg flex items-center justify-center shrink-0">
                        <span className="text-[10px] sm:text-xs">2️⃣</span>
                      </div>
                      <span>Analyze your voice</span>
                    </div>
                    <div className="hidden sm:block text-hint">→</div>
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-hint">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 bg-success/10 rounded-lg flex items-center justify-center shrink-0">
                        <span className="text-[10px] sm:text-xs">3️⃣</span>
                      </div>
                      <span>View insights</span>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Voice Strength Indicator - Contextual */}
          <Card padding="none">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                <div
                  className={`w-7 h-7 sm:w-8 sm:h-8 ${voiceStrength.bgColor} rounded-lg flex items-center justify-center shrink-0`}
                >
                  {voiceStrength.icon}
                </div>
                Voice Strength
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                {/* Circular Progress */}
                <div
                  className={`w-20 h-20 sm:w-24 sm:h-24 ${voiceStrength.bgColor} rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 relative`}
                >
                  <span
                    className={`text-xl sm:text-2xl font-bold ${voiceStrength.textColor}`}
                  >
                    {voiceStrength.percentage}%
                  </span>
                </div>

                {/* Status Title */}
                <p
                  className={`text-xs sm:text-sm font-medium ${voiceStrength.textColor} mb-1.5 sm:mb-2`}
                >
                  {voiceStrength.title}
                </p>

                {/* Description */}
                <p className="text-[10px] sm:text-xs text-text-body mb-3 sm:mb-4">
                  {voiceStrength.description}
                </p>

                {/* Progress Bar */}
                <div className="w-full bg-section rounded-full h-2 mb-2 sm:mb-3">
                  <div
                    className={`${voiceStrength.barColor} h-2 rounded-full transition-all duration-500`}
                    style={{
                      width: `${Math.min(voiceStrength.percentage, 100)}%`,
                    }}
                  ></div>
                </div>

                {/* Sample Count */}
                <p className="text-[10px] sm:text-xs text-hint mb-2 sm:mb-3">
                  {uploadedCaptions}/{MAX_SAMPLES} samples
                </p>

                {/* Action/Next Step */}
                <div
                  className={`p-2.5 sm:p-3 rounded-lg border transition-colors ${
                    voiceStrength.color === "error"
                      ? "bg-error/5 border-error/20"
                      : voiceStrength.color === "warning"
                      ? "bg-warning/5 border-warning/20"
                      : voiceStrength.color === "info"
                      ? "bg-info/5 border-info/20"
                      : voiceStrength.color === "primary"
                      ? "bg-primary/5 border-primary/20"
                      : voiceStrength.color === "success"
                      ? "bg-success/5 border-success/20"
                      : "bg-accent/5 border-accent/20"
                  }`}
                >
                  <p className="text-[10px] sm:text-xs text-text-body leading-relaxed">
                    {voiceStrength.action}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Voice Recommendations */}
        <Card padding="none">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-info/10 rounded-lg flex items-center justify-center shrink-0">
                <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-info" />
              </div>
              AI Recommendations
            </CardTitle>
            <p className="text-xs sm:text-sm text-text-body mt-1.5 sm:mt-2">
              Personalized suggestions to improve your brand voice
            </p>
          </CardHeader>
          <CardContent>
            {dynamicRecommendations.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {dynamicRecommendations.map((rec, index) => (
                  <div
                    key={index}
                    className={`p-3 sm:p-4 rounded-xl border ${
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
                    <div className="flex items-start gap-2 sm:gap-3">
                      <div
                        className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center shrink-0 ${
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
                      <div className="min-w-0">
                        <p
                          className={`font-medium mb-0.5 sm:mb-1 text-xs sm:text-sm ${
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
                          className={`text-[10px] sm:text-xs leading-relaxed ${
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
              <div className="text-center py-10 sm:py-12 px-4">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-hint/10 rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <Sparkles className="w-7 h-7 sm:w-8 sm:h-8 text-hint" />
                </div>
                <h3 className="text-base sm:text-lg font-medium text-text-head mb-1.5 sm:mb-2">
                  Upload samples to get recommendations
                </h3>
                <p className="text-xs sm:text-sm text-text-body max-w-md mx-auto">
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
