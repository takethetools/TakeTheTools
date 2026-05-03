"use client";

<<<<<<< HEAD
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
=======
import { useState } from "react";
import { Copy, Check, Type, ArrowDownUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface CaseConverterToolProps {
  defaultType?: "upper" | "lower" | "title" | "sentence" | "camel" | "snake" | "kebab";
}

export default function CaseConverterTool({ defaultType }: CaseConverterToolProps) {
  const [text, setText] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  // Apply default type effect would be complex without an initial value, 
  // but we can just ensure the UI highlights or provides the specific conversion.
  // For now, it's enough to have the modes ready.

  const convertCase = (type: "upper" | "lower" | "title" | "sentence" | "camel" | "snake" | "kebab") => {
    if (!text) return;

    let result = "";
    switch (type) {
      case "upper":
        result = text.toUpperCase();
        break;
      case "lower":
        result = text.toLowerCase();
        break;
      case "sentence":
        result = text.toLowerCase().replace(/(^\s*\w|[\.\!\?]\s*\w)/g, (c) => c.toUpperCase());
        break;
      case "title":
        result = text.toLowerCase().split(' ').map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');
        break;
      case "camel":
        result = text.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
        break;
      case "snake":
        result = text.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
          ?.map(x => x.toLowerCase())
          .join('_') || "";
        break;
      case "kebab":
        result = text.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
          ?.map(x => x.toLowerCase())
          .join('-') || "";
        break;
    }
    setText(result);
  };

  const copyToClipboard = () => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const clear = () => setText("");

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-slate-900">
            <Type className="w-5 h-5 text-primary-600" />
            Input Text
          </div>
          <div className="flex gap-2">
            <button
              onClick={clear}
              className="text-xs font-bold text-slate-400 hover:text-red-500 transition-colors"
            >
              Clear
            </button>
            <button
              onClick={copyToClipboard}
              className={cn(
                "flex items-center gap-2 px-3 py-1.5 rounded-lg font-bold text-xs transition-all",
                isCopied ? "bg-green-100 text-green-700" : "bg-primary-100 text-primary-600 hover:bg-primary-200"
              )}
            >
              {isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {isCopied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste or type your text here..."
          className="w-full h-64 p-6 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-primary-500 outline-none transition-all resize-none font-medium"
        />
      </div>

      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-2 font-bold text-slate-900 mb-6">
          <ArrowDownUp className="w-5 h-5 text-primary-600" />
          Transformations
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <button onClick={() => convertCase("upper")} className="px-4 py-3 bg-slate-50 hover:bg-primary-50 hover:text-primary-600 border border-slate-100 hover:border-primary-200 rounded-xl font-bold text-sm transition-all">UPPERCASE</button>
          <button onClick={() => convertCase("lower")} className="px-4 py-3 bg-slate-50 hover:bg-primary-50 hover:text-primary-600 border border-slate-100 hover:border-primary-200 rounded-xl font-bold text-sm transition-all">lowercase</button>
          <button onClick={() => convertCase("sentence")} className="px-4 py-3 bg-slate-50 hover:bg-primary-50 hover:text-primary-600 border border-slate-100 hover:border-primary-200 rounded-xl font-bold text-sm transition-all">Sentence case</button>
          <button onClick={() => convertCase("title")} className="px-4 py-3 bg-slate-50 hover:bg-primary-50 hover:text-primary-600 border border-slate-100 hover:border-primary-200 rounded-xl font-bold text-sm transition-all">Title Case</button>
          <button onClick={() => convertCase("camel")} className="px-4 py-3 bg-slate-50 hover:bg-primary-50 hover:text-primary-600 border border-slate-100 hover:border-primary-200 rounded-xl font-bold text-sm transition-all">camelCase</button>
          <button onClick={() => convertCase("snake")} className="px-4 py-3 bg-slate-50 hover:bg-primary-50 hover:text-primary-600 border border-slate-100 hover:border-primary-200 rounded-xl font-bold text-sm transition-all">snake_case</button>
          <button onClick={() => convertCase("kebab")} className="px-4 py-3 bg-slate-50 hover:bg-primary-50 hover:text-primary-600 border border-slate-100 hover:border-primary-200 rounded-xl font-bold text-sm transition-all">kebab-case</button>
        </div>
>>>>>>> d366566fdaff0e02dbc3205770509d5194ddbac9
      </div>
    </div>
  );
}
