import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    if (!prisma) {
      // Fallback stats
      return NextResponse.json({
        posts: 318,
        authors: 45,
        events: 3,
        magazines: 3,
      });
    }

    const [posts, authors, events, magazines] = await Promise.all([
      prisma.post.count({ where: { status: "PUBLISHED" } }),
      prisma.author.count({ where: { status: "ACTIVE" } }),
      prisma.event.count({ where: { status: "UPCOMING" } }),
      prisma.magazine.count(),
    ]);

    return NextResponse.json({ posts, authors, events, magazines });
  } catch {
    return NextResponse.json({
      posts: 318,
      authors: 45,
      events: 3,
      magazines: 3,
    });
  }
}
