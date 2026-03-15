"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
    Plus,
    Search,
    MoreVertical,
    Edit,
    Trash2,
    Eye,
    Filter,
    CheckCircle2,
    Clock,
    ChevronLeft,
    ChevronRight,
    Loader2
} from "lucide-react";
import { clsx } from "clsx";

export default function BlogsAdminPage() {
    const [blogs, setBlogs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("all");

    useEffect(() => {
        fetchBlogs();
    }, [status]);

    const fetchBlogs = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/admin/blogs?status=${status}&q=${search}`);
            const data = await res.json();
            if (Array.isArray(data)) {
                setBlogs(data);
            } else {
                console.warn("Expected an array of blogs, but received:", data);
                setBlogs([]);
            }
        } catch (err) {
            console.error("Failed to fetch blogs:", err);
            setBlogs([]);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        fetchBlogs();
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this blog post?")) return;

        try {
            const res = await fetch(`/api/admin/blogs/${id}`, { method: "DELETE" });
            if (res.ok) fetchBlogs();
        } catch (err) {
            alert("Failed to delete blog post");
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-display font-bold text-slate-900 tracking-tight">Manage Blogs</h1>
                    <p className="text-slate-500 mt-1">Create and edit articles for your website.</p>
                </div>
                <Link
                    href="/admin/blogs/new"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white font-bold rounded-2xl hover:bg-primary-700 transition-all shadow-lg shadow-primary-200"
                >
                    <Plus className="w-5 h-5" />
                    Create New Post
                </Link>
            </div>

            {/* Filters & Search */}
            <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col md:flex-row gap-4 items-center">
                <form onSubmit={handleSearch} className="relative flex-1 group w-full">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary-500 transition-colors" />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search blogs by title or slug..."
                        className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all"
                    />
                </form>

                <div className="flex items-center gap-2 w-full md:w-auto">
                    <Filter className="w-5 h-5 text-slate-400 hidden sm:block" />
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="flex-1 md:w-48 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-primary-500 transition-all"
                    >
                        <option value="all">All Status</option>
                        <option value="published">Published</option>
                        <option value="draft">Draft</option>
                    </select>
                </div>
            </div>

            {/* Blog Table */}
            <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
                {loading ? (
                    <div className="py-20 flex flex-col items-center justify-center gap-4">
                        <Loader2 className="w-10 h-10 text-primary-600 animate-spin" />
                        <p className="text-slate-500 font-medium font-display">Loading blog posts...</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-slate-50/50 border-b border-slate-100">
                                    <th className="px-8 py-5 text-sm font-bold text-slate-900 uppercase tracking-wider">Blog Title</th>
                                    <th className="px-8 py-5 text-sm font-bold text-slate-900 uppercase tracking-wider">Category</th>
                                    <th className="px-8 py-5 text-sm font-bold text-slate-900 uppercase tracking-wider">Status</th>
                                    <th className="px-8 py-5 text-sm font-bold text-slate-900 uppercase tracking-wider">Date</th>
                                    <th className="px-8 py-5 text-sm font-bold text-slate-900 uppercase tracking-wider text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {Array.isArray(blogs) && blogs.map((blog) => (
                                    <tr key={blog.id} className="hover:bg-slate-50/50 transition-colors group">
                                        <td className="px-8 py-5">
                                            <div className="flex flex-col">
                                                <span className="font-bold text-slate-900 line-clamp-1">{blog.title}</span>
                                                <span className="text-xs text-slate-400 mt-1">/{blog.slug}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <span className="text-xs px-2 py-1 bg-slate-100 text-slate-600 font-bold rounded-lg uppercase tracking-tight">
                                                {blog.category.name}
                                            </span>
                                        </td>
                                        <td className="px-8 py-5">
                                            {blog.isPublished ? (
                                                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-xs font-bold border border-emerald-100">
                                                    <CheckCircle2 className="w-3 h-3" /> Published
                                                </div>
                                            ) : (
                                                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-yellow-50 text-yellow-600 rounded-full text-xs font-bold border border-yellow-100">
                                                    <Clock className="w-3 h-3" /> Draft
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-8 py-5">
                                            <span className="text-sm text-slate-500">
                                                {new Date(blog.publishDate).toLocaleDateString()}
                                            </span>
                                        </td>
                                        <td className="px-8 py-5 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Link
                                                    href={`/blog/${blog.slug}`}
                                                    target="_blank"
                                                    className="p-2 text-slate-400 hover:text-primary-600 hover:bg-white rounded-lg transition-all border border-transparent hover:border-slate-100 shadow-sm shadow-transparent hover:shadow-slate-200"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </Link>
                                                <Link
                                                    href={`/admin/blogs/edit/${blog.id}`}
                                                    className="p-2 text-slate-400 hover:text-primary-600 hover:bg-white rounded-lg transition-all border border-transparent hover:border-slate-100 shadow-sm shadow-transparent hover:shadow-slate-200"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(blog.id)}
                                                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-white rounded-lg transition-all border border-transparent hover:border-slate-100 shadow-sm shadow-transparent hover:shadow-slate-200"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {blogs.length === 0 && !loading && (
                                    <tr>
                                        <td colSpan={5} className="py-20 text-center">
                                            <div className="flex flex-col items-center justify-center gap-4">
                                                <div className="p-4 bg-slate-50 rounded-full">
                                                    <Search className="w-10 h-10 text-slate-300" />
                                                </div>
                                                <p className="text-slate-500 font-medium">No blog posts found matching your criteria.</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
