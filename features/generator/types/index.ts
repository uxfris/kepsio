/**
 * Represents a generated caption with metadata.
 */
export interface Caption {
    /** Unique identifier for the caption */
    id: string;
    /** Whether this caption is marked as a top pick */
    isTopPick: boolean;
    /** Whether this caption has high engagement potential */
    isHighPotential: boolean;
    /** The caption text content */
    text: string;
    /** The length category of the caption */
    length: string;
    /** The style/approach used in the caption */
    style: string;
}

/**
 * Configuration for the caption generator.
 */
export interface GeneratorConfig {
    /** Selected platform for caption generation */
    platform: string;
    /** Content description provided by the user */
    content: string;
    /** Optional product link to include */
    productLink?: string;
    /** Optional uploaded image */
    uploadedImage?: File;
    /** Call-to-action type */
    cta: string;
    /** Number of hashtags to include (0-10) */
    hashtagCount: number;
    /** Desired caption length */
    captionLength: "Short" | "Medium" | "Long";
    /** Emoji style preference */
    emojiStyle: "None" | "Minimal" | "Generous";
}

/**
 * State management for the caption generator.
 */
export interface GeneratorState {
    /** Current generator configuration */
    config: GeneratorConfig;
    /** Generated captions */
    captions: Caption[];
    /** Whether the generator is currently processing */
    isGenerating: boolean;
    /** Whether the result is ready to display */
    isResultReady: boolean;
    /** Generation progress (0-100) */
    progress: number;
    /** Error message if generation failed */
    error: string | null;
}

/**
 * Dropdown menu state for optional inputs.
 */
export interface DropdownMenuState {
    /** Whether the product link section is open */
    isProductLinkOpen: boolean;
    /** Whether the upload image section is open */
    isUploadImageOpen: boolean;
}
