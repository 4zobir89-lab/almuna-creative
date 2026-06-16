"use client";

import { motion } from "framer-motion";
import { Heart, User, Building2, Sparkles, Check } from "lucide-react";

const services = [
  {
    icon: Heart,
    title: "تصوير الأعراس",
    description:
      "توثيق كامل ليوم العرس من التحضيرات الصباحية حتى آخر رقصة في الليل. أسلوب سينمائي يلتقط المشاعر الصادقة والتفاصيل الصغيرة التي قد تفوت العين.",
    features: ["تصوير كامل اليوم", "البوم مطبوع فاخر", "٣٠٠+ صورة معدلة", "فيديو قصير"],
    duration: "٨-١٢ ساعة",
    from: "٢٥٠٠$",
  },
  {
    icon: User,
    title: "بورتريه شخصي",
    description:
      "جلسة بورتريه احترافية في الاستوديو أو في الموقع. مثالي للممثلين، رواد الأعمال، الفنانين، أو أي شخص يريد صورة تعبر عن هويته بأسلوب فني مميز.",
    features: ["جلسة ساعتان", "٢٠+ صورة معدلة", "ملابس تغييرين", "إخراج فني"],
    duration: "ساعتان",
    from: "٤٥٠$",
    featured: true,
  },
  {
    icon: Building2,
    title: "تصوير تجاري",
    description:
      "حملات إعلانية، تصوير منتجات، صور للعلامات التجارية. أسلوب نظيف ومميز يخدم رؤية العلامة التجارية ويرفع من قيمتها البصرية في السوق.",
    features: ["اجتماع استشاري", "تصوير منتج/خدمة", "٥٠+ صورة", "حقوق استخدام كامل"],
    duration: "حسب المشروع",
    from: "٨٠٠$",
  },
  {
    icon: Sparkles,
    title: "مشروع فني",
    description:
      "للحملات الإبداعية والمشاريع الفنية الخاصة. نعمل معاً على بناء رؤية بصرية متكاملة من الفكرة الأولى حتى الإخراج النهائي والمعرض.",
    features: ["تطوير المفهوم", "إدارة الإنتاج", "إخراج فني", "استشارات طباعة"],
    duration: "حسب المشروع",
    from: "حسب الطلب",
  },
];

export function Services() {
  return (
    <section
      id="services"
      className="relative py-28 sm:py-36 px-5 sm:px-8 bg-[#0a0809]"
    >
      <div className="mx-auto max-w-7xl">
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
              الخدمات
            </span>
            <span className="h-px w-12 bg-[#d4a056]" />
          </div>
          <h2
            className="font-amiri text-4xl sm:text-5xl lg:text-6xl text-[#f0e6d2] leading-tight"
            dir="rtl"
          >
            خدمات <span className="text-gold-gradient">التصوير</span>
          </h2>
          <p className="mt-6 text-[#bfb5a2] text-sm sm:text-base max-w-2xl mx-auto leading-relaxed font-tajawal">
            باقات متنوعة تناسب مختلف الاحتياجات. كل باقة يمكن تخصيصها حسب
            متطلباتك الخاصة. تواصل للحصول على عرض مفصل.
          </p>
        </motion.div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className={`relative group overflow-hidden border ${
                service.featured
                  ? "border-[#d4a056]/40 bg-gradient-to-br from-[#15110d] to-[#0c0a0e]"
                  : "border-[#d4a056]/15 bg-[#0c0a0e] hover:border-[#d4a056]/30"
              } transition-all duration-500 p-7 sm:p-9`}
            >
              {service.featured && (
                <div className="absolute top-0 left-0 bg-[#d4a056] text-[#08070a] px-3 py-1 text-[10px] tracking-[0.2em] uppercase font-bold">
                  الأكثر طلباً
                </div>
              )}

              {/* Icon */}
              <div className="flex items-start justify-between mb-6">
                <div className="w-12 h-12 border border-[#d4a056]/30 flex items-center justify-center group-hover:border-[#d4a056]/60 group-hover:bg-[#d4a056]/5 transition-all duration-500">
                  <service.icon className="w-5 h-5 text-[#d4a056]" />
                </div>
                <div className="text-right">
                  <div className="text-[10px] tracking-[0.3em] text-[#bfb5a2]/60 uppercase mb-1">
                    يبدأ من
                  </div>
                  <div className="font-cairo text-2xl font-bold text-[#f0e6d2]">
                    {service.from}
                  </div>
                </div>
              </div>

              <h3
                className="font-amiri text-2xl sm:text-3xl text-[#f0e6d2] mb-3"
                dir="rtl"
              >
                {service.title}
              </h3>

              <p className="text-[#bfb5a2] text-sm leading-relaxed font-tajawal mb-6">
                {service.description}
              </p>

              {/* Features */}
              <ul className="space-y-2.5 mb-6">
                {service.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-3 text-sm text-[#bfb5a2] font-tajawal"
                  >
                    <span className="flex-shrink-0 w-4 h-4 rounded-full bg-[#d4a056]/10 flex items-center justify-center">
                      <Check className="w-2.5 h-2.5 text-[#d4a056]" />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              {/* Footer */}
              <div className="flex items-center justify-between pt-5 border-t border-[#d4a056]/10">
                <div className="text-xs text-[#bfb5a2]/60 font-tajawal">
                  المدة: <span className="text-[#f0e6d2]">{service.duration}</span>
                </div>
                <button
                  onClick={() =>
                    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="text-xs tracking-wider text-[#d4a056] hover:text-[#f0e6d2] transition-colors font-tajawal"
                >
                  احجز ←
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
