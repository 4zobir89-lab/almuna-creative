"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  src: string;
  alt?: string;
  overlay?: "light" | "medium" | "dark" | "sepia";
  className?: string;
  priority?: boolean;
};

const overlayClasses = {
  light: "bg-gradient-to-b from-[var(--color-bg)]/85 via-[var(--color-bg)]/75 to-[var(--color-bg)]/90",
  medium: "bg-gradient-to-b from-[var(--color-bg)]/90 via-[var(--color-bg)]/80 to-[var(--color-bg)]/95",
  dark: "bg-gradient-to-b from-[var(--color-bg)]/95 via-[var(--color-bg)]/88 to-[var(--color-bg)]/97",
  sepia: "bg-gradient-to-b from-[var(--color-bg)]/88 via-[var(--color-bg)]/78 to-[var(--color-bg)]/92",
};

export function LiteraryBackground({
  src,
  alt = "",
  overlay = "medium",
  className = "",
  priority = false,
}: Props) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (priority) {
      setLoaded(true);
      return;
    }

    const img = new Image();
    img.src = src;
    img.onload = () => setLoaded(true);
    img.onerror = () => setLoaded(true);

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src, priority]);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Background image with fade-in */}
      <AnimatePresence>
        {loaded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={alt}
              className="w-full h-full object-cover"
              style={{
                filter: "saturate(0.85) brightness(0.95)",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Skeleton while loading */}
      {!loaded && (
        <div className="absolute inset-0 bg-[var(--color-bg)] animate-pulse" />
      )}

      {/* Overlay for text readability */}
      <div className={`absolute inset-0 ${overlayClasses[overlay]}`} />

      {/* Subtle paper texture on top */}
      <div
        className="absolute inset-0 opacity-[0.15] pointer-events-none mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0.3 0 0 0 0 0.2 0 0 0 0 0.1 0 0 0 0.15 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}

// Background presets for different pages
export const backgrounds = {
  home: "/backgrounds/poetry-house.webp",
  archive: "/backgrounds/cloud-library.webp",
  authors: "/backgrounds/word-workshop.webp",
  events: "/backgrounds/poet-window.webp",
  magazine: "/backgrounds/map-of-creativity.webp",
  about: "/backgrounds/poetry-house.webp",
  contact: "/backgrounds/word-workshop.webp",
  search: "/backgrounds/cloud-library.webp",
  postDetail: "/backgrounds/poet-window.webp",
} as const;

export type BackgroundKey = keyof typeof backgrounds;
