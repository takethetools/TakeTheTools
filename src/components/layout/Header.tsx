"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Menu, X, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
          <img
            src="/logo.png"
            alt="TakeThe Tools Logo"
            className="h-14 md:h-16 w-auto object-contain transition-transform group-hover:scale-105"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/categories" className="text-slate-600 hover:text-primary-600 font-medium transition-colors">Categories</Link>
          <Link href="/about" className="text-slate-600 hover:text-primary-600 font-medium transition-colors">About Us</Link>
          <Link href="/blog" className="text-slate-600 hover:text-primary-600 font-medium transition-colors">Blog</Link>
          <div className="relative group">
            <div className="flex items-center bg-slate-100 rounded-full px-4 py-2 w-64 border border-transparent focus-within:border-primary-400 focus-within:bg-white transition-all shadow-inner">
              <Search className="w-4 h-4 text-slate-400 mr-2" />
              <input
                type="text"
                placeholder="Search tools..."
                className="bg-transparent border-none outline-none text-sm w-full"
              />
            </div>
          </div>
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 text-slate-600"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
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
              <div className="flex items-center bg-slate-100 rounded-xl px-4 py-3 border border-slate-200">
                <Search className="w-5 h-5 text-slate-400 mr-2" />
                <input
                  type="text"
                  placeholder="Search tools..."
                  className="bg-transparent border-none outline-none w-full"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
