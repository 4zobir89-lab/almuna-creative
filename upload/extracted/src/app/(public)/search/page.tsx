"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { PostCard } from "@/components/public/post-card";
import { Input } from "@/components/ui/input";
import { Suspense } from "react";

function SearchInner() {
  const searchParams = useSearchParams();
  const initialQ = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQ);
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const doSearch = useCallback(async (q: string) => {
    if (q.trim().length < 2) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
      const data = await res.json();
      setResults(data);
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
      <section className="relative min-h-[40vh] overflow-hidden pt-32">
        <div className="pointer-events-none absolute inset-0 bg-gradient-cinema" />
        <div className="pointer-events-none absolute inset-0">
          <div className="glow-blob glow-orange" style={{ width: 450, height: 450, top: "-15%", right: "-5%" }} />
          <div className="glow-blob glow-purple float-loop" style={{ width: 300, height: 300, bottom: "10%", left: "-5%" }} />
        </div>
        <div className="noise-overlay" />
        <div className="relative z-10 mx-auto max-w-2xl px-4 pb-16 text-center">
          <span className="section-label">
            <span className="section-label-dot" />
            ابحث في كنوزنا
          </span>
          <h1 className="font-amiri text-4xl font-bold text-white md:text-6xl">بحث</h1>
          <div className="section-divider mx-auto mt-4 w-20" />
          <p className="mx-auto mt-6 max-w-xl text-white/50">
            ابحث في النصوص، الكتاب، والأقسام
          </p>
        </div>
      </section>

      <section className="relative border-t border-white/[0.06]">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="glow-blob glow-amber" style={{ width: 350, height: 350, top: "20%", right: "-8%" }} />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 py-16">
          <form onSubmit={handleSearch} className="glass-card mb-10 p-4">
            <div className="relative">
              <svg className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="ابحث عن نصوص، كتاب، أقسام…"
                className="h-14 w-full rounded-xl border-white/10 bg-white/5 pr-12 text-lg text-white placeholder:text-white/30 focus:border-orange-500/40 focus:ring-orange-500/20"
              />
            </div>
          </form>

          {loading && (
            <div className="flex items-center justify-center py-12">
              <div className="flex items-center gap-2 text-white/50">
                <svg className="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                جاري البحث…
              </div>
            </div>
          )}

          {results && !loading && (
            <div className="space-y-8">
              {results.posts?.length > 0 && (
                <section>
                  <h2 className="mb-5 text-xl font-amiri font-bold text-white">
                    النصوص
                    <span className="mr-2 text-sm font-normal text-white/40">({results.posts.length})</span>
                  </h2>
                  <div className="grid gap-5 md:grid-cols-2">
                    {results.posts.map((post: any) => (
                      <PostCard key={post.id} post={post} />
                    ))}
                  </div>
                </section>
              )}

              {results.authors?.length > 0 && (
                <section>
                  <h2 className="mb-5 text-xl font-amiri font-bold text-white">
                    الكتّاب
                    <span className="mr-2 text-sm font-normal text-white/40">({results.authors.length})</span>
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {results.authors.map((author: any) => (
                      <span key={author.id} className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white/60 backdrop-blur-sm">
                        {author.name || "غير معروف"}
                      </span>
                    ))}
                  </div>
                </section>
              )}

              {(!results.posts?.length && !results.authors?.length) && (
                <p className="py-16 text-center text-white/40">
                  لا توجد نتائج لـ &ldquo;{initialQ}&rdquo;
                </p>
              )}
            </div>
          )}

          {!initialQ && !mounted && (
            <p className="py-12 text-center text-white/30">
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
