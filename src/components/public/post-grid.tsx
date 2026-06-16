import Link from "next/link";
import { PostCard } from "./post-card";
import { ArrowLeft } from "lucide-react";
import type { PostWithRelations } from "@/types";

type Props = {
  posts: PostWithRelations[];
  title?: string;
  showFeatured?: boolean;
  showImage?: boolean;
};

export function PostGrid({ posts, title, showFeatured, showImage = false }: Props) {
  const featured = showFeatured && posts.length > 0 ? posts[0] : null;
  const remaining = featured ? posts.slice(1) : posts;

  if (posts.length === 0) {
    return (
      <section className="px-4 md:px-8 py-16 text-center">
        <div className="mx-auto max-w-md p-8 rounded-2xl border border-[var(--color-border)] bg-[var(--color-card-bg)]">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-brand-gold/10 flex items-center justify-center">
            <svg className="w-8 h-8 text-brand-gold/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <p className="font-amiri text-xl text-[var(--color-text-primary)] mb-2">
            لا توجد نصوص لعرضها حالياً
          </p>
          <p className="font-tajawal text-sm text-[var(--color-text-secondary)]">
            عُود لاحقاً لاكتشاف إبداعات جديدة
          </p>
        </div>
      </section>
    );
  }

  const middleIndex = Math.floor(remaining.length / 2);

  return (
    <section className="px-4 sm:px-6 md:px-8">
      {title && (
        <div className="mb-8 sm:mb-12 md:mb-14 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="font-tajawal text-brand-gold text-xs font-bold tracking-[0.25em] uppercase mb-3 sm:mb-4 block">
              <span className="inline-flex items-center gap-3">
                <span className="w-6 h-px bg-brand-gold/40" />
                الإصدارات
              </span>
            </span>
            <h2 className="font-amiri text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--color-text-primary)] tracking-tight leading-tight">
              {title}
            </h2>
          </div>
          <Link
            href="/archive"
            className="group font-tajawal text-sm text-[var(--color-text-secondary)] hover:text-brand-gold transition-colors flex items-center gap-2 self-start md:self-auto"
          >
            <span>المزيد</span>
            <ArrowLeft className="w-4 h-4 block transition-transform duration-300 group-hover:-translate-x-1" />
          </Link>
        </div>
      )}

      <div className="grid gap-4 sm:gap-6 md:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {featured && (
          <div key={featured.id} className="md:col-span-2 lg:col-span-2">
            <PostCard post={featured} featured variant="horizontal" showImage={showImage} />
          </div>
        )}
        {remaining.map((post, i) => (
          <div
            key={post.id}
            className={i === middleIndex ? "md:col-span-2 lg:col-span-2" : undefined}
          >
            <PostCard
              post={post}
              variant={i === middleIndex ? "horizontal" : "vertical"}
              showImage={showImage}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
