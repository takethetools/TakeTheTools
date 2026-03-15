import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q") || "";
  const status = searchParams.get("status");

  try {
    const blogs = await prisma.blog.findMany({
      where: {
        AND: [
          {
            OR: [
              { title: { contains: query } },
              { slug: { contains: query } },
            ],
          },
          status === "published" ? { isPublished: true } : 
          status === "draft" ? { isPublished: false } : {},
        ],
      },
      include: {
        category: true,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    return NextResponse.json(blogs);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await req.json();
    const blog = await prisma.blog.create({
      data: {
        title: data.title,
        slug: data.slug,
        categoryId: data.categoryId,
        metaTitle: data.metaTitle,
        metaDescription: data.metaDescription,
        featuredImage: data.featuredImage,
        content: data.content,
        isPublished: data.isPublished || false,
        publishDate: data.publishDate ? new Date(data.publishDate) : new Date(),
      },
    });

    return NextResponse.json(blog);
  } catch (error: any) {
    if (error.code === 'P2002') {
      return NextResponse.json({ error: "Slug already exists" }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to create blog" }, { status: 500 });
  }
}
