import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "عن المؤسسة",
  description: "تعرف على مؤسسة المنى الإبداعية — رؤيتنا، رسالتنا، وقيمنا التي نؤمن بها",
};

const values = [
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    title: "إثراء المشهد الثقافي",
    desc: "نسعى لإثراء الساحة الأدبية والثقافية العربية عبر تقديم محتوى متميز يجمع بين الأصالة والمعاصرة.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    title: "دعم المواهب",
    desc: "نفتح أبوابنا للكتّاب والمبدعين العرب، ونوفر منصة لنشر إبداعاتهم والوصول إلى جمهور واسع.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    title: "تجديد الخطاب",
    desc: "نقدّم رؤى معاصرة تلامس قضايا العصر، وتجدد الخطاب الثقافي برؤية عميقة ومتجذرة.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    title: "حب الثقافة",
    desc: "نؤمن بأن الثقافة العربية غنية ومتنوعة، ونعمل على إبراز جمالها للعالم بأسلوب معاصر.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative min-h-[60vh] overflow-hidden pt-32">
        <div className="pointer-events-none absolute inset-0 bg-gradient-cinema" />
        <div className="pointer-events-none absolute inset-0">
          <div className="glow-blob glow-orange" style={{ width: 600, height: 600, top: "-15%", right: "-10%" }} />
          <div className="glow-blob glow-purple float-loop-delayed" style={{ width: 400, height: 400, bottom: "-10%", left: "-5%" }} />
        </div>
        <div className="noise-overlay" />

        <div className="relative z-10 mx-auto max-w-4xl px-4 pb-20 text-center">
          <span className="section-label">
            <span className="section-label-dot" />
            من نحن
          </span>
          <h1 className="font-amiri text-4xl font-bold text-white md:text-6xl lg:text-7xl">
            عن <span className="text-gradient-gold">مؤسسة المنى</span>
          </h1>
          <div className="section-divider mx-auto mt-6 w-24" />
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-white/60 md:text-xl">
            مؤسسة المنى الإبداعية هي منصة أدبية وثقافية عربية تهدف إلى إحياء التراث الأدبي العربي
            وتقديمه بروح معاصرة، وإتاحة مساحة للإبداع والتعبير للكتّاب والمبدعين من جميع أنحاء العالم العربي.
          </p>
        </div>
      </section>

      <section data-reveal className="relative border-t border-white/[0.06]">
        <div className="relative mx-auto max-w-6xl px-4 py-20">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="glass-card p-8 md:p-10">
              <h2 className="mb-4 text-2xl font-amiri font-bold text-white">رؤيتنا</h2>
              <p className="leading-relaxed text-white/60">
                أن نكون المنصة الرائدة في المشهد الثقافي العربي، حيث يلتقي الإبداع بالأصالة،
                وتجد الكلمة الجميلة بيتها الذي يليق بها. نطمح لبناء مجتمع قرائي مثقف يقدّر الأدب
                والفكر، ونسعى لأن يكون موقعنا وجهة لكل عاشق للغة العربية وآدابها.
              </p>
            </div>
            <div className="glass-card p-8 md:p-10">
              <h2 className="mb-4 text-2xl font-amiri font-bold text-white">رسالتنا</h2>
              <p className="leading-relaxed text-white/60">
                تقديم محتوى أدبي وثقافي متميز يثري الفكر ويحفز الإبداع، عبر منصة عصرية تجمع بين
                جمال التصميم وعمق المحتوى. نعمل على اكتشاف المواهب الأدبية ودعمها، وخلق مساحة
                للحوار الثقافي البناء.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section data-reveal className="relative border-t border-white/[0.06] bg-gradient-to-b from-transparent via-orange-500/[0.02] to-transparent">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="glow-blob glow-orange" style={{ width: 500, height: 500, top: "30%", left: "50%" }} />
        </div>
        <div className="relative mx-auto max-w-6xl px-4 py-20">
          <div className="mb-14 text-center">
            <span className="section-label">
              <span className="section-label-dot" />
              مبادئنا
            </span>
            <h2 className="font-amiri text-3xl font-bold text-white md:text-4xl">قيمنا</h2>
            <div className="section-divider mx-auto mt-4 w-20" />
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div key={v.title} className="glass-card p-6 text-center transition-all duration-500 hover:-translate-y-1">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500/20 to-amber-500/20 text-orange-400">
                  {v.icon}
                </div>
                <h3 className="mb-2 text-lg font-amiri font-bold text-white">{v.title}</h3>
                <p className="text-sm leading-relaxed text-white/50">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section data-reveal className="relative border-t border-white/[0.06]">
        <div className="relative mx-auto max-w-6xl px-4 py-20">
          <div className="text-center">
            <span className="section-label">
              <span className="section-label-dot" />
              تواصل
            </span>
            <h2 className="font-amiri text-3xl font-bold text-white md:text-4xl">هل لديك استفسار؟</h2>
            <div className="section-divider mx-auto mt-4 w-20" />
            <p className="mx-auto mt-6 max-w-xl text-white/50">
              نحن دائماً هنا للإستماع إليك. لا تتردد في التواصل معنا لأي استفسار أو اقتراح.
            </p>
            <div className="mt-10 flex items-center justify-center gap-4">
              <Link href="/contact" className="btn-primary">
                تواصل معنا
              </Link>
              <a href="mailto:info@almuna.org" className="btn-secondary">
                info@almuna.org
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
