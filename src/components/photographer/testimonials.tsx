"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    name: "ليلى أحمد",
    role: "عروس - يونيو 2024",
    avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=400&auto=format&fit=crop",
    quote:
      "كريم لم يكن مجرد مصور في عرسنا، بل كان جزءاً من القصة. صورنا تبدو وكأنها لقطات من فيلم روائي طويل. كل مرة نتصفح فيها الألبوم نكتشف تفصيلاً جديداً لم ننتبه له في يوم الزفاف. شكراً له على هذه الذاكرة الخالدة.",
    rating: 5,
  },
  {
    name: "عمر بن صالح",
    role: "رائد أعمال - مارس 2024",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
    quote:
      "احتجت صوراً بروفايلية احترافية لموقع شركتي الجديد. ما حصلت عليه تجاوز توقعاتي بكثير. كريم فهم رؤيتي من أول اجتماع، وأخرج صوراً تعكس الشخصية التي أريد أن يراها عملائي. أنصح به بشدة لأي رجل أعمال جاد.",
    rating: 5,
  },
  {
    name: "Sophia Laurent",
    role: "مديرة إبداعية - Vogue Arabia",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop",
    quote:
      "تعاملت مع مصورين كثر في مسيرتي، لكن نظرة كريم مختلفة فعلاً. يفهم الضوء بطريقة لا يفهمها كثيرون. الحملة التي صوّرها لنا في دبي حصلت على إشادة واسعة وفازت بجائزة. سنعمل معه مجدداً بالتأكيد.",
    rating: 5,
  },
  {
    name: "خالد المنصوري",
    role: "مدير تسويق - دبي",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop",
    quote:
      "احترافية نادرة. من الرد السريع على الاستفسارات، إلى تسليم المشروع قبل الموعد بيومين، إلى جودة الصور التي فاقت توقعاتنا. كريم رفع مستوى العلامة التجارية لدينا بصرياً. شراكة تستحق كل ريال استثمرناه.",
    rating: 5,
  },
];

export function Testimonials() {
  const [active, setActive] = useState(0);
  const t = testimonials[active];

  return (
    <section
      id="testimonials"
      className="relative py-28 sm:py-36 px-5 sm:px-8 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#d4a056]/3 blur-[150px]" />
      </div>

      <div className="relative mx-auto max-w-5xl">
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
              آراء العملاء
            </span>
            <span className="h-px w-12 bg-[#d4a056]" />
          </div>
          <h2
            className="font-amiri text-4xl sm:text-5xl lg:text-6xl text-[#f0e6d2] leading-tight"
            dir="rtl"
          >
            ماذا قال <span className="text-gold-gradient">العملاء</span>
          </h2>
        </motion.div>

        {/* Testimonial card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative bg-[#0c0a0e] border border-[#d4a056]/15 p-8 sm:p-12 lg:p-16"
          >
            {/* Quote icon */}
            <Quote className="absolute top-6 left-6 w-12 h-12 sm:w-16 sm:h-16 text-[#d4a056]/10" />

            {/* Stars */}
            <div className="flex items-center justify-center gap-1 mb-8">
              {Array.from({ length: t.rating }).map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4 fill-[#d4a056] text-[#d4a056]"
                />
              ))}
            </div>

            {/* Quote */}
            <p
              className="relative text-center font-amiri text-xl sm:text-2xl lg:text-3xl text-[#f0e6d2] leading-loose mb-10"
              dir="rtl"
            >
              «{t.quote}»
            </p>

            {/* Author */}
            <div className="flex items-center justify-center gap-4">
              <div className="relative w-14 h-14 sm:w-16 sm:h-16 overflow-hidden border-2 border-[#d4a056]/30">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-full h-full object-cover img-cinematic"
                />
              </div>
              <div className="text-right">
                <div className="font-cairo font-bold text-lg text-[#f0e6d2]">
                  {t.name}
                </div>
                <div className="text-xs text-[#bfb5a2] font-tajawal">
                  {t.role}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-3 mt-10">
          {testimonials.map((item, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`h-1 transition-all duration-500 ${
                active === i ? "w-12 bg-[#d4a056]" : "w-6 bg-[#d4a056]/20 hover:bg-[#d4a056]/40"
              }`}
              aria-label={`رأي ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
