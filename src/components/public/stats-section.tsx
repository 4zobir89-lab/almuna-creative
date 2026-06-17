"use client";

import { motion } from "framer-motion";
import { BookOpen, Users, Sparkles } from "lucide-react";
import { CountUp } from "@/components/public/count-up";

const stats = [
  { value: 318, label: "نص منشور", icon: BookOpen },
  { value: 45, label: "كاتب مبدع", icon: Users },
  { value: 12, label: "قسم أدبي", icon: Sparkles },
];

export function StatsSection() {
  return (
    <section className="relative py-20 sm:py-24 px-6 sm:px-8 border-t border-[var(--color-border)]">
      <div className="mx-auto max-w-4xl">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-center"
            >
              <stat.icon className="w-6 h-6 text-[var(--accent)] mx-auto mb-3" />
              <CountUp
                value={stat.value}
                duration={1.5}
                className="block font-amiri text-4xl sm:text-5xl font-bold text-[var(--color-text-primary)] mb-1 tabular-nums"
              />
              <div className="text-xs tracking-[0.15em] text-[var(--color-text-tertiary)]">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
