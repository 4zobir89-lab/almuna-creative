"use client";

import { motion } from "framer-motion";
import { LiteraryBackground } from "@/components/public/literary-background";
import type { ReactNode } from "react";

type Props = {
  background: string;
  label?: string;
  title: string;
  description?: string;
  children?: ReactNode;
};

export function PageHeader({ background, label, title, description, children }: Props) {
  return (
    <section className="relative min-h-[45vh] flex flex-col items-center justify-center pt-32 pb-12 overflow-hidden">
      {/* Literary background */}
      <LiteraryBackground
        src={background}
        alt={title}
        overlay="dark"
        priority
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 sm:px-8 text-center">
        {label && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="mb-6"
          >
            <span className="section-label" style={{ color: "var(--accent)" }}>
              <span className="section-label-dot" />
              {label}
            </span>
          </motion.div>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-ruqaa text-4xl sm:text-5xl md:text-6xl font-bold text-[var(--color-text-primary)] mb-4"
          style={{ textShadow: "0 2px 20px rgba(0,0,0,0.3)" }}
        >
          {title}
        </motion.h1>

        {description && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mx-auto max-w-xl text-sm sm:text-base text-[var(--color-text-secondary)]"
            style={{ textShadow: "0 1px 8px rgba(0,0,0,0.2)" }}
          >
            {description}
          </motion.p>
        )}

        {children}
      </div>
    </section>
  );
}
