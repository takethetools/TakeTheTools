"use client";

import { useState } from "react";
import { Activity, Zap, Info } from "lucide-react";

export default function BMICalculatorTool() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState(""); // in cm
  const [bmi, setBmi] = useState<number | null>(null);

  const calculate = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height) / 100;
    if (w > 0 && h > 0) {
      setBmi(w / (h * h));
    }
  };

  const getStatus = (val: number) => {
    if (val < 18.5) return { label: "Underweight", color: "text-blue-500" };
    if (val < 25) return { label: "Normal", color: "text-green-500" };
    if (val < 30) return { label: "Overweight", color: "text-yellow-500" };
    return { label: "Obese", color: "text-red-500" };
  };

  return (
    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-8">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600">
          <Activity className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900">BMI Calculator</h3>
          <p className="text-sm text-slate-500">Calculate your Body Mass Index</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
           <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Weight (kg)</label>
           <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl" placeholder="70" />
        </div>
        <div className="space-y-2">
           <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Height (cm)</label>
           <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl" placeholder="175" />
        </div>
      </div>

      <button onClick={calculate} className="w-full py-4 bg-primary-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2">
         <Zap className="w-5 h-5" /> Calculate BMI
      </button>

      {bmi !== null && (
        <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100 text-center">
           <span className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono">Your BMI</span>
           <div className="text-5xl font-black text-slate-900 mt-2">{bmi.toFixed(1)}</div>
           <div className={`text-xl font-bold mt-2 ${getStatus(bmi).color}`}>{getStatus(bmi).label}</div>
        </div>
      )}
    </div>
  );
}
