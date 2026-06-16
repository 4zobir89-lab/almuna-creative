import { prisma } from "@/lib/db";
import { CategoryManager } from "@/components/admin/category-manager";

export default async function AdminCategoriesPage() {
  const categories = await prisma.category.findMany({
    include: { _count: { select: { posts: true } }, children: { include: { _count: { select: { posts: true } } } } },
    orderBy: { sortOrder: "asc" },
  });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-amiri font-bold">الأقسام</h1>
      <CategoryManager categories={categories} />
    </div>
  );
}
