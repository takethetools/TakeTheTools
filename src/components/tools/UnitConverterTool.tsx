"use client";

import { useState, useEffect } from "react";
import { Scale, RefreshCw, ArrowRightLeft } from "lucide-react";
import { cn } from "@/lib/utils";

const UNITS: any = {
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
    celsius: 1,
    fahrenheit: 1,
    kelvin: 1,
  },
  area: {
    square_meters: 1,
    square_kilometers: 0.000001,
    square_feet: 10.7639,
    acres: 0.000247105,
    hectares: 0.0001,
  },
  volume: {
    liters: 1,
    milliliters: 1000,
    gallons: 0.264172,
    cubic_meters: 0.001,
  },
  speed: {
    mps: 1,
    kmh: 3.6,
    mph: 2.23694,
    knot: 1.94384,
  },
  digital: {
    bytes: 1,
    kb: 1 / 1024,
    mb: 1 / (1024 ** 2),
    gb: 1 / (1024 ** 3),
    tb: 1 / (1024 ** 4),
  },
  time: {
    seconds: 1,
    minutes: 1 / 60,
    hours: 1 / 3600,
    days: 1 / 86400,
  },
  angle: {
    degrees: 1,
    radians: Math.PI / 180,
    gradians: 1.11111,
  },
  pressure: {
    pascal: 1,
    bar: 1e-5,
    psi: 0.000145038,
    atmosphere: 9.8692e-6,
  },
  power: {
    watts: 1,
    kilowatts: 0.001,
    horsepower: 0.00134102,
    btu_per_hour: 3.41214,
  },
  fuel_consumption: {
    mpg_us: 1,
    mpg_uk: 1.20095,
    km_per_liter: 0.425144,
    liters_per_100km: 235.215,
  },
  torque: {
    newton_meters: 1,
    pound_feet: 0.737562,
    kg_meters: 0.101972,
  },
  data_rate: {
    bps: 1,
    kbps: 1 / 1000,
    mbps: 1 / 1e6,
    gbps: 1 / 1e9,
    tbps: 1 / 1e12,
  },
  frequency: {
    hertz: 1,
    kilohertz: 0.001,
    megahertz: 1e-6,
    gigahertz: 1e-9,
  },
  illuminance: {
    lux: 1,
    foot_candle: 0.092903,
    lumen_per_sq_meter: 1,
  },
  radiation: {
    gray: 1,
    sievert: 1,
    rad: 100,
    rem: 100,
  }
};

interface UnitConverterToolProps {
  initialCategory?: string;
}

export default function UnitConverterTool({ initialCategory = "length" }: UnitConverterToolProps) {
  const [category, setCategory] = useState<string>(initialCategory);
  const [value, setValue] = useState<number>(1);
  const [fromUnit, setFromUnit] = useState<string>("meters");
  const [conversions, setConversions] = useState<{ unit: string; value: number }[]>([]);

  useEffect(() => {
    const convert = () => {
      if (category === "temperature") {
        const val = Number(value);
        let c = val;
        if (fromUnit === "fahrenheit") c = (val - 32) * 5 / 9;
        if (fromUnit === "kelvin") c = val - 273.15;

        return [
          { unit: "celsius", value: c },
          { unit: "fahrenheit", value: (c * 9 / 5) + 32 },
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

          <div className="flex bg-slate-100 p-1 rounded-xl flex-wrap gap-1">
            {(Object.keys(UNITS) as string[]).map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={cn(
                  "px-4 py-2 rounded-lg text-xs font-bold capitalize transition-all",
                  category === cat ? "bg-white text-primary-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
                )}
              >
                {cat.replace("_", " ")}
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
