"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { BookOpen, Users, Sparkles } from "lucide-react";
import { CountUp } from "@/components/public/count-up";

const stats = [
  { value: 318, label: "نص منشور", icon: BookOpen, delay: 0 },
  { value: 45, label: "كاتب مبدع", icon: Users, delay: 0.15 },
  { value: 12, label: "قسم أدبي", icon: Sparkles, delay: 0.3 },
];

export function StatsSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-24 sm:py-32 px-6 sm:px-8 border-t border-[var(--color-border)] overflow-hidden">
      {/* Decorative elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1 }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-1/2 left-1/4 w-96 h-96 rounded-full bg-[var(--accent)] opacity-[0.03] blur-[120px]" />
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 rounded-full bg-[var(--accent-secondary)] opacity-[0.02] blur-[80px]" />
      </motion.div>

      {/* Fleuron before stats */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <span className="text-2xl text-[var(--accent)] opacity-40">✦</span>
      </motion.div>

      <div className="relative z-10 mx-auto max-w-4xl">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 sm:gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: stat.delay, ease: [0.16, 1, 0.3, 1] }}
              className="text-center relative"
            >
              {/* Divider line between items (desktop) */}
              {i > 0 && (
                <div className="hidden sm:block absolute right-0 top-1/2 -translate-y-1/2 h-16 w-px bg-[var(--color-border)]" />
              )}

              {/* Icon */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={isInView ? { scale: 1, rotate: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: stat.delay + 0.2,
                  type: "spring",
                  stiffness: 200,
                }}
                className="inline-block mb-3"
              >
                <stat.icon className="w-7 h-7 text-[var(--accent)]" />
              </motion.div>

              {/* Number */}
              <CountUp
                value={stat.value}
                duration={2}
                className="block font-ruqaa text-5xl sm:text-6xl font-bold text-[var(--color-text-primary)] mb-2 tabular-nums"
              />

              {/* Label */}
              <div className="text-xs tracking-[0.15em] text-[var(--color-text-tertiary)] uppercase">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Fleuron after stats */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="text-center mt-12"
      >
        <span className="text-2xl text-[var(--accent)] opacity-40">✦</span>
      </motion.div>
    </section>
  );
}
