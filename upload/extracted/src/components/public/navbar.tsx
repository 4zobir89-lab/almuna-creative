"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useCallback } from "react";

const PREMIUM_EASE = "cubic-bezier(0.32,0.72,0,1)";

const links = [
  { href: "/", label: "الرئيسية" },
  { href: "/archive", label: "الأرشيف" },
  { href: "/categories", label: "الأقسام" },
  { href: "/authors", label: "الكتّاب" },
  { href: "/events", label: "الفعاليات" },
  { href: "/magazine", label: "المجلة" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = useCallback(() => setOpen(false), []);

  return (
    <header className="fixed top-0 left-0 right-0 z-[50] flex justify-center pt-4 md:pt-6">
      <div className={`relative flex items-center justify-between transition-all duration-700 w-full mx-4 md:mx-6 rounded-full
        ${scrolled
          ? "bg-[#050505]/80 backdrop-blur-2xl border border-white/[0.06] shadow-[0_8px_32px_rgba(0,0,0,0.4)] max-w-7xl"
          : "bg-transparent border border-transparent max-w-7xl"
        }`}
        style={{ transitionTimingFunction: PREMIUM_EASE }}
      >
        {/* الزخرفة الهندسية الخلفية عند التمرير */}
        {scrolled && (
          <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
            <div className="absolute inset-0 arabesque-tessellation opacity-[0.015]" />
            <div className="absolute bottom-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-brand-gold/10 to-transparent" />
            <div className="absolute top-[30%] right-[2%] w-px h-[40%] bg-gradient-to-b from-transparent via-brand-gold/[0.03] to-transparent" />
            <div className="absolute top-[30%] left-[2%] w-px h-[40%] bg-gradient-to-b from-transparent via-brand-gold/[0.03] to-transparent" />
          </div>
        )}

        <div className="relative flex items-center justify-between w-full h-16 px-5 md:px-6">
          <Link href="/" className="group relative flex items-center gap-3 z-50">
            {/* نجمة زخرفية خلف الشعار */}
            <div className="hidden md:block absolute -top-5 -right-5 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
              <svg viewBox="0 0 60 60" className="w-full h-full text-brand-gold/10" aria-hidden="true">
                <path d="M30 2 L36 14 L50 14 L38 24 L42 38 L30 30 L18 38 L22 24 L10 14 L24 14 Z" fill="currentColor" />
              </svg>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-accent to-brand-gold text-white shadow-[0_0_20px_rgba(217,119,6,0.3)] transition-all duration-700 group-hover:scale-105 group-hover:shadow-[0_0_30px_rgba(245,158,11,0.3)]"
              style={{ transitionTimingFunction: PREMIUM_EASE }}>
              <span className="font-amiri text-xl font-bold">م</span>
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="text-base font-amiri font-bold text-white tracking-wide">مؤسسة المنى</span>
              <span className="text-[9px] text-brand-gold/80 tracking-[0.25em] uppercase">الإبداعية</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-0.5 rounded-full bg-white/[0.03] border border-white/[0.06] p-1 backdrop-blur-md">
            {links.map((link) => {
              const active = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link key={link.href} href={link.href}
                  className={`relative px-4 py-2 text-sm font-medium transition-all duration-500 rounded-full ${
                    active ? "text-white" : "text-ink-300 hover:text-white"
                  }`}
                  style={{ transitionTimingFunction: PREMIUM_EASE }}>
                  {active && (
                    <span className="absolute inset-0 rounded-full bg-brand-gold/10 border border-brand-gold/20" />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 z-50">
            <Link href="/search" aria-label="بحث"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/[0.04] border border-white/[0.08] text-ink-300 transition-all duration-500 hover:bg-brand-accent hover:text-white hover:border-brand-accent"
              style={{ transitionTimingFunction: PREMIUM_EASE }}>
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </Link>
            <button onClick={() => setOpen(!open)}
              aria-label={open ? "إغلاق القائمة" : "فتح القائمة"}
              className="md:hidden relative flex h-9 w-9 items-center justify-center rounded-full bg-white/[0.04] border border-white/[0.08] text-ink-300 overflow-hidden">
              <span className={`absolute w-4 h-px bg-current transition-all duration-500 ${open ? 'rotate-45 translate-y-0' : '-translate-y-1.5'}`}
                style={{ transitionTimingFunction: PREMIUM_EASE }} />
              <span className={`absolute w-4 h-px bg-current transition-all duration-500 ${open ? 'opacity-0 translate-x-2' : 'opacity-100'}`}
                style={{ transitionTimingFunction: PREMIUM_EASE }} />
              <span className={`absolute w-4 h-px bg-current transition-all duration-500 ${open ? '-rotate-45 translate-y-0' : 'translate-y-1.5'}`}
                style={{ transitionTimingFunction: PREMIUM_EASE }} />
            </button>
          </div>
        </div>

        <div className={`absolute top-full left-0 right-0 mt-2 rounded-2xl bg-[#050505]/95 backdrop-blur-3xl border border-white/[0.06] shadow-2xl transition-all duration-700 overflow-hidden md:hidden
          ${open ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'}`}
          style={{ transformOrigin: 'top center', transitionTimingFunction: PREMIUM_EASE }}>
          <nav className="flex flex-col gap-1 p-3">
            {links.map((link, i) => (
              <Link key={link.href} href={link.href} onClick={closeMenu}
                className={`relative px-5 py-3.5 rounded-xl text-lg font-amiri text-ink-200 hover:text-brand-gold hover:bg-white/[0.03] transition-all duration-500 ${
                  open ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }`}
                style={{ transitionDelay: open ? `${150 + i * 60}ms` : '0ms', transitionTimingFunction: PREMIUM_EASE }}>
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
