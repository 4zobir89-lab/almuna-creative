"use client";

export default function ErrorPage({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-4 text-center">
      <div className="font-amiri text-5xl sm:text-6xl font-bold text-[var(--color-text-primary)]">
        حدث خطأ
      </div>
      <p className="text-sm sm:text-base text-[var(--color-text-secondary)] max-w-md">
        عذراً، حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.
      </p>
      <button
        onClick={reset}
        className="inline-flex items-center gap-2 rounded-full bg-brand-accent px-6 sm:px-8 py-3 text-white text-sm font-bold tracking-wider hover:bg-brand-gold hover:text-[#1C1917] transition-all"
      >
        إعادة المحاولة
      </button>
    </div>
  );
}
