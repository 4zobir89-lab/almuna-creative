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
    <section className="relative min-h-[92vh] flex flex-col items-center justify-center w-full px-6 sm:px-8 pt-32 pb-20 overflow-hidden">
      {/* Subtle warm gradient — no blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-bg)] via-[var(--hero-bg-via)] to-[var(--color-bg)]" />
      </div>

      {/* Decorative ink blots — collage feel */}
      <div className="ink-blot w-32 h-32 top-[15%] right-[10%]" style={{ background: "var(--accent)" }} />
      <div className="ink-blot w-24 h-24 bottom-[20%] left-[8%]" style={{ background: "var(--accent-secondary)" }} />
      <div className="ink-blot w-16 h-16 top-[60%] right-[20%]" style={{ background: "var(--accent)", opacity: 0.04 }} />

      {/* Watermark — large Arabic calligraphy */}
      <div className="absolute left-[-3%] top-1/2 -translate-y-1/2 pointer-events-none select-none" style={{ opacity: 0.05 }}>
        <div className="font-amiri text-[22vw] font-bold text-[var(--color-text-primary)] leading-none">
          المنى
        </div>
      </div>

      {/* Content — asymmetric, top-biased */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto"
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={mounted ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10"
        >
          <span className="section-label">
            <span className="section-label-dot" />
            مؤسسة المنى الإبداعية
          </span>
        </motion.div>

        {/* Display — Aref Ruqaa for artistic feel, dramatic scale */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-ruqaa text-[3rem] sm:text-[5rem] md:text-[6.5rem] font-bold text-[var(--color-text-primary)] leading-[1.1] mb-8"
        >
          حيث يلتقي
          <br />
          <span className="text-[var(--accent)]">الأدب</span> بالروح
        </motion.h1>

        {/* Deck */}
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
          className="text-sm sm:text-base text-[var(--color-text-tertiary)] mb-12 max-w-xl leading-relaxed"
        >
          استكشف الإبداع في أبهى صوره، متجرداً من كل شيء إلا المعنى
        </motion.p>

        {/* CTA */}
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

      {/* Scroll indicator */}
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
