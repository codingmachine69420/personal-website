import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

// Standard shadcn-ecosystem helper — almost every Motion Primitives /
// Watermelon UI component imports this from '@/lib/utils'. Merges
// conditional class lists and resolves conflicting Tailwind classes
// (last one wins) instead of leaving both in the string.
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
