import { LinkIcon, ImageIcon } from "@/components/icons";
import type { DropdownMenuItem } from "@/types";

/**
 * Configuration for dropdown menu items in the generate page.
 * Each item represents an action that can be added to the content input.
 */
export const GENERATE_DROPDOWN_MENU_ITEMS: DropdownMenuItem[] = [
    {
        id: "productLink",
        icon: LinkIcon,
        alt: "Link",
        title: "Add product link",
    },
    {
        id: "uploadImage",
        icon: ImageIcon,
        alt: "image",
        title: "Upload image",
    }
] as const;

/**
 * Helpful tips to display to users while generating captions.
 * These tips provide best practices for social media engagement.
 */
export const CAPTION_TIPS = [
    'Questions boost engagement by 23%',
    'First 3 words determine if people keep reading',
    'Emoji placement matters—start or end, not middle',
    'Story-led captions get 2x more saves',
] as const;

/**
 * Filter options for caption results.
 * First 4 are length-based, remaining are style-based.
 */
export const CAPTION_RESULT_FILTERS = [
    "All",
    "Short",
    "Medium",
    "Long",
    "Hook-first",
    "Question-based",
    "Story-driven",
    "CTA-focused",
] as const;

/**
 * Caption length options for the generator.
 */
export const CAPTION_LENGTH_OPTIONS = ["Short", "Medium", "Long"] as const;

/**
 * Emoji style options for caption generation.
 */
export const EMOJI_STYLE_OPTIONS = ["None", "Minimal", "Generous"] as const;

/**
 * Call-to-action options for captions.
 */
export const CTA_OPTIONS = [
    { value: "link-in-bio", label: "Link in bio" },
    { value: "shop-now", label: "Shop now" },
    { value: "dm-me", label: "DM me" },
    { value: "comment-below", label: "Comment below" },
    { value: "custom", label: "Custom" },
    { value: "none", label: "None" },
] as const;

/**
 * Mock caption data for demonstration purposes.
 * In production, this would come from an API.
 */
export const MOCK_CAPTIONS = [
    {
        id: "caption-1",
        isTopPick: true,
        isHighPotential: true,
        text: "We've been working hard behind the scenes, and it's finally time to unveil our latest creations. Stay tuned for amazing content that will inspire and engage your audience! #creativity #behindthescenes #inspiration",
        length: "Short",
        style: "Hook-first"
    },
    {
        id: "caption-2",
        isTopPick: false,
        isHighPotential: false,
        text: "Have you ever wondered how to take your content to the next level? Here's a simple tip that works every time! #contenttips #socialmedia #growth",
        length: "Medium",
        style: "Question-based"
    },
    {
        id: "caption-3",
        isTopPick: false,
        isHighPotential: true,
        text: "Once upon a time, we faced a huge challenge that seemed impossible. But through teamwork and creativity, we achieved something extraordinary. #storytelling #teamwork #success",
        length: "Long",
        style: "Story-driven"
    },
    {
        id: "caption-4",
        isTopPick: false,
        isHighPotential: false,
        text: "Don't miss out! Click the link below to grab your exclusive offer before it's gone. #offer #limitedtime #actnow",
        length: "Short",
        style: "CTA-focused",
    },
    {
        id: "caption-5",
        isTopPick: false,
        isHighPotential: false,
        text: "Start your day with inspiration: small steps lead to big achievements. Share your journey with us! #motivation #dailyinspo #growthmindset",
        length: "Medium",
        style: "Hook-first",
    },
] as const;
