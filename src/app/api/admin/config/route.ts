import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type"); // 'config' or 'ads'

  try {
    if (type === "config") {
      let config = await prisma.globalConfig.findFirst();
      if (!config) {
        config = await prisma.globalConfig.create({
          data: { id: "default" }
        });
      }
      return NextResponse.json(config);
    } else if (type === "ads") {
      const ads = await prisma.adPlacement.findMany();
      return NextResponse.json(ads);
    }
    return NextResponse.json({ error: "Invalid type" }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");

  try {
    const data = await req.json();
    if (type === "config") {
      const config = await prisma.globalConfig.upsert({
        where: { id: "default" },
        update: {
          siteName: data.siteName,
          siteDescription: data.siteDescription,
          metaTitle: data.metaTitle,
          metaDescription: data.metaDescription,
          ogImage: data.ogImage,
          analyticsId: data.analyticsId,
          twitterHandle: data.twitterHandle,
          adSenseId: data.adSenseId,
        },
        create: {
          id: "default",
          siteName: data.siteName,
          siteDescription: data.siteDescription,
          metaTitle: data.metaTitle,
          metaDescription: data.metaDescription,
          ogImage: data.ogImage,
          analyticsId: data.analyticsId,
          twitterHandle: data.twitterHandle,
          adSenseId: data.adSenseId,
        },
      });
      return NextResponse.json(config);
    } else if (type === "ads") {
      const ad = await prisma.adPlacement.update({
        where: { id: data.id },
        data: {
          isEnabled: data.isEnabled,
          adSlot: data.adSlot,
          adFormat: data.adFormat,
        },
      });
      return NextResponse.json(ad);
    }
    return NextResponse.json({ error: "Invalid type" }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update data" }, { status: 500 });
  }
}
