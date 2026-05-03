"use client";

import { useState } from "react";
import { Map, Copy, Check, Zap, Plus, Trash2, Globe } from "lucide-react";

export default function SitemapGeneratorTool() {
  const [baseUrl, setBaseUrl] = useState("https://example.com");
  const [pages, setPages] = useState<string[]>(["/", "/about", "/contact", "/blog"]);
  const [isCopied, setIsCopied] = useState(false);

  const addPage = () => setPages([...pages, ""]);
  const removePage = (index: number) => setPages(pages.filter((_, i) => i !== index));
  const updatePage = (index: number, val: string) => {
    const newPages = [...pages];
    newPages[index] = val;
    setPages(newPages);
  };

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(p => `  <url>
    <loc>${baseUrl}${p.startsWith("/") ? p : "/" + p}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`).join("\n")}
</urlset>`;

  const copyResult = () => {
    navigator.clipboard.writeText(sitemapXml);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-12">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600">
          <Map className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900">Sitemap Generator (XML)</h3>
          <p className="text-sm text-slate-500">Generate search-engine friendly XML sitemaps for your site</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-6">
           <div className="space-y-2">
             <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Base URL</label>
             <input type="text" value={baseUrl} onChange={(e) => setBaseUrl(e.target.value)} className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl" placeholder="https://example.com" />
           </div>

           <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Pages / Paths</label>
                <button onClick={addPage} className="text-primary-600 text-xs font-bold flex items-center gap-1 hover:underline">
                  <Plus className="w-3 h-3" /> Add Page
                </button>
              </div>
              <div className="space-y-3">
                 {pages.map((page, i) => (
                   <div key={i} className="flex gap-2">
                      <input 
                        type="text" 
                        value={page}
                        onChange={(e) => updatePage(i, e.target.value)}
                        placeholder="/path"
                        className="flex-grow p-3 bg-slate-50 border border-slate-100 rounded-xl font-mono text-sm"
                      />
                      <button onClick={() => removePage(i)} className="p-3 text-slate-300 hover:text-red-500">
                         <Trash2 className="w-4 h-4" />
                      </button>
                   </div>
                 ))}
              </div>
           </div>
        </div>

        <div className="space-y-4">
           <div className="flex items-center justify-between px-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">XML Output</label>
              <button onClick={copyResult} className="text-primary-600 text-xs font-bold flex items-center gap-1">
                {isCopied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                Copy XML
              </button>
           </div>
           <pre className="w-full h-full min-h-[400px] p-8 bg-slate-900 rounded-3xl border border-slate-800 font-mono text-xs text-blue-100 overflow-auto">
             <code>{sitemapXml}</code>
           </pre>
        </div>
      </div>
    </div>
  );
}
