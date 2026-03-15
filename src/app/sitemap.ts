import { MetadataRoute } from "next";
import { TOOLS, CATEGORIES } from "@/lib/tools";
import { getSortedPostsData } from "@/lib/blog";
import { getAllPSEORoutes } from "@/lib/pseo";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://takethetools.com";

  // Core pages
  const routes = ["", "/blog", "/categories"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 1.0,
  }));

  // Tool pages
  const toolRoutes = TOOLS.map((tool) => ({
    url: `${baseUrl}/tools/${tool.slug}`,
    lastModified: new Date(),
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
  const blogRoutes = getSortedPostsData().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...routes, ...toolRoutes, ...categoryRoutes, ...pseoRoutes, ...blogRoutes];
}
