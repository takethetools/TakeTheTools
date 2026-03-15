import prisma from "../lib/db";
import { TOOLS, CATEGORIES } from "../lib/tools";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

async function migrate() {
  console.log("Starting migration...");

  try {
    // 1. Migrate Categories
    console.log("Migrating categories...");
    for (const cat of CATEGORIES) {
      await prisma.category.upsert({
        where: { slug: cat.slug },
        update: {
          name: cat.name,
          description: cat.description,
        },
        create: {
          id: cat.id,
          name: cat.name,
          slug: cat.slug,
          description: cat.description,
        },
      });
    }
    console.log(`Migrated ${CATEGORIES.length} categories.`);

    // 2. Migrate Tools
    console.log("Migrating tools...");
    for (const tool of TOOLS) {
      const category = await prisma.category.findUnique({
        where: { slug: CATEGORIES.find(c => c.id === tool.category)?.slug }
      });

      if (!category) {
        console.warn(`Category not found for tool: ${tool.name}`);
        continue;
      }

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
          componentName: tool.id
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
    }
    console.log(`Migrated ${TOOLS.length} tools.`);

    // 3. Migrate Blogs
    console.log("Migrating blogs...");
    const blogDir = path.join(process.cwd(), "src/content/blog");
    let blogsCount = 0;
    if (fs.existsSync(blogDir)) {
      const files = fs.readdirSync(blogDir);
      for (const file of files) {
        if (!file.endsWith(".md")) continue;

        const filePath = path.join(blogDir, file);
        const fileContent = fs.readFileSync(filePath, "utf8");
        const { data, content } = matter(fileContent);

        const slug = file.replace(".md", "");

        let categoryId = "";
        const catSlug = data.category?.toLowerCase() || "marketing-tools";
        const category = await prisma.category.findFirst({
          where: { slug: { contains: catSlug } }
        });

        if (category) {
          categoryId = category.id;
        } else {
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
            isPublished: true,
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
        blogsCount++;
      }
    }
    console.log(`Migrated ${blogsCount} blogs.`);

    // 4. Initialize Ads
    console.log("Initializing ad placements...");
    const placements = ["homepage", "tool", "blog", "sidebar", "header", "footer"];
    for (const loc of placements) {
      await prisma.adPlacement.upsert({
        where: { location: loc },
        update: {},
        create: {
          location: loc,
          isEnabled: true,
          adSlot: "3171595105", // From your current code
        }
      });
    }

    console.log("Migration completed successfully!");
  } catch (err) {
    console.error("Migration failed:", err);
  } finally {
    await prisma.$disconnect();
  }
}

migrate();

