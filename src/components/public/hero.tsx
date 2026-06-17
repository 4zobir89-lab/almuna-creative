"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { LiteraryBackground } from "@/components/public/literary-background";

export function Hero() {
  const [mounted, setMounted] = useState(false);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 100]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative min-h-[92vh] flex flex-col items-center justify-center w-full px-6 sm:px-8 pt-32 pb-20 overflow-hidden">
      {/* Literary collage background — "بيت القصيدة" */}
      <motion.div style={{ y }} className="absolute inset-0">
        <LiteraryBackground
          src="/backgrounds/poetry-house.webp"
          alt="بيت القصيدة — كولاج ورقي أدبي"
          overlay="dark"
          priority
        />
      </motion.div>

      {/* Content */}
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
          <span className="section-label" style={{ color: "var(--accent)" }}>
            <span className="section-label-dot" />
            مؤسسة المنى الإبداعية
          </span>
        </motion.div>

        {/* Display — Aref Ruqaa */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-ruqaa text-[3rem] sm:text-[5rem] md:text-[6.5rem] font-bold leading-[1.1] mb-8 text-[var(--color-text-primary)]"
          style={{ textShadow: "0 2px 20px rgba(0,0,0,0.3)" }}
        >
          حيث يلتقي
          <br />
          <span style={{ color: "var(--accent)" }}>الأدب</span> بالروح
        </motion.h1>

        {/* Deck */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="font-amiri text-lg sm:text-xl text-[var(--color-text-secondary)] leading-relaxed mb-2 max-w-2xl"
          style={{ textShadow: "0 1px 8px rgba(0,0,0,0.2)" }}
        >
          نصوص، شعر، قصص، ومقالات تُنير الفكر
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-sm sm:text-base text-[var(--color-text-tertiary)] mb-12 max-w-xl leading-relaxed"
          style={{ textShadow: "0 1px 8px rgba(0,0,0,0.2)" }}
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
        <div className="w-px h-12 bg-gradient-to-b from-[var(--accent)] to-transparent" />
      </motion.div>
    </section>
  );
}
