export interface Platform {
  id: string;
  name: string;
  network?: string;
  description: string;
}

export interface BrandTone {
  id: string;
  name: string;
  emoji: string;
  description: string;
  example: string;
}

export interface ContentType {
  id: string;
  name: string;
}

export interface OnboardingOptions {
  platforms: Platform[];
  brandTones: BrandTone[];
  contentTypes: ContentType[];
}

export interface StylePreferences {
  useQuestions: boolean;
  includeEmojis: boolean;
  includeCTA: boolean;
}

export interface UploadedCaption {
  id: number;
  text: string;
  platform: string;
  date: string;
}

export interface VoiceInsights {
  topPhrases: string[];
  emojiUsage: string;
  avgLength: string;
  questionFrequency: string;
  ctaStyle: string;
}

export interface OnboardingStep {
  title: string;
  description: string;
  iconType: "sparkles" | "upload" | "target" | "check";
}
