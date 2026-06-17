"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, BookOpen, Menu, X, Search } from "lucide-react";
import Image from "next/image";

const links = [
  { href: "/", label: "الرئيسية" },
  { href: "/archive", label: "الأرشيف" },
  { href: "/categories", label: "الأقسام" },
  { href: "/authors", label: "الكتّاب" },
  { href: "/events", label: "الفعاليات" },
  { href: "/magazine", label: "المجلة" },
  { href: "/about", label: "عن المؤسسة" },
];

type Theme = "light" | "dark" | "sepia";

function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem("almuna-theme") as Theme;
      if (stored === "light" || stored === "dark" || stored === "sepia") {
        setTheme(stored);
      }
    } catch {}
  }, []);

  const applyTheme = (t: Theme) => {
    const root = document.documentElement;
    root.classList.remove("dark", "sepia");
    if (t === "dark") root.classList.add("dark");
    else if (t === "sepia") root.classList.add("sepia");
  };

  const setThemeValue = (t: Theme) => {
    setTheme(t);
    try {
      localStorage.setItem("almuna-theme", t);
      applyTheme(t);
    } catch {}
    setOpen(false);
  };

  const themes: { value: Theme; label: string; icon: typeof Sun }[] = [
    { value: "light", label: "فاتح", icon: Sun },
    { value: "sepia", label: "ورقي", icon: BookOpen },
    { value: "dark", label: "داكن", icon: Moon },
  ];

  const CurrentIcon = mounted
    ? themes.find((t) => t.value === theme)?.icon || Sun
    : Sun;

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        aria-label="تبديل الثيم"
        className="flex h-9 w-9 items-center justify-center rounded-md text-[var(--color-text-secondary)] hover:text-[var(--accent)] transition-colors touch-target"
      >
        <CurrentIcon className="w-[18px] h-[18px]" />
      </button>

      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-[60]" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-full mt-2 left-0 z-[70] p-1.5 rounded-md bg-[var(--color-surface)] border border-[var(--color-border)] shadow-lg min-w-[140px]"
            >
              {themes.map((t) => (
                <button
                  key={t.value}
                  onClick={() => setThemeValue(t.value)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded text-sm transition-colors ${
                    theme === t.value
                      ? "bg-[var(--doppel-bg)] text-[var(--accent)]"
                      : "text-[var(--color-text-secondary)] hover:bg-[var(--doppel-bg)] hover:text-[var(--color-text-primary)]"
                  }`}
                >
                  <t.icon className="w-4 h-4" />
                  <span className="flex-1 text-right">{t.label}</span>
                  {theme === t.value && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                  )}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, []);

  const closeMenu = useCallback(() => setOpen(false), []);

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled ? "nav-blur py-2.5" : "bg-transparent py-4"
        }`}
      >
        <div className="mx-auto max-w-6xl px-5 sm:px-6 flex items-center justify-between gap-4">
          {/* Logo — no decorative ring/shadow (anti-slop) */}
          <Link href="/" onClick={closeMenu} className="flex items-center gap-2.5 flex-shrink-0">
            <div className="relative w-9 h-9 rounded-md overflow-hidden">
              <Image
                src="/logo-almuna-small.png"
                alt="شعار مؤسسة المنى الإبداعية"
                fill
                className="object-cover"
                sizes="36px"
              />
            </div>
            <span className="font-amiri text-lg font-bold text-[var(--color-text-primary)]">
              المنى
            </span>
          </Link>

          {/* Desktop nav — flat links, no pill container */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {links.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    active
                      ? "text-[var(--accent)]"
                      : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                  }`}
                >
                  {link.label}
                  {active && (
                    <span className="absolute -bottom-px inset-x-3 h-px bg-[var(--accent)]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right actions — minimal */}
          <div className="flex items-center gap-1 flex-shrink-0">
            <Link
              href="/search"
              aria-label="بحث"
              className="flex h-9 w-9 items-center justify-center rounded-md text-[var(--color-text-secondary)] hover:text-[var(--accent)] transition-colors touch-target"
            >
              <Search className="w-[18px] h-[18px]" />
            </Link>

            <ThemeToggle />

            <button
              onClick={() => setOpen(!open)}
              aria-label={open ? "إغلاق القائمة" : "فتح القائمة"}
              className="lg:hidden flex h-9 w-9 items-center justify-center rounded-md text-[var(--color-text-primary)] touch-target"
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={closeMenu}
              className="lg:hidden fixed inset-0 z-[51] bg-black/40"
            />

            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="lg:hidden fixed top-[60px] inset-x-3 z-[52]"
            >
              <div className="rounded-md bg-[var(--color-surface)] border border-[var(--color-border)] shadow-lg overflow-hidden">
                <nav className="flex flex-col p-1.5">
                  {links.map((link, i) => {
                    const active = isActive(link.href);
                    return (
                      <motion.div
                        key={link.href}
                        initial={{ opacity: 0, x: 12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.05 + i * 0.03 }}
                      >
                        <Link
                          href={link.href}
                          onClick={closeMenu}
                          className={`block px-4 py-3 rounded text-base font-amiri transition-colors ${
                            active
                              ? "text-[var(--accent)] bg-[var(--doppel-bg)]"
                              : "text-[var(--color-text-primary)] hover:bg-[var(--doppel-bg)]"
                          }`}
                        >
                          {link.label}
                        </Link>
                      </motion.div>
                    );
                  })}
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
