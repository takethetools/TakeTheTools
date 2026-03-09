"use client";

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
    </div>
  );
}
