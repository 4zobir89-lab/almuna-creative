import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    if (!prisma) return NextResponse.json({ error: "DB unavailable" }, { status: 503 });
    const authors = await prisma.author.findMany({ orderBy: { name: "asc" } });
    return NextResponse.json(authors);
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    if (!prisma) return NextResponse.json({ error: "DB unavailable" }, { status: 503 });
    const body = await req.json();
    const author = await prisma.author.create({
      data: {
        name: body.name,
        bio: body.bio || null,
        country: body.country || null,
        avatarUrl: body.avatarUrl || null,
      },
    });
    return NextResponse.json(author, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
