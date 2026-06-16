"use client";

const phrases = [
  "تصوير سينمائي",
  "ضوء طبيعي",
  "قصص تُروى بالصور",
  "إطار واحد، حكاية كاملة",
  "بورتريه، أعراس، فن",
  "كريم منصور",
];

export function Marquee() {
  return (
    <div className="relative bg-[#0c0a0e] border-y border-[#d4a056]/10 py-5 overflow-hidden">
      <div className="flex marquee whitespace-nowrap">
        {[...phrases, ...phrases, ...phrases].map((phrase, i) => (
          <div key={i} className="flex items-center gap-6 px-6">
            <span className="font-amiri text-2xl sm:text-3xl text-[#f0e6d2]/80">
              {phrase}
            </span>
            <span className="text-[#d4a056] text-2xl">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}
