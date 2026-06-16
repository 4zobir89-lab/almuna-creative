"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { submitContact } from "@/lib/actions/messages";
import { contactSchema, type ContactInput } from "@/lib/schemas/contact";
import { zodResolver } from "@/lib/zod-resolver";
import { useState } from "react";

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
    const form = new FormData();
    form.set("name", data.name);
    form.set("email", data.email);
    form.set("message", data.message);
    if (data.subject) form.set("subject", data.subject);
    await submitContact(form);
    setDone(true);
  }

  if (done) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <p className="text-xl font-amiri font-bold text-brand-accent mb-2">شكراً لتواصلك!</p>
          <p className="text-brand-secondary">سنعاود التواصل معك في أقرب وقت ممكن.</p>
        </CardContent>
      </Card>
    );
  }

  const inputClass = "w-full rounded-md border border-brand-border bg-white p-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-accent";
  const errorClass = "text-xs text-red-500 mt-1";

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardContent className="space-y-4 p-6">
          <div>
            <label className="mb-1 block text-sm font-medium">الاسم</label>
            <Input {...register("name")} placeholder="اسمك الكريم" />
            {errors.name && <p className={errorClass}>{errors.name.message}</p>}
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">البريد الإلكتروني</label>
            <Input {...register("email")} type="email" placeholder="بريدك الإلكتروني" />
            {errors.email && <p className={errorClass}>{errors.email.message}</p>}
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">الموضوع (اختياري)</label>
            <Input {...register("subject")} placeholder="موضوع الرسالة" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">الرسالة</label>
            <textarea
              {...register("message")}
              rows={6}
              className={inputClass}
              placeholder="اكتب رسالتك هنا…"
            />
            {errors.message && <p className={errorClass}>{errors.message.message}</p>}
          </div>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "جاري الإرسال…" : "إرسال"}
          </Button>
        </CardContent>
      </Card>
    </form>
  );
}
