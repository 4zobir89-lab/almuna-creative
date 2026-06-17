import { Hero } from "@/components/public/hero";
import { StatsSection } from "@/components/public/stats-section";
import { QuoteSection } from "@/components/public/quote-section";
import { CategoriesSection } from "@/components/public/categories-section";
import { LatestPostsSection } from "@/components/public/latest-posts-section";

export const dynamic = "force-dynamic";

const MOCK_POSTS = [
  {
    id: "mock-1",
    slug: "wave-from-unseen",
    title: "تلويحة من شرفة الغيب",
    excerpt:
      "نص شعري ينسج من خيوط الغياب معطفاً للذكرى، حيث تتلاقى أطياف الماضي على شرفة الحنين وتتلاشى المسافات بين الحلم والواقع المتشظي.",
    body: "نص شعري ينسج من خيوط الغياب معطفاً للذكرى.",
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
      "مقالة نقدية تتناول تجليات الصمت في الأدب، وكيف تحوّل الغياب إلى لغة تنطق بأعمق المشاعر الإنسانية.",
    body: "مقالة نقدية تتناول تجليات الصمت في الأدب.",
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
    body: "قصة قصيرة تستكشف التناقضات النفسية.",
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
    body: "خاطرة شعرية تفيض رقة وعذوبة.",
    publishedAt: new Date(Date.now() - 259200000).toISOString(),
    viewCount: 1532,
    author: { id: "a4", name: "أحمد الرويلي", email: "" },
    category: { id: "c4", name: "خاطرة" },
    tags: [],
  },
];

export default async function HomePage() {
  return (
    <>
      <Hero />

      {/* Quote section — parallax + word-by-word reveal */}
      <QuoteSection />

      {/* Fleuron divider */}
      <div className="fleuron">
        <span className="fleuron-icon">✦</span>
      </div>

      {/* Latest Posts — hanging header style */}
      <LatestPostsSection posts={MOCK_POSTS as any} />

      {/* Categories — with hover transformations */}
      <CategoriesSection />

      {/* Stats — dramatic presentation */}
      <StatsSection />
    </>
  );
}
