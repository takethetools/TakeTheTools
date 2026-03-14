import Link from "next/link";
import Image from "next/image";
import { Github, Twitter, Mail } from "lucide-react";
import NewsletterForm from "./NewsletterForm";
import ManualAdUnit from "../common/ManualAdUnit";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const categories = [
    { name: "Image Tools", href: "/categories/image-tools" },
    { name: "PDF Tools", href: "/categories/pdf-tools" },
    { name: "Developer Tools", href: "/categories/developer-tools" },
    { name: "Text Tools", href: "/categories/text-tools" },
    { name: "File Converters", href: "/categories/file-converter-tools" },
    { name: "Math & Calculators", href: "/categories/math-calculators" },
    { name: "Marketing & Social", href: "/categories/marketing-tools" },
    { name: "Security & Privacy", href: "/categories/security-privacy" },
  ];

  const popularTools = [
    { name: "WebP to PNG", href: "/tools/webp-to-png-converter" },
    { name: "Merge PDF", href: "/tools/merge-pdf" },
    { name: "JSON Formatter", href: "/tools/json-formatter-and-validator" },
    { name: "Word Counter", href: "/tools/word-counter" },
  ];

  return (
    <footer className="bg-slate-900 text-slate-300 pt-24 pb-12 border-t border-slate-800 relative overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-px bg-gradient-to-r from-transparent via-primary-500/50 to-transparent"></div>

      <div className="container mx-auto px-4">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12 mb-20">

          {/* Brand Column */}
          <div className="sm:col-span-2 md:col-span-3 lg:col-span-2 flex flex-col items-center sm:items-start text-center sm:text-left space-y-8">
            <Link href="/" className="flex items-center gap-2 group">
              <Image
                src="/logo.webp"
                alt="TakeThe Tools Logo"
                width={200}
                height={64}
                className="h-14 md:h-16 w-auto object-contain brightness-0 invert"
              />
            </Link>
            <p className="text-slate-400 leading-relaxed max-w-md text-lg">
              Providing high-performance, precision-engineered online tools for developers, designers, and digital professionals. Fast, secure, and always 100% free.
            </p>
            <div className="flex gap-4">
              <a href="https://twitter.com/takethetools" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Twitter" className="p-3 bg-slate-800/50 border border-slate-700 rounded-xl hover:bg-primary-600 hover:border-primary-500 transition-all text-slate-400 hover:text-white group">
                <Twitter className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
              <a href="https://github.com/takethetools" target="_blank" rel="noopener noreferrer" aria-label="Check our Github" className="p-3 bg-slate-800/50 border border-slate-700 rounded-xl hover:bg-primary-600 hover:border-primary-500 transition-all text-slate-400 hover:text-white group">
                <Github className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
              <a href="mailto:contact@takethetools.com" aria-label="Contact us via Email" className="p-3 bg-slate-800/50 border border-slate-700 rounded-xl hover:bg-primary-600 hover:border-primary-500 transition-all text-slate-400 hover:text-white group">
                <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>

          {/* Categories Section */}
          <div className="text-center sm:text-left">
            <h3 className="text-white font-bold mb-8 uppercase tracking-widest text-xs">Tools by Category</h3>
            <ul className="space-y-4">
              {categories.slice(0, 6).map((cat) => (
                <li key={cat.name}>
                  <Link href={cat.href} className="text-slate-400 hover:text-primary-400 transition-colors flex items-center justify-center sm:justify-start gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-700 group-hover:bg-primary-500 transition-colors"></span>
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="text-center sm:text-left">
            <h3 className="text-white font-bold mb-8 uppercase tracking-widest text-xs">Resources</h3>
            <ul className="space-y-4">
              <li><Link href="/blog" className="text-slate-400 hover:text-primary-400 transition-colors">Digital Blog</Link></li>
              <li><Link href="/about" className="text-slate-400 hover:text-primary-400 transition-colors">About Mission</Link></li>
              <li><Link href="/contact" className="text-slate-400 hover:text-primary-400 transition-colors">Support Center</Link></li>
              <li><Link href="/privacy-policy" className="text-slate-400 hover:text-primary-400 transition-colors">Privacy Privacy</Link></li>
              <li><Link href="/terms" className="text-slate-400 hover:text-primary-400 transition-colors">Terms of Service</Link></li>
              <li><Link href="/cookie-policy" className="text-slate-400 hover:text-primary-400 transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>

          {/* Newsletter / Action */}
          <div className="text-center sm:text-left">
            <h3 className="text-white font-bold mb-8 uppercase tracking-widest text-xs mx-auto sm:mx-0">Stay Synced</h3>
            <p className="text-sm text-slate-500 mb-6 leading-relaxed">
              Join 50k+ professionals. Get notified about new tools and updates.
            </p>
            <NewsletterForm />
            <div className="mt-8 pt-8 border-t border-slate-800/50">
              <div className="flex items-center justify-center sm:justify-start gap-3 text-slate-500">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-xs font-medium uppercase tracking-tighter">API Status: Operational</span>
              </div>
            </div>
          </div>
        </div>

        {/* Ad Space */}
        <div className="py-12 border-y border-slate-800/50 flex flex-col items-center gap-4">
          <span className="text-[10px] font-bold text-slate-700 uppercase tracking-[0.3em]">Advertisement</span>
          <ManualAdUnit adSlot="3171595105" adFormat="horizontal" />
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 text-sm text-center md:text-left">
            <p className="text-slate-500">© {currentYear} <span className="text-slate-300 font-bold">TakeTheTools</span>. All rights reserved.</p>
            <div className="flex items-center gap-4 text-slate-600">
              <span className="hidden md:block w-1 h-1 rounded-full bg-slate-800"></span>
              <span>Handcrafted with <span className="text-red-500/50">❤️</span> for the Web</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="px-3 py-1 bg-slate-800/50 border border-slate-700 rounded-full text-[10px] font-bold text-slate-400 uppercase tracking-wider">v2.4.0-PRO</div>
            <div className="px-3 py-1 bg-primary-900/20 border border-primary-500/20 rounded-full text-[10px] font-bold text-primary-400 uppercase tracking-widest">Global CDN</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
