import { prisma } from "@/lib/db";
import { Badge } from "@/components/ui/badge";

export default async function AdminMagazinesPage() {
  const magazines = await prisma.magazine.findMany({ orderBy: { issueNumber: "desc" } });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-amiri font-bold">المجلة</h1>
      <div className="grid gap-4 md:grid-cols-3">
        {magazines.map((m) => (
          <div key={m.id} className="rounded-lg border border-brand-border p-4">
            <h3 className="font-amiri text-lg font-bold">{m.title}</h3>
            <p className="mb-2 text-sm text-brand-secondary">العدد {m.issueNumber}</p>
            <p className="text-xs text-brand-secondary">{new Date(m.publishedAt).toLocaleDateString("ar-SA")}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
