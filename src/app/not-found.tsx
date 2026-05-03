import Link from "next/link";
import { Search, Home, ArrowRight, CornerDownRight, Zap } from "lucide-react";
import { CATEGORIES } from "@/lib/tools";

export default function NotFound() {
    return (
        <div className="min-h-[80vh] flex items-center justify-center pt-20 pb-20">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center">

                    {/* Animated 404 Header */}
                    <div className="relative mb-12">
                        <h1 className="text-[120px] md:text-[200px] font-display font-black text-slate-100 leading-none select-none">
                            404
                        </h1>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="bg-white/40 backdrop-blur-md px-8 py-4 rounded-3xl border border-white/50 shadow-2xl">
                                <p className="text-xl md:text-2xl font-bold text-slate-900">
                                    Page Not Found
                                </p>
                            </div>
                        </div>
                    </div>

                    <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed">
                        Oops! It seems like the page you are looking for has been moved or doesn't exist.
                        Let's get you back to work with our powerful tools.
                    </p>

                    {/* Search Box */}
                    <div className="max-w-2xl mx-auto mb-16 relative group">
                        <div className="absolute inset-0 bg-primary-400 opacity-10 blur-2xl group-hover:opacity-20 transition-opacity rounded-full"></div>
                        <div className="relative flex items-center bg-white rounded-2xl p-2 shadow-xl border border-slate-100">
                            <Search className="w-6 h-6 text-slate-400 ml-4 mr-2" />
                            <input
                                type="text"
                                placeholder="Search for a tool..."
                                className="bg-transparent border-none outline-none text-lg w-full py-4 text-slate-800"
                            />
                            <button className="bg-primary-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-primary-700 transition-all shadow-lg active:scale-95">
                                Search
                            </button>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
                        <Link
                            href="/"
                            className="flex items-center justify-center gap-3 p-6 bg-slate-900 text-white rounded-3xl font-bold hover:bg-slate-800 transition-all shadow-xl shadow-slate-200"
                        >
                            <Home className="w-5 h-5" />
                            Return to Homepage
                        </Link>
                        <Link
                            href="/tools"
                            className="flex items-center justify-center gap-3 p-6 bg-white border border-slate-200 text-slate-900 rounded-3xl font-bold hover:bg-slate-50 transition-all shadow-sm"
                        >
                            <Zap className="w-5 h-5" />
                            Browse All Tools
                        </Link>
                    </div>

                    {/* Popular Categories */}
                    <div className="text-left border-t border-slate-200 pt-12">
                        <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                            <CornerDownRight className="w-5 h-5 text-primary-600" />
                            Try exploring these categories instead:
                        </h3>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                            {CATEGORIES.slice(0, 4).map((cat) => (
                                <Link
                                    key={cat.id}
                                    href={`/categories/${cat.slug}`}
                                    className="p-4 bg-white border border-slate-100 rounded-2xl hover:border-primary-200 hover:shadow-md transition-all group"
                                >
                                    <p className="font-bold text-slate-800 text-sm group-hover:text-primary-600 flex items-center justify-between">
                                        {cat.name}
                                        <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all" />
                                    </p>
                                </Link>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
