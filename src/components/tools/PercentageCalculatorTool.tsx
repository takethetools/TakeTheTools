"use client";

<<<<<<< HEAD
import { useState, useMemo } from "react";
import { Percent, Zap, ArrowRight, Info, TrendingUp, TrendingDown, Divide, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export default function PercentageCalculatorTool() {
  const [mode, setMode] = useState<"of" | "proportion" | "change" | "reverse">("of");
  const [val1, setVal1] = useState("10");
  const [val2, setVal2] = useState("100");

  const result = useMemo(() => {
    const v1 = parseFloat(val1);
    const v2 = parseFloat(val2);
    if (isNaN(v1) || isNaN(v2)) return null;

    switch (mode) {
      case "of": return (v1 / 100) * v2;
      case "proportion": return (v1 / v2) * 100;
      case "change": return ((v2 - v1) / v1) * 100;
      case "reverse": return v1 / (v2 / 100);
      default: return null;
    }
  }, [val1, val2, mode]);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Mode Selector */}
      <div className="flex bg-slate-100 p-1 rounded-2xl w-fit mx-auto shadow-inner overflow-x-auto max-w-full">
        {[
          { id: "of", label: "X% of Y" },
          { id: "proportion", label: "X is ?% of Y" },
          { id: "change", label: "% Change" },
          { id: "reverse", label: "X is Y% of ?" },
        ].map((m) => (
          <button
            key={m.id}
            onClick={() => { setMode(m.id as any); setVal1(""); setVal2(""); }}
            className={cn(
              "whitespace-nowrap px-6 py-2.5 rounded-xl text-sm font-bold transition-all",
              mode === m.id ? "bg-white text-primary-600 shadow-md" : "text-slate-500 hover:text-slate-700"
            )}
          >
            {m.label}
          </button>
        ))}
      </div>

      <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-xl space-y-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5">
           <Percent className="w-40 h-40 text-slate-900" />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
          <div className="w-full md:flex-1 space-y-3">
             <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] pl-1">
               {mode === "of" ? "Percentage (%)" : mode === "proportion" ? "Value (X)" : mode === "change" ? "Old Value" : "Value (X)"}
             </label>
             <input 
               type="number" 
               value={val1} 
               onChange={(e) => setVal1(e.target.value)} 
               className="w-full p-6 bg-slate-50 border border-slate-100 rounded-[2rem] font-black text-3xl text-slate-800 focus:ring-4 ring-primary-50 transition-all outline-none shadow-inner" 
               placeholder="0"
             />
          </div>

          <div className="flex flex-col items-center gap-2">
             <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-black text-xl shadow-sm">
                {mode === "of" ? "×" : mode === "proportion" ? "÷" : mode === "change" ? "→" : "÷"}
             </div>
          </div>

          <div className="w-full md:flex-1 space-y-3">
             <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] pl-1">
               {mode === "of" ? "Total (Y)" : mode === "proportion" ? "Total (Y)" : mode === "change" ? "New Value" : "Percent (%)"}
             </label>
             <input 
               type="number" 
               value={val2} 
               onChange={(e) => setVal2(e.target.value)} 
               className="w-full p-6 bg-slate-50 border border-slate-100 rounded-[2rem] font-black text-3xl text-slate-800 focus:ring-4 ring-primary-50 transition-all outline-none shadow-inner" 
               placeholder="0"
             />
          </div>
        </div>

        {result !== null && (
          <div className="bg-slate-900 p-10 rounded-[2.5rem] text-center animate-in zoom-in-95 duration-300">
             <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-[0.3em]">Calculated Result</span>
                {mode === "change" && (result >= 0 ? <TrendingUp className="w-4 h-4 text-green-500" /> : <TrendingDown className="w-4 h-4 text-red-500" />)}
             </div>
             <div className="text-6xl font-black text-white break-all">
                {result.toLocaleString(undefined, { maximumFractionDigits: 4 })}
                <span className="text-3xl text-slate-500 ml-2">
                   {mode === "proportion" || mode === "change" ? "%" : ""}
                </span>
             </div>
             
             {mode === "change" && (
                <p className={cn("text-sm font-bold mt-4", result >= 0 ? "text-green-400" : "text-red-400")}>
                  {result >= 0 ? "Increase" : "Decrease"} of {Math.abs(result).toFixed(2)}%
                </p>
             )}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
         <div className="p-6 bg-primary-50 rounded-[2rem] border border-primary-100 flex gap-4 items-start">
            <Info className="w-6 h-6 text-primary-600 flex-shrink-0" />
            <div className="space-y-1">
               <p className="text-xs font-bold text-primary-900 uppercase">Formula Used</p>
               <p className="text-[11px] text-primary-700 leading-relaxed font-mono">
                 {mode === "of" && "(Percentage / 100) * Total"}
                 {mode === "proportion" && "(Value / Total) * 100"}
                 {mode === "change" && "((New - Old) / Old) * 100"}
                 {mode === "reverse" && "Value / (Percentage / 100)"}
               </p>
            </div>
         </div>
         <div className="p-6 bg-slate-900 rounded-[2rem] text-white flex gap-4 items-center">
            <HelpCircle className="w-8 h-8 text-slate-500" />
            <div>
               <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Quick Tip</p>
               <p className="text-[11px] text-slate-300">Percentage changes are vital in finance. A 100% increase followed by a 50% decrease returns you to your original value.</p>
            </div>
         </div>
      </div>
=======
import { useState } from "react";
import { Percent, Zap, ArrowRight, Info } from "lucide-react";

export default function PercentageCalculatorTool() {
  const [val1, setVal1] = useState("");
  const [val2, setVal2] = useState("");
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const v1 = parseFloat(val1);
    const v2 = parseFloat(val2);
    if (!isNaN(v1) && !isNaN(v2)) {
      setResult((v1 / 100) * v2);
    }
  };

  return (
    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-8">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600">
          <Percent className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900">Percentage Calculator</h3>
          <p className="text-sm text-slate-500">Find X percent of Y quickly</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="flex-grow space-y-2">
           <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">What is</label>
           <input type="number" value={val1} onChange={(e) => setVal1(e.target.value)} className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-xl" placeholder="10" />
        </div>
        <span className="text-2xl font-bold text-slate-300 mt-6">%</span>
        <div className="flex-grow space-y-2">
           <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Of</label>
           <input type="number" value={val2} onChange={(e) => setVal2(e.target.value)} className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-xl" placeholder="100" />
        </div>
         <button onClick={calculate} className="mt-6 p-4 bg-primary-600 text-white rounded-2xl hover:bg-primary-700 transition-colors">
            <Zap className="w-6 h-6" />
         </button>
      </div>

      {result !== null && (
        <div className="p-8 bg-slate-900 rounded-3xl text-center">
           <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Result</span>
           <div className="text-4xl font-bold text-blue-100 mt-2">{result.toLocaleString()}</div>
        </div>
      )}
>>>>>>> d366566fdaff0e02dbc3205770509d5194ddbac9
    </div>
  );
}
