"use server";

import { prisma } from "@/lib/db";
import { slugify } from "@/lib/utils";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { categorySchema, type CategoryInput } from "@/lib/schemas";

export async function getCategories() {
  return prisma.category.findMany({
    include: { children: { include: { _count: { select: { posts: true } } } }, _count: { select: { posts: true } } },
    orderBy: { sortOrder: "asc" },
  });
}

export async function getCategory(id: string) {
  return prisma.category.findUnique({
    where: { id },
    include: { parent: true, children: true },
  });
}

export async function createCategory(data: CategoryInput) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") throw new Error("Forbidden");

  const parsed = categorySchema.parse(data);

  const category = await prisma.category.create({
    data: {
      name: parsed.name,
      slug: slugify(parsed.name),
      description: parsed.description,
      sortOrder: parsed.sortOrder || 0,
      parentId: parsed.parentId || null,
    },
  });

  revalidatePath("/admin/categories");
  return category;
}

export async function updateCategory(id: string, data: CategoryInput) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") throw new Error("Forbidden");

  const parsed = categorySchema.parse(data);

  const category = await prisma.category.update({
    where: { id },
    data: {
      name: parsed.name,
      slug: slugify(parsed.name),
      description: parsed.description,
      sortOrder: parsed.sortOrder,
      parentId: parsed.parentId || null,
    },
  });

  revalidatePath("/admin/categories");
  return category;
}

export async function deleteCategory(id: string) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") throw new Error("Forbidden");

  await prisma.category.delete({ where: { id } });
  revalidatePath("/admin/categories");
}
