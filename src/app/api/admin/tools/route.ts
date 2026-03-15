import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q") || "";
  const categoryId = searchParams.get("categoryId");

  try {
    const tools = await prisma.tool.findMany({
      where: {
        AND: [
          {
            OR: [
              { name: { contains: query } },
              { slug: { contains: query } },
            ],
          },
          categoryId ? { categoryId } : {},
        ],
      },
      include: {
        category: true,
      },
      orderBy: {
        name: "asc",
      },
    });

    return NextResponse.json(tools);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch tools" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const data = await req.json();
    const tool = await prisma.tool.create({
      data: {
        name: data.name,
        slug: data.slug,
        description: data.description,
        longDescription: data.longDescription,
        categoryId: data.categoryId,
        metaTitle: data.metaTitle,
        metaDescription: data.metaDescription,
        iconName: data.iconName,
        isPopular: data.isPopular || false,
        instructions: JSON.stringify(data.instructions),
        faqs: JSON.stringify(data.faqs),
        exampleInput: data.exampleInput,
        componentName: data.componentName,
      },
    });

    return NextResponse.json(tool);
  } catch (error: any) {
    if (error.code === 'P2002') {
      return NextResponse.json({ error: "Slug already exists" }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to create tool" }, { status: 500 });
  }
}
