import { prisma } from "@/lib/db";
import { PostGrid } from "@/components/public/post-grid";
import { Pagination } from "@/components/ui/pagination";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

const ITEMS_PER_PAGE = 12;

const FALLBACK_CATEGORY: Record<string, { name: string; description: string }> = {
  poetry: { name: "الشعر والفصاحة", description: "ديوان الشعر الفصيح والعامي، قصائد عمودية وتفعيلة ونثر" },
  prose: { name: "النثر والقصة", description: "القصة القصيرة، الرواية، المقال، الخاطرة، والسيرة الذاتية" },
  critique: { name: "دراسات نقدية", description: "نقد أدبي ودراسات نقدية تعنى بالتحليل والتفكيك" },
  "visual-arts": { name: "الفن البصري", description: "الخط العربي، التصميم الجرافيكي، التصوير، والرسم" },
  nasheed: { name: "النشيد", description: "أناشيد وكلمات ملهمة بلا موسيقى" },
  magazine: { name: "إصدارات المجلة", description: "إصدارات المجلة الدورية لمؤسسة المنى" },
};

const FALLBACK_POSTS = [
  {
    id: "fp1",
    slug: "wave-from-unseen",
    title: "تلويحة من شرفة الغيب",
    excerpt: "نص شعري ينسج من خيوط الغياب معطفاً للذكرى.",
    body: "نص شعري ينسج من خيوط الغياب معطفاً للذكرى.",
    publishedAt: new Date().toISOString(),
    viewCount: 1240,
    author: { id: "a1", name: "وسيم الزبيري", email: "" },
    category: { id: "c1", name: "شعر فصيح", slug: "poetry" },
    tags: [],
  },
  {
    id: "fp2",
    slug: "echoes-of-silence",
    title: "أصداء الصمت في أروقة الروح",
    excerpt: "مقالة نقدية تتناول تجليات الصمت في الأدب.",
    body: "مقالة نقدية تتناول تجليات الصمت في الأدب.",
    publishedAt: new Date(Date.now() - 86400000).toISOString(),
    viewCount: 856,
    author: { id: "a2", name: "د. خالد القاضي", email: "" },
    category: { id: "c2", name: "نقد أدبي", slug: "critique" },
    tags: [],
  },
];

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  let category = null;
  try {
    category = await prisma.category.findUnique({ where: { slug: params.slug } });
  } catch {
    // ignore
  }
  const fallback = FALLBACK_CATEGORY[params.slug];
  const name = category?.name || fallback?.name || "قسم";
  const desc = category?.description || fallback?.description || `نصوص قسم ${name}`;
  return { title: name, description: desc };
}

export default async function CategoryPage(props: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const [params, searchParams] = await Promise.all([props.params, props.searchParams]);
  const page = Math.max(1, Number(searchParams.page) || 1);

  let category: any = null;
  try {
    category = await prisma.category.findUnique({ where: { slug: params.slug } });
  } catch {
    // ignore
  }

  // Use fallback if no category
  const fallback = FALLBACK_CATEGORY[params.slug];
  const categoryName = category?.name || fallback?.name || "قسم";
  const categoryDesc = category?.description || fallback?.description;

  let posts: any[] = FALLBACK_POSTS;
  let total = FALLBACK_POSTS.length;
  if (category) {
    try {
      const [dbPosts, dbTotal] = await Promise.all([
        prisma.post.findMany({
          where: { categoryId: category.id, status: "PUBLISHED" },
          include: {
            author: { select: { id: true, name: true, email: true } },
            category: true,
            tags: { include: { tag: true } },
          },
          orderBy: { publishedAt: "desc" },
          skip: (page - 1) * ITEMS_PER_PAGE,
          take: ITEMS_PER_PAGE,
        }),
        prisma.post.count({ where: { categoryId: category.id, status: "PUBLISHED" } }),
      ]);
      if (dbPosts.length > 0) {
        posts = dbPosts;
        total = dbTotal;
      }
    } catch {
      // Use fallback
    }
  }

  const totalPages = Math.max(1, Math.ceil(total / ITEMS_PER_PAGE));

  return (
    <>
      <section className="relative min-h-[40vh] overflow-hidden pt-20 sm:pt-24">
        <div className="pointer-events-none absolute inset-0 bg-gradient-cinema" />
        <div className="pointer-events-none absolute inset-0">
          <div
            className="glow-blob glow-orange"
            style={{ width: 450, height: 450, top: "-15%", right: "-5%" }}
          />
          <div
            className="glow-blob glow-purple float-loop-delayed"
            style={{ width: 300, height: 300, bottom: "10%", left: "-5%" }}
          />
        </div>
        <div className="noise-overlay" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 pb-12 sm:pb-16 text-center">
          <span className="section-label">
            <span className="section-label-dot" />
            قسم
          </span>
          <h1 className="font-amiri text-4xl sm:text-5xl md:text-6xl font-bold text-[var(--color-text-primary)]">
            {categoryName}
          </h1>
          <div className="section-divider mx-auto mt-4 w-20" />
          {categoryDesc && (
            <p className="mx-auto mt-4 sm:mt-6 max-w-xl text-sm sm:text-base text-[var(--color-text-secondary)]">
              {categoryDesc}
            </p>
          )}
        </div>
      </section>

      <section data-reveal className="relative border-t border-[var(--color-border)]">
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 py-10 sm:py-14 md:py-16">
          <PostGrid posts={posts as any} />
          {totalPages > 1 && (
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              basePath={`/categories/${params.slug}`}
              searchParams={{}}
            />
          )}
        </div>
      </section>
    </>
  );
}
