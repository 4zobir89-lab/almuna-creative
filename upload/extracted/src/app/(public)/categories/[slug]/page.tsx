import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { PostGrid } from "@/components/public/post-grid";
import { Pagination } from "@/components/ui/pagination";
import type { Metadata } from "next";

const ITEMS_PER_PAGE = 12;

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const params = await props.params;
  const category = await prisma.category.findUnique({ where: { slug: params.slug } });
  if (!category) return { title: "غير موجود" };
  return {
    title: category.name,
    description: category.description || `نصوص قسم ${category.name}`,
  };
}

export default async function CategoryPage(props: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const [params, searchParams] = await Promise.all([props.params, props.searchParams]);
  const page = Math.max(1, Number(searchParams.page) || 1);

  const category = await prisma.category.findUnique({ where: { slug: params.slug } });
  if (!category) notFound();

  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      where: { categoryId: category.id, status: "PUBLISHED" },
      include: { author: { select: { id: true, name: true, email: true } }, category: true, tags: { include: { tag: true } } },
      orderBy: { publishedAt: "desc" },
      skip: (page - 1) * ITEMS_PER_PAGE,
      take: ITEMS_PER_PAGE,
    }),
    prisma.post.count({ where: { categoryId: category.id, status: "PUBLISHED" } }),
  ]);

  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  return (
    <>
      <section className="relative min-h-[40vh] overflow-hidden pt-32">
        <div className="pointer-events-none absolute inset-0 bg-gradient-cinema" />
        <div className="pointer-events-none absolute inset-0">
          <div className="glow-blob glow-orange" style={{ width: 450, height: 450, top: "-15%", right: "-5%" }} />
          <div className="glow-blob glow-purple float-loop-delayed" style={{ width: 300, height: 300, bottom: "10%", left: "-5%" }} />
        </div>
        <div className="noise-overlay" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 pb-16 text-center">
          <span className="section-label">
            <span className="section-label-dot" />
            قسم
          </span>
          <h1 className="font-amiri text-4xl font-bold text-white md:text-6xl">{category.name}</h1>
          <div className="section-divider mx-auto mt-4 w-20" />
          {category.description && (
            <p className="mx-auto mt-6 max-w-xl text-white/50">{category.description}</p>
          )}
        </div>
      </section>

      <section data-reveal className="relative border-t border-white/[0.06]">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="glow-blob glow-amber" style={{ width: 350, height: 350, top: "10%", right: "-8%" }} />
        </div>
        <div className="relative mx-auto max-w-6xl px-4 py-16">
          <PostGrid posts={posts as any} />
          <Pagination currentPage={page} totalPages={totalPages} basePath={`/categories/${params.slug}`} searchParams={{}} />
        </div>
      </section>
    </>
  );
}
