"use client";

import { useState } from "react";
import { DollarSign, Zap, Landmark, CreditCard } from "lucide-react";

export default function LoanCalculatorTool() {
  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState("");
  const [term, setTerm] = useState("");
  const [result, setResult] = useState<{ monthly: number; total: number; interest: number } | null>(null);

  const calculate = () => {
    const p = parseFloat(amount);
    const r = parseFloat(rate) / 100 / 12;
    const n = parseFloat(term) * 12;

    if (p > 0 && r > 0 && n > 0) {
      const monthly = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      const total = monthly * n;
      const interest = total - p;
      setResult({ monthly, total, interest });
    }
  };

  return (
    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-8">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600">
          <Landmark className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900">Loan Calculator</h3>
          <p className="text-sm text-slate-500">Estimate monthly payments and interest</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
           <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Amount ($)</label>
           <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl" placeholder="250000" />
        </div>
        <div className="space-y-2">
           <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Rate (%)</label>
           <input type="number" value={rate} onChange={(e) => setRate(e.target.value)} className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl" placeholder="6.5" />
        </div>
        <div className="space-y-2">
           <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Term (Years)</label>
           <input type="number" value={term} onChange={(e) => setTerm(e.target.value)} className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl" placeholder="30" />
        </div>
      </div>

      <button onClick={calculate} className="w-full py-4 bg-primary-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2">
         <Zap className="w-5 h-5" /> Calculate Payment
      </button>

      {result && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div className="p-8 bg-slate-900 rounded-3xl text-center md:col-span-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Monthly Payment</span>
              <div className="text-5xl font-black text-blue-100 mt-2">${result.monthly.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
           </div>
           <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 text-center">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Interest</span>
              <p className="text-xl font-bold text-slate-900">${result.interest.toLocaleString(undefined, {maximumFractionDigits: 0})}</p>
           </div>
           <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 text-center">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Payment</span>
              <p className="text-xl font-bold text-slate-900">${result.total.toLocaleString(undefined, {maximumFractionDigits: 0})}</p>
           </div>
        </div>
      )}
    </div>
  );
}
