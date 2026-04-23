"use client";

import { useState } from "react";
import { Target, Copy, Check, Zap, Plus, Trash2 } from "lucide-react";

export default function UTMBuilderTool() {
  const [url, setUrl] = useState("");
  const [source, setSource] = useState("");
  const [medium, setMedium] = useState("");
  const [campaign, setCampaign] = useState("");
  const [term, setTerm] = useState("");
  const [content, setContent] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  const buildUTM = () => {
    if (!url) return "";
    try {
      const u = new URL(url);
      if (source) u.searchParams.set("utm_source", source);
      if (medium) u.searchParams.set("utm_medium", medium);
      if (campaign) u.searchParams.set("utm_campaign", campaign);
      if (term) u.searchParams.set("utm_term", term);
      if (content) u.searchParams.set("utm_content", content);
      return u.toString();
    } catch (e) {
      return "Invalid Base URL";
    }
  };

  const finalUrl = buildUTM();

  const copyResult = () => {
    navigator.clipboard.writeText(finalUrl);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-8">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600">
          <Target className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900">UTM Campaign Builder</h3>
          <p className="text-sm text-slate-500">Generate trackable marketing URLs with UTM parameters</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-6">
           <div className="space-y-2">
             <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Website URL *</label>
             <input 
               type="text" 
               value={url}
               onChange={(e) => setUrl(e.target.value)}
               placeholder="https://example.com"
               className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl"
             />
           </div>

           <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Source</label>
                <input 
                  type="text" 
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                  placeholder="google, newsletter"
                  className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Medium</label>
                <input 
                  type="text" 
                  value={medium}
                  onChange={(e) => setMedium(e.target.value)}
                  placeholder="cpc, banner, email"
                  className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl"
                />
              </div>
           </div>

           <div className="space-y-2">
             <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Campaign Name</label>
             <input 
               type="text" 
               value={campaign}
               onChange={(e) => setCampaign(e.target.value)}
               placeholder="spring_sale"
               className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl"
             />
           </div>
        </div>

        <div className="space-y-4">
           <div className="flex items-center justify-between px-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Generated URL</span>
              {finalUrl && finalUrl !== "Invalid Base URL" && (
                <button onClick={copyResult} className="text-primary-600 text-xs font-bold flex items-center gap-1">
                  {isCopied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  Copy Result
                </button>
              )}
           </div>
           <div className="w-full h-full min-h-[300px] p-8 bg-slate-900 rounded-3xl border border-slate-800 break-all font-mono text-sm text-blue-100">
             {finalUrl || "Start filling parameters to see the URL..."}
           </div>
        </div>
      </div>
    </div>
  );
}
