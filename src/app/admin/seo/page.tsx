"use client";

import { useState, useEffect } from "react";
import {
    Globe,
    Save,
    Loader2,
    CheckCircle2,
    AlertCircle,
    Link as LinkIcon,
    Search,
    DollarSign
} from "lucide-react";
import { clsx } from "clsx";

export default function SeoAdminPage() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [config, setConfig] = useState<any>({
        siteName: "",
        siteDescription: "",
        metaTitle: "",
        metaDescription: "",
        ogImage: "",
        analyticsId: "",
        twitterHandle: "",
        adSenseId: ""
    });
    const [message, setMessage] = useState({ type: "", text: "" });

    useEffect(() => {
        fetchConfig();
    }, []);

    const fetchConfig = async () => {
        try {
            const res = await fetch("/api/admin/config?type=config");
            const data = await res.json();
            if (data) {
                setConfig(data);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setMessage({ type: "", text: "" });

        try {
            const res = await fetch("/api/admin/config?type=config", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(config),
            });

            if (res.ok) {
                setMessage({ type: "success", text: "SEO configuration saved successfully!" });
                fetchConfig(); // Refresh data
            } else {
                setMessage({ type: "error", text: "Failed to save configuration." });
            }
        } catch (err) {
            setMessage({ type: "error", text: "An error occurred while saving." });
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="py-20 flex flex-col items-center justify-center gap-4">
                <Loader2 className="w-10 h-10 text-primary-600 animate-spin" />
                <p className="text-slate-500 font-medium font-display">Loading SEO settings...</p>
            </div>
        );
    }

    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            <div>
                <h1 className="text-3xl font-display font-bold text-slate-900 tracking-tight">SEO & Site Manager</h1>
                <p className="text-slate-500 mt-1">Global search engine optimization, site identity, and monetization settings.</p>
            </div>

            {message.text && (
                <div className={clsx(
                    "p-4 rounded-2xl border flex items-center gap-3 font-medium transition-all animate-in fade-in slide-in-from-top-2",
                    message.type === "success" ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-red-50 text-red-600 border-red-100"
                )}>
                    {message.type === "success" ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                    {message.text}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm space-y-6">
                    <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                        <Globe className="w-5 h-5 text-primary-600" />
                        General Site Metadata
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Site Name</label>
                            <input
                                type="text"
                                value={config.siteName || ""}
                                onChange={(e) => setConfig({ ...config, siteName: e.target.value })}
                                placeholder="TakeTheTools"
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-primary-500 transition-all font-bold"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Default Page Title</label>
                            <input
                                type="text"
                                value={config.metaTitle || ""}
                                onChange={(e) => setConfig({ ...config, metaTitle: e.target.value })}
                                placeholder="Free Online Tools for Developers and Creators"
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-primary-500 transition-all text-sm"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Global Meta Description</label>
                        <textarea
                            value={config.metaDescription || ""}
                            onChange={(e) => setConfig({ ...config, metaDescription: e.target.value })}
                            rows={4}
                            placeholder="The ultimate collection of free online tools..."
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-primary-500 transition-all text-sm"
                        />
                    </div>
                </div>

                <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm space-y-6">
                    <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                        <DollarSign className="w-5 h-5 text-emerald-600" />
                        Monetization & Analytics
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">AdSense Publisher ID</label>
                            <input
                                type="text"
                                value={config.adSenseId || ""}
                                onChange={(e) => setConfig({ ...config, adSenseId: e.target.value })}
                                placeholder="ca-pub-XXXXXXXXXXXXXXXX"
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-primary-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Analytics ID (G-XXXX)</label>
                            <input
                                type="text"
                                value={config.analyticsId || ""}
                                onChange={(e) => setConfig({ ...config, analyticsId: e.target.value })}
                                placeholder="G-XXXXXXXXXX"
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-primary-500"
                            />
                        </div>
                    </div>
                </div>

                <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm space-y-6">
                    <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                        <LinkIcon className="w-5 h-5 text-primary-600" />
                        Social & Branding
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Twitter Handle</label>
                            <input
                                type="text"
                                value={config.twitterHandle || ""}
                                onChange={(e) => setConfig({ ...config, twitterHandle: e.target.value })}
                                placeholder="@takethetools"
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-primary-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">OG Image URL</label>
                            <input
                                type="text"
                                value={config.ogImage || ""}
                                onChange={(e) => setConfig({ ...config, ogImage: e.target.value })}
                                placeholder="https://takethetools.com/og-image.png"
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-primary-500"
                            />
                        </div>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={saving}
                    className="w-full py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 disabled:opacity-50 transition-all flex items-center justify-center gap-2 shadow-xl shadow-slate-200"
                >
                    {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                    Save Global Configuration
                </button>
            </form>
        </div>
    );
}
