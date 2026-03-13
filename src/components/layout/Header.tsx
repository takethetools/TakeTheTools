"use client";
import Image from "next/image";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Menu, X, Zap, ArrowRight, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { TOOLS, Tool } from "@/lib/tools";
import { cn } from "@/lib/utils";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Tool[]>([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const filtered = TOOLS.filter(tool =>
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 6);
      setSearchResults(filtered);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white/80 backdrop-blur-lg shadow-sm py-3" : "bg-transparent py-5"
        }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <Image
            src="/logo.webp"
            alt="TakeThe Tools Logo"
            width={200}
            height={64}
            priority
            className="h-14 md:h-16 w-auto object-contain transition-transform group-hover:scale-105"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/categories" className="text-slate-600 hover:text-primary-600 font-medium transition-colors">Categories</Link>
          <Link href="/about" className="text-slate-600 hover:text-primary-600 font-medium transition-colors">About Us</Link>
          <Link href="/blog" className="text-slate-600 hover:text-primary-600 font-medium transition-colors">Blog</Link>
          <div className="relative group">
            <div className={cn(
              "flex items-center bg-slate-100 rounded-full px-4 py-2 w-64 border transition-all shadow-inner",
              isSearchFocused ? "border-primary-400 bg-white ring-4 ring-primary-50" : "border-transparent"
            )}>
              <Search className="w-4 h-4 text-slate-400 mr-2" />
              <input
                type="text"
                placeholder="Search tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                aria-label="Search tools"
                className="bg-transparent border-none outline-none text-sm w-full"
              />
            </div>

            {/* Search Results Dropdown */}
            <AnimatePresence>
              {isSearchFocused && searchResults.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full mt-2 w-[400px] right-0 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-[60]"
                >
                  <div className="p-2">
                    {searchResults.map(tool => (
                      <Link
                        key={tool.id}
                        href={`/tools/${tool.slug}`}
                        className="flex items-center gap-3 p-3 hover:bg-slate-50 rounded-xl transition-colors group"
                      >
                        <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center text-primary-600 group-hover:bg-primary-600 group-hover:text-white transition-colors">
                          <Zap className="w-5 h-5" />
                        </div>
                        <div className="flex-grow">
                          <h4 className="text-sm font-bold text-slate-900 group-hover:text-primary-600">{tool.name}</h4>
                          <p className="text-xs text-slate-500 line-clamp-1">{tool.description}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-primary-600 group-hover:translate-x-1 transition-all" />
                      </Link>
                    ))}
                  </div>
                  <div className="bg-slate-50 p-3 border-t border-slate-100">
                    <Link href="/categories" className="text-xs font-bold text-primary-600 flex items-center justify-center gap-1 hover:underline">
                      View all categories <ExternalLink className="w-3 h-3" />
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 text-slate-600"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-slate-100 overflow-hidden"
          >
            <div className="container mx-auto px-4 py-6 flex flex-col gap-4">
              <Link href="/categories" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium">Categories</Link>
              <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium">About Us</Link>
              <Link href="/blog" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium">Blog</Link>
              <div className="relative">
                <div className="flex items-center bg-slate-100 rounded-xl px-4 py-3 border border-slate-200">
                  <Search className="w-5 h-5 text-slate-400 mr-2" />
                  <input
                    type="text"
                    placeholder="Search tools..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    aria-label="Search tools mobile"
                    className="bg-transparent border-none outline-none w-full"
                  />
                </div>
                {searchResults.length > 0 && (
                  <div className="mt-2 bg-white rounded-xl border border-slate-100 shadow-lg overflow-hidden">
                    {searchResults.map(tool => (
                      <Link
                        key={tool.id}
                        href={`/tools/${tool.slug}`}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center gap-3 p-3 hover:bg-slate-50 border-b border-slate-50 last:border-0"
                      >
                        <div className="w-8 h-8 bg-primary-50 rounded-lg flex items-center justify-center text-primary-600">
                          <Zap className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900">{tool.name}</p>
                          <p className="text-xs text-slate-400 line-clamp-1">{tool.description}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
