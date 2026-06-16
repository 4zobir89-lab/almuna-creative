"use client";

import { motion } from "framer-motion";
import {
  Instagram,
  Twitter,
  Youtube,
  Mail,
  ArrowUp,
  Camera,
} from "lucide-react";

const quickLinks = [
  { label: "الرئيسية", href: "#hero" },
  { label: "عن المصور", href: "#about" },
  { label: "الأعمال", href: "#portfolio" },
  { label: "المشاريع", href: "#featured" },
  { label: "الخدمات", href: "#services" },
];

const serviceLinks = [
  { label: "تصوير الأعراس", href: "#services" },
  { label: "بورتريه شخصي", href: "#services" },
  { label: "تصوير تجاري", href: "#services" },
  { label: "مشاريع فنية", href: "#services" },
];

export function Footer() {
  const go = (href: string) =>
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });

  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative bg-[#08070a] border-t border-[#d4a056]/10 pt-20 pb-8 px-5 sm:px-8 overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-[#d4a056]/3 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* Top: CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="border-y border-[#d4a056]/15 py-10 mb-12 text-center"
        >
          <p className="font-amiri text-2xl sm:text-3xl lg:text-4xl text-[#f0e6d2] mb-3">
            لديك قصة تستحق أن تُصوَّر؟
          </p>
          <p className="text-[#bfb5a2] text-sm font-tajawal mb-6">
            لنبدأ الحديث عن مشروعك القادم
          </p>
          <button
            onClick={() => go("#contact")}
            className="group inline-flex items-center gap-2 bg-[#d4a056] text-[#08070a] px-7 py-3.5 font-tajawal font-semibold text-sm hover:shadow-[0_0_30px_rgba(212,160,86,0.4)] transition-all duration-500"
          >
            احجز جلسة استشارية مجانية
            <span className="inline-block transition-transform group-hover:-translate-x-1">←</span>
          </button>
        </motion.div>

        {/* Middle: columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <button onClick={() => go("#hero")} className="group flex items-center gap-3 mb-5">
              <Camera className="w-5 h-5 text-[#d4a056] group-hover:rotate-12 transition-transform" />
              <div>
                <div className="font-cairo font-bold text-base text-[#f0e6d2] tracking-wider">
                  KARIM MANSOUR
                </div>
                <div className="text-[10px] tracking-[0.3em] text-[#d4a056]/70">
                  PHOTOGRAPHY
                </div>
              </div>
            </button>
            <p className="text-[#bfb5a2] text-sm font-tajawal leading-relaxed mb-5">
              مصور فوتوغرافي سينمائي مقيم في إسطنبول. أصوّر القصص بالضوء والظل
              منذ عام ٢٠١٣.
            </p>
            <div className="flex items-center gap-3">
              {[
                { Icon: Instagram, href: "#" },
                { Icon: Twitter, href: "#" },
                { Icon: Youtube, href: "#" },
                { Icon: Mail, href: "#" },
              ].map(({ Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="w-9 h-9 border border-[#d4a056]/20 flex items-center justify-center text-[#bfb5a2] hover:text-[#d4a056] hover:border-[#d4a056]/50 hover:bg-[#d4a056]/5 transition-all duration-300"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-[11px] tracking-[0.3em] text-[#d4a056] uppercase mb-5 font-medium">
              روابط سريعة
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <button
                    onClick={() => go(l.href)}
                    className="text-sm text-[#bfb5a2] hover:text-[#f0e6d2] font-tajawal transition-colors"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-[11px] tracking-[0.3em] text-[#d4a056] uppercase mb-5 font-medium">
              الخدمات
            </h4>
            <ul className="space-y-3">
              {serviceLinks.map((l) => (
                <li key={l.label}>
                  <button
                    onClick={() => go(l.href)}
                    className="text-sm text-[#bfb5a2] hover:text-[#f0e6d2] font-tajawal transition-colors"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-span-2 md:col-span-1">
            <h4 className="text-[11px] tracking-[0.3em] text-[#d4a056] uppercase mb-5 font-medium">
              النشرة البريدية
            </h4>
            <p className="text-sm text-[#bfb5a2] font-tajawal mb-4 leading-relaxed">
              اشترك لتصلك أحدث المشاريع والعروض الحصرية.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex border border-[#d4a056]/20"
            >
              <input
                type="email"
                placeholder="بريدك الإلكتروني"
                dir="rtl"
                className="flex-1 bg-transparent px-3 py-2.5 text-sm text-[#f0e6d2] font-tajawal placeholder:text-[#bfb5a2]/30 focus:outline-none"
              />
              <button
                type="submit"
                className="bg-[#d4a056] text-[#08070a] px-4 hover:bg-[#f0d090] transition-colors"
                aria-label="اشترك"
              >
                ←
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-[#d4a056]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#bfb5a2]/60 font-tajawal text-center sm:text-right">
            © ٢٠٢٤ كريم منصور للتصوير الفوتوغرافي · جميع الحقوق محفوظة
          </p>
          <div className="flex items-center gap-4 text-xs text-[#bfb5a2]/60 font-tajawal">
            <a href="#" className="hover:text-[#d4a056] transition-colors">
              سياسة الخصوصية
            </a>
            <span>·</span>
            <a href="#" className="hover:text-[#d4a056] transition-colors">
              الشروط والأحكام
            </a>
          </div>
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-xs text-[#bfb5a2] hover:text-[#d4a056] font-tajawal transition-colors"
          >
            العودة للأعلى
            <span className="w-7 h-7 border border-[#d4a056]/20 flex items-center justify-center group-hover:border-[#d4a056]/50 group-hover:bg-[#d4a056]/5 transition-all">
              <ArrowUp className="w-3.5 h-3.5" />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}
