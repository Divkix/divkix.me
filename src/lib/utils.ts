import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function calculateWordCount(content: string): number {
  return content.trim().split(/\s+/).length;
}

export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  return Math.ceil(calculateWordCount(content) / wordsPerMinute);
}
