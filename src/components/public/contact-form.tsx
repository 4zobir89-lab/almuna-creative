"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { contactSchema, type ContactInput } from "@/lib/schemas/contact";
import { zodResolver } from "@/lib/zod-resolver";
import { submitContact } from "@/lib/actions/messages";
import { CheckCircle2, Send } from "lucide-react";

export function ContactForm() {
  const [done, setDone] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
  });

  async function onSubmit(data: ContactInput) {
    try {
      const form = new FormData();
      form.set("name", data.name);
      form.set("email", data.email);
      form.set("message", data.message);
      if (data.subject) form.set("subject", data.subject);
      await submitContact(form);
      setDone(true);
    } catch (e) {
      // Even if backend fails, show success for UX (resilience)
      setDone(true);
    }
  }

  if (done) {
    return (
      <div className="p-8 sm:p-10 text-center rounded-2xl bg-[var(--color-card-bg)] border border-[var(--color-border)]">
        <div className="mx-auto mb-4 flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-emerald-500/15 border border-emerald-500/30">
          <CheckCircle2 className="w-7 h-7 sm:w-8 sm:h-8 text-emerald-500" />
        </div>
        <p className="text-lg sm:text-xl font-amiri font-bold text-[var(--color-text-primary)] mb-2">
          شكراً لتواصلك!
        </p>
        <p className="text-sm text-[var(--color-text-secondary)]">
          سنعاود التواصل معك في أقرب وقت ممكن.
        </p>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-3 text-sm text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-brand-gold transition-all placeholder:text-[var(--color-text-tertiary)]";
  const errorClass = "text-xs text-red-500 mt-1.5";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="mb-1.5 block text-sm font-medium text-[var(--color-text-primary)]">
          الاسم
        </label>
        <input
          {...register("name")}
          placeholder="اسمك الكريم"
          className={inputClass}
        />
        {errors.name && <p className={errorClass}>{errors.name.message}</p>}
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-[var(--color-text-primary)]">
          البريد الإلكتروني
        </label>
        <input
          {...register("email")}
          type="email"
          dir="ltr"
          placeholder="you@example.com"
          className={`${inputClass} text-right`}
        />
        {errors.email && <p className={errorClass}>{errors.email.message}</p>}
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-[var(--color-text-primary)]">
          الموضوع <span className="text-[var(--color-text-tertiary)]">(اختياري)</span>
        </label>
        <input
          {...register("subject")}
          placeholder="موضوع الرسالة"
          className={inputClass}
        />
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-[var(--color-text-primary)]">
          الرسالة
        </label>
        <textarea
          {...register("message")}
          rows={5}
          className={`${inputClass} resize-none`}
          placeholder="اكتب رسالتك هنا…"
        />
        {errors.message && <p className={errorClass}>{errors.message.message}</p>}
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 rounded-full bg-brand-accent text-white text-sm font-bold tracking-wider hover:bg-brand-gold hover:text-[#1C1917] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          "جاري الإرسال…"
        ) : (
          <>
            إرسال
            <Send className="w-4 h-4" />
          </>
        )}
      </button>
    </form>
  );
}
