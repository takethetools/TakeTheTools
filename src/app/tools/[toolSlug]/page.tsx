import { getToolBySlug, TOOLS } from "@/lib/tools";
import ManualAdUnit from "@/components/common/ManualAdUnit";
import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Home, Share2, HelpCircle, ArrowRight, CheckCircle2 } from "lucide-react";
import React from "react";
import { getToolAboutContent } from "@/lib/tool-content";
import { MDXRemote } from "next-mdx-remote/rsc";
import ToolRenderer from "@/components/tools/ToolRenderer";

export const dynamic = "force-static";
export const dynamicParams = false;

interface Props {
  params: Promise<{ toolSlug: string }>;
}


export async function generateStaticParams() {
  return TOOLS.map((tool) => ({
    toolSlug: tool.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { toolSlug } = await params;
  const tool = getToolBySlug(toolSlug);
  if (!tool) return { title: "Tool Not Found" };

  return {
    title: tool.metaTitle,
    description: tool.metaDescription,
    openGraph: {
      title: tool.metaTitle,
      description: tool.metaDescription,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: tool.metaTitle,
      description: tool.metaDescription,
    },
    alternates: {
      canonical: `https://takethetools.com/tools/${toolSlug}`,
    },
  };
}

export default async function ToolPage({ params }: Props) {
  const { toolSlug } = await params;
  const tool = getToolBySlug(toolSlug);

  if (!tool) {
    return <div className="container mx-auto px-4 py-32 text-center">Tool not found</div>;
  }

  const aboutContent = getToolAboutContent(toolSlug);

  // Related tools (same category, different tool)
  const relatedTools = TOOLS.filter(t => t.category === tool.category && t.id !== tool.id).slice(0, 3);

  return (
    <div className="pt-10 pb-20">
      <div className="container mx-auto px-4">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8">
          <Link href="/" className="hover:text-primary-600 transition-colors flex items-center gap-1">
            <Home className="w-4 h-4" /> Home
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/categories" className="hover:text-primary-600 transition-colors">Tools</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-slate-900 font-medium">{tool.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Main Content Area */}
          <div className="lg:col-span-3">
            <div className="mb-10">
              <h1 className="text-4xl font-display font-bold text-slate-900 mb-4 tracking-tight">
                {tool.name}
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed max-w-3xl">
                {tool.description}
              </p>
            </div>

            {/* Ad Unit — Inline Top */}
            <div className="flex justify-center mb-8">
              <ManualAdUnit adSlot="3171595105" adFormat="auto" />
            </div>

            {/* Tool Interaction Area */}
            <div className="mb-12">
              <ToolRenderer toolId={tool.id} />
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
                  prose-p:text-slate-600 prose-p:leading-relaxed
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
                {tool.instructions.map((step, index) => (
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
                {tool.faqs.map((faq, index) => (
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

            <div className="bg-slate-900 text-white rounded-3xl p-8">
              <h3 className="text-xl font-bold mb-6">Related Tools</h3>
              <div className="space-y-4">
                {relatedTools.map(t => (
                  <Link
                    key={t.id}
                    href={`/tools/${t.slug}`}
                    className="group block p-4 bg-slate-800 rounded-xl hover:bg-primary-600 transition-all"
                  >
                    <h4 className="font-bold text-sm mb-1">{t.name}</h4>
                    <p className="text-slate-400 text-xs group-hover:text-primary-100 line-clamp-1">{t.description}</p>
                  </Link>
                ))}
                {relatedTools.length === 0 && (
                  <p className="text-slate-500 text-sm italic">Stay tuned for more tools!</p>
                )}
              </div>
              <Link href="/categories" className="mt-8 flex items-center gap-2 text-primary-400 font-bold text-sm group">
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
            {
              "@context": "https://takethetools.com",
              "@type": "SoftwareApplication",
              "name": tool.name,
              "applicationCategory": "MultimediaApplication",
              "operatingSystem": "Any",
              "description": tool.description,
              "browserRequirements": "Requires JavaScript",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              }
            },
            {
              "@context": "https://takethetools.com",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://takethetools.com"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Tools",
                  "item": "https://takethetools.com/categories"
                },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "name": tool.name,
                  "item": `https://takethetools.com/tools/${toolSlug}`
                }
              ]
            },
            {
              "@context": "https://takethetools.com",
              "@type": "FAQPage",
              "mainEntity": tool.faqs.map(faq => ({
                "@type": "Question",
                "name": faq.question,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": faq.answer
                }
              }))
            }
          ])
        }}
      />
    </div>
  );
}
