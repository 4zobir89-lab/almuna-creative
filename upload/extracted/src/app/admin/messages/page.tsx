import { prisma } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { markAsRead } from "@/lib/actions/messages";

export default async function AdminMessagesPage() {
  const messages = await prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-amiri font-bold">الرسائل</h1>
      {messages.length === 0 ? (
        <p className="text-brand-secondary">لا توجد رسائل بعد</p>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`rounded-lg border p-4 ${!msg.isRead ? "border-brand-accent bg-brand-accent/5" : "border-brand-border"}`}>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <span className="font-medium">{msg.name}</span>
                  <span className="mr-3 text-sm text-brand-secondary">{msg.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-brand-secondary">
                    {new Date(msg.createdAt).toLocaleDateString("ar-SA")}
                  </span>
                  {!msg.isRead && (
                    <form action={markAsRead.bind(null, msg.id)}>
                      <Button variant="ghost" size="sm">تمت القراءة</Button>
                    </form>
                  )}
                </div>
              </div>
              {msg.subject && <p className="mb-1 text-sm font-medium">{msg.subject}</p>}
              <p className="text-sm text-brand-secondary">{msg.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
