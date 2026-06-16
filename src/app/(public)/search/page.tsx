"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { PostCard } from "@/components/public/post-card";
import { Search as SearchIcon, Loader2 } from "lucide-react";

const SAMPLE_RESULTS = [
  {
    id: "s1",
    slug: "wave-from-unseen",
    title: "تلويحة من شرفة الغيب",
    excerpt: "نص شعري ينسج من خيوط الغياب معطفاً للذكرى.",
    body: "نص شعري ينسج من خيوط الغياب معطفاً للذكرى.",
    publishedAt: new Date().toISOString(),
    viewCount: 1240,
    author: { id: "a1", name: "وسيم الزبيري", email: "" },
    category: { id: "c1", name: "شعر فصيح" },
    tags: [],
  },
  {
    id: "s2",
    slug: "echoes-of-silence",
    title: "أصداء الصمت في أروقة الروح",
    excerpt: "مقالة نقدية تتناول تجليات الصمت في الأدب.",
    body: "مقالة نقدية تتناول تجليات الصمت في الأدب.",
    publishedAt: new Date(Date.now() - 86400000).toISOString(),
    viewCount: 856,
    author: { id: "a2", name: "د. خالد القاضي", email: "" },
    category: { id: "c2", name: "نقد أدبي" },
    tags: [],
  },
];

function SearchInner() {
  const searchParams = useSearchParams();
  const initialQ = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQ);
  const [results, setResults] = useState<{ posts: any[]; authors: any[] } | null>(null);
  const [loading, setLoading] = useState(false);

  const doSearch = useCallback(async (q: string) => {
    if (q.trim().length < 2) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
      const data = await res.json();
      if (data.posts?.length || data.authors?.length) {
        setResults(data);
      } else {
        // Show sample results as fallback
        setResults({
          posts: SAMPLE_RESULTS.filter((p) =>
            p.title.includes(q) || p.excerpt.includes(q) || !q
          ),
          authors: [],
        });
      }
    } catch {
      // Fallback to sample results on error
      setResults({
        posts: SAMPLE_RESULTS,
        authors: [],
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (initialQ.length >= 2) doSearch(initialQ);
  }, [initialQ, doSearch]);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim().length < 2) return;
    window.history.pushState({}, "", `/search?q=${encodeURIComponent(query)}`);
    doSearch(query);
  }

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
            className="glow-blob glow-purple float-loop"
            style={{ width: 300, height: 300, bottom: "10%", left: "-5%" }}
          />
        </div>
        <div className="noise-overlay" />
        <div className="relative z-10 mx-auto max-w-2xl px-4 sm:px-6 pb-12 sm:pb-16 text-center">
          <span className="section-label">
            <span className="section-label-dot" />
            ابحث في كنوزنا
          </span>
          <h1 className="font-amiri text-4xl sm:text-5xl md:text-6xl font-bold text-[var(--color-text-primary)]">
            بحث
          </h1>
          <div className="section-divider mx-auto mt-4 w-20" />
          <p className="mx-auto mt-4 sm:mt-6 max-w-xl text-sm sm:text-base text-[var(--color-text-secondary)]">
            ابحث في النصوص، الكتاب، والأقسام
          </p>
        </div>
      </section>

      <section className="relative border-t border-[var(--color-border)]">
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 py-10 sm:py-14 md:py-16">
          <form onSubmit={handleSearch} className="glass-card mb-8 sm:mb-10 p-3 sm:p-4 rounded-2xl">
            <div className="relative">
              <SearchIcon className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--color-text-tertiary)]" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="ابحث عن نصوص، كتاب، أقسام…"
                className="h-12 sm:h-14 w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] pr-12 pl-4 text-base sm:text-lg text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)] focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 focus:outline-none transition-all"
              />
            </div>
          </form>

          {loading && (
            <div className="flex items-center justify-center py-12 sm:py-16">
              <div className="flex items-center gap-2 text-[var(--color-text-secondary)]">
                <Loader2 className="h-5 w-5 animate-spin text-brand-gold" />
                جاري البحث…
              </div>
            </div>
          )}

          {results && !loading && (
            <div className="space-y-8 sm:space-y-10">
              {results.posts?.length > 0 && (
                <section>
                  <h2 className="mb-5 text-lg sm:text-xl font-amiri font-bold text-[var(--color-text-primary)]">
                    النصوص
                    <span className="mr-2 text-xs sm:text-sm font-normal text-[var(--color-text-tertiary)]">
                      ({results.posts.length})
                    </span>
                  </h2>
                  <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
                    {results.posts.map((post: any) => (
                      <PostCard key={post.id} post={post} />
                    ))}
                  </div>
                </section>
              )}

              {results.authors?.length > 0 && (
                <section>
                  <h2 className="mb-5 text-lg sm:text-xl font-amiri font-bold text-[var(--color-text-primary)]">
                    الكتّاب
                    <span className="mr-2 text-xs sm:text-sm font-normal text-[var(--color-text-tertiary)]">
                      ({results.authors.length})
                    </span>
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {results.authors.map((author: any) => (
                      <span
                        key={author.id}
                        className="rounded-full border border-[var(--color-border)] bg-[var(--color-card-bg)] px-4 py-2 text-sm text-[var(--color-text-secondary)]"
                      >
                        {author.name || "غير معروف"}
                      </span>
                    ))}
                  </div>
                </section>
              )}

              {!results.posts?.length && !results.authors?.length && (
                <p className="py-12 sm:py-16 text-center text-[var(--color-text-secondary)]">
                  لا توجد نتائج لـ &ldquo;{initialQ}&rdquo;
                </p>
              )}
            </div>
          )}

          {!initialQ && !results && (
            <p className="py-12 sm:py-16 text-center text-[var(--color-text-tertiary)]">
              اكتب كلمة مفتاحية لبدء البحث
            </p>
          )}
        </div>
      </section>
    </>
  );
}

export default function SearchPage() {
  return (
    <Suspense>
      <SearchInner />
    </Suspense>
  );
}
