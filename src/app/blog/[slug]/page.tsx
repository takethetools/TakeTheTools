import { getPostData, getSortedPostsData } from "@/lib/blog";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Calendar, User, Tag, ArrowRight } from "lucide-react";
import React from "react";
import ManualAdUnit from "@/components/common/ManualAdUnit";
export const runtime = 'edge';

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
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-primary-600 transition-colors mb-12 group"
        >
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Blog
        </Link>

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
                <p className="text-xl text-slate-500 leading-relaxed">
                  {post.description}
                </p>
                <div className="mt-8 flex justify-center">
                  <ManualAdUnit adSlot="3171595105" adFormat="auto" />
                </div>
              </header>

              {/* Cover Image */}
              {post.image && (
                <div className="mb-12 rounded-3xl overflow-hidden shadow-xl shadow-slate-200/50">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-72 md:h-96 object-cover"
                  />
                </div>
              )}


              <div className="prose prose-slate prose-lg max-w-none prose-headings:font-display prose-headings:font-bold prose-a:text-primary-600 prose-img:rounded-3xl prose-code:bg-slate-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded-md prose-code:text-primary-700 prose-pre:bg-slate-900">
                <MDXRemote source={post.content} />
              </div>

            </article>

            {/* Tool CTA */}
            {post.toolSlug && (
              <div className="mt-20 pt-10 border-t border-slate-100">
                <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-3xl p-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
                  <div>
                    <p className="text-xs font-bold text-primary-500 uppercase tracking-widest mb-2">Try it yourself</p>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">{post.toolName || "Use This Tool"}</h3>
                    <p className="text-slate-600">100% free, no sign-up required. Runs entirely in your browser.</p>
                  </div>
                  <Link
                    href={`/tools/${post.toolSlug}`}
                    className="shrink-0 px-10 py-4 bg-primary-600 text-white rounded-xl font-bold hover:bg-primary-700 transition-all shadow-lg shadow-primary-500/30 inline-flex items-center gap-2"
                  >
                    Open Tool <ArrowRight className="w-4 h-4" />
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
