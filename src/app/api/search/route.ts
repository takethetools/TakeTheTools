import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") || "";

  if (q.length < 2) {
    return NextResponse.json([]);
  }

  try {
    const tools = await prisma.tool.findMany({
      where: {
        OR: [
          { name: { contains: q } },
          { description: { contains: q } },
          { slug: { contains: q } }
        ]
      },
      take: 6,
      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
        categoryId: true
      }
    });

    return NextResponse.json(tools);
  } catch (error) {
    return NextResponse.json({ error: "Search failed" }, { status: 500 });
  }
}
