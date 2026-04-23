"use client";

import { useState } from "react";
import { Twitter, Copy, Check, Info, Zap } from "lucide-react";

export default function TwitterCharacterCounterTool() {
  const [input, setInput] = useState("");
  const limit = 280;
  
  const count = input.length;
  const remaining = limit - count;
  const isOver = remaining < 0;

  return (
    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-8">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-500">
          <Twitter className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900">Twitter Character Counter</h3>
          <p className="text-sm text-slate-500">Check if your tweet fits the 280 character limit</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between px-2">
           <div className="flex gap-4">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Logged</span>
                <span className={`text-2xl font-bold ${isOver ? "text-red-500" : "text-slate-900"}`}>{count}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Remaining</span>
                <span className={`text-2xl font-bold ${isOver ? "text-red-500" : "text-slate-900"}`}>{remaining}</span>
              </div>
           </div>
           
           <div className="w-20 h-20 relative flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="40"
                  cy="40"
                  r="34"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  className="text-slate-100"
                />
                <circle
                  cx="40"
                  cy="40"
                  r="34"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  strokeDasharray={213.6}
                  strokeDashoffset={213.6 - (Math.min(count, limit) / limit) * 213.6}
                  className={`${isOver ? "text-red-500" : "text-blue-500"} transition-all duration-300`}
                />
              </svg>
           </div>
        </div>

        <textarea 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className={`w-full h-48 p-8 border-2 rounded-3xl text-lg font-medium resize-none focus:outline-none transition-colors bg-slate-50/50 ${
            isOver ? "border-red-100 focus:border-red-200" : "border-slate-100 focus:border-blue-200"
          }`}
          placeholder="What's happening?"
        />
        
        {isOver && (
          <div className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600">
             <Info className="w-5 h-5" />
             <p className="text-sm font-bold">Your tweet is {Math.abs(remaining)} characters too long!</p>
          </div>
        )}
      </div>
    </div>
  );
}
