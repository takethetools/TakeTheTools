"use client";

import { useState } from "react";
import { Code, Copy, Check, Zap, ShieldCheck } from "lucide-react";

export default function MetaTagGeneratorTool() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [keywords, setKeywords] = useState("");
  const [author, setAuthor] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  const tags = `<!-- Standard Meta Tags -->
<title>${title}</title>
<meta name="title" content="${title}">
<meta name="description" content="${description}">
<meta name="keywords" content="${keywords}">
<meta name="author" content="${author}">

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image">
<meta property="twitter:title" content="${title}">
<meta property="twitter:description" content="${description}">`;

  const copyResult = () => {
    navigator.clipboard.writeText(tags);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-12">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600">
          <Code className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900">Meta Tag Generator</h3>
          <p className="text-sm text-slate-500">Generate essential SEO meta tags for your website</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-6">
           <div className="space-y-2">
             <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Site Title</label>
             <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl" placeholder="e.g. My Awesome Startup" />
           </div>
           <div className="space-y-2">
             <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Description</label>
             <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full h-32 p-4 bg-slate-50 border border-slate-100 rounded-2xl" placeholder="Describe your site in 160 characters..." />
           </div>
           <div className="space-y-2">
             <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Keywords (Comma separated)</label>
             <input type="text" value={keywords} onChange={(e) => setKeywords(e.target.value)} className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl" placeholder="seo, tools, fast" />
           </div>
        </div>

        <div className="space-y-4">
           <div className="flex items-center justify-between px-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Generated HTML</span>
              <button onClick={copyResult} className="text-primary-600 text-xs font-bold flex items-center gap-1 hover:underline">
                {isCopied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                Copy HTML Tags
              </button>
           </div>
           <pre className="w-full h-full min-h-[400px] p-8 bg-slate-900 rounded-3xl border border-slate-800 font-mono text-sm text-blue-100 overflow-auto">
             <code>{tags}</code>
           </pre>
        </div>
      </div>
    </div>
  );
}
