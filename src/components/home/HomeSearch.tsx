"use client";

import { useState, useEffect } from "react";
import { Search, Zap, ArrowRight, X, Loader2 } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function HomeSearch() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<any[]>([]);
    const [isFocused, setIsFocused] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const performSearch = async () => {
            if (query.trim().length > 1) {
                setIsLoading(true);
                try {
                    const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
                    const data = await res.json();
                    setResults(data);
                } catch (err) {
                    console.error("Search failed", err);
                    setResults([]);
                } finally {
                    setIsLoading(false);
                }
            } else {
                setResults([]);
            }
        };

        const debounce = setTimeout(performSearch, 300);
        return () => clearTimeout(debounce);
    }, [query]);

    return (
        <div className="max-w-2xl mx-auto relative group">
            <div className="absolute inset-0 bg-primary-400 opacity-20 blur-2xl group-hover:opacity-30 transition-opacity rounded-full"></div>
            <div className="relative flex items-center bg-white rounded-2xl p-2 shadow-2xl border border-slate-100">
                <Search className="w-6 h-6 text-slate-400 ml-4 mr-2" />
                <input
                    type="text"
                    placeholder="Search over 200+ tools..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                    className="bg-transparent border-none outline-none text-lg w-full py-4 text-slate-800"
                />
                {isLoading && (
                    <Loader2 className="w-5 h-5 text-primary-600 animate-spin mr-2" />
                )}
                {query && !isLoading && (
                    <button
                        onClick={() => setQuery("")}
                        className="p-2 hover:bg-slate-100 rounded-full mr-2 text-slate-400"
                    >
                        <X className="w-5 h-5" />
                    </button>
                )}
                <button className="bg-primary-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-primary-700 transition-all shadow-lg active:scale-95 hidden md:block">
                    Search
                </button>
            </div>

            {/* Results Dropdown */}
            <AnimatePresence>
                {isFocused && results.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-full left-0 right-0 mt-4 bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden z-50 p-2"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {results.map(tool => (
                                <Link
                                    key={tool.id}
                                    href={`/tools/${tool.slug}`}
                                    className="flex items-center gap-3 p-4 hover:bg-slate-50 rounded-2xl transition-colors group"
                                >
                                    <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center text-primary-600 group-hover:bg-primary-600 group-hover:text-white transition-colors">
                                        <Zap className="w-6 h-6" />
                                    </div>
                                    <div className="flex-grow text-left">
                                        <h4 className="font-bold text-slate-900 group-hover:text-primary-600">{tool.name}</h4>
                                        <p className="text-xs text-slate-500 line-clamp-1">{tool.description}</p>
                                    </div>
                                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-primary-600 group-hover:translate-x-1 transition-all" />
                                </Link>
                            ))}
                        </div>
                        <div className="p-4 border-t border-slate-50 text-center">
                            <Link href="/categories" className="text-sm font-bold text-primary-600 hover:underline">
                                Explore all tools across all categories →
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
