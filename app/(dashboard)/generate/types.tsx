export type GeneratorForm = {
    platform: "instagram" | "x" | "linkedin";
    content: string;
    productLink?: string;
    cta?: string;
    hashtagCount?: number;
    captionLength?: string;
    emojiStyle?: string;
    // Add more fields if needed, e.g., image uploads
};
