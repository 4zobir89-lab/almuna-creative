import { prisma } from "@/lib/db";
import Link from "next/link";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "الكتّاب",
  description: "كتّاب المنصة والمبدعون المساهمون في المحتوى الأدبي",
};

export default async function AuthorsPage() {
  const authors = await prisma.user.findMany({
    where: { posts: { some: { status: "PUBLISHED" } } },
    select: {
      id: true, name: true, bio: true, country: true,
      _count: { select: { posts: { where: { status: "PUBLISHED" } } } },
    },
    orderBy: { name: "asc" },
  });

  return (
    <>
      <section className="relative min-h-[40vh] overflow-hidden pt-32">
        <div className="pointer-events-none absolute inset-0 bg-gradient-cinema" />
        <div className="pointer-events-none absolute inset-0">
          <div className="glow-blob glow-purple" style={{ width: 500, height: 500, top: "-15%", left: "50%" }} />
          <div className="glow-blob glow-orange float-loop" style={{ width: 300, height: 300, bottom: "10%", right: "-5%" }} />
        </div>
        <div className="noise-overlay" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 pb-16 text-center">
          <span className="section-label">
            <span className="section-label-dot" />
            أصوات الإبداع
          </span>
          <h1 className="font-amiri text-4xl font-bold text-white md:text-6xl">الكتّاب</h1>
          <div className="section-divider mx-auto mt-4 w-20" />
          <p className="mx-auto mt-6 max-w-xl text-white/50">
            تعرف على كتابنا ومبدعينا الذين يثرون المنصة بإبداعاتهم
          </p>
        </div>
      </section>

      <section data-reveal className="relative border-t border-white/[0.06]">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="glow-blob glow-amber" style={{ width: 350, height: 350, top: "10%", right: "-8%" }} />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 py-16">
          {authors.length === 0 ? (
            <p className="py-20 text-center text-white/40">لا يوجد كتاب بعد</p>
          ) : (
            <div className="grid gap-5 md:grid-cols-2">
              {authors.map((author) => {
                const initial = (author.name || "?").charAt(0);
                return (
                  <Link
                    key={author.id}
                    href={`/authors/${author.id}`}
                    className="glass-card group relative overflow-hidden p-6 transition-all duration-500 hover:-translate-y-1"
                    data-reveal
                  >
                    <div className="pointer-events-none absolute -inset-x-20 -inset-y-20 bg-gradient-to-r from-transparent via-orange-500/[0.04] to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                    <div className="gradient-border-mask absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <div className="relative z-10 flex items-start gap-4">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-orange-500/20 to-amber-500/20 text-lg font-bold text-orange-300 shadow-lg shadow-orange-500/10 transition-all duration-300 group-hover:scale-110 group-hover:from-orange-500/30 group-hover:to-amber-500/30">
                        {initial}
                      </div>
                      <div className="min-w-0">
                        <h2 className="text-lg font-amiri font-bold text-white transition-colors duration-300 group-hover:text-orange-300">
                          {author.name || "غير معروف"}
                        </h2>
                        {author.country && (
                          <p className="text-xs text-white/40">{author.country}</p>
                        )}
                        {author.bio && (
                          <p className="mt-1 text-sm leading-relaxed text-white/50 line-clamp-2">{author.bio}</p>
                        )}
                        <span className="mt-3 inline-flex items-center gap-1 rounded-full bg-orange-500/10 px-3 py-1 text-xs text-orange-300/80">
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
