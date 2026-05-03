"use client";

<<<<<<< HEAD
import { useState, useMemo } from "react";
import { Scale, RefreshCw, ArrowRightLeft, Search, Copy, Check, Hash, Ruler, Thermometer, Box, Zap, Clock, Database, Waves, Sun, Activity, Fuel } from "lucide-react";
import { cn } from "@/lib/utils";

const CATEGORIES: any = {
  length: { icon: Ruler, label: "Length", color: "text-blue-500", units: { meters: 1, kilometers: 0.001, centimeters: 100, millimeters: 1000, inches: 39.3701, feet: 3.28084, yards: 1.09361, miles: 0.000621371 } },
  weight: { icon: Scale, label: "Weight", color: "text-emerald-500", units: { grams: 1, kilograms: 0.001, milligrams: 1000, pounds: 0.00220462, ounces: 0.035274 } },
  temperature: { icon: Thermometer, label: "Temp", color: "text-orange-500", units: { celsius: 1, fahrenheit: 1, kelvin: 1 } },
  area: { icon: Box, label: "Area", color: "text-purple-500", units: { square_meters: 1, square_kilometers: 0.000001, square_feet: 10.7639, acres: 0.000247105, hectares: 0.0001 } },
  digital: { icon: Database, label: "Digital", color: "text-indigo-500", units: { bytes: 1, kb: 1 / 1024, mb: 1 / (1024 ** 2), gb: 1 / (1024 ** 3), tb: 1 / (1024 ** 4) } },
  time: { icon: Clock, label: "Time", color: "text-rose-500", units: { seconds: 1, minutes: 1 / 60, hours: 1 / 3600, days: 1 / 86400, weeks: 1 / 604800 } },
  power: { icon: Zap, label: "Power", color: "text-amber-500", units: { watts: 1, kilowatts: 0.001, horsepower: 0.00134102, btu_per_hour: 3.41214 } },
  speed: { icon: Waves, label: "Speed", color: "text-cyan-500", units: { mps: 1, kmh: 3.6, mph: 2.23694, knot: 1.94384 } },
  pressure: { icon: Activity, label: "Pressure", color: "text-slate-500", units: { pascal: 1, bar: 1e-5, psi: 0.000145038, atmosphere: 9.8692e-6 } },
  fuel: { icon: Fuel, label: "Fuel", color: "text-red-500", units: { mpg_us: 1, mpg_uk: 1.20095, km_per_liter: 0.425144, liters_per_100km: 235.215 } }
=======
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
>>>>>>> d366566fdaff0e02dbc3205770509d5194ddbac9
};

interface UnitConverterToolProps {
  initialCategory?: string;
}

export default function UnitConverterTool({ initialCategory = "length" }: UnitConverterToolProps) {
  const [category, setCategory] = useState<string>(initialCategory);
<<<<<<< HEAD
  const [value, setValue] = useState<string>("1");
  const [fromUnit, setFromUnit] = useState<string>(Object.keys(CATEGORIES[initialCategory].units)[0]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const results = useMemo(() => {
    const val = parseFloat(value);
    if (isNaN(val)) return [];

    if (category === "temperature") {
      let c = val;
      if (fromUnit === "fahrenheit") c = (val - 32) * 5 / 9;
      if (fromUnit === "kelvin") c = val - 273.15;

      return [
        { unit: "celsius", value: c },
        { unit: "fahrenheit", value: (c * 9 / 5) + 32 },
        { unit: "kelvin", value: c + 273.15 },
      ];
    }

    const { units } = CATEGORIES[category];
    const baseValue = val / units[fromUnit];
    return Object.entries(units).map(([unit, factor]) => ({
      unit,
      value: baseValue * (factor as number)
    }));
  }, [value, fromUnit, category]);

  const filteredResults = results.filter(r => r.unit.toLowerCase().includes(searchQuery.toLowerCase()));

  const copyToClipboard = (val: number, unit: string) => {
    navigator.clipboard.writeText(val.toString());
    setCopiedId(unit);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Sidebar Categories */}
      <div className="lg:col-span-1 space-y-4">
         <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6 px-2">Categories</p>
            <div className="space-y-2">
               {Object.entries(CATEGORIES).map(([id, cat]: [string, any]) => (
                 <button
                   key={id}
                   onClick={() => { setCategory(id); setFromUnit(Object.keys(cat.units)[0]); }}
                   className={cn(
                     "w-full flex items-center gap-3 p-3 rounded-2xl transition-all group",
                     category === id ? "bg-primary-600 text-white shadow-lg shadow-primary-200" : "hover:bg-slate-50 text-slate-600"
                   )}
                 >
                   <cat.icon className={cn("w-5 h-5", category === id ? "text-white" : cat.color)} />
                   <span className="font-bold text-sm">{cat.label}</span>
                 </button>
               ))}
            </div>
         </div>
      </div>

      {/* Main Converter */}
      <div className="lg:col-span-3 space-y-8">
        <div className="bg-white p-8 md:p-10 rounded-[3rem] border border-slate-200 shadow-sm space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
             <div className="space-y-4">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] pl-1">Input Amount</label>
                <div className="relative group">
                   <input
                     type="number"
                     value={value}
                     onChange={(e) => setValue(e.target.value)}
                     className="w-full bg-slate-50 border-2 border-slate-100 rounded-3xl px-8 py-6 font-black text-4xl text-slate-900 focus:border-primary-500 focus:ring-4 ring-primary-50 outline-none transition-all shadow-inner"
                     placeholder="1.0"
                   />
                   <div className="absolute right-6 top-1/2 -translate-y-1/2 flex gap-2">
                      <RefreshCw onClick={() => setValue("1")} className="w-5 h-5 text-slate-300 hover:text-primary-500 cursor-pointer transition-colors" />
                   </div>
                </div>
             </div>

             <div className="space-y-4">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] pl-1">From Unit</label>
                <div className="relative">
                   <select
                     value={fromUnit}
                     onChange={(e) => setFromUnit(e.target.value)}
                     className="w-full bg-slate-100 border-none rounded-3xl px-8 py-6 font-black text-xl text-slate-700 focus:ring-4 ring-primary-50 outline-none appearance-none cursor-pointer"
                   >
                     {Object.keys(CATEGORIES[category].units).map(unit => (
                       <option key={unit} value={unit}>{unit.replace("_", " ")}</option>
                     ))}
                   </select>
                   <ArrowRightLeft className="absolute right-8 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                </div>
             </div>
          </div>

          <div className="pt-10 border-t border-slate-100 space-y-6">
             <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                   <Hash className="w-5 h-5 text-primary-600" />
                   <h4 className="font-black text-slate-900 uppercase tracking-widest text-sm">Conversion Grid</h4>
                </div>
                <div className="relative max-w-xs w-full">
                   <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                   <input 
                     type="text" 
                     placeholder="Search units..." 
                     value={searchQuery}
                     onChange={(e) => setSearchQuery(e.target.value)}
                     className="w-full bg-slate-50 border border-slate-100 rounded-full pl-10 pr-4 py-2 text-xs font-bold outline-none focus:ring-2 ring-primary-100 transition-all"
                   />
                </div>
             </div>

             <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
               {filteredResults.map((conv) => (
                 <div 
                   key={conv.unit} 
                   onClick={() => copyToClipboard(conv.value, conv.unit)}
                   className="group p-6 bg-slate-50 border border-slate-100 rounded-[2rem] space-y-2 hover:bg-white hover:border-primary-200 hover:shadow-xl hover:shadow-primary-100/20 transition-all cursor-pointer relative overflow-hidden"
                 >
                    <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                       {copiedId === conv.unit ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-slate-300" />}
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">{conv.unit.replace("_", " ")}</span>
                    <div className="text-2xl font-black text-slate-900 break-all leading-tight group-hover:text-primary-600 transition-colors">
                      {conv.value < 0.0001 && conv.value !== 0 ? conv.value.toExponential(4) : conv.value.toLocaleString(undefined, { maximumFractionDigits: 6 })}
                    </div>
                 </div>
               ))}
             </div>
          </div>
        </div>

        <div className="bg-primary-50 p-8 rounded-[2.5rem] border border-primary-100 flex flex-col md:flex-row items-center gap-8 justify-between">
           <div className="flex gap-4 items-center">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-primary-600 shadow-sm">
                 <Zap className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                 <p className="font-black text-primary-900 uppercase tracking-wider">Expert Tip</p>
                 <p className="text-xs text-primary-700 max-w-md">Click any result card to copy the value to your clipboard. Use the search bar to find specific units quickly.</p>
              </div>
           </div>
           <div className="flex items-center gap-4 text-[10px] font-bold text-primary-400 uppercase tracking-widest whitespace-nowrap">
              <span>Verified Accuracy</span>
              <div className="w-1.5 h-1.5 bg-primary-400 rounded-full" />
              <span>Universal Standards</span>
           </div>
=======
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
>>>>>>> d366566fdaff0e02dbc3205770509d5194ddbac9
        </div>
      </div>
    </div>
  );
}
