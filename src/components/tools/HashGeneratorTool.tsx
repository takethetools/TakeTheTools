"use client";

import { useState } from "react";
import { Hash, Copy, Check, Zap, RefreshCw, FileText } from "lucide-react";
import CryptoJS from "crypto-js";
import { cn } from "@/lib/utils";

interface HashGeneratorToolProps {
  algorithm?: "MD5" | "SHA-256" | "SHA-512";
}

export default function HashGeneratorTool({ algorithm = "SHA-256" }: HashGeneratorToolProps) {
  const [input, setInput] = useState("");
  const [hash, setHash] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  const generateHash = async () => {
    if (!input) return;
    
    // For SHA-256/512 we use crypto.subtle
    if (algorithm === "SHA-256" || algorithm === "SHA-512") {
      const msgUint8 = new TextEncoder().encode(input);
      const hashBuffer = await crypto.subtle.digest(algorithm, msgUint8);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      setHash(hashHex);
    } else if (algorithm === "MD5") {
      setHash(CryptoJS.MD5(input).toString());
    }
  };

  const copyResult = () => {
    navigator.clipboard.writeText(hash);
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
          <h3 className="text-xl font-bold text-slate-900">{algorithm} Hash Generator</h3>
          <p className="text-sm text-slate-500">Securely hash strings in your browser</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-2">Input String</label>
          <textarea 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full h-32 bg-slate-50 border border-slate-100 rounded-2xl p-6 font-mono text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
            placeholder="Enter text to hash..."
          />
        </div>

        <button 
          onClick={generateHash}
          className="w-full py-4 bg-primary-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary-500/20"
        >
          <Zap className="w-5 h-5" />
          Generate {algorithm} Hash
        </button>

        {hash && (
          <div className="space-y-2">
            <div className="flex items-center justify-between px-2">
               <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Resulting Hash</label>
               <button onClick={copyResult} className="text-primary-600 text-xs font-bold flex items-center gap-1">
                 {isCopied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                 {isCopied ? "Copied" : "Copy"}
               </button>
            </div>
            <div className="w-full p-6 bg-slate-900 rounded-2xl font-mono text-sm text-blue-100 break-all border border-slate-800">
               {hash}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
