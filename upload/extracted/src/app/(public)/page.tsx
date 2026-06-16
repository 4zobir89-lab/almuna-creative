import Link from "next/link";
import { prisma } from "@/lib/db";
import { Hero } from "@/components/public/hero";
import { PostGrid } from "@/components/public/post-grid";

export const dynamic = "force-dynamic";

const MOCK_POSTS = [
  {
    id: "mock-1", slug: "wave-from-unseen", title: "تلويحة من شرفة الغيب", 
    excerpt: "نص شعري ينسج من خيوط الغياب معطفاً للذكرى، حيث تتلاقى أطياف الماضي على شرفة الحنين وتتلاشى المسافات بين الحلم والواقع المتشظي.", 
    publishedAt: new Date().toISOString(), viewCount: 1240, 
    author: { name: "وسيم الزبيري", email: "" }, category: { name: "شعر فصيح" }, tags: []
  },
  {
    id: "mock-2", slug: "echoes-of-silence", title: "أصداء الصمت في أروقة الروح", 
    excerpt: "مقالة نقدية تتناول تجليات الصمت في الأدب، وكيف تحول الغياب إلى لغة تنطق بأعمق المشاعر الإنسانية.", 
    publishedAt: new Date(Date.now() - 86400000).toISOString(), viewCount: 856, 
    author: { name: "د. خالد القاضي", email: "" }, category: { name: "نقد أدبي" }, tags: []
  },
  {
    id: "mock-3", slug: "shadows-of-light", title: "ظلال النور", 
    excerpt: "قصة قصيرة تستكشف التناقضات النفسية لبطل يبحث عن هويته في مدينة لا تنام، حيث تختلط الأضواء بظلال الماضي العتيق.", 
    publishedAt: new Date(Date.now() - 172800000).toISOString(), viewCount: 2045, 
    author: { name: "شذى", email: "" }, category: { name: "القصة القصيرة" }, tags: []
  }
];

const MOCK_CATEGORIES = [
  { id: "c-1", slug: "poetry", name: "الشعر والفصاحة", _count: { posts: 142 } },
  { id: "c-2", slug: "prose", name: "النثر والقصة", _count: { posts: 86 } },
  { id: "c-3", slug: "critique", name: "دراسات نقدية", _count: { posts: 34 } },
  { id: "c-4", slug: "visual-arts", name: "الفن البصري", _count: { posts: 56 } }
];

async function getData() {
  try {
    const [recentPosts, categories, stats] = await Promise.all([
      prisma.post.findMany({
        where: { status: "PUBLISHED" },
        include: { author: { select: { id: true, name: true, email: true } }, category: true, tags: { include: { tag: true } } },
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
      stats: stats[0] > 0 ? stats : [318, 12, 45] 
    };
  } catch {
    return { recentPosts: MOCK_POSTS, categories: MOCK_CATEGORIES, stats: [318, 12, 45] };
  }
}

export default async function HomePage() {
  const { recentPosts, categories, stats } = await getData();
  const [postCount, categoryCount, authorCount] = stats;

  return (
    <>
      <Hero />

      {/* ===== قسم النصوص — خلفية ذهبية ===== */}
      <section className="relative py-16 md:py-28 gold-section overflow-hidden" data-reveal>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <PostGrid posts={recentPosts as any} title="أحدث الإبداعات" showFeatured showImage />
        </div>
      </section>

      {/* الفاصل الانتقالي */}
      <div className="pattern-transition" />

      {/* ===== قسم الأقسام ===== */}
      <section className="relative py-16 md:py-28" data-reveal>
        <div className="absolute inset-0 arabesque-tessellation opacity-[0.025] pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          
          <div className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="font-tajawal text-brand-gold/70 text-xs font-bold tracking-[0.25em] uppercase mb-4 block">
                <span className="inline-flex items-center gap-3">
                  <span className="w-6 h-px bg-brand-gold/40" />
                  الفهرس الأدبي
                </span>
              </span>
              <h2 className="font-amiri text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
                الأقسام
              </h2>
            </div>
            <Link href="/categories" className="group font-tajawal text-sm text-ink-400 hover:text-brand-gold transition-colors flex items-center gap-2">
              <span>عرض الكل</span>
              <span className="block transition-transform duration-300 group-hover:-translate-x-1">←</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6" data-stagger data-stagger-delay="0.05">
            {categories.map((cat, idx) => (
              <Link
                key={cat.id}
                href={`/categories/${cat.slug}`}
                className="group relative p-8 rounded-2xl border border-white/[0.04] bg-gradient-to-b from-ink-950/80 to-ink-950/40 transition-all duration-500 hover:border-brand-gold/25 overflow-hidden card-islamic"
              >
                <div className="mb-8 w-10 h-10 rounded-lg border border-white/[0.04] bg-ink-900/50 flex items-center justify-center transition-all duration-500 group-hover:border-brand-gold/20 group-hover:bg-brand-gold/[0.05]">
                  <svg className="w-5 h-5 text-brand-gold/60 group-hover:text-brand-gold transition-colors duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>

                <div className="font-amiri text-2xl font-bold text-white mb-3 transition-colors duration-500 group-hover:text-brand-gold">
                  {cat.name}
                </div>
                <div className="font-tajawal text-xs text-ink-500 font-medium tracking-wider">
                  {cat._count.posts} نص إبداعي
                </div>

                <div className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full bg-brand-gold/[0.04] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="pattern-transition pattern-transition-inverse" />

      {/* ===== قسم الإحصائيات — خلفية ذهبية ===== */}
      <section className="relative py-16 md:py-28 gold-section overflow-hidden" data-reveal data-reveal-y="60">
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6">
          <div className="relative rounded-2xl border border-white/[0.06] bg-black/30 backdrop-blur-sm p-10 md:p-16 overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-brand-gold/[0.06] blur-3xl pointer-events-none" />
            
            <div className="absolute top-0 right-0 w-16 h-16 opacity-20">
              <svg viewBox="0 0 64 64" className="w-full h-full text-brand-gold" aria-hidden="true">
                <path d="M4 60 L4 4 L60 4" fill="none" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </div>
            <div className="absolute bottom-0 left-0 w-16 h-16 opacity-20">
              <svg viewBox="0 0 64 64" className="w-full h-full text-brand-gold" aria-hidden="true">
                <path d="M60 4 L60 60 L4 60" fill="none" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </div>
            
            <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-y-10 sm:gap-y-0 divide-y sm:divide-y-0 sm:divide-x sm:divide-x-reverse divide-white/[0.06]">
              <div className="text-center">
                <div className="font-tajawal text-[4rem] md:text-[5rem] font-light text-white leading-none mb-3 tracking-tight">
                  {postCount}
                </div>
                <div className="text-[10px] md:text-xs font-bold tracking-[0.25em] text-brand-gold/80 uppercase">نص منشور</div>
              </div>
              <div className="text-center sm:px-8">
                <div className="font-tajawal text-[4rem] md:text-[5rem] font-light text-white leading-none mb-3 tracking-tight">
                  {categoryCount}
                </div>
                <div className="text-[10px] md:text-xs font-bold tracking-[0.25em] text-brand-gold/80 uppercase">قسم أدبي</div>
              </div>
              <div className="text-center">
                <div className="font-tajawal text-[4rem] md:text-[5rem] font-light text-white leading-none mb-3 tracking-tight">
                  {authorCount}
                </div>
                <div className="text-[10px] md:text-xs font-bold tracking-[0.25em] text-brand-gold/80 uppercase">كاتب مبدع</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
