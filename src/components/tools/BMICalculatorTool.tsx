"use client";

<<<<<<< HEAD
import { useState, useMemo } from "react";
import { Activity, Zap, Info, ArrowRight, ShieldCheck, Heart, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

export default function BMICalculatorTool() {
  const [weight, setWeight] = useState("70");
  const [height, setHeight] = useState("175");
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");

  const results = useMemo(() => {
    const w = parseFloat(weight);
    const h = unit === "metric" ? parseFloat(height) / 100 : parseFloat(height);
    
    if (isNaN(w) || isNaN(h) || h <= 0) return null;

    let bmiValue = unit === "metric" ? w / (h * h) : (w / (h * h)) * 703;
    
    let status = { label: "Normal", color: "text-green-500", bg: "bg-green-500", advice: "You have a healthy body weight. Maintain a balanced diet and regular exercise." };
    if (bmiValue < 18.5) status = { label: "Underweight", color: "text-blue-500", bg: "bg-blue-500", advice: "You are below the healthy range. Consider consulting a nutritionist for a weight gain plan." };
    else if (bmiValue < 25) status = { label: "Normal", color: "text-green-500", bg: "bg-green-500", advice: "Perfect! Your weight is in the ideal range. Keep up the good work." };
    else if (bmiValue < 30) status = { label: "Overweight", color: "text-yellow-500", bg: "bg-yellow-500", advice: "You are slightly over the healthy range. Consider increasing physical activity." };
    else status = { label: "Obese", color: "text-red-500", bg: "bg-red-500", advice: "Your BMI indicates obesity. We recommend consulting a healthcare provider for personalized advice." };

    // Healthy weight range
    const minW = unit === "metric" ? (18.5 * h * h).toFixed(1) : ((18.5 * h * h) / 703).toFixed(1);
    const maxW = unit === "metric" ? (24.9 * h * h).toFixed(1) : ((24.9 * h * h) / 703).toFixed(1);

    return { bmi: bmiValue, status, range: `${minW} - ${maxW} ${unit === "metric" ? "kg" : "lbs"}` };
  }, [weight, height, unit]);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Card */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary-100 rounded-2xl flex items-center justify-center text-primary-600">
                <Activity className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">BMI Studio</h3>
                <p className="text-sm text-slate-500">Professional health metrics</p>
              </div>
            </div>
            <div className="flex bg-slate-100 p-1 rounded-xl">
               <button onClick={() => setUnit("metric")} className={cn("px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all", unit === "metric" ? "bg-white text-primary-600 shadow-sm" : "text-slate-500")}>Metric</button>
               <button onClick={() => setUnit("imperial")} className={cn("px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all", unit === "imperial" ? "bg-white text-primary-600 shadow-sm" : "text-slate-500")}>Imperial</button>
            </div>
          </div>

          <div className="space-y-6">
             <div className="space-y-2">
                <div className="flex justify-between pl-1">
                   <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Weight ({unit === "metric" ? "kg" : "lbs"})</label>
                   <span className="text-primary-600 font-bold">{weight}</span>
                </div>
                <input type="range" min="10" max={unit === "metric" ? "200" : "500"} value={weight} onChange={(e) => setWeight(e.target.value)} className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-primary-600" />
             </div>

             <div className="space-y-2">
                <div className="flex justify-between pl-1">
                   <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Height ({unit === "metric" ? "cm" : "inches"})</label>
                   <span className="text-primary-600 font-bold">{height}</span>
                </div>
                <input type="range" min="50" max={unit === "metric" ? "250" : "100"} value={height} onChange={(e) => setHeight(e.target.value)} className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-primary-600" />
             </div>
          </div>

          <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 space-y-3">
             <div className="flex items-center gap-2 text-primary-600">
                <Info className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wider">How it works</span>
             </div>
             <p className="text-xs text-slate-500 leading-relaxed">
               BMI is a simple index of weight-for-height that is commonly used to classify underweight, overweight and obesity in adults.
             </p>
          </div>
        </div>

        {/* Results Card */}
        <div className="space-y-6">
           {results ? (
             <>
               <div className="bg-slate-900 p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-8 opacity-10">
                     <Activity className="w-32 h-32 text-white" />
                  </div>
                  
                  <div className="relative z-10 space-y-6 text-center">
                     <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em]">Your BMI Score</span>
                     <div className="text-7xl font-black text-white">{results.bmi.toFixed(1)}</div>
                     
                     <div className={cn("inline-flex items-center gap-2 px-6 py-2 rounded-full font-bold text-sm", results.status.bg, "text-white")}>
                        {results.status.label}
                     </div>
                  </div>

                  {/* Visual Gauge */}
                  <div className="mt-12 h-2 bg-slate-800 rounded-full overflow-hidden flex">
                     <div className="h-full bg-blue-500" style={{ width: "18.5%" }} />
                     <div className="h-full bg-green-500" style={{ width: "6.5%" }} />
                     <div className="h-full bg-yellow-500" style={{ width: "5%" }} />
                     <div className="h-full bg-red-500" style={{ width: "70%" }} />
                  </div>
                  <div className="mt-2 flex justify-between px-1">
                     <span className="text-[8px] text-slate-500 font-bold">18.5</span>
                     <span className="text-[8px] text-slate-500 font-bold">25</span>
                     <span className="text-[8px] text-slate-500 font-bold">30</span>
                  </div>
               </div>

               <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                     <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Healthy Weight Range</p>
                     <p className="text-xl font-black text-slate-900">{results.range}</p>
                  </div>
                  <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-center">
                     <Heart className="w-8 h-8 text-red-500" />
                  </div>
               </div>

               <div className="bg-primary-50 p-6 rounded-3xl border border-primary-100 flex gap-4">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-primary-600 flex-shrink-0 shadow-sm">
                     <Zap className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                     <p className="text-xs font-bold text-primary-900 uppercase tracking-wider">Health Advice</p>
                     <p className="text-xs text-primary-700 leading-relaxed">{results.status.advice}</p>
                  </div>
               </div>
             </>
           ) : (
             <div className="h-full bg-slate-50 border-2 border-dashed border-slate-200 rounded-[2.5rem] flex flex-col items-center justify-center p-12 text-center gap-4 opacity-50">
                <Activity className="w-12 h-12 text-slate-300" />
                <p className="text-sm font-bold text-slate-400">Adjust the sliders to see your health analysis</p>
             </div>
           )}
        </div>
      </div>
=======
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
>>>>>>> d366566fdaff0e02dbc3205770509d5194ddbac9
    </div>
  );
}
