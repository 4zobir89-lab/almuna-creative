import { prisma } from "@/lib/db";
import { formatDate, calculateReadingTime } from "@/lib/utils";
import { PostBody } from "@/components/public/post-body";
import { ViewCounter } from "@/components/public/view-counter";
import { ShareButtons } from "@/components/public/share-buttons";
import { FavoriteButton } from "@/components/public/favorite-button";
import { ReadingControls } from "@/components/public/reading-controls";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Clock, Eye, Calendar, User } from "lucide-react";

export const dynamic = "force-dynamic";

const FALLBACK_POST = {
  id: "fallback",
  slug: "fallback",
  title: "تلويحة من شرفة الغيب",
  body: `<p>على شرفة الغيبِ وقفتُ، أرقبُ طلائمَ الفجرِ وهي تتسللُ من خلفِ التلال. كان النسيمُ يحملُ همساتِ الزمنِ، يوزّعها على الجدرانِ العتيقة كأنها أسرارٌ لا تُقال.</p>
<p>غيبٌ يلوّحُ، وذاكرةٌ تنحني تحتَ ثقلِ الحنين، وأنا بينهما كطيفٍ لا يُدركُ نفسه. قلتُ: يا ليلُ، أَطلْ سراحَ نجومكَ، فلعلّ منها ما يهتدي إلى ثغرٍ غابَ، أو يدٍ رحلت.</p>
<blockquote>والبينُ يضحكُ في الظلامِ، حيناً... ويعودُ يبكي حينَ يقرعُ بابنا</blockquote>
<p>هكذا تُولدُ القصيدةُ من رحمِ الفراغ، تلويحةً من شرفةٍ لا ندري أين تقع، سوى أننا نجلسُ على عتبتها كل ليلة، ننتظرُ ما لا يأتي.</p>
<p>في الصباحِ التالي، عدتُ إلى الشرفة. كان الضوءُ قد تغيّر، والنسيمُ يحملُ رائحةً أخرى. سألتُ الجدرانَ: أينَ أمسِ؟ فأجابتني بصمتٍ يفهمه القلب.</p>
<p>هكذا هي الأشياءُ الجميلة: تمرُّ كالحلم، ولا تتركُ إلا أثراً خفيفاً كلمسةِ ريحٍ على وجهِ نائم.</p>`,
  excerpt: "نص شعري ينسج من خيوط الغياب معطفاً للذكرى",
  publishedAt: new Date().toISOString(),
  createdAt: new Date(),
  viewCount: 1240,
  author: {
    id: "1",
    name: "وسيم الزبيري",
    bio: "شاعر وكاتب يمني، مؤسس مؤسسة المنى الإبداعية. يكتب في الشعر الفصيح والنثر الأدبي.",
  },
  category: { id: "1", name: "شعر فصيح", slug: "poetry" },
  tags: [
    { tag: { id: "t1", name: "شعر" } },
    { tag: { id: "t2", name: "حنين" } },
  ],
};

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  try {
    const post = await prisma.post.findUnique({
      where: { slug, status: "PUBLISHED" },
      select: { title: true, excerpt: true },
    });
    if (!post) return { title: "غير موجود" };
    return {
      title: post.title,
      description: post.excerpt || `نص: ${post.title}`,
      openGraph: {
        title: post.title,
        description: post.excerpt || undefined,
        type: "article",
      },
    };
  } catch {
    return { title: "نص تجريبي" };
  }
}

export default async function PostPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;

  let post: any = null;
  try {
    post = await prisma.post.findUnique({
      where: { slug, status: "PUBLISHED" },
      include: {
        author: { select: { id: true, name: true, bio: true } },
        category: true,
        tags: { include: { tag: true } },
      },
    });
  } catch {
    post = null;
  }

  if (!post) {
    post = { ...FALLBACK_POST, slug } as any;
  }

  return (
    <>
      {/* Header — editorial pacing, generous whitespace */}
      <section className="relative pt-32 pb-12 px-6 sm:px-8">
        <ViewCounter postId={post.id} />

        <div className="mx-auto max-w-3xl text-center">
          <Link
            href="/archive"
            className="inline-flex items-center gap-2 mb-10 text-sm text-[var(--color-text-secondary)] hover:text-[var(--accent)] transition-colors group"
          >
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            <span>العودة للأرشيف</span>
          </Link>

          {post.category && (
            <Link
              href={`/categories/${post.category.slug}`}
              className="inline-block text-sm text-[var(--accent)] font-medium mb-6 hover:underline"
            >
              {post.category.name}
            </Link>
          )}

          {/* Display — dramatic scale, generous space around */}
          <h1 className="font-amiri text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-[var(--color-text-primary)] mb-6">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="font-amiri text-lg sm:text-xl text-[var(--color-text-secondary)] leading-relaxed mb-8 max-w-2xl mx-auto">
              {post.excerpt}
            </p>
          )}

          {/* Meta — minimal */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-[var(--color-text-tertiary)] mb-8">
            <span className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5" />
              {post.author.name || "كاتب غير معروف"}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {formatDate(post.publishedAt || (post.createdAt as any))}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {calculateReadingTime(post.body)}
            </span>
            <span className="flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5" />
              {post.viewCount} قراءة
            </span>
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {post.tags.map(({ tag }: { tag: { id: string; name: string } }) => (
                <span
                  key={tag.id}
                  className="px-3 py-1 rounded text-xs text-[var(--color-text-tertiary)] bg-[var(--doppel-bg)]"
                >
                  #{tag.name}
                </span>
              ))}
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <ShareButtons title={post.title} slug={post.slug} />
            <FavoriteButton postId={post.id} postTitle={post.title} />
          </div>
        </div>
      </section>

      {/* Body — editorial prose, 65ch max-width, no justify */}
      <section className="relative border-t border-[var(--color-border)]">
        <div className="mx-auto max-w-3xl px-6 sm:px-8 py-12 sm:py-16">
          <PostBody content={post.body} />
        </div>
      </section>

      {/* Author card — restrained */}
      <section className="relative border-t border-[var(--color-border)] bg-[var(--section-alt)]">
        <div className="mx-auto max-w-3xl px-6 sm:px-8 py-12">
          <div className="text-center">
            <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--doppel-bg)] text-xl font-amiri font-bold text-[var(--accent)]">
              {(post.author.name || "?").charAt(0)}
            </div>
            <p className="font-amiri text-lg font-bold text-[var(--color-text-primary)] mb-1">
              {post.author.name || "كاتب"}
            </p>
            {post.author.bio && (
              <p className="mx-auto max-w-md text-sm leading-relaxed text-[var(--color-text-secondary)]">
                {post.author.bio}
              </p>
            )}
          </div>
        </div>
      </section>

      <ReadingControls />
    </>
  );
}
