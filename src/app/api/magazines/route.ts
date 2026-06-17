import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    if (!prisma) return NextResponse.json({ error: "DB unavailable" }, { status: 503 });
    const magazines = await prisma.magazine.findMany({ orderBy: { issueNumber: "desc" } });
    return NextResponse.json(magazines);
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    if (!prisma) return NextResponse.json({ error: "DB unavailable" }, { status: 503 });
    const body = await req.json();
    const slug = body.title.trim().replace(/\s+/g, "-").replace(/[^\u0600-\u06FF\w-]/g, "").toLowerCase();
    const magazine = await prisma.magazine.create({
      data: {
        title: body.title,
        slug: slug || `mag-${Date.now()}`,
        description: body.description || null,
        issueNumber: body.issueNumber || 1,
        coverUrl: body.coverUrl || null,
        pdfUrl: body.pdfUrl || null,
      },
    });
    return NextResponse.json(magazine, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
