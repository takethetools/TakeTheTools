"use client";

import { useState } from "react";
import { BarChart, Zap, ListOrdered } from "lucide-react";

export default function AverageCalculatorTool() {
  const [input, setInput] = useState("");
  const [stats, setStats] = useState<{ mean: number; median: number; count: number } | null>(null);

  const calculate = () => {
    const numbers = input.split(/[\s,]+/).map(Number).filter(n => !isNaN(n));
    if (numbers.length === 0) return;

    const count = numbers.length;
    const mean = numbers.reduce((a, b) => a + b, 0) / count;
    
    const sorted = [...numbers].sort((a, b) => a - b);
    const median = count % 2 === 0 ? (sorted[count/2 - 1] + sorted[count/2]) / 2 : sorted[Math.floor(count/2)];

    setStats({ mean, median, count });
  };

  return (
    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-8">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600">
          <BarChart className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900">Average Calculator</h3>
          <p className="text-sm text-slate-500">Calculate mean, median and statistics</p>
        </div>
      </div>

      <div className="space-y-6">
        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Enter numbers (comma or space separated)</label>
        <textarea 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full h-32 p-6 bg-slate-50 border border-slate-100 rounded-2xl font-mono text-lg"
          placeholder="10, 20, 30, 40..."
        />
        <button onClick={calculate} className="w-full py-4 bg-primary-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2">
           <Zap className="w-5 h-5" /> Calculate Stats
        </button>

        {stats && (
          <div className="grid grid-cols-3 gap-4">
             <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 text-center">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Mean</span>
                <p className="text-2xl font-bold text-slate-900">{stats.mean.toFixed(2)}</p>
             </div>
             <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 text-center">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Median</span>
                <p className="text-2xl font-bold text-slate-900">{stats.median}</p>
             </div>
             <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 text-center">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Count</span>
                <p className="text-2xl font-bold text-slate-900">{stats.count}</p>
             </div>
          </div>
        )}
      </div>
    </div>
  );
}
