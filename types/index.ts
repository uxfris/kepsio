/**
 * Type definition for icon components used throughout the application.
 * Icon components accept an optional className prop for styling.
 */
export type IconComponent = ({ className }: { className?: string }) => React.JSX.Element;

/**
 * Represents a single item in the generate dropdown menu.
 */
export interface GenerateDropdownMenuItem {
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
 * State and actions for the dropdown menu store.
 * Manages the open/closed state of product link and image upload sections.
 */
export interface DropdownMenuStore {
    /** Whether the product link section is open */
    isProductLinkOpen: boolean;
    /** Whether the upload image section is open */
    isUploadImageOpen: boolean;
    /** Toggle the product link section */
    toggleProductLink: () => void;
    /** Toggle the upload image section */
    toggleUploadImage: () => void;
}
