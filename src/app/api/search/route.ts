import { NextRequest, NextResponse } from "next/server";
import { TOOLS } from "@/lib/tools";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = (searchParams.get("q") || "").toLowerCase();

  if (q.length < 2) {
    return NextResponse.json([]);
  }

  try {
    const results = TOOLS.filter(tool => 
      tool.name.toLowerCase().includes(q) || 
      tool.description.toLowerCase().includes(q) || 
      tool.slug.toLowerCase().includes(q)
    ).slice(0, 6).map(tool => ({
      id: tool.id,
      name: tool.name,
      slug: tool.slug,
      description: tool.description,
      categoryId: tool.category
    }));

    return NextResponse.json(results);
  } catch (error) {
    console.error("Search API error:", error);
    return NextResponse.json({ error: "Search failed" }, { status: 500 });
  }
}
