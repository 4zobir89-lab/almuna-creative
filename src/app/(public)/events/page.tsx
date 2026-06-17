import { prisma } from "@/lib/db";
import type { Metadata } from "next";
import { Calendar, MapPin, Users, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { PageHeader } from "@/components/public/page-header";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "الفعاليات",
  description: "أمسيات قراءة، ورش كتابة، مسابقات أدبية، ولقاءات المؤسسة",
};

const FALLBACK_EVENTS = [
  {
    id: "e1",
    title: "أمسية شعرية: أناشيد الغياب",
    slug: "poetry-evening-1",
    description: "أمسية شعرية تجمع نخبة من شعراء المؤسسة لقراءة نصوصهم الأخيرة.",
    eventType: "READING",
    eventDate: new Date(Date.now() + 7 * 86400000).toISOString(),
    location: "قاعة الملك فهد الثقافية - الرياض",
    status: "UPCOMING",
  },
  {
    id: "e2",
    title: "ورشة كتابة القصة القصيرة",
    slug: "workshop-1",
    description: "ورشة مكثفة لتقنيات كتابة القصة القصيرة بإشراف د. خالد القاضي.",
    eventType: "WORKSHOP",
    eventDate: new Date(Date.now() + 14 * 86400000).toISOString(),
    location: "مقر المؤسسة - عدن",
    status: "UPCOMING",
  },
  {
    id: "e3",
    title: "مسابقة الإبداع الأدبي الثانية",
    slug: "competition-2",
    description: "مسابقة سنوية في الشعر والقصة والمقال. جوائز قيمة للفائزين الثلاثة الأوائل.",
    eventType: "COMPETITION",
    eventDate: new Date(Date.now() + 30 * 86400000).toISOString(),
    location: "إلكتروني",
    status: "UPCOMING",
  },
  {
    id: "e4",
    title: "لقاء شهري: نقد تجربة شعرية",
    slug: "meeting-1",
    description: "لقاء نقدي لمناقشة تجربة شاعر عربي معاصر.",
    eventType: "MEETING",
    eventDate: new Date(Date.now() - 7 * 86400000).toISOString(),
    location: "بث مباشر",
    status: "PAST",
  },
];

const eventTypeLabel: Record<string, string> = {
  READING: "أمسية قراءة",
  WORKSHOP: "ورشة",
  COMPETITION: "مسابقة",
  MEETING: "لقاء",
  OTHER: "فعالية",
};

export default async function EventsPage() {
  let events: any[] = FALLBACK_EVENTS;
  try {
    const dbEvents = await prisma.event.findMany({
      orderBy: { eventDate: "desc" },
      take: 20,
    });
    if (dbEvents.length > 0) events = dbEvents;
  } catch {
    // Use fallback
  }

  const upcoming = events.filter((e) => e.status === "UPCOMING" || new Date(e.eventDate) > new Date());
  const past = events.filter((e) => e.status === "PAST" || new Date(e.eventDate) <= new Date());

  return (
    <>
      <PageHeader
        background="/backgrounds/poet-window.webp"
        label="التقويم الإبداعي"
        title="الفعاليات"
        description="أمسيات قراءة، ورش كتابة، مسابقات أدبية، ولقاءات المؤسسة"
      />

      <section data-reveal className="relative border-t border-[var(--color-border)]">
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 py-10 sm:py-14 md:py-16">
          {upcoming.length > 0 && (
            <div className="mb-12 sm:mb-16">
              <h2 className="mb-6 sm:mb-8 font-amiri text-2xl sm:text-3xl font-bold text-[var(--color-text-primary)] flex items-center gap-3">
                <span className="w-1 h-7 sm:h-8 bg-brand-gold rounded-full" />
                فعاليات قادمة
              </h2>
              <div className="space-y-4 sm:space-y-5">
                {upcoming.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </div>
          )}

          {past.length > 0 && (
            <div>
              <h2 className="mb-6 sm:mb-8 font-amiri text-2xl sm:text-3xl font-bold text-[var(--color-text-primary)] flex items-center gap-3">
                <span className="w-1 h-7 sm:h-8 bg-[var(--color-text-tertiary)] rounded-full" />
                فعاليات سابقة
              </h2>
              <div className="space-y-4 sm:space-y-5 opacity-70">
                {past.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function EventCard({ event }: { event: any }) {
  const eventDate = new Date(event.eventDate);
  const day = eventDate.toLocaleDateString("ar-SA", { day: "numeric" });
  const month = eventDate.toLocaleDateString("ar-SA", { month: "long" });
  const year = eventDate.toLocaleDateString("ar-SA", { year: "numeric" });

  return (
    <Link
      href="#"
      className="glass-card group relative overflow-hidden p-5 sm:p-6 transition-all duration-500 hover:-translate-y-1 rounded-2xl block"
    >
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
        <div className="flex-shrink-0 flex flex-col items-center justify-center w-16 sm:w-20 h-16 sm:h-20 rounded-2xl bg-gradient-to-br from-brand-accent/20 to-brand-gold/20 border border-brand-gold/20">
          <span className="text-xl sm:text-2xl font-bold text-brand-gold">{day}</span>
          <span className="text-[10px] sm:text-xs text-[var(--color-text-secondary)]">{month}</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-[10px] sm:text-xs rounded-full bg-brand-gold/10 text-brand-gold">
              {eventTypeLabel[event.eventType] || "فعالية"}
            </span>
            {event.status === "UPCOMING" && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-[10px] sm:text-xs rounded-full bg-emerald-500/10 text-emerald-400">
                قادمة
              </span>
            )}
          </div>
          <h3 className="text-lg sm:text-xl font-amiri font-bold text-[var(--color-text-primary)] mb-1 group-hover:text-brand-gold transition-colors">
            {event.title}
          </h3>
          {event.description && (
            <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] line-clamp-2 mb-2">
              {event.description}
            </p>
          )}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs text-[var(--color-text-tertiary)]">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {year}
            </span>
            {event.location && (
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                {event.location}
              </span>
            )}
          </div>
        </div>
        <ArrowLeft className="w-5 h-5 text-brand-gold/60 group-hover:text-brand-gold group-hover:-translate-x-1 transition-all flex-shrink-0 self-start sm:self-center" />
      </div>
    </Link>
  );
}
