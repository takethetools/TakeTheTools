"use client";

import { useState } from "react";
import { Copy, Check, Type, ArrowDownUp } from "lucide-react";
import { cn } from "@/lib/utils";

export default function CaseConverterTool() {
  const [text, setText] = useState("");
  const [isCopied, setIsCopied] = useState(false);

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
      </div>
    </div>
  );
}
