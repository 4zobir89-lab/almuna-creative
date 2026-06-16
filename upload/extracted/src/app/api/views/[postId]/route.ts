import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(
  _req: Request,
  { params }: { params: Promise<{ postId: string }> }
) {
  const { postId } = await params;

  await prisma.post.update({
    where: { id: postId },
    data: { viewCount: { increment: 1 } },
  });

  return NextResponse.json({ ok: true });
}
