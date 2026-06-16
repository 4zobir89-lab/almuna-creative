import { prisma } from "@/lib/db";
import { PostGrid } from "@/components/public/post-grid";
import { Pagination } from "@/components/ui/pagination";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

const ITEMS_PER_PAGE = 12;

export const metadata: Metadata = {
  title: "الأرشيف",
  description: "أرشيف جميع النصوص والمنشورات الأدبية على منصة مؤسسة المنى الإبداعية",
};

export default async function ArchivePage(props: { searchParams: Promise<Record<string, string | undefined>> }) {
  const searchParams = await props.searchParams;
  const page = Math.max(1, Number(searchParams.page) || 1);

  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      where: { status: "PUBLISHED" },
      include: { author: { select: { id: true, name: true, email: true } }, category: true, tags: { include: { tag: true } } },
      orderBy: { publishedAt: "desc" },
      skip: (page - 1) * ITEMS_PER_PAGE,
      take: ITEMS_PER_PAGE,
    }),
    prisma.post.count({ where: { status: "PUBLISHED" } }),
  ]);

  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  return (
    <>
      <section className="relative min-h-[40vh] overflow-hidden pt-32">
        <div className="pointer-events-none absolute inset-0 bg-gradient-cinema" />
        <div className="pointer-events-none absolute inset-0">
          <div className="glow-blob glow-orange" style={{ width: 500, height: 500, top: "-20%", left: "50%" }} />
          <div className="glow-blob glow-purple float-loop" style={{ width: 300, height: 300, bottom: "10%", right: "-5%" }} />
        </div>
        <div className="noise-overlay" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 pb-16 text-center">
          <span className="section-label">
            <span className="section-label-dot" />
            خزينة النصوص
          </span>
          <h1 className="font-amiri text-4xl font-bold text-white md:text-6xl">الأرشيف</h1>
          <div className="section-divider mx-auto mt-4 w-20" />
          <p className="mx-auto mt-6 max-w-xl text-white/50">
            تصفح جميع النصوص والمنشورات الأدبية — رحلة في أعماق الكلمة
          </p>
        </div>
      </section>

      <section data-reveal className="relative border-t border-white/[0.06]">
        <div className="relative mx-auto max-w-6xl px-4 py-16">
          <PostGrid posts={posts as any} />
          <Pagination currentPage={page} totalPages={totalPages} basePath="/archive" searchParams={{}} />
        </div>
      </section>
    </>
  );
}
