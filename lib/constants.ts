import { LinkIcon, ImageIcon } from "@/components/icons";
import type { GenerateDropdownMenuItem } from "@/types";

/**
 * Configuration for dropdown menu items in the generate page.
 * Each item represents an action that can be added to the content input.
 */
export const generateDropdownMenuContent: GenerateDropdownMenuItem[] = [
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
];

export const tips = [
    'Questions boost engagement by 23%',
    'First 3 words determine if people keep reading',
    'Emoji placement matters—start or end, not middle',
    'Story-led captions get 2x more saves',
];

export const captionResultFilters = [
    "All",
    "Short",
    "Medium",
    "Long",
    "Hook-first",
    "Question-based",
    "Story-driven",
    "CTA-focused",
];

export const captions = [
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
];
