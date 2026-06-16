"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Instagram,
  Send,
  Clock,
  CheckCircle2,
} from "lucide-react";

const contactInfo = [
  {
    icon: Mail,
    label: "البريد الإلكتروني",
    value: "karim@mansour.studio",
    href: "mailto:karim@mansour.studio",
  },
  {
    icon: Phone,
    label: "الهاتف / واتساب",
    value: "+90 532 414 88 90",
    href: "tel:+905324148890",
  },
  {
    icon: MapPin,
    label: "الموقع",
    value: "إسطنبول، تركيا",
    href: "#",
  },
  {
    icon: Clock,
    label: "ساعات العمل",
    value: "الأحد - الخميس · ٩ص - ٧م",
    href: "#",
  },
];

const projectTypes = ["عرس", "بورتريه", "تجاري", "مشروع فني", "أخرى"];

export function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    type: "عرس",
    date: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm({
        name: "",
        email: "",
        phone: "",
        type: "عرس",
        date: "",
        message: "",
      });
    }, 4000);
  };

  return (
    <section
      id="contact"
      className="relative py-28 sm:py-36 px-5 sm:px-8 bg-[#0a0809]"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left side - info */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-12 bg-[#d4a056]" />
              <span className="text-[11px] tracking-[0.4em] text-[#d4a056] uppercase font-medium">
                تواصل معي
              </span>
            </div>

            <h2
              className="font-amiri text-4xl sm:text-5xl lg:text-6xl text-[#f0e6d2] leading-tight mb-6"
              dir="rtl"
            >
              لنصنع
              <br />
              <span className="text-gold-gradient">شيئاً جميلاً</span>
            </h2>

            <p className="text-[#bfb5a2] text-base leading-loose font-tajawal mb-10">
              سواء كنت تخطط لعرسك، تحتاج صوراً لعلامتك التجارية، أو لديك فكرة
              مشروع فني، أنا هنا للاستماع. عادةً أرد خلال ٢٤ ساعة. أخبرني عن
              رؤيتك ودعنا نحولها إلى صور تستحق أن تُذكر.
            </p>

            {/* Contact list */}
            <div className="space-y-4 mb-10">
              {contactInfo.map((c, i) => (
                <a
                  key={i}
                  href={c.href}
                  className="flex items-center gap-4 group"
                >
                  <div className="w-10 h-10 flex-shrink-0 border border-[#d4a056]/20 flex items-center justify-center group-hover:border-[#d4a056]/60 group-hover:bg-[#d4a056]/5 transition-all duration-300">
                    <c.icon className="w-4 h-4 text-[#d4a056]" />
                  </div>
                  <div>
                    <div className="text-[10px] tracking-[0.2em] text-[#bfb5a2]/60 uppercase">
                      {c.label}
                    </div>
                    <div className="text-sm text-[#f0e6d2] font-tajawal group-hover:text-[#d4a056] transition-colors">
                      {c.value}
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* Instagram CTA */}
            <a
              href="#"
              className="inline-flex items-center gap-3 text-[#bfb5a2] hover:text-[#d4a056] transition-colors text-sm font-tajawal"
            >
              <Instagram className="w-5 h-5" />
              <span>@karim.mansour.studio</span>
              <span className="text-[#d4a056]/40">·</span>
              <span className="text-xs">٤٢ ألف متابع</span>
            </a>
          </motion.div>

          {/* Right side - form */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <div className="relative bg-[#0c0a0e] border border-[#d4a056]/15 p-7 sm:p-10">
              {/* Corner markers */}
              <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-[#d4a056]/40" />
              <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-[#d4a056]/40" />
              <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-[#d4a056]/40" />
              <div className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-[#d4a056]/40" />

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] tracking-[0.2em] text-[#bfb5a2] uppercase mb-2 font-tajawal">
                      الاسم الكامل *
                    </label>
                    <input
                      required
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="اكتب اسمك"
                      className="w-full bg-transparent border border-[#d4a056]/20 px-4 py-3 text-[#f0e6d2] text-sm font-tajawal placeholder:text-[#bfb5a2]/30 focus:border-[#d4a056]/60 focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] tracking-[0.2em] text-[#bfb5a2] uppercase mb-2 font-tajawal">
                      البريد الإلكتروني *
                    </label>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="example@email.com"
                      dir="ltr"
                      className="w-full bg-transparent border border-[#d4a056]/20 px-4 py-3 text-[#f0e6d2] text-sm font-tajawal placeholder:text-[#bfb5a2]/30 focus:border-[#d4a056]/60 focus:outline-none transition-colors text-right"
                    />
                  </div>
                </div>

                {/* Phone + Date */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] tracking-[0.2em] text-[#bfb5a2] uppercase mb-2 font-tajawal">
                      رقم الهاتف
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+90 5XX XXX XX XX"
                      dir="ltr"
                      className="w-full bg-transparent border border-[#d4a056]/20 px-4 py-3 text-[#f0e6d2] text-sm font-tajawal placeholder:text-[#bfb5a2]/30 focus:border-[#d4a056]/60 focus:outline-none transition-colors text-right"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] tracking-[0.2em] text-[#bfb5a2] uppercase mb-2 font-tajawal">
                      التاريخ المقترح
                    </label>
                    <input
                      type="date"
                      value={form.date}
                      onChange={(e) => setForm({ ...form, date: e.target.value })}
                      className="w-full bg-transparent border border-[#d4a056]/20 px-4 py-3 text-[#f0e6d2] text-sm font-tajawal focus:border-[#d4a056]/60 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Project type */}
                <div>
                  <label className="block text-[11px] tracking-[0.2em] text-[#bfb5a2] uppercase mb-3 font-tajawal">
                    نوع المشروع
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {projectTypes.map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setForm({ ...form, type })}
                        className={`px-4 py-2 text-sm font-tajawal transition-all duration-300 border ${
                          form.type === type
                            ? "border-[#d4a056] bg-[#d4a056]/10 text-[#f0e6d2]"
                            : "border-[#d4a056]/15 text-[#bfb5a2] hover:border-[#d4a056]/40"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-[11px] tracking-[0.2em] text-[#bfb5a2] uppercase mb-2 font-tajawal">
                    تفاصيل المشروع *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="أخبرني عن مشروعك، رؤيتك، والميزانية المتوقعة..."
                    className="w-full bg-transparent border border-[#d4a056]/20 px-4 py-3 text-[#f0e6d2] text-sm font-tajawal placeholder:text-[#bfb5a2]/30 focus:border-[#d4a056]/60 focus:outline-none transition-colors resize-none"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={submitted}
                  className="group relative w-full overflow-hidden bg-[#d4a056] text-[#08070a] py-4 font-tajawal font-semibold tracking-wide text-sm hover:shadow-[0_0_40px_rgba(212,160,86,0.4)] transition-all duration-500 disabled:opacity-70"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {submitted ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        تم استلام رسالتك بنجاح
                      </>
                    ) : (
                      <>
                        إرسال الطلب
                        <Send className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                      </>
                    )}
                  </span>
                </button>

                <p className="text-center text-xs text-[#bfb5a2]/60 font-tajawal">
                  بالضغط على إرسال، أنت توافق على سياسة الخصوصية
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
