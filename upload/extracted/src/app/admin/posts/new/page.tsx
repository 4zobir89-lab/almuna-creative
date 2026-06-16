import { PostForm } from "@/components/admin/post-form";
import { prisma } from "@/lib/db";

export default async function NewPostPage() {
  const [categories, tags] = await Promise.all([
    prisma.category.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.tag.findMany({ orderBy: { name: "asc" } }),
  ]);

  return (
    <div className="space-y-6 max-w-4xl">
      <h1 className="text-3xl font-amiri font-bold">نص جديد</h1>
      <PostForm categories={categories} tags={tags} />
    </div>
  );
}
