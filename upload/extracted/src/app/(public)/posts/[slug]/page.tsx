import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { formatDate } from "@/lib/utils";
import { PostBody } from "@/components/public/post-body";
import { ViewCounter } from "@/components/public/view-counter";
import Link from "next/link";
import type { Metadata } from "next";

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await props.params;
  const post = await prisma.post.findUnique({
    where: { slug, status: "PUBLISHED" },
    select: { title: true, excerpt: true, category: { select: { name: true } } },
  });
  if (!post) return { title: "غير موجود" };
  return {
    title: post.title,
    description: post.excerpt || `نص: ${post.title}`,
    openGraph: {
      title: post.title,
      description: post.excerpt || undefined,
      type: "article",
    },
  };
}

export default async function PostPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;

  const post = await prisma.post.findUnique({
    where: { slug, status: "PUBLISHED" },
    include: { author: { select: { id: true, name: true, bio: true } }, category: true, tags: { include: { tag: true } } },
  });

  if (!post) notFound();

  return (
    <>
      <section className="relative min-h-[50vh] overflow-hidden pt-32">
        <div className="pointer-events-none absolute inset-0 bg-gradient-cinema" />
        <div className="pointer-events-none absolute inset-0">
          <div className="glow-blob glow-orange" style={{ width: 500, height: 500, top: "-15%", left: "60%" }} />
          <div className="glow-blob glow-purple float-loop-delayed" style={{ width: 350, height: 350, bottom: "10%", left: "-5%" }} />
        </div>
        <div className="noise-overlay" />

        <ViewCounter postId={post.id} />

        <div className="relative z-10 mx-auto max-w-3xl px-4 pb-16 text-center">
          <div className="mb-4 flex items-center justify-center gap-3 text-sm">
            {post.category && (
              <Link
                href={`/categories/${post.category.slug}`}
                className="inline-flex items-center gap-1.5 rounded-full border border-orange-500/20 bg-orange-500/10 px-3 py-1 text-xs font-medium text-orange-300/90 backdrop-blur-sm transition-all duration-300 hover:bg-orange-500/20"
              >
                {post.category.name}
              </Link>
            )}
            <span className="text-white/40">{formatDate(post.publishedAt || post.createdAt)}</span>
          </div>

          <h1 className="text-3xl font-amiri font-bold leading-tight text-white md:text-5xl lg:text-6xl">
            {post.title}
          </h1>

          <div className="mt-6 flex items-center justify-center gap-3 text-sm text-white/50">
            <span className="flex items-center gap-1.5">
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              {post.author.name || "كاتب غير معروف"}
            </span>
            <span className="text-white/20">·</span>
            <span className="flex items-center gap-1.5">
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              {post.viewCount} قراءة
            </span>
          </div>

          {post.tags.length > 0 && (
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {post.tags.map(({ tag }) => (
                <span key={tag.id} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-white/50 backdrop-blur-sm">
                  #{tag.name}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      <section data-reveal className="relative border-t border-white/[0.06]">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="glow-blob glow-amber" style={{ width: 300, height: 300, top: "10%", right: "-5%" }} />
        </div>
        <div className="relative mx-auto max-w-3xl px-4 py-12">
          <PostBody content={post.body} />
        </div>
      </section>

      <section className="relative border-t border-white/[0.06]">
        <div className="relative mx-auto max-w-3xl px-4 py-12">
          <div className="glass-card p-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-orange-500/20 to-amber-500/20 text-2xl font-bold text-orange-300">
              {(post.author.name || "?").charAt(0)}
            </div>
            <p className="text-lg font-amiri font-bold text-white">— {post.author.name || "كاتب"} —</p>
            {post.author.bio && (
              <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-white/50">{post.author.bio}</p>
            )}
            <div className="section-divider mx-auto mt-6 w-20" />
          </div>
        </div>
      </section>
    </>
  );
}
