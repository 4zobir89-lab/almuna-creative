import { ContactForm } from "@/components/public/contact-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "تواصل معنا",
  description: "تواصل مع مؤسسة المنى الإبداعية — نرحب باستفساراتكم ومشاركاتكم الأدبية",
};

export default function ContactPage() {
  return (
    <>
      <section className="relative min-h-[40vh] overflow-hidden pt-32">
        <div className="pointer-events-none absolute inset-0 bg-gradient-cinema" />
        <div className="pointer-events-none absolute inset-0">
          <div className="glow-blob glow-orange" style={{ width: 450, height: 450, top: "-15%", right: "-5%" }} />
          <div className="glow-blob glow-amber float-loop-delayed" style={{ width: 300, height: 300, bottom: "10%", left: "-5%" }} />
        </div>
        <div className="noise-overlay" />
        <div className="relative z-10 mx-auto max-w-2xl px-4 pb-16 text-center">
          <span className="section-label">
            <span className="section-label-dot" />
            نسمعك
          </span>
          <h1 className="font-amiri text-4xl font-bold text-white md:text-6xl">تواصل معنا</h1>
          <div className="section-divider mx-auto mt-4 w-20" />
          <p className="mx-auto mt-6 max-w-xl text-white/50">
            نرحب باستفساراتكم واقتراحاتكم ومشاركاتكم الأدبية
          </p>
        </div>
      </section>

      <section data-reveal className="relative border-t border-white/[0.06]">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="glow-blob glow-purple" style={{ width: 350, height: 350, top: "20%", right: "-8%" }} />
        </div>
        <div className="relative mx-auto max-w-2xl px-4 py-16">
          <div className="glass-card p-8">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
