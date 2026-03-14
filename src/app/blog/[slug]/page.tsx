import { getPostData, getSortedPostsData } from "@/lib/blog";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Calendar, User, Tag, ArrowRight, List } from "lucide-react";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import React from "react";
import ManualAdUnit from "@/components/common/ManualAdUnit";

export const dynamic = "force-static";
export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = getSortedPostsData();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostData(slug);
  if (!post) return { title: "Post Not Found" };

  return {
    title: `${post.title} - TakeThe Tools Blog`,
    description: post.description,
    alternates: {
      canonical: `https://takethetools.com/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      images: post.image ? [{ url: post.image }] : [],
      type: "article",
      url: `https://takethetools.com/blog/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: post.image ? [post.image] : [],
    },
  };
}

const CATEGORY_COLORS: Record<string, string> = {
  "Image Tools": "bg-pink-100 text-pink-600",
  "PDF Tools": "bg-amber-100 text-amber-600",
  "Developer Tools": "bg-blue-100 text-blue-600",
  "Text Tools": "bg-slate-100 text-slate-600",
  "Security & Privacy": "bg-red-100 text-red-600",
  "Math & Calculators": "bg-green-100 text-green-600",
  "Marketing & Social": "bg-orange-100 text-orange-600",
};

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostData(slug);

  if (!post) notFound();

  return (
    <div className="pt-10 pb-20">
      <div className="container mx-auto px-4">
        <Breadcrumbs
          items={[
            { label: "Blog", href: "/blog" },
            { label: post.title }
          ]}
        />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Main Content Area */}
          <div className="lg:col-span-3">
            <article>
              <header className="mb-12">
                <div className="flex flex-wrap gap-4 items-center mb-6">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${CATEGORY_COLORS[post.category] || "bg-primary-50 text-primary-600"}`}>
                    {post.category}
                  </span>
                  <span className="flex items-center gap-2 text-sm text-slate-400 font-bold">
                    <Calendar className="w-4 h-4" /> {post.date}
                  </span>
                  <span className="flex items-center gap-2 text-sm text-slate-400 font-bold">
                    <User className="w-4 h-4" /> TakeThe Tools Team
                  </span>
                </div>

                <h1 className="text-4xl md:text-6xl font-display font-bold text-slate-900 mb-8 tracking-tight leading-tight">
                  {post.title}
                </h1>
                <p className="text-xl text-slate-500 leading-relaxed whitespace-pre-wrap">
                  {post.description}
                </p>
                <div className="mt-8 flex justify-center">
                  <ManualAdUnit adSlot="3171595105" adFormat="auto" />
                </div>
              </header>

              {/* Cover Header UI */}
              <div className={`mb-12 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-slate-200/50 aspect-[21/9] relative flex items-center justify-center text-center p-8 md:p-12 group`}>
                {/* Background Pattern/Gradient */}
                <div className={`absolute inset-0 opacity-100 transition-transform duration-700 group-hover:scale-105 bg-gradient-to-br ${post.category === 'Image Tools' ? 'from-pink-500 to-rose-600' :
                  post.category === 'PDF Tools' ? 'from-amber-400 to-orange-600' :
                    post.category === 'Developer Tools' ? 'from-blue-500 to-indigo-700' :
                      post.category === 'Text Tools' ? 'from-slate-600 to-slate-800' :
                        post.category === 'Security & Privacy' ? 'from-red-500 to-red-800' :
                          post.category === 'Math & Calculators' ? 'from-green-500 to-emerald-700' :
                            post.category === 'Marketing & Social' ? 'from-orange-400 to-red-600' :
                              'from-primary-500 to-primary-700'
                  }`}></div>

                {/* Animated decorative elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 blur-3xl rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                  <div className="absolute bottom-0 right-0 w-96 h-96 bg-black/10 blur-3xl rounded-full translate-x-1/2 translate-y-1/2"></div>
                </div>

                {/* Content Overlay */}
                <div className="relative z-10 flex flex-col items-center gap-6">
                  <div className="w-20 h-20 md:w-24 md:h-24 bg-white/20 backdrop-blur-md rounded-3xl border border-white/30 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-500">
                    <Tag className="w-10 h-10 md:w-12 md:h-12 text-white" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-white/70 text-xs md:text-sm font-bold uppercase tracking-[0.3em] drop-shadow-sm">Comprehensive Guide</p>
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-white tracking-tight drop-shadow-md leading-tight max-w-4xl mx-auto">
                      {post.toolName || post.title.split(':')[0]}
                    </h2>
                  </div>
                </div>
              </div>


              {/* Table of Contents */}
              {post.content && (
                <div className="mb-12 p-8 bg-slate-50 rounded-3xl border border-slate-100 ring-1 ring-slate-200/50">
                  <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3 font-display">
                    <div className="w-8 h-8 rounded-lg bg-primary-100 flex items-center justify-center text-primary-600">
                      <List className="w-5 h-5" />
                    </div>
                    Table of Contents
                  </h2>
                  <nav className="flex flex-col gap-3">
                    {post.content
                      .split("\n")
                      .filter(line => line.startsWith("## "))
                      .map((line, index) => {
                        const title = line.replace("## ", "").trim();
                        const id = title.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");
                        return (
                          <a
                            key={index}
                            href={`#${id}`}
                            className="text-slate-500 hover:text-primary-600 transition-colors text-sm font-medium flex items-center gap-2 group"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-primary-400 transition-colors"></span>
                            {title}
                          </a>
                        );
                      })}
                  </nav>
                </div>
              )}

              <div className="prose prose-slate prose-lg max-w-none 
                prose-headings:font-display prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-slate-900
                prose-h2:text-3xl prose-h2:mt-16 prose-h2:mb-8
                prose-p:text-slate-600 prose-p:leading-relaxed prose-p:mb-8
                prose-a:text-primary-600 prose-a:font-bold prose-a:no-underline hover:prose-a:underline
                prose-img:rounded-3xl prose-img:shadow-2xl prose-img:my-16
                prose-code:bg-slate-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:text-primary-700 prose-code:font-bold prose-code:before:content-none prose-code:after:content-none
                prose-pre:bg-slate-900 prose-pre:rounded-3xl prose-pre:p-8 prose-pre:shadow-2xl prose-pre:my-10
                prose-ul:list-disc prose-ul:pl-6 prose-li:text-slate-600 prose-li:mb-2
                ">
                <MDXRemote
                  source={post.content}
                  components={{
                    h2: (props: any) => {
                      const id = props.children?.toString().toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");
                      return <h2 id={id} {...props} />;
                    }
                  }}
                />
              </div>

            </article>

            {/* Tool CTA */}
            {post.toolSlug && (
              <div className="mt-24 pt-10 border-t border-slate-100">
                <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-[2.5rem] p-12 flex flex-col md:flex-row items-center justify-between gap-10 shadow-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/10 blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2 group-hover:bg-primary-500/20 transition-colors"></div>
                  <div className="relative z-10">
                    <p className="text-primary-400 font-bold uppercase tracking-[0.2em] text-xs mb-4">Professional Utility</p>
                    <h3 className="text-3xl font-display font-bold text-white mb-4 leading-tight">{post.toolName || "Use This Tool Online"}</h3>
                    <p className="text-slate-400 text-lg max-w-xl">
                      Experience high-performance, precision-engineered tools. 100% free, runs entirely in your browser for maximum privacy.
                    </p>
                  </div>
                  <Link
                    href={`/tools/${post.toolSlug}`}
                    className="relative z-10 shrink-0 px-12 py-5 bg-primary-600 text-white rounded-2xl font-bold hover:bg-primary-500 transition-all shadow-xl shadow-primary-900/40 inline-flex items-center gap-3 text-lg hover:-translate-y-1 active:translate-y-0"
                  >
                    Open Tool Now <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            )}

            {/* Back link */}
            <div className="mt-12 flex justify-center lg:justify-start">
              <Link href="/blog" className="text-slate-400 hover:text-primary-600 font-bold text-sm flex items-center gap-2 transition-colors">
                <ChevronLeft className="w-4 h-4" /> All Articles
              </Link>
            </div>
          </div>

          {/* Sidebar Area */}
          <div className="lg:col-span-1 space-y-8">
            <ManualAdUnit adSlot="3171595105" adFormat="auto" />
            <ManualAdUnit adSlot="3171595105" adFormat="rectangle" />
          </div>
        </div>
      </div>
    </div>
  );
}
