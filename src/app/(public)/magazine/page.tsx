import { prisma } from "@/lib/db";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "المجلة",
  description: "إصدارات مجلة مؤسسة المنى الإبداعية الدورية",
};

const FALLBACK_MAGAZINES = [
  {
    id: "m1",
    title: "العدد الأول: أناشيد الفجر",
    slug: "issue-1",
    description: "العدد الافتتاحي لمجلة المنى، يحتوي على نخبة من النصوص الشعرية والنثرية.",
    coverUrl: "",
    pdfUrl: "#",
    issueNumber: 1,
    publishedAt: new Date(Date.now() - 90 * 86400000).toISOString(),
  },
  {
    id: "m2",
    title: "العدد الثاني: مرايا الروح",
    slug: "issue-2",
    description: "العدد الثاني يضم أعمالاً من ٢٤ كاتباً وكاتبة في مختلف الأجناس الأدبية.",
    coverUrl: "",
    pdfUrl: "#",
    issueNumber: 2,
    publishedAt: new Date(Date.now() - 30 * 86400000).toISOString(),
  },
  {
    id: "m3",
    title: "العدد الثالث: ظلال الكلمة",
    slug: "issue-3",
    description: "العدد الأحدث، ملف خاص عن النقد الأدبي وتجلياته المعاصرة.",
    coverUrl: "",
    pdfUrl: "#",
    issueNumber: 3,
    publishedAt: new Date().toISOString(),
  },
];

export default async function MagazinePage() {
  let magazines: any[] = FALLBACK_MAGAZINES;
  try {
    const dbMags = await prisma.magazine.findMany({
      orderBy: { issueNumber: "desc" },
    });
    if (dbMags.length > 0) magazines = dbMags;
  } catch {
    // Use fallback
  }

  return (
    <>
      <section className="relative min-h-[40vh] overflow-hidden pt-20 sm:pt-24">
        <div className="pointer-events-none absolute inset-0 bg-gradient-cinema" />
        <div className="pointer-events-none absolute inset-0">
          <div
            className="glow-blob glow-orange"
            style={{ width: 500, height: 500, top: "-20%", left: "50%" }}
          />
          <div
            className="glow-blob glow-purple float-loop"
            style={{ width: 300, height: 300, bottom: "10%", right: "-5%" }}
          />
        </div>
        <div className="noise-overlay" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 pb-12 sm:pb-16 text-center">
          <span className="section-label">
            <span className="section-label-dot" />
            إصدارات دورية
          </span>
          <h1 className="font-amiri text-4xl sm:text-5xl md:text-6xl font-bold text-[var(--color-text-primary)]">
            المجلة
          </h1>
          <div className="section-divider mx-auto mt-4 w-20" />
          <p className="mx-auto mt-4 sm:mt-6 max-w-xl text-sm sm:text-base text-[var(--color-text-secondary)]">
            إصدارات مجلة مؤسسة المنى الإبداعية الدورية — أنشورة فصلية تُحتفي بالكلمة والفكرة
          </p>
        </div>
      </section>

      <section data-reveal className="relative border-t border-[var(--color-border)]">
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 py-10 sm:py-14 md:py-16">
          <div className="grid gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {magazines.map((mag) => (
              <article
                key={mag.id}
                className="glass-card group relative overflow-hidden rounded-2xl transition-all duration-500 hover:-translate-y-1"
              >
                {/* Cover */}
                <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-br from-brand-accent/20 via-brand-gold/15 to-purple-900/20">
                  <div className="absolute inset-0 arabesque-tessellation opacity-20" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                    <div className="text-[10px] tracking-[0.3em] text-brand-gold/80 uppercase mb-2">
                      العدد {mag.issueNumber}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-amiri font-bold text-[var(--color-text-primary)] mb-3 leading-tight">
                      {mag.title.split(":")[1]?.trim() || mag.title}
                    </h3>
                    <div className="w-12 h-px bg-brand-gold/40" />
                    <p className="mt-3 text-xs text-[var(--color-text-secondary)]">
                      {new Date(mag.publishedAt).toLocaleDateString("ar-SA", {
                        year: "numeric",
                        month: "long",
                      })}
                    </p>
                  </div>
                  <div className="absolute top-3 right-3 left-3 flex items-center justify-between">
                    <span className="px-2.5 py-1 text-[10px] rounded-full bg-black/30 backdrop-blur-sm text-white/80">
                      مجلة المنى
                    </span>
                    <span className="px-2.5 py-1 text-[10px] rounded-full bg-brand-gold/20 backdrop-blur-sm text-brand-gold">
                      PDF
                    </span>
                  </div>
                </div>
                {/* Content */}
                <div className="p-5 sm:p-6">
                  <h4 className="text-base sm:text-lg font-amiri font-bold text-[var(--color-text-primary)] mb-2 group-hover:text-brand-gold transition-colors">
                    {mag.title}
                  </h4>
                  {mag.description && (
                    <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] line-clamp-3 mb-4">
                      {mag.description}
                    </p>
                  )}
                  <button className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold tracking-wider rounded-full bg-brand-accent text-white hover:bg-brand-gold hover:text-[#1C1917] transition-all">
                    اقرأ الإصدار
                    <span>←</span>
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
