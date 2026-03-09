"use client";

import { useState } from "react";
import { Link, Copy, Check, Zap, ArrowRightLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface URLConverterToolProps {
  mode: "encode" | "decode";
}

export default function URLConverterTool({ mode }: URLConverterToolProps) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  const processUrl = () => {
    try {
      if (mode === "encode") {
        setOutput(encodeURIComponent(input));
      } else {
        setOutput(decodeURIComponent(input));
      }
    } catch (err) {
      setOutput("Invalid input for URL decoding.");
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
          <Link className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900 capitalize">URL {mode}r</h3>
          <p className="text-sm text-slate-500">Safe {mode}ing for URL parameters</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-2">Input URL/String</label>
          <textarea 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full h-32 bg-slate-50 border border-slate-100 rounded-2xl p-6 font-mono text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
            placeholder={mode === "encode" ? "Enter text to encode..." : "Enter URL-encoded text..."}
          />
        </div>

        <button 
          onClick={processUrl}
          className="w-full py-4 bg-primary-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2"
        >
          <ArrowRightLeft className="w-5 h-5" />
          {mode === "encode" ? "Encode URL" : "Decode URL"}
        </button>

        {output && (
          <div className="space-y-2">
            <div className="flex items-center justify-between px-2">
               <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Result</label>
               <button onClick={copyResult} className="text-primary-600 text-xs font-bold flex items-center gap-1 hover:underline">
                 {isCopied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                 {isCopied ? "Copied" : "Copy"}
               </button>
            </div>
            <div className="w-full p-6 bg-slate-100 rounded-2xl font-mono text-sm text-slate-700 break-all border border-slate-200">
               {output}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
