"use server";

import { prisma } from "@/lib/db";
import { slugify } from "@/lib/utils";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { postSchema, type PostInput } from "@/lib/schemas";

export async function getPosts(page = 1, limit = 20) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");

  const where = session.user.role === "ADMIN" ? {} : { authorId: session.user.id };

  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      where,
      include: { author: { select: { id: true, name: true, email: true } }, category: true, tags: { include: { tag: true } } },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.post.count({ where }),
  ]);

  return { posts, total, pages: Math.ceil(total / limit) };
}

export async function getPost(id: string) {
  return prisma.post.findUnique({
    where: { id },
    include: { author: { select: { id: true, name: true, email: true } }, category: true, tags: { include: { tag: true } } },
  });
}

export async function createPost(data: PostInput) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");

  const parsed = postSchema.parse(data);
  const slug = slugify(parsed.title);

  const post = await prisma.post.create({
    data: {
      title: parsed.title,
      slug,
      body: parsed.body,
      excerpt: parsed.excerpt,
      status: parsed.status,
      country: parsed.country,
      scheduledAt: parsed.scheduledAt ? new Date(parsed.scheduledAt) : undefined,
      publishedAt: parsed.status === "PUBLISHED" ? new Date() : undefined,
      author: { connect: { id: session.user.id } },
      category: parsed.categoryId ? { connect: { id: parsed.categoryId } } : undefined,
      tags: parsed.tags?.length
        ? { create: parsed.tags.map((tagId) => ({ tagId })) }
        : undefined,
    },
  });

  await prisma.postVersion.create({
    data: { postId: post.id, title: parsed.title, body: parsed.body, version: 1 },
  });

  revalidatePath("/admin/posts");
  return post;
}

export async function updatePost(id: string, data: PostInput) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");

  const parsed = postSchema.parse(data);

  const existing = await prisma.post.findUnique({ where: { id } });
  if (!existing) throw new Error("Not found");
  if (session.user.role !== "ADMIN" && existing.authorId !== session.user.id) {
    throw new Error("Forbidden");
  }

  const slug = parsed.title !== existing.title ? slugify(parsed.title) : existing.slug;

  await prisma.postTag.deleteMany({ where: { postId: id } });

  const post = await prisma.post.update({
    where: { id },
    data: {
      title: parsed.title,
      slug,
      body: parsed.body,
      excerpt: parsed.excerpt,
      status: parsed.status,
      country: parsed.country,
      publishedAt: parsed.status === "PUBLISHED" && !existing.publishedAt ? new Date() : undefined,
      scheduledAt: parsed.scheduledAt ? new Date(parsed.scheduledAt) : undefined,
      category: parsed.categoryId ? { connect: { id: parsed.categoryId } } : { disconnect: true },
      tags: parsed.tags?.length
        ? { create: parsed.tags.map((tagId) => ({ tagId })) }
        : undefined,
    },
  });

  const latestVersion = await prisma.postVersion.findFirst({
    where: { postId: id },
    orderBy: { version: "desc" },
  });

  await prisma.postVersion.create({
    data: { postId: id, title: parsed.title, body: parsed.body, version: (latestVersion?.version || 0) + 1 },
  });

  revalidatePath("/admin/posts");
  revalidatePath(`/posts/${slug}`);
  return post;
}

export async function deletePost(id: string) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");
  if (session.user.role !== "ADMIN") throw new Error("Forbidden");

  await prisma.post.delete({ where: { id } });
  revalidatePath("/admin/posts");
}
