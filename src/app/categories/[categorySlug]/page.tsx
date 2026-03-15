import prisma from "@/lib/db";
import Link from "next/link";
import { ArrowRight, ChevronRight, Home } from "lucide-react";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { Metadata } from "next";
import React from "react";
import ManualAdUnit from "@/components/common/ManualAdUnit";
import { generateCategoryMetaTitle, generateCategoryMetaDescription, SITE_URL, getBreadcrumbSchema } from "@/lib/seo";

export const dynamic = "force-dynamic";
export const dynamicParams = true;

export async function generateMetadata({ params }: { params: Promise<{ categorySlug: string }> }): Promise<Metadata> {
  const { categorySlug } = await params;
  const category = await prisma.category.findUnique({ where: { slug: categorySlug } });
  if (!category) return { title: "Category Not Found" };

  const title = generateCategoryMetaTitle(category.name);
  const description = generateCategoryMetaDescription(category.description || "");

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `${SITE_URL}/categories/${categorySlug}`,
      siteName: "TakeTheTools",
    },
    alternates: {
      canonical: `${SITE_URL}/categories/${categorySlug}`,
    },
  };
}

export async function generateStaticParams() {
  try {
    const categories = await prisma.category.findMany({ select: { slug: true } });
    return categories.map((category) => ({
      categorySlug: category.slug,
    }));
  } catch (error) {
    if (process.env.NODE_ENV !== 'production' || !String(error).includes('Unable to open the database file')) {
      console.warn("Failed to generate static params for categories:", error);
    }
    return [];
  }
}

export default async function CategoryPage({ params }: { params: Promise<{ categorySlug: string }> }) {
  const { categorySlug } = await params;
  const category = await prisma.category.findUnique({
    where: { slug: categorySlug },
    include: {
      tools: true
    }
  });

  if (!category) {
    return <div className="container mx-auto px-4 py-32 text-center">Category not found</div>;
  }

  const categoryTools = category.tools;

  return (
    <div className="pt-10 pb-20">
      <div className="container mx-auto px-4">
        <Breadcrumbs
          items={[
            { label: "Categories", href: "/categories" },
            { label: category.name }
          ]}
        />

        <div className="max-w-4xl mb-16">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-6 tracking-tight">
            {category.name}
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed">
            {category.description}
          </p>
        </div>

        {/* Header Ad */}
        <div className="mb-12 flex justify-center">
          <ManualAdUnit adSlot="3171595105" adFormat="auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryTools.map((tool) => (
            <Link
              key={tool.id}
              href={`/tools/${tool.slug}`}
              className="group p-6 bg-white rounded-2xl border border-slate-100 hover:border-primary-200 hover:shadow-xl hover:shadow-primary-100/20 transition-all"
            >
              <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-primary-600 transition-colors">
                {tool.name}
              </h3>
              <p className="text-slate-500 text-sm mb-6 leading-relaxed">
                {tool.description}
              </p>
              <div className="flex justify-between items-center text-primary-600 font-bold text-sm">
                <span>Try Tool</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          ))}

          {categoryTools.length === 0 && (
            <div className="col-span-full py-20 text-center bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
              <p className="text-slate-500">More tools for {category.name} are coming soon!</p>
            </div>
          )}
        </div>

        {/* Mid Ad */}
        <div className="mt-16 mb-16 flex justify-center">
          <ManualAdUnit adSlot="3171595105" adFormat="horizontal" />
        </div>

        {/* SEO Content Section */}
        <div className="mt-24 prose prose-slate max-w-none bg-slate-50 p-10 rounded-3xl border border-slate-100">
          <h2 className="text-2xl font-bold mb-6">Master Your Workflow with {category.name}</h2>
          <p className="text-slate-600 mb-4">
            Our comprehensive collection of **{category.name}** is meticulously crafted to empower digital professionals, students, and casual users alike. In today's fast-paced digital landscape, having the right tools at your fingertips is essential for efficiency and precision. We provide a robust suite of high-performance, web-based utilities that eliminate the need for cumbersome software installations or expensive subscriptions. Each tool in this category is optimized for speed, security, and ease of use, ensuring that you can complete your tasks in seconds.
          </p>
          <p className="text-slate-600 mb-4">
            From complex data transformations to simple file edits, our platform handles the heavy lifting directly in your browser. This means your data stays private and secure, never leaving your device. We are proud to serve a global community across the United States, United Kingdom, Canada, Australia, and throughout Europe. Our infrastructure is fine-tuned to deliver exceptionally fast response times, regardless of your geographic location, making us the go-to destination for reliable digital tools.
          </p>
          <p className="text-slate-600">
            Whether you are a developer looking to streamline your coding process, a marketer optimizing content for SEO, or an individual simply needing to convert a document, our {category.name} are here to help. Explore our full range of tools today and experience the power of professional-grade utilities, completely free. We are constantly updating our library based on user feedback to ensure we meet the evolving needs of the global tech community.
          </p>
        </div>
      </div>
      {/* Structured Data (JSON-LD) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            getBreadcrumbSchema([
              { name: "Home", item: SITE_URL },
              { name: "Categories", item: `${SITE_URL}/categories` },
              { name: category.name, item: `${SITE_URL}/categories/${categorySlug}` }
            ])
          )
        }}
      />
    </div>
  );
}
