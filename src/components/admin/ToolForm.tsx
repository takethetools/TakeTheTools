"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
    Save,
    ArrowLeft,
    Plus,
    Trash2,
    Wrench,
    Globe,
    Settings,
    AlertCircle,
    Loader2,
    HelpCircle,
    ListChecks
} from "lucide-react";
import Link from "next/link";
import { clsx } from "clsx";

interface ToolFormProps {
    initialData?: any;
}

export default function ToolForm({ initialData }: ToolFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [categories, setCategories] = useState<any[]>([]);

    const [formData, setFormData] = useState({
        name: initialData?.name || "",
        slug: initialData?.slug || "",
        description: initialData?.description || "",
        longDescription: initialData?.longDescription || "",
        categoryId: initialData?.categoryId || "",
        metaTitle: initialData?.metaTitle || "",
        metaDescription: initialData?.metaDescription || "",
        iconName: initialData?.iconName || "Wrench",
        isPopular: initialData?.isPopular ?? false,
        instructions: initialData?.instructions ? JSON.parse(initialData.instructions) : [""],
        faqs: initialData?.faqs ? JSON.parse(initialData.faqs) : [{ question: "", answer: "" }],
        exampleInput: initialData?.exampleInput || "",
        componentName: initialData?.componentName || "",
    });

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const res = await fetch("/api/admin/categories");
            const data = await res.json();
            setCategories(data);
            if (!formData.categoryId && data.length > 0) {
                setFormData(prev => ({ ...prev, categoryId: data[0].id }));
            }
        } catch (err) {
            console.error("Failed to fetch categories");
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

    const addInstruction = () => {
        setFormData(prev => ({ ...prev, instructions: [...prev.instructions, ""] }));
    };

    const removeInstruction = (index: number) => {
        const newInst = [...formData.instructions];
        newInst.splice(index, 1);
        setFormData(prev => ({ ...prev, instructions: newInst }));
    };

    const updateInstruction = (index: number, value: string) => {
        const newInst = [...formData.instructions];
        newInst[index] = value;
        setFormData(prev => ({ ...prev, instructions: newInst }));
    };

    const addFaq = () => {
        setFormData(prev => ({ ...prev, faqs: [...prev.faqs, { question: "", answer: "" }] }));
    };

    const removeFaq = (index: number) => {
        const newFaqs = [...formData.faqs];
        newFaqs.splice(index, 1);
        setFormData(prev => ({ ...prev, faqs: newFaqs }));
    };

    const updateFaq = (index: number, field: string, value: string) => {
        const newFaqs = [...formData.faqs];
        newFaqs[index] = { ...newFaqs[index], [field]: value };
        setFormData(prev => ({ ...prev, faqs: newFaqs }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const url = initialData ? `/api/admin/tools/${initialData.id}` : "/api/admin/tools";
        const method = initialData ? "PATCH" : "POST";

        try {
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            if (res.ok) {
                router.push("/admin/tools");
                router.refresh();
            } else {
                setError(data.error || "Something went wrong");
            }
        } catch (err) {
            setError("Failed to save tool");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8 max-w-6xl mx-auto pb-20">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/admin/tools" className="p-2 hover:bg-white rounded-xl border border-transparent hover:border-slate-200 transition-all">
                        <ArrowLeft className="w-5 h-5 text-slate-500" />
                    </Link>
                    <h1 className="text-3xl font-display font-bold text-slate-900 tracking-tight">
                        {initialData ? `Edit: ${initialData.name}` : "Add New Tool"}
                    </h1>
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="px-8 py-3 bg-primary-600 text-white font-bold rounded-2xl hover:bg-primary-700 disabled:opacity-50 transition-all flex items-center gap-2 shadow-lg shadow-primary-200"
                >
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                    {initialData ? "Save Tool" : "Add Tool"}
                </button>
            </div>

            {error && (
                <div className="p-4 bg-red-50 text-red-600 rounded-xl border border-red-100 flex items-center gap-3 font-medium">
                    <AlertCircle className="w-5 h-5" /> {error}
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    {/* Core Details */}
                    <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm space-y-6">
                        <h3 className="font-bold text-slate-900 flex items-center gap-2 text-lg">
                            <Wrench className="w-5 h-5 text-primary-600" />
                            Tool Details
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2">
                                <label className="block text-sm font-bold text-slate-700 mb-2">Tool Name</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                    onBlur={handleSlugify}
                                    placeholder="e.g. WebP to PNG Converter"
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all font-bold"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Category</label>
                                <select
                                    value={formData.categoryId}
                                    onChange={(e) => setFormData(prev => ({ ...prev, categoryId: e.target.value }))}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all font-medium"
                                    required
                                >
                                    {categories.map(cat => (
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Icon Name (Lucide)</label>
                                <input
                                    type="text"
                                    value={formData.iconName}
                                    onChange={(e) => setFormData(prev => ({ ...prev, iconName: e.target.value }))}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all font-mono text-sm"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Short Description</label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                                rows={2}
                                placeholder="Brief summary for cards..."
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all text-sm"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Long Description (Intro Text)</label>
                            <textarea
                                value={formData.longDescription}
                                onChange={(e) => setFormData(prev => ({ ...prev, longDescription: e.target.value }))}
                                rows={4}
                                placeholder="Detailed text for tool page intro..."
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all text-sm"
                            />
                        </div>
                    </div>

                    {/* Instructions */}
                    <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="font-bold text-slate-900 flex items-center gap-2 text-lg">
                                <ListChecks className="w-5 h-5 text-primary-600" />
                                How to Use
                            </h3>
                            <button
                                type="button"
                                onClick={addInstruction}
                                className="text-primary-600 hover:text-primary-700 font-bold text-sm flex items-center gap-1"
                            >
                                <Plus className="w-4 h-4" /> Add Step
                            </button>
                        </div>

                        <div className="space-y-4">
                            {formData.instructions.map((inst: string, index: number) => (
                                <div key={index} className="flex gap-4">
                                    <div className="flex-none w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center font-bold text-sm">
                                        {index + 1}
                                    </div>
                                    <input
                                        type="text"
                                        value={inst}
                                        onChange={(e) => updateInstruction(index, e.target.value)}
                                        placeholder="Describe a step..."
                                        className="flex-1 px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:border-primary-500 outline-none"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeInstruction(index)}
                                        className="p-2 text-slate-300 hover:text-red-500 transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* FAQs */}
                    <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="font-bold text-slate-900 flex items-center gap-2 text-lg">
                                <HelpCircle className="w-5 h-5 text-primary-600" />
                                FAQs
                            </h3>
                            <button
                                type="button"
                                onClick={addFaq}
                                className="text-primary-600 hover:text-primary-700 font-bold text-sm flex items-center gap-1"
                            >
                                <Plus className="w-4 h-4" /> Add FAQ
                            </button>
                        </div>

                        <div className="space-y-6">
                            {formData.faqs.map((faq: any, index: number) => (
                                <div key={index} className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-4 relative group">
                                    <button
                                        type="button"
                                        onClick={() => removeFaq(index)}
                                        className="absolute top-4 right-4 p-2 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 mb-1 uppercase tracking-wider">Question</label>
                                        <input
                                            type="text"
                                            value={faq.question}
                                            onChange={(e) => updateFaq(index, "question", e.target.value)}
                                            placeholder="e.g. Is this tool free?"
                                            className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl outline-none focus:border-primary-500 font-bold"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 mb-1 uppercase tracking-wider">Answer</label>
                                        <textarea
                                            value={faq.answer}
                                            onChange={(e) => updateFaq(index, "answer", e.target.value)}
                                            placeholder="e.g. Yes, absolutely!"
                                            rows={2}
                                            className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl outline-none focus:border-primary-500 text-sm"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-8">
                    <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm space-y-6">
                        <h3 className="font-bold text-slate-900 flex items-center gap-2">
                            <Settings className="w-5 h-5 text-primary-600" />
                            Technical
                        </h3>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">URL Slug</label>
                            <input
                                type="text"
                                value={formData.slug}
                                onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-primary-500 outline-none font-mono text-xs"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Component Name</label>
                            <input
                                type="text"
                                value={formData.componentName}
                                onChange={(e) => setFormData(prev => ({ ...prev, componentName: e.target.value }))}
                                placeholder="e.g. WebpToPng"
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none font-mono text-xs"
                            />
                        </div>

                        <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100 cursor-pointer" onClick={() => setFormData(prev => ({ ...prev, isPopular: !prev.isPopular }))}>
                            <input
                                type="checkbox"
                                checked={formData.isPopular}
                                onChange={() => { }}
                                className="w-5 h-5 rounded border-slate-300 text-primary-600 focus:ring-primary-500"
                            />
                            <span className="font-bold text-slate-700 select-none">Mark as Popular</span>
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm space-y-6">
                        <h3 className="font-bold text-slate-900 flex items-center gap-2">
                            <Globe className="w-5 h-5 text-primary-600" />
                            SEO
                        </h3>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Meta Title</label>
                            <input
                                type="text"
                                value={formData.metaTitle}
                                onChange={(e) => setFormData(prev => ({ ...prev, metaTitle: e.target.value }))}
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none text-sm"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Meta Description</label>
                            <textarea
                                value={formData.metaDescription}
                                onChange={(e) => setFormData(prev => ({ ...prev, metaDescription: e.target.value }))}
                                rows={4}
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none text-sm"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}
