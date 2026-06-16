import Link from "next/link";

const PREMIUM_EASE = "cubic-bezier(0.32,0.72,0,1)";

export function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-[var(--footer-bg-from)] to-[var(--footer-bg-to)] text-[var(--color-text-secondary)]">
      {/* Top decorative gold line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent z-10" />

      {/* Subtle decorative band */}
      <div className="absolute top-0 left-0 right-0 h-2 overflow-hidden opacity-[0.12] z-10">
        <svg className="w-full h-full" viewBox="0 0 1200 8" preserveAspectRatio="none" aria-hidden="true">
          <path
            d="M0 4 L30 1 L60 7 L90 2 L120 6 L150 1 L180 7 L210 3 L240 6 L270 1 L300 7 L330 2 L360 6 L390 1 L420 7 L450 3 L480 6 L510 1 L540 7 L570 2 L600 6 L630 1 L660 7 L690 3 L720 6 L750 1 L780 7 L810 2 L840 6 L870 1 L900 7 L930 3 L960 6 L990 1 L1020 7 L1050 2 L1080 6 L1110 1 L1140 7 L1170 3 L1200 6"
            stroke="rgba(245,158,11,0.6)"
            strokeWidth="0.8"
            fill="none"
          />
        </svg>
      </div>

      {/* Background watermark */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <span
          className="font-amiri absolute -bottom-10 left-1/2 -translate-x-1/2 text-[200px] sm:text-[300px] md:text-[400px] font-bold leading-none text-[var(--color-watermark)] select-none"
          aria-hidden="true"
        >
          المنى
        </span>
        <div className="absolute bottom-[-30%] left-[-10%] w-[500px] h-[500px] rounded-full bg-brand-accent/5 blur-[120px]" />
        <div className="absolute top-[-10%] right-[-5%] w-[300px] h-[300px] rounded-full bg-brand-gold/[0.03] blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 py-14 sm:py-16 md:py-20 lg:py-24">
        <div className="grid gap-10 sm:gap-12 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-5">
            <div className="mb-5 sm:mb-6 flex items-center gap-3 sm:gap-4">
              <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-accent to-brand-gold text-white shadow-lg">
                <span className="font-amiri text-xl sm:text-2xl font-bold">م</span>
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-lg sm:text-xl font-amiri font-bold text-[var(--color-text-primary)] tracking-wide">
                  مؤسسة المنى
                </span>
                <span className="text-[9px] sm:text-[10px] text-brand-gold tracking-[0.2em] sm:tracking-[0.25em] uppercase">
                  الإبداعية
                </span>
              </div>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-[var(--color-text-secondary)]">
              منصة أدبية وإبداعية عربية تحتفي بالكلمة الجميلة والفكر المستنير، وتقدّم محتوىً يجمع بين
              الأصالة والمعاصرة. نصوص، مقالات، وفعاليات تثري المشهد الثقافي.
            </p>
            <div className="geometric-divider my-6 mx-0" />
            <div className="flex gap-2 sm:gap-3">
              <a
                href="#"
                aria-label="فيسبوك"
                className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-text-secondary)] transition-all duration-700 hover:bg-brand-accent hover:text-white hover:border-brand-accent"
                style={{ transitionTimingFunction: PREMIUM_EASE }}
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="#"
                aria-label="تويتر"
                className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-text-secondary)] transition-all duration-700 hover:bg-brand-accent hover:text-white hover:border-brand-accent"
                style={{ transitionTimingFunction: PREMIUM_EASE }}
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="#"
                aria-label="انستغرام"
                className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-text-secondary)] transition-all duration-700 hover:bg-brand-accent hover:text-white hover:border-brand-accent"
                style={{ transitionTimingFunction: PREMIUM_EASE }}
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163C8.741 0 8.332.014 7.052.072 2.695.272.273 2.69.073 7.052.014 8.332 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.332 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.668-.072-4.948-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 md:col-start-7">
            <h3 className="mb-5 sm:mb-7 text-xs font-bold uppercase tracking-[0.25em] text-brand-gold">
              روابط سريعة
            </h3>
            <nav className="flex flex-col gap-3 sm:gap-3.5 text-sm">
              {[
                { href: "/archive", label: "الأرشيف" },
                { href: "/categories", label: "الأقسام" },
                { href: "/events", label: "الفعاليات" },
                { href: "/authors", label: "الكتّاب" },
              ].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="group/link text-[var(--color-text-secondary)] transition-all duration-700 flex items-center gap-2"
                  style={{ transitionTimingFunction: PREMIUM_EASE }}
                >
                  <span
                    className="w-0 h-px bg-brand-gold/50 transition-all duration-700 group-hover/link:w-4"
                    style={{ transitionTimingFunction: PREMIUM_EASE }}
                  />
                  <span className="transition-all duration-700 group-hover/link:text-brand-gold">{l.label}</span>
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div className="md:col-span-2">
            <h3 className="mb-5 sm:mb-7 text-xs font-bold uppercase tracking-[0.25em] text-brand-gold">
              تواصل
            </h3>
            <nav className="flex flex-col gap-3 sm:gap-3.5 text-sm">
              <Link
                href="/contact"
                className="group/link text-[var(--color-text-secondary)] transition-all duration-700 flex items-center gap-2"
                style={{ transitionTimingFunction: PREMIUM_EASE }}
              >
                <span
                  className="w-0 h-px bg-brand-gold/50 transition-all duration-700 group-hover/link:w-4"
                  style={{ transitionTimingFunction: PREMIUM_EASE }}
                />
                <span className="transition-all duration-700 group-hover/link:text-brand-gold">مراسلتنا</span>
              </Link>
              <a
                href="mailto:info@almuna.org"
                className="group/link text-[var(--color-text-secondary)] transition-all duration-700 flex items-center gap-2 break-all"
                style={{ transitionTimingFunction: PREMIUM_EASE }}
              >
                <span
                  className="w-0 h-px bg-brand-gold/50 transition-all duration-700 group-hover/link:w-4 flex-shrink-0"
                  style={{ transitionTimingFunction: PREMIUM_EASE }}
                />
                <span className="transition-all duration-700 group-hover/link:text-brand-gold text-xs">
                  info@almuna.org
                </span>
              </a>
            </nav>
          </div>
        </div>

        <div className="arabesque-band my-10 sm:my-12" />

        <div className="flex flex-col items-center justify-between gap-3 sm:gap-4 text-center text-xs text-[var(--color-text-tertiary)] md:flex-row font-medium tracking-wide">
          <p>© {new Date().getFullYear()} مؤسسة المنى الإبداعية. جميع الحقوق محفوظة.</p>
          <p>
            صُنع بـ <span className="text-brand-accent">♥</span> وإبداع | تطوير{" "}
            <span className="text-brand-gold/70 hover:text-brand-gold transition-colors duration-700">
              وسيم الزبيري
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
