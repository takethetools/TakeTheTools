import prisma from "@/lib/db";
import {
    Wrench,
    FileText,
    FolderTree,
    Plus,
    ArrowUpRight,
    Clock
} from "lucide-react";
import Link from "next/link";

async function getStats() {
    const [toolsCount, blogsCount, categoriesCount, recentBlogs, recentTools] = await Promise.all([
        prisma.tool.count(),
        prisma.blog.count(),
        prisma.category.count(),
        prisma.blog.findMany({
            take: 5,
            orderBy: { createdAt: 'desc' },
            include: { category: true }
        }),
        prisma.tool.findMany({
            take: 5,
            orderBy: { createdAt: 'desc' }
        })
    ]);

    return { toolsCount, blogsCount, categoriesCount, recentBlogs, recentTools };
}

export default async function AdminDashboardPage() {
    const { toolsCount, blogsCount, categoriesCount, recentBlogs, recentTools } = await getStats();

    const cards = [
        { label: "Total Tools", value: toolsCount, icon: Wrench, color: "bg-blue-500", href: "/admin/tools" },
        { label: "Blog Posts", value: blogsCount, icon: FileText, color: "bg-purple-500", href: "/admin/blogs" },
        { label: "Categories", value: categoriesCount, icon: FolderTree, color: "bg-emerald-500", href: "/admin/categories" },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-display font-bold text-slate-900 tracking-tight">Dashboard Overview</h1>
                <p className="text-slate-500 mt-1">Management summary for TakeTheTools.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {cards.map((card) => (
                    <Link
                        key={card.label}
                        href={card.href}
                        className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-shadow group"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-3 rounded-2xl ${card.color} text-white shadow-lg shadow-slate-200`}>
                                <card.icon className="w-6 h-6" />
                            </div>
                            <ArrowUpRight className="w-5 h-5 text-slate-300 group-hover:text-primary-500 transition-colors" />
                        </div>
                        <p className="text-slate-500 font-medium">{card.label}</p>
                        <h3 className="text-4xl font-display font-bold text-slate-900 mt-1">{card.value}</h3>
                    </Link>
                ))}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                {/* Recent Blogs */}
                <div className="bg-white rounded-[2rem] border border-slate-100 overflow-hidden shadow-sm">
                    <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                            <Clock className="w-5 h-5 text-primary-500" />
                            Recent Blog Posts
                        </h2>
                        <Link href="/admin/blogs/new" className="text-sm py-2 px-4 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-all flex items-center gap-2 font-bold">
                            <Plus className="w-4 h-4" /> New Post
                        </Link>
                    </div>
                    <div className="divide-y divide-slate-50">
                        {recentBlogs.map((blog) => (
                            <div key={blog.id} className="p-6 hover:bg-slate-50 transition-colors flex items-center justify-between">
                                <div>
                                    <h4 className="font-bold text-slate-900 line-clamp-1">{blog.title}</h4>
                                    <div className="flex items-center gap-3 mt-1">
                                        <span className="text-xs px-2 py-1 bg-slate-100 text-slate-500 rounded-md">{blog.category.name}</span>
                                        <span className="text-xs text-slate-400">{new Date(blog.createdAt).toLocaleDateString()}</span>
                                    </div>
                                </div>
                                <Link href={`/admin/blogs/edit/${blog.id}`} className="p-2 hover:bg-white rounded-lg border border-transparent hover:border-slate-200 transition-all">
                                    <ArrowUpRight className="w-4 h-4 text-slate-400" />
                                </Link>
                            </div>
                        ))}
                        {recentBlogs.length === 0 && (
                            <div className="p-12 text-center text-slate-400 italic">No blog posts found.</div>
                        )}
                    </div>
                </div>

                {/* Recent Tools */}
                <div className="bg-white rounded-[2rem] border border-slate-100 overflow-hidden shadow-sm">
                    <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                            <Wrench className="w-5 h-5 text-primary-500" />
                            Recently Added Tools
                        </h2>
                        <Link href="/admin/tools/new" className="text-sm py-2 px-4 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-all flex items-center gap-2 font-bold">
                            <Plus className="w-4 h-4" /> Add Tool
                        </Link>
                    </div>
                    <div className="divide-y divide-slate-50">
                        {recentTools.map((tool) => (
                            <div key={tool.id} className="p-6 hover:bg-slate-50 transition-colors flex items-center justify-between">
                                <div>
                                    <h4 className="font-bold text-slate-900">{tool.name}</h4>
                                    <p className="text-xs text-slate-400 mt-1">{tool.slug}</p>
                                </div>
                                <Link href={`/admin/tools/edit/${tool.id}`} className="p-2 hover:bg-white rounded-lg border border-transparent hover:border-slate-200 transition-all">
                                    <ArrowUpRight className="w-4 h-4 text-slate-400" />
                                </Link>
                            </div>
                        ))}
                        {recentTools.length === 0 && (
                            <div className="p-12 text-center text-slate-400 italic">No tools added yet.</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
