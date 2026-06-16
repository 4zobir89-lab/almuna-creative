import { prisma } from "@/lib/db";
import { Badge } from "@/components/ui/badge";

export default async function AdminImportPage() {
  const imports = await prisma.importLog.findMany({
    include: { post: { select: { title: true } }, reviewer: { select: { name: true } } },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-amiri font-bold">سجل الاستيراد</h1>
      <div className="overflow-x-auto rounded-lg border border-brand-border">
        <table className="w-full text-right">
          <thead className="bg-brand-hover">
            <tr>
              <th className="p-3 text-sm font-medium">المصدر</th>
              <th className="p-3 text-sm font-medium">النص</th>
              <th className="p-3 text-sm font-medium">الحالة</th>
              <th className="p-3 text-sm font-medium">المراجع</th>
              <th className="p-3 text-sm font-medium">التاريخ</th>
            </tr>
          </thead>
          <tbody>
            {imports.map((item) => (
              <tr key={item.id} className="border-t border-brand-border">
                <td className="p-3 text-sm">{item.source}</td>
                <td className="p-3 text-sm">{item.post?.title || "—"}</td>
                <td className="p-3">
                  <Badge variant={item.status === "APPROVED" ? "success" : item.status === "PENDING" ? "warning" : "destructive"}>
                    {item.status === "APPROVED" ? "مقبول" : item.status === "PENDING" ? "قيد المراجعة" : "مرفوض"}
                  </Badge>
                </td>
                <td className="p-3 text-sm text-brand-secondary">{item.reviewer?.name || "—"}</td>
                <td className="p-3 text-sm text-brand-secondary">
                  {new Date(item.createdAt).toLocaleDateString("ar-SA")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
