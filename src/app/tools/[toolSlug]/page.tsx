import prisma from "@/lib/db";
import ManualAdUnit from "@/components/common/ManualAdUnit";
import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Home, Share2, HelpCircle, ArrowRight, CheckCircle2 } from "lucide-react";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import React from "react";
import { getToolAboutContent } from "@/lib/tool-content";
import { MDXRemote } from "next-mdx-remote/rsc";
import ToolRenderer from "@/components/tools/ToolRenderer";
import { generateToolMetaTitle, generateToolMetaDescription, SITE_URL } from "@/lib/seo";
import { getSoftwareApplicationSchema, getBreadcrumbSchema, getFAQSchema } from "@/lib/seo";

export const dynamic = "force-dynamic";
export const dynamicParams = true;

interface Props {
  params: Promise<{ toolSlug: string }>;
}

export async function generateStaticParams() {
  try {
    const tools = await prisma.tool.findMany({ select: { slug: true } });
    return tools.map((tool) => ({
      toolSlug: tool.slug,
    }));
  } catch (error) {
    if (process.env.NODE_ENV !== 'production' ||
      (!String(error).includes('Unable to open the database file') &&
        !String(error).includes('PrismaClientKnownRequestError'))) {
      console.warn("Failed to generate static params for tools:", error);
    }
    return [];
  }
}

async function getTool(slug: string) {
  const tool = await prisma.tool.findUnique({
    where: { slug },
    include: { category: true }
  });

  if (!tool) return null;

  // Parse JSON strings from SQLite
  return {
    ...tool,
    instructions: JSON.parse(tool.instructions as string) as string[],
    faqs: JSON.parse(tool.faqs as string) as { question: string; answer: string }[],
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { toolSlug } = await params;
  const tool = await getTool(toolSlug);
  if (!tool) return { title: "Tool Not Found" };

  const title = tool.metaTitle || generateToolMetaTitle(tool.name);
  const description = tool.metaDescription || generateToolMetaDescription(tool as any);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `${SITE_URL}/tools/${toolSlug}`,
      siteName: "TakeTheTools",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: `${SITE_URL}/tools/${toolSlug}`,
    },
  };
}

export default async function ToolPage({ params }: Props) {
  const { toolSlug } = await params;
  const tool = await getTool(toolSlug);

  if (!tool) {
    return <div className="container mx-auto px-4 py-32 text-center">Tool not found</div>;
  }

  const aboutContent = getToolAboutContent(toolSlug);

  // Related tools (same category, different tool)
  const relatedTools = await prisma.tool.findMany({
    where: {
      categoryId: tool.categoryId,
      NOT: { id: tool.id }
    },
    take: 3
  });

  // Dynamic application category for schema
  const applicationCategoryMap: Record<string, string> = {
    "image": "MultimediaApplication",
    "pdf": "MultimediaApplication",
    "developer": "DeveloperApplication",
    "text": "UtilitiesApplication",
    "converter": "MultimediaApplication",
    "math": "UtilitiesApplication",
    "marketing": "UtilitiesApplication",
    "security": "SecurityApplication"
  };

  return (
    <div className="pt-10 pb-20">
      <div className="container mx-auto px-4">
        <Breadcrumbs
          items={[
            { label: "Tools", href: "/categories" },
            { label: tool.name }
          ]}
        />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Main Content Area */}
          <div className="lg:col-span-3">
            <div className="mb-10">
              <h1 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-6 tracking-tight">
                {tool.name} Online
              </h1>
              <div className="text-xl text-slate-600 leading-relaxed max-w-4xl mb-8">
                {tool.longDescription || tool.description}
                {(!tool.longDescription || tool.longDescription.length < 200) && (
                  <p className="mt-4">
                    Our free {tool.name.toLowerCase()} tool is designed to provide high-performance results directly in your browser.
                    Whether you are a developer, designer, or casual user, this utility ensures your tasks are completed with
                    precision and speed. Explore the features below and optimize your workflow today with TakeTheTools.
                  </p>
                )}
              </div>
            </div>

            {/* Ad Unit — Inline Top */}
            <div className="flex justify-center mb-8">
              <ManualAdUnit adSlot="3171595105" adFormat="auto" />
            </div>

            {/* Tool Interaction Area */}
            <div className="mb-12">
              <ToolRenderer toolId={tool.componentName || tool.id} exampleInput={tool.exampleInput || ""} />
            </div>

            {/* Ad Unit — After Tool */}
            <div className="flex justify-center mb-12">
              <ManualAdUnit adSlot="3171595105" adFormat="horizontal" />
            </div>


            {/* Extended About Content Section */}
            {aboutContent && (
              <div className="mb-16 pt-16 border-t border-slate-100">
                <div className="prose prose-slate prose-lg max-w-none 
                  prose-headings:font-display prose-headings:font-bold 
                  prose-h2:text-3xl prose-h2:mb-8 prose-h2:mt-12
                  prose-p:text-slate-600 prose-p:leading-relaxed prose-p:mb-6
                  prose-a:text-primary-600 prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-slate-900
                  prose-ul:list-disc prose-ul:pl-6
                  prose-ol:list-decimal prose-ol:pl-6
                  prose-li:text-slate-600 prose-li:mb-2"
                >
                  <MDXRemote source={aboutContent} components={{ ManualAdUnit }} />
                </div>
              </div>
            )}

            {/* Ad Unit — Between Content Sections */}
            <div className="flex justify-center mb-12">
              <ManualAdUnit adSlot="3171595105" adFormat="auto" />
            </div>

            {/* Instructions Section — Enhanced with Ad */}
            <div className="mb-16">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <CheckCircle2 className="w-6 h-6 text-primary-600" />
                How to use {tool.name}
              </h2>
              <div className="flex justify-center mb-8">
                <ManualAdUnit adSlot="3171595105" adFormat="horizontal" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {(tool.instructions as string[]).map((step, index) => (
                  <div key={index} className="p-6 bg-slate-50 rounded-2xl border border-slate-100 relative">
                    <span className="absolute -top-4 -left-4 w-10 h-10 bg-white border-4 border-slate-50 rounded-full flex items-center justify-center font-bold text-primary-600 shadow-sm">
                      {index + 1}
                    </span>
                    <p className="text-slate-700 font-medium">{step}</p>
                  </div>
                ))}
              </div>
            </div>


            {/* FAQ Section */}
            <div className="mb-16">
              <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-2">
                <HelpCircle className="w-6 h-6 text-primary-600" />
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {(tool.faqs as any[]).map((faq, index) => (
                  <div key={index} className="bg-white border border-slate-100 rounded-2xl p-6">
                    <h3 className="font-bold text-slate-900 mb-3">{faq.question}</h3>
                    <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Area */}
          <div className="lg:col-span-1 space-y-8">

            {/* Sidebar Ad Unit */}
            <ManualAdUnit adSlot="3171595105" adFormat="rectangle" />

            {/* Related Tools Card */}
            <div className="bg-slate-900 text-white rounded-[2rem] p-8 shadow-xl shadow-slate-200">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Share2 className="w-5 h-5 text-primary-400" />
                Related Tools
              </h3>
              <div className="space-y-4">
                {relatedTools.map(t => (
                  <Link
                    key={t.id}
                    href={`/tools/${t.slug}`}
                    className="group block p-4 bg-slate-800/50 rounded-2xl hover:bg-primary-600/20 border border-slate-700 hover:border-primary-500/50 transition-all"
                  >
                    <h4 className="font-bold text-sm mb-1 group-hover:text-primary-400 transition-colors">{t.name}</h4>
                    <p className="text-slate-400 text-xs group-hover:text-slate-300 line-clamp-1">{t.description}</p>
                  </Link>
                ))}
                {relatedTools.length === 0 && (
                  <p className="text-slate-500 text-sm italic">Stay tuned for more tools!</p>
                )}
              </div>
              <Link href="/categories" className="mt-8 flex items-center justify-center gap-2 py-3 bg-slate-800 rounded-xl text-primary-400 font-bold text-sm group hover:bg-slate-700 transition-all">
                Browse all tools <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Sticky Sidebar Ad */}
            <div className="sticky top-28">
              <ManualAdUnit adSlot="3171595105" adFormat="rectangle" />
            </div>
          </div>
        </div>
      </div>

      {/* Structured Data (JSON-LD) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            getSoftwareApplicationSchema(tool as any, applicationCategoryMap),
            getBreadcrumbSchema([
              { name: "Home", item: SITE_URL },
              { name: "Tools", item: `${SITE_URL}/categories` },
              { name: tool.name, item: `${SITE_URL}/tools/${toolSlug}` }
            ]),
            getFAQSchema(tool.faqs as any)
          ])
        }}
      />
    </div>
  );
}
