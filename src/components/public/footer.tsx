"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Mail,
  MapPin,
  Phone,
  Clock,
  ArrowUp,
  Heart,
} from "lucide-react";
import { LiveClock } from "@/components/public/live-clock";

const quickLinks = [
  { href: "/archive", label: "الأرشيف" },
  { href: "/categories", label: "الأقسام" },
  { href: "/events", label: "الفعاليات" },
  { href: "/authors", label: "الكتّاب" },
  { href: "/magazine", label: "المجلة" },
  { href: "/about", label: "عن المؤسسة" },
];

const contactInfo = [
  { Icon: Mail, label: "البريد", value: "info@almuna.org", href: "mailto:info@almuna.org" },
  { Icon: Phone, label: "الهاتف", value: "+967 1 234 567", href: "tel:+9671234567" },
  { Icon: MapPin, label: "العنوان", value: "عدن، اليمن", href: "#" },
  { Icon: Clock, label: "الدوام", value: "الأحد - الخميس · ٩ص - ٥م", href: "#" },
];

export function Footer() {
  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="relative bg-[var(--footer-bg-from)] border-t border-[var(--color-border)]">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 py-16">
        <div className="grid gap-10 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="relative w-9 h-9 rounded-md overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logo-almuna-small.png"
                  alt="شعار مؤسسة المنى الإبداعية"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="font-amiri text-lg font-bold text-[var(--color-text-primary)]">
                المنى
              </span>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-[var(--color-text-secondary)]">
              منصة أدبية وإبداعية عربية تحتفي بالكلمة الجميلة والفكر المستنير،
              وتقدّم محتوىً يجمع بين الأصالة والمعاصرة.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 md:col-start-7">
            <h3 className="mb-4 text-xs font-medium uppercase tracking-[0.15em] text-[var(--color-text-tertiary)]">
              روابط سريعة
            </h3>
            <nav className="flex flex-col gap-2.5 text-sm">
              {quickLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="text-[var(--color-text-secondary)] hover:text-[var(--accent)] transition-colors w-fit"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div className="md:col-span-4">
            <h3 className="mb-4 text-xs font-medium uppercase tracking-[0.15em] text-[var(--color-text-tertiary)]">
              تواصل معنا
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {contactInfo.map((info, i) => (
                <a key={i} href={info.href} className="group">
                  <div className="flex items-center gap-1.5 mb-1">
                    <info.Icon className="w-3 h-3 text-[var(--accent)]" />
                    <span className="text-[10px] uppercase tracking-wider text-[var(--color-text-tertiary)]">
                      {info.label}
                    </span>
                  </div>
                  <div
                    className="text-xs text-[var(--color-text-primary)] group-hover:text-[var(--accent)] transition-colors break-all"
                    dir={info.label === "البريد" || info.label === "الهاتف" ? "ltr" : "rtl"}
                    style={{ textAlign: "right" }}
                  >
                    {info.value}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-[var(--color-border)]">
          {/* Live clock */}
          <div className="flex justify-center mb-6">
            <LiveClock />
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--color-text-tertiary)]">
            <p>© {new Date().getFullYear()} مؤسسة المنى الإبداعية. جميع الحقوق محفوظة.</p>

            <p className="flex items-center gap-1.5">
              صُنع بـ
              <Heart className="w-3 h-3 text-[var(--accent)] fill-[var(--accent)]" />
              تصميم وبرمجة
              <span className="relative inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-[var(--doppel-bg)] border border-[var(--color-border)]">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[var(--accent)]" />
                </span>
                <span className="font-medium text-[var(--color-text-primary)]">وسيم الزبيري</span>
              </span>
            </p>

            <motion.button
              onClick={scrollToTop}
              whileTap={{ scale: 0.95 }}
              className="group flex items-center gap-2 hover:text-[var(--accent)] transition-colors"
              aria-label="العودة للأعلى"
            >
              <span>العودة للأعلى</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
}
