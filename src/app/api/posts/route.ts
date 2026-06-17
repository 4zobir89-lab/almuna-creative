import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

// GET all posts
export async function GET() {
  try {
    if (!prisma) {
      return NextResponse.json({ error: "Database not available" }, { status: 503 });
    }
    const posts = await prisma.post.findMany({
      orderBy: { publishedAt: "desc" },
    });
    return NextResponse.json(posts);
  } catch (e) {
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
  }
}

// POST create a new post
export async function POST(req: Request) {
  try {
    if (!prisma) {
      return NextResponse.json({ error: "Database not available" }, { status: 503 });
    }
    const body = await req.json();

    // Generate slug from title
    const slug = body.title
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\u0600-\u06FF\w-]/g, "")
      .toLowerCase();

    const post = await prisma.post.create({
      data: {
        title: body.title,
        slug: slug || `post-${Date.now()}`,
        excerpt: body.excerpt || null,
        body: body.body || "",
        author: body.author || "مجهول",
        category: body.category || "نصوص",
        status: body.status || "PUBLISHED",
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
  }
}
