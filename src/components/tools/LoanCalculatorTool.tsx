"use client";

import { useState, useMemo } from "react";
import { DollarSign, Zap, Landmark, CreditCard, PieChart, Calendar, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

export default function LoanCalculatorTool() {
  const [amount, setAmount] = useState("250000");
  const [rate, setRate] = useState("6.5");
  const [term, setTerm] = useState("30");
  const [showSchedule, setShowSchedule] = useState(false);

  const results = useMemo(() => {
    const p = parseFloat(amount);
    const r = parseFloat(rate) / 100 / 12;
    const n = parseFloat(term) * 12;

    if (isNaN(p) || isNaN(r) || isNaN(n) || p <= 0 || r <= 0 || n <= 0) return null;

    const monthly = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const total = monthly * n;
    const interest = total - p;

    // Amortization Schedule
    const schedule = [];
    let balance = p;
    for (let i = 1; i <= Math.min(n, 120); i++) { // Limit to first 10 years for performance
      const interestM = balance * r;
      const principalM = monthly - interestM;
      balance -= principalM;
      schedule.push({ month: i, payment: monthly, principal: principalM, interest: interestM, balance: Math.max(0, balance) });
    }

    return { monthly, total, interest, schedule, principalPct: (p / total) * 100, interestPct: (interest / total) * 100 };
  }, [amount, rate, term]);

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Input Card */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary-100 rounded-2xl flex items-center justify-center text-primary-600">
              <Landmark className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">Loan Expert</h3>
              <p className="text-sm text-slate-500">Professional loan analysis</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
               <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Loan Amount ($)</label>
               <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full p-5 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-2xl text-slate-800 outline-none focus:ring-4 ring-primary-50 transition-all" />
            </div>
            <div className="grid grid-cols-2 gap-4">
               <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Interest Rate (%)</label>
                  <input type="number" value={rate} onChange={(e) => setRate(e.target.value)} className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-lg text-slate-800 outline-none focus:ring-4 ring-primary-50 transition-all" />
               </div>
               <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Term (Years)</label>
                  <input type="number" value={term} onChange={(e) => setTerm(e.target.value)} className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-lg text-slate-800 outline-none focus:ring-4 ring-primary-50 transition-all" />
               </div>
            </div>
          </div>

          <div className="p-6 bg-slate-900 rounded-3xl space-y-4">
             <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Quick Breakdown</p>
             <div className="space-y-3">
                <div className="flex justify-between items-center">
                   <span className="text-xs text-slate-400">Principal</span>
                   <span className="text-xs font-bold text-white">{results?.principalPct.toFixed(1)}%</span>
                </div>
                <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                   <div className="h-full bg-primary-500" style={{ width: `${results?.principalPct}%` }} />
                </div>
                <div className="flex justify-between items-center">
                   <span className="text-xs text-slate-400">Interest</span>
                   <span className="text-xs font-bold text-white">{results?.interestPct.toFixed(1)}%</span>
                </div>
                <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                   <div className="h-full bg-amber-500" style={{ width: `${results?.interestPct}%` }} />
                </div>
             </div>
          </div>
        </div>

        {/* Results Area */}
        <div className="lg:col-span-2 space-y-6">
           {results ? (
             <>
               <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-8 opacity-5">
                     <DollarSign className="w-40 h-40 text-slate-900" />
                  </div>
                  <div className="relative z-10 text-center space-y-2">
                     <span className="text-xs font-bold text-slate-400 uppercase tracking-[0.3em]">Estimated Monthly Payment</span>
                     <div className="text-7xl font-black text-slate-900 tracking-tighter">
                        ${results.monthly.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                     </div>
                  </div>

                  <div className="grid grid-cols-2 gap-8 mt-12 pt-12 border-t border-slate-100">
                     <div className="text-center">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total Interest</p>
                        <p className="text-2xl font-black text-amber-600">${results.interest.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                     </div>
                     <div className="text-center">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total Payback</p>
                        <p className="text-2xl font-black text-primary-600">${results.total.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                     </div>
                  </div>
               </div>

               <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
                  <button 
                    onClick={() => setShowSchedule(!showSchedule)}
                    className="w-full p-6 flex items-center justify-between hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                       <Calendar className="w-5 h-5 text-primary-600" />
                       <span className="font-bold text-slate-900">Amortization Schedule (First 120 Months)</span>
                    </div>
                    {showSchedule ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                  </button>
                  
                  {showSchedule && (
                    <div className="px-6 pb-6 overflow-x-auto">
                       <table className="w-full text-left text-sm border-collapse">
                          <thead>
                             <tr className="text-slate-400 border-b border-slate-100">
                                <th className="py-4 font-bold uppercase text-[10px]">Month</th>
                                <th className="py-4 font-bold uppercase text-[10px]">Principal</th>
                                <th className="py-4 font-bold uppercase text-[10px]">Interest</th>
                                <th className="py-4 font-bold uppercase text-[10px]">Balance</th>
                             </tr>
                          </thead>
                          <tbody>
                             {results.schedule.map((row) => (
                               <tr key={row.month} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                                  <td className="py-4 font-mono font-bold text-slate-900">#{row.month}</td>
                                  <td className="py-4 font-mono text-green-600">${row.principal.toFixed(2)}</td>
                                  <td className="py-4 font-mono text-amber-600">${row.interest.toFixed(2)}</td>
                                  <td className="py-4 font-mono font-bold text-slate-400">${row.balance.toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
                               </tr>
                             ))}
                          </tbody>
                       </table>
                    </div>
                  )}
               </div>
             </>
           ) : (
             <div className="h-full bg-slate-50 border-2 border-dashed border-slate-200 rounded-[3rem] flex flex-col items-center justify-center p-12 text-center gap-4 opacity-50">
                <Landmark className="w-12 h-12 text-slate-300" />
                <p className="text-sm font-bold text-slate-400">Enter loan details to see your repayment journey</p>
             </div>
           )}
        </div>
      </div>
    </div>
  );
}
