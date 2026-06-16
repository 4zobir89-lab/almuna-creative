"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const PREMIUM_EASE = "cubic-bezier(0.32,0.72,0,1)";

export function Hero() {
  const [mounted, setMounted] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        setScrollY(Math.min(Math.max(-rect.top / rect.height, 0), 1));
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-[100dvh] flex flex-col items-center justify-center w-full px-4 pt-24 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#0d0b09] to-[#050505]" />

        <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[80vw] h-[50vw] rounded-full opacity-[0.10]"
          style={{
            background: "radial-gradient(ellipse at center, rgba(245,158,11,0.5), rgba(217,119,6,0.15), transparent 70%)",
            filter: "blur(120px)",
          }}
        />

        <div className="absolute top-[5%] -left-[10%] w-[40vw] h-[40vw] rounded-full opacity-[0.06]"
          style={{
            background: "radial-gradient(circle at center, rgba(245,158,11,0.4), transparent 70%)",
            filter: "blur(140px)",
          }}
        />
        <div className="absolute bottom-[5%] -right-[8%] w-[30vw] h-[30vw] rounded-full opacity-[0.05]"
          style={{
            background: "radial-gradient(circle at center, rgba(217,119,6,0.5), transparent 70%)",
            filter: "blur(120px)",
          }}
        />

        <div className="absolute top-0 left-[12%] w-px h-full bg-gradient-to-b from-transparent via-brand-gold/[0.04] to-transparent" />
        <div className="absolute top-0 right-[12%] w-px h-full bg-gradient-to-b from-transparent via-brand-gold/[0.04] to-transparent" />

        <svg className="absolute top-[18%] right-[4%] w-24 h-24 opacity-[0.06] float-loop"
          viewBox="0 0 100 100" fill="none" stroke="#F59E0B" strokeWidth="0.5">
          <path d="M50 0 L61.8 19 L83 14.6 L72.8 34 L93.3 45.1 L73.6 57 L77.5 78.5 L57 72 L44.7 90 L32 72 L12 77.5 L15 57 L0 45 L15 34 L6.7 14.6 L27.5 19 Z" />
        </svg>

        <svg className="absolute bottom-[18%] left-[5%] w-20 h-20 opacity-[0.08] float-loop-delayed"
          viewBox="0 0 100 100" fill="none" stroke="#F59E0B" strokeWidth="0.5">
          <path d="M50 5 L55 12 L63 10 L61 18 L68 23 L61 28 L63 36 L55 34 L50 42 L45 34 L37 36 L39 28 L32 23 L39 18 L37 10 L45 12 Z" />
        </svg>

        <div className="absolute top-[20%] left-[3%] w-px h-[60%] bg-gradient-to-b from-transparent via-brand-gold/[0.03] to-transparent rotate-[12deg]" />
        <div className="absolute bottom-[20%] right-[3%] w-px h-[40%] bg-gradient-to-b from-transparent via-brand-gold/[0.03] to-transparent -rotate-[8deg]" />
      </div>

      {/* Large Kufi watermark — pushed to left, higher opacity */}
      <div
        className="absolute left-[-5%] top-1/2 -translate-y-1/2 pointer-events-none select-none z-[1]"
        style={{ opacity: 0.06 - scrollY * 0.04 }}
      >
        <div className="font-noto-kufi text-[18vw] md:text-[22vw] font-bold text-white leading-none tracking-tight text-left">
          المنى
        </div>
      </div>

      {/* Geometric frame — top-right corner */}
      <div className="absolute top-8 right-8 z-[2] pointer-events-none" style={{ opacity: 0.08 - scrollY * 0.05 }}>
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none" stroke="#F59E0B" strokeWidth="0.8">
          <rect x="0" y="0" width="120" height="120" />
          <line x1="120" y1="0" x2="80" y2="40" />
          <line x1="80" y1="40" x2="80" y2="80" />
          <line x1="80" y1="80" x2="120" y2="120" />
        </svg>
      </div>

      {/* Geometric frame — bottom-left corner */}
      <div className="absolute bottom-8 left-8 z-[2] pointer-events-none" style={{ opacity: 0.08 - scrollY * 0.05 }}>
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none" stroke="#F59E0B" strokeWidth="0.8">
          <rect x="0" y="0" width="80" height="80" />
          <line x1="0" y1="80" x2="40" y2="40" />
          <line x1="40" y1="40" x2="40" y2="0" />
        </svg>
      </div>

      {/* Content — asymmetric, pushed right */}
      <div className="relative z-10 flex flex-col items-end text-right max-w-5xl mx-auto w-full">
        <div
          className="mb-10 transition-all duration-1000"
          style={{ transitionTimingFunction: PREMIUM_EASE }}
        >
          <span className={`inline-flex items-center gap-3 font-tajawal text-brand-gold/60 text-xs font-bold tracking-[0.3em] uppercase transition-all duration-1000 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}
            style={{ transitionTimingFunction: PREMIUM_EASE }}>
            مؤسسة المنى الإبداعية
            <span className="w-12 h-px bg-brand-gold/30" />
          </span>
        </div>

        <h1 className="font-amiri text-[2.4rem] sm:text-[3.5rem] md:text-[5.5rem] lg:text-[7.5rem] xl:text-[9rem] font-bold text-white leading-[0.95] mb-6 tracking-tight text-right">
          <div className={`transition-all duration-1000 delay-300 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}`}
            style={{ transitionTimingFunction: PREMIUM_EASE }}>
            حيث يلتقي
          </div>
          <div className={`transition-all duration-1000 delay-500 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}`}
            style={{ transitionTimingFunction: PREMIUM_EASE }}>
            <span className="text-gradient-gold-light relative inline-block">
              الأدب
              <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-brand-gold/40 via-brand-gold to-brand-gold/40 rounded-full" />
            </span>
            <span> بالروح</span>
          </div>
        </h1>

        <div className={`geometric-divider mb-8 transition-all duration-1000 delay-700 ${mounted ? 'scale-x-100' : 'scale-x-0'}`}
          style={{ transitionTimingFunction: PREMIUM_EASE }} />

        <p className={`font-tajawal text-ink-400 text-lg md:text-xl max-w-2xl leading-relaxed mb-12 font-light transition-all duration-1000 delay-800 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
          style={{ transitionTimingFunction: PREMIUM_EASE }}>
          نصوص، شعر، قصص، ومقالات تُنير الفكر.
          <span className="block text-ink-500/70 text-base mt-2">
            استكشف الإبداع في أبهى صوره، متجرداً من كل شيء إلا المعنى.
          </span>
        </p>

        <div className={`flex flex-col sm:flex-row items-center gap-5 transition-all duration-1000 delay-1000 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
          style={{ transitionTimingFunction: PREMIUM_EASE }}>
          <Link href="/archive"
            className="group relative inline-flex items-center gap-3 px-8 py-3.5 bg-brand-gold text-ink-950 font-tajawal font-bold text-sm tracking-wider rounded-full transition-all duration-700 active:scale-[0.98] hover:shadow-[0_0_40px_rgba(245,158,11,0.25)]"
            style={{ transitionTimingFunction: PREMIUM_EASE }}>
            <span className="relative z-10 flex items-center gap-3">
              استعرض الأرشيف
              <span className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center transition-all duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </span>
            </span>
          </Link>
          <Link href="/categories"
            className="group relative inline-flex items-center px-8 py-3.5 font-tajawal text-sm tracking-wider rounded-full transition-all duration-700 border border-ink-700 text-ink-300 hover:border-brand-gold/50 hover:text-brand-gold"
            style={{ transitionTimingFunction: PREMIUM_EASE }}>
            استكشف الأقسام
          </Link>
        </div>
      </div>

      <div className={`absolute bottom-10 left-1/2 -translate-x-1/2 transition-all duration-1000 delay-1500 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
        style={{ transitionTimingFunction: PREMIUM_EASE }}>
        <div className="flex flex-col items-center gap-3">
          <span className="font-tajawal text-[10px] text-ink-600 tracking-[0.3em] uppercase">اكتشف</span>
          <div className="w-px h-10 bg-gradient-to-b from-brand-gold/40 to-transparent" />
        </div>
      </div>
    </section>
  );
}
