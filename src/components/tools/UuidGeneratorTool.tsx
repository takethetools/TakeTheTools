"use client";

import { useState } from "react";
import { Fingerprint, Zap, Copy, Check, RefreshCw } from "lucide-react";

export default function UuidGeneratorTool() {
  const [uuids, setUuuids] = useState<string[]>([]);
  const [count, setCount] = useState(1);
  const [isCopied, setIsCopied] = useState(false);

  const generate = () => {
    const newUuuids = Array.from({ length: count }, () => crypto.randomUUID());
    setUuuids(newUuuids);
  };

  const copyAll = () => {
    navigator.clipboard.writeText(uuids.join("\n"));
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-8">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600">
          <Fingerprint className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900">UUID Generator</h3>
          <p className="text-sm text-slate-500">Generate cryptographically secure v4 UUIDs</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6 items-end">
         <div className="flex-grow space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-2">Quantity</label>
            <input 
              type="number" 
              value={count} 
              onChange={(e) => setCount(Math.max(1, Math.min(100, parseInt(e.target.value) || 1)))}
              className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-xl"
            />
         </div>
         <button onClick={generate} className="px-12 py-5 bg-primary-600 text-white rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-primary-500/20">
            <Zap className="w-5 h-5" /> Generate UUIDs
         </button>
      </div>

      {uuids.length > 0 && (
        <div className="space-y-4">
           <div className="flex items-center justify-between px-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Result</span>
              <button onClick={copyAll} className="text-primary-600 text-xs font-bold flex items-center gap-1">
                 {isCopied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                 Copy All
              </button>
           </div>
           <div className="p-8 bg-slate-900 rounded-3xl border border-slate-800 space-y-2 h-64 overflow-auto scrollbar-hide">
              {uuids.map((uuid, i) => (
                <div key={i} className="font-mono text-sm text-blue-100 py-1 transition-all hover:text-white">
                   {uuid}
                </div>
              ))}
           </div>
        </div>
      )}
    </div>
  );
}
