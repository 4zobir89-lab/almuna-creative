"use client";

import { motion } from "framer-motion";
import { PostCard } from "./post-card";
import type { PostWithRelations } from "@/types";

type Props = {
  posts: PostWithRelations[];
  showFeatured?: boolean;
  showImage?: boolean;
};

export function PostGrid({ posts, showFeatured, showImage = false }: Props) {
  const featured = showFeatured && posts.length > 0 ? posts[0] : null;
  const remaining = featured ? posts.slice(1) : posts;

  if (posts.length === 0) {
    return (
      <div className="py-16 text-center">
        <div className="inline-block mb-4">
          <span className="text-4xl text-[var(--accent)] opacity-30">✦</span>
        </div>
        <p className="font-amiri text-lg text-[var(--color-text-secondary)] mb-1">
          لا توجد نصوص لعرضها حالياً
        </p>
        <p className="text-sm text-[var(--color-text-tertiary)]">
          عُود لاحقاً لاكتشاف إبداعات جديدة
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {featured && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="md:col-span-2 lg:col-span-2"
        >
          <PostCard post={featured} featured variant="horizontal" showImage={showImage} />
        </motion.div>
      )}
      {remaining.map((post, i) => (
        <motion.div
          key={post.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{
            duration: 0.5,
            delay: (i + 1) * 0.1,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <PostCard post={post} variant="vertical" showImage={showImage} index={i} />
        </motion.div>
      ))}
    </div>
  );
}
