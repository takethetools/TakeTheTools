import { ToolCategory, CATEGORIES, TOOLS } from "@/lib/tools";
import Link from "next/link";
import { ArrowRight, ChevronRight, Home } from "lucide-react";
import { Metadata } from "next";
import AdPlaceholder from "@/components/common/AdPlaceholder";

export async function generateMetadata({ params }: { params: Promise<{ categorySlug: string }> }): Promise<Metadata> {
  const { categorySlug } = await params;
  const category = CATEGORIES.find(c => c.slug === categorySlug);
  if (!category) return { title: "Category Not Found" };

  return {
    title: `${category.name} - TakeThe Tools`,
    description: category.description,
    alternates: {
      canonical: `https://takethetools.com/categories/${categorySlug}`,
    },
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ categorySlug: string }> }) {
  const { categorySlug } = await params;
  const category = CATEGORIES.find(c => c.slug === categorySlug);
  
  if (!category) {
    return <div className="container mx-auto px-4 py-32 text-center">Category not found</div>;
  }

  const categoryTools = TOOLS.filter(t => t.category === category.id);

  return (
    <div className="pt-10 pb-20">
      <div className="container mx-auto px-4">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8">
          <Link href="/" className="hover:text-primary-600 transition-colors flex items-center gap-1">
            <Home className="w-4 h-4" /> Home
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-slate-900 font-medium">Categories</span>
          <ChevronRight className="w-4 h-4" />
          <span className="text-slate-900 font-medium">{category.name}</span>
        </nav>

        <div className="max-w-4xl mb-16">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-6 tracking-tight">
            {category.name}
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed">
            {category.description}
          </p>
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

        <AdPlaceholder type="horizontal" className="mt-16" />

        {/* SEO Content Section */}
        <div className="mt-24 prose prose-slate max-w-none">
          <h2 className="text-2xl font-bold mb-6">About {category.name}</h2>
          <p className="text-slate-600 mb-4">
            Our {category.name} collection is designed to provide you with high-performance, easy-to-use solutions for your daily digital tasks. 
            Whether you are a developer, designer, or just looking to quickly edit a file, our tools are optimized for speed and accuracy.
          </p>
          <p className="text-slate-600">
            We support users globally from the US, UK, Canada, Europe, and Australia, ensuring that our servers are optimized for fast response times regardless of your location. 
            All tools are free to use and do not require any registration or software installation.
          </p>
        </div>
      </div>
    </div>
  );
}
