import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    if (!prisma) return NextResponse.json({ error: "DB unavailable" }, { status: 503 });
    const events = await prisma.event.findMany({ orderBy: { eventDate: "desc" } });
    return NextResponse.json(events);
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    if (!prisma) return NextResponse.json({ error: "DB unavailable" }, { status: 503 });
    const body = await req.json();
    const slug = body.title.trim().replace(/\s+/g, "-").replace(/[^\u0600-\u06FF\w-]/g, "").toLowerCase();
    const event = await prisma.event.create({
      data: {
        title: body.title,
        slug: slug || `event-${Date.now()}`,
        description: body.description || null,
        eventType: body.eventType || "OTHER",
        eventDate: new Date(body.eventDate),
        location: body.location || null,
        status: body.status || "UPCOMING",
      },
    });
    return NextResponse.json(event, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
