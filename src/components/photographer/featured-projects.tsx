"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "ضياء الصحراء",
    subtitle: "مشروع فني شخصي",
    description:
      "رحلة استمرت ثلاثة أسابيع في أعماق الصحراء الكبرى، حيث التقطت لقاء الضوء القاسي مع الرمال الذهبية عند الغروب. المشروع يحتوي على ٤٢ صورة تم عرضها في معرض فردي ببرلين.",
    image:
      "https://images.unsplash.com/photo-1542401886-65d6c61db217?q=80&w=1600&auto=format&fit=crop",
    location: "الصحراء الكبرى",
    year: "2024",
    tags: ["فن", "طبيعة", "ألوان دافئة"],
    shots: "42",
  },
  {
    id: 2,
    title: "وجوه المدينة القديمة",
    subtitle: "سلسلة بورتريه",
    description:
      "ثلاثون وجهاً من حي «البليدة» العتيق. كل وجه يحمل خريطة زمن، وكل تجعيدة تحكي حكاية لم تُروَ. استخدمت الضوء الطبيعي المتسرب من نوافذ البيوت التقليدية فقط.",
    image:
      "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?q=80&w=1600&auto=format&fit=crop",
    location: "فاس، المغرب",
    year: "2023",
    tags: ["بورتريه", "توثيقي", "ثقافة"],
    shots: "30",
  },
  {
    id: 3,
    title: "حفل ليلى وعمر",
    subtitle: "تصوير حفل زفاف",
    description:
      "حفل زفاف امتد على يومين في قصر تاريخي بمراكش. حاولت التقاط التفاصيل الصغيرة - يد تمسك يد، نظرة أم قبل الفراق، ضحكة طفل بين الزحام. كل ذلك بالضوء الطبيعي.",
    image:
      "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=1600&auto=format&fit=crop",
    location: "مراكش",
    year: "2024",
    tags: ["عرس", "توثيقي", "تفاصيل"],
    shots: "180",
  },
];

export function FeaturedProjects() {
  const [active, setActive] = useState(0);
  const project = projects[active];

  return (
    <section
      id="featured"
      className="relative py-28 sm:py-36 px-5 sm:px-8 overflow-hidden"
    >
      {/* Background ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] rounded-full bg-[#c4633e]/5 blur-[120px]" />
        <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-[#d4a056]/5 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 mb-5">
            <span className="h-px w-12 bg-[#d4a056]" />
            <span className="text-[11px] tracking-[0.4em] text-[#d4a056] uppercase font-medium">
              مشاريع مميزة
            </span>
            <span className="h-px w-12 bg-[#d4a056]" />
          </div>
          <h2
            className="font-amiri text-4xl sm:text-5xl lg:text-6xl text-[#f0e6d2] leading-tight"
            dir="rtl"
          >
            قصص <span className="text-gold-gradient">مصوّرة</span>
          </h2>
        </motion.div>

        {/* Project tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {projects.map((p, i) => (
            <button
              key={p.id}
              onClick={() => setActive(i)}
              className={`px-5 py-2.5 text-sm font-tajawal tracking-wide transition-all duration-300 border ${
                active === i
                  ? "border-[#d4a056] bg-[#d4a056]/10 text-[#f0e6d2]"
                  : "border-[#d4a056]/15 text-[#bfb5a2] hover:border-[#d4a056]/40 hover:text-[#f0e6d2]"
              }`}
            >
              <span className="text-[#d4a056]/60 text-xs ml-2">
                {String(i + 1).padStart(2, "0")}
              </span>
              {p.title}
            </button>
          ))}
        </div>

        {/* Featured project display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch"
          >
            {/* Image */}
            <div className="lg:col-span-7 relative">
              <div className="relative aspect-[4/3] overflow-hidden group">
                <img
                  src={project.image}
                  alt={project.title}
                  className="absolute inset-0 w-full h-full object-cover img-cinematic transition-transform duration-[2s] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute inset-3 border border-[#d4a056]/20" />

                {/* Top overlay info */}
                <div className="absolute top-5 right-5 flex items-center gap-3">
                  <span className="px-3 py-1 bg-black/60 backdrop-blur-sm border border-[#d4a056]/30 text-[10px] tracking-[0.3em] text-[#d4a056] uppercase">
                    {project.shots} لقطة
                  </span>
                  <span className="px-3 py-1 bg-black/60 backdrop-blur-sm border border-[#d4a056]/30 text-[10px] tracking-[0.3em] text-[#f0e6d2]">
                    {project.year}
                  </span>
                </div>
              </div>

              {/* Side film strip */}
              <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 bg-[#0a0809] border border-[#d4a056]/20 px-3 py-2 text-[9px] tracking-[0.3em] text-[#d4a056]/60 uppercase">
                FRAME · {String(active + 1).padStart(2, "0")}
              </div>
            </div>

            {/* Content */}
            <div className="lg:col-span-5 flex flex-col justify-between bg-[#0c0a0e] border border-[#d4a056]/15 p-8 lg:p-10">
              <div>
                <div className="text-[11px] tracking-[0.3em] text-[#d4a056] uppercase mb-3">
                  {project.subtitle}
                </div>
                <h3
                  className="font-amiri text-3xl sm:text-4xl text-[#f0e6d2] leading-tight mb-6"
                  dir="rtl"
                >
                  {project.title}
                </h3>

                <div className="flex items-center gap-4 text-xs text-[#bfb5a2] mb-6 font-tajawal">
                  <span className="flex items-center gap-2">
                    <span className="w-1 h-1 bg-[#d4a056] rounded-full" />
                    {project.location}
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="w-1 h-1 bg-[#d4a056] rounded-full" />
                    {project.year}
                  </span>
                </div>

                <p className="text-[#bfb5a2] text-base leading-loose font-tajawal mb-8">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-[11px] tracking-wider text-[#bfb5a2] border border-[#d4a056]/15 hover:border-[#d4a056]/40 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={() =>
                  document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })
                }
                className="group flex items-center gap-2 text-[#d4a056] hover:text-[#f0e6d2] transition-colors text-sm font-tajawal tracking-wide w-fit"
              >
                <span className="border-b border-[#d4a056]/40 group-hover:border-[#f0e6d2] pb-1">
                  اطلب مشروعاً مماثلاً
                </span>
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Pagination dots */}
        <div className="flex items-center justify-center gap-2 mt-12">
          {projects.map((p, i) => (
            <button
              key={p.id}
              onClick={() => setActive(i)}
              className={`h-1 transition-all duration-500 ${
                active === i ? "w-12 bg-[#d4a056]" : "w-6 bg-[#d4a056]/20 hover:bg-[#d4a056]/40"
              }`}
              aria-label={`مشروع ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
