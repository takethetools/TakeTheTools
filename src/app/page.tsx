import Link from "next/link";
import { Zap, Search, Image as ImageIcon, FileText, Code, Type, Video, ArrowRight, Star, Calculator, Target, Shield, LayoutGrid } from "lucide-react";
import { CATEGORIES, TOOLS } from "@/lib/tools";
import AdPlaceholder from "@/components/common/AdPlaceholder";

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

export default function Home() {
  const popularTools = TOOLS.filter(t => t.isPopular);

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
        
        {/* Main Search */}
        <div className="max-w-2xl mx-auto relative group">
          <div className="absolute inset-0 bg-primary-400 opacity-20 blur-2xl group-hover:opacity-30 transition-opacity rounded-full"></div>
          <div className="relative flex items-center bg-white rounded-2xl p-2 shadow-2xl border border-slate-100">
            <Search className="w-6 h-6 text-slate-400 ml-4 mr-2" />
            <input 
              type="text" 
              placeholder="Search over 100+ tools..." 
              className="bg-transparent border-none outline-none text-lg w-full py-4 text-slate-800"
            />
            <button className="bg-primary-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-primary-700 transition-all shadow-lg active:scale-95">
              Search
            </button>
          </div>
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
          {CATEGORIES.map((cat) => {
            const Icon = categoryIcons[cat.id] || LayoutGrid;
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
                <p className="text-slate-500 text-sm leading-relaxed mb-4">{cat.description}</p>
                <span className="text-primary-600 font-bold text-sm inline-flex items-center gap-1 opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all">
                  Open Category <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Mid-content Ad */}
      <section className="container mx-auto px-4">
        <AdPlaceholder type="horizontal" />
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
                className="block p-6 bg-white rounded-2xl border border-slate-100 hover:shadow-lg transition-all"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-primary-50 rounded-xl text-primary-600">
                    <Zap className="w-5 h-5 fill-current" />
                  </div>
                  <h3 className="font-bold text-slate-800">{tool.name}</h3>
                </div>
                <p className="text-slate-500 text-sm mb-4 line-clamp-2">{tool.description}</p>
                <div className="flex justify-between items-center text-xs">
                  <span className="px-2 py-1 bg-slate-100 rounded text-slate-500 uppercase font-bold tracking-wider">{tool.category}</span>
                  <span className="text-primary-600 font-bold">Use Tool →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* AdSense Placeholder */}
      <section className="container mx-auto px-4">
        <AdPlaceholder type="horizontal" />
      </section>
    </div>
  );
}
