import { MetadataRoute } from "next";
import { TOOLS, CATEGORIES } from "@/lib/tools";
import { getAllPosts } from "@/lib/blog-utils";
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
    const posts = await getAllPosts();

    // Tool pages
    const toolRoutes = TOOLS.map((tool) => ({
      url: `${baseUrl}/tools/${tool.slug}`,
      lastModified: new Date(), // Using new Date() as static tools don't have updatedAt
      changeFrequency: "weekly" as const,
      priority: 0.9,
    }));

    // Categories
    const categoryRoutes = CATEGORIES.map((cat) => ({
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
      lastModified: new Date(post.publishDate),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

    return [...routes, ...toolRoutes, ...categoryRoutes, ...pseoRoutes, ...blogRoutes];
  } catch (error) {
    console.warn("Failed to generate extended sitemap during build:", error);
    return routes;
  }
}
