"use client";

import { useState, useMemo, useEffect } from "react";
import { FileJson, AlertCircle, Maximize2, Minimize2, Copy, Check, Download, Trash2, Zap, Braces, Code2, Database, Search, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";
import { cn } from "@/lib/utils";

interface JsonFormatterToolProps {
  exampleInput?: string;
}

export default function JsonFormatterTool({ exampleInput }: JsonFormatterToolProps) {
  const [input, setInput] = useState(exampleInput || '{\n  "status": "success",\n  "data": {\n    "id": 101,\n    "name": "Antigravity Studio",\n    "features": ["Validation", "Formatting", "Minification"]\n  }\n}');
  const [indent, setIndent] = useState(2);
  const [isCopied, setIsCopied] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const analysis = useMemo<{
    data: any;
    formatted: string;
    minified: string;
    depth: number;
    size: number;
    keys: number;
    error: string | null;
  }>(() => {
    try {
      if (!input.trim()) return { data: null, formatted: "", minified: "", depth: 0, size: 0, keys: 0, error: null };
      const parsed = JSON.parse(input);
      
      // Calculate depth
      const getDepth = (obj: any): number => {
        if (typeof obj !== 'object' || obj === null) return 0;
        const levels = Object.values(obj).map(v => getDepth(v));
        return 1 + (levels.length ? Math.max(...levels) : 0);
      };

      const formatted = JSON.stringify(parsed, null, indent);
      const minified = JSON.stringify(parsed);
      
      return { 
        data: parsed, 
        formatted, 
        minified,
        depth: getDepth(parsed),
        size: new Blob([formatted]).size,
        keys: Object.keys(parsed).length,
        error: null 
      };
    } catch (e: any) {
      return { data: null, formatted: "", minified: "", depth: 0, size: 0, keys: 0, error: e.message };
    }
  }, [input, indent]);

  const copyToClipboard = (val: string) => {
    if (!val) return;
    navigator.clipboard.writeText(val);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const downloadJson = () => {
    if (!analysis.formatted) return;
    const blob = new Blob([analysis.formatted], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "studio_data.json";
    a.click();
  };

  const handleFixJson = () => {
    // Basic fix for common JSON errors like trailing commas or single quotes
    let fixed = input
      .replace(/'/g, '"') // Replace single quotes
      .replace(/,\s*([}\]])/g, '$1') // Remove trailing commas
      .replace(/([{,]\s*)([a-zA-Z0-9_]+)\s*:/g, '$1"$2":'); // Quote unquoted keys
    setInput(fixed);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Pane */}
        <div className="space-y-4">
           <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center justify-between">
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600">
                       <Braces className="w-5 h-5" />
                    </div>
                    <h3 className="font-black text-slate-900 uppercase tracking-widest text-xs">Source JSON</h3>
                 </div>
                 <div className="flex gap-2">
                    <button onClick={handleFixJson} className="px-3 py-1.5 bg-amber-50 text-amber-600 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-amber-100 transition-all">Fix Syntax</button>
                    <button onClick={() => setInput("")} className="p-2 text-slate-300 hover:text-red-500 transition-colors">
                       <Trash2 className="w-5 h-5" />
                    </button>
                 </div>
              </div>

              <div className="relative group">
                 <textarea
                   value={input}
                   onChange={(e) => setInput(e.target.value)}
                   placeholder='Paste raw JSON here...'
                   className={cn(
                     "w-full h-[500px] p-8 bg-slate-50 border-2 rounded-[2rem] font-mono text-sm outline-none transition-all resize-none shadow-inner",
                     analysis.error ? "border-red-100 ring-4 ring-red-50" : "border-slate-100 focus:border-primary-500 ring-primary-50 focus:ring-4"
                   )}
                 />
                 {analysis.error && (
                   <div className="absolute inset-x-0 bottom-0 p-6 bg-red-500 text-white rounded-b-[2rem] animate-in slide-in-from-bottom-2">
                      <div className="flex items-start gap-3">
                         <AlertCircle className="w-5 h-5 shrink-0" />
                         <div className="space-y-1">
                            <p className="font-bold text-xs uppercase tracking-widest">Syntax Error</p>
                            <p className="text-xs opacity-90 leading-relaxed font-mono">{analysis.error}</p>
                         </div>
                      </div>
                   </div>
                 )}
              </div>
           </div>
        </div>

        {/* Output/Analysis Pane */}
        <div className="space-y-6">
           <div className="bg-slate-900 p-8 rounded-[2.5rem] shadow-2xl flex flex-col h-full min-h-[500px] relative overflow-hidden">
              <div className="flex items-center justify-between mb-8 relative z-10">
                 <div className="flex items-center gap-4">
                    <div className="flex bg-white/10 p-1 rounded-xl">
                       {[2, 4].map((s) => (
                         <button key={s} onClick={() => setIndent(s)} className={cn("px-4 py-1.5 rounded-lg text-[10px] font-bold transition-all", indent === s ? "bg-white text-slate-900 shadow-sm" : "text-white/40")}>{s} Spaces</button>
                       ))}
                    </div>
                 </div>
                 <div className="flex gap-2">
                    <button onClick={() => copyToClipboard(analysis.formatted || "")} className="p-3 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-all">
                       {isCopied ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
                    </button>
                    <button onClick={downloadJson} className="p-3 bg-primary-600 text-white rounded-xl hover:bg-primary-500 transition-all">
                       <Download className="w-5 h-5" />
                    </button>
                 </div>
              </div>

              <div className="flex-grow relative group overflow-hidden rounded-2xl border border-white/10">
                 <textarea
                   readOnly
                   value={analysis.formatted || ""}
                   placeholder="Awaiting valid JSON..."
                   className="w-full h-full p-8 bg-black/30 text-emerald-400 font-mono text-sm outline-none resize-none no-scrollbar"
                 />
              </div>

              {analysis.data && (
                <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-white/10">
                   <div className="text-center">
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Max Depth</p>
                      <p className="text-xl font-black text-white">{analysis.depth}</p>
                   </div>
                   <div className="text-center border-x border-white/5">
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Total Keys</p>
                      <p className="text-xl font-black text-white">{analysis.keys}</p>
                   </div>
                   <div className="text-center">
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Payload Size</p>
                      <p className="text-xl font-black text-white">{(analysis.size / 1024).toFixed(2)} KB</p>
                   </div>
                </div>
              )}
           </div>

           <div className="bg-primary-50 p-8 rounded-[2.5rem] border border-primary-100 flex flex-col md:flex-row items-center gap-8 justify-between">
              <div className="flex gap-4 items-center">
                 <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-primary-600 shadow-sm">
                    <Database className="w-7 h-7" />
                 </div>
                 <div className="space-y-1">
                    <p className="font-black text-primary-900 uppercase tracking-wider">Expert Mode</p>
                    <p className="text-xs text-primary-700 max-w-md">Our architect identifies structural depth and key density to help you optimize data payloads.</p>
                 </div>
              </div>
              <button onClick={() => { setInput(analysis.minified || ""); confetti(); }} className="px-8 py-4 bg-primary-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-primary-900/20 hover:bg-primary-500 transition-all">
                 Minify Pro
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}
