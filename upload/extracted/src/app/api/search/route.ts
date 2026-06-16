import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q");

  if (!q || q.length < 2) {
    return NextResponse.json({ posts: [], authors: [] });
  }

  const [posts, authors] = await Promise.all([
    prisma.post.findMany({
      where: {
        status: "PUBLISHED",
        OR: [
          { title: { contains: q, mode: "insensitive" } },
          { body: { contains: q, mode: "insensitive" } },
          { excerpt: { contains: q, mode: "insensitive" } },
        ],
      },
      include: { author: { select: { name: true } }, category: true },
      take: 20,
      orderBy: { publishedAt: "desc" },
    }),
    prisma.user.findMany({
      where: {
        name: { contains: q, mode: "insensitive" },
        status: "ACTIVE",
      },
      select: { id: true, name: true },
      take: 5,
    }),
  ]);

  return NextResponse.json({ posts, authors });
}
