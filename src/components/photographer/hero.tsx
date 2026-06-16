"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown, Aperture } from "lucide-react";

export function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, 200]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);
  const scale = useTransform(scrollY, [0, 800], [1, 1.15]);

  const [time, setTime] = useState("");
  useEffect(() => {
    const update = () => {
      const d = new Date();
      const h = d.getHours().toString().padStart(2, "0");
      const m = d.getMinutes().toString().padStart(2, "0");
      setTime(`${h}:${m}`);
    };
    update();
    const t = setInterval(update, 30000);
    return () => clearInterval(t);
  }, []);

  return (
    <section
      id="hero"
      className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-black"
    >
      {/* Background image with parallax + Ken Burns */}
      <motion.div
        style={{ y, scale }}
        className="absolute inset-0 z-0"
      >
        <div
          className="absolute inset-0 bg-cover bg-center ken-burns img-cinematic"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=2600&auto=format&fit=crop')",
          }}
        />
        {/* Cinematic color grading overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black/95" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#08070a] via-transparent to-black/40" />
        <div
          className="absolute inset-0 mix-blend-soft-light opacity-60"
          style={{
            background:
              "radial-gradient(ellipse at 70% 40%, rgba(212,160,86,0.35), transparent 60%)",
          }}
        />
        <div
          className="absolute inset-0 mix-blend-color opacity-30"
          style={{
            background:
              "linear-gradient(135deg, rgba(60,40,20,0.5), rgba(20,15,12,0.2))",
          }}
        />
      </motion.div>

      {/* Top metadata bar - cinematic film slate feel */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 1 }}
        style={{ opacity }}
        className="absolute top-24 sm:top-28 inset-x-0 z-10 px-5 sm:px-8"
      >
        <div className="mx-auto max-w-7xl flex items-center justify-between text-[10px] sm:text-xs tracking-[0.3em] text-[#d4a056]/60 uppercase">
          <div className="flex items-center gap-2 sm:gap-4">
            <span>ROLL 047</span>
            <span className="hidden sm:inline">·</span>
            <span className="hidden sm:inline">35MM</span>
            <span className="hidden md:inline">·</span>
            <span className="hidden md:inline">F/2.8</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <span className="hidden sm:inline">ISTANBUL</span>
            <span className="hidden sm:inline">·</span>
            <span>{time}</span>
          </div>
        </div>
      </motion.div>

      {/* Main hero content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-5">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6"
        >
          <div className="inline-flex items-center gap-3 px-4 py-2 border border-[#d4a056]/30 backdrop-blur-sm">
            <Aperture className="w-3.5 h-3.5 text-[#d4a056] animate-[spin_8s_linear_infinite]" />
            <span className="text-[11px] tracking-[0.4em] text-[#d4a056] uppercase font-medium">
              مصور فوتوغرافي سينمائي
            </span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="font-amiri text-[14vw] sm:text-[10vw] lg:text-[8.5vw] leading-[0.95] text-[#f0e6d2] text-cinematic"
          dir="rtl"
        >
          كريم
          <br />
          <span className="text-gold-gradient">منصور</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 1.2 }}
          className="mt-8 max-w-2xl text-base sm:text-lg lg:text-xl text-[#bfb5a2] leading-relaxed font-tajawal"
        >
          أصوّر اللحظات كما لو كانت لقطة من فيلم.
          <br className="hidden sm:block" />
          <span className="text-[#f0e6d2]/80">
            ضوء، ظل، وقصة تُروى في إطار واحد.
          </span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 1.2 }}
          className="mt-12 flex flex-col sm:flex-row items-center gap-4"
        >
          <button
            onClick={() =>
              document.querySelector("#portfolio")?.scrollIntoView({ behavior: "smooth" })
            }
            className="group relative overflow-hidden bg-[#d4a056] text-[#08070a] px-8 py-4 font-tajawal font-semibold tracking-wide text-sm hover:shadow-[0_0_40px_rgba(212,160,86,0.4)] transition-all duration-500"
          >
            <span className="relative z-10 flex items-center gap-2">
              استعرض المعرض
              <span className="inline-block transition-transform group-hover:-translate-x-1">←</span>
            </span>
            <span className="absolute inset-0 bg-[#f0d090] scale-x-0 group-hover:scale-x-100 origin-right transition-transform duration-500" />
          </button>
          <button
            onClick={() =>
              document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })
            }
            className="border border-[#f0e6d2]/20 text-[#f0e6d2] px-8 py-4 font-tajawal tracking-wide text-sm hover:border-[#d4a056]/60 hover:text-[#d4a056] transition-all duration-500 backdrop-blur-sm"
          >
            احجز جلسة تصوير
          </button>
        </motion.div>
      </div>

      {/* Bottom scroll indicator */}
      <motion.div
        style={{ opacity }}
        className="absolute bottom-8 inset-x-0 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] tracking-[0.4em] text-[#bfb5a2]/60 uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-4 h-4 text-[#d4a056]" />
        </motion.div>
      </motion.div>

      {/* Cinematic letterbox bars */}
      <div className="absolute top-0 inset-x-0 h-[6vh] bg-black z-20" />
      <div className="absolute bottom-0 inset-x-0 h-[6vh] bg-black z-20" />
    </section>
  );
}
