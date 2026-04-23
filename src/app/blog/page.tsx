import { getAllPosts } from "@/lib/blog-utils";
import Link from "next/link";
import { ChevronRight, Calendar, Tag, Clock } from "lucide-react";
import React from "react";
import ManualAdUnit from "@/components/common/ManualAdUnit";
import { AD_SLOTS } from "@/lib/ad-slots";

export const metadata = {
  title: "Blog - TakeTheTools Insights",
  description: "Read our latest articles on how to use online tools, productivity tips, and developer guides.",
  openGraph: {
    title: "Blog - TakeTheTools",
    description: "Tips, tutorials and guides for using free online tools to boost your productivity.",
    url: "https://takethetools.com/blog",
  },
  alternates: {
    canonical: "https://takethetools.com/blog",
  },
};

export const dynamic = "force-dynamic";

const CATEGORY_COLORS: Record<string, string> = {
  "Image Tools": "bg-pink-100 text-pink-600",
  "PDF Tools": "bg-amber-100 text-amber-600",
  "Developer Tools": "bg-blue-100 text-blue-600",
  "Text Tools": "bg-slate-100 text-slate-600",
  "Security & Privacy": "bg-red-100 text-red-600",
  "Math & Calculators": "bg-green-100 text-green-600",
  "Marketing & Social": "bg-orange-100 text-orange-600",
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <div className="pt-10 pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="max-w-3xl mb-16">
            <h1 className="text-4xl md:text-6xl font-display font-bold text-slate-900 mb-6 tracking-tight">
              Our <span className="text-primary-600">Blog</span>
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed">
              Tips, tutorials, and guides to help you get the most out of our 100+ free online tools.
            </p>
          </div>

          {/* Top Ad */}
          <div className="mb-12 flex justify-center">
            <ManualAdUnit adSlot={AD_SLOTS.IN_ARTICLE_HORIZONTAL} adFormat="horizontal" />
          </div>

          {/* Featured Post */}
          {posts.length > 0 && (
            <div className="mb-16">
              <Link
                href={`/blog/${posts[0].slug}`}
                className="group grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden hover:shadow-2xl hover:shadow-primary-100/30 transition-all"
              >
                {/* Featured Post Cover */}
                <div className={`h-72 lg:h-full relative overflow-hidden flex items-center justify-center p-8 group-hover:scale-[1.02] transition-transform duration-700`}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${posts[0].category.name === 'Image Tools' ? 'from-pink-500 to-rose-600' :
                    posts[0].category.name === 'PDF Tools' ? 'from-amber-400 to-orange-600' :
                      posts[0].category.name === 'Developer Tools' ? 'from-blue-500 to-indigo-700' :
                        posts[0].category.name === 'Text Tools' ? 'from-slate-600 to-slate-800' :
                          posts[0].category.name === 'Security & Privacy' ? 'from-red-500 to-red-800' :
                            posts[0].category.name === 'Math & Calculators' ? 'from-green-500 to-emerald-700' :
                              posts[0].category.name === 'Marketing & Social' ? 'from-orange-400 to-red-600' :
                                'from-primary-500 to-primary-700'
                    }`}></div>
                  <div className="relative z-10 flex flex-col items-center gap-4 text-center">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl border border-white/30 flex items-center justify-center shadow-lg">
                      <Tag className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-white font-display font-bold text-2xl drop-shadow-md leading-tight max-w-xs">
                      {posts[0].title.split(':')[0]}
                    </h3>
                  </div>
                </div>
                <div className="p-10 lg:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-4 mb-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${CATEGORY_COLORS[posts[0].category.name] || "bg-primary-50 text-primary-600"}`}>
                      {posts[0].category.name}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-slate-400 font-bold">
                      <Calendar className="w-3 h-3" /> {new Date(posts[0].publishDate).toLocaleDateString()}
                    </span>
                  </div>
                  <h2 className="text-3xl font-bold text-slate-900 mb-4 group-hover:text-primary-600 transition-colors leading-tight">
                    {posts[0].title}
                  </h2>
                  <p className="text-slate-500 mb-8 leading-relaxed line-clamp-3 whitespace-pre-wrap">
                    {posts[0].metaDescription || posts[0].title}
                  </p>
                  <span className="text-primary-600 font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
                    Read Article <ChevronRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            </div>
          )}

          {/* Mid Ad */}
          <div className="mb-16 flex justify-center">
            <ManualAdUnit adSlot={AD_SLOTS.IN_CONTENT_AUTO} adFormat="auto" />
          </div>


          {/* Post Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.slice(1).map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group bg-white rounded-3xl border border-slate-100 overflow-hidden hover:shadow-2xl hover:shadow-primary-100/20 transition-all flex flex-col"
              >
                {/* Cover Interface */}
                <div className="h-48 relative overflow-hidden flex items-center justify-center p-6 grayscale-[0.5] group-hover:grayscale-0 transition-all duration-500">
                  <div className={`absolute inset-0 bg-gradient-to-br ${post.category.name === 'Image Tools' ? 'from-pink-500 to-rose-600' :
                    post.category.name === 'PDF Tools' ? 'from-amber-400 to-orange-600' :
                      post.category.name === 'Developer Tools' ? 'from-blue-500 to-indigo-700' :
                        post.category.name === 'Text Tools' ? 'from-slate-600 to-slate-800' :
                          post.category.name === 'Security & Privacy' ? 'from-red-500 to-red-800' :
                            post.category.name === 'Math & Calculators' ? 'from-green-500 to-emerald-700' :
                              post.category.name === 'Marketing & Social' ? 'from-orange-400 to-red-600' :
                                'from-primary-500 to-primary-700'
                    }`}></div>
                  <div className="relative z-10 flex flex-col items-center gap-3 text-center">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl border border-white/30 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Tag className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-white font-display font-bold text-lg drop-shadow-md leading-tight line-clamp-1">
                      {post.title.split(':')[0]}
                    </h3>
                  </div>
                </div>

                <div className="p-8 flex-grow flex flex-col">
                  <div className="flex items-center gap-4 mb-4">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider ${CATEGORY_COLORS[post.category.name] || "bg-primary-50 text-primary-600"}`}>
                      {post.category.name}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-slate-400 font-bold">
                      <Calendar className="w-3 h-3" /> {new Date(post.publishDate).toLocaleDateString()}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-primary-600 transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-slate-500 mb-6 line-clamp-3 flex-grow text-sm leading-relaxed whitespace-pre-wrap">
                    {post.metaDescription || post.title}
                  </p>
                  <span className="text-primary-600 font-bold flex items-center gap-1 group-hover:gap-2 transition-all text-sm">
                    Read Article <ChevronRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {posts.length === 0 && (
            <div className="text-center py-32 text-slate-400">
              <Tag className="w-16 h-16 mx-auto mb-4 opacity-20" />
              <p className="text-lg font-medium">No blog posts yet. Check back soon!</p>
            </div>
          )}
        </div>

        {/* Bottom Ad */}
        <div className="mt-20 max-w-6xl mx-auto flex justify-center">
          <ManualAdUnit adSlot={AD_SLOTS.IN_ARTICLE_HORIZONTAL} adFormat="horizontal" />
        </div>
      </div>
    </div>
  );
}
