import { MetadataRoute } from "next";
import prisma from "@/lib/db";
import { getAllPSEORoutes } from "@/lib/pseo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://takethetools.com";

  // Core pages
  const routes = ["", "/blog", "/categories"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 1.0,
  }));

  try {
    // Fetch data from DB
    const [tools, categories, posts] = await Promise.all([
      prisma.tool.findMany({ select: { slug: true, updatedAt: true } }),
      prisma.category.findMany({ select: { slug: true } }),
      prisma.blog.findMany({
        where: { isPublished: true },
        select: { slug: true, publishDate: true, updatedAt: true }
      })
    ]);

    // Tool pages
    const toolRoutes = tools.map((tool) => ({
      url: `${baseUrl}/tools/${tool.slug}`,
      lastModified: tool.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    }));

    // Categories
    const categoryRoutes = categories.map((cat) => ({
      url: `${baseUrl}/categories/${cat.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));

    // PSEO pages
    const pseoRoutes = getAllPSEORoutes().map((slug) => ({
      url: `${baseUrl}/${slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.5,
    }));

    // Blog posts
    const blogRoutes = posts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

    return [...routes, ...toolRoutes, ...categoryRoutes, ...pseoRoutes, ...blogRoutes];
  } catch (error) {
    console.error("Failed to generate extended sitemap during build:", error);
    return routes;
  }
}
