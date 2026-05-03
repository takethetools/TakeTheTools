"use client";

import { useState, useMemo } from "react";
import { Calendar, Zap, Clock, Star, Gift, Timer, Milestone } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AgeCalculatorTool() {
  const [birthDateTime, setBirthDateTime] = useState("");

  const stats = useMemo(() => {
    if (!birthDateTime) return null;
    const birth = new Date(birthDateTime);
    const today = new Date();
    
    // Exact Age
    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();
    let hours = today.getHours() - birth.getHours();
    let minutes = today.getMinutes() - birth.getMinutes();
    let seconds = today.getSeconds() - birth.getSeconds();

    if (seconds < 0) {
      minutes--;
      seconds += 60;
    }
    if (minutes < 0) {
      hours--;
      minutes += 60;
    }
    if (hours < 0) {
      days--;
      hours += 24;
    }
    if (days < 0) {
      months--;
      const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += lastMonth.getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    // Next Birthday
    const nextBday = new Date(today.getFullYear(), birth.getMonth(), birth.getDate(), birth.getHours(), birth.getMinutes());
    if (nextBday < today) nextBday.setFullYear(today.getFullYear() + 1);
    const diffTime = Math.abs(nextBday.getTime() - today.getTime());
    const daysToBday = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // Total Stats
    const totalMs = today.getTime() - birth.getTime();
    const totalDays = Math.floor(totalMs / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalHours = Math.floor(totalMs / (1000 * 60 * 60));
    const totalMinutes = Math.floor(totalMs / (1000 * 60));
    const totalSeconds = Math.floor(totalMs / 1000);

    // Zodiac
    const getZodiac = (d: number, m: number) => {
      const s = ["Capricorn", "Aquarius", "Pisces", "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius"];
      const last_day = [19, 18, 20, 19, 20, 20, 22, 22, 22, 22, 21, 21];
      return d > last_day[m] ? s[m + 1 > 11 ? 0 : m + 1] : s[m];
    };
    const zodiac = getZodiac(birth.getDate(), birth.getMonth());

    return { years, months, days, hours, minutes, seconds, daysToBday, totalDays, totalWeeks, totalHours, totalMinutes, totalSeconds, zodiac };
  }, [birthDateTime]);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Input Section */}
      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary-100 rounded-2xl flex items-center justify-center text-primary-600">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">Life Timeline</h3>
              <p className="text-sm text-slate-500">Enter your date and time of birth</p>
            </div>
          </div>
          <div className="flex-grow max-w-sm">
             <input 
               type="datetime-local" 
               value={birthDateTime} 
               onChange={(e) => setBirthDateTime(e.target.value)}
               className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl text-lg font-bold text-slate-700 focus:ring-4 ring-primary-50 transition-all outline-none"
             />
          </div>
        </div>
      </div>

      {stats ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
           {/* Main Age Card */}
           <div className="md:col-span-2 bg-slate-900 p-8 rounded-[3rem] text-white relative overflow-hidden group shadow-2xl">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary-500/20 blur-3xl rounded-full" />
              <div className="relative z-10 space-y-8">
                 <div className="flex items-center gap-2 text-primary-400">
                    <Timer className="w-4 h-4" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Exact Age (High Precision)</span>
                 </div>
                 <div className="flex flex-wrap items-end gap-6">
                    <div className="space-y-1">
                       <p className="text-7xl font-black">{stats.years}</p>
                       <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Years</p>
                    </div>
                    <div className="space-y-1">
                       <p className="text-4xl font-black text-slate-300">{stats.months}</p>
                       <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Months</p>
                    </div>
                    <div className="space-y-1">
                       <p className="text-4xl font-black text-slate-300">{stats.days}</p>
                       <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Days</p>
                    </div>
                 </div>

                 {/* Hours/Minutes/Seconds sub-row */}
                 <div className="flex gap-8 text-primary-400 font-mono">
                    <div className="flex flex-col">
                       <span className="text-2xl font-bold">{stats.hours.toString().padStart(2, '0')}</span>
                       <span className="text-[9px] uppercase tracking-tighter text-slate-600">Hours</span>
                    </div>
                    <div className="flex flex-col">
                       <span className="text-2xl font-bold">{stats.minutes.toString().padStart(2, '0')}</span>
                       <span className="text-[9px] uppercase tracking-tighter text-slate-600">Minutes</span>
                    </div>
                    <div className="flex flex-col">
                       <span className="text-2xl font-bold">{stats.seconds.toString().padStart(2, '0')}</span>
                       <span className="text-[9px] uppercase tracking-tighter text-slate-600">Seconds</span>
                    </div>
                 </div>
                 
                 <div className="pt-8 border-t border-slate-800 grid grid-cols-2 gap-8">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center text-primary-400">
                          <Gift className="w-5 h-5" />
                       </div>
                       <div>
                          <p className="text-[10px] font-bold text-slate-500 uppercase">Next Birthday</p>
                          <p className="font-bold">{stats.daysToBday} Days Left</p>
                       </div>
                    </div>
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center text-amber-400">
                          <Star className="w-5 h-5" />
                       </div>
                       <div>
                          <p className="text-[10px] font-bold text-slate-500 uppercase">Zodiac Sign</p>
                          <p className="font-bold">{stats.zodiac}</p>
                       </div>
                    </div>
                 </div>
              </div>
           </div>

           {/* Total Stats Column */}
           <div className="space-y-4">
              {[
                { label: "Total Weeks", value: stats.totalWeeks, icon: Milestone, color: "text-blue-500" },
                { label: "Total Days", value: stats.totalDays, icon: Clock, color: "text-emerald-500" },
                { label: "Total Minutes", value: stats.totalMinutes, icon: Zap, color: "text-amber-500" },
              ].map((s, i) => (
                <div key={i} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-4 hover:border-primary-200 transition-colors">
                   <div className={cn("w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center", s.color)}>
                      <s.icon className="w-6 h-6" />
                   </div>
                   <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{s.label}</p>
                      <p className="text-xl font-black text-slate-900">{s.value.toLocaleString()}</p>
                   </div>
                </div>
              ))}
           </div>

           {/* Full Width Seconds Card */}
           <div className="md:col-span-3 bg-primary-600 p-8 rounded-[2.5rem] flex items-center justify-between text-white shadow-xl shadow-primary-500/20">
              <div className="space-y-1">
                 <p className="text-[10px] font-bold text-primary-200 uppercase tracking-[0.3em]">Total Seconds Lived</p>
                 <p className="text-4xl md:text-5xl font-black font-mono tracking-tighter">{stats.totalSeconds.toLocaleString()}</p>
              </div>
              <div className="hidden md:block">
                 <Timer className="w-16 h-16 opacity-20" />
              </div>
           </div>
        </div>
      ) : (
        <div className="h-64 border-2 border-dashed border-slate-100 rounded-[3rem] flex flex-col items-center justify-center text-slate-300 gap-4">
           <Calendar className="w-12 h-12 opacity-20" />
           <p className="text-sm font-bold uppercase tracking-widest opacity-30">Select your birth date & time to begin</p>
        </div>
      )}
    </div>
  );
}

