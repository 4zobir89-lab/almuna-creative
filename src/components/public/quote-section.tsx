"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Quote } from "lucide-react";

const DAILY_QUOTE = {
  text: "الكلمة الطيبة شجرة طيبة أصلها ثابت وفرعها في السماء، تؤتي أُكلها كل حين بإذن ربها",
  author: "حكمة عربية",
};

export function QuoteSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

  // Split quote into words for staggered reveal
  const words = DAILY_QUOTE.text.split(" ");

  return (
    <section ref={ref} className="relative py-24 sm:py-32 px-6 sm:px-8 border-t border-[var(--color-border)] overflow-hidden">
      {/* Parallax background decoration */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-[var(--accent)] opacity-[0.04] blur-[80px]" />
        <div className="absolute bottom-1/4 left-1/4 w-48 h-48 rounded-full bg-[var(--accent-secondary)] opacity-[0.03] blur-[60px]" />
      </motion.div>

      <motion.div
        style={{ opacity, scale }}
        className="relative z-10 mx-auto max-w-3xl text-center"
      >
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <span className="section-label justify-center">
            <span className="section-label-dot" />
            اقتباس اليوم
          </span>
        </motion.div>

        {/* Quote icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, type: "spring" }}
          className="mb-6"
        >
          <Quote className="w-10 h-10 text-[var(--accent)] opacity-40 mx-auto" />
        </motion.div>

        {/* Quote text — word by word reveal */}
        <blockquote className="font-ruqaa text-2xl sm:text-3xl md:text-4xl text-[var(--color-text-primary)] leading-relaxed mb-6">
          «
          {words.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.3,
                delay: 0.3 + i * 0.04,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="inline-block"
            >
              {word}{" "}
            </motion.span>
          ))}
          »
        </blockquote>

        {/* Author */}
        <motion.cite
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-sm text-[var(--color-text-tertiary)] not-italic"
        >
          — {DAILY_QUOTE.author}
        </motion.cite>
      </motion.div>
    </section>
  );
}
