import { prisma } from "@/lib/db";
import { formatDate } from "@/lib/utils";
import { Pagination } from "@/components/ui/pagination";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

const ITEMS_PER_PAGE = 12;

export const metadata: Metadata = {
  title: "الفعاليات",
  description: "الفعاليات والأنشطة الثقافية والأدبية لمؤسسة المنى الإبداعية",
};

export default async function EventsPage(props: { searchParams: Promise<Record<string, string | undefined>> }) {
  const searchParams = await props.searchParams;
  const page = Math.max(1, Number(searchParams.page) || 1);

  const [events, total] = await Promise.all([
    prisma.event.findMany({
      orderBy: { eventDate: "desc" },
      where: { status: { not: "CANCELLED" } },
      skip: (page - 1) * ITEMS_PER_PAGE,
      take: ITEMS_PER_PAGE,
    }),
    prisma.event.count({ where: { status: { not: "CANCELLED" } } }),
  ]);

  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  return (
    <>
      <section className="relative min-h-[40vh] overflow-hidden pt-32">
        <div className="pointer-events-none absolute inset-0 bg-gradient-cinema" />
        <div className="pointer-events-none absolute inset-0">
          <div className="glow-blob glow-amber" style={{ width: 500, height: 500, top: "-20%", right: "-10%" }} />
          <div className="glow-blob glow-purple float-loop-delayed" style={{ width: 300, height: 300, bottom: "10%", left: "-5%" }} />
        </div>
        <div className="noise-overlay" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 pb-16 text-center">
          <span className="section-label">
            <span className="section-label-dot" />
            أجندتنا الثقافية
          </span>
          <h1 className="font-amiri text-4xl font-bold text-white md:text-6xl">الفعاليات</h1>
          <div className="section-divider mx-auto mt-4 w-20" />
          <p className="mx-auto mt-6 max-w-xl text-white/50">
            تابعوا فعالياتنا وأنشطتنا الثقافية — أمسيات شعرية، ندوات فكرية، وورش إبداعية
          </p>
        </div>
      </section>

      <section data-reveal className="relative border-t border-white/[0.06]">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="glow-blob glow-orange" style={{ width: 350, height: 350, top: "30%", left: "-8%" }} />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 py-16">
          {events.length === 0 ? (
            <p className="py-20 text-center text-white/40">لا توجد فعاليات حالياً</p>
          ) : (
            <div className="grid gap-5 md:grid-cols-2">
              {events.map((event, i) => (
                <div
                  key={event.id}
                  className="glass-card relative overflow-hidden p-6 transition-all duration-500 hover:-translate-y-1"
                  data-reveal
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <div className="pointer-events-none absolute -inset-x-20 -inset-y-20 bg-gradient-to-r from-transparent via-orange-500/[0.04] to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                  <div className="mb-4 flex items-center justify-between">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${
                        event.status === "UPCOMING"
                          ? "bg-emerald-500/10 text-emerald-300"
                          : "bg-white/10 text-white/50"
                      }`}
                    >
                      <span className={`h-1.5 w-1.5 rounded-full ${
                        event.status === "UPCOMING" ? "animate-pulse bg-emerald-400" : "bg-white/30"
                      }`} />
                      {event.status === "UPCOMING" ? "قادم" : "سابق"}
                    </span>
                    <span className="text-xs text-white/40">{formatDate(event.eventDate)}</span>
                  </div>
                  <h2 className="mb-2 text-xl font-amiri font-bold text-white">{event.title}</h2>
                  {event.description && (
                    <p className="mb-4 text-sm leading-relaxed text-white/50 line-clamp-2">{event.description}</p>
                  )}
                  {event.location && (
                    <div className="flex items-center gap-2 text-xs text-white/40">
                      <svg className="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {event.location}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
          <Pagination currentPage={page} totalPages={totalPages} basePath="/events" searchParams={{}} />
        </div>
      </section>
    </>
  );
}
