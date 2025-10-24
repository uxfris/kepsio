export interface ContextOption {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface PreviousPost {
  id: string;
  title: string;
  date: string;
}

export interface CaptionGenerationOptions {
  ctaType: string;
  hashtagCount: number;
  captionLength: string;
  emojiStyle: string;
}

export interface ContextData {
  productLink: string;
  uploadedImage: File | null;
  imagePreview: string | null;
  selectedPreviousPost: string;
}

export interface CaptionInputState {
  contentInput: string;
  isAdvancedOpen: boolean;
  showError: boolean;
  isGenerating: boolean;
  generatedCaptions: string[];
  copiedIndex: number | null;
  showContextMenu: boolean;
  selectedContextItems: string[];
}
