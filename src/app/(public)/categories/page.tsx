import { prisma } from "@/lib/db";
import Link from "next/link";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "الأقسام",
  description: "تصفح الأقسام الأدبية والثقافية في مؤسسة المنى الإبداعية",
};

const FALLBACK_CATEGORIES = [
  {
    id: "c1",
    slug: "poetry",
    name: "الشعر والفصاحة",
    description: "ديوان الشعر الفصيح والعامي، قصائد عمودية وتفعيلة ونثر",
    sortOrder: 1,
    _count: { posts: 142 },
  },
  {
    id: "c2",
    slug: "prose",
    name: "النثر والقصة",
    description: "القصة القصيرة، الرواية، المقال، الخاطرة، والسيرة الذاتية",
    sortOrder: 2,
    _count: { posts: 86 },
  },
  {
    id: "c3",
    slug: "critique",
    name: "دراسات نقدية",
    description: "نقد أدبي ودراسات نقدية تعنى بالتحليل والتفكيك",
    sortOrder: 3,
    _count: { posts: 34 },
  },
  {
    id: "c4",
    slug: "visual-arts",
    name: "الفن البصري",
    description: "الخط العربي، التصميم الجرافيكي، التصوير، والرسم",
    sortOrder: 4,
    _count: { posts: 56 },
  },
  {
    id: "c5",
    slug: "nasheed",
    name: "النشيد",
    description: "أناشيد وكلمات ملهمة بلا موسيقى",
    sortOrder: 5,
    _count: { posts: 28 },
  },
  {
    id: "c6",
    slug: "magazine",
    name: "إصدارات المجلة",
    description: "إصدارات المجلة الدورية لمؤسسة المنى",
    sortOrder: 6,
    _count: { posts: 12 },
  },
];

const catIcons = [
  "🖊️",
  "📜",
  "🔍",
  "🎨",
  "🎵",
  "📚",
];

export default async function CategoriesPage() {
  let categories: any[] = FALLBACK_CATEGORIES;
  try {
    const dbCats = await prisma.category.findMany({
      include: { _count: { select: { posts: true } } },
      orderBy: { sortOrder: "asc" },
    });
    if (dbCats.length > 0) categories = dbCats;
  } catch {
    // Use fallback
  }

  return (
    <>
      <section className="relative min-h-[40vh] overflow-hidden pt-20 sm:pt-24">
        <div className="pointer-events-none absolute inset-0 bg-gradient-cinema" />
        <div className="pointer-events-none absolute inset-0">
          <div
            className="glow-blob glow-orange"
            style={{ width: 500, height: 500, top: "-20%", left: "50%" }}
          />
          <div
            className="glow-blob glow-purple float-loop"
            style={{ width: 300, height: 300, bottom: "10%", right: "-5%" }}
          />
        </div>
        <div className="noise-overlay" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 pb-12 sm:pb-16 text-center">
          <span className="section-label">
            <span className="section-label-dot" />
            تصفح المحتوى
          </span>
          <h1 className="font-amiri text-4xl sm:text-5xl md:text-6xl font-bold text-[var(--color-text-primary)]">
            الأقسام
          </h1>
          <div className="section-divider mx-auto mt-4 w-20" />
          <p className="mx-auto mt-4 sm:mt-6 max-w-xl text-sm sm:text-base text-[var(--color-text-secondary)]">
            استكشف أقسامنا الأدبية المتنوعة — من الشعر إلى القصة، ومن المقال إلى النقد
          </p>
        </div>
      </section>

      <section
        data-reveal
        className="relative border-t border-[var(--color-border)]"
      >
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="glow-blob glow-purple"
            style={{ width: 400, height: 400, top: "20%", right: "-8%" }}
          />
        </div>
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 py-10 sm:py-14 md:py-16">
          {categories.length === 0 ? (
            <p className="py-20 text-center text-[var(--color-text-secondary)]">
              لا توجد أقسام بعد
            </p>
          ) : (
            <div className="grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
              {categories.map((cat, i) => (
                <Link
                  key={cat.id}
                  href={`/categories/${cat.slug}`}
                  className="glass-card group relative overflow-hidden p-5 sm:p-6 transition-all duration-500 hover:-translate-y-1 rounded-2xl block"
                >
                  <div className="pointer-events-none absolute -inset-x-20 -inset-y-20 bg-gradient-to-r from-transparent via-brand-gold/[0.04] to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                  <div className="relative z-10">
                    <div className="mb-4 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-accent/20 to-brand-gold/20 text-xl sm:text-2xl transition-all duration-300 group-hover:scale-110">
                      {catIcons[i % catIcons.length]}
                    </div>
                    <h2 className="mb-2 text-lg sm:text-xl font-amiri font-bold text-[var(--color-text-primary)] transition-colors duration-300 group-hover:text-brand-gold">
                      {cat.name}
                    </h2>
                    {cat.description && (
                      <p className="mb-3 text-xs sm:text-sm leading-relaxed text-[var(--color-text-secondary)] line-clamp-2">
                        {cat.description}
                      </p>
                    )}
                    <span className="inline-flex items-center gap-1 rounded-full bg-[var(--doppel-bg)] px-3 py-1 text-xs text-[var(--color-text-secondary)] transition-all duration-300 group-hover:bg-brand-gold/20 group-hover:text-brand-gold">
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
