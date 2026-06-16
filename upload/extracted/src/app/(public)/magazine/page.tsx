import { prisma } from "@/lib/db";
import { formatDate } from "@/lib/utils";
import { Pagination } from "@/components/ui/pagination";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

const ITEMS_PER_PAGE = 12;

export const metadata: Metadata = {
  title: "المجلة",
  description: "أعداد المجلة الأدبية والثقافية لمؤسسة المنى الإبداعية",
};

export default async function MagazinePage(props: { searchParams: Promise<Record<string, string | undefined>> }) {
  const searchParams = await props.searchParams;
  const page = Math.max(1, Number(searchParams.page) || 1);

  const [magazines, total] = await Promise.all([
    prisma.magazine.findMany({
      orderBy: { issueNumber: "desc" },
      skip: (page - 1) * ITEMS_PER_PAGE,
      take: ITEMS_PER_PAGE,
    }),
    prisma.magazine.count(),
  ]);

  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  return (
    <>
      <section className="relative min-h-[40vh] overflow-hidden pt-32">
        <div className="pointer-events-none absolute inset-0 bg-gradient-cinema" />
        <div className="pointer-events-none absolute inset-0">
          <div className="glow-blob glow-orange" style={{ width: 500, height: 500, top: "-20%", right: "-5%" }} />
          <div className="glow-blow glow-purple float-loop-delayed" style={{ width: 350, height: 350, bottom: "10%", left: "-5%" }} />
        </div>
        <div className="noise-overlay" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 pb-16 text-center">
          <span className="section-label">
            <span className="section-label-dot" />
            إصداراتنا الدورية
          </span>
          <h1 className="font-amiri text-4xl font-bold text-white md:text-6xl">المجلة</h1>
          <div className="section-divider mx-auto mt-4 w-20" />
          <p className="mx-auto mt-6 max-w-xl text-white/50">
            أعداد مجلتنا الأدبية — تصدر دورياً وتضم نخبة من الإبداعات والدراسات
          </p>
        </div>
      </section>

      <section data-reveal className="relative border-t border-white/[0.06]">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="glow-blob glow-amber" style={{ width: 350, height: 350, top: "20%", right: "-8%" }} />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 py-16">
          {magazines.length === 0 ? (
            <p className="py-20 text-center text-white/40">لا توجد أعداد بعد</p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {magazines.map((m, i) => (
                <div
                  key={m.id}
                  className="glass-card group relative overflow-hidden p-6 text-center transition-all duration-500 hover:-translate-y-1"
                  data-reveal
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <div className="pointer-events-none absolute -inset-x-20 -inset-y-20 bg-gradient-to-r from-transparent via-orange-500/[0.04] to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                  <div className="gradient-border-mask absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="relative z-10">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500/20 to-amber-500/20 text-orange-400 transition-all duration-300 group-hover:scale-110">
                      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                      </svg>
                    </div>
                    <h2 className="mb-2 text-2xl font-amiri font-bold text-white transition-colors duration-300 group-hover:text-orange-300">
                      {m.title}
                    </h2>
                    <p className="text-sm text-white/50">العدد {m.issueNumber}</p>
                    <p className="mt-1 text-xs text-white/40">{formatDate(m.publishedAt)}</p>
                    {m.pdfUrl && (
                      <a
                        href={m.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary mt-5 inline-flex"
                      >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        تحميل PDF
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
          <Pagination currentPage={page} totalPages={totalPages} basePath="/magazine" searchParams={{}} />
        </div>
      </section>
    </>
  );
}
