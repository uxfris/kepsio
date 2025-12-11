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
