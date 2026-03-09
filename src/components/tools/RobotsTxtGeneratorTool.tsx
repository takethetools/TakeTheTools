"use client";

import { useState } from "react";
import { FileText, Copy, Check, Zap, Plus, Trash2, ShieldCheck } from "lucide-react";

export default function RobotsTxtGeneratorTool() {
  const [userAgent, setUserAgent] = useState("*");
  const [rules, setRules] = useState<{ type: "allow" | "disallow"; path: string }[]>([
    { type: "disallow", path: "/admin" },
    { type: "disallow", path: "/api" },
  ]);
  const [sitemap, setSitemap] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  const addRule = () => setRules([...rules, { type: "disallow", path: "" }]);
  const removeRule = (index: number) => setRules(rules.filter((_, i) => i !== index));
  const updateRule = (index: number, field: string, value: string) => {
    const newRules = [...rules];
    (newRules[index] as any)[field] = value;
    setRules(newRules);
  };

  const robotsTxt = `User-agent: ${userAgent}
${rules.map(r => `${r.type.charAt(0).toUpperCase() + r.type.slice(1)}: ${r.path}`).join("\n")}
${sitemap ? `Sitemap: ${sitemap}` : ""}`;

  const copyResult = () => {
    navigator.clipboard.writeText(robotsTxt);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-8">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900">Robots.txt Generator</h3>
          <p className="text-sm text-slate-500">Control how search engines crawl your website</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">User Agent</label>
            <input 
              type="text" 
              value={userAgent} 
              onChange={(e) => setUserAgent(e.target.value)}
              className="w-full bg-slate-50 border border-slate-100 rounded-xl p-3 font-mono"
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Crawl Rules</label>
              <button onClick={addRule} className="text-primary-600 text-xs font-bold flex items-center gap-1 hover:underline">
                <Plus className="w-3 h-3" /> Add Rule
              </button>
            </div>
            
            <div className="space-y-3">
              {rules.map((rule, i) => (
                <div key={i} className="flex gap-2">
                   <select 
                     value={rule.type} 
                     onChange={(e) => updateRule(i, "type", e.target.value)}
                     className="bg-slate-50 border border-slate-100 rounded-xl p-3 text-sm font-bold text-slate-700"
                   >
                     <option value="allow">Allow</option>
                     <option value="disallow">Disallow</option>
                   </select>
                   <input 
                     type="text" 
                     value={rule.path} 
                     onChange={(e) => updateRule(i, "path", e.target.value)}
                     placeholder="/path"
                     className="flex-grow bg-slate-50 border border-slate-100 rounded-xl p-3 font-mono text-sm"
                   />
                   <button onClick={() => removeRule(i)} className="p-3 text-slate-300 hover:text-red-500">
                     <Trash2 className="w-4 h-4" />
                   </button>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Sitemap URL (Optional)</label>
            <input 
              type="text" 
              value={sitemap} 
              onChange={(e) => setSitemap(e.target.value)}
              placeholder="https://example.com/sitemap.xml"
              className="w-full bg-slate-50 border border-slate-100 rounded-xl p-3 font-mono"
            />
          </div>
        </div>

        <div className="space-y-4">
           <div className="flex items-center justify-between px-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Preview</span>
              <button onClick={copyResult} className="text-primary-600 text-xs font-bold flex items-center gap-1">
                {isCopied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                Copy Result
              </button>
           </div>
           <pre className="w-full h-full min-h-[300px] bg-slate-900 rounded-3xl p-8 font-mono text-sm text-green-400 overflow-auto border border-slate-800">
             <code>{robotsTxt}</code>
           </pre>
        </div>
      </div>
    </div>
  );
}
