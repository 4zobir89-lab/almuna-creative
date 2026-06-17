import { prisma } from "@/lib/db";
import Link from "next/link";
import { PageHeader } from "@/components/public/page-header";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "الكتّاب",
  description: "كتّاب المنصة والمبدعون المساهمون في المحتوى الأدبي",
};

const FALLBACK_AUTHORS = [
  {
    id: "a1",
    name: "وسيم الزبيري",
    bio: "شاعر وكاتب يمني، مؤسس مؤسسة المنى الإبداعية. يكتب في الشعر الفصيح والنثر الأدبي.",
    country: "اليمن",
    _count: { posts: 87 },
  },
  {
    id: "a2",
    name: "د. خالد القاضي",
    bio: "ناقد أدبي وأكاديمي متخصص في الأدب العربي الحديث. كتب عشرات الدراسات النقدية.",
    country: "السعودية",
    _count: { posts: 42 },
  },
  {
    id: "a3",
    name: "شذى المالكي",
    bio: "كاتبة قصة قصيرة وروائية. حائزة على جوائز أدبية متعددة.",
    country: "الإمارات",
    _count: { posts: 35 },
  },
  {
    id: "a4",
    name: "أحمد الرويلي",
    bio: "شاعر تفعيلة وخواطر. أسلوبه يميزه بالرقة والعذوبة في التعبير.",
    country: "الأردن",
    _count: { posts: 28 },
  },
];

export default async function AuthorsPage() {
  let authors: any[] = FALLBACK_AUTHORS;
  try {
    const dbAuthors = await prisma.user.findMany({
      where: { posts: { some: { status: "PUBLISHED" } } },
      select: {
        id: true,
        name: true,
        bio: true,
        country: true,
        _count: { select: { posts: { where: { status: "PUBLISHED" } } } },
      },
      orderBy: { name: "asc" },
    });
    if (dbAuthors.length > 0) authors = dbAuthors;
  } catch {
    // Use fallback
  }

  return (
    <>
      <PageHeader
        background="/backgrounds/word-workshop.webp"
        label="أصوات الإبداع"
        title="الكتّاب"
        description="تعرف على كتابنا ومبدعينا الذين يثرون المنصة بإبداعاتهم"
      />

      <section data-reveal className="relative border-t border-[var(--color-border)]">
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 py-10 sm:py-14 md:py-16">
          {authors.length === 0 ? (
            <p className="py-20 text-center text-[var(--color-text-secondary)]">لا يوجد كتاب بعد</p>
          ) : (
            <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
              {authors.map((author) => {
                const initial = (author.name || "?").charAt(0);
                return (
                  <Link
                    key={author.id}
                    href={`/authors/${author.id}`}
                    className="glass-card group relative overflow-hidden p-5 sm:p-6 transition-all duration-500 hover:-translate-y-1 rounded-2xl block"
                  >
                    <div className="relative z-10 flex items-start gap-3 sm:gap-4">
                      <div className="flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-accent/20 to-brand-gold/20 text-base sm:text-lg font-bold text-brand-gold shadow-lg shadow-brand-accent/10 transition-all duration-300 group-hover:scale-110">
                        {initial}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h2 className="text-base sm:text-lg font-amiri font-bold text-[var(--color-text-primary)] transition-colors duration-300 group-hover:text-brand-gold">
                          {author.name || "غير معروف"}
                        </h2>
                        {author.country && (
                          <p className="text-xs text-[var(--color-text-tertiary)]">{author.country}</p>
                        )}
                        {author.bio && (
                          <p className="mt-1 text-xs sm:text-sm leading-relaxed text-[var(--color-text-secondary)] line-clamp-2">
                            {author.bio}
                          </p>
                        )}
                        <span className="mt-2 sm:mt-3 inline-flex items-center gap-1 rounded-full bg-brand-gold/10 px-3 py-1 text-xs text-brand-gold">
                          {author._count.posts} نص
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
