import { useState, useCallback } from "react";

/**
 * Custom hook for managing caption card expand/collapse state and "read more" logic.
 * 
 * @returns Object containing state and handlers for caption card interactions
 * 
 * @example
 * ```tsx
 * const { expanded, showReadMore, toggleExpanded, checkReadMore } = useCaptionCard();
 * 
 * // In useEffect, call checkReadMore with element ref
 * checkReadMore(textRef.current);
 * ```
 */
export function useCaptionCard() {
    const [expanded, setExpanded] = useState(false);
    const [showReadMore, setShowReadMore] = useState(false);
    const [maxHeight, setMaxHeight] = useState<number | undefined>(undefined);

    const toggleExpanded = useCallback(() => {
        setExpanded(prev => !prev);
    }, []);

    /**
     * Checks if "Read more" button should be shown based on element height.
     * Call this in useEffect after the element is rendered.
     */
    const checkReadMore = useCallback((element: HTMLElement | null, isTopPick: boolean = false) => {
        if (!isTopPick && element) {
            const lineHeight = parseInt(getComputedStyle(element).lineHeight) || 24;
            const twoLinesHeight = lineHeight * 2;

            setShowReadMore(element.scrollHeight > twoLinesHeight);
            setMaxHeight(twoLinesHeight);
        }
    }, []);

    return {
        expanded,
        showReadMore,
        maxHeight,
        toggleExpanded,
        checkReadMore,
    };
}
