import { create } from "zustand";
import type { DropdownMenuState } from "../types";

/**
 * Store interface combining state and actions.
 */
interface GeneratorStore extends DropdownMenuState {
    /** Toggle the product link input section visibility */
    toggleProductLink: () => void;
    /** Toggle the image upload section visibility */
    toggleUploadImage: () => void;
}

/**
 * Zustand store for managing generator UI state.
 * Tracks which optional sections (product link, image upload) are currently open.
 * 
 * @example
 * ```tsx
 * const { isProductLinkOpen, toggleProductLink } = useGeneratorStore();
 * ```
 */
export const useGeneratorStore = create<GeneratorStore>((set) => ({
    // State
    isProductLinkOpen: false,
    isUploadImageOpen: false,

    // Actions

    /**
     * Toggles the product link input section visibility.
     */
    toggleProductLink: () =>
        set((state) => ({
            isProductLinkOpen: !state.isProductLinkOpen,
        })),

    /**
     * Toggles the image upload section visibility.
     */
    toggleUploadImage: () =>
        set((state) => ({
            isUploadImageOpen: !state.isUploadImageOpen,
        })),
}));
