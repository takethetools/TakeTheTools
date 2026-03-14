"use client";

import { useState, useEffect } from "react";
import { Link, Copy, Check, Hash, ArrowRight, Download, Trash2, Zap } from "lucide-react";
import confetti from "canvas-confetti";
import { cn } from "@/lib/utils";

export default function SlugGeneratorTool() {
    const [input, setInput] = useState("");
    const [slug, setSlug] = useState("");
    const [isCopied, setIsCopied] = useState(false);

    const generateSlug = (text: string) => {
        return text
            .toString()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
            .trim()
            .replace(/\s+/g, "-")
            .replace(/[^\w-]+/g, "")
            .replace(/--+/g, "-");
    };

    useEffect(() => {
        setSlug(generateSlug(input));
    }, [input]);

    const copyToClipboard = () => {
        if (!slug) return;
        navigator.clipboard.writeText(slug);
        setIsCopied(true);
        confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.8 },
        });
        setTimeout(() => setIsCopied(false), 2000);
    };

    const downloadSlug = () => {
        if (!slug) return;
        const blob = new Blob([slug], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "generated-slug.txt";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const clear = () => {
        setInput("");
    };

    return (
        <div className="space-y-6">
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-8">
                <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600">
                            <Link className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-slate-900">Slug Generator</h3>
                            <p className="text-sm text-slate-500">Create SEO-friendly URL slugs from text</p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <button
                            onClick={() => setInput("How to Optimize Website Performance for SEO 2024!")}
                            className="text-xs font-bold text-primary-500 hover:text-primary-600 transition-colors uppercase tracking-wider"
                        >
                            Example
                        </button>
                        <button
                            onClick={clear}
                            className="text-xs font-bold text-slate-400 hover:text-red-500 transition-colors flex items-center gap-1 uppercase tracking-wider"
                        >
                            <Trash2 className="w-3 h-3" /> Clear
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                    <div className="space-y-4">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-2">Input Text</label>
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Enter your title or text here..."
                            className="w-full h-48 p-6 bg-slate-50 border border-slate-100 rounded-2xl font-medium text-slate-700 focus:ring-2 focus:ring-primary-500 outline-none shadow-inner"
                        />
                    </div>

                    <div className="space-y-4">
                        <div className="flex justify-between items-center px-2">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">URL Slug</label>
                        </div>
                        <div className="relative group">
                            <div className="w-full min-h-[192px] p-6 bg-slate-900 text-blue-100 border border-slate-800 rounded-2xl font-mono text-lg break-all flex items-center justify-center text-center">
                                {slug || "your-slug-here"}
                            </div>
                            {slug && (
                                <div className="absolute top-4 right-4 flex gap-2">
                                    <button
                                        onClick={downloadSlug}
                                        className="p-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all opacity-0 group-hover:opacity-100"
                                        title="Download as .txt"
                                    >
                                        <Download className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={copyToClipboard}
                                        className={cn(
                                            "p-2 rounded-lg transition-all shadow-lg opacity-0 group-hover:opacity-100",
                                            isCopied ? "bg-green-600 text-white" : "bg-primary-600 text-white hover:bg-primary-700"
                                        )}
                                        title="Copy to Clipboard"
                                    >
                                        {isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {slug && (
                    <div className="p-6 bg-primary-50 rounded-2xl border border-primary-100 flex items-center gap-4">
                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-primary-600 shadow-sm shrink-0">
                            <Zap className="w-5 h-5" />
                        </div>
                        <div>
                            <span className="text-xs font-bold text-primary-400 uppercase tracking-widest">Preview URL</span>
                            <p className="text-primary-900 font-mono text-sm truncate">
                                takethetools.com/blog/<span className="font-bold text-primary-600">{slug}</span>
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
