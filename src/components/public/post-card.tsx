import Link from "next/link";
import { formatDate, generateExcerpt, calculateReadingTime } from "@/lib/utils";
import type { PostWithRelations } from "@/types";
import { Clock, Eye } from "lucide-react";

type Props = {
  post: PostWithRelations;
  featured?: boolean;
  variant?: "vertical" | "horizontal";
  showImage?: boolean;
};

export function PostCard({ post, featured, variant = "vertical", showImage = true }: Props) {
  if (variant === "horizontal") {
    return (
      <article className="group">
        <Link
          href={`/posts/${post.slug}`}
          className="flex flex-col md:flex-row h-full bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-lg overflow-hidden transition-border duration-200 hover:border-[var(--color-text-tertiary)]"
        >
          {/* Decorative side — letter, no gradient */}
          {showImage && (
            <div className="relative w-full md:w-[35%] min-h-[140px] md:min-h-0 bg-[var(--section-alt)] flex items-center justify-center">
              <span className="font-amiri text-6xl text-[var(--color-text-tertiary)] opacity-40 group-hover:opacity-60 transition-opacity duration-300">
                {(post.title || "?").charAt(0)}
              </span>
            </div>
          )}

          <div className="flex flex-col justify-between flex-1 p-6">
            <div>
              <div className="mb-2 flex items-center gap-2 text-xs">
                {post.category && (
                  <span className="text-[var(--accent)] font-medium">{post.category.name}</span>
                )}
                <span className="text-[var(--color-text-tertiary)]">
                  {formatDate(post.publishedAt || new Date().toISOString())}
                </span>
              </div>

              <h2 className="font-amiri font-bold leading-snug text-[var(--color-text-primary)] mb-2 text-xl transition-colors duration-200 group-hover:text-[var(--accent)]">
                {post.title}
              </h2>
              <p className="text-sm leading-relaxed text-[var(--color-text-secondary)] line-clamp-2">
                {generateExcerpt(post.excerpt || post.body || "", 140)}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-[var(--color-border)] flex items-center justify-between text-xs text-[var(--color-text-tertiary)]">
              <span>{post.author?.name || "مجهول"}</span>
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

  return (
    <article className={`group ${featured ? "md:col-span-2" : ""}`}>
      <Link
        href={`/posts/${post.slug}`}
        className="flex flex-col h-full bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-lg overflow-hidden transition-border duration-200 hover:border-[var(--color-text-tertiary)]"
      >
        {/* Decorative header — letter avatar, no gradient */}
        {showImage && (
          <div className="relative h-36 bg-[var(--section-alt)] flex items-center justify-center overflow-hidden">
            <span className="font-amiri text-6xl text-[var(--color-text-tertiary)] opacity-40 group-hover:opacity-60 group-hover:scale-105 transition-all duration-300">
              {(post.title || "?").charAt(0)}
            </span>
          </div>
        )}

        <div className="flex flex-col flex-grow p-5">
          <div className="mb-2 flex items-center gap-2 text-xs">
            {post.category && (
              <span className="text-[var(--accent)] font-medium">{post.category.name}</span>
            )}
            <span className="text-[var(--color-text-tertiary)]">
              {formatDate(post.publishedAt || new Date().toISOString())}
            </span>
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
            <span>{post.author?.name || "مجهول"}</span>
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
