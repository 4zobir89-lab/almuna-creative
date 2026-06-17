"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { PenTool, BookOpen, Users, BookMarked, ArrowLeft } from "lucide-react";

const categories = [
  { name: "الشعر والفصاحة", count: "١٤٢", href: "/categories/poetry", icon: PenTool, delay: 0 },
  { name: "النثر والقصة", count: "٨٦", href: "/categories/prose", icon: BookOpen, delay: 0.1 },
  { name: "دراسات نقدية", count: "٣٤", href: "/categories/critique", icon: Users, delay: 0.2 },
  { name: "الفن البصري", count: "٥٦", href: "/categories/visual-arts", icon: BookMarked, delay: 0.3 },
];

export function CategoriesSection() {
  return (
    <section className="relative py-20 sm:py-24 px-6 sm:px-8 border-t border-[var(--color-border)] bg-[var(--section-alt)]">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <div className="section-label mb-3 justify-center">
            <span className="section-label-dot" />
            الفهرس الأدبي
          </div>
          <h2 className="font-amiri text-3xl sm:text-4xl font-bold text-[var(--color-text-primary)]">
            الأقسام
          </h2>
        </motion.div>

        {/* Cards with staggered reveal */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <motion.div
              key={cat.href}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: cat.delay, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                href={cat.href}
                className="group relative block p-6 bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-lg overflow-hidden transition-all duration-300 hover:border-[var(--accent)] hover:shadow-[var(--shadow-md)]"
              >
                {/* Hover background fill */}
                <div className="absolute inset-0 bg-[var(--accent)] opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500" />

                {/* Icon with hover animation */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  className="relative z-10"
                >
                  <cat.icon className="w-7 h-7 text-[var(--accent)] mb-4" />
                </motion.div>

                {/* Title */}
                <h3 className="relative z-10 font-amiri text-lg font-bold text-[var(--color-text-primary)] mb-1 group-hover:text-[var(--accent)] transition-colors">
                  {cat.name}
                </h3>

                {/* Count */}
                <p className="relative z-10 text-xs text-[var(--color-text-tertiary)]">
                  {cat.count} نص إبداعي
                </p>

                {/* Arrow appears on hover */}
                <ArrowLeft className="absolute top-6 left-6 w-4 h-4 text-[var(--accent)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
