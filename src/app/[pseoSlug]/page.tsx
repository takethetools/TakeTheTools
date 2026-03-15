import { getToolBySlug, TOOLS } from "@/lib/tools";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import ToolRenderer from "@/components/tools/ToolRenderer";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import ManualAdUnit from "@/components/common/ManualAdUnit";
import { getToolAboutContent } from "@/lib/tool-content";
import { MDXRemote } from "next-mdx-remote/rsc";
import { CheckCircle2, HelpCircle, Share2, ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import {
    getSoftwareApplicationSchema,
    getBreadcrumbSchema,
    getFAQSchema,
    SITE_URL
} from "@/lib/seo";
import { getPSEOContext as getPSEOContextHelper, getAllPSEORoutes as getAllPSEORoutesHelper } from "@/lib/pseo";

export const dynamic = "force-static";
export const dynamicParams = false;

interface Props {
    params: Promise<{ pseoSlug: string }>;
}

export async function generateStaticParams() {
    const routes = getAllPSEORoutesHelper();
    return routes.map(slug => ({ pseoSlug: slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { pseoSlug } = await params;
    const context = getPSEOContextHelper(pseoSlug);

    if (!context) return { title: "Not Found" };

    return {
        title: context.title,
        description: `Use the best ${context.tool.name} online for free. ${context.tool.description}`,
        alternates: {
            canonical: context.canonical,
        },
        openGraph: {
            title: context.title,
            description: context.tool.description,
            url: context.canonical,
            siteName: "TakeTheTools",
            type: "website",
        }
    };
}

export default async function PSEOPage({ params }: Props) {
    const { pseoSlug } = await params;
    const context = getPSEOContextHelper(pseoSlug);

    if (!context) {
        notFound();
    }

    const { tool, h1, title } = context;
    const toolSlug = tool.slug;
    const aboutContent = getToolAboutContent(toolSlug);
    const relatedTools = TOOLS.filter(t => t.category === tool.category && t.id !== tool.id).slice(0, 3);

    const applicationCategoryMap: Record<string, string> = {
        "image": "MultimediaApplication",
        "pdf": "MultimediaApplication",
        "developer": "DeveloperApplication",
        "text": "UtilitiesApplication"
    };

    return (
        <div className="pt-10 pb-20">
            <div className="container mx-auto px-4">
                <Breadcrumbs
                    items={[
                        { label: "Tools", href: "/categories" },
                        { label: tool.name, href: `/tools/${tool.slug}` },
                        { label: h1 }
                    ]}
                />

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                    <div className="lg:col-span-3">
                        <div className="mb-10">
                            <h1 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-6 tracking-tight">
                                {h1}
                            </h1>
                            <div className="text-xl text-slate-600 leading-relaxed max-w-4xl mb-8">
                                <p>
                                    Looking for the <strong>{h1}</strong>? You've come to the right place.
                                    Our professional-grade tool allows you to {tool.description.toLowerCase()} instantly.
                                </p>
                                <p className="mt-4">
                                    This page is specifically optimized to help you find and use our free {tool.name.toLowerCase()}
                                    without any hassle. Follow the instructions below to get started.
                                </p>
                            </div>
                        </div>

                        <div className="flex justify-center mb-8">
                            <ManualAdUnit adSlot="2317951509" adFormat="auto" />
                        </div>

                        <div className="mb-12">
                            <ToolRenderer toolId={tool.id} exampleInput={tool.exampleInput} />
                            <div className="mt-8 text-center">
                                <Link
                                    href={`/tools/${tool.slug}`}
                                    className="inline-flex items-center gap-2 text-primary-600 font-bold hover:underline"
                                >
                                    Visit main {tool.name} page <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>

                        {aboutContent && (
                            <div className="mb-16 pt-16 border-t border-slate-100">
                                <div className="prose prose-slate prose-lg max-w-none">
                                    <MDXRemote source={aboutContent} components={{ ManualAdUnit }} />
                                </div>
                            </div>
                        )}

                        <div className="mb-16">
                            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                <CheckCircle2 className="w-6 h-6 text-primary-600" />
                                How to Use {tool.name} Online
                            </h2>
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

                        <div className="mb-16">
                            <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-2">
                                <HelpCircle className="w-6 h-6 text-primary-600" />
                                FAQs about {tool.name}
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

                    <div className="lg:col-span-1 space-y-8">
                        <div className="bg-slate-900 text-white rounded-[2rem] p-8 shadow-xl">
                            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                <Share2 className="w-5 h-5 text-primary-400" />
                                Related Tools
                            </h3>
                            <div className="space-y-4">
                                {relatedTools.map(t => (
                                    <Link
                                        key={t.id}
                                        href={`/tools/${t.slug}`}
                                        className="group block p-4 bg-slate-800/50 rounded-2xl hover:bg-primary-600/20 border border-slate-700 transition-all"
                                    >
                                        <h4 className="font-bold text-sm mb-1 group-hover:text-primary-400">{t.name}</h4>
                                        <p className="text-slate-400 text-xs line-clamp-1">{t.description}</p>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify([
                        getSoftwareApplicationSchema(tool, applicationCategoryMap),
                        getBreadcrumbSchema([
                            { name: "Home", item: SITE_URL },
                            { name: "Tools", item: `${SITE_URL}/categories` },
                            { name: tool.name, item: `${SITE_URL}/tools/${tool.slug}` },
                            { name: h1, item: `${SITE_URL}/${pseoSlug}` }
                        ]),
                        getFAQSchema(tool.faqs)
                    ])
                }}
            />
        </div>
    );
}
