"use client";

import { useState } from "react";
import { Calendar, Zap, Clock, ArrowRight } from "lucide-react";

export default function DateDifferenceTool() {
  const [date1, setDate1] = useState("");
  const [date2, setDate2] = useState("");
  const [diff, setDiff] = useState<{ days: number; weeks: number; months: number } | null>(null);

  const calculate = () => {
    if (!date1 || !date2) return;
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    const timeDiff = Math.abs(d2.getTime() - d1.getTime());
    const days = Math.ceil(timeDiff / (1000 * 3600 * 24));
    const weeks = (days / 7).toFixed(1);
    const months = (days / 30.44).toFixed(1);
    
    setDiff({ days, weeks: parseFloat(weeks), months: parseFloat(months) });
  };

  return (
    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-8">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600">
          <Calendar className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900">Date Difference</h3>
          <p className="text-sm text-slate-500">Calculate time between two dates</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
         <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Start Date</label>
            <input type="date" value={date1} onChange={(e) => setDate1(e.target.value)} className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl" />
         </div>
         <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">End Date</label>
            <input type="date" value={date2} onChange={(e) => setDate2(e.target.value)} className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl" />
         </div>
      </div>

      <button onClick={calculate} className="w-full py-4 bg-primary-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2">
         <Zap className="w-5 h-5" /> Calculate Difference
      </button>

      {diff && (
        <div className="grid grid-cols-3 gap-4">
           <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 text-center">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Days</span>
              <p className="text-2xl font-black text-slate-900">{diff.days}</p>
           </div>
           <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 text-center">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Weeks</span>
              <p className="text-2xl font-black text-slate-900">{diff.weeks}</p>
           </div>
           <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 text-center">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Months</span>
              <p className="text-2xl font-black text-slate-900">{diff.months}</p>
           </div>
        </div>
      )}
    </div>
  );
}
