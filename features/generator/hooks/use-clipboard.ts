import { useState, useCallback } from "react";
import { copyToClipboard as copyToClipboardUtil } from "@/lib/utils";

/**
 * Custom hook for handling clipboard operations with copy state management.
 * 
 * @param resetDelay - Time in milliseconds before resetting copied state (default: 2000ms)
 * @returns Object containing copied state and copy handler
 * 
 * @example
 * ```tsx
 * const { copied, handleCopy } = useClipboard();
 * 
 * <Button onClick={() => handleCopy(text)}>
 *   {copied ? 'Copied!' : 'Copy'}
 * </Button>
 * ```
 */
export function useClipboard(resetDelay: number = 2000) {
    const [copied, setCopied] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleCopy = useCallback(async (text: string) => {
        try {
            const success = await copyToClipboardUtil(text);

            if (success) {
                setCopied(true);
                setError(null);
                setTimeout(() => {
                    setCopied(false);
                }, resetDelay);
            } else {
                setError("Failed to copy to clipboard");
            }

            return success;
        } catch (err) {
            setError(err instanceof Error ? err.message : "Unknown error");
            return false;
        }
    }, [resetDelay]);

    return {
        copied,
        error,
        handleCopy,
    };
}
