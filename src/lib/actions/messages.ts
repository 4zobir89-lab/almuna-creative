"use server";

import { prisma } from "@/lib/db";
import { contactSchema } from "@/lib/schemas";
import { revalidatePath } from "next/cache";

export async function submitContact(formData: FormData) {
  const raw = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    subject: formData.get("subject") as string,
    message: formData.get("message") as string,
  };

  const parsed = contactSchema.parse(raw);

  try {
    await prisma.contactMessage.create({
      data: {
        name: parsed.name,
        email: parsed.email,
        subject: parsed.subject || null,
        message: parsed.message,
      },
    });
  } catch (e) {
    // Resilience: don't fail the user's submission if DB is unavailable
    console.error("Failed to save contact message:", e);
  }

  revalidatePath("/admin/messages");
}
