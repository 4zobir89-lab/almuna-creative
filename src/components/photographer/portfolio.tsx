"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Maximize2 } from "lucide-react";

type Category = "all" | "portrait" | "wedding" | "street" | "landscape" | "editorial";

interface Photo {
  id: number;
  src: string;
  title: string;
  category: Exclude<Category, "all">;
  location: string;
  year: string;
  span?: "wide" | "tall" | "normal";
}

const photos: Photo[] = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1200&auto=format&fit=crop",
    title: "صمت الصباح",
    category: "portrait",
    location: "إسطنبول",
    year: "2024",
    span: "tall",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1400&auto=format&fit=crop",
    title: "اللقاء الأول",
    category: "wedding",
    location: "الدار البيضاء",
    year: "2024",
    span: "wide",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?q=80&w=1200&auto=format&fit=crop",
    title: "زقاق الحي القديم",
    category: "street",
    location: "فاس",
    year: "2023",
    span: "normal",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1200&auto=format&fit=crop",
    title: "أفق الجبال",
    category: "landscape",
    location: "الألب",
    year: "2024",
    span: "wide",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1488161628813-04466f872be2?q=80&w=1200&auto=format&fit=crop",
    title: "بورتريه ذهبي",
    category: "portrait",
    location: "باريس",
    year: "2024",
    span: "normal",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?q=80&w=1200&auto=format&fit=crop",
    title: "يوم لا يُنسى",
    category: "wedding",
    location: "مراكش",
    year: "2023",
    span: "tall",
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=1200&auto=format&fit=crop",
    title: "مدينة الأمطار",
    category: "street",
    location: "لندن",
    year: "2023",
    span: "normal",
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1542228262-3d663b306a53?q=80&w=1400&auto=format&fit=crop",
    title: "صحراء بلا حدود",
    category: "landscape",
    location: "الصحراء الكبرى",
    year: "2024",
    span: "wide",
  },
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1496440737103-cd596325d314?q=80&w=1200&auto=format&fit=crop",
    title: "نظرة من الزمن",
    category: "editorial",
    location: "ميلانو",
    year: "2024",
    span: "tall",
  },
  {
    id: 10,
    src: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1200&auto=format&fit=crop",
    title: "أزياء المساء",
    category: "editorial",
    location: "دبي",
    year: "2024",
    span: "normal",
  },
  {
    id: 11,
    src: "https://images.unsplash.com/photo-1519235624165-6bdfc2c0caa7?q=80&w=1200&auto=format&fit=crop",
    title: "عين الصحراء",
    category: "portrait",
    location: "تونس",
    year: "2023",
    span: "normal",
  },
  {
    id: 12,
    src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1400&auto=format&fit=crop",
    title: "شروق الجبال",
    category: "landscape",
    location: "نيبال",
    year: "2024",
    span: "wide",
  },
];

const categories: { id: Category; label: string }[] = [
  { id: "all", label: "الكل" },
  { id: "portrait", label: "بورتريه" },
  { id: "wedding", label: "أعراس" },
  { id: "street", label: "شارع" },
  { id: "landscape", label: "طبيعة" },
  { id: "editorial", label: "أزياء" },
];

export function Portfolio() {
  const [active, setActive] = useState<Category>("all");
  const [lightbox, setLightbox] = useState<Photo | null>(null);

  const filtered = active === "all" ? photos : photos.filter((p) => p.category === active);

  const getSpanClass = (span?: Photo["span"]) => {
    switch (span) {
      case "wide":
        return "sm:col-span-2";
      case "tall":
        return "sm:row-span-2";
      default:
        return "";
    }
  };

  return (
    <section
      id="portfolio"
      className="relative py-28 sm:py-36 px-5 sm:px-8 bg-[#0a0809]"
    >
      {/* Section header */}
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-12 bg-[#d4a056]" />
              <span className="text-[11px] tracking-[0.4em] text-[#d4a056] uppercase font-medium">
                المعرض
              </span>
            </div>
            <h2
              className="font-amiri text-4xl sm:text-5xl lg:text-6xl text-[#f0e6d2] leading-tight"
              dir="rtl"
            >
              مختارات من
              <br />
              <span className="text-gold-gradient">الأرشيف</span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-[#bfb5a2] text-sm sm:text-base max-w-md leading-relaxed font-tajawal lg:text-left"
          >
            مجموعة من اللقطات المختارة بعناية على مدى السنوات الأخيرة. كل صورة
            لها قصة، وكل قصة تستحق أن تُروى بالضوء.
          </motion.p>
        </div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-wrap gap-2 mb-12 border-b border-[#d4a056]/10 pb-6"
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActive(cat.id)}
              className={`relative px-5 py-2.5 text-sm font-tajawal tracking-wide transition-all duration-300 ${
                active === cat.id
                  ? "text-[#08070a] bg-[#d4a056]"
                  : "text-[#bfb5a2] hover:text-[#f0e6d2] border border-[#d4a056]/15 hover:border-[#d4a056]/40"
              }`}
            >
              {cat.label}
              {active === cat.id && (
                <motion.span
                  layoutId="activeTab"
                  className="absolute inset-0 -z-10 bg-[#d4a056]"
                />
              )}
            </button>
          ))}
        </motion.div>

        {/* Masonry-style grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-[200px] sm:auto-rows-[240px] gap-3 sm:gap-4"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((photo) => (
              <motion.button
                layout
                key={photo.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => setLightbox(photo)}
                className={`group relative overflow-hidden bg-[#15110d] cursor-pointer ${getSpanClass(
                  photo.span
                )}`}
              >
                <img
                  src={photo.src}
                  alt={photo.title}
                  className="absolute inset-0 w-full h-full object-cover img-cinematic transition-transform duration-1000 group-hover:scale-110"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Frame border on hover */}
                <div className="absolute inset-3 border border-[#d4a056]/0 group-hover:border-[#d4a056]/30 transition-all duration-500" />

                {/* Caption */}
                <div className="absolute bottom-0 inset-x-0 p-5 text-right translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <Maximize2 className="w-4 h-4 text-[#d4a056]" />
                    <span className="text-[10px] tracking-[0.3em] text-[#d4a056] uppercase">
                      {photo.year}
                    </span>
                  </div>
                  <h3 className="font-amiri text-xl text-[#f0e6d2] mb-1">
                    {photo.title}
                  </h3>
                  <p className="text-xs text-[#bfb5a2] font-tajawal">
                    {photo.location}
                  </p>
                </div>

                {/* Top corner marker */}
                <div className="absolute top-3 right-3 text-[9px] tracking-[0.3em] text-[#d4a056]/60 uppercase">
                  {String(photo.id).padStart(3, "0")}
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          >
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-5 right-5 text-[#f0e6d2] hover:text-[#d4a056] transition-colors p-2 z-10"
              aria-label="إغلاق"
            >
              <X className="w-7 h-7" />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full max-h-[85vh] flex flex-col"
            >
              <div className="relative flex-1 overflow-hidden">
                <img
                  src={lightbox.src}
                  alt={lightbox.title}
                  className="w-full h-full object-contain img-cinematic"
                />
              </div>
              <div className="mt-5 flex items-center justify-between border-t border-[#d4a056]/15 pt-4">
                <div>
                  <h3 className="font-amiri text-2xl text-[#f0e6d2]">
                    {lightbox.title}
                  </h3>
                  <p className="text-xs text-[#bfb5a2] mt-1 font-tajawal">
                    {lightbox.location} · {lightbox.year}
                  </p>
                </div>
                <div className="text-[10px] tracking-[0.3em] text-[#d4a056]/60 uppercase">
                  {lightbox.category}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
