import Link from "next/link";
import { prisma } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { deletePost } from "@/lib/actions/posts";

export default async function AdminPostsPage() {
  const session = await getServerSession(authOptions);
  const where = session?.user?.role === "ADMIN" ? {} : { authorId: session?.user?.id };

  const posts = await prisma.post.findMany({
    where,
    include: { author: { select: { name: true } }, category: true, _count: { select: { tags: true } } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-amiri font-bold">النصوص</h1>
        <Link href="/admin/posts/new">
          <Button>نص جديد</Button>
        </Link>
      </div>

      <div className="overflow-x-auto rounded-lg border border-brand-border">
        <table className="w-full text-right">
          <thead className="bg-brand-hover">
            <tr>
              <th className="p-3 text-sm font-medium">العنوان</th>
              <th className="p-3 text-sm font-medium">الكاتب</th>
              <th className="p-3 text-sm font-medium">القسم</th>
              <th className="p-3 text-sm font-medium">الحالة</th>
              <th className="p-3 text-sm font-medium">المشاهدات</th>
              <th className="p-3 text-sm font-medium">التاريخ</th>
              <th className="p-3 text-sm font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id} className="border-t border-brand-border hover:bg-brand-hover/50">
                <td className="p-3">
                  <Link href={`/admin/posts/${post.id}`} className="font-medium hover:text-brand-accent">
                    {post.title}
                  </Link>
                </td>
                <td className="p-3 text-sm text-brand-secondary">{post.author.name}</td>
                <td className="p-3 text-sm text-brand-secondary">{post.category?.name || "—"}</td>
                <td className="p-3">
                  <Badge variant={post.status === "PUBLISHED" ? "success" : post.status === "DRAFT" ? "warning" : "destructive"}>
                    {post.status === "PUBLISHED" ? "منشور" : post.status === "DRAFT" ? "مسودة" : "مؤرشف"}
                  </Badge>
                </td>
                <td className="p-3 text-sm">{post.viewCount}</td>
                <td className="p-3 text-sm text-brand-secondary">
                  {new Date(post.createdAt).toLocaleDateString("ar-SA")}
                </td>
                <td className="p-3">
                  <form action={deletePost.bind(null, post.id)}>
                    <Button variant="ghost" size="sm" className="text-red-600">حذف</Button>
                  </form>
                </td>
              </tr>
            ))}
            {posts.length === 0 && (
              <tr>
                <td colSpan={7} className="p-6 text-center text-brand-secondary">
                  لا توجد نصوص بعد
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
