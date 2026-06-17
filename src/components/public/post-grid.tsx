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
        <div className="md:col-span-2 lg:col-span-2">
          <PostCard post={featured} featured variant="horizontal" showImage={showImage} />
        </div>
      )}
      {remaining.map((post) => (
        <PostCard key={post.id} post={post} variant="vertical" showImage={showImage} />
      ))}
    </div>
  );
}
