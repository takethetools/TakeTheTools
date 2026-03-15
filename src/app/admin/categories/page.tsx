"use client";

import { useState, useEffect } from "react";
import {
    FolderTree,
    Plus,
    Trash2,
    Edit,
    Search,
    Save,
    X,
    AlertCircle,
    Loader2,
    Wrench,
    FileText
} from "lucide-react";
import { clsx } from "clsx";

export default function CategoriesAdminPage() {
    const [categories, setCategories] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingCategory, setEditingCategory] = useState<any>(null);
    const [formData, setFormData] = useState({ name: "", slug: "", description: "" });
    const [error, setError] = useState("");
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/admin/categories");
            const data = await res.json();
            if (Array.isArray(data)) {
                setCategories(data);
            } else {
                console.warn("Expected an array of categories, but received:", data);
                setCategories([]);
            }
        } catch (err) {
            console.error("Failed to fetch categories:", err);
            setCategories([]);
        } finally {
            setLoading(false);
        }
    };

    const handleSlugify = () => {
        if (formData.slug) return;
        const slug = formData.name
            .toLowerCase()
            .replace(/[^\w\s-]/g, "")
            .replace(/[\s_]+/g, "-")
            .replace(/^-+|-+$/g, "");
        setFormData(prev => ({ ...prev, slug }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setError("");

        const url = editingCategory ? `/api/admin/categories/${editingCategory.id}` : "/api/admin/categories";
        const method = editingCategory ? "PATCH" : "POST";

        try {
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                setEditingCategory(null);
                setFormData({ name: "", slug: "", description: "" });
                fetchCategories();
            } else {
                const data = await res.json();
                setError(data.error || "Failed to save category");
            }
        } catch (err) {
            setError("An error occurred");
        } finally {
            setSaving(false);
        }
    };

    const handleEdit = (cat: any) => {
        setEditingCategory(cat);
        setFormData({ name: cat.name, slug: cat.slug, description: cat.description || "" });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure? This cannot be undone.")) return;

        try {
            const res = await fetch(`/api/admin/categories/${id}`, { method: "DELETE" });
            if (res.ok) {
                fetchCategories();
            } else {
                const data = await res.json();
                alert(data.error || "Failed to delete");
            }
        } catch (err) {
            alert("Error deleting category");
        }
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-display font-bold text-slate-900 tracking-tight">Manage Categories</h1>
                <p className="text-slate-500 mt-1">Organize your tools and blog posts into logical groups.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Category Form */}
                <div className="lg:col-span-1">
                    <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm sticky top-28">
                        <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                            {editingCategory ? <Edit className="w-5 h-5 text-primary-600" /> : <Plus className="w-5 h-5 text-primary-600" />}
                            {editingCategory ? "Edit Category" : "Add New Category"}
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Category Name</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                    onBlur={handleSlugify}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all font-bold"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Slug</label>
                                <input
                                    type="text"
                                    value={formData.slug}
                                    onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-primary-500 transition-all font-mono text-xs"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Description</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                                    rows={4}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-primary-500 transition-all text-sm"
                                />
                            </div>

                            {error && (
                                <div className="p-3 bg-red-50 text-red-600 rounded-xl border border-red-100 flex items-center gap-2 text-sm">
                                    <AlertCircle className="w-4 h-4" /> {error}
                                </div>
                            )}

                            <div className="flex items-center gap-3">
                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="flex-1 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                                >
                                    {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                    {editingCategory ? "Update" : "Create Category"}
                                </button>
                                {editingCategory && (
                                    <button
                                        type="button"
                                        onClick={() => { setEditingCategory(null); setFormData({ name: "", slug: "", description: "" }); }}
                                        className="p-3 bg-slate-100 text-slate-500 rounded-xl hover:bg-slate-200 transition-all"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>

                {/* Categories List */}
                <div className="lg:col-span-2 space-y-4">
                    {loading ? (
                        <div className="bg-white p-20 rounded-[2rem] border border-slate-100 flex flex-col items-center justify-center gap-4">
                            <Loader2 className="w-10 h-10 text-primary-600 animate-spin" />
                            <p className="text-slate-500 font-medium">Loading categories...</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {Array.isArray(categories) && categories.map((cat) => (
                                <div key={cat.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow group relative">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="p-3 bg-primary-50 text-primary-600 rounded-2xl">
                                            <FolderTree className="w-6 h-6" />
                                        </div>
                                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => handleEdit(cat)}
                                                className="p-2 text-slate-400 hover:text-primary-600 hover:bg-slate-50 rounded-lg transition-all"
                                            >
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(cat.id)}
                                                className="p-2 text-slate-400 hover:text-red-500 hover:bg-slate-50 rounded-lg transition-all"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>

                                    <h3 className="text-lg font-bold text-slate-900 mb-1">{cat.name}</h3>
                                    <p className="text-xs text-slate-400 font-mono mb-3">category/{cat.slug}</p>
                                    <p className="text-sm text-slate-500 line-clamp-2 mb-4 h-10">{cat.description || "No description set."}</p>

                                    {/* Counts or links might go here */}
                                </div>
                            ))}
                            {categories.length === 0 && (
                                <div className="col-span-full bg-white p-20 rounded-[2rem] border border-slate-100 text-center text-slate-400 italic">
                                    No categories found. Create your first one on the left.
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
