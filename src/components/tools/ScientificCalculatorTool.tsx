"use client";

import { useState, useCallback, useMemo } from "react";
import { 
  Calculator, History, RotateCcw, Copy, Check, Delete, 
  Divide, X, Minus, Plus, Equal, Hash, Sparkles, 
  ChevronRight, Bookmark, Settings2, Trash2, Info
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const CONSTANTS = [
  { name: "PI", value: "Math.PI", label: "π", sub: "3.14159..." },
  { name: "Euler", value: "Math.E", label: "e", sub: "2.71828..." },
  { name: "Golden Ratio", value: "1.61803398875", label: "φ", sub: "1.61803..." },
  { name: "Speed of Light", value: "299792458", label: "c", sub: "299,792,458 m/s" },
  { name: "Gravity", value: "9.80665", label: "g", sub: "9.80665 m/s²" },
  { name: "Planck", value: "6.62607015e-34", label: "h", sub: "6.626e-34 J·s" },
];

export default function ScientificCalculatorTool() {
  const [display, setDisplay] = useState("0");
  const [equation, setEquation] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [isCopied, setIsCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"history" | "constants">("history");

  const handleNumber = (num: string) => {
    setDisplay(prev => (prev === "0" ? num : prev + num));
  };

  const handleOperator = (op: string) => {
    setEquation(display + " " + op + " ");
    setDisplay("0");
  };

  const calculate = useCallback(() => {
    try {
      const fullExpr = equation + display;
      if (!fullExpr || fullExpr === "0") return;

      const sanitized = fullExpr
        .replace(/×/g, "*")
        .replace(/÷/g, "/")
        .replace(/sin\(/g, "Math.sin(")
        .replace(/cos\(/g, "Math.cos(")
        .replace(/tan\(/g, "Math.tan(")
        .replace(/log\(/g, "Math.log10(")
        .replace(/ln\(/g, "Math.log(")
        .replace(/√\(/g, "Math.sqrt(")
        .replace(/π/g, "Math.PI")
        .replace(/e/g, "Math.E")
        .replace(/\^/g, "**");

      // eslint-disable-next-line no-eval
      const result = eval(sanitized);
      const formattedResult = Number.isInteger(result) ? result.toString() : result.toFixed(8).replace(/\.?0+$/, "");
      
      setHistory(prev => [fullExpr + " = " + formattedResult, ...prev].slice(0, 10));
      setDisplay(formattedResult);
      setEquation("");
    } catch (e) {
      setDisplay("Error");
    }
  }, [equation, display]);

  const clear = () => {
    setDisplay("0");
    setEquation("");
  };

  const backspace = () => {
    setDisplay(prev => prev.length > 1 ? prev.slice(0, -1) : "0");
  };

  const addFunction = (fn: string) => {
    setDisplay(prev => (prev === "0" ? fn + "(" : prev + fn + "("));
  };

  const copyResult = () => {
    navigator.clipboard.writeText(display);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const insertConstant = (val: string) => {
    // eslint-disable-next-line no-eval
    const value = eval(val).toString();
    setDisplay(value);
  };

  // Button Class Constants for absolute reliability
  const btnNum = "aspect-square h-16 md:h-20 flex items-center justify-center text-xl md:text-2xl font-black text-white bg-slate-700/80 rounded-2xl hover:bg-slate-600 hover:scale-[1.02] transition-all active:scale-95 border border-slate-600 shadow-sm";
  const btnOp = "aspect-square h-16 md:h-20 flex items-center justify-center text-xl md:text-2xl font-black text-white bg-primary-600 rounded-2xl hover:bg-primary-500 hover:scale-[1.02] transition-all active:scale-95 border border-primary-400 shadow-md";
  const btnSci = "aspect-square h-16 md:h-20 flex items-center justify-center text-[10px] md:text-xs font-bold text-slate-200 bg-slate-800 rounded-2xl hover:bg-slate-700 hover:scale-[1.02] transition-all active:scale-95 border border-slate-700 uppercase tracking-widest";
  const btnEqual = "h-auto flex items-center justify-center text-white bg-primary-600 rounded-2xl hover:bg-primary-500 hover:scale-[1.02] transition-all active:scale-95 shadow-xl border-b-4 border-primary-800";

  return (
    <div className="max-w-6xl mx-auto space-y-8 p-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
            <Sparkles className="w-6 h-6 text-primary-600" />
            <span>Scientific Calculator <span className="text-primary-600 text-[10px] bg-primary-50 px-2 py-1 rounded-lg">PRO</span></span>
          </h2>
          <p className="text-sm text-slate-500 font-medium">Advanced precision computing with premium UI.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Calculator */}
        <div className="lg:col-span-8 bg-[#1e293b] p-6 md:p-10 rounded-[3.5rem] shadow-2xl border border-slate-700 relative overflow-hidden group">
          <div className="relative z-10 space-y-6">
            {/* Display Area */}
            <div className="bg-[#0f172a] border border-slate-700 rounded-[2.5rem] p-6 md:p-10 text-right shadow-inner">
              <div className="h-6 text-slate-500 font-mono text-xs overflow-hidden truncate mb-2">
                {equation}
              </div>
              <div className="text-3xl md:text-5xl font-black text-white font-mono break-all tracking-tighter">
                {display}
              </div>
              <div className="flex justify-end gap-3 mt-4">
                 <button onClick={copyResult} className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-all">
                    {isCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                 </button>
                 <button onClick={clear} className="p-2 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-lg transition-all">
                    <RotateCcw className="w-4 h-4" />
                 </button>
              </div>
            </div>

            {/* Keypad */}
            <div className="grid grid-cols-5 gap-2 md:gap-3">
              <button onClick={() => addFunction("sin")} className={btnSci}>sin</button>
              <button onClick={() => addFunction("cos")} className={btnSci}>cos</button>
              <button onClick={() => addFunction("tan")} className={btnSci}>tan</button>
              <button onClick={() => handleNumber("π")} className={btnSci}>π</button>
              <button onClick={() => addFunction("√")} className={btnSci}>√</button>

              <button onClick={() => addFunction("log")} className={btnSci}>log</button>
              <button onClick={() => addFunction("ln")} className={btnSci}>ln</button>
              <button onClick={() => handleNumber("^")} className={btnSci}>^</button>
              <button onClick={() => handleNumber("(")} className={btnSci}>(</button>
              <button onClick={() => handleNumber(")")} className={btnSci}>)</button>

              <button onClick={clear} className={cn(btnOp, "!bg-rose-600 hover:!bg-rose-500")}>AC</button>
              <button onClick={backspace} className={cn(btnOp, "!bg-slate-700 hover:!bg-slate-600")}><Delete className="w-6 h-6 text-white" /></button>
              <button onClick={() => handleOperator("÷")} className={btnOp}>÷</button>
              <button onClick={() => handleOperator("×")} className={btnOp}>×</button>
              <button onClick={() => handleOperator("-")} className={btnOp}>-</button>

              <button onClick={() => handleNumber("7")} className={btnNum}>7</button>
              <button onClick={() => handleNumber("8")} className={btnNum}>8</button>
              <button onClick={() => handleNumber("9")} className={btnNum}>9</button>
              <button onClick={() => handleOperator("+")} className={btnOp}>+</button>
              <button onClick={calculate} className={cn(btnEqual, "row-span-4 flex")}><Equal className="w-10 h-10" /></button>

              <button onClick={() => handleNumber("4")} className={btnNum}>4</button>
              <button onClick={() => handleNumber("5")} className={btnNum}>5</button>
              <button onClick={() => handleNumber("6")} className={btnNum}>6</button>
              <button onClick={() => handleNumber(".")} className={btnNum}>.</button>

              <button onClick={() => handleNumber("1")} className={btnNum}>1</button>
              <button onClick={() => handleNumber("2")} className={btnNum}>2</button>
              <button onClick={() => handleNumber("3")} className={btnNum}>3</button>
              <button onClick={() => handleNumber("0")} className={btnNum}>0</button>

              <div className="col-span-4 bg-[#0f172a] rounded-2xl flex items-center px-6 border border-slate-700 h-16 md:h-20">
                 <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Engine v3.0 Powered</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4">
           <div className="bg-white border border-slate-200 rounded-[3rem] shadow-xl flex flex-col h-full overflow-hidden">
              <div className="flex bg-slate-50 border-b border-slate-100">
                 <button onClick={() => setActiveTab("history")} className={cn("flex-1 py-6 font-bold text-xs uppercase tracking-widest", activeTab === "history" ? "text-primary-600 bg-white" : "text-slate-400")}>History</button>
                 <button onClick={() => setActiveTab("constants")} className={cn("flex-1 py-6 font-bold text-xs uppercase tracking-widest", activeTab === "constants" ? "text-primary-600 bg-white" : "text-slate-400")}>Constants</button>
              </div>
              <div className="p-6 overflow-y-auto max-h-[500px]">
                 <AnimatePresence mode="wait">
                    {activeTab === "history" ? (
                      <motion.div key="history" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
                         {history.map((h, i) => (
                           <button key={i} onClick={() => setDisplay(h.split('=')[1].trim())} className="w-full p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-primary-200 text-left">
                              <p className="text-[10px] text-slate-400 font-mono">{h.split('=')[0]}</p>
                              <p className="text-lg font-black text-slate-800">{h.split('=')[1]}</p>
                           </button>
                         ))}
                      </motion.div>
                    ) : (
                      <motion.div key="constants" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
                         {CONSTANTS.map((c) => (
                           <button key={c.name} onClick={() => insertConstant(c.value)} className="w-full p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-primary-200 flex justify-between items-center group">
                              <div className="text-left">
                                 <p className="text-xs font-black text-slate-900">{c.name}</p>
                                 <p className="text-[10px] text-slate-400">{c.sub}</p>
                              </div>
                              <span className="w-8 h-8 bg-white rounded-lg flex items-center justify-center font-bold text-primary-600 border border-slate-100">{c.label}</span>
                           </button>
                         ))}
                      </motion.div>
                    )}
                 </AnimatePresence>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
