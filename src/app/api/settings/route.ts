import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    if (!prisma) {
      return NextResponse.json({
        siteName: "مؤسسة المنى الإبداعية",
        siteDescription: "منصة أدبية عربية تحتفي بالكلمة الجميلة والفكر المستنير",
        adminEmail: "info@almuna.org",
        postsPerPage: "12",
      });
    }

    const settings = await prisma.siteSetting.findMany();
    const result: Record<string, string> = {};
    settings.forEach((s) => {
      result[s.key] = s.value;
    });

    return NextResponse.json({
      siteName: result.siteName || "مؤسسة المنى الإبداعية",
      siteDescription: result.siteDescription || "منصة أدبية عربية تحتفي بالكلمة الجميلة",
      adminEmail: result.adminEmail || "info@almuna.org",
      postsPerPage: result.postsPerPage || "12",
    });
  } catch {
    return NextResponse.json({
      siteName: "مؤسسة المنى الإبداعية",
      siteDescription: "منصة أدبية عربية تحتفي بالكلمة الجميلة",
      adminEmail: "info@almuna.org",
      postsPerPage: "12",
    });
  }
}

export async function PUT(req: Request) {
  try {
    if (!prisma) {
      return NextResponse.json({ success: true, message: "Saved (no DB)" });
    }

    const body = await req.json();

    for (const [key, value] of Object.entries(body)) {
      await prisma.siteSetting.upsert({
        where: { key },
        update: { value: String(value) },
        create: { key, value: String(value) },
      });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to save settings" }, { status: 500 });
  }
}
