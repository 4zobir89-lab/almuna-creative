import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { formatDate } from "@/lib/utils";
import { PostBody } from "@/components/public/post-body";
import { ViewCounter } from "@/components/public/view-counter";
import Link from "next/link";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

const FALLBACK_POST = {
  id: "fallback",
  slug: "fallback",
  title: "نص تجريبي",
  body: "<p>هذا نص تجريبي. المحتوى الكامل سيظهر هنا عند توفر قاعدة البيانات.</p>",
  excerpt: "نص تجريبي",
  publishedAt: new Date().toISOString(),
  createdAt: new Date(),
  viewCount: 0,
  author: { id: "1", name: "كاتب المنى", bio: "كاتب في مؤسسة المنى الإبداعية" },
  category: { id: "1", name: "نصوص", slug: "texts" },
  tags: [] as { tag: { id: string; name: string } }[],
};

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  try {
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
  } catch {
    return { title: "نص تجريبي" };
  }
}

export default async function PostPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;

  let post = null;
  try {
    post = await prisma.post.findUnique({
      where: { slug, status: "PUBLISHED" },
      include: {
        author: { select: { id: true, name: true, bio: true } },
        category: true,
        tags: { include: { tag: true } },
      },
    });
  } catch {
    post = null;
  }

  if (!post) {
    // Show fallback content instead of 404 for resilience
    post = { ...FALLBACK_POST, slug } as any;
  }

  return (
    <>
      {/* Hero / Header */}
      <section className="relative min-h-[50vh] overflow-hidden pt-20 sm:pt-24">
        <div className="pointer-events-none absolute inset-0 bg-gradient-cinema" />
        <div className="pointer-events-none absolute inset-0">
          <div
            className="glow-blob glow-orange"
            style={{ width: 500, height: 500, top: "-15%", left: "60%" }}
          />
          <div
            className="glow-blob glow-purple float-loop-delayed"
            style={{ width: 350, height: 350, bottom: "10%", left: "-5%" }}
          />
        </div>
        <div className="noise-overlay" />

        <ViewCounter postId={post.id} />

        <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 pb-12 sm:pb-16 text-center">
          {/* Back link */}
          <Link
            href="/archive"
            className="inline-flex items-center gap-2 mb-6 sm:mb-8 text-sm text-[var(--color-text-secondary)] hover:text-brand-gold transition-colors"
          >
            <span>←</span>
            <span>العودة للأرشيف</span>
          </Link>

          <div className="mb-4 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-sm">
            {post.category && (
              <Link
                href={`/categories/${post.category.slug}`}
                className="inline-flex items-center gap-1.5 rounded-full border border-brand-gold/20 bg-brand-gold/10 px-3 py-1 text-xs font-medium text-brand-gold backdrop-blur-sm transition-all duration-300 hover:bg-brand-gold/20"
              >
                {post.category.name}
              </Link>
            )}
            <span className="text-[var(--color-text-tertiary)]">
              {formatDate(post.publishedAt || (post.createdAt as any))}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-amiri font-bold leading-tight text-[var(--color-text-primary)]">
            {post.title}
          </h1>

          <div className="mt-5 sm:mt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-sm text-[var(--color-text-secondary)]">
            <span className="flex items-center gap-1.5">
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              {post.author.name || "كاتب غير معروف"}
            </span>
            <span className="text-[var(--color-text-tertiary)]">·</span>
            <span className="flex items-center gap-1.5">
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
              {post.viewCount} قراءة
            </span>
          </div>

          {post.tags && post.tags.length > 0 && (
            <div className="mt-5 sm:mt-6 flex flex-wrap justify-center gap-2">
              {post.tags.map(({ tag }: { tag: { id: string; name: string } }) => (
                <span
                  key={tag.id}
                  className="rounded-full border border-[var(--color-border)] bg-[var(--color-card-bg)] px-3 py-1 text-xs text-[var(--color-text-secondary)] backdrop-blur-sm"
                >
                  #{tag.name}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Body */}
      <section data-reveal className="relative border-t border-[var(--color-border)]">
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 py-10 sm:py-12">
          <PostBody content={post.body} />
        </div>
      </section>

      {/* Author card */}
      <section className="relative border-t border-[var(--color-border)]">
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 py-10 sm:py-12">
          <div className="glass-card p-6 sm:p-8 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-gradient-to-br from-brand-accent/20 to-brand-gold/20 text-xl sm:text-2xl font-bold text-brand-gold">
              {(post.author.name || "?").charAt(0)}
            </div>
            <p className="text-lg font-amiri font-bold text-[var(--color-text-primary)]">
              — {post.author.name || "كاتب"} —
            </p>
            {post.author.bio && (
              <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-[var(--color-text-secondary)]">
                {post.author.bio}
              </p>
            )}
            <div className="section-divider mx-auto mt-6 w-20" />
          </div>
        </div>
      </section>
    </>
  );
}
