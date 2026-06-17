import Link from "next/link";
import { formatDate, generateExcerpt, calculateReadingTime } from "@/lib/utils";
import type { PostWithRelations } from "@/types";
import { Clock, Eye, ArrowLeft } from "lucide-react";

type Props = {
  post: PostWithRelations;
  featured?: boolean;
  variant?: "vertical" | "horizontal";
  showImage?: boolean;
  index?: number;
};

export function PostCard({ post, featured, variant = "vertical", showImage = true, index = 0 }: Props) {
  if (variant === "horizontal") {
    return (
      <article className="group">
        <Link
          href={`/posts/${post.slug}`}
          className="flex flex-col md:flex-row h-full bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-lg overflow-hidden transition-all duration-300 hover:border-[var(--accent)] hover:shadow-[var(--shadow-lg)]"
          style={{
            animationDelay: `${index * 80}ms`,
          }}
        >
          {/* Decorative side — large letter with literary feel */}
          {showImage && (
            <div className="relative w-full md:w-[35%] min-h-[140px] md:min-h-0 bg-[var(--section-alt)] flex items-center justify-center overflow-hidden">
              {/* Background letter */}
              <span className="font-ruqaa text-7xl text-[var(--accent)] opacity-20 group-hover:opacity-40 group-hover:scale-110 transition-all duration-500">
                {(post.title || "?").charAt(0)}
              </span>

              {/* Decorative ink blot */}
              <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-[var(--accent)] opacity-[0.05] blur-xl" />

              {/* Category badge */}
              {post.category && (
                <span className="absolute top-4 right-4 px-2 py-1 text-[10px] rounded bg-[var(--color-card-bg)]/80 backdrop-blur-sm text-[var(--accent)] font-medium">
                  {post.category.name}
                </span>
              )}
            </div>
          )}

          <div className="flex flex-col justify-between flex-1 p-6">
            <div>
              <div className="mb-2 flex items-center gap-2 text-xs text-[var(--color-text-tertiary)]">
                {post.category && (
                  <span className="text-[var(--accent)] font-medium">{post.category.name}</span>
                )}
                <span>·</span>
                <span>{formatDate(post.publishedAt || new Date().toISOString())}</span>
              </div>

              <h2 className="font-amiri font-bold leading-snug text-[var(--color-text-primary)] mb-2 text-xl transition-colors duration-200 group-hover:text-[var(--accent)]">
                {post.title}
              </h2>
              <p className="text-sm leading-relaxed text-[var(--color-text-secondary)] line-clamp-2">
                {generateExcerpt(post.excerpt || post.body || "", 140)}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-[var(--color-border)] flex items-center justify-between text-xs text-[var(--color-text-tertiary)]">
              <span className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)] text-[10px] font-bold">
                  {(post.author?.name || "?").charAt(0)}
                </span>
                <span>{post.author?.name || "مجهول"}</span>
              </span>
              <span className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span className="hidden sm:inline">{calculateReadingTime(post.body || "")}</span>
                </span>
                <span className="flex items-center gap-1">
                  <Eye className="w-3 h-3" />
                  {post.viewCount || 0}
                </span>
                <ArrowLeft className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:-translate-x-1 transition-all" />
              </span>
            </div>
          </div>
        </Link>
      </article>
    );
  }

  return (
    <article className={`group ${featured ? "md:col-span-2" : ""}`}>
      <Link
        href={`/posts/${post.slug}`}
        className="flex flex-col h-full bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-lg overflow-hidden transition-all duration-300 hover:border-[var(--accent)] hover:shadow-[var(--shadow-lg)]"
      >
        {/* Decorative header */}
        {showImage && (
          <div className="relative h-36 bg-[var(--section-alt)] flex items-center justify-center overflow-hidden">
            {/* Large background letter */}
            <span className="font-ruqaa text-7xl text-[var(--accent)] opacity-20 group-hover:opacity-40 group-hover:scale-110 transition-all duration-500">
              {(post.title || "?").charAt(0)}
            </span>

            {/* Ink blot decoration */}
            <div className="absolute top-2 right-2 w-10 h-10 rounded-full bg-[var(--accent)] opacity-[0.05] blur-lg" />

            {/* Category badge */}
            {post.category && (
              <span className="absolute top-3 right-3 px-2 py-1 text-[10px] rounded bg-[var(--color-card-bg)]/80 backdrop-blur-sm text-[var(--accent)] font-medium">
                {post.category.name}
              </span>
            )}
          </div>
        )}

        <div className="flex flex-col flex-grow p-5">
          <div className="mb-2 flex items-center gap-2 text-xs text-[var(--color-text-tertiary)]">
            <span>{formatDate(post.publishedAt || new Date().toISOString())}</span>
          </div>

          <h2
            className={`font-amiri font-bold leading-snug text-[var(--color-text-primary)] mb-2 transition-colors duration-200 group-hover:text-[var(--accent)] ${
              featured ? "text-2xl" : "text-lg"
            }`}
          >
            {post.title}
          </h2>
          <p className="text-sm leading-relaxed text-[var(--color-text-secondary)] line-clamp-3 flex-grow">
            {generateExcerpt(post.excerpt || post.body || "", featured ? 180 : 100)}
          </p>

          <div className="mt-4 pt-3 border-t border-[var(--color-border)] flex items-center justify-between text-xs text-[var(--color-text-tertiary)]">
            <span className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)] text-[10px] font-bold">
                {(post.author?.name || "?").charAt(0)}
              </span>
              <span>{post.author?.name || "مجهول"}</span>
            </span>
            <span className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span className="hidden sm:inline">{calculateReadingTime(post.body || "")}</span>
              </span>
              <span className="flex items-center gap-1">
                <Eye className="w-3 h-3" />
                {post.viewCount || 0}
              </span>
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
