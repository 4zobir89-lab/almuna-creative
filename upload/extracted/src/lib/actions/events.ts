"use server";

import { prisma } from "@/lib/db";
import { slugify } from "@/lib/utils";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { eventSchema, type EventInput } from "@/lib/schemas";

export async function getEvents() {
  return prisma.event.findMany({
    include: {
      creator: { select: { id: true, name: true, email: true } },
      participants: { include: { user: { select: { id: true, name: true } } } },
    },
    orderBy: { eventDate: "desc" },
  });
}

export async function createEvent(data: EventInput) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") throw new Error("Forbidden");

  const parsed = eventSchema.parse(data);

  const event = await prisma.event.create({
    data: {
      title: parsed.title,
      slug: slugify(parsed.title),
      description: parsed.description,
      eventType: parsed.eventType,
      eventDate: new Date(parsed.eventDate),
      location: parsed.location,
      coverImageUrl: parsed.coverImageUrl,
      status: parsed.status,
      creator: { connect: { id: session.user.id } },
    },
  });

  revalidatePath("/admin/events");
  return event;
}

export async function deleteEvent(id: string) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") throw new Error("Forbidden");

  await prisma.event.delete({ where: { id } });
  revalidatePath("/admin/events");
}
