import { prisma } from "@/lib/db";
import Link from "next/link";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "الأقسام",
  description: "تصفح الأقسام الأدبية والثقافية في مؤسسة المنى الإبداعية",
};

const catIcons = [
  <svg key="0" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>,
  <svg key="1" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>,
  <svg key="2" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" /></svg>,
  <svg key="3" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" /></svg>,
  <svg key="4" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>,
  <svg key="5" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>,
];

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany({
    include: { _count: { select: { posts: true } } },
    orderBy: { sortOrder: "asc" },
  });

  return (
    <>
      <section className="relative min-h-[40vh] overflow-hidden pt-32">
        <div className="pointer-events-none absolute inset-0 bg-gradient-cinema" />
        <div className="pointer-events-none absolute inset-0">
          <div className="glow-blob glow-orange" style={{ width: 500, height: 500, top: "-20%", left: "50%" }} />
          <div className="glow-blob glow-amber float-loop" style={{ width: 300, height: 300, bottom: "10%", right: "-5%" }} />
        </div>
        <div className="noise-overlay" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 pb-16 text-center">
          <span className="section-label">
            <span className="section-label-dot" />
            تصفح المحتوى
          </span>
          <h1 className="font-amiri text-4xl font-bold text-white md:text-6xl">الأقسام</h1>
          <div className="section-divider mx-auto mt-4 w-20" />
          <p className="mx-auto mt-6 max-w-xl text-white/50">
            استكشف أقسامنا الأدبية المتنوعة — من الشعر إلى القصة، ومن المقال إلى النقد
          </p>
        </div>
      </section>

      <section data-reveal className="relative border-t border-white/[0.06]">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="glow-blob glow-purple" style={{ width: 400, height: 400, top: "20%", right: "-8%" }} />
        </div>
        <div className="relative mx-auto max-w-6xl px-4 py-16">
          {categories.length === 0 ? (
            <p className="py-20 text-center text-white/40">لا توجد أقسام بعد</p>
          ) : (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {categories.map((cat, i) => (
                <Link
                  key={cat.id}
                  href={`/categories/${cat.slug}`}
                  className="glass-card group relative overflow-hidden p-6 transition-all duration-500 hover:-translate-y-1"
                  data-reveal
                >
                  <div className="pointer-events-none absolute -inset-x-20 -inset-y-20 bg-gradient-to-r from-transparent via-orange-500/[0.04] to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                  <div className="gradient-border-mask absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="relative z-10">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500/20 to-amber-500/20 text-orange-400 transition-all duration-300 group-hover:scale-110 group-hover:from-orange-500/30 group-hover:to-amber-500/30">
                      {catIcons[i % catIcons.length]}
                    </div>
                    <h2 className="mb-2 text-xl font-amiri font-bold text-white transition-colors duration-300 group-hover:text-orange-300">
                      {cat.name}
                    </h2>
                    {cat.description && (
                      <p className="mb-3 text-sm leading-relaxed text-white/50 line-clamp-2">{cat.description}</p>
                    )}
                    <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-xs text-white/50 transition-all duration-300 group-hover:bg-orange-500/20 group-hover:text-orange-300/80">
                      {cat._count.posts} نص
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
