"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
    Plus,
    Search,
    Edit,
    Trash2,
    Eye,
    Filter,
    Star,
    Loader2,
    Wrench
} from "lucide-react";

export default function ToolsAdminPage() {
    const [tools, setTools] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [categoryId, setCategoryId] = useState("all");
    const [categories, setCategories] = useState<any[]>([]);

    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => {
        fetchTools();
    }, [categoryId]);

    const fetchCategories = async () => {
        try {
            const res = await fetch("/api/admin/categories");
            const data = await res.json();
            setCategories(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error(err);
            setCategories([]);
        }
    };

    const fetchTools = async () => {
        setLoading(true);
        try {
            const catParam = categoryId !== "all" ? `&categoryId=${categoryId}` : "";
            const res = await fetch(`/api/admin/tools?q=${search}${catParam}`);
            const data = await res.json();
            setTools(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        fetchTools();
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this tool?")) return;

        try {
            const res = await fetch(`/api/admin/tools/${id}`, { method: "DELETE" });
            if (res.ok) fetchTools();
        } catch (err) {
            alert("Failed to delete tool");
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-display font-bold text-slate-900 tracking-tight">Manage Tools</h1>
                    <p className="text-slate-500 mt-1">Configure and organize your online tools.</p>
                </div>
                <Link
                    href="/admin/tools/new"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white font-bold rounded-2xl hover:bg-primary-700 transition-all shadow-lg shadow-primary-200"
                >
                    <Plus className="w-5 h-5" />
                    Add New Tool
                </Link>
            </div>

            <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col md:flex-row gap-4 items-center">
                <form onSubmit={handleSearch} className="relative flex-1 group w-full">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary-500 transition-colors" />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search tools by name or slug..."
                        className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all"
                    />
                </form>

                <div className="flex items-center gap-2 w-full md:w-auto">
                    <Filter className="w-5 h-5 text-slate-400 hidden sm:block" />
                    <select
                        value={categoryId}
                        onChange={(e) => setCategoryId(e.target.value)}
                        className="flex-1 md:w-48 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-primary-500 transition-all"
                    >
                        <option value="all">All Categories</option>
                        {categories.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
                {loading ? (
                    <div className="py-20 flex flex-col items-center justify-center gap-4">
                        <Loader2 className="w-10 h-10 text-primary-600 animate-spin" />
                        <p className="text-slate-500 font-medium">Loading tools...</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-slate-50/50 border-b border-slate-100">
                                    <th className="px-8 py-5 text-sm font-bold text-slate-900 uppercase tracking-wider">Tool Name</th>
                                    <th className="px-8 py-5 text-sm font-bold text-slate-900 uppercase tracking-wider">Category</th>
                                    <th className="px-8 py-5 text-sm font-bold text-slate-900 uppercase tracking-wider">Popular</th>
                                    <th className="px-8 py-5 text-sm font-bold text-slate-900 uppercase tracking-wider text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {tools.map((tool) => (
                                    <tr key={tool.id} className="hover:bg-slate-50/50 transition-colors group">
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-slate-50 rounded-lg text-slate-400 group-hover:text-primary-600 transition-colors">
                                                    <Wrench className="w-4 h-4" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="font-bold text-slate-900 line-clamp-1">{tool.name}</span>
                                                    <span className="text-xs text-slate-400 mt-1">/{tool.slug}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <span className="text-xs px-2 py-1 bg-slate-100 text-slate-600 font-bold rounded-lg uppercase tracking-tight">
                                                {tool.category.name}
                                            </span>
                                        </td>
                                        <td className="px-8 py-5">
                                            {tool.isPopular && (
                                                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-600 rounded-full text-xs font-bold border border-amber-100">
                                                    <Star className="w-3 h-3 fill-amber-600" /> Popular
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-8 py-5 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Link
                                                    href={`/tools/${tool.slug}`}
                                                    target="_blank"
                                                    className="p-2 text-slate-400 hover:text-primary-600 hover:bg-white rounded-lg transition-all border border-transparent hover:border-slate-100 shadow-sm"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </Link>
                                                <Link
                                                    href={`/admin/tools/edit/${tool.id}`}
                                                    className="p-2 text-slate-400 hover:text-primary-600 hover:bg-white rounded-lg transition-all border border-transparent hover:border-slate-100 shadow-sm"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(tool.id)}
                                                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-white rounded-lg transition-all border border-transparent hover:border-slate-100 shadow-sm"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {tools.length === 0 && !loading && (
                                    <tr>
                                        <td colSpan={4} className="py-20 text-center text-slate-500">No tools found matching your search.</td>
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
