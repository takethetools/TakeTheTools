import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { getSession } from "@/lib/auth";

interface Props {
  params: Promise<{ id: string }>;
}

export async function GET(req: NextRequest, { params }: Props) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;

  try {
    const tool = await prisma.tool.findUnique({
      where: { id },
      include: { category: true }
    });
    if (!tool) return NextResponse.json({ error: "Tool not found" }, { status: 404 });
    return NextResponse.json(tool);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch tool" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: Props) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;

  try {
    const data = await req.json();
    const tool = await prisma.tool.update({
      where: { id },
      data: {
        name: data.name,
        slug: data.slug,
        description: data.description,
        longDescription: data.longDescription,
        categoryId: data.categoryId,
        metaTitle: data.metaTitle,
        metaDescription: data.metaDescription,
        iconName: data.iconName,
        isPopular: data.isPopular,
        instructions: JSON.stringify(data.instructions),
        faqs: JSON.stringify(data.faqs),
        exampleInput: data.exampleInput,
        componentName: data.componentName,
      },
    });
    return NextResponse.json(tool);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: Props) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;

  try {
    await prisma.tool.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete tool" }, { status: 500 });
  }
}
