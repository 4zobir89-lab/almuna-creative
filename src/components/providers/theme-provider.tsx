"use client";

import { useEffect, useState, useCallback } from "react";

type Theme = "light" | "dark";

export function useTheme() {
  // Always start with "dark" on SSR, then update on client mount
  const [theme, setThemeState] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem("almuna-theme");
      if (stored === "light" || stored === "dark") {
        setThemeState(stored);
      } else {
        // Check system preference
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        setThemeState(prefersDark ? "dark" : "light");
      }
    } catch {}
  }, []);

  const applyTheme = useCallback((t: Theme) => {
    try {
      localStorage.setItem("almuna-theme", t);
      if (t === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    } catch {}
  }, []);

  const setTheme = useCallback((t: Theme) => {
    setThemeState(t);
    applyTheme(t);
  }, [applyTheme]);

  const toggle = useCallback(() => {
    setThemeState((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      applyTheme(next);
      return next;
    });
  }, [applyTheme]);

  return { theme, toggle, setTheme, mounted };
}
