import { prisma } from "@/lib/db";
import { UserManager } from "@/components/admin/user-manager";

export default async function AdminUsersPage() {
  const users = await prisma.user.findMany({
    select: { id: true, email: true, name: true, role: true, status: true, createdAt: true, country: true, _count: { select: { posts: true } } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-amiri font-bold">المستخدمون</h1>
      <UserManager users={users} />
    </div>
  );
}
