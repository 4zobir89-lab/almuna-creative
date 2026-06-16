"use client";

export function BackgroundEffects() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* الطبقة الأساسية */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0c0a08] to-[#0a0a0a]" />

      {/* توهج ذهبي مركزي علوي */}
      <div
        className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[60vw] h-[40vw] rounded-full opacity-[0.06] mix-blend-screen"
        style={{
          background: "radial-gradient(ellipse at center, rgba(245,158,11,0.5), rgba(217,119,6,0.15), transparent 70%)",
          filter: "blur(120px)",
        }}
      />

      {/* توهج سفلي */}
      <div
        className="absolute bottom-[-15%] right-[-5%] w-[50vw] h-[50vw] rounded-full opacity-[0.04] mix-blend-screen"
        style={{
          background: "radial-gradient(circle at center, rgba(217,119,6,0.3), transparent 70%)",
          filter: "blur(100px)",
        }}
      />

      {/* توهج جانبي */}
      <div
        className="absolute top-[40%] left-[-10%] w-[30vw] h-[30vw] rounded-full opacity-[0.03] mix-blend-screen"
        style={{
          background: "radial-gradient(circle at center, rgba(245,158,11,0.4), transparent 70%)",
          filter: "blur(150px)",
        }}
      />

      {/* خطوط زخرفية رأسية */}
      <div className="absolute top-0 left-[8%] w-px h-full bg-gradient-to-b from-transparent via-brand-gold/[0.03] to-transparent" />
      <div className="absolute top-0 right-[8%] w-px h-full bg-gradient-to-b from-transparent via-brand-gold/[0.03] to-transparent" />
      <div className="absolute top-0 left-[30%] w-px h-full bg-gradient-to-b from-transparent via-white/[0.015] to-transparent" />
      <div className="absolute top-0 right-[30%] w-px h-full bg-gradient-to-b from-transparent via-white/[0.015] to-transparent" />

      {/* Overlay النويز */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "256px 256px",
        }}
      />
    </div>
  );
}
