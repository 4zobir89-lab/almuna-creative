"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const PREMIUM_EASE = "cubic-bezier(0.32,0.72,0,1)";

export function AnimationProvider({ children }: { children: React.ReactNode }) {
  const inited = useRef(false);

  useEffect(() => {
    if (inited.current) return;
    inited.current = true;

    gsap.registerPlugin(ScrollTrigger);

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!prefersReduced) {
      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        const speed = Number(el.dataset.parallaxSpeed) || 0.15;
        gsap.to(el, {
          y: () => (el.dataset.parallaxDir === "up" ? 1 : -1) * speed * window.innerHeight,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    }

    const revealObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          revealObserver.unobserve(el);

          if (prefersReduced) {
            el.classList.add("data-revealed");
            continue;
          }

          if (el.dataset.stagger && el.children.length > 0) {
            const delay = Number(el.dataset.staggerDelay) || 0.05;
            gsap.set(Array.from(el.children), { y: 40, opacity: 0 });
            gsap.to(Array.from(el.children), {
              y: 0,
              opacity: 1,
              duration: 0.8,
              stagger: delay,
              ease: PREMIUM_EASE,
              clearProps: "transform",
            });
          } else {
            const y = Number(el.dataset.revealY) || 40;
            gsap.set(el, { y, opacity: 0 });
            gsap.to(el, {
              y: 0,
              opacity: 1,
              duration: 0.9,
              ease: PREMIUM_EASE,
              clearProps: "transform",
            });
          }

          el.classList.add("data-revealed");
        }
      },
      { threshold: 0.05, rootMargin: "0px 0px -30px 0px" },
    );

    const alreadyVisible: HTMLElement[] = [];
    const toObserve: HTMLElement[] = [];

    document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
      const rect = el.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
      if (isVisible) {
        el.classList.add("data-revealed");
        alreadyVisible.push(el);
      } else {
        toObserve.push(el);
      }
    });

    if (alreadyVisible.length > 0) {
      gsap.set(alreadyVisible, { opacity: 1, y: 0, clearProps: "transform" });
    }

    if (!prefersReduced) {
      toObserve.forEach((el) => revealObserver.observe(el));
    } else {
      toObserve.forEach((el) => el.classList.add("data-revealed"));
    }

    const mutationObserver = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        for (const node of Array.from(mutation.addedNodes)) {
          if (!(node instanceof HTMLElement)) continue;
          const check = (el: HTMLElement) => {
            if (!el.matches?.("[data-reveal]")) return;
            if (el.classList.contains("data-revealed")) return;
            const rect = el.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            if (isVisible || prefersReduced) {
              el.classList.add("data-revealed");
              gsap.set(el, { opacity: 1, y: 0, clearProps: "transform" });
            } else {
              revealObserver.observe(el);
            }
          };
          check(node);
          node.querySelectorAll?.("[data-reveal]").forEach((el) => check(el as HTMLElement));
        }
      }
    });
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    ScrollTrigger.refresh();

    return () => {
      revealObserver.disconnect();
      mutationObserver.disconnect();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return <>{children}</>;
}
