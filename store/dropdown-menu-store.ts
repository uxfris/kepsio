import { create } from "zustand";
import type { DropdownMenuStore } from "@/types";

/**
 * Zustand store for managing dropdown menu state in the generate page.
 * Tracks which optional sections (product link, image upload) are currently open.
 */
export const useDropdownMenuStore = create<DropdownMenuStore>((set) => ({
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
