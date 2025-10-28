/**
 * Utility functions for generating voice previews
 */

import type { StylePreferences } from "@/types/brand-voice";
import {
  PREVIEW_CONTENT_VARIATIONS,
  PREVIEW_PLATFORM_SUFFIXES,
  PREVIEW_EMOJIS,
  PREVIEW_QUESTIONS,
  PREVIEW_CTAS,
} from "@/lib/constants/voice-preview";

export interface VoicePreviewParams {
  toneName: string;
  platformName: string;
  contentTypeName?: string;
  voiceStrength: number;
  stylePreferences: StylePreferences;
}

/**
 * Generate a contextual preview based on user settings
 * This is instant and doesn't require AI
 */
export function generateInstantPreview({
  toneName,
  platformName,
  contentTypeName = "Educational content",
  voiceStrength,
  stylePreferences,
}: VoicePreviewParams): string {
  // Get base content based on tone, content type, and voice strength
  const toneVariations =
    PREVIEW_CONTENT_VARIATIONS[toneName] ||
    PREVIEW_CONTENT_VARIATIONS["Casual & Friendly"];
  const contentOptions =
    toneVariations[contentTypeName] || toneVariations.default;

  let baseContent = "";
  if (voiceStrength < 40) {
    baseContent = contentOptions.low;
  } else if (voiceStrength < 70) {
    baseContent = contentOptions.mid;
  } else {
    baseContent = contentOptions.high;
  }

  // Create a deterministic hash from settings
  const settingsHash = (
    toneName +
    platformName +
    contentTypeName +
    voiceStrength
  ).length;

  let preview = baseContent;

  // Add emojis if enabled (and not already present)
  if (
    stylePreferences.includeEmojis &&
    !baseContent.includes("✨") &&
    voiceStrength < 70
  ) {
    const emojiIndex = settingsHash % PREVIEW_EMOJIS.length;
    preview = `${preview} ${PREVIEW_EMOJIS[emojiIndex]}`;
  }

  // Add question if enabled
  if (stylePreferences.useQuestions) {
    const toneQuestions =
      PREVIEW_QUESTIONS[toneName] || PREVIEW_QUESTIONS["Casual & Friendly"];
    const questionIndex = (settingsHash + 1) % toneQuestions.length;
    preview = `${preview}${toneQuestions[questionIndex]}`;
  }

  // Add CTA if enabled
  if (stylePreferences.includeCTA) {
    const toneCTAs =
      PREVIEW_CTAS[toneName] || PREVIEW_CTAS["Casual & Friendly"];
    const ctaIndex = (settingsHash + 2) % toneCTAs.length;
    preview = `${preview}${toneCTAs[ctaIndex]}`;
  }

  // Add platform-specific suffix
  const platformSuffix = PREVIEW_PLATFORM_SUFFIXES[platformName] || "";
  if (platformSuffix && platformName !== "Multi-platform") {
    preview = `${preview}\n\n${platformSuffix}`;
  }

  return preview;
}

/**
 * Get voice strength level label
 */
export function getVoiceStrengthLabel(strength: number): string {
  if (strength < 40) return "Creative & Varied";
  if (strength < 70) return "Balanced Approach";
  return "Strictly Your Voice";
}

/**
 * Get voice strength description
 */
export function getVoiceStrengthDescription(strength: number): string {
  if (strength < 40)
    return "AI will be more creative and vary from your samples";
  if (strength < 70)
    return "Balanced mix of your voice and creative variations";
  return "Captions will closely mirror your training samples";
}
