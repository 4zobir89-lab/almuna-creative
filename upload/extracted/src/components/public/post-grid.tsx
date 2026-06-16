import Link from "next/link";
import { PostCard } from "./post-card";
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

  if (posts.length === 0) return null;

  const middleIndex = Math.floor(remaining.length / 2);

  return (
    <section className="px-4 md:px-8">
      {title && (
        <div className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="font-tajawal text-brand-gold/70 text-xs font-bold tracking-[0.25em] uppercase mb-4 block">
              <span className="inline-flex items-center gap-3">
                <span className="w-6 h-px bg-brand-gold/40" />
                الإصدارات
              </span>
            </span>
            <h2 className="font-amiri text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">{title}</h2>
          </div>
          <Link href="/archive" className="group font-tajawal text-sm text-ink-400 hover:text-brand-gold transition-colors flex items-center gap-2">
            <span>المزيد</span>
            <span className="block transition-transform duration-300 group-hover:-translate-x-1">←</span>
          </Link>
        </div>
      )}

      <div className="grid gap-6 md:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
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
