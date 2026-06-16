"use server";

import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { contactSchema } from "@/lib/schemas";

export async function markAsRead(id: string) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") throw new Error("Forbidden");

  await prisma.contactMessage.update({ where: { id }, data: { isRead: true } });
  revalidatePath("/admin/messages");
}

export async function submitContact(formData: FormData) {
  const raw = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    subject: formData.get("subject") as string,
    message: formData.get("message") as string,
  };

  const parsed = contactSchema.parse(raw);

  await prisma.contactMessage.create({
    data: { name: parsed.name, email: parsed.email, subject: parsed.subject || null, message: parsed.message },
  });

  revalidatePath("/admin/messages");
}
