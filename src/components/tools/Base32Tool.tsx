"use client";

import { useState } from "react";
import { ArrowRightLeft, Copy, Check, Zap, Hash } from "lucide-react";

interface Base32ToolProps {
  mode: "encode" | "decode";
}

export default function Base32Tool({ mode }: Base32ToolProps) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";

  const encode = (s: string) => {
    let bits = "";
    for (let i = 0; i < s.length; i++) {
      bits += s.charCodeAt(i).toString(2).padStart(8, '0');
    }
    let res = "";
    for (let i = 0; i < bits.length; i += 5) {
      let chunk = bits.substr(i, 5).padEnd(5, '0');
      res += alphabet[parseInt(chunk, 2)];
    }
    return res;
  };

  const decode = (s: string) => {
    // Basic decode logic (RFC 4648)
    try {
      let bits = "";
      for (let i = 0; i < s.length; i++) {
        let val = alphabet.indexOf(s[i].toUpperCase());
        if (val === -1) continue;
        bits += val.toString(2).padStart(5, '0');
      }
      let res = "";
      for (let i = 0; i < bits.length; i += 8) {
        if (i + 8 <= bits.length) {
          res += String.fromCharCode(parseInt(bits.substr(i, 8), 2));
        }
      }
      return res;
    } catch {
       return "Decode error";
    }
  };

  const process = () => {
    setOutput(mode === "encode" ? encode(input) : decode(input));
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
          <ArrowRightLeft className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900 capitalize">Base32 {mode}r</h3>
          <p className="text-sm text-slate-500">Convert text to/from Base32 format</p>
        </div>
      </div>

      <div className="space-y-6">
        <textarea 
          value={input} 
          onChange={(e) => setInput(e.target.value)}
          className="w-full h-40 p-6 bg-slate-50 border border-slate-100 rounded-2xl font-mono text-sm"
          placeholder={mode === "encode" ? "Enter text to encode..." : "Enter Base32 string..."}
        />

        <button onClick={process} className="w-full py-4 bg-primary-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2">
           <Zap className="w-5 h-5" /> {mode === "encode" ? "Encode" : "Decode"}
        </button>

        {output && (
          <div className="space-y-2">
             <div className="flex items-center justify-between px-2">
               <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Result</label>
               <button onClick={copyResult} className="text-primary-600 text-xs font-bold flex items-center gap-1">
                 {isCopied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                 Copy
               </button>
             </div>
             <textarea 
               value={output}
               readOnly
               className="w-full h-40 p-6 bg-slate-100 rounded-2xl font-mono text-sm text-slate-700 border border-slate-200"
             />
          </div>
        )}
      </div>
    </div>
  );
}
