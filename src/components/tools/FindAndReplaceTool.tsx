"use client";

import { useState } from "react";
import { Search, RotateCw, Copy, Check, Zap, ArrowRight, Trash2 } from "lucide-react";

export default function FindAndReplaceTool() {
  const [input, setInput] = useState("");
  const [find, setFind] = useState("");
  const [replace, setReplace] = useState("");
  const [output, setOutput] = useState("");
  const [useRegex, setUseRegex] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const processText = () => {
    if (!input || find === undefined) return;
    try {
      let result = "";
      if (useRegex) {
        const regex = new RegExp(find, "g");
        result = input.replace(regex, replace);
      } else {
        result = input.split(find).join(replace);
      }
      setOutput(result);
    } catch (err) {
      setOutput("// Error: Invalid regular expression");
    }
  };

  const copyResult = () => {
    navigator.clipboard.writeText(output);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-8">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600">
          <Search className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900">Find and Replace</h3>
          <p className="text-sm text-slate-500">Bulk edit your text with search and replace</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-6">
           <div className="space-y-2">
             <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-2">Source Text</label>
             <textarea 
               value={input}
               onChange={(e) => setInput(e.target.value)}
               className="w-full h-64 bg-slate-50 border border-slate-100 rounded-2xl p-6 font-mono text-sm text-slate-600 focus:outline-none"
               placeholder="Paste your text here..."
             />
           </div>

           <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-2">Find</label>
                <input 
                   type="text" 
                   value={find}
                   onChange={(e) => setFind(e.target.value)}
                   className="w-full p-4 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 focus:ring-2 focus:ring-primary-500/20"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-2">Replace With</label>
                <input 
                   type="text" 
                   value={replace}
                   onChange={(e) => setReplace(e.target.value)}
                   className="w-full p-4 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 focus:ring-2 focus:ring-primary-500/20"
                />
              </div>
           </div>

           <div className="flex items-center gap-2 px-2">
              <input 
                type="checkbox" 
                checked={useRegex} 
                onChange={(e) => setUseRegex(e.target.checked)}
                className="w-4 h-4 accent-primary-600"
              />
              <span className="text-sm font-bold text-slate-500">Use Regular Expressions (Regex)</span>
           </div>

           <button 
             onClick={processText}
             className="w-full py-4 bg-primary-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2"
           >
             <RotateCw className="w-5 h-5" /> Process Text
           </button>
        </div>

        <div className="space-y-4">
           <div className="flex items-center justify-between px-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Result</label>
              {output && (
                <button onClick={copyResult} className="text-primary-600 text-xs font-bold flex items-center gap-1">
                  {isCopied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  Copy Result
                </button>
              )}
           </div>
           <textarea 
             value={output}
             readOnly
             className="w-full h-full min-h-[400px] bg-slate-900 border-none rounded-3xl p-8 font-mono text-sm text-blue-100 focus:outline-none"
             placeholder="Output will appear here..."
           />
        </div>
      </div>
    </div>
  );
}
