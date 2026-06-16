import { prisma } from "@/lib/db";
import { PostGrid } from "@/components/public/post-grid";
import { Pagination } from "@/components/ui/pagination";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

const ITEMS_PER_PAGE = 12;

const FALLBACK_POSTS = [
  {
    id: "f1",
    slug: "wave-from-unseen",
    title: "تلويحة من شرفة الغيب",
    excerpt: "نص شعري ينسج من خيوط الغياب معطفاً للذكرى.",
    body: "نص شعري ينسج من خيوط الغياب معطفاً للذكرى.",
    publishedAt: new Date().toISOString(),
    viewCount: 1240,
    author: { id: "a1", name: "وسيم الزبيري", email: "" },
    category: { id: "c1", name: "شعر فصيح" },
    tags: [],
  },
  {
    id: "f2",
    slug: "echoes-of-silence",
    title: "أصداء الصمت في أروقة الروح",
    excerpt: "مقالة نقدية تتناول تجليات الصمت في الأدب.",
    body: "مقالة نقدية تتناول تجليات الصمت في الأدب.",
    publishedAt: new Date(Date.now() - 86400000).toISOString(),
    viewCount: 856,
    author: { id: "a2", name: "د. خالد القاضي", email: "" },
    category: { id: "c2", name: "نقد أدبي" },
    tags: [],
  },
  {
    id: "f3",
    slug: "shadows-of-light",
    title: "ظلال النور",
    excerpt: "قصة قصيرة تستكشف التناقضات النفسية.",
    body: "قصة قصيرة تستكشف التناقضات النفسية.",
    publishedAt: new Date(Date.now() - 172800000).toISOString(),
    viewCount: 2045,
    author: { id: "a3", name: "شذى المالكي", email: "" },
    category: { id: "c3", name: "القصة القصيرة" },
    tags: [],
  },
];

export const metadata: Metadata = {
  title: "الأرشيف",
  description: "أرشيف جميع النصوص والمنشورات الأدبية على منصة مؤسسة المنى الإبداعية",
};

export default async function ArchivePage(props: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const searchParams = await props.searchParams;
  const page = Math.max(1, Number(searchParams.page) || 1);

  let posts: any[] = FALLBACK_POSTS;
  let total = FALLBACK_POSTS.length;

  try {
    const [dbPosts, dbTotal] = await Promise.all([
      prisma.post.findMany({
        where: { status: "PUBLISHED" },
        include: {
          author: { select: { id: true, name: true, email: true } },
          category: true,
          tags: { include: { tag: true } },
        },
        orderBy: { publishedAt: "desc" },
        skip: (page - 1) * ITEMS_PER_PAGE,
        take: ITEMS_PER_PAGE,
      }),
      prisma.post.count({ where: { status: "PUBLISHED" } }),
    ]);
    if (dbPosts.length > 0) {
      posts = dbPosts;
      total = dbTotal;
    }
  } catch {
    // Use fallback
  }

  const totalPages = Math.max(1, Math.ceil(total / ITEMS_PER_PAGE));

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
            خزينة النصوص
          </span>
          <h1 className="font-amiri text-4xl sm:text-5xl md:text-6xl font-bold text-[var(--color-text-primary)]">
            الأرشيف
          </h1>
          <div className="section-divider mx-auto mt-4 w-20" />
          <p className="mx-auto mt-4 sm:mt-6 max-w-xl text-sm sm:text-base text-[var(--color-text-secondary)]">
            تصفح جميع النصوص والمنشورات الأدبية — رحلة في أعماق الكلمة
          </p>
        </div>
      </section>

      <section
        data-reveal
        className="relative border-t border-[var(--color-border)]"
      >
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 py-10 sm:py-14 md:py-16">
          <PostGrid posts={posts as any} />
          {totalPages > 1 && (
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              basePath="/archive"
              searchParams={{}}
            />
          )}
        </div>
      </section>
    </>
  );
}
