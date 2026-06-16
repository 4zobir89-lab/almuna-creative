import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export function generateExcerpt(text: string, maxLength = 150): string {
  const cleaned = text.replace(/<[^>]*>/g, "").trim();
  if (cleaned.length <= maxLength) return cleaned;
  return cleaned.slice(0, maxLength).trim() + "…";
}

export function formatDate(date: Date | string, locale = "ar"): string {
  const d = new Date(date);
  return d.toLocaleDateString(locale === "ar" ? "ar-SA" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function calculateReadingTime(text: string): string {
  const cleaned = text.replace(/<[^>]*>/g, "").trim();
  const wordCount = cleaned.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(wordCount / 200));
  if (minutes === 1) return "دقيقة قراءة";
  return `${minutes} دقائق قراءة`;
}

const CATEGORY_GRADIENTS: Record<string, string> = {
  "شعر": "from-purple-900 via-purple-800 to-indigo-900",
  "نقد": "from-amber-900 via-amber-800 to-orange-900",
  "قصة": "from-emerald-900 via-emerald-800 to-teal-900",
  "خاطرة": "from-rose-900 via-rose-800 to-pink-900",
  "مقال": "from-cyan-900 via-cyan-800 to-blue-900",
  "default": "from-gray-800 via-gray-700 to-zinc-900",
};

export function getCategoryGradient(categoryName?: string | null): string {
  if (!categoryName) return CATEGORY_GRADIENTS.default;
  for (const [key, gradient] of Object.entries(CATEGORY_GRADIENTS)) {
    if (categoryName.includes(key)) return gradient;
  }
  return CATEGORY_GRADIENTS.default;
}
