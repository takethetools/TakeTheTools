import Link from "next/link";
import { getSortedPostsData } from "@/lib/blog";
import { ChevronRight, Calendar, Tag, Clock } from "lucide-react";
import React from "react";

export const metadata = {
  title: "Blog - TakeThe Tools Insights",
  description: "Read our latest articles on how to use online tools, productivity tips, and developer guides.",
  openGraph: {
    title: "Blog - TakeThe Tools",
    description: "Tips, tutorials and guides for using free online tools to boost your productivity.",
    url: "https://takethetools.com/blog",
  },
  alternates: {
    canonical: "https://takethetools.com/blog",
  },
};

const CATEGORY_COLORS: Record<string, string> = {
  "Image Tools": "bg-pink-100 text-pink-600",
  "PDF Tools": "bg-amber-100 text-amber-600",
  "Developer Tools": "bg-blue-100 text-blue-600",
  "Text Tools": "bg-slate-100 text-slate-600",
  "Security & Privacy": "bg-red-100 text-red-600",
  "Math & Calculators": "bg-green-100 text-green-600",
  "Marketing & Social": "bg-orange-100 text-orange-600",
};

export default function BlogPage() {
  const posts = getSortedPostsData();

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

          {/* Featured Post */}
          {posts.length > 0 && (
            <div className="mb-16">
              <Link
                href={`/blog/${posts[0].slug}`}
                className="group grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden hover:shadow-2xl hover:shadow-primary-100/30 transition-all"
              >
                <div
                  className="h-72 lg:h-full bg-slate-100 overflow-hidden flex items-center justify-center"
                  style={{ backgroundImage: `url(${posts[0].image})`, backgroundSize: "cover", backgroundPosition: "center" }}
                >
                  {!posts[0].image && <Tag className="w-16 h-16 text-slate-200 opacity-40" />}
                </div>
                <div className="p-10 lg:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-4 mb-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${CATEGORY_COLORS[posts[0].category] || "bg-primary-50 text-primary-600"}`}>
                      {posts[0].category}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-slate-400 font-bold">
                      <Calendar className="w-3 h-3" /> {posts[0].date}
                    </span>
                  </div>
                  <h2 className="text-3xl font-bold text-slate-900 mb-4 group-hover:text-primary-600 transition-colors leading-tight">
                    {posts[0].title}
                  </h2>
                  <p className="text-slate-500 mb-8 leading-relaxed line-clamp-3">
                    {posts[0].description}
                  </p>
                  <span className="text-primary-600 font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
                    Read Article <ChevronRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            </div>
          )}


          {/* Post Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.slice(1).map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group bg-white rounded-3xl border border-slate-100 overflow-hidden hover:shadow-2xl hover:shadow-primary-100/20 transition-all flex flex-col"
              >
                {/* Cover Image */}
                <div
                  className="h-48 bg-slate-100 overflow-hidden"
                  style={post.image ? { backgroundImage: `url(${post.image})`, backgroundSize: "cover", backgroundPosition: "center" } : {}}
                >
                  {!post.image && (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100 group-hover:from-primary-100 group-hover:to-primary-200 transition-all">
                      <Tag className="w-12 h-12 text-primary-300" />
                    </div>
                  )}
                </div>

                <div className="p-8 flex-grow flex flex-col">
                  <div className="flex items-center gap-4 mb-4">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider ${CATEGORY_COLORS[post.category] || "bg-primary-50 text-primary-600"}`}>
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-slate-400 font-bold">
                      <Calendar className="w-3 h-3" /> {post.date}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-primary-600 transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-slate-500 mb-6 line-clamp-3 flex-grow text-sm leading-relaxed">
                    {post.description}
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
      </div>
    </div>
  );
}
