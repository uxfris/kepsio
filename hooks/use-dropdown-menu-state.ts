import type { GenerateDropdownMenuItem } from "@/types";
import { useDropdownMenuStore } from "@/store/dropdown-menu-store";

/**
 * Custom hook for managing dropdown menu item states.
 * Maps menu items to their corresponding state and toggle functions from the store.
 * 
 * @param menuItems - Array of menu items to manage
 * @returns Object mapping menu item IDs to their state and toggle functions
 * 
 * @example
 * ```tsx
 * const menuState = useDropdownMenuState(generateDropdownMenuContent);
 * const productLinkState = menuState['productLink'];
 * // productLinkState.isOpen, productLinkState.toggle()
 * ```
 */
export function useDropdownMenuState(_menuItems: GenerateDropdownMenuItem[]) {
    const { isProductLinkOpen, isUploadImageOpen, toggleProductLink, toggleUploadImage } = useDropdownMenuStore();

    // Map menu item IDs to their corresponding state and toggle functions
    const menuStateMap: Record<string, { isOpen: boolean; toggle: () => void }> = {
        productLink: { isOpen: isProductLinkOpen, toggle: toggleProductLink },
        uploadImage: { isOpen: isUploadImageOpen, toggle: toggleUploadImage },
    };

    return menuStateMap;
}
