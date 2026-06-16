"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { useTheme } from "@/components/providers/theme-provider";
import { Sun, Moon, Menu, X, Search } from "lucide-react";

const PREMIUM_EASE = "cubic-bezier(0.32,0.72,0,1)";

const links = [
  { href: "/", label: "الرئيسية" },
  { href: "/archive", label: "الأرشيف" },
  { href: "/categories", label: "الأقسام" },
  { href: "/authors", label: "الكتّاب" },
  { href: "/events", label: "الفعاليات" },
  { href: "/magazine", label: "المجلة" },
  { href: "/about", label: "عن المؤسسة" },
];

export function Navbar() {
  const pathname = usePathname();
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const closeMenu = useCallback(() => setOpen(false), []);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[50] flex justify-center px-3 sm:px-4 md:px-6 pt-3 sm:pt-4 md:pt-6">
        <div
          className={`relative flex items-center justify-between transition-all duration-700 w-full rounded-2xl sm:rounded-full
            ${
              scrolled
                ? "bg-[var(--nav-bg-solid)] backdrop-blur-2xl border border-[var(--nav-border)] shadow-[0_8px_32px_rgba(0,0,0,0.25)] max-w-7xl"
                : "bg-[var(--nav-bg)] backdrop-blur-md border border-transparent max-w-7xl"
            }`}
          style={{ transitionTimingFunction: PREMIUM_EASE }}
        >
          {/* Subtle decorative accents */}
          {scrolled && (
            <div className="absolute inset-0 rounded-2xl sm:rounded-full overflow-hidden pointer-events-none">
              <div className="absolute bottom-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-brand-gold/10 to-transparent" />
            </div>
          )}

          <div className="relative flex items-center justify-between w-full h-14 sm:h-16 px-4 sm:px-5 md:px-6">
            {/* Logo */}
            <Link
              href="/"
              onClick={closeMenu}
              className="group relative flex items-center gap-2 sm:gap-3 z-50 flex-shrink-0"
            >
              <div
                className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-accent to-brand-gold text-white shadow-[0_0_20px_rgba(217,119,6,0.3)] transition-all duration-500 group-hover:scale-105 group-hover:shadow-[0_0_30px_rgba(245,158,11,0.4)]"
                style={{ transitionTimingFunction: PREMIUM_EASE }}
              >
                <span className="font-amiri text-lg sm:text-xl font-bold">م</span>
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-sm sm:text-base font-amiri font-bold text-[var(--color-text-primary)] tracking-wide">
                  مؤسسة المنى
                </span>
                <span className="text-[8px] sm:text-[9px] text-brand-gold tracking-[0.2em] sm:tracking-[0.25em] uppercase">
                  الإبداعية
                </span>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-0.5 rounded-full bg-[var(--doppel-bg)] border border-[var(--doppel-border)] p-1">
              {links.map((link) => {
                const active =
                  pathname === link.href ||
                  (link.href !== "/" && pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative px-3 xl:px-4 py-1.5 sm:py-2 text-xs xl:text-sm font-medium transition-all duration-500 rounded-full whitespace-nowrap ${
                      active
                        ? "text-[var(--color-text-primary)]"
                        : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                    }`}
                    style={{ transitionTimingFunction: PREMIUM_EASE }}
                  >
                    {active && (
                      <span className="absolute inset-0 rounded-full bg-brand-gold/10 border border-brand-gold/20" />
                    )}
                    <span className="relative z-10">{link.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-1.5 sm:gap-2 z-50">
              {/* Search button */}
              <Link
                href="/search"
                aria-label="بحث"
                className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-[var(--doppel-bg)] border border-[var(--doppel-border)] text-[var(--color-text-secondary)] transition-all duration-500 hover:bg-brand-accent hover:text-white hover:border-brand-accent"
                style={{ transitionTimingFunction: PREMIUM_EASE }}
              >
                <Search className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </Link>

              {/* Theme toggle */}
              <button
                onClick={toggle}
                aria-label={theme === "dark" ? "تفعيل الوضع الفاتح" : "تفعيل الوضع الداكن"}
                className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-[var(--doppel-bg)] border border-[var(--doppel-border)] text-[var(--color-text-secondary)] transition-all duration-500 hover:bg-brand-gold hover:text-[#1C1917] hover:border-brand-gold"
                style={{ transitionTimingFunction: PREMIUM_EASE }}
              >
                {mounted && theme === "dark" ? (
                  <Sun className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                ) : (
                  <Moon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                )}
              </button>

              {/* Contact CTA - desktop only */}
              <Link
                href="/contact"
                className="hidden xl:inline-flex items-center px-4 py-2 rounded-full bg-brand-accent text-white text-xs font-bold tracking-wider hover:bg-brand-gold hover:text-[#1C1917] transition-all duration-500"
                style={{ transitionTimingFunction: PREMIUM_EASE }}
              >
                تواصل معنا
              </Link>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setOpen(!open)}
                aria-label={open ? "إغلاق القائمة" : "فتح القائمة"}
                className="lg:hidden relative flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-[var(--doppel-bg)] border border-[var(--doppel-border)] text-[var(--color-text-primary)]"
              >
                {open ? (
                  <X className="h-4 w-4 sm:h-5 sm:w-5" />
                ) : (
                  <Menu className="h-4 w-4 sm:h-5 sm:w-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {open && (
        <div
          className="lg:hidden fixed inset-0 z-[49] bg-black/60 backdrop-blur-sm"
          onClick={closeMenu}
        />
      )}

      {/* Mobile menu drawer */}
      <div
        className={`lg:hidden fixed top-0 left-0 right-0 z-[51] transition-all duration-500 ${
          open ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
        }`}
        style={{ transitionTimingFunction: PREMIUM_EASE }}
      >
        <div className="mx-3 sm:mx-4 mt-20 sm:mt-24 rounded-2xl bg-[var(--nav-bg-solid)] backdrop-blur-2xl border border-[var(--nav-border)] shadow-2xl overflow-hidden">
          <nav className="flex flex-col p-3">
            {links.map((link, i) => {
              const active =
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className={`relative px-5 py-3.5 rounded-xl text-base font-amiri transition-all duration-300 ${
                    active
                      ? "text-brand-gold bg-brand-gold/5"
                      : "text-[var(--color-text-primary)] hover:text-brand-gold hover:bg-[var(--doppel-bg)]"
                  }`}
                  style={{
                    transitionDelay: open ? `${i * 40}ms` : "0ms",
                    transitionTimingFunction: PREMIUM_EASE,
                  }}
                >
                  {link.label}
                  {active && (
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 w-1 h-6 rounded-full bg-brand-gold" />
                  )}
                </Link>
              );
            })}
            <Link
              href="/contact"
              onClick={closeMenu}
              className="mt-2 mx-5 mb-2 px-5 py-3 rounded-xl text-center bg-brand-accent text-white text-sm font-bold tracking-wider"
            >
              تواصل معنا
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
}
