import { prisma } from "@/lib/db";

export default async function sitemap() {
  const baseUrl = "https://almuna.org";

  const posts = await prisma.post.findMany({
    where: { status: "PUBLISHED" },
    select: { slug: true, updatedAt: true },
  });

  const categories = await prisma.category.findMany({
    select: { slug: true },
  });

  const staticPages = [
    "", "/archive", "/categories", "/authors", "/events", "/magazine", "/contact",
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const postPages = posts.map((post) => ({
    url: `${baseUrl}/posts/${post.slug}`,
    lastModified: post.updatedAt,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const categoryPages = categories.map((cat) => ({
    url: `${baseUrl}/categories/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.5,
  }));

  return [...staticPages, ...postPages, ...categoryPages];
}
