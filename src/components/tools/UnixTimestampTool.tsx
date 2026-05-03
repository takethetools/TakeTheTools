"use client";

import { useState, useEffect } from "react";
import { Clock, Zap, RefreshCw, Copy, Check, ArrowRightLeft } from "lucide-react";

export default function UnixTimestampTool() {
  const [currentTimestamp, setCurrentTimestamp] = useState(Math.floor(Date.now() / 1000));
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTimestamp(Math.floor(Date.now() / 1000));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const convertToDate = () => {
    const ts = parseInt(input);
    if (!isNaN(ts)) {
      const date = new Date(ts * 1000);
      setOutput(date.toUTCString());
    } else {
      setOutput("Invalid Timestamp");
    }
  };

  const convertToTimestamp = () => {
    const date = new Date(input);
    if (!isNaN(date.getTime())) {
      setOutput(Math.floor(date.getTime() / 1000).toString());
    } else {
      setOutput("Invalid Date");
    }
  };

  const copyCurrent = () => {
    navigator.clipboard.writeText(currentTimestamp.toString());
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-8">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600">
          <Clock className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900">Unix Timestamp Converter</h3>
          <p className="text-sm text-slate-500">Convert between Unix time and human-readable dates</p>
        </div>
      </div>

      <div className="p-8 bg-slate-900 rounded-3xl text-center relative overflow-hidden group">
         <div className="absolute top-0 right-0 p-4">
            <button onClick={copyCurrent} className="text-slate-500 hover:text-white transition-colors">
               {isCopied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
            </button>
         </div>
         <span className="text-xs font-bold text-slate-500 uppercase tracking-widest font-mono">Current Unix Timestamp</span>
         <div className="text-5xl font-black text-blue-100 mt-2 font-mono tabular-nums">{currentTimestamp}</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         <div className="space-y-4">
            <div className="space-y-2">
               <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-2">Timestamp to Date</label>
               <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={input} 
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="1700000000"
                    className="flex-grow p-4 bg-slate-50 border border-slate-100 rounded-2xl font-mono"
                  />
                  <button onClick={convertToDate} className="p-4 bg-primary-600 text-white rounded-2xl">
                     <Zap className="w-5 h-5" />
                  </button>
               </div>
            </div>
         </div>

         <div className="space-y-4">
            <div className="space-y-2">
               <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-2">Date to Timestamp</label>
               <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={input} 
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="2024-01-01"
                    className="flex-grow p-4 bg-slate-50 border border-slate-100 rounded-2xl font-mono"
                  />
                  <button onClick={convertToTimestamp} className="p-4 bg-primary-600 text-white rounded-2xl">
                     <Zap className="w-5 h-5" />
                  </button>
               </div>
            </div>
         </div>
      </div>

      {output && (
        <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 text-center">
           <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Result</span>
           <p className="text-xl font-bold text-slate-700 mt-1 font-mono">{output}</p>
        </div>
      )}
    </div>
  );
}
