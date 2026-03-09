"use client";

import { useState, useEffect } from "react";
import { Scale, RefreshCw, ArrowRightLeft } from "lucide-react";
import { cn } from "@/lib/utils";

const UNITS = {
  length: {
    meters: 1,
    kilometers: 0.001,
    centimeters: 100,
    millimeters: 1000,
    inches: 39.3701,
    feet: 3.28084,
    yards: 1.09361,
    miles: 0.000621371,
  },
  weight: {
    grams: 1,
    kilograms: 0.001,
    milligrams: 1000,
    pounds: 0.00220462,
    ounces: 0.035274,
  },
  temperature: {
    celsius: (v: number) => v,
    fahrenheit: (v: number) => (v * 9/5) + 32,
    kelvin: (v: number) => v + 273.15,
  }
};

export default function UnitConverterTool() {
  const [category, setCategory] = useState<keyof typeof UNITS>("length");
  const [value, setValue] = useState<number>(1);
  const [fromUnit, setFromUnit] = useState<string>("meters");
  const [conversions, setConversions] = useState<{ unit: string; value: number }[]>([]);

  useEffect(() => {
    const convert = () => {
      if (category === "temperature") {
        const val = Number(value);
        let c = val;
        if (fromUnit === "fahrenheit") c = (val - 32) * 5/9;
        if (fromUnit === "kelvin") c = val - 273.15;
        
        return [
          { unit: "celsius", value: c },
          { unit: "fahrenheit", value: (c * 9/5) + 32 },
          { unit: "kelvin", value: c + 273.15 },
        ];
      }

      const units = UNITS[category] as any;
      const baseValue = value / units[fromUnit];
      return Object.entries(units).map(([unit, factor]) => ({
        unit,
        value: baseValue * (factor as number)
      }));
    };

    setConversions(convert());
  }, [value, fromUnit, category]);

  useEffect(() => {
    setFromUnit(Object.keys(UNITS[category])[0]);
  }, [category]);

  return (
    <div className="space-y-6">
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-8">
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
          <div className="flex items-center gap-3">
            <Scale className="w-6 h-6 text-primary-600" />
            <h3 className="text-xl font-bold text-slate-900">Unit Converter</h3>
          </div>
          
          <div className="flex bg-slate-100 p-1 rounded-xl">
            {(Object.keys(UNITS) as (keyof typeof UNITS)[]).map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={cn(
                  "px-6 py-2 rounded-lg text-sm font-bold capitalize transition-all",
                  category === cat ? "bg-white text-primary-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-2">Amount</label>
            <input 
              type="number"
              value={value}
              onChange={(e) => setValue(Number(e.target.value))}
              className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 font-bold text-xl text-primary-600 focus:ring-2 focus:ring-primary-500 outline-none transition-all"
            />
          </div>
          <div className="space-y-2">
             <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-2">From Unit</label>
             <select 
               value={fromUnit}
               onChange={(e) => setFromUnit(e.target.value)}
               className="w-full bg-slate-100 border-none rounded-2xl px-6 py-4 font-bold text-slate-700 focus:ring-2 focus:ring-primary-500 outline-none appearance-none cursor-pointer"
             >
               {Object.keys(UNITS[category]).map(unit => (
                 <option key={unit} value={unit}>{unit}</option>
               ))}
             </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          {conversions.map((conv) => (
            <div key={conv.unit} className="p-6 bg-slate-50 border border-slate-100 rounded-2xl space-y-1 hover:border-primary-200 transition-colors">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{conv.unit}</span>
              <div className="text-2xl font-mono font-bold text-slate-900 break-all leading-tight">
                {conv.value.toLocaleString(undefined, { maximumFractionDigits: 4 })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
