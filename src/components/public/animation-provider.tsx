"use client";

import { useEffect } from "react";

// Simplified AnimationProvider — uses only IntersectionObserver, no GSAP
// This is SSR-safe and won't break prerender
export function AnimationProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("data-revealed");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.05, rootMargin: "0px 0px -30px 0px" }
    );

    document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.classList.add("data-revealed");
      } else {
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, []);

  return <>{children}</>;
}
