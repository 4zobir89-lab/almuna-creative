import Link from "next/link";

const PREMIUM_EASE = "cubic-bezier(0.32,0.72,0,1)";

export function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-[#050505] to-[#0a0a0a] text-ink-300">
      {/* الشريط الهندسي العلوي */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent z-10" />

      {/* الشريط الزخرفي */}
      <div className="absolute top-0 left-0 right-0 h-2 overflow-hidden opacity-[0.12] z-10">
        <svg className="w-full h-full" viewBox="0 0 1200 8" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 4 L30 1 L60 7 L90 2 L120 6 L150 1 L180 7 L210 3 L240 6 L270 1 L300 7 L330 2 L360 6 L390 1 L420 7 L450 3 L480 6 L510 1 L540 7 L570 2 L600 6 L630 1 L660 7 L690 3 L720 6 L750 1 L780 7 L810 2 L840 6 L870 1 L900 7 L930 3 L960 6 L990 1 L1020 7 L1050 2 L1080 6 L1110 1 L1140 7 L1170 3 L1200 6"
            stroke="rgba(245,158,11,0.6)" strokeWidth="0.8" fill="none" />
        </svg>
      </div>

      {/* العلامة المائية الخلفية */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <span className="noto-kufi absolute -bottom-10 left-1/2 -translate-x-1/2 text-[300px] md:text-[400px] font-bold leading-none text-white/[0.012] select-none" aria-hidden="true">
          المنى
        </span>
        <div className="absolute bottom-[-30%] left-[-10%] w-[500px] h-[500px] rounded-full bg-brand-accent/5 blur-[120px]" />
        <div className="absolute top-[-10%] right-[-5%] w-[300px] h-[300px] rounded-full bg-brand-gold/[0.03] blur-[100px]" />
        <div className="absolute top-0 left-[12%] w-px h-full bg-gradient-to-b from-transparent via-brand-gold/[0.03] to-transparent" />
        <div className="absolute top-0 right-[12%] w-px h-full bg-gradient-to-b from-transparent via-brand-gold/[0.03] to-transparent" />
      </div>

      {/* الإطارات الهندسية */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <svg className="absolute top-8 right-8 w-12 h-12 text-brand-gold/15" viewBox="0 0 48 48" fill="none" aria-hidden="true">
          <path d="M4 44 L4 4 L44 4" stroke="currentColor" strokeWidth="1" />
          <path d="M12 40 L12 12 L40 12" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
        </svg>
        <svg className="absolute bottom-8 left-8 w-12 h-12 text-brand-gold/15" viewBox="0 0 48 48" fill="none" aria-hidden="true">
          <path d="M44 4 L44 44 L4 44" stroke="currentColor" strokeWidth="1" />
          <path d="M36 8 L36 36 L8 36" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
        </svg>
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="mb-6 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-accent to-brand-gold text-white shadow-lg">
                <span className="font-amiri text-2xl font-bold">م</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-amiri font-bold text-white tracking-wide">مؤسسة المنى</span>
                <span className="text-[10px] text-brand-gold/80 tracking-[0.25em] uppercase">الإبداعية</span>
              </div>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-ink-400">
              منصة أدبية وإبداعية عربية تحتفي بالكلمة الجميلة والفكر المستنير، وتقدّم محتوىً يجمع بين الأصالة والمعاصرة. نصوص، مقالات، وفعاليات تثري المشهد الثقافي.
            </p>
            <div className="geometric-divider my-6 mx-0" />
            <div className="flex gap-3">
              <a href="#" aria-label="فيسبوك"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.06] text-ink-400 transition-all duration-700 hover:bg-brand-accent hover:text-white hover:border-brand-accent"
                style={{ transitionTimingFunction: PREMIUM_EASE }}>
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
              </a>
              <a href="#" aria-label="تويتر"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.06] text-ink-400 transition-all duration-700 hover:bg-brand-accent hover:text-white hover:border-brand-accent"
                style={{ transitionTimingFunction: PREMIUM_EASE }}>
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
              </a>
            </div>
          </div>

          <div className="md:col-span-3 md:col-start-7">
            <h3 className="mb-7 text-xs font-bold uppercase tracking-[0.25em] text-brand-gold">روابط سريعة</h3>
            <nav className="flex flex-col gap-3.5 text-sm">
              {[{ href: "/archive", label: "الأرشيف" }, { href: "/categories", label: "الأقسام" }, { href: "/events", label: "الفعاليات" }, { href: "/authors", label: "الكتّاب" }].map((l) => (
                <Link key={l.href} href={l.href}
                  className="group/link text-ink-400 transition-all duration-700 flex items-center gap-2"
                  style={{ transitionTimingFunction: PREMIUM_EASE }}>
                  <span className="w-0 h-px bg-brand-gold/50 transition-all duration-700 group-hover/link:w-4" style={{ transitionTimingFunction: PREMIUM_EASE }} />
                  <span className="transition-all duration-700 group-hover/link:text-brand-gold">
                    {l.label}
                  </span>
                </Link>
              ))}
            </nav>
          </div>

          <div className="md:col-span-2">
            <h3 className="mb-7 text-xs font-bold uppercase tracking-[0.25em] text-brand-gold">تواصل</h3>
            <nav className="flex flex-col gap-3.5 text-sm">
              <Link href="/contact"
                className="group/link text-ink-400 transition-all duration-700 flex items-center gap-2"
                style={{ transitionTimingFunction: PREMIUM_EASE }}>
                <span className="w-0 h-px bg-brand-gold/50 transition-all duration-700 group-hover/link:w-4" style={{ transitionTimingFunction: PREMIUM_EASE }} />
                <span className="transition-all duration-700 group-hover/link:text-brand-gold">
                  مراسلتنا
                </span>
              </Link>
              <a href="mailto:info@almuna.org"
                className="group/link text-ink-400 transition-all duration-700 flex items-center gap-2"
                style={{ transitionTimingFunction: PREMIUM_EASE }}>
                <span className="w-0 h-px bg-brand-gold/50 transition-all duration-700 group-hover/link:w-4" style={{ transitionTimingFunction: PREMIUM_EASE }} />
                <span className="transition-all duration-700 group-hover/link:text-brand-gold text-xs">
                  info@almuna.org
                </span>
              </a>
            </nav>
          </div>
        </div>

        <div className="arabesque-band my-12" />

        <div className="flex flex-col items-center justify-between gap-4 text-center text-xs text-ink-500 md:flex-row font-medium tracking-wide">
          <p>© {new Date().getFullYear()} مؤسسة المنى الإبداعية. جميع الحقوق محفوظة.</p>
          <p>
            صُنع بـ <span className="text-brand-accent" aria-label="حب">♥</span> وإبداع | تطوير <span className="text-brand-gold/70 hover:text-brand-gold transition-colors duration-700"
            style={{ transitionTimingFunction: PREMIUM_EASE }}>وسيم الزبيري</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
