import { prisma } from "@/lib/db";
import { TagManager } from "@/components/admin/tag-manager";

export default async function AdminTagsPage() {
  const tags = await prisma.tag.findMany({
    include: { _count: { select: { posts: true } } },
    orderBy: { name: "asc" },
  });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-amiri font-bold">الوسوم</h1>
      <TagManager tags={tags} />
    </div>
  );
}
