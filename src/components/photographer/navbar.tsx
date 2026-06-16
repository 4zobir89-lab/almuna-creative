"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Camera } from "lucide-react";

const navItems = [
  { label: "الرئيسية", href: "#hero" },
  { label: "عن المصور", href: "#about" },
  { label: "الأعمال", href: "#portfolio" },
  { label: "مشاريع", href: "#featured" },
  { label: "الخدمات", href: "#services" },
  { label: "آراء", href: "#testimonials" },
  { label: "تواصل", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (href: string) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#08070a]/90 backdrop-blur-xl border-b border-[#d4a056]/10 py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => go("#hero")}
            className="group flex items-center gap-3"
          >
            <div className="relative">
              <Camera className="w-5 h-5 text-[#d4a056] transition-transform duration-500 group-hover:rotate-12" />
              <div className="absolute inset-0 blur-md bg-[#d4a056]/30 group-hover:bg-[#d4a056]/50 transition-all" />
            </div>
            <div className="flex flex-col items-start leading-none">
              <span className="font-cairo font-bold text-[15px] tracking-wider text-[#f0e6d2]">
                KARIM MANSOUR
              </span>
              <span className="text-[10px] text-[#d4a056]/70 tracking-[0.3em] mt-0.5">
                PHOTOGRAPHY
              </span>
            </div>
          </button>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item, i) => (
              <button
                key={item.href}
                onClick={() => go(item.href)}
                className="relative px-4 py-2 text-sm text-[#bfb5a2] hover:text-[#f0e6d2] transition-colors group"
              >
                <span className="font-tajawal font-medium">{item.label}</span>
                <span className="absolute bottom-1 right-1/2 translate-x-1/2 h-px w-0 bg-[#d4a056] transition-all duration-300 group-hover:w-1/2" />
              </button>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => go("#contact")}
              className="group relative overflow-hidden border border-[#d4a056]/40 px-5 py-2.5 text-sm font-tajawal text-[#f0e6d2] hover:text-[#08070a] transition-colors duration-300"
            >
              <span className="relative z-10">احجز جلسة</span>
              <span className="absolute inset-0 bg-[#d4a056] translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden text-[#f0e6d2] p-2"
            aria-label="القائمة"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-[#08070a] lg:hidden flex flex-col items-center justify-center gap-2"
          >
            {navItems.map((item, i) => (
              <motion.button
                key={item.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.05 }}
                onClick={() => go(item.href)}
                className="text-3xl font-cairo text-[#f0e6d2] hover:text-[#d4a056] transition-colors py-2"
              >
                {item.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
