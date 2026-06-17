"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useMotionValue, useTransform, animate } from "framer-motion";

type Props = {
  value: number;
  duration?: number;
  className?: string;
};

function toArabicDigits(num: number | string): string {
  const arabicDigits = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
  return String(num).replace(/\d/g, (d) => arabicDigits[parseInt(d, 10)]);
}

export function CountUp({ value, duration = 1.5, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => toArabicDigits(Math.floor(latest)));
  const [display, setDisplay] = useState("٠");

  useEffect(() => {
    const unsubscribe = rounded.on("change", (v) => setDisplay(v));
    return () => unsubscribe();
  }, [rounded]);

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, value, {
        duration,
        ease: [0.16, 1, 0.3, 1],
      });
      return controls.stop;
    }
  }, [isInView, value, duration, count]);

  return <span ref={ref} className={className}>{display}</span>;
}
