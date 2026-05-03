"use client";

import { useState, useCallback, useEffect, useMemo, useRef } from "react";
import { 
  Copy, Check, RefreshCw, ShieldCheck, Download, Zap, Brain, 
  Lock, Unlock, Key, History, Trash2, Eye, EyeOff, Settings2,
  ChevronRight, Sparkles, ShieldAlert, Clock
} from "lucide-react";
import confetti from "canvas-confetti";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const WORDS = ["alpha", "bravo", "charlie", "delta", "echo", "foxtrot", "golf", "hotel", "india", "juliet", "kilo", "lima", "mike", "november", "oscar", "papa", "quebec", "romeo", "sierra", "tango", "uniform", "victor", "whiskey", "xray", "yankee", "zulu", "apple", "banana", "cherry", "dragon", "eagle", "forest", "galaxy", "honey", "island", "jungle", "knight", "lemon", "mountain", "ocean", "planet", "river", "silver", "tiger", "valley", "winter", "magic", "wonder", "shadow", "light", "storm", "bridge", "pillar", "crown", "pearl", "quest"];

export default function PasswordGeneratorTool() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(16);
  const [mode, setMode] = useState<"random" | "passphrase">("random");
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
    excludeSimilar: false,
    excludeAmbiguous: false,
  });
  const [isCopied, setIsCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [isVisible, setIsVisible] = useState(true);

  // Load history from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("ttt_pwd_history");
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load history");
      }
    }
  }, []);

  const saveToHistory = useCallback((pwd: string) => {
    setHistory(prev => {
      const newHistory = [pwd, ...prev.filter(p => p !== pwd)].slice(0, 10);
      localStorage.setItem("ttt_pwd_history", JSON.stringify(newHistory));
      return newHistory;
    });
  }, []);

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("ttt_pwd_history");
  };

  const stats = useMemo(() => {
    if (!password) return { entropy: 0, time: "N/A", score: 0 };
    
    let poolSize = 0;
    if (mode === "random") {
      if (options.uppercase) poolSize += 26;
      if (options.lowercase) poolSize += 26;
      if (options.numbers) poolSize += 10;
      if (options.symbols) poolSize += 32;
      if (options.excludeSimilar) poolSize -= 8;
      if (options.excludeAmbiguous) poolSize -= 14;
    } else {
      poolSize = WORDS.length;
    }
    
    if (poolSize <= 0) return { entropy: 0, time: "N/A", score: 0 };
    
    const count = mode === "random" ? password.length : password.split("-").length;
    const entropy = Math.floor(Math.log2(Math.pow(poolSize, count)));
    
    let time = "Seconds";
    let score = 1;
    if (entropy > 120) { time = "Centuries"; score = 4; }
    else if (entropy > 100) { time = "Decades"; score = 4; }
    else if (entropy > 80) { time = "Years"; score = 3; }
    else if (entropy > 60) { time = "Months"; score = 3; }
    else if (entropy > 40) { time = "Days"; score = 2; }
    else if (entropy > 20) { time = "Hours"; score = 1; }

    return { entropy, time, score };
  }, [password, options, mode]);

  const generatePassword = useCallback(() => {
    let result = "";
    if (mode === "passphrase") {
      result = Array.from({ length: Math.min(Math.max(Math.floor(length / 4), 3), 8) }, 
        () => WORDS[Math.floor(Math.random() * WORDS.length)]).join("-");
    } else {
      const charset = {
        uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        lowercase: "abcdefghijklmnopqrstuvwxyz",
        numbers: "0123456789",
        symbols: "!@#$%^&*()_+~`|}{[]:;?><,./-=",
      };

      let similar = "il1Lo0O";
      let ambiguous = "{}[]()\/\\'\"~,;.<>";

      let characters = "";
      if (options.uppercase) characters += charset.uppercase;
      if (options.lowercase) characters += charset.lowercase;
      if (options.numbers) characters += charset.numbers;
      if (options.symbols) characters += charset.symbols;

      if (options.excludeSimilar) {
        characters = characters.split("").filter(c => !similar.includes(c)).join("");
      }
      if (options.excludeAmbiguous) {
        characters = characters.split("").filter(c => !ambiguous.includes(c)).join("");
      }

      if (!characters) {
        setPassword("Select Options");
        return;
      }

      for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
      }
    }
    setPassword(result);
  }, [length, options, mode]);

  useEffect(() => {
    generatePassword();
  }, [generatePassword]);

  const copyToClipboard = (val: string = password) => {
    navigator.clipboard.writeText(val);
    setIsCopied(true);
    saveToHistory(val);
    confetti({ 
      particleCount: 100, 
      spread: 70, 
      origin: { y: 0.6 },
      colors: ["#3b82f6", "#2dd4bf", "#8b5cf6"]
    });
    setTimeout(() => setIsCopied(false), 2000);
  };

  const getStrengthLevel = () => {
    const s = stats.score;
    if (s === 4) return { text: "Military Grade", color: "text-emerald-500", bg: "bg-emerald-500", icon: ShieldCheck };
    if (s === 3) return { text: "Strong", color: "text-blue-500", bg: "bg-blue-500", icon: Lock };
    if (s === 2) return { text: "Good", color: "text-amber-500", bg: "bg-amber-500", icon: ShieldAlert };
    return { text: "Weak", color: "text-rose-500", bg: "bg-rose-500", icon: Unlock };
  };

  const strength = getStrengthLevel();

  return (
    <div className="max-w-6xl mx-auto space-y-8 relative">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Main Interface */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Header & Modes */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-1">
              <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
                <Sparkles className="w-6 h-6 text-primary-600 shrink-0" />
                <span className="flex items-center gap-2">
                  Password Generator
                  <span className="text-primary-600 uppercase text-[9px] bg-primary-50 px-2 py-1 rounded-lg tracking-widest font-black border border-primary-100/50 leading-none">Pro</span>
                </span>
              </h2>
              <p className="text-sm text-slate-500 font-medium">Generate studio-grade secure passwords instantly.</p>
            </div>

            <div className="flex bg-slate-100/80 backdrop-blur-sm p-1 rounded-2xl shadow-inner border border-slate-200">
              {[
                { id: "random", label: "Random", icon: Key },
                { id: "passphrase", label: "Passphrase", icon: Brain },
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => setMode(m.id as any)}
                  className={cn(
                    "flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300",
                    mode === m.id 
                      ? "bg-white text-primary-600 shadow-md transform scale-[1.02]" 
                      : "text-slate-500 hover:text-slate-700 hover:bg-white/50"
                  )}
                >
                  <m.icon className="w-4 h-4" /> {m.label}
                </button>
              ))}
            </div>
          </div>

          {/* Result Display */}
          <motion.div 
            layout
            className="relative group"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-primary-500 to-teal-500 opacity-10 blur-2xl group-hover:opacity-15 transition-all rounded-[3.5rem]" />
            <div className="relative bg-white border border-slate-200 p-8 md:p-12 rounded-[2.5rem] shadow-xl flex flex-col gap-8">
              
              <div className="relative">
                <div className={cn(
                  "font-mono text-xl md:text-2xl lg:text-4xl font-black text-slate-900 break-all text-center select-all tracking-tight bg-slate-50 p-8 rounded-[2rem] min-h-[140px] max-h-[200px] overflow-y-auto flex items-center justify-center border border-slate-100 shadow-inner transition-all scrollbar-thin scrollbar-thumb-slate-200",
                  !isVisible && "blur-md select-none opacity-50"
                )}>
                  {password}
                </div>
                
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                   <button 
                     onClick={() => setIsVisible(!isVisible)}
                     className="p-2 bg-white/80 backdrop-blur shadow-sm border border-slate-200 rounded-xl text-slate-400 hover:text-primary-600 transition-colors"
                   >
                     {isVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                   </button>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <button
                  onClick={generatePassword}
                  className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-black transition-all flex items-center gap-2 shadow-lg active:scale-95 group"
                >
                  <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" /> 
                  Regenerate
                </button>
                <button
                  onClick={() => copyToClipboard()}
                  className={cn(
                    "px-10 py-4 rounded-2xl font-bold transition-all shadow-xl flex items-center gap-2 active:scale-95",
                    isCopied ? "bg-emerald-600 text-white" : "bg-primary-600 text-white hover:bg-primary-700"
                  )}
                >
                  {isCopied ? <Check className="w-5 h-5 animate-in zoom-in duration-300" /> : <Copy className="w-5 h-5" />}
                  {isCopied ? "Copied!" : "Secure Copy"}
                </button>
                <button
                  onClick={() => setShowHistory(!showHistory)}
                  className="p-4 bg-slate-100 text-slate-600 rounded-2xl hover:bg-slate-200 transition-all active:scale-95 border border-slate-200"
                  title="View History"
                >
                  <History className="w-6 h-6" />
                </button>
              </div>

              {/* Real-time Strength Meter */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                 <div className="flex justify-between items-center px-1">
                    <div className="flex items-center gap-2">
                       <strength.icon className={cn("w-5 h-5", strength.color)} />
                       <span className={cn("text-xs font-black uppercase tracking-widest", strength.color)}>
                         {strength.text}
                       </span>
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                       {stats.entropy} Bits of Entropy
                    </span>
                 </div>
                 <div className="h-3 bg-slate-100 rounded-full overflow-hidden flex gap-1 p-0.5">
                    {[1, 2, 3, 4].map((step) => (
                      <motion.div 
                        key={step}
                        initial={false}
                        animate={{ 
                          backgroundColor: step <= stats.score ? getStrengthColor(stats.score) : "#e2e8f0"
                        }}
                        className="flex-1 rounded-full transition-colors duration-500"
                      />
                    ))}
                 </div>
              </div>
            </div>
          </motion.div>

          {/* Settings Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white border border-slate-200 p-8 rounded-[2.5rem] shadow-sm space-y-6">
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Length</label>
                  <p className="text-2xl font-black text-slate-900">{length} {mode === "passphrase" ? "Words" : "Chars"}</p>
                </div>
                <div className="w-16 h-16 bg-primary-50 rounded-2xl flex items-center justify-center text-primary-600 text-xl font-black">
                   {length}
                </div>
              </div>
              <input
                type="range"
                min={mode === "passphrase" ? "3" : "8"}
                max={mode === "passphrase" ? "12" : "128"}
                value={length}
                onChange={(e) => setLength(parseInt(e.target.value))}
                className="w-full h-3 bg-slate-100 rounded-full appearance-none cursor-pointer accent-primary-600"
              />
              <div className="flex justify-between text-[10px] font-bold text-slate-400">
                 <span>Min</span>
                 <span>Max</span>
              </div>
            </div>

            <div className="bg-white border border-slate-200 p-8 rounded-[2.5rem] shadow-sm flex flex-col justify-between">
               <div className="flex items-center gap-4 mb-6">
                  <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Time to Crack</p>
                    <p className="text-xl font-black text-slate-900">~{stats.time}</p>
                  </div>
               </div>
               <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <p className="text-[10px] text-slate-500 leading-relaxed font-medium">
                    This estimation is based on a brute-force attack performing 100 trillion guesses per second.
                  </p>
               </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 p-8 rounded-[2.5rem] shadow-sm">
             <div className="flex items-center gap-2 mb-8">
                <Settings2 className="w-5 h-5 text-slate-400" />
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest">Security Configuration</h3>
             </div>

             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4">
               {[
                 { id: "uppercase", label: "A-Z", sub: "Upper", hide: mode === "passphrase" },
                 { id: "lowercase", label: "a-z", sub: "Lower", hide: mode === "passphrase" },
                 { id: "numbers", label: "0-9", sub: "Numbers", hide: mode === "passphrase" },
                 { id: "symbols", label: "!@#", sub: "Symbols", hide: mode === "passphrase" },
                 { id: "excludeSimilar", label: "i1lo", sub: "No Similar", hide: false },
                 { id: "excludeAmbiguous", label: "{}[]", sub: "No Ambiguous", hide: mode === "passphrase" },
               ].filter(o => !o.hide).map((opt) => (
                 <button 
                   key={opt.id}
                   onClick={() => setOptions(prev => ({ ...prev, [opt.id]: !prev[opt.id as keyof typeof options] }))}
                   className={cn(
                     "p-4 rounded-2xl border-2 transition-all text-center group relative overflow-hidden",
                     options[opt.id as keyof typeof options] 
                      ? "border-primary-500 bg-primary-50/50" 
                      : "border-slate-50 bg-slate-50/50 hover:border-slate-200"
                   )}
                 >
                   <p className={cn("text-lg font-black transition-colors", options[opt.id as keyof typeof options] ? "text-primary-600" : "text-slate-400")}>{opt.label}</p>
                   <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">{opt.sub}</p>
                   {options[opt.id as keyof typeof options] && (
                     <motion.div 
                       layoutId="check"
                       className="absolute top-1 right-1"
                     >
                       <div className="w-3 h-3 bg-primary-600 rounded-full flex items-center justify-center">
                          <Check className="w-2 h-2 text-white" strokeWidth={4} />
                       </div>
                     </motion.div>
                   )}
                 </button>
               ))}
             </div>
          </div>
        </div>

        {/* Side Panel: History & Tips */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* History Panel */}
          <div className="bg-slate-900 text-white rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500 opacity-10 blur-3xl rounded-full" />
             
             <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                   <History className="w-5 h-5 text-primary-400" />
                   <h3 className="font-bold text-xs uppercase tracking-[0.2em]">Recent History</h3>
                </div>
                {history.length > 0 && (
                   <button onClick={clearHistory} className="p-2 hover:bg-white/10 rounded-lg text-slate-400 transition-colors">
                      <Trash2 className="w-4 h-4" />
                   </button>
                )}
             </div>

             <div className="space-y-3">
                <AnimatePresence mode="popLayout">
                   {history.length > 0 ? (
                     history.map((pwd, idx) => (
                       <motion.div 
                         key={pwd}
                         initial={{ opacity: 0, x: 20 }}
                         animate={{ opacity: 1, x: 0 }}
                         exit={{ opacity: 0, scale: 0.9 }}
                         className="group bg-white/5 border border-white/10 p-4 rounded-2xl flex items-center justify-between hover:bg-white/10 transition-all"
                       >
                          <div className="space-y-1 overflow-hidden pr-4">
                             <p className="font-mono text-xs font-bold truncate text-white transition-opacity">
                               ••••••••••••
                             </p>
                             <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Generated</p>
                          </div>
                          <button 
                            onClick={() => copyToClipboard(pwd)}
                            className="p-2 bg-primary-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                          >
                             <Copy className="w-4 h-4" />
                          </button>
                       </motion.div>
                     ))
                   ) : (
                     <div className="py-12 flex flex-col items-center justify-center text-slate-500 gap-4 opacity-50">
                        <History className="w-10 h-10" />
                        <p className="text-[10px] font-bold uppercase tracking-widest">No History Yet</p>
                     </div>
                   )}
                </AnimatePresence>
             </div>
          </div>

          {/* Security Tip Card */}
          <div className="bg-white border border-slate-200 p-8 rounded-[2.5rem] shadow-sm relative group overflow-hidden">
             <div className="absolute top-0 right-0 p-4 text-emerald-500/10 transition-transform group-hover:scale-110 duration-500">
                <ShieldCheck className="w-24 h-24" />
             </div>
             
             <div className="relative z-10 space-y-4">
                <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
                   <ShieldCheck className="w-6 h-6" />
                </div>
                <h4 className="font-black text-slate-900">Security Best Practice</h4>
                <p className="text-sm text-slate-600 leading-relaxed font-medium">
                  Use unique passwords for every account. Consider using a <b>Passphrase</b> for important accounts—they are easier to remember but much harder for computers to crack.
                </p>
                <div className="pt-2">
                   <button className="text-xs font-black text-primary-600 flex items-center gap-1 group">
                      Learn more about Entropy <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                   </button>
                </div>
             </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 p-8 bg-slate-900 rounded-[3rem] text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-r from-transparent to-primary-600/10 pointer-events-none" />
        <div className="w-14 h-14 bg-white/10 backdrop-blur rounded-[1.5rem] flex items-center justify-center text-primary-400 shadow-inner border border-white/10">
           <Lock className="w-8 h-8" />
        </div>
        <div className="space-y-1">
           <p className="text-lg font-black tracking-tight">Enterprise-Grade Browser Security</p>
           <p className="text-sm text-slate-400 font-medium">This tool uses a <b>cryptographically strong</b> random number generator. Your data never leaves your device—100% private.</p>
        </div>
      </div>
    </div>
  );
}

function getStrengthColor(score: number) {
  switch (score) {
    case 4: return "#10b981"; // emerald-500
    case 3: return "#3b82f6"; // blue-500
    case 2: return "#f59e0b"; // amber-500
    default: return "#f43f5e"; // rose-500
  }
}
