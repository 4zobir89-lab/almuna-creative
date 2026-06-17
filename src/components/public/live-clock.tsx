"use client";

import { useEffect, useState } from "react";

const DAYS_AR = ["الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"];
const MONTHS_AR = ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"];

export function LiveClock() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!now) {
    return (
      <div className="flex items-center gap-2 text-xs text-[var(--color-text-tertiary)]">
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-text-tertiary)]" />
        <span className="tabular-nums">—</span>
      </div>
    );
  }

  const day = DAYS_AR[now.getDay()];
  const date = now.getDate();
  const month = MONTHS_AR[now.getMonth()];
  const year = now.getFullYear();
  const hh = now.getHours().toString().padStart(2, "0");
  const mm = now.getMinutes().toString().padStart(2, "0");
  const ss = now.getSeconds().toString().padStart(2, "0");

  return (
    <div className="flex items-center gap-2 text-xs text-[var(--color-text-tertiary)]">
      <span className="relative flex h-1.5 w-1.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-75" />
        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[var(--accent)]" />
      </span>
      <span className="tabular-nums">
        {day}، {date} {month} {year}
        <span className="mx-1.5 text-[var(--color-border)]">|</span>
        <span className="text-[var(--color-text-secondary)]">{hh}:{mm}:{ss}</span>
      </span>
    </div>
  );
}
