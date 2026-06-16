import { prisma } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default async function AdminDashboard() {
  const [posts, users, events, messages] = await Promise.all([
    prisma.post.count(),
    prisma.user.count(),
    prisma.event.count(),
    prisma.contactMessage.count({ where: { isRead: false } }),
  ]);

  const totalViews = await prisma.post.aggregate({ _sum: { viewCount: true } });
  const recentPosts = await prisma.post.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
    include: { author: { select: { name: true } }, category: true },
  });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-amiri font-bold">لوحة التحكم</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="النصوص" value={posts} href="/admin/posts" />
        <StatCard title="المستخدمون" value={users} href="/admin/users" />
        <StatCard title="الفعاليات" value={events} href="/admin/events" />
        <StatCard title="الرسائل غير المقروءة" value={messages} href="/admin/messages" />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">إجمالي المشاهدات</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{totalViews._sum.viewCount || 0}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl">آخر المنشورات</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentPosts.map((post) => (
                <div key={post.id} className="flex items-center justify-between border-b border-brand-border pb-2 last:border-0">
                  <div>
                    <Link href={`/admin/posts/${post.id}`} className="font-medium hover:text-brand-accent">
                      {post.title}
                    </Link>
                    <p className="text-xs text-brand-secondary">{post.author.name}</p>
                  </div>
                  <span className="text-xs text-brand-secondary">{post.category?.name}</span>
                </div>
              ))}
              {recentPosts.length === 0 && <p className="text-brand-secondary">لا توجد منشورات بعد</p>}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function StatCard({ title, value, href }: { title: string; value: number; href: string }) {
  return (
    <Link href={href}>
      <Card className="transition-colors hover:border-brand-accent">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-normal text-brand-secondary">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{value}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
