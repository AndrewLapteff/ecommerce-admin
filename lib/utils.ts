import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const lengthFormater = (label: string) => {
  if (label.length > 8) {
    return label.slice(0, 8) + '...'
  } else {
    return label
  }
}