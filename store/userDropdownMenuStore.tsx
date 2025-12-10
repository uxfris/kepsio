import { create } from "zustand";

type DropdownMenuStore = {
    isProductLinkOpen: boolean;
    isUploadImageOpen: boolean;
    toggleProductLink: () => void;
    toggleUploadImage: () => void;
};

export const useDropdownMenuStore = create<DropdownMenuStore>((set) => ({
    isProductLinkOpen: false,
    isUploadImageOpen: false,

    // actions
    toggleProductLink: () =>
        set((state) => ({
            isProductLinkOpen: !state.isProductLinkOpen,
        })),

    toggleUploadImage: () =>
        set((state) => ({
            isUploadImageOpen: !state.isUploadImageOpen,
        })),
}));
