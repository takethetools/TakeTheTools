"use client";

import { useState } from "react";
import { BarChart, Copy, Check, Zap, Info, ListOrdered } from "lucide-react";

export default function WordFrequencyTool() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState<{ word: string; count: number; percentage: string }[]>([]);
  const [isCopied, setIsCopied] = useState(false);

  const analyze = () => {
    if (!input) return;
    
    const words = input.toLowerCase().match(/\b\w+\b/g) || [];
    const totalWords = words.length;
    
    const freq: Record<string, number> = {};
    words.forEach(w => {
      freq[w] = (freq[w] || 0) + 1;
    });

    const sorted = Object.entries(freq)
      .map(([word, count]) => ({
        word,
        count,
        percentage: ((count / totalWords) * 100).toFixed(1)
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 50);

    setResults(sorted);
  };

  return (
    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-8">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600">
          <BarChart className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900">Word Frequency Counter</h3>
          <p className="text-sm text-slate-500">Analyze word density and frequency in your text</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-6">
           <textarea 
             value={input}
             onChange={(e) => setInput(e.target.value)}
             className="w-full h-[400px] bg-slate-50 border border-slate-100 rounded-2xl p-6 font-sans text-slate-600 focus:outline-none"
             placeholder="Paste your content to analyze keyword density..."
           />
           <button 
             onClick={analyze}
             className="w-full py-4 bg-primary-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2"
           >
             <Zap className="w-5 h-5" /> Analyze Frequency
           </button>
        </div>

        <div className="space-y-4">
           <div className="flex items-center justify-between px-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Top Keywords</label>
              <span className="text-xs text-slate-400">{results.length} unique words detected</span>
           </div>
           
           <div className="bg-slate-50 rounded-3xl border border-slate-100 overflow-hidden min-h-[400px]">
              {results.length > 0 ? (
                <div className="divide-y divide-slate-100">
                  {results.map((row, i) => (
                    <div key={i} className="flex items-center justify-between p-4 hover:bg-white transition-colors">
                       <span className="font-bold text-slate-700">{row.word}</span>
                       <div className="flex items-center gap-4">
                          <span className="text-xs font-mono text-slate-400">{row.count} times</span>
                          <div className="w-16 h-2 bg-slate-200 rounded-full overflow-hidden">
                             <div className="h-full bg-primary-500" style={{ width: `${row.percentage}%` }}></div>
                          </div>
                          <span className="text-xs font-bold text-primary-600 w-10">{row.percentage}%</span>
                       </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full py-20 text-slate-400">
                   <ListOrdered className="w-12 h-12 mb-4 opacity-20" />
                   <p className="text-sm italic">Analyze text to see word breakdown</p>
                </div>
              )}
           </div>
        </div>
      </div>
    </div>
  );
}
