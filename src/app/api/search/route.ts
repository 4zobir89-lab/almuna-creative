import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q");

  if (!q || q.length < 2) {
    return NextResponse.json({ posts: [], authors: [] });
  }

  try {
    const [posts, authors] = await Promise.all([
      prisma.post.findMany({
        where: {
          status: "PUBLISHED",
          OR: [
            { title: { contains: q } },
            { body: { contains: q } },
            { excerpt: { contains: q } },
          ],
        },
        include: { author: { select: { id: true, name: true, email: true } }, category: true, tags: { include: { tag: true } } },
        take: 20,
        orderBy: { publishedAt: "desc" },
      }),
      prisma.user.findMany({
        where: {
          name: { contains: q },
          status: "ACTIVE",
        },
        select: { id: true, name: true },
        take: 5,
      }),
    ]);

    return NextResponse.json({ posts, authors });
  } catch {
    return NextResponse.json({ posts: [], authors: [] });
  }
}
