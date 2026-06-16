import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, Users, Lightbulb, Heart } from "lucide-react";

export const metadata: Metadata = {
  title: "عن المؤسسة",
  description: "تعرف على مؤسسة المنى الإبداعية — رؤيتنا، رسالتنا، وقيمنا التي نؤمن بها",
};

const values = [
  {
    icon: BookOpen,
    title: "إثراء المشهد الثقافي",
    desc: "نسعى لإثراء الساحة الأدبية والثقافية العربية عبر تقديم محتوى متميز يجمع بين الأصالة والمعاصرة.",
  },
  {
    icon: Users,
    title: "دعم المواهب",
    desc: "نفتح أبوابنا للكتّاب والمبدعين العرب، ونوفر منصة لنشر إبداعاتهم والوصول إلى جمهور واسع.",
  },
  {
    icon: Lightbulb,
    title: "تجديد الخطاب",
    desc: "نقدّم رؤى معاصرة تلامس قضايا العصر، وتجدد الخطاب الثقافي برؤية عميقة ومتجذرة.",
  },
  {
    icon: Heart,
    title: "حب الثقافة",
    desc: "نؤمن بأن الثقافة العربية غنية ومتنوعة، ونعمل على إبراز جمالها للعالم بأسلوب معاصر.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative min-h-[60vh] overflow-hidden pt-20 sm:pt-24">
        <div className="pointer-events-none absolute inset-0 bg-gradient-cinema" />
        <div className="pointer-events-none absolute inset-0">
          <div
            className="glow-blob glow-orange"
            style={{ width: 600, height: 600, top: "-15%", right: "-10%" }}
          />
          <div
            className="glow-blob glow-purple float-loop-delayed"
            style={{ width: 400, height: 400, bottom: "-10%", left: "-5%" }}
          />
        </div>
        <div className="noise-overlay" />

        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 pb-16 sm:pb-20 text-center">
          <span className="section-label">
            <span className="section-label-dot" />
            من نحن
          </span>
          <h1 className="font-amiri text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[var(--color-text-primary)]">
            عن <span className="text-gradient-gold">مؤسسة المنى</span>
          </h1>
          <div className="section-divider mx-auto mt-4 sm:mt-6 w-24" />
          <p className="mx-auto mt-6 sm:mt-8 max-w-2xl text-base sm:text-lg md:text-xl leading-relaxed text-[var(--color-text-secondary)]">
            مؤسسة المنى الإبداعية هي منصة أدبية وثقافية عربية تهدف إلى إحياء التراث الأدبي العربي
            وتقديمه بروح معاصرة، وإتاحة مساحة للإبداع والتعبير للكتّاب والمبدعين من جميع أنحاء العالم العربي.
          </p>
        </div>
      </section>

      <section data-reveal className="relative border-t border-[var(--color-border)]">
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 py-12 sm:py-16 md:py-20">
          <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
            <div className="glass-card p-6 sm:p-8 md:p-10 rounded-2xl">
              <h2 className="mb-3 sm:mb-4 text-xl sm:text-2xl font-amiri font-bold text-[var(--color-text-primary)]">
                رؤيتنا
              </h2>
              <p className="text-sm sm:text-base leading-relaxed text-[var(--color-text-secondary)]">
                أن نكون المنصة الرائدة في المشهد الثقافي العربي، حيث يلتقي الإبداع بالأصالة،
                وتجد الكلمة الجميلة بيتها الذي يليق بها. نطمح لبناء مجتمع قرائي مثقف يقدّر الأدب
                والفكر، ونسعى لأن يكون موقعنا وجهة لكل عاشق للغة العربية وآدابها.
              </p>
            </div>
            <div className="glass-card p-6 sm:p-8 md:p-10 rounded-2xl">
              <h2 className="mb-3 sm:mb-4 text-xl sm:text-2xl font-amiri font-bold text-[var(--color-text-primary)]">
                رسالتنا
              </h2>
              <p className="text-sm sm:text-base leading-relaxed text-[var(--color-text-secondary)]">
                تقديم محتوى أدبي وثقافي متميز يثري الفكر ويحفز الإبداع، عبر منصة عصرية تجمع بين
                جمال التصميم وعمق المحتوى. نعمل على اكتشاف المواهب الأدبية ودعمها، وخلق مساحة
                للحوار الثقافي البناء.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        data-reveal
        className="relative border-t border-[var(--color-border)] bg-gradient-to-b from-transparent via-brand-gold/[0.02] to-transparent"
      >
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 py-12 sm:py-16 md:py-20">
          <div className="mb-10 sm:mb-14 text-center">
            <span className="section-label">
              <span className="section-label-dot" />
              مبادئنا
            </span>
            <h2 className="font-amiri text-3xl sm:text-4xl font-bold text-[var(--color-text-primary)]">
              قيمنا
            </h2>
            <div className="section-divider mx-auto mt-4 w-20" />
          </div>
          <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div
                key={v.title}
                className="glass-card p-5 sm:p-6 text-center transition-all duration-500 hover:-translate-y-1 rounded-2xl"
              >
                <div className="mx-auto mb-3 sm:mb-4 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-accent/20 to-brand-gold/20 text-brand-gold">
                  <v.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <h3 className="mb-2 text-base sm:text-lg font-amiri font-bold text-[var(--color-text-primary)]">
                  {v.title}
                </h3>
                <p className="text-xs sm:text-sm leading-relaxed text-[var(--color-text-secondary)]">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section data-reveal className="relative border-t border-[var(--color-border)]">
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 py-12 sm:py-16 md:py-20">
          <div className="text-center">
            <span className="section-label">
              <span className="section-label-dot" />
              تواصل
            </span>
            <h2 className="font-amiri text-3xl sm:text-4xl font-bold text-[var(--color-text-primary)]">
              هل لديك استفسار؟
            </h2>
            <div className="section-divider mx-auto mt-4 w-20" />
            <p className="mx-auto mt-4 sm:mt-6 max-w-xl text-sm sm:text-base text-[var(--color-text-secondary)]">
              نحن دائماً هنا للإستماع إليك. لا تتردد في التواصل معنا لأي استفسار أو اقتراح.
            </p>
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-6 sm:px-8 py-3 rounded-full bg-brand-accent text-white text-sm font-bold tracking-wider hover:bg-brand-gold hover:text-[#1C1917] transition-all w-full sm:w-auto"
              >
                تواصل معنا
              </Link>
              <a
                href="mailto:info@almuna.org"
                className="inline-flex items-center justify-center px-6 sm:px-8 py-3 rounded-full border border-[var(--color-border)] text-[var(--color-text-primary)] text-sm font-bold tracking-wider hover:border-brand-gold hover:text-brand-gold transition-all w-full sm:w-auto"
              >
                info@almuna.org
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
