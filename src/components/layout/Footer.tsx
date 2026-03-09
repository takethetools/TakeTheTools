import Link from "next/link";
import { Zap, Github, Twitter, Mail } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  const categories = [
    { name: "Image Tools", href: "/categories/image-tools" },
    { name: "PDF Tools", href: "/categories/pdf-tools" },
    { name: "Developer Tools", href: "/categories/developer-tools" },
    { name: "Text Tools", href: "/categories/text-tools" },
    { name: "File Converters", href: "/categories/file-converter-tools" },
  ];

  const popularTools = [
    { name: "WebP to PNG", href: "/tools/webp-to-png-converter" },
    { name: "Merge PDF", href: "/tools/merge-pdf" },
    { name: "JSON Formatter", href: "/tools/json-formatter-and-validator" },
    { name: "Word Counter", href: "/tools/word-counter" },
  ];

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2 group">
              <img 
                src="/logo.png" 
                alt="TakeThe Tools Logo" 
                className="h-14 md:h-16 w-auto object-contain brightness-0 invert"
              />
            </Link>
            <p className="text-slate-400 leading-relaxed max-w-xs">
              Providing high-performance, free online tools for professionals and enthusiasts worldwide. Fast, secure, and always free.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-slate-800 rounded-full hover:bg-slate-700 transition-colors"><Twitter className="w-4 h-4" /></a>
              <a href="#" className="p-2 bg-slate-800 rounded-full hover:bg-slate-700 transition-colors"><Github className="w-4 h-4" /></a>
              <a href="#" className="p-2 bg-slate-800 rounded-full hover:bg-slate-700 transition-colors"><Mail className="w-4 h-4" /></a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-bold mb-6">Categories</h3>
            <ul className="space-y-3">
              {categories.map((cat) => (
                <li key={cat.name}>
                  <Link href={cat.href} className="hover:text-primary-500 transition-colors">{cat.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Tools */}
          <div>
            <h3 className="text-white font-bold mb-6">Popular Tools</h3>
            <ul className="space-y-3">
              {popularTools.map((tool) => (
                <li key={tool.name}>
                  <Link href={tool.href} className="hover:text-primary-500 transition-colors">{tool.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-bold mb-6">Stay Updated</h3>
            <p className="text-sm text-slate-400 mb-4">Get notified when we release new tools.</p>
            <form className="flex gap-2">
              <input 
                type="email" 
                placeholder="Email address" 
                className="bg-slate-800 border-none rounded-lg px-4 py-2 text-sm w-full focus:ring-2 focus:ring-primary-500 outline-none"
              />
              <button className="bg-primary-600 text-white p-2 rounded-lg hover:bg-primary-700 transition-colors">
                <Zap className="w-4 h-4 fill-current" />
              </button>
            </form>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <p>© {currentYear} TakeThe Tools. All rights reserved.</p>
          <div className="flex gap-8">
            <Link href="/about" className="hover:text-white transition-colors">About Us</Link>
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
