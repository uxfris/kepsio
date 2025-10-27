import type { VoiceInsights, UploadedCaption } from "../../types/brand-voice";

export const TAB_OPTIONS = [
  { value: "training", label: "Voice Training" },
  { value: "tone", label: "Tone & Style" },
  { value: "insights", label: "Voice Insights" },
];

export const ONBOARDING_STEPS = [
  {
    title: "Welcome to Brand Voice! 🎉",
    description:
      "Let's train the AI to write captions in your unique style. This will make your content more authentic and engaging.",
    iconType: "sparkles" as const,
  },
  {
    title: "Upload Your Past Captions",
    description:
      "Start by uploading 3-5 of your best captions. The AI will analyze your writing style, tone, and voice patterns.",
    iconType: "upload" as const,
  },
  {
    title: "Choose Your Tone",
    description:
      "Select the tone that best represents your brand. You can always adjust this later based on your audience.",
    iconType: "target" as const,
  },
  {
    title: "You're All Set! ✨",
    description:
      "Your brand voice is now configured. Start generating captions that sound authentically like you!",
    iconType: "check" as const,
  },
];

export const MOCK_VOICE_INSIGHTS: VoiceInsights = {
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

export const MOCK_UPLOADED_CAPTIONS: UploadedCaption[] = [
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

export const MIN_SAMPLES_FOR_TRAINING = 3;
export const GOOD_SAMPLES_THRESHOLD = 7;
export const MAX_SAMPLES = 10;
