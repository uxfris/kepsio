"use client"

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Utility function to merge Tailwind CSS classes with proper precedence.
 * Combines clsx for conditional classes and tailwind-merge to handle conflicts.
 * 
 * @param inputs - Class values to merge (strings, objects, arrays)
 * @returns Merged className string
 * 
 * @example
 * ```tsx
 * cn('px-2 py-1', isActive && 'bg-blue-500', className)
 * ```
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

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