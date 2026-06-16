"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createEvent, deleteEvent } from "@/lib/actions/events";

type EventRow = {
  id: string;
  title: string;
  eventType: string;
  eventDate: Date;
  location: string | null;
  status: string;
  _count: { participants: number };
};

type Props = { events: EventRow[] };

export function EventManager({ events }: Props) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [eventType, setEventType] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [location, setLocation] = useState("");

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !eventDate || !eventType) return;

    await createEvent({
      title: title.trim(),
      description: description.trim() || undefined,
      eventType: eventType as "WORKSHOP" | "READING" | "MEETING" | "COMPETITION" | "OTHER",
      eventDate: new Date(eventDate).toISOString(),
      location: location.trim() || undefined,
    });

    setTitle("");
    setDescription("");
    setEventType("");
    setEventDate("");
    setLocation("");
    router.refresh();
  }

  async function handleDelete(id: string) {
    if (!confirm("حذف هذه الفعالية؟")) return;
    await deleteEvent(id);
    router.refresh();
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleCreate} className="space-y-4 rounded-lg border border-brand-border p-4">
        <h2 className="text-xl font-amiri font-bold">فعالية جديدة</h2>
        <Input placeholder="العنوان" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <textarea
          placeholder="الوصف"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="w-full rounded-md border border-brand-border bg-white p-3 text-sm"
        />
        <div className="grid gap-4 md:grid-cols-3">
          <select
            value={eventType}
            onChange={(e) => setEventType(e.target.value)}
            required
            className="flex h-10 w-full rounded-md border border-brand-border bg-white px-3 py-2 text-sm"
          >
            <option value="">النوع</option>
            <option value="WORKSHOP">ورشة عمل</option>
            <option value="READING">قراءة</option>
            <option value="MEETING">لقاء</option>
            <option value="COMPETITION">مسابقة</option>
            <option value="OTHER">أخرى</option>
          </select>
          <Input type="datetime-local" value={eventDate} onChange={(e) => setEventDate(e.target.value)} required />
          <Input placeholder="الموقع" value={location} onChange={(e) => setLocation(e.target.value)} />
        </div>
        <Button type="submit">إضافة</Button>
      </form>

      <div className="space-y-2">
        {events.map((event) => (
          <div key={event.id} className="flex items-center justify-between rounded-lg border border-brand-border p-3">
            <div>
              <p className="font-medium">{event.title}</p>
              <p className="text-xs text-brand-secondary">
                {new Date(event.eventDate).toLocaleDateString("ar-SA")} — {event.location}
              </p>
            </div>
            <Button variant="ghost" size="sm" onClick={() => handleDelete(event.id)} className="text-red-600">حذف</Button>
          </div>
        ))}
      </div>
    </div>
  );
}
