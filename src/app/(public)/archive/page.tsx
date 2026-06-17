import { prisma } from "@/lib/db";
import { PostGrid } from "@/components/public/post-grid";
import { Pagination } from "@/components/ui/pagination";
import { PageHeader } from "@/components/public/page-header";
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
      <PageHeader
        background="/backgrounds/cloud-library.webp"
        label="خزينة النصوص"
        title="الأرشيف"
        description="تصفح جميع النصوص والمنشورات الأدبية — رحلة في أعماق الكلمة"
      />

      <section className="relative border-t border-[var(--color-border)]">
        <div className="relative mx-auto max-w-6xl px-6 sm:px-8 py-12 sm:py-16">
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
