
// Utility function for merging Tailwind CSS classes and conditional class names.
// Uses clsx for conditional logic and twMerge for deduplication.
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combines class names using clsx and merges them with Tailwind CSS rules.
 * @param inputs - List of class values (strings, objects, arrays)
 * @returns Merged class name string
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
