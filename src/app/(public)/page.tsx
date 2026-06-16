import Link from "next/link";
import { Hero } from "@/components/public/hero";
import { PostGrid } from "@/components/public/post-grid";
import { prisma } from "@/lib/db";
import { ArrowLeft } from "lucide-react";

export const dynamic = "force-dynamic";

const MOCK_POSTS = [
  {
    id: "mock-1",
    slug: "wave-from-unseen",
    title: "تلويحة من شرفة الغيب",
    excerpt:
      "نص شعري ينسج من خيوط الغياب معطفاً للذكرى، حيث تتلاقى أطياف الماضي على شرفة الحنين وتتلاشى المسافات بين الحلم والواقع المتشظي.",
    body: "نص شعري ينسج من خيوط الغياب معطفاً للذكرى، حيث تتلاقى أطياف الماضي على شرفة الحنين وتتلاشى المسافات بين الحلم والواقع المتشظي.",
    publishedAt: new Date().toISOString(),
    viewCount: 1240,
    author: { id: "a1", name: "وسيم الزبيري", email: "" },
    category: { id: "c1", name: "شعر فصيح" },
    tags: [],
  },
  {
    id: "mock-2",
    slug: "echoes-of-silence",
    title: "أصداء الصمت في أروقة الروح",
    excerpt:
      "مقالة نقدية تتناول تجليات الصمت في الأدب، وكيف تحول الغياب إلى لغة تنطق بأعمق المشاعر الإنسانية.",
    body: "مقالة نقدية تتناول تجليات الصمت في الأدب، وكيف تحول الغياب إلى لغة تنطق بأعمق المشاعر الإنسانية.",
    publishedAt: new Date(Date.now() - 86400000).toISOString(),
    viewCount: 856,
    author: { id: "a2", name: "د. خالد القاضي", email: "" },
    category: { id: "c2", name: "نقد أدبي" },
    tags: [],
  },
  {
    id: "mock-3",
    slug: "shadows-of-light",
    title: "ظلال النور",
    excerpt:
      "قصة قصيرة تستكشف التناقضات النفسية لبطل يبحث عن هويته في مدينة لا تنام، حيث تختلط الأضواء بظلال الماضي العتيق.",
    body: "قصة قصيرة تستكشف التناقضات النفسية لبطل يبحث عن هويته في مدينة لا تنام، حيث تختلط الأضواء بظلال الماضي العتيق.",
    publishedAt: new Date(Date.now() - 172800000).toISOString(),
    viewCount: 2045,
    author: { id: "a3", name: "شذى المالكي", email: "" },
    category: { id: "c3", name: "القصة القصيرة" },
    tags: [],
  },
  {
    id: "mock-4",
    slug: "moonlit-whispers",
    title: "همسات تحت ضوء القمر",
    excerpt:
      "خاطرة شعرية تفيض رقة وعذوبة، تستحضر ليالي الصيف البعيدة وأحلام الطفولة التي رحلت مع أول خيوط الفجر.",
    body: "خاطرة شعرية تفيض رقة وعذوبة، تستحضر ليالي الصيف البعيدة وأحلام الطفولة التي رحلت مع أول خيوط الفجر.",
    publishedAt: new Date(Date.now() - 259200000).toISOString(),
    viewCount: 1532,
    author: { id: "a4", name: "أحمد الرويلي", email: "" },
    category: { id: "c4", name: "خاطرة" },
    tags: [],
  },
];

const MOCK_CATEGORIES = [
  { id: "c-1", slug: "poetry", name: "الشعر والفصاحة", _count: { posts: 142 } },
  { id: "c-2", slug: "prose", name: "النثر والقصة", _count: { posts: 86 } },
  { id: "c-3", slug: "critique", name: "دراسات نقدية", _count: { posts: 34 } },
  { id: "c-4", slug: "visual-arts", name: "الفن البصري", _count: { posts: 56 } },
];

async function getData() {
  try {
    const [recentPosts, categories, stats] = await Promise.all([
      prisma.post.findMany({
        where: { status: "PUBLISHED" },
        include: {
          author: { select: { id: true, name: true, email: true } },
          category: true,
          tags: { include: { tag: true } },
        },
        orderBy: { publishedAt: "desc" },
        take: 10,
      }),
      prisma.category.findMany({
        include: { _count: { select: { posts: true } } },
        orderBy: { sortOrder: "asc" },
      }),
      Promise.all([
        prisma.post.count({ where: { status: "PUBLISHED" } }),
        prisma.category.count(),
        prisma.user.count(),
      ]),
    ]);

    return {
      recentPosts: recentPosts.length > 0 ? recentPosts : MOCK_POSTS,
      categories: categories.length > 0 ? categories : MOCK_CATEGORIES,
      stats: stats[0] > 0 ? stats : [318, 12, 45],
    };
  } catch {
    return {
      recentPosts: MOCK_POSTS,
      categories: MOCK_CATEGORIES,
      stats: [318, 12, 45],
    };
  }
}

export default async function HomePage() {
  const { recentPosts, categories, stats } = await getData();
  const [postCount, categoryCount, authorCount] = stats;

  return (
    <>
      <Hero />

      {/* ===== قسم النصوص ===== */}
      <section
        className="relative py-12 sm:py-16 md:py-24 lg:py-28 gold-section overflow-hidden"
        data-reveal
      >
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <PostGrid posts={recentPosts as any} title="أحدث الإبداعات" showFeatured showImage />
        </div>
      </section>

      {/* الفاصل الانتقالي */}
      <div className="pattern-transition" />

      {/* ===== قسم الأقسام ===== */}
      <section className="relative py-12 sm:py-16 md:py-24 lg:py-28" data-reveal>
        <div className="absolute inset-0 arabesque-tessellation opacity-[0.025] pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-10 sm:mb-14 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="font-tajawal text-brand-gold text-xs font-bold tracking-[0.25em] uppercase mb-3 sm:mb-4 block">
                <span className="inline-flex items-center gap-3">
                  <span className="w-6 h-px bg-brand-gold/40" />
                  الفهرس الأدبي
                </span>
              </span>
              <h2 className="font-amiri text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--color-text-primary)] tracking-tight leading-tight">
                الأقسام
              </h2>
            </div>
            <Link
              href="/categories"
              className="group font-tajawal text-sm text-[var(--color-text-secondary)] hover:text-brand-gold transition-colors flex items-center gap-2"
            >
              <span>عرض الكل</span>
              <ArrowLeft className="w-4 h-4 block transition-transform duration-300 group-hover:-translate-x-1" />
            </Link>
          </div>

          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6"
            data-stagger
            data-stagger-delay="0.05"
          >
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/categories/${cat.slug}`}
                className="group relative p-6 sm:p-8 rounded-2xl border border-[var(--color-border)] bg-[var(--color-card-bg)] transition-all duration-500 hover:border-brand-gold/25 overflow-hidden card-islamic"
              >
                <div className="mb-6 sm:mb-8 w-10 h-10 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] flex items-center justify-center transition-all duration-500 group-hover:border-brand-gold/20 group-hover:bg-brand-gold/[0.05]">
                  <svg
                    className="w-5 h-5 text-brand-gold/60 group-hover:text-brand-gold transition-colors duration-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>

                <div className="font-amiri text-xl sm:text-2xl font-bold text-[var(--color-text-primary)] mb-2 sm:mb-3 transition-colors duration-500 group-hover:text-brand-gold">
                  {cat.name}
                </div>
                <div className="font-tajawal text-xs text-[var(--color-text-secondary)] font-medium tracking-wider">
                  {cat._count.posts} نص إبداعي
                </div>

                <div className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full bg-brand-gold/[0.04] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="pattern-transition pattern-transition-inverse" />

      {/* ===== قسم الإحصائيات ===== */}
      <section
        className="relative py-12 sm:py-16 md:py-24 lg:py-28 gold-section overflow-hidden"
        data-reveal
        data-reveal-y="60"
      >
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6">
          <div className="relative rounded-2xl border border-[var(--color-border)] bg-[var(--color-card-bg)] backdrop-blur-sm p-8 sm:p-10 md:p-14 lg:p-16 overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-brand-gold/[0.06] blur-3xl pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-y-8 sm:gap-y-0 sm:gap-x-8">
              <div className="text-center">
                <div className="font-tajawal text-[3rem] sm:text-[4rem] md:text-[5rem] font-light text-[var(--color-text-primary)] leading-none mb-2 sm:mb-3 tracking-tight">
                  {postCount}
                </div>
                <div className="text-[10px] sm:text-xs font-bold tracking-[0.25em] text-brand-gold uppercase">
                  نص منشور
                </div>
              </div>
              <div className="text-center sm:px-8 sm:border-x sm:border-[var(--color-border)]">
                <div className="font-tajawal text-[3rem] sm:text-[4rem] md:text-[5rem] font-light text-[var(--color-text-primary)] leading-none mb-2 sm:mb-3 tracking-tight">
                  {categoryCount}
                </div>
                <div className="text-[10px] sm:text-xs font-bold tracking-[0.25em] text-brand-gold uppercase">
                  قسم أدبي
                </div>
              </div>
              <div className="text-center">
                <div className="font-tajawal text-[3rem] sm:text-[4rem] md:text-[5rem] font-light text-[var(--color-text-primary)] leading-none mb-2 sm:mb-3 tracking-tight">
                  {authorCount}
                </div>
                <div className="text-[10px] sm:text-xs font-bold tracking-[0.25em] text-brand-gold uppercase">
                  كاتب مبدع
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
