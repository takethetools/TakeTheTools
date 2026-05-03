"use client";

import { useState } from "react";
import { Hash, Zap, Copy, Check, ArrowRightLeft } from "lucide-react";

export default function HexToDecimalTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"hex-to-dec" | "dec-to-hex">("hex-to-dec");
  const [isCopied, setIsCopied] = useState(false);

  const convert = () => {
    if (!input) return;
    try {
      if (mode === "hex-to-dec") {
        setOutput(parseInt(input, 16).toString());
      } else {
        setOutput(parseInt(input, 10).toString(16).toUpperCase());
      }
    } catch {
      setOutput("Invalid Input");
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
          <Hash className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900">Hex to Decimal</h3>
          <p className="text-sm text-slate-500">Convert between Hexadecimal and Decimal bases</p>
        </div>
      </div>

      <div className="flex bg-slate-50 p-1 rounded-2xl border border-slate-100">
         <button 
           onClick={() => setMode("hex-to-dec")}
           className={`flex-grow py-3 rounded-xl text-sm font-bold transition-all ${mode === "hex-to-dec" ? "bg-white text-primary-600 shadow-sm" : "text-slate-500"}`}
         >
           Hex to Decimal
         </button>
         <button 
           onClick={() => setMode("dec-to-hex")}
           className={`flex-grow py-3 rounded-xl text-sm font-bold transition-all ${mode === "dec-to-hex" ? "bg-white text-primary-600 shadow-sm" : "text-slate-500"}`}
         >
           Decimal to Hex
         </button>
      </div>

      <div className="space-y-6">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={mode === "hex-to-dec" ? "e.g. FF" : "e.g. 255"}
          className="w-full p-6 bg-slate-50 border border-slate-100 rounded-2xl font-mono text-2xl font-bold text-slate-700"
        />

        <button onClick={convert} className="w-full py-4 bg-primary-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2">
           <Zap className="w-5 h-5" /> Convert
        </button>

        {output && (
          <div className="p-12 bg-slate-900 rounded-3xl text-center relative">
             <button onClick={copyResult} className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors">
                {isCopied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
             </button>
             <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Result</span>
             <div className="text-5xl font-black text-blue-100 mt-2 font-mono tabular-nums">{output}</div>
          </div>
        )}
      </div>
    </div>
  );
}
