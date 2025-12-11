/**
 * Copies text to the system clipboard using the modern Clipboard API or fallback method.
 * 
 * @param text - The text to copy to clipboard
 * @returns Promise that resolves to true if successful, false otherwise
 * 
 * @example
 * ```tsx
 * const success = await copyToClipboard('Hello World');
 * if (success) {
 *   showToast('Copied to clipboard!');
 * }
 * ```
 */
export async function copyToClipboard(text: string): Promise<boolean> {
    if (typeof window === "undefined") {
        return false
    }

    // Try modern Clipboard API first
    if (navigator?.clipboard?.writeText) {
        try {
            await navigator.clipboard.writeText(text)
            return true
        } catch (error) {
            console.warn("Clipboard API failed, attempting fallback:", error)
        }
    }

    // Fallback for older browsers or non-secure contexts
    try {
        const textArea = document.createElement("textarea")
        textArea.value = text

        // Move element off-screen but keep it part of the layout to avoid issues
        textArea.style.position = "fixed"
        textArea.style.left = "-9999px"
        textArea.style.top = "0"
        textArea.setAttribute("readonly", "")

        document.body.appendChild(textArea)
        textArea.select()

        const successful = document.execCommand("copy")
        document.body.removeChild(textArea)

        return successful
    } catch (error) {
        console.error("Failed to copy text:", error)
        return false
    }
}
