import { TOOLS, CATEGORIES } from "@/lib/tools";
import Link from "next/link";
import { Zap, Search, ImageIcon, FileText, Code, Type, Video, ArrowRight, Star, Calculator, Target, Shield, LayoutGrid, Clock, HelpCircle } from "lucide-react";
import ManualAdUnit from "@/components/common/ManualAdUnit";
import React from "react";
import HomeSearch from "@/components/home/HomeSearch";

const categoryIcons: Record<string, any> = {
  image: ImageIcon,
  pdf: FileText,
  developer: Code,
  text: Type,
  converter: Video,
  math: Calculator,
  marketing: Target,
  security: Shield,
};

export const dynamic = "force-static";

async function getHomeData() {
  const categories = CATEGORIES;
  const popularTools = TOOLS.filter(t => t.isPopular).slice(0, 8);
  const latestTools = [...TOOLS].reverse().slice(0, 3);

  return { categories, popularTools, latestTools };
}

export default async function Home() {
  const { categories, popularTools, latestTools } = await getHomeData();

  return (
    <div className="flex flex-col gap-20 pb-20 pt-10">
      {/* Hero Section */}
      <section className="container mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 rounded-full text-primary-600 font-medium text-sm mb-6 border border-primary-100">
          <Star className="w-4 h-4 fill-current" />
          <span>All-in-one platform for global users</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-display font-bold text-slate-900 mb-6 tracking-tight">
          Tools for Every <span className="text-primary-600">Digital Task</span>
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
          High-performance, secure, and SEO-optimized tools for image conversion, PDF editing, development, and more. Free for everyone, everywhere.
        </p>

        {/* Home Search Component */}
        <HomeSearch />

        {/* Hero Ad */}
        <div className="mt-12 max-w-4xl mx-auto flex justify-center">
          <ManualAdUnit adSlot="2317951509" adFormat="horizontal" />
        </div>
      </section>

      {/* Categories Grid */}
      <section className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-display font-bold text-slate-900 mb-2">Browse Categories</h2>
            <p className="text-slate-500">Find the right tool for your specific needs</p>
          </div>
          <Link href="/categories" className="text-primary-600 font-bold hover:gap-2 flex items-center gap-1 transition-all">
            See all categories <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {categories.map((cat) => {
            const Icon = categoryIcons[cat.slug] || categoryIcons[cat.id] || LayoutGrid;
            return (
              <Link
                key={cat.id}
                href={`/categories/${cat.slug}`}
                className="group p-8 bg-white rounded-3xl border border-slate-100 hover:border-primary-200 hover:shadow-2xl hover:shadow-primary-100 transition-all duration-300"
              >
                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary-600 group-hover:text-white transition-colors duration-300">
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{cat.name}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-4">{cat.shortDescription}</p>
                <span className="text-primary-600 font-bold text-sm inline-flex items-center gap-1 opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all">
                  Open Category <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            );
          })}
        </div>

        {/* Mid-Page Ad */}
        <div className="mt-16 flex justify-center">
          <ManualAdUnit adSlot="2317951509" adFormat="auto" />
        </div>
      </section>


      {/* Popular Tools Section */}
      <section className="bg-slate-50 py-20 border-y border-slate-200">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-display font-bold text-slate-900 mb-4">Popular Tools</h2>
            <p className="text-slate-500 max-w-xl mx-auto">The most frequently used tools by our global community.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularTools.map((tool) => (
              <Link
                key={tool.id}
                href={`/tools/${tool.slug}`}
                className="block p-6 bg-white rounded-2xl border border-slate-100 hover:shadow-lg transition-all group"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-primary-50 rounded-xl text-primary-600 group-hover:bg-primary-600 group-hover:text-white transition-colors">
                    <Zap className="w-5 h-5 fill-current" />
                  </div>
                  <h3 className="font-bold text-slate-800">{tool.name}</h3>
                </div>
                <p className="text-slate-500 text-sm mb-4 line-clamp-2">{tool.description}</p>
                <div className="flex justify-between items-center text-xs">
                  <span className="px-2 py-1 bg-slate-100 rounded text-slate-600 uppercase font-bold tracking-wider">{tool.category}</span>
                  <span className="text-primary-600 font-bold">Use Tool →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Mid-Feed Ad */}
        <div className="mt-16 flex justify-center">
          <ManualAdUnit adSlot="2317951509" adFormat="horizontal" />
        </div>
      </section>

      {/* Latest Tools Section */}
      <section className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-display font-bold text-slate-900 mb-2">Latest additions</h2>
            <p className="text-slate-500">Newest tools added to our platform recently</p>
          </div>
          <div className="flex items-center gap-2 text-primary-600 font-bold">
            <Clock className="w-5 h-5" /> Updated daily
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {latestTools.map((tool) => (
            <Link
              key={tool.id}
              href={`/tools/${tool.slug}`}
              className="group flex gap-6 p-8 bg-white rounded-3xl border border-slate-100 hover:border-primary-200 transition-all"
            >
              <div className="w-16 h-16 shrink-0 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-primary-50 group-hover:text-primary-600 transition-colors">
                <Zap className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-primary-600 transition-colors">{tool.name}</h3>
                <p className="text-slate-500 text-sm leading-relaxed line-clamp-2">{tool.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-slate-900 py-24 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-display font-bold mb-6">Frequently Asked Questions</h2>
            <p className="text-slate-400 text-lg">Everything you need to know about TakeTheTools and our free services.</p>
          </div>

          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              {
                q: "Are these tools really free?",
                a: "Yes, 100% free! We believe in providing high-quality digital utilities to everyone without any hidden costs or subscriptions."
              },
              {
                q: "Do you store my files?",
                a: "No. Most of our tools process your data directly in your browser. For others, files are processed in secure, ephemeral environments and deleted immediately after."
              },
              {
                q: "Is there a limit on usage?",
                a: "Currently, there are no strict limits on how many times you can use our tools daily. We aim for maximum availability for all users."
              },
              {
                q: "Do I need to create an account?",
                a: "No registration is required. You can start using any tool on the site instantly."
              }
            ].map((faq, i) => (
              <div key={i} className="group">
                <div className="flex gap-4 mb-4">
                  <div className="w-8 h-8 rounded-full bg-primary-600/20 flex items-center justify-center text-primary-400 shrink-0">
                    <HelpCircle className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold font-display">{faq.q}</h3>
                </div>
                <p className="text-slate-400 leading-relaxed pl-12">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Bottom Ad */}
      <div className="flex justify-center">
        <ManualAdUnit adSlot="2317951509" adFormat="auto" />
      </div>

    </div>
  );
}
