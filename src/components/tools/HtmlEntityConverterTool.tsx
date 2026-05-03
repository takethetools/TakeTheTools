"use client";

import { useState } from "react";
import { Code, Zap, Copy, Check, ArrowRightLeft } from "lucide-react";

export default function HtmlEntityConverterTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  const encode = () => {
    const el = document.createElement("div");
    el.innerText = input;
    setOutput(el.innerHTML);
  };

  const decode = () => {
    const el = document.createElement("div");
    el.innerHTML = input;
    setOutput(el.innerText);
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
          <Code className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900">HTML Entity Converter</h3>
          <p className="text-sm text-slate-500">Encode or decode HTML entities reliably</p>
        </div>
      </div>

      <div className="space-y-6">
        <textarea 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full h-40 p-6 bg-slate-50 border border-slate-100 rounded-2xl font-mono text-sm"
          placeholder="Enter text or HTML entities..."
        />

        <div className="flex gap-4">
           <button onClick={encode} className="flex-grow py-4 bg-primary-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2">
              <Zap className="w-5 h-5" /> Encode
           </button>
           <button onClick={decode} className="flex-grow py-4 bg-slate-100 text-slate-700 rounded-2xl font-bold flex items-center justify-center gap-2 border border-slate-200">
              <ArrowRightLeft className="w-5 h-5" /> Decode
           </button>
        </div>

        {output && (
          <div className="space-y-2">
             <div className="flex items-center justify-between px-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Result</span>
                <button onClick={copyResult} className="text-primary-600 text-xs font-bold flex items-center gap-1">
                   {isCopied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                   Copy Result
                </button>
             </div>
             <pre className="w-full p-8 bg-slate-900 rounded-3xl border border-slate-800 font-mono text-sm text-blue-100 overflow-auto whitespace-pre-wrap">
                <code>{output}</code>
             </pre>
          </div>
        )}
      </div>
    </div>
  );
}
