/**
 * Type definition for icon components used throughout the application.
 * Icon components accept an optional className prop for styling.
 */
export type IconComponent = (props: React.ComponentProps<"svg">) => React.JSX.Element;

/**
 * Represents a single item in a dropdown menu.
 * Generic interface that can be used across different features.
 */
export interface DropdownMenuItem {
    /** Unique identifier for the menu item */
    id: string;
    /** Icon component to display */
    icon: IconComponent;
    /** Alt text for accessibility */
    alt: string;
    /** Display title for the menu item */
    title: string;
}

/**
 * Represents a single item in the generate dropdown menu.
 * @deprecated Use feature-specific types from @/features/generator/types instead
 */
export type GenerateDropdownMenuItem = DropdownMenuItem;


export type CaptionForm = {
    platform: "instagram" | "x" | "linkedin";
    content: string;
    productLink?: string;
    cta?: string;
    hashtagCount: number;
    captionLength: 'Short' | 'Medium' | 'Long';
    emojiStyle: 'None' | 'Minimal' | 'Generous';
    refinement?: string;
    imageBase64?: string;
};

// types/caption.ts

export type CaptionLength = "Short" | "Medium" | "Long";

export type CaptionStyle =
    | "Hook-first"
    | "Question-based"
    | "Story-driven"
    | "CTA-focused";

export type AICaption = {
    id: string;          // 1–5 (AI-generated)
    isTopPick: boolean;       // exactly one true
    isHighPotential: boolean; // 1–2 true
    text: string;
    length: CaptionLength;
    style: CaptionStyle;
    platform: string
};
