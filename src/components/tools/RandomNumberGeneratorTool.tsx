"use client";

import { useState } from "react";
import { Dices, Zap, RefreshCw, Copy, Check } from "lucide-react";

export default function RandomNumberGeneratorTool() {
  const [min, setMin] = useState("1");
  const [max, setMax] = useState("100");
  const [result, setResult] = useState<number | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  const generate = () => {
    const mn = parseInt(min);
    const mx = parseInt(max);
    if (!isNaN(mn) && !isNaN(mx) && mx > mn) {
      const array = new Uint32Array(1);
      crypto.getRandomValues(array);
      const val = mn + (array[0] % (mx - mn + 1));
      setResult(val);
    }
  };

  const copyResult = () => {
    if (result !== null) {
      navigator.clipboard.writeText(result.toString());
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  return (
    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-8">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600">
          <Dices className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900">Random Number Generator</h3>
          <p className="text-sm text-slate-500">Truly random numbers using crypto.getRandomValues()</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
           <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Min</label>
           <input type="number" value={min} onChange={(e) => setMin(e.target.value)} className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl" placeholder="1" />
        </div>
        <div className="space-y-2">
           <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Max</label>
           <input type="number" value={max} onChange={(e) => setMax(e.target.value)} className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl" placeholder="100" />
        </div>
      </div>

      <button onClick={generate} className="w-full py-4 bg-primary-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2">
         <Zap className="w-5 h-5" /> Generate Number
      </button>

      {result !== null && (
        <div className="p-12 bg-slate-900 rounded-3xl text-center relative group">
           <button onClick={copyResult} className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors">
              {isCopied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
           </button>
           <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Result</span>
           <div className="text-6xl font-black text-blue-100 mt-2">{result}</div>
        </div>
      )}
    </div>
  );
}
