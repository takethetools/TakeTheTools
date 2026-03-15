import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: "asc" }
    });
    return NextResponse.json(categories);
  } catch (error) {
    console.error("Database error in categories GET:", error);
    return NextResponse.json({ error: "Database connection failed while fetching categories" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const data = await req.json();
    const category = await prisma.category.create({
      data: {
        id: data.slug, // Use slug as ID for simplicity or generate one
        name: data.name,
        slug: data.slug,
        description: data.description,
      },
    });
    return NextResponse.json(category);
  } catch (error: any) {
    if (error.code === 'P2002') {
      return NextResponse.json({ error: "Slug already exists" }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to create category" }, { status: 500 });
  }
}
