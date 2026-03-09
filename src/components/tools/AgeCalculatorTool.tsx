"use client";

import { useState } from "react";
import { Calendar, Zap, Clock } from "lucide-react";

export default function AgeCalculatorTool() {
  const [birthdate, setBirthdate] = useState("");
  const [age, setAge] = useState<{ years: number; months: number; days: number } | null>(null);

  const calculate = () => {
    if (!birthdate) return;
    const birth = new Date(birthdate);
    const today = new Date();
    
    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += lastMonth.getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    setAge({ years, months, days });
  };

  return (
    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-8">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600">
          <Calendar className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900">Age Calculator</h3>
          <p className="text-sm text-slate-500">Calculate your exact age in years, months and days</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
           <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Your Date of Birth</label>
           <input 
             type="date" 
             value={birthdate} 
             onChange={(e) => setBirthdate(e.target.value)}
             className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl text-xl font-bold text-slate-700"
           />
        </div>

        <button onClick={calculate} className="w-full py-4 bg-primary-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2">
           <Zap className="w-5 h-5" /> Calculate Age
        </button>

        {age && (
          <div className="grid grid-cols-3 gap-4">
             <div className="p-6 bg-slate-900 rounded-2xl text-center">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Years</span>
                <p className="text-3xl font-black text-blue-100">{age.years}</p>
             </div>
             <div className="p-6 bg-slate-900 rounded-2xl text-center">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Months</span>
                <p className="text-3xl font-black text-blue-100">{age.months}</p>
             </div>
             <div className="p-6 bg-slate-900 rounded-2xl text-center">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Days</span>
                <p className="text-3xl font-black text-blue-100">{age.days}</p>
             </div>
          </div>
        )}
      </div>
    </div>
  );
}
