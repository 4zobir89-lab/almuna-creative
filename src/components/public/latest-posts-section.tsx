"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { PostGrid } from "@/components/public/post-grid";

type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt?: string;
  body?: string;
  publishedAt: string | Date;
  viewCount: number;
  author: { id: string; name: string; email?: string };
  category: { id: string; name: string; slug?: string };
  tags: any[];
};

type Props = {
  posts: Post[];
};

export function LatestPostsSection({ posts }: Props) {
  return (
    <section className="relative py-20 sm:py-24 px-6 sm:px-8">
      <div className="mx-auto max-w-6xl">
        {/* S2: Hanging header — label floats above, content flows below */}
        <div className="mb-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-end justify-between gap-4"
          >
            <div>
              <div className="section-label mb-2">
                <span className="section-label-dot" />
                إصدارات حديثة
              </div>
              <h2 className="font-ruqaa text-3xl sm:text-4xl font-bold text-[var(--color-text-primary)]">
                أحدث الإبداعات
              </h2>
            </div>
            <Link
              href="/archive"
              className="group inline-flex items-center gap-2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--accent)] transition-colors"
            >
              عرض الكل
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            </Link>
          </motion.div>
        </div>

        <PostGrid posts={posts as any} showFeatured showImage />
      </div>
    </section>
  );
}
