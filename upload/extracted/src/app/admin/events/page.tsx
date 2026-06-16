import { prisma } from "@/lib/db";
import { EventManager } from "@/components/admin/event-manager";

export default async function AdminEventsPage() {
  const events = await prisma.event.findMany({
    include: {
      creator: { select: { id: true, name: true } },
      _count: { select: { participants: true } },
    },
    orderBy: { eventDate: "desc" },
  });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-amiri font-bold">الفعاليات</h1>
      <EventManager events={events} />
    </div>
  );
}
