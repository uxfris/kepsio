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