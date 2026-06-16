"use client";

import { motion } from "framer-motion";
import { Award, Camera, Globe, Calendar } from "lucide-react";

const stats = [
  { icon: Camera, value: "850+", label: "جلسة تصوير" },
  { icon: Calendar, value: "12", label: "عاماً من الخبرة" },
  { icon: Globe, value: "32", label: "دولة حول العالم" },
  { icon: Award, value: "24", label: "جائزة دولية" },
];

export function About() {
  return (
    <section
      id="about"
      className="relative py-28 sm:py-36 px-5 sm:px-8 overflow-hidden"
    >
      {/* Subtle background texture */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-[#d4a056]/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-[#c4633e]/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Image side */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 relative"
        >
          <div className="relative aspect-[4/5] overflow-hidden group">
            <img
              src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=1200&auto=format&fit=crop"
              alt="كريم منصور - المصور"
              className="w-full h-full object-cover img-cinematic transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            {/* Frame border */}
            <div className="absolute inset-3 border border-[#d4a056]/20" />
          </div>

          {/* Floating signature card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="absolute -bottom-6 -left-4 sm:-left-8 bg-[#0c0a0e] border border-[#d4a056]/20 p-5 max-w-[200px] shadow-2xl"
          >
            <p className="font-amiri text-2xl text-[#d4a056] mb-1">كريم منصور</p>
            <p className="text-[10px] tracking-[0.3em] text-[#bfb5a2]/70 uppercase">
              EST. 2013
            </p>
            <div className="mt-3 h-px bg-gradient-to-r from-[#d4a056]/40 to-transparent" />
            <p className="mt-3 text-xs text-[#bfb5a2] font-tajawal leading-relaxed">
              "الكاميرا مجرد أداة، الرؤية هي ما يصنع الصورة"
            </p>
          </motion.div>
        </motion.div>

        {/* Text side */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7"
        >
          <div className="flex items-center gap-3 mb-5">
            <span className="h-px w-12 bg-[#d4a056]" />
            <span className="text-[11px] tracking-[0.4em] text-[#d4a056] uppercase font-medium">
              عن المصور
            </span>
          </div>

          <h2
            className="font-amiri text-4xl sm:text-5xl lg:text-6xl text-[#f0e6d2] leading-tight mb-8"
            dir="rtl"
          >
            أصوّر ما لا يُرى
            <br />
            <span className="text-gold-gradient">بالعيون المعتادة</span>
          </h2>

          <div className="space-y-5 text-[#bfb5a2] text-base sm:text-lg leading-loose font-tajawal">
            <p>
              منذ أن أمسكت أول كاميرا في الثامنة عشرة من عمري، وأنا أبحث عن
              اللحظة التي يتوقف فيها الزمن. الضوء بالنسبة ليس مجرد وسيلة إضاءة،
              بل هو لغة، والظل هو صمتها. كل صورة ألتقطها هي محاولة لترجمة شعور
              لا تستطيع الكلمات التعبير عنه.
            </p>
            <p>
              عملت على مدى اثني عشر عاماً مع مئات العملاء حول العالم - من حفلات
              الأعراس في إسطنبول، إلى الحملات الإعلانية في دبي، وإلى المشاريع
              الفنية الشخصية في شوارع طوكيو وباريس. كل تجربة علّمتني أن الصورة
              الجيدة ليست تلك المركّبة بإتقان فقط، بل تلك التي تترك أثراً في
              النفس بعد سنوات.
            </p>
            <p>
              أسلوبي السينمائي مستوحى من أفلام الستينات والإيطالية الجديدة،
              حيث الضوء الطبيعي والألوان الدافئة والظلال العميقة تحكي قصصاً
              بدون كلمات. أحاول في كل جلسة أن أنقل هذا الإحساس السينمائي إلى
              إطار واحد ثابت.
            </p>
          </div>

          {/* Stats grid */}
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-px bg-[#d4a056]/15 border border-[#d4a056]/15">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
                className="bg-[#0c0a0e] p-5 sm:p-6 text-center hover:bg-[#15110d] transition-colors"
              >
                <s.icon className="w-5 h-5 text-[#d4a056] mx-auto mb-2" />
                <div className="font-cairo text-2xl sm:text-3xl font-bold text-[#f0e6d2]">
                  {s.value}
                </div>
                <div className="text-[10px] sm:text-xs text-[#bfb5a2] mt-1 tracking-wider">
                  {s.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
