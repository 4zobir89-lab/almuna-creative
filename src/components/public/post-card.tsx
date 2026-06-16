import Link from "next/link";
import { formatDate, generateExcerpt, calculateReadingTime, getCategoryGradient } from "@/lib/utils";
import type { PostWithRelations } from "@/types";

type Props = {
  post: PostWithRelations;
  featured?: boolean;
  variant?: "vertical" | "horizontal";
  showImage?: boolean;
};

const PREMIUM_EASE = "cubic-bezier(0.32,0.72,0,1)";

function CornerFrames() {
  return (
    <>
      <div className="absolute top-3 right-3 w-6 h-6 sm:w-7 sm:h-7 opacity-40 group-hover:opacity-100 transition-all duration-700 pointer-events-none z-20">
        <svg viewBox="0 0 28 28" className="w-full h-full text-brand-gold/50" aria-hidden="true">
          <path d="M2 26 L2 2 L26 2" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>
      <div className="absolute bottom-3 left-3 w-6 h-6 sm:w-7 sm:h-7 opacity-40 group-hover:opacity-100 transition-all duration-700 pointer-events-none z-20">
        <svg viewBox="0 0 28 28" className="w-full h-full text-brand-gold/50" aria-hidden="true">
          <path d="M26 2 L26 26 L2 26" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>
    </>
  );
}

function GoldTopBand() {
  return (
    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-brand-gold/50 via-brand-gold to-brand-gold/50 z-10" />
  );
}

function GoldLeftGradient() {
  return (
    <div
      className="absolute top-0 right-0 w-[2px] h-0 group-hover:h-full bg-gradient-to-b from-brand-gold/50 via-brand-gold/20 to-transparent transition-all duration-700 z-10"
      style={{ transitionTimingFunction: PREMIUM_EASE }}
    />
  );
}

export function PostCard({ post, featured, variant = "vertical", showImage = true }: Props) {
  if (variant === "horizontal") {
    return (
      <article className="group doppel-outer h-full" style={{ transitionTimingFunction: PREMIUM_EASE }}>
        <div className="doppel-inner relative flex flex-col md:flex-row overflow-hidden card-arabesque h-full">
          <GoldTopBand />
          <GoldLeftGradient />
          <CornerFrames />

          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-gold/[0.01] to-brand-gold/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

          {/* Image / Decorative side panel — 35% width on desktop */}
          <div className={`relative w-full md:w-[35%] overflow-hidden ${showImage ? "min-h-[180px] md:min-h-0" : ""}`}>
            {showImage ? (
              <>
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${getCategoryGradient(
                    post.category?.name
                  )} transition-all duration-700 group-hover:scale-110`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />
                <div className="absolute inset-0 arabesque-tessellation opacity-[0.06]" />
                <div className="relative z-10 flex flex-col items-center justify-center h-full p-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-black/30 backdrop-blur border border-white/10 flex items-center justify-center">
                    <span className="font-amiri text-lg sm:text-xl md:text-2xl text-white/70 font-bold">
                      {(post.title || "?").charAt(0)}
                    </span>
                  </div>
                  <svg className="w-7 h-7 sm:w-8 sm:h-8 text-white/20 mt-3" viewBox="0 0 40 40" fill="none" aria-hidden="true">
                    <path
                      d="M20 2 L26 10 L20 18 L14 10 Z M20 22 L26 30 L20 38 L14 30 Z M2 20 L10 14 L18 20 L10 26 Z M22 20 L30 14 L38 20 L30 26 Z"
                      stroke="currentColor"
                      strokeWidth="0.8"
                      fill="none"
                    />
                  </svg>
                  {post.tags && post.tags.length > 0 && (
                    <div className="mt-3 sm:mt-4 flex flex-wrap gap-1.5 justify-center">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag.id}
                          className="px-2 py-0.5 text-[10px] rounded-full bg-white/10 text-white/70 border border-white/10 backdrop-blur"
                        >
                          {tag.name}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <div className="absolute inset-0 bg-gradient-to-b from-brand-gold/[0.06] to-brand-gold/[0.02] flex items-center justify-center" />
                <div className="absolute inset-0 arabesque-tessellation opacity-[0.035]" />
                <div className="relative z-10 flex flex-col items-center gap-3 sm:gap-4 p-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-brand-gold/20 to-brand-gold/5 border border-brand-gold/10 flex items-center justify-center">
                    <span className="font-amiri text-lg sm:text-xl md:text-2xl text-brand-gold/60 font-bold">
                      {(post.title || "?").charAt(0)}
                    </span>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Content — 65% */}
          <div className="relative z-10 flex flex-col justify-between flex-1 p-5 sm:p-6 md:p-7">
            <div className="flex-grow">
              <div className="mb-3 sm:mb-4 flex flex-wrap items-center gap-2 sm:gap-3 text-[10px] sm:text-[11px] font-tajawal font-medium tracking-wider uppercase">
                {post.category && (
                  <>
                    <span className="text-brand-gold">{post.category.name}</span>
                    <span className="w-px h-3 bg-[var(--color-border)]" aria-hidden="true" />
                  </>
                )}
                <span className="text-[var(--color-text-secondary)]">
                  {formatDate(post.publishedAt || new Date().toISOString())}
                </span>
              </div>

              <Link href={`/posts/${post.slug}`} className="block outline-none group/link">
                <h2
                  className="font-amiri font-bold leading-[1.3] text-[var(--color-text-primary)] transition-all duration-700 mb-3 text-lg sm:text-xl"
                  style={{ transitionTimingFunction: PREMIUM_EASE }}
                >
                  <span
                    className="bg-[length:0%_2px] bg-left-bottom bg-gradient-to-r from-brand-gold to-brand-gold bg-no-repeat transition-all duration-700 group-hover/link:bg-[length:100%_2px]"
                    style={{ transitionTimingFunction: PREMIUM_EASE }}
                  >
                    {post.title}
                  </span>
                </h2>
                <p className="font-tajawal text-sm leading-relaxed text-[var(--color-text-secondary)] font-light line-clamp-3">
                  {generateExcerpt(post.excerpt || post.body || "", 120)}
                </p>
              </Link>
            </div>

            <div className="relative z-10 mt-auto pt-4 border-t border-[var(--color-border)] flex items-center justify-between font-tajawal text-xs text-[var(--color-text-secondary)]">
              <span className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                <span className="w-6 h-6 rounded-full bg-gradient-to-br from-ink-800 to-ink-700 flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">
                  {(post.author?.name || "?").charAt(0)}
                </span>
                <span className="truncate group-hover:text-[var(--color-text-primary)] transition-colors">
                  {post.author?.name || "مجهول"}
                </span>
              </span>
              <span className="flex items-center gap-2 sm:gap-3 text-[var(--color-text-tertiary)] flex-shrink-0">
                <span className="flex items-center gap-1.5">
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z" />
                  </svg>
                  <span className="hidden sm:inline">{calculateReadingTime(post.body || "")}</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  {post.viewCount || 0}
                </span>
              </span>
            </div>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article
      className={`group doppel-outer ${featured ? "md:col-span-2" : ""}`}
      style={{ transitionTimingFunction: PREMIUM_EASE }}
    >
      <div
        className={`doppel-inner relative flex flex-col justify-between h-full bg-[var(--color-card-bg)] overflow-hidden card-arabesque ${
          featured ? "p-6 sm:p-8 md:p-10" : "p-5 sm:p-6 md:p-7"
        }`}
      >
        <GoldTopBand />
        <GoldLeftGradient />
        <CornerFrames />

        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-gold/[0.01] to-brand-gold/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

        {showImage && (
          <div
            className="relative z-10 -mx-5 sm:-mx-6 md:-mx-7 -mt-5 sm:-mt-6 md:-mt-7 mb-4 sm:mb-5 overflow-hidden"
            style={{ height: "11rem" }}
          >
            <div
              className={`absolute inset-0 bg-gradient-to-br ${getCategoryGradient(
                post.category?.name
              )} transition-all duration-700 group-hover:scale-110`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c0b0a] via-transparent to-transparent opacity-70" />
            <div className="absolute inset-0 arabesque-tessellation opacity-[0.12] group-hover:opacity-[0.22] transition-opacity duration-700" />
            <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 left-3 sm:left-4 text-right">
              <div className="inline-flex items-center gap-2 bg-black/40 backdrop-blur-sm rounded-full px-2.5 sm:px-3 py-1 sm:py-1.5 text-[10px] font-tajawal font-medium text-white/80">
                <span className="flex items-center gap-1.5">
                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  {post.tags?.slice(0, 2).map((tag) => tag.name).join(" · ") || post.category?.name || ""}
                </span>
              </div>
            </div>
          </div>
        )}

        <div className="relative z-10 flex flex-col flex-grow">
          <div className="mb-3 sm:mb-5 flex flex-wrap items-center gap-2 sm:gap-3 text-[10px] sm:text-[11px] font-tajawal font-medium tracking-wider uppercase">
            {post.category && (
              <>
                <span className="text-brand-gold">{post.category.name}</span>
                <span className="w-px h-3 bg-[var(--color-border)]" aria-hidden="true" />
              </>
            )}
            <span className="text-[var(--color-text-secondary)]">
              {formatDate(post.publishedAt || new Date().toISOString())}
            </span>
          </div>

          <Link href={`/posts/${post.slug}`} className="block outline-none flex-grow group/link">
            <h2
              className={`font-amiri font-bold leading-[1.3] text-[var(--color-text-primary)] transition-all duration-700 mb-3 sm:mb-4 ${
                featured ? "text-2xl sm:text-3xl md:text-4xl" : "text-lg sm:text-xl"
              }`}
              style={{ transitionTimingFunction: PREMIUM_EASE }}
            >
              <span
                className="bg-[length:0%_2px] bg-left-bottom bg-gradient-to-r from-brand-gold to-brand-gold bg-no-repeat transition-all duration-700 group-hover/link:bg-[length:100%_2px]"
                style={{ transitionTimingFunction: PREMIUM_EASE }}
              >
                {post.title}
              </span>
            </h2>
            <p
              className={`font-tajawal leading-relaxed text-[var(--color-text-secondary)] font-light line-clamp-3 ${
                featured ? "text-base max-w-2xl" : "text-sm"
              }`}
            >
              {generateExcerpt(post.excerpt || post.body || "", featured ? 250 : 100)}
            </p>
          </Link>
        </div>

        <div className="relative z-10 mt-5 sm:mt-6 pt-4 sm:pt-5 border-t border-[var(--color-border)] flex items-center justify-between font-tajawal text-xs text-[var(--color-text-secondary)]">
          <span className="flex items-center gap-2 sm:gap-2.5 min-w-0">
            <span
              className="w-6 h-6 rounded-full bg-gradient-to-br from-ink-800 to-ink-700 flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0"
              aria-hidden="true"
            >
              {(post.author?.name || "?").charAt(0)}
            </span>
            <span className="truncate group-hover:text-[var(--color-text-primary)] transition-colors">
              {post.author?.name || "مجهول"}
            </span>
          </span>
          <span className="flex items-center gap-2 sm:gap-3 text-[var(--color-text-tertiary)] flex-shrink-0">
            <span className="flex items-center gap-1.5">
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z" />
              </svg>
              <span className="hidden sm:inline">{calculateReadingTime(post.body || "")}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              {post.viewCount || 0}
            </span>
          </span>
        </div>
      </div>
    </article>
  );
}
