"use client";

import { useState } from "react";
import { Clock, Copy, Check, Zap, Info, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

export default function CrontabGeneratorTool() {
  const [min, setMin] = useState("*");
  const [hour, setHour] = useState("*");
  const [day, setDay] = useState("*");
  const [month, setMonth] = useState("*");
  const [dayOfWeek, setDayOfWeek] = useState("*");
  const [command, setCommand] = useState("/path/to/script.sh");
  const [isCopied, setIsCopied] = useState(false);

  const cronString = `${min} ${hour} ${day} ${month} ${dayOfWeek} ${command}`;

  const copyResult = () => {
    navigator.clipboard.writeText(cronString);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const presets = [
    { label: "Every Minute", val: ["*", "*", "*", "*", "*"] },
    { label: "Every Hour", val: ["0", "*", "*", "*", "*"] },
    { label: "Every Day at Midnight", val: ["0", "0", "*", "*", "*"] },
    { label: "Every Sunday at Midnight", val: ["0", "0", "*", "*", "0"] },
    { label: "First of Every Month", val: ["0", "0", "1", "*", "*"] },
  ];

  const applyPreset = (p: string[]) => {
    setMin(p[0]); setHour(p[1]); setDay(p[2]); setMonth(p[3]); setDayOfWeek(p[4]);
  };

  return (
    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-8">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600">
          <Clock className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900">Crontab Generator</h3>
          <p className="text-sm text-slate-500">Easily create cron job schedules</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {[
          { label: "Minute", val: min, set: setMin, hint: "0-59" },
          { label: "Hour", val: hour, set: setHour, hint: "0-23" },
          { label: "Day", val: day, set: setDay, hint: "1-31" },
          { label: "Month", val: month, set: setMonth, hint: "1-12" },
          { label: "Day of Week", val: dayOfWeek, set: setDayOfWeek, hint: "0-6" },
        ].map((field, i) => (
          <div key={i} className="space-y-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">{field.label}</label>
            <input 
              type="text" 
              value={field.val} 
              onChange={(e) => field.set(e.target.value)}
              className="w-full bg-slate-50 border border-slate-100 rounded-xl p-3 font-mono text-center text-slate-700 focus:ring-2 focus:ring-primary-500/20"
            />
            <p className="text-[9px] text-slate-400 text-center">{field.hint}</p>
          </div>
        ))}
      </div>

      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Command to run</label>
        <input 
          type="text" 
          value={command} 
          onChange={(e) => setCommand(e.target.value)}
          className="w-full bg-slate-50 border border-slate-100 rounded-xl p-4 font-mono text-slate-700 focus:ring-2 focus:ring-primary-500/20"
        />
      </div>

      <div className="space-y-4">
        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Quick Presets</label>
        <div className="flex flex-wrap gap-2">
          {presets.map((p, i) => (
            <button 
              key={i} 
              onClick={() => applyPreset(p.val)}
              className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-lg text-xs font-bold text-slate-600 hover:bg-primary-50 hover:text-primary-600 transition-colors"
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-slate-900 rounded-2xl p-6 space-y-4 border border-slate-800">
        <div className="flex items-center justify-between">
           <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Generated Cron Expression</span>
           <button onClick={copyResult} className="text-primary-400 text-xs font-bold flex items-center gap-1">
             {isCopied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
             {isCopied ? "Copied" : "Copy"}
           </button>
        </div>
        <div className="font-mono text-lg text-blue-100 break-all">
          {cronString}
        </div>
      </div>
    </div>
  );
}
