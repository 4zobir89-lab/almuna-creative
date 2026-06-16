import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { PostForm } from "@/components/admin/post-form";

export default async function EditPostPage({ params }: { params: { id: string } }) {
  const [post, categories, tags] = await Promise.all([
    prisma.post.findUnique({
      where: { id: params.id },
      include: { tags: { include: { tag: true } } },
    }),
    prisma.category.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.tag.findMany({ orderBy: { name: "asc" } }),
  ]);

  if (!post) notFound();

  return (
    <div className="space-y-6 max-w-4xl">
      <h1 className="text-3xl font-amiri font-bold">تعديل النص</h1>
      <PostForm
        post={{
          id: post.id,
          title: post.title,
          body: post.body,
          excerpt: post.excerpt || "",
          categoryId: post.categoryId || "",
          status: post.status,
          country: post.country || "",
          scheduledAt: post.scheduledAt?.toISOString().slice(0, 16) || "",
          tags: post.tags.map((t) => t.tag.id),
        }}
        categories={categories}
        tags={tags}
      />
    </div>
  );
}
