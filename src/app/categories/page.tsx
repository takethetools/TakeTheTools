import { CATEGORIES, TOOLS } from "@/lib/tools";
import Link from "next/link";
import { ArrowRight, Box, Image as ImageIcon, FileText, Code, Type, LayoutGrid, Calculator, Target, Shield } from "lucide-react";
import { Metadata } from "next";
import React from "react";
import ManualAdUnit from "@/components/common/ManualAdUnit";

export const metadata: Metadata = {
  title: "Tool Categories - TakeTheTools",
  description: "Browse our wide range of free online tools categorized for your convenience. Image, PDF, Developer, and Text tools.",
  alternates: {
    canonical: "https://takethetools.com/categories",
  },
};

export const dynamic = "force-static";

const ICON_MAP: Record<string, any> = {
  image: ImageIcon,
  pdf: FileText,
  developer: Code,
  text: Type,
  converter: Box,
  math: Calculator,
  marketing: Target,
  security: Shield,
};

export default async function CategoriesPage() {
  const categories = CATEGORIES.map(cat => ({
    ...cat,
    _count: {
      tools: TOOLS.filter(t => t.category === cat.id).length
    }
  }));
  const popularTools = TOOLS.filter(t => t.isPopular).slice(0, 4);

  return (
    <div className="pt-10 pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mb-16 px-4 md:px-0">
          <h1 className="text-4xl md:text-6xl font-display font-bold text-slate-900 mb-6 tracking-tight">
            Tool <span className="text-primary-600">Categories</span>
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed max-w-2xl">
            Explore our curated collection of online tools, optimized for speed, security, and ease of use.
            All tools process files locally on your device.
          </p>
        </div>

        {/* Top Ad */}
        <div className="mb-12 flex justify-center">
          <ManualAdUnit adSlot="2317951509" adFormat="auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => {
            const Icon = ICON_MAP[category.slug] || ICON_MAP[category.id] || LayoutGrid;
            const toolCount = category._count.tools;

            return (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className="group relative bg-white rounded-3xl border border-slate-100 p-8 hover:border-primary-200 hover:shadow-2xl hover:shadow-primary-100/20 transition-all duration-500 overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary-50 rounded-bl-full -mr-10 -mt-10 opacity-50 group-hover:scale-110 transition-transform duration-500"></div>

                <div className="relative z-10">
                  <div className="w-14 h-14 bg-primary-600 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:rotate-6 transition-transform shadow-lg shadow-primary-500/30">
                    <Icon className="w-7 h-7" />
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-slate-900 group-hover:text-primary-600 transition-colors">
                      {category.name}
                    </h2>
                    <span className="bg-slate-100 text-slate-500 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                      {toolCount} Tools
                    </span>
                  </div>

                  <p className="text-slate-500 leading-relaxed mb-8">
                    {category.shortDescription}
                  </p>

                  <div className="flex items-center gap-2 text-primary-600 font-bold group-hover:gap-3 transition-all">
                    Explore Tools
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Mid Ad */}
        <div className="mt-16 mb-16 flex justify-center">
          <ManualAdUnit adSlot="2317951509" adFormat="horizontal" />
        </div>


        {/* Popular Tools Section */}
        <div className="mt-32">
          <div className="flex items-center justify-between mb-12 px-4 md:px-0">
            <h2 className="text-3xl font-display font-bold text-slate-900 tracking-tight">
              Most Popular Tools
            </h2>
            <Link href="/" className="text-primary-600 font-bold hover:underline flex items-center gap-2">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularTools.map((tool) => (
              <Link
                key={tool.id}
                href={`/tools/${tool.slug}`}
                className="p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:bg-white hover:border-primary-200 hover:shadow-xl transition-all"
              >
                <h3 className="font-bold text-slate-900 mb-2">{tool.name}</h3>
                <p className="text-slate-500 text-xs line-clamp-2 leading-relaxed">
                  {tool.description}
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom Ad */}
        <div className="mt-16 flex justify-center">
          <ManualAdUnit adSlot="2317951509" adFormat="auto" />
        </div>
      </div>
    </div>
  );
}
