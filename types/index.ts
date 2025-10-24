// Shared TypeScript types

export interface User {
  id: string;
  email: string;
  name: string;
  image?: string;
  subscription?: Subscription;
  createdAt: Date;
  updatedAt: Date;
}

export interface Subscription {
  id: string;
  userId: string;
  plan: "free" | "pro" | "enterprise";
  status: "active" | "canceled" | "past_due";
  currentPeriodEnd: Date;
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
}

export interface Caption {
  id: string;
  userId: string;
  content: string;
  context?: string;
  voiceProfile?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface VoiceProfile {
  id: string;
  userId: string;
  name: string;
  description: string;
  tone: string;
  style: string;
  examples: string[];
  createdAt: Date;
  updatedAt: Date;
}

// Caption generation types
export interface ContextOption {
  id: string;
  label: string;
  icon: any; // Lucide icon component
}

export interface PreviousPost {
  id: string;
  title: string;
  date: string;
}

export interface CaptionOptions {
  cta: string;
  captionLength: string;
  emojiStyle: string;
  hashtagCount: number;
  customCta?: string;
}

export interface ContextData {
  productLink: string;
  uploadedImage: File | null;
  imagePreview: string | null;
  selectedPreviousPost: string;
}

export interface CaptionState {
  contentInput: string;
  showError: boolean;
  isGenerating: boolean;
  generatedCaptions: string[];
  copiedIndex: number | null;
  showContextMenu: boolean;
  selectedContextItems: string[];
  isAdvancedOpen: boolean;
}
