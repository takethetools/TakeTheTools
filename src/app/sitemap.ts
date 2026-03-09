import { MetadataRoute } from "next";
import { TOOLS } from "@/lib/tools";
import { getSortedPostsData } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://takethetools.com";

  // Core pages
  const routes = ["", "/blog"].map((route) => ({
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

  // Categories (Need to extract unique categories)
  const categories = Array.from(new Set(TOOLS.map((t) => t.category)));
  const categoryRoutes = categories.map((cat) => ({
    url: `${baseUrl}/categories/${cat}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  // Blog posts
  const blogRoutes = getSortedPostsData().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...routes, ...toolRoutes, ...categoryRoutes, ...blogRoutes];
}
