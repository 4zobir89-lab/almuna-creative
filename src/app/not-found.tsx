import Link from "next/link";

export const dynamic = "force-dynamic";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-4 text-center">
      <div className="font-amiri text-7xl sm:text-8xl font-bold text-gradient-gold">٤٠٤</div>
      <p className="text-xl sm:text-2xl font-amiri text-[var(--color-text-primary)]">
        الصفحة غير موجودة
      </p>
      <p className="text-sm text-[var(--color-text-secondary)] max-w-md">
        عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها إلى موقع آخر.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 rounded-full bg-brand-accent px-6 sm:px-8 py-3 text-white text-sm font-bold tracking-wider hover:bg-brand-gold hover:text-[#1C1917] transition-all"
      >
        ← العودة إلى الرئيسية
      </Link>
    </div>
  );
}
