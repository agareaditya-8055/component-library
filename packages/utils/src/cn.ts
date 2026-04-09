import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * cn = clsx + tailwind-merge
 *
 * 1. clsx → handles conditional classes
 * 2. twMerge → resolves Tailwind conflicts correctly
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}