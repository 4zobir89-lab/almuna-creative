"use client";

import { useRouter } from "next/navigation";
import { useOptimistic } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toggleUserStatus, changeUserRole } from "@/lib/actions/users";
import { useToast } from "@/components/ui/toast";

type UserRow = {
  id: string; email: string; name: string | null; role: string; status: string;
  createdAt: Date; country: string | null; _count: { posts: number };
};

type Props = { users: UserRow[] };

export function UserManager({ users: serverUsers }: Props) {
  const router = useRouter();
  const toast = useToast();

  const [optimisticUsers, addOptimisticUser] = useOptimistic(
    serverUsers,
    (state, action: { id: string; updates: Partial<Pick<UserRow, "role" | "status">> }) => {
      return state.map((u) => (u.id === action.id ? { ...u, ...action.updates } : u));
    },
  );

  async function handleToggleStatus(id: string, currentStatus: string) {
    const newStatus = currentStatus === "ACTIVE" ? "SUSPENDED" : "ACTIVE";
    addOptimisticUser({ id, updates: { status: newStatus } });
    await toggleUserStatus(id);
    router.refresh();
  }

  async function handleRoleChange(id: string, role: string) {
    addOptimisticUser({ id, updates: { role } });
    await changeUserRole(id, role);
    router.refresh();
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-brand-border">
      <table className="w-full text-right">
        <thead className="bg-brand-hover">
          <tr>
            <th className="p-3 text-sm font-medium">الاسم</th>
            <th className="p-3 text-sm font-medium">البريد</th>
            <th className="p-3 text-sm font-medium">الدور</th>
            <th className="p-3 text-sm font-medium">الحالة</th>
            <th className="p-3 text-sm font-medium">النصوص</th>
            <th className="p-3 text-sm font-medium">التسجيل</th>
            <th className="p-3 text-sm font-medium"></th>
          </tr>
        </thead>
        <tbody>
          {optimisticUsers.map((user) => (
            <tr key={user.id} className="border-t border-brand-border hover:bg-brand-hover/50">
              <td className="p-3 font-medium">{user.name || "—"}</td>
              <td className="p-3 text-sm text-brand-secondary">{user.email}</td>
              <td className="p-3">
                <select
                  defaultValue={user.role}
                  onChange={async (e) => handleRoleChange(user.id, e.target.value)}
                  className="rounded border border-brand-border px-2 py-1 text-xs bg-brand-bg text-brand-primary"
                >
                  <option value="AUTHOR">كاتب</option>
                  <option value="EDITOR">محرر</option>
                  <option value="ADMIN">مدير</option>
                </select>
              </td>
              <td className="p-3">
                <Badge variant={user.status === "ACTIVE" ? "success" : user.status === "SUSPENDED" ? "destructive" : "warning"}>
                  {user.status === "ACTIVE" ? "نشط" : user.status === "SUSPENDED" ? "موقوف" : "قيد الانتظار"}
                </Badge>
              </td>
              <td className="p-3 text-sm">{user._count.posts}</td>
              <td className="p-3 text-sm text-brand-secondary">
                {new Date(user.createdAt).toLocaleDateString("ar-SA")}
              </td>
              <td className="p-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleToggleStatus(user.id, user.status)}
                  className={user.status === "ACTIVE" ? "text-red-600" : "text-green-600"}
                >
                  {user.status === "ACTIVE" ? "إيقاف" : "تفعيل"}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
