"use client";

import { useState, useEffect } from "react";
import { Type, Plus, Minus, RotateCcw } from "lucide-react";

type FontSize = "sm" | "md" | "lg" | "xl";
type FontFamily = "amiri" | "tajawal";

export function ReadingControls() {
  const [fontSize, setFontSize] = useState<FontSize>("md");
  const [fontFamily, setFontFamily] = useState<FontFamily>("amiri");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      const savedSize = localStorage.getItem("reading-font-size") as FontSize;
      const savedFont = localStorage.getItem("reading-font-family") as FontFamily;
      if (savedSize) setFontSize(savedSize);
      if (savedFont) setFontFamily(savedFont);
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("reading-font-size", fontSize);
      localStorage.setItem("reading-font-family", fontFamily);
    } catch {}
    document.documentElement.setAttribute("data-font-size", fontSize);
    document.documentElement.setAttribute("data-font-family", fontFamily);
  }, [fontSize, fontFamily]);

  const sizes: { value: FontSize; label: string }[] = [
    { value: "sm", label: "ص" },
    { value: "md", label: "م" },
    { value: "lg", label: "ك" },
    { value: "xl", label: "ك+" },
  ];

  return (
    <div className="fixed bottom-6 left-6 z-40">
      {isOpen && (
        <div className="mb-2 p-3 rounded-md bg-[var(--color-surface)] border border-[var(--color-border)] shadow-lg w-56">
          <div className="mb-3">
            <div className="text-[10px] uppercase tracking-wider text-[var(--color-text-tertiary)] mb-2">حجم الخط</div>
            <div className="grid grid-cols-4 gap-1">
              {sizes.map((s) => (
                <button
                  key={s.value}
                  onClick={() => setFontSize(s.value)}
                  className={`py-2 rounded text-sm font-medium transition-colors ${
                    fontSize === s.value
                      ? "bg-[var(--accent)] text-white"
                      : "bg-[var(--doppel-bg)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-3">
            <div className="text-[10px] uppercase tracking-wider text-[var(--color-text-tertiary)] mb-2">نوع الخط</div>
            <div className="grid grid-cols-2 gap-1">
              <button
                onClick={() => setFontFamily("amiri")}
                className={`py-2 rounded text-xs font-amiri transition-colors ${
                  fontFamily === "amiri"
                    ? "bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]"
                    : "bg-[var(--doppel-bg)] text-[var(--color-text-secondary)]"
                }`}
              >
                أميري
              </button>
              <button
                onClick={() => setFontFamily("tajawal")}
                className={`py-2 rounded text-xs font-tajawal transition-colors ${
                  fontFamily === "tajawal"
                    ? "bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]"
                    : "bg-[var(--doppel-bg)] text-[var(--color-text-secondary)]"
                }`}
              >
                تجوال
              </button>
            </div>
          </div>

          <button
            onClick={() => { setFontSize("md"); setFontFamily("amiri"); }}
            className="w-full py-2 rounded bg-[var(--doppel-bg)] text-[var(--color-text-secondary)] hover:text-[var(--accent)] text-xs flex items-center justify-center gap-2 transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            إعادة ضبط
          </button>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="إعدادات القراءة"
        className="flex h-10 w-10 items-center justify-center rounded-md bg-[var(--accent)] text-white shadow-md hover:opacity-90 transition-opacity touch-target"
      >
        <Type className="w-4 h-4" />
      </button>
    </div>
  );
}
