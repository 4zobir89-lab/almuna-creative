"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft } from "lucide-react";

export function Hero() {
  const [mounted, setMounted] = useState(false);
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center w-full px-6 sm:px-8 pt-32 pb-20 overflow-hidden">
      {/* Subtle background — flat surface, no decorative blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-bg)] via-[var(--hero-bg-via)] to-[var(--color-bg)]" />
      </div>

      {/* Content — editorial pacing: dramatic scale jumps, whitespace carries hierarchy */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto"
      >
        {/* Eyebrow — ALL CAPS with 0.18em tracking */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={mounted ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12"
        >
          <span className="section-label">
            <span className="section-label-dot" />
            مؤسسة المنى الإبداعية
          </span>
        </motion.div>

        {/* Display — dramatic scale jump, light weight, whitespace around it */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-amiri text-[2.75rem] sm:text-[4.5rem] md:text-[6rem] font-bold text-[var(--color-text-primary)] leading-[1.05] mb-10"
        >
          حيث يلتقي
          <br />
          <span className="text-[var(--accent)]">الأدب</span> بالروح
        </motion.h1>

        {/* Deck / standfirst — large jump down (editorial signature) */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="font-amiri text-lg sm:text-xl text-[var(--color-text-secondary)] leading-relaxed mb-2 max-w-2xl"
        >
          نصوص، شعر، قصص، ومقالات تُنير الفكر
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-sm sm:text-base text-[var(--color-text-tertiary)] mb-14 max-w-xl leading-relaxed"
        >
          استكشف الإبداع في أبهى صوره، متجرداً من كل شيء إلا المعنى
        </motion.p>

        {/* CTA — only 2 actions (Hick's Law), one primary */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center gap-3"
        >
          <Link href="/archive" className="btn-primary group">
            استعرض الأرشيف
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          </Link>
          <Link href="/categories" className="btn-secondary">
            استكشف الأقسام
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll indicator — subtle, not decorative */}
      <motion.div
        style={{ opacity }}
        initial={{ opacity: 0 }}
        animate={mounted ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-px h-12 bg-gradient-to-b from-[var(--color-border)] to-transparent" />
      </motion.div>
    </section>
  );
}
