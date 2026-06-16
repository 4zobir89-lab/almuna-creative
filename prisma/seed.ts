import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("AlMunaAdmin2025!", 12);

  const admin = await prisma.user.upsert({
    where: { email: "admin@almuna.org" },
    update: {},
    create: {
      email: "admin@almuna.org",
      passwordHash,
      name: "مدير الموقع",
      role: "ADMIN",
      status: "ACTIVE",
    },
  });

  const cats = [
    { name: "شعر", slug: "poetry", description: "قصائد وأشعار عربية" },
    { name: "قصة", slug: "story", description: "قصص قصيرة ونصوص سردية" },
    { name: "مقال", slug: "article", description: "مقالات أدبية وفكرية" },
    { name: "خاطرة", slug: "khatera", description: "خواطر أدبية وتأملات" },
    { name: "مسرح", slug: "theater", description: "نصوص مسرحية" },
    { name: "نقد", slug: "criticism", description: "دراسات نقدية وتحليلية" },
  ];

  for (const cat of cats) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
  }

  const tags = ["أدب", "إبداع", "ثقافة", "لغة عربية", "تراث", "حداثة", "إنسان", "طبيعة"];
  for (const name of tags) {
    await prisma.tag.upsert({
      where: { slug: name },
      update: {},
      create: { name, slug: name },
    });
  }

  const keys = [
    { key: "site_name", label: "اسم الموقع", value: "مؤسسة المنى الإبداعية" },
    { key: "site_description", label: "وصف الموقع", value: "منصة الأدب والإبداع العربي" },
    { key: "contact_email", label: "بريد التواصل", value: "info@almuna.org" },
    { key: "facebook_url", label: "فيسبوك", value: "https://facebook.com/almunacreative" },
    { key: "twitter_url", label: "تويتر", value: "https://twitter.com/almuna_c" },
  ];

  for (const { key, label, value } of keys) {
    await prisma.siteSetting.upsert({
      where: { key },
      update: { value, label },
      create: { key, value, label },
    });
  }

  console.log("تم تهيئة قاعدة البيانات بنجاح");
  console.log(`المدير: ${admin.email} / كلمة المرور: AlMunaAdmin2025!`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
