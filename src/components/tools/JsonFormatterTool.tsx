"use client";

<<<<<<< HEAD
import { useState, useMemo, useEffect } from "react";
import { FileJson, AlertCircle, Maximize2, Minimize2, Copy, Check, Download, Trash2, Zap, Braces, Code2, Database, Search, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";
import { cn } from "@/lib/utils";
=======
import { useState, useEffect } from "react";
import { FileJson, AlertCircle, Maximize2, Minimize2 } from "lucide-react";
import confetti from "canvas-confetti";
import { cn } from "@/lib/utils";
import ToolActionBar from "./shared/ToolActionBar";
>>>>>>> d366566fdaff0e02dbc3205770509d5194ddbac9

interface JsonFormatterToolProps {
  exampleInput?: string;
}

export default function JsonFormatterTool({ exampleInput }: JsonFormatterToolProps) {
<<<<<<< HEAD
  const [input, setInput] = useState(exampleInput || '{\n  "status": "success",\n  "data": {\n    "id": 101,\n    "name": "Antigravity Studio",\n    "features": ["Validation", "Formatting", "Minification"]\n  }\n}');
  const [indent, setIndent] = useState(2);
  const [isCopied, setIsCopied] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const analysis = useMemo<{
    data: any;
    formatted: string;
    minified: string;
    depth: number;
    size: number;
    keys: number;
    error: string | null;
  }>(() => {
    try {
      if (!input.trim()) return { data: null, formatted: "", minified: "", depth: 0, size: 0, keys: 0, error: null };
      const parsed = JSON.parse(input);
      
      // Calculate depth
      const getDepth = (obj: any): number => {
        if (typeof obj !== 'object' || obj === null) return 0;
        const levels = Object.values(obj).map(v => getDepth(v));
        return 1 + (levels.length ? Math.max(...levels) : 0);
      };

      const formatted = JSON.stringify(parsed, null, indent);
      const minified = JSON.stringify(parsed);
      
      return { 
        data: parsed, 
        formatted, 
        minified,
        depth: getDepth(parsed),
        size: new Blob([formatted]).size,
        keys: Object.keys(parsed).length,
        error: null 
      };
    } catch (e: any) {
      return { data: null, formatted: "", minified: "", depth: 0, size: 0, keys: 0, error: e.message };
    }
  }, [input, indent]);

  const copyToClipboard = (val: string) => {
    if (!val) return;
    navigator.clipboard.writeText(val);
=======
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [indent, setIndent] = useState(2);
  const [isCopied, setIsCopied] = useState(false);

  const formatJson = () => {
    setError(null);
    try {
      if (!input.trim()) return;
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, indent);
      setOutput(formatted);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ["#3b82f6", "#60a5fa"]
      });
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Invalid JSON format");
      setOutput("");
    }
  };

  const minifyJson = () => {
    setError(null);
    try {
      if (!input.trim()) return;
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setOutput(minified);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Invalid JSON format");
    }
  };

  const copyToClipboard = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
>>>>>>> d366566fdaff0e02dbc3205770509d5194ddbac9
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const downloadJson = () => {
<<<<<<< HEAD
    if (!analysis.formatted) return;
    const blob = new Blob([analysis.formatted], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "studio_data.json";
    a.click();
  };

  const handleFixJson = () => {
    // Basic fix for common JSON errors like trailing commas or single quotes
    let fixed = input
      .replace(/'/g, '"') // Replace single quotes
      .replace(/,\s*([}\]])/g, '$1') // Remove trailing commas
      .replace(/([{,]\s*)([a-zA-Z0-9_]+)\s*:/g, '$1"$2":'); // Quote unquoted keys
    setInput(fixed);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Pane */}
        <div className="space-y-4">
           <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center justify-between">
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600">
                       <Braces className="w-5 h-5" />
                    </div>
                    <h3 className="font-black text-slate-900 uppercase tracking-widest text-xs">Source JSON</h3>
                 </div>
                 <div className="flex gap-2">
                    <button onClick={handleFixJson} className="px-3 py-1.5 bg-amber-50 text-amber-600 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-amber-100 transition-all">Fix Syntax</button>
                    <button onClick={() => setInput("")} className="p-2 text-slate-300 hover:text-red-500 transition-colors">
                       <Trash2 className="w-5 h-5" />
                    </button>
                 </div>
              </div>

              <div className="relative group">
                 <textarea
                   value={input}
                   onChange={(e) => setInput(e.target.value)}
                   placeholder='Paste raw JSON here...'
                   className={cn(
                     "w-full h-[500px] p-8 bg-slate-50 border-2 rounded-[2rem] font-mono text-sm outline-none transition-all resize-none shadow-inner",
                     analysis.error ? "border-red-100 ring-4 ring-red-50" : "border-slate-100 focus:border-primary-500 ring-primary-50 focus:ring-4"
                   )}
                 />
                 {analysis.error && (
                   <div className="absolute inset-x-0 bottom-0 p-6 bg-red-500 text-white rounded-b-[2rem] animate-in slide-in-from-bottom-2">
                      <div className="flex items-start gap-3">
                         <AlertCircle className="w-5 h-5 shrink-0" />
                         <div className="space-y-1">
                            <p className="font-bold text-xs uppercase tracking-widest">Syntax Error</p>
                            <p className="text-xs opacity-90 leading-relaxed font-mono">{analysis.error}</p>
                         </div>
                      </div>
                   </div>
                 )}
              </div>
           </div>
        </div>

        {/* Output/Analysis Pane */}
        <div className="space-y-6">
           <div className="bg-slate-900 p-8 rounded-[2.5rem] shadow-2xl flex flex-col h-full min-h-[500px] relative overflow-hidden">
              <div className="flex items-center justify-between mb-8 relative z-10">
                 <div className="flex items-center gap-4">
                    <div className="flex bg-white/10 p-1 rounded-xl">
                       {[2, 4].map((s) => (
                         <button key={s} onClick={() => setIndent(s)} className={cn("px-4 py-1.5 rounded-lg text-[10px] font-bold transition-all", indent === s ? "bg-white text-slate-900 shadow-sm" : "text-white/40")}>{s} Spaces</button>
                       ))}
                    </div>
                 </div>
                 <div className="flex gap-2">
                    <button onClick={() => copyToClipboard(analysis.formatted || "")} className="p-3 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-all">
                       {isCopied ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
                    </button>
                    <button onClick={downloadJson} className="p-3 bg-primary-600 text-white rounded-xl hover:bg-primary-500 transition-all">
                       <Download className="w-5 h-5" />
                    </button>
                 </div>
              </div>

              <div className="flex-grow relative group overflow-hidden rounded-2xl border border-white/10">
                 <textarea
                   readOnly
                   value={analysis.formatted || ""}
                   placeholder="Awaiting valid JSON..."
                   className="w-full h-full p-8 bg-black/30 text-emerald-400 font-mono text-sm outline-none resize-none no-scrollbar"
                 />
              </div>

              {analysis.data && (
                <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-white/10">
                   <div className="text-center">
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Max Depth</p>
                      <p className="text-xl font-black text-white">{analysis.depth}</p>
                   </div>
                   <div className="text-center border-x border-white/5">
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Total Keys</p>
                      <p className="text-xl font-black text-white">{analysis.keys}</p>
                   </div>
                   <div className="text-center">
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Payload Size</p>
                      <p className="text-xl font-black text-white">{(analysis.size / 1024).toFixed(2)} KB</p>
                   </div>
                </div>
              )}
           </div>

           <div className="bg-primary-50 p-8 rounded-[2.5rem] border border-primary-100 flex flex-col md:flex-row items-center gap-8 justify-between">
              <div className="flex gap-4 items-center">
                 <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-primary-600 shadow-sm">
                    <Database className="w-7 h-7" />
                 </div>
                 <div className="space-y-1">
                    <p className="font-black text-primary-900 uppercase tracking-wider">Expert Mode</p>
                    <p className="text-xs text-primary-700 max-w-md">Our architect identifies structural depth and key density to help you optimize data payloads.</p>
                 </div>
              </div>
              <button onClick={() => { setInput(analysis.minified || ""); confetti(); }} className="px-8 py-4 bg-primary-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-primary-900/20 hover:bg-primary-500 transition-all">
                 Minify Pro
              </button>
           </div>
=======
    if (!output) return;
    const blob = new Blob([output], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "formatted.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const clear = () => {
    setInput("");
    setOutput("");
    setError(null);
  };

  const loadExample = () => {
    if (exampleInput) {
      setInput(exampleInput);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Area */}
        <div className="space-y-4">
          <ToolActionBar
            title="Input JSON Source"
            hasInput={!!input}
            onClear={clear}
            onExample={exampleInput ? loadExample : undefined}
          />
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='Paste your JSON content here...'
            className="w-full h-[400px] p-6 bg-white border border-slate-200 rounded-3xl font-mono text-sm focus:ring-4 focus:ring-primary-100 outline-none shadow-inner transition-all"
          />
        </div>

        {/* Output Area */}
        <div className="space-y-4">
          <ToolActionBar
            title="Formatted Result"
            hasOutput={!!output}
            isCopied={isCopied}
            onCopy={copyToClipboard}
            onDownload={downloadJson}
          />
          <div className="relative group h-[400px]">
            <textarea
              readOnly
              value={output}
              placeholder="Your formatted JSON will appear here..."
              className="w-full h-full p-6 bg-slate-900 text-slate-300 border border-slate-800 rounded-3xl font-mono text-sm outline-none shadow-2xl"
            />
            {error && (
              <div className="absolute inset-x-0 top-0 p-4 bg-red-500/10 backdrop-blur-sm border-b border-red-500/20 text-red-400 text-xs flex items-start gap-2 rounded-t-3xl animate-in slide-in-from-top-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Control Bar */}
      <div className="bg-white border border-slate-200 p-8 rounded-[2.5rem] flex flex-wrap items-center justify-between gap-6 shadow-sm">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Indentation</span>
            <select
              value={indent}
              onChange={(e) => setIndent(parseInt(e.target.value))}
              className="bg-slate-100 border-none rounded-xl px-4 py-2 text-sm font-bold outline-none ring-primary-500 focus:ring-2 cursor-pointer transition-all"
            >
              <option value={2}>2 Spaces</option>
              <option value={4}>4 Spaces</option>
              <option value={8}>8 Spaces</option>
            </select>
          </div>
        </div>

        <div className="flex gap-4 w-full md:w-auto">
          <button
            onClick={minifyJson}
            disabled={!input}
            className="flex-grow md:flex-grow-0 px-8 py-4 bg-white border border-slate-200 text-slate-900 rounded-2xl font-bold hover:bg-slate-50 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <Minimize2 className="w-5 h-5" /> Minify
          </button>
          <button
            onClick={formatJson}
            disabled={!input}
            className="flex-grow md:flex-grow-0 px-12 py-4 bg-primary-600 text-white rounded-2xl font-bold shadow-xl shadow-primary-500/20 hover:bg-primary-700 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <Maximize2 className="w-5 h-5" /> Format JSON
          </button>
>>>>>>> d366566fdaff0e02dbc3205770509d5194ddbac9
        </div>
      </div>
    </div>
  );
}
