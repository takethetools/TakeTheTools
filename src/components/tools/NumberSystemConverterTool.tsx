"use client";

import { useState, useEffect } from "react";
import { Binary, Copy, Check, ArrowRightLeft, Info } from "lucide-react";
import { cn } from "@/lib/utils";

export default function NumberSystemConverterTool() {
  const [value, setValue] = useState("1010");
  const [base, setBase] = useState<number>(2);
  const [conversions, setConversions] = useState<{ name: string; value: string; base: number }[]>([]);
  const [isCopied, setIsCopied] = useState<string | null>(null);

  useEffect(() => {
    try {
      const num = parseInt(value, base);
      if (isNaN(num)) {
        setConversions([]);
        return;
      }

      setConversions([
        { name: "Binary", value: num.toString(2), base: 2 },
        { name: "Decimal", value: num.toString(10), base: 10 },
        { name: "Hexadecimal", value: num.toString(16).toUpperCase(), base: 16 },
        { name: "Octal", value: num.toString(8), base: 8 },
      ]);
    } catch (e) {
      setConversions([]);
    }
  }, [value, base]);

  const copy = (val: string, id: string) => {
    navigator.clipboard.writeText(val);
    setIsCopied(id);
    setTimeout(() => setIsCopied(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row gap-4 items-end">
          <div className="flex-grow space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider pl-2">Input Number</label>
            <input 
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 font-mono text-xl text-primary-600 focus:ring-2 focus:ring-primary-500 outline-none transition-all"
            />
          </div>
          <div className="w-full sm:w-48 space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider pl-2">Source Base</label>
            <select 
              value={base}
              onChange={(e) => setBase(Number(e.target.value))}
              className="w-full bg-slate-100 border-none rounded-2xl px-4 py-4 font-bold text-slate-700 focus:ring-2 focus:ring-primary-500 outline-none appearance-none cursor-pointer"
            >
              <option value={2}>Binary (Base 2)</option>
              <option value={8}>Octal (Base 8)</option>
              <option value={10}>Decimal (Base 10)</option>
              <option value={16}>Hex (Base 16)</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
          {conversions.map((sys) => (
            <div key={sys.name} className="p-6 bg-slate-50 border border-slate-100 rounded-2xl space-y-3 group hover:border-primary-200 transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{sys.name}</span>
                <button 
                  onClick={() => copy(sys.value, sys.name)}
                  className={cn(
                    "p-2 rounded-lg transition-all",
                    isCopied === sys.name ? "bg-green-100 text-green-600" : "bg-white text-slate-400 hover:text-primary-600 shadow-sm"
                  )}
                >
                  {isCopied === sys.name ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <div className="text-2xl font-mono font-bold text-slate-900 break-all">
                {sys.value}
              </div>
            </div>
          ))}
          {!conversions.length && (
            <div className="col-span-full py-20 flex flex-col items-center justify-center text-slate-400">
               <Info className="w-12 h-12 opacity-10 mb-4" />
               <p className="font-medium text-sm">Please enter a valid number for the selected base</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
