import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { TOOLS, CATEGORIES } from "@/lib/tools";
import { getSession } from "@/lib/auth";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const results = {
      categories: 0,
      tools: 0,
      blogs: 0,
    };

    // 1. Migrate Categories
    for (const cat of CATEGORIES) {
      await prisma.category.upsert({
        where: { slug: cat.slug },
        update: {
          name: cat.name,
          description: cat.description,
        },
        create: {
          id: cat.id, // Using the string ID from lib which matches our cuid-like expectations
          name: cat.name,
          slug: cat.slug,
          description: cat.description,
        },
      });
      results.categories++;
    }

    // 2. Migrate Tools
    for (const tool of TOOLS) {
      // Find category ID
      const category = await prisma.category.findUnique({
        where: { slug: CATEGORIES.find(c => c.id === tool.category)?.slug }
      });

      if (!category) continue;

      await prisma.tool.upsert({
        where: { slug: tool.slug },
        update: {
          name: tool.name,
          description: tool.description,
          longDescription: tool.longDescription,
          categoryId: category.id,
          metaTitle: tool.metaTitle,
          metaDescription: tool.metaDescription,
          iconName: tool.iconName,
          isPopular: tool.isPopular || false,
          instructions: JSON.stringify(tool.instructions),
          faqs: JSON.stringify(tool.faqs),
          exampleInput: tool.exampleInput,
          componentName: tool.id // Using tool.id as the component name reference
        },
        create: {
          name: tool.name,
          slug: tool.slug,
          description: tool.description,
          longDescription: tool.longDescription,
          categoryId: category.id,
          metaTitle: tool.metaTitle,
          metaDescription: tool.metaDescription,
          iconName: tool.iconName,
          isPopular: tool.isPopular || false,
          instructions: JSON.stringify(tool.instructions),
          faqs: JSON.stringify(tool.faqs),
          exampleInput: tool.exampleInput,
          componentName: tool.id
        },
      });
      results.tools++;
    }

    // 3. Migrate Blogs
    const blogDir = path.join(process.cwd(), "src/content/blog");
    if (fs.existsSync(blogDir)) {
      const files = fs.readdirSync(blogDir);
      for (const file of files) {
        if (!file.endsWith(".md")) continue;

        const filePath = path.join(blogDir, file);
        const fileContent = fs.readFileSync(filePath, "utf8");
        const { data, content } = matter(fileContent);

        const slug = file.replace(".md", "");

        // Find or create a default category if not specified
        // For blogs, we might just default to 'general' or match if possible
        let categoryId = "";
        const catSlug = data.category?.toLowerCase() || "marketing-tools"; // Default fallback
        const category = await prisma.category.findFirst({
          where: { slug: { contains: catSlug } }
        });

        if (category) {
          categoryId = category.id;
        } else {
          // Find first category as fallback
          const firstCat = await prisma.category.findFirst();
          categoryId = firstCat?.id || "";
        }

        await prisma.blog.upsert({
          where: { slug },
          update: {
            title: data.title || slug,
            categoryId,
            metaTitle: data.metaTitle || data.title,
            metaDescription: data.metaDescription || data.description,
            featuredImage: data.featuredImage || null,
            content: content,
            isPublished: true, // Existing files are published
            publishDate: data.date ? new Date(data.date) : new Date(),
          },
          create: {
            title: data.title || slug,
            slug,
            categoryId,
            metaTitle: data.metaTitle || data.title,
            metaDescription: data.metaDescription || data.description,
            featuredImage: data.featuredImage || null,
            content: content,
            isPublished: true,
            publishDate: data.date ? new Date(data.date) : new Date(),
          },
        });
        results.blogs++;
      }
    }

    return NextResponse.json({ success: true, results });
  } catch (error: any) {
    console.error("Migration error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
