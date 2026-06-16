import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { z } from "zod";

const createTagSchema = z.object({
  name: z.string().min(1).max(50),
  slug: z.string().min(1).max(50),
});

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const raw = await req.json();
  const parsed = createTagSchema.parse(raw);

  const tag = await prisma.tag.upsert({
    where: { slug: parsed.slug },
    update: { name: parsed.name },
    create: { name: parsed.name, slug: parsed.slug },
  });

  return NextResponse.json(tag);
}

export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  await prisma.tag.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
