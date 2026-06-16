"use server";

import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { changeRoleSchema } from "@/lib/schemas";

export async function getUsers() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") throw new Error("Forbidden");

  return prisma.user.findMany({
    select: { id: true, email: true, name: true, role: true, status: true, createdAt: true, _count: { select: { posts: true } } },
    orderBy: { createdAt: "desc" },
  });
}

export async function toggleUserStatus(id: string) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") throw new Error("Forbidden");

  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) throw new Error("User not found");

  await prisma.user.update({
    where: { id },
    data: { status: user.status === "ACTIVE" ? "SUSPENDED" : "ACTIVE" },
  });

  revalidatePath("/admin/users");
}

export async function changeUserRole(id: string, role: string) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") throw new Error("Forbidden");

  const parsed = changeRoleSchema.parse({ userId: id, role });

  await prisma.user.update({
    where: { id },
    data: { role: parsed.role },
  });

  revalidatePath("/admin/users");
}
