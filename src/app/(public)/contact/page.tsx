import { ContactForm } from "@/components/public/contact-form";
import type { Metadata } from "next";
import { Mail, MapPin, Phone, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "تواصل معنا",
  description: "تواصل مع مؤسسة المنى الإبداعية — نرحب باستفساراتكم ومشاركاتكم الأدبية",
};

const contactInfo = [
  { icon: Mail, label: "البريد الإلكتروني", value: "info@almuna.org" },
  { icon: Phone, label: "الهاتف", value: "+967 1 234 567" },
  { icon: MapPin, label: "العنوان", value: "عدن، اليمن" },
  { icon: Clock, label: "ساعات العمل", value: "الأحد - الخميس · ٩ص - ٥م" },
];

export default function ContactPage() {
  return (
    <>
      <section className="relative min-h-[40vh] overflow-hidden pt-20 sm:pt-24">
        <div className="pointer-events-none absolute inset-0 bg-gradient-cinema" />
        <div className="pointer-events-none absolute inset-0">
          <div
            className="glow-blob glow-orange"
            style={{ width: 450, height: 450, top: "-15%", right: "-5%" }}
          />
          <div
            className="glow-blob glow-purple float-loop-delayed"
            style={{ width: 300, height: 300, bottom: "10%", left: "-5%" }}
          />
        </div>
        <div className="noise-overlay" />
        <div className="relative z-10 mx-auto max-w-2xl px-4 sm:px-6 pb-12 sm:pb-16 text-center">
          <span className="section-label">
            <span className="section-label-dot" />
            نسمعك
          </span>
          <h1 className="font-amiri text-4xl sm:text-5xl md:text-6xl font-bold text-[var(--color-text-primary)]">
            تواصل معنا
          </h1>
          <div className="section-divider mx-auto mt-4 w-20" />
          <p className="mx-auto mt-4 sm:mt-6 max-w-xl text-sm sm:text-base text-[var(--color-text-secondary)]">
            نرحب باستفساراتكم واقتراحاتكم ومشاركاتكم الأدبية
          </p>
        </div>
      </section>

      <section data-reveal className="relative border-t border-[var(--color-border)]">
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 py-10 sm:py-14 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-8">
            {/* Form */}
            <div className="lg:col-span-3 glass-card p-6 sm:p-8 rounded-2xl">
              <h2 className="mb-5 sm:mb-6 text-xl sm:text-2xl font-amiri font-bold text-[var(--color-text-primary)]">
                أرسل لنا رسالة
              </h2>
              <ContactForm />
            </div>

            {/* Contact info */}
            <div className="lg:col-span-2 space-y-3 sm:space-y-4">
              {contactInfo.map((info) => (
                <div
                  key={info.label}
                  className="glass-card p-5 rounded-2xl flex items-start gap-3 sm:gap-4"
                >
                  <div className="flex-shrink-0 flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand-accent/20 to-brand-gold/20 text-brand-gold">
                    <info.icon className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] sm:text-xs tracking-[0.2em] uppercase text-[var(--color-text-tertiary)] mb-1">
                      {info.label}
                    </div>
                    <div
                      className="text-sm sm:text-base text-[var(--color-text-primary)] break-all"
                      dir={info.label === "البريد الإلكتروني" || info.label === "الهاتف" ? "ltr" : "rtl"}
                      style={{ textAlign: "right" }}
                    >
                      {info.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
