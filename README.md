# 📚 مؤسسة المنى الإبداعية | منصة الأدب والإبداع العربي

<div dir="rtl">

منصة رقمية أدبية عربية تحتفي بالكلمة الجميلة والفكر المستنير — نصوص، شعر، قصص، ومقالات تلهم الفكر وتلامس الروح.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-6-2D3748?style=flat-square&logo=prisma)](https://www.prisma.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

</div>

---

## 🎯 نظرة عامة | Overview

منصة "مؤسسة المنى الإبداعية" هي نظام إدارة محتوى أدبي عربي مبني بتقنيات الويب الحديثة، يجمع بين الأصالة في الطرح والمعاصرة في التصميم. يدعم RTL بالكامل، الثيمات الفاتحة والداكنة، والتجاوب مع جميع الأجهزة.

### ✨ المميزات الرئيسية

- 🎨 **تصميم سينمائي داكن** — لوحة ألوان ذهبية + أسود دافئ + كريمي
- 🌓 **ثيمات متعددة** — وضع فاتح وداكن مع حفظ التفضيل
- 📱 **تجاوب كامل** — يعمل على الجوال (375px+) والتابلت والديسكتوب
- 🔍 **محرك بحث** — بحث في النصوص والكتّاب والأقسام
- 📚 **أرشيف منظم** — تصنيف هرمي (شعر، نثر، نقد، فن بصري، نشيد، مجلة)
- 👥 **صفحات الكتّاب** — سير ذاتية وإحصائيات
- 📅 **فعاليات** — أمسيات، ورش، مسابقات، لقاءات
- 📖 **مجلة دورية** — إصدارات قابلة للتصفح
- 🎭 **زخارف إسلامية** — أرابيسك وتوهجات ذهبية
- ⚡ **أداء عالٍ** — SSR + Turbopack + تحميل lazy

---

## 🛠️ الحزمة التقنية | Tech Stack

| الطبقة | التقنية | الإصدار |
|--------|---------|---------|
| **Framework** | Next.js (App Router) | 16.1.3 |
| **Language** | TypeScript | 5.x |
| **Database** | SQLite (Prisma ORM) | 6.x |
| **Styling** | Tailwind CSS | 4.x |
| **UI Components** | shadcn/ui + Radix UI | - |
| **Animations** | GSAP + ScrollTrigger | 3.x |
| **Icons** | Lucide React | 0.5x |
| **Fonts** | Amiri, Tajawal, Cairo (Google Fonts) | - |
| **Forms** | React Hook Form + Zod | - |
| **Auth** | NextAuth.js + bcryptjs | 4.x |
| **Package Manager** | Bun | 1.x |

---

## 📂 بنية المشروع | Project Structure

```
almuna-creative/
├── prisma/
│   └── schema.prisma              # مخطط قاعدة البيانات (SQLite)
├── public/                        # الأصول الثابتة
│   ├── logo.svg
│   └── ...
├── src/
│   ├── app/
│   │   ├── (public)/             # المسارات العامة
│   │   │   ├── page.tsx          # الصفحة الرئيسية
│   │   │   ├── layout.tsx        # التخطيط العام (Navbar + Footer)
│   │   │   ├── archive/          # الأرشيف
│   │   │   ├── categories/       # الأقسام
│   │   │   ├── authors/          # الكتّاب
│   │   │   ├── events/           # الفعاليات
│   │   │   ├── magazine/         # المجلة
│   │   │   ├── about/            # عن المؤسسة
│   │   │   ├── contact/          # تواصل معنا
│   │   │   ├── search/           # البحث
│   │   │   └── posts/[slug]/     # تفاصيل المنشور
│   │   ├── api/
│   │   │   └── search/route.ts   # API البحث
│   │   ├── layout.tsx            # التخطيط الجذري + ThemeProvider
│   │   ├── globals.css           # الأنماط العامة + الثيمات
│   │   ├── error.tsx             # صفحة الخطأ
│   │   ├── loading.tsx           # صفحة التحميل
│   │   └── not-found.tsx         # صفحة 404
│   ├── components/
│   │   ├── public/               # مكونات الواجهة العامة
│   │   │   ├── navbar.tsx        # شريط التنقل + زر الثيم
│   │   │   ├── hero.tsx          # قسم البطل
│   │   │   ├── footer.tsx        # التذييل
│   │   │   ├── post-card.tsx     # بطاقة منشور
│   │   │   ├── post-grid.tsx     # شبكة المنشورات
│   │   │   ├── post-body.tsx     # محتوى المنشور (DOMPurify)
│   │   │   ├── contact-form.tsx  # نموذج التواصل
│   │   │   ├── background-effects.tsx
│   │   │   ├── animation-provider.tsx
│   │   │   └── view-counter.tsx
│   │   ├── providers/
│   │   │   └── theme-provider.tsx
│   │   └── ui/                   # مكونات shadcn/ui
│   ├── lib/
│   │   ├── db.ts                 # عميل Prisma
│   │   ├── auth.ts               # إعدادات NextAuth
│   │   ├── utils.ts              # دوال مساعدة
│   │   ├── zod-resolver.ts       # محول Zod للنماذج
│   │   ├── actions/
│   │   │   └── messages.ts       # Server Actions للتواصل
│   │   └── schemas/              # مخططات Zod
│   ├── hooks/                    # React hooks
│   └── types/                    # تعريفات TypeScript
├── tailwind.config.ts            # إعدادات Tailwind
├── next.config.ts                # إعدادات Next.js
├── package.json
└── README.md
```

---

## 🚀 التشغيل المحلي | Local Development

### المتطلبات

- **Node.js** 18.17+ أو **Bun** 1.x
- npm / yarn / pnpm / bun (يُفضّل bun للأداء)

### خطوات التشغيل

```bash
# 1. استنساخ المستودع
git clone https://github.com/USERNAME/almuna-creative.git
cd almuna-creative

# 2. تثبيت التبعيات
bun install
# أو: npm install

# 3. إعداد متغيرات البيئة
cp .env.example .env

# 4. توليد عميل Prisma وإنشاء قاعدة البيانات
bun run db:generate
bun run db:push

# 5. (اختياري) ملء قاعدة البيانات ببيانات تجريبية
bun run db:seed

# 6. تشغيل خادم التطوير
bun run dev
```

افتح المتصفح على: **http://localhost:3000**

### أوامر متاحة

| الأمر | الوظيفة |
|------|---------|
| `bun run dev` | تشغيل خادم التطوير |
| `bun run build` | بناء نسخة الإنتاج |
| `bun run start` | تشغيل نسخة الإنتاج |
| `bun run lint` | فحص جودة الكود |
| `bun run db:generate` | توليد عميل Prisma |
| `bun run db:push` | مزامنة المخطط مع قاعدة البيانات |
| `bun run db:studio` | فتح Prisma Studio |

---

## 🌐 النشر على Railway | Deployment

هذا المشروع جاهز للنشر على [Railway](https://railway.com).

### خطوات النشر:

1. **ارفع المشروع على GitHub** (تم ✓)

2. **ادخل إلى Railway** واضغط **New Project → Deploy from GitHub repo**

3. **اختر مستودع المشروع**

4. **أضف متغيرات البيئة** في تبويب **Variables**:
   ```
   DATABASE_URL=file:./app.db
   NEXTAUTH_SECRET=<random-string>
   NEXTAUTH_URL=https://your-app.up.railway.app
   NODE_ENV=production
   ```
   > 💡 لإنشاء NEXTAUTH_SECRET: استخدم `openssl rand -base64 32`

5. **الإعدادات الافتراضية تعمل تلقائياً** بفضل `railway.json` — Nixpacks سيكتشف Next.js تلقائياً

6. **انتظر اكتمال البناء** (3-5 دقائق)

7. **افتح الرابط العام** الذي يوفره Railway ✨

### ملفات النشر المضمّنة:

- ✅ `railway.json` — إعدادات Railway الرسمية (V2 runtime)
- ✅ `.env.example` — نموذج متغيرات البيئة
- ✅ `postinstall` script في package.json (يولّد Prisma تلقائياً)
- ✅ `build` script يجمع بين `prisma generate` و `next build`

### 🔧 الترقية إلى PostgreSQL (موصى به للإنتاج)

SQLite لا يحتفظ بالبيانات بشكل دائم على Railway. للإنتاج:

1. **في Railway**: أضف plugin `PostgreSQL` (Add → Database → PostgreSQL)
2. **Railway سيضيف `DATABASE_URL` تلقائياً** في المتغيرات
3. **عدّل `prisma/schema.prisma`**:
   ```prisma
   datasource db {
     provider = "postgresql"  // بدلاً من sqlite
     url      = env("DATABASE_URL")
   }
   ```
4. **Commit و Push** — Railway سيعيد النشر تلقائياً مع PostgreSQL

---

## 🎨 نظام التصميم | Design System

### لوحة الألوان

| الدور | اللون | HEX |
|------|------|-----|
| خلفية (داكن) | أسود دافئ | `#0a0a0a` |
| خلفية (فاتح) | كريمي | `#FAF9F6` |
| أساسي | أسود فحمي | `#1C1917` |
| ذهبي | ذهبي زاهي | `#F59E0B` |
| برتقالي | برتقالي حار | `#D97706` |
| حدود | رمادي داكن | `#292524` |

### الخطوط

- **Amiri** — للعناوين والاقتباسات (خط عربي كلاسيكي)
- **Tajawal** — للنصوص الأساسية (خط عربي حديث)
- **Cairo** — احتياطي للواجهات

---

## 📋 صفحات الموقع | Pages

| الصفحة | المسار | الوصف |
|--------|--------|-------|
| الرئيسية | `/` | Hero + آخر المنشورات + الأقسام + الإحصائيات |
| الأرشيف | `/archive` | جميع النصوص مع Pagination |
| الأقسام | `/categories` | شبكة الأقسام الأدبية |
| قسم محدد | `/categories/[slug]` | نصوص قسم معين |
| الكتّاب | `/authors` | قائمة الكتّاب |
| الفعاليات | `/events` | فعاليات قادمة وسابقة |
| المجلة | `/magazine` | إصدارات المجلة الدورية |
| عن المؤسسة | `/about` | الرؤية والرسالة والقيم |
| تواصل معنا | `/contact` | نموذج تواصل + معلومات |
| البحث | `/search` | نتائج البحث |
| تفاصيل منشور | `/posts/[slug]` | صفحة قراءة المنشور |

---

## 🔐 متغيرات البيئة | Environment Variables

أنشئ ملف `.env` بناءً على `.env.example`:

```env
# قاعدة البيانات (SQLite افتراضياً، يمكن استخدام PostgreSQL)
DATABASE_URL="file:./app.db"

# NextAuth
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"

# بيئة التشغيل
NODE_ENV="development"
```

> 💡 **للإنتاج على Railway:** استخدم PostgreSQL بإضافة `DATABASE_URL=postgresql://...` وعدّل `prisma/schema.prisma` لتغيير `sqlite` إلى `postgresql`.

---

## 🧪 الحالة والاختبار | Status

- ✅ Lint: 0 أخطاء
- ✅ TypeScript: بدون أخطاء نوع
- ✅ تجاوب: تم اختباره على 375px / 768px / 1440px / 1920px
- ✅ الثيمات: فاتح + داكن يعملان
- ✅ RTL: مدعوم بالكامل
- ✅ SEO: Meta tags + OpenGraph
- ✅ Accessibility: Semantic HTML + ARIA

---

## 🤝 المساهمة | Contributing

المساهمات مرحب بها! اتبع الخطوات:

1. Fork المستودع
2. أنشئ فرع جديد: `git checkout -b feature/amazing-feature`
3. Commit التغييرات: `git commit -m 'Add amazing feature'`
4. Push للفرع: `git push origin feature/amazing-feature`
5. افتح Pull Request

---

## 📄 الترخيص | License

هذا المشروع مرخص تحت رخصة MIT — راجع ملف [LICENSE](LICENSE) للتفاصيل.

---

## 👥 الإسناد | Credits

- **التطوير:** مؤسسة المنى الإبداعية
- **التصميم:** مستوحى من التراث العربي والتصميم السينمائي
- **الخطوط:** [Google Fonts](https://fonts.google.com) — Amiri, Tajawal, Cairo
- **الأيقونات:** [Lucide](https://lucide.dev)
- **المكونات:** [shadcn/ui](https://ui.shadcn.com)

---

## 📞 التواصل | Contact

- 🌐 الموقع: [مؤسسة المنى الإبداعية](https://almuna.org)
- 📧 البريد: info@almuna.org
- 💬 للتبليغ عن مشاكل: [Issues](../../issues)

---

<div dir="rtl" align="center">

**صُنع بـ ❤️ وإبداع للمشهد الثقافي العربي**

</div>
