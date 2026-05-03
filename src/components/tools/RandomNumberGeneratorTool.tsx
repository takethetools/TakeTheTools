"use client";

<<<<<<< HEAD
import { useState, useCallback } from "react";
import { Dices, Zap, RefreshCw, Copy, Check, Hash, History, ListFilter } from "lucide-react";
import { cn } from "@/lib/utils";
=======
import { useState } from "react";
import { Dices, Zap, RefreshCw, Copy, Check } from "lucide-react";
>>>>>>> d366566fdaff0e02dbc3205770509d5194ddbac9

export default function RandomNumberGeneratorTool() {
  const [min, setMin] = useState("1");
  const [max, setMax] = useState("100");
<<<<<<< HEAD
  const [count, setCount] = useState("1");
  const [allowDuplicates, setAllowDuplicates] = useState(false);
  const [results, setResults] = useState<number[]>([]);
  const [history, setHistory] = useState<number[][]>([]);
=======
  const [result, setResult] = useState<number | null>(null);
>>>>>>> d366566fdaff0e02dbc3205770509d5194ddbac9
  const [isCopied, setIsCopied] = useState(false);

  const generate = () => {
    const mn = parseInt(min);
    const mx = parseInt(max);
<<<<<<< HEAD
    const qty = parseInt(count);

    if (isNaN(mn) || isNaN(mx) || isNaN(qty) || mx < mn || qty < 1) return;
    
    const range = mx - mn + 1;
    if (!allowDuplicates && qty > range) return;

    const newResults: number[] = [];
    const used = new Set<number>();

    while (newResults.length < qty) {
      const array = new Uint32Array(1);
      crypto.getRandomValues(array);
      const val = mn + (array[0] % range);
      
      if (allowDuplicates || !used.has(val)) {
        newResults.push(val);
        used.add(val);
      }
    }

    setResults(newResults);
    setHistory(prev => [newResults, ...prev].slice(0, 10));
  };

  const copyResults = () => {
    navigator.clipboard.writeText(results.join(", "));
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Control Panel */}
      <div className="lg:col-span-1 bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-8">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-primary-100 rounded-2xl flex items-center justify-center text-primary-600">
            <Dices className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 leading-tight">Random Studio</h3>
            <p className="text-xs text-slate-500">Cryptographic Entropy</p>
          </div>
        </div>

        <div className="space-y-6">
           <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                 <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Min</label>
                 <input type="number" value={min} onChange={(e) => setMin(e.target.value)} className="input-field-sm" />
              </div>
              <div className="space-y-2">
                 <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Max</label>
                 <input type="number" value={max} onChange={(e) => setMax(e.target.value)} className="input-field-sm" />
              </div>
           </div>

           <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Quantity</label>
              <input type="number" value={count} onChange={(e) => setCount(e.target.value)} className="input-field-sm" />
           </div>

           <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
              <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">Allow Duplicates</span>
              <button 
                onClick={() => setAllowDuplicates(!allowDuplicates)}
                className={cn("w-10 h-5 rounded-full transition-all relative", allowDuplicates ? "bg-primary-600" : "bg-slate-300")}
              >
                <div className={cn("absolute top-1 w-3 h-3 bg-white rounded-full transition-all", allowDuplicates ? "right-1" : "left-1")} />
              </button>
           </div>
        </div>

        <button onClick={generate} className="w-full py-4 bg-primary-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-primary-900/20 hover:bg-primary-500 transition-all active:scale-95">
           <Zap className="w-4 h-4" /> Roll Numbers
        </button>
      </div>

      {/* Results Display */}
      <div className="lg:col-span-2 space-y-6">
         {results.length > 0 ? (
           <div className="bg-slate-900 p-10 rounded-[3rem] shadow-2xl relative overflow-hidden group min-h-[300px] flex flex-col items-center justify-center">
              <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                 <div className="absolute top-20 left-20 w-40 h-40 bg-primary-500 blur-[100px] rounded-full" />
              </div>
              
              <button onClick={copyResults} className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors flex items-center gap-2">
                 <span className="text-[10px] font-bold uppercase tracking-widest">{isCopied ? "Copied" : "Copy All"}</span>
                 {isCopied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
              </button>

              <div className="relative z-10 flex flex-wrap justify-center gap-4 max-h-[400px] overflow-y-auto custom-scrollbar p-4 w-full">
                 {results.map((r, i) => (
                   <div key={i} className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20 animate-in zoom-in-50 duration-300" style={{ animationDelay: `${i * 50}ms` }}>
                      <span className="text-3xl font-black text-white">{r}</span>
                   </div>
                 ))}
              </div>
           </div>
         ) : (
           <div className="h-64 border-2 border-dashed border-slate-100 rounded-[3rem] flex flex-col items-center justify-center text-slate-300 gap-4">
              <Dices className="w-12 h-12 opacity-20" />
              <p className="text-sm font-bold uppercase tracking-widest opacity-30">Press Roll to Generate</p>
           </div>
         )}

         {/* History */}
         {history.length > 0 && (
           <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
              <div className="flex items-center gap-2 mb-6">
                 <History className="w-4 h-4 text-slate-400" />
                 <h4 className="font-bold text-slate-900 uppercase tracking-widest text-xs">Recent History</h4>
              </div>
              <div className="space-y-3">
                 {history.map((h, i) => (
                   <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100 hover:border-primary-100 transition-all group">
                      <span className="text-[10px] font-mono text-slate-400">#{history.length - i}</span>
                      <div className="flex-grow flex gap-2 overflow-x-auto no-scrollbar">
                         {h.map((v, j) => (
                           <span key={j} className="px-2 py-0.5 bg-white rounded-md border border-slate-100 text-xs font-bold text-slate-600">{v}</span>
                         ))}
                      </div>
                      <button onClick={() => setResults(h)} className="opacity-0 group-hover:opacity-100 text-primary-600 transition-opacity">
                         <RefreshCw className="w-3 h-3" />
                      </button>
                   </div>
                 ))}
              </div>
           </div>
         )}
      </div>

      <style jsx>{`
        .input-field-sm {
          @apply w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-xl text-slate-700 outline-none focus:ring-4 ring-primary-50 transition-all;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
=======
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
>>>>>>> d366566fdaff0e02dbc3205770509d5194ddbac9
    </div>
  );
}
