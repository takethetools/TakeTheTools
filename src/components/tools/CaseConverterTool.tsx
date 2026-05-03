"use client";

import { useState, useMemo } from "react";
import { Copy, Check, Type, ArrowDownUp, Hash, Trash2, Zap, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface CaseConverterToolProps {
  defaultType?: string;
}

const MODES = [
  { id: "upper", label: "UPPERCASE", example: "HELLO WORLD" },
  { id: "lower", label: "lowercase", example: "hello world" },
  { id: "sentence", label: "Sentence case", example: "Hello world" },
  { id: "title", label: "Title Case", example: "Hello World" },
  { id: "camel", label: "camelCase", example: "helloWorld" },
  { id: "pascal", label: "PascalCase", example: "HelloWorld" },
  { id: "snake", label: "snake_case", example: "hello_world" },
  { id: "constant", label: "CONSTANT_CASE", example: "HELLO_WORLD" },
  { id: "kebab", label: "kebab-case", example: "hello-world" },
  { id: "dot", label: "dot.case", example: "hello.world" },
];

export default function CaseConverterTool({ defaultType }: CaseConverterToolProps) {
  const [text, setText] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const stats = useMemo(() => ({
    chars: text.length,
    words: text.trim() ? text.trim().split(/\s+/).length : 0,
    lines: text.trim() ? text.split('\n').length : 0
  }), [text]);

  const transform = (input: string, mode: string) => {
    if (!input) return "";
    switch (mode) {
      case "upper": return input.toUpperCase();
      case "lower": return input.toLowerCase();
      case "sentence": return input.toLowerCase().replace(/(^\s*\w|[\.\!\?]\s*\w)/g, (c) => c.toUpperCase());
      case "title": return input.toLowerCase().split(' ').map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');
      case "camel": return input.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase()).replace(/^(.)/, c => c.toLowerCase());
      case "pascal": return input.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase()).replace(/^(.)/, c => c.toUpperCase());
      case "snake": return input.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)?.map(x => x.toLowerCase()).join('_') || "";
      case "constant": return input.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)?.map(x => x.toUpperCase()).join('_') || "";
      case "kebab": return input.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)?.map(x => x.toLowerCase()).join('-') || "";
      case "dot": return input.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)?.map(x => x.toLowerCase()).join('.') || "";
      default: return input;
    }
  };

  const copyToClipboard = (val: string, id: string) => {
    if (!val) return;
    navigator.clipboard.writeText(val);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Pane */}
        <div className="space-y-6">
           <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center justify-between">
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600">
                       <Type className="w-5 h-5" />
                    </div>
                    <h3 className="font-black text-slate-900 uppercase tracking-widest text-sm">Input Text</h3>
                 </div>
                 <button onClick={() => setText("")} className="p-2 text-slate-300 hover:text-red-500 transition-colors">
                    <Trash2 className="w-5 h-5" />
                 </button>
              </div>

              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Paste or type your text here..."
                className="w-full h-[400px] p-8 bg-slate-50 border-2 border-slate-100 rounded-[2rem] text-lg font-medium text-slate-700 outline-none focus:border-primary-500 focus:ring-4 ring-primary-50 transition-all resize-none shadow-inner"
              />

              <div className="flex gap-4 pt-4 border-t border-slate-100 overflow-x-auto no-scrollbar">
                 <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Characters</span>
                    <span className="text-lg font-black text-slate-900">{stats.chars}</span>
                 </div>
                 <div className="w-px h-8 bg-slate-100 mx-2" />
                 <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Words</span>
                    <span className="text-lg font-black text-slate-900">{stats.words}</span>
                 </div>
                 <div className="w-px h-8 bg-slate-100 mx-2" />
                 <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Lines</span>
                    <span className="text-lg font-black text-slate-900">{stats.lines}</span>
                 </div>
              </div>
           </div>
        </div>

        {/* Transformations Pane */}
        <div className="space-y-4 max-h-[650px] overflow-y-auto pr-2 custom-scrollbar">
           {MODES.map((mode) => {
             const result = transform(text, mode.id);
             return (
               <div 
                 key={mode.id}
                 onClick={() => copyToClipboard(result, mode.id)}
                 className="group bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:border-primary-300 hover:shadow-xl hover:shadow-primary-100/20 transition-all cursor-pointer relative overflow-hidden"
               >
                  <div className="flex items-center justify-between mb-2">
                     <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">{mode.label}</span>
                     <div className="flex items-center gap-2">
                        {copiedId === mode.id ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-slate-200 group-hover:text-primary-400 transition-colors" />}
                     </div>
                  </div>
                  <div className={cn(
                    "text-lg font-bold break-all transition-colors",
                    text ? "text-slate-900" : "text-slate-300 italic font-normal"
                  )}>
                    {text ? result : mode.example}
                  </div>
               </div>
             );
           })}
        </div>
      </div>

      <div className="bg-slate-900 p-8 rounded-[3rem] flex flex-col md:flex-row items-center gap-8 justify-between relative overflow-hidden">
         <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
            <Sparkles className="w-40 h-40 text-white" />
         </div>
         <div className="flex gap-4 items-center relative z-10">
            <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-primary-400 border border-white/10">
               <Zap className="w-7 h-7" />
            </div>
            <div className="space-y-1">
               <p className="font-black text-white uppercase tracking-wider">Typography Expert</p>
               <p className="text-xs text-slate-400 max-w-md">Click any card to instantly copy the transformed text. Perfect for developers and content creators.</p>
            </div>
         </div>
         <div className="flex items-center gap-6 relative z-10">
            <div className="text-center">
               <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Status</p>
               <p className="text-xs font-bold text-green-400 uppercase flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  Live Sync
               </p>
            </div>
         </div>
      </div>
    </div>
  );
}
