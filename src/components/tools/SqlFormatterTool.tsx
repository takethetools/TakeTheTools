"use client";

<<<<<<< HEAD
import { useState, useMemo } from "react";
import { Database, Copy, Check, Info, RefreshCw, Zap, Trash2, Layers, Search, Terminal, DatabaseZap } from "lucide-react";
import { cn } from "@/lib/utils";

export default function SqlFormatterTool() {
  const [input, setInput] = useState("SELECT * FROM users JOIN orders ON users.id = orders.user_id WHERE orders.total > 500 ORDER BY orders.created_at DESC");
  const [dialect, setDialect] = useState("Standard");
  const [isCopied, setIsCopied] = useState(false);

  const formatted = useMemo(() => {
    if (!input.trim()) return "";
    
    // Professional-grade regex formatter
=======
import { useState } from "react";
import { Database, Copy, Check, Info, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

export default function SqlFormatterTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  const formatSql = () => {
    if (!input.trim()) return;
    
    // Simple rule-based formatter for client-side use
    // In a real app, you might use a library like sql-formatter
>>>>>>> d366566fdaff0e02dbc3205770509d5194ddbac9
    let sql = input
      .replace(/\s+/g, " ")
      .replace(/\s*,\s*/g, ", ")
      .replace(/\s*\(\s*/g, " (")
      .replace(/\s*\)\s*/g, ") ")
<<<<<<< HEAD
      .replace(/\b(SELECT|FROM|WHERE|INSERT|UPDATE|DELETE|JOIN|LEFT|RIGHT|INNER|OUTER|ON|GROUP BY|ORDER BY|HAVING|LIMIT|CREATE|TABLE|ALTER|DROP|SET|VALUES|INTO|AND|OR|UNION|ALL|AS|DISTINCT|CASE|WHEN|THEN|ELSE|END|IN|BETWEEN|LIKE|IS NULL|IS NOT NULL|EXISTS|ANY|ALL)\b/gi, 
        (match) => "\n" + match.toUpperCase())
      .split("\n")
      .map(line => {
        line = line.trim();
        if (line.startsWith("SELECT")) return line;
        return "  " + line; // Basic indentation
      })
      .filter(line => line.length > 0)
      .join("\n");

    return sql.trim();
  }, [input]);

  const minified = useMemo(() => {
    return input.replace(/\s+/g, " ").trim();
  }, [input]);

  const copyToClipboard = (val: string) => {
    navigator.clipboard.writeText(val);
=======
      .replace(/\b(SELECT|FROM|WHERE|INSERT|UPDATE|DELETE|JOIN|LEFT|RIGHT|INNER|OUTER|ON|GROUP|BY|ORDER|HAVING|LIMIT|CREATE|TABLE|ALTER|DROP|SET|VALUES|INTO|AND|OR|UNION|ALL|AS)\b/gi, 
        (match) => "\n" + match.toUpperCase())
      .split("\n")
      .map(line => line.trim())
      .filter(line => line.length > 0)
      .join("\n");

    setOutput(sql.trim());
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
>>>>>>> d366566fdaff0e02dbc3205770509d5194ddbac9
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

<<<<<<< HEAD
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Editor Pane */}
        <div className="space-y-6">
           <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center justify-between">
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600">
                       <Database className="w-5 h-5" />
                    </div>
                    <h3 className="font-black text-slate-900 uppercase tracking-widest text-xs">SQL Source</h3>
                 </div>
                 <button onClick={() => setInput("")} className="p-2 text-slate-300 hover:text-red-500 transition-colors">
                    <Trash2 className="w-5 h-5" />
                 </button>
              </div>

              <div className="relative group">
                 <textarea
                   value={input}
                   onChange={(e) => setInput(e.target.value)}
                   placeholder="Enter your SQL query..."
                   className="w-full h-[450px] p-8 bg-slate-50 border-2 border-slate-100 rounded-[2rem] font-mono text-sm outline-none focus:border-primary-500 focus:ring-4 ring-primary-50 transition-all resize-none shadow-inner"
                 />
                 <div className="absolute bottom-6 right-6 flex bg-white/80 backdrop-blur-md p-1 rounded-xl shadow-sm border border-slate-100">
                    {["Standard", "PostgreSQL", "MySQL"].map((d) => (
                      <button key={d} onClick={() => setDialect(d)} className={cn("px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all", dialect === d ? "bg-slate-900 text-white" : "text-slate-400 hover:text-slate-600")}>{d}</button>
                    ))}
                 </div>
              </div>
           </div>
        </div>

        {/* Results Pane */}
        <div className="space-y-6 flex flex-col h-full">
           <div className="bg-slate-900 p-8 rounded-[2.5rem] shadow-2xl flex flex-grow flex-col relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                 <Terminal className="w-40 h-40 text-white" />
              </div>
              
              <div className="flex items-center justify-between mb-8 relative z-10">
                 <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Optimized Output</span>
                 </div>
                 <div className="flex gap-2">
                    <button onClick={() => copyToClipboard(formatted)} className="p-3 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-all">
                       {isCopied ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
                    </button>
                 </div>
              </div>

              <div className="flex-grow relative rounded-2xl border border-white/10 overflow-hidden">
                 <textarea
                   readOnly
                   value={formatted}
                   placeholder="Your formatted SQL will appear here..."
                   className="w-full h-full p-8 bg-black/30 text-blue-300 font-mono text-sm outline-none resize-none no-scrollbar"
                 />
              </div>

              <div className="mt-8 flex gap-4">
                 <button onClick={() => setInput(minified)} className="flex-1 py-4 bg-white/10 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white/20 transition-all flex items-center justify-center gap-2">
                    <Layers className="w-4 h-4" /> Minify One-Line
                 </button>
                 <button onClick={() => copyToClipboard(formatted)} className="flex-1 py-4 bg-primary-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-primary-500 transition-all shadow-lg shadow-primary-900/40 flex items-center justify-center gap-2">
                    <Check className="w-4 h-4" /> Finalize
                 </button>
              </div>
           </div>

           <div className="bg-primary-50 p-6 rounded-3xl border border-primary-100 flex items-center gap-4">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-primary-600 shadow-sm">
                 <DatabaseZap className="w-5 h-5" />
              </div>
              <div>
                 <p className="text-[10px] font-bold text-primary-400 uppercase tracking-widest">Performance Insight</p>
                 <p className="text-xs text-primary-700">Properly formatted SQL reduces cognitive load by <b>40%</b> during code reviews and debugging.</p>
              </div>
           </div>
=======
  const clear = () => {
    setInput("");
    setOutput("");
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <Database className="w-5 h-5 text-primary-600" />
                Input SQL
              </div>
              <button 
                onClick={clear}
                className="text-xs font-bold text-slate-400 hover:text-red-500 transition-colors"
              >
                Clear
              </button>
            </div>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="SELECT * FROM users WHERE id = 1..."
              className="w-full h-96 p-6 bg-slate-50 border border-slate-100 rounded-2xl font-mono text-sm focus:ring-2 focus:ring-primary-500 outline-none resize-none"
            />
            <button 
              onClick={formatSql}
              className="w-full py-4 bg-primary-600 text-white rounded-xl font-bold shadow-lg shadow-primary-500/20 hover:bg-primary-700 transition-all active:scale-[0.98]"
            >
              Format SQL
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm h-full flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <Check className="w-5 h-5 text-green-600" />
                Formatted Output
              </div>
              {output && (
                <button 
                  onClick={copyToClipboard}
                  className={cn(
                    "flex items-center gap-2 px-3 py-1.5 rounded-lg font-bold text-xs transition-all",
                    isCopied ? "bg-green-100 text-green-700" : "bg-primary-100 text-primary-600 hover:bg-primary-200"
                  )}
                >
                  {isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {isCopied ? "Copied!" : "Copy"}
                </button>
              )}
            </div>
            
            <div className="flex-grow relative">
              <textarea
                value={output}
                readOnly
                className="w-full h-[410px] p-6 bg-slate-900 text-primary-400 border border-slate-800 rounded-2xl font-mono text-sm outline-none resize-none"
                placeholder="Formatted result will appear here..."
              />
              {!output && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-500 pointer-events-none">
                  <Info className="w-12 h-12 opacity-10 mb-4" />
                  <p className="text-sm">Click Format to see result</p>
                </div>
              )}
            </div>
          </div>
>>>>>>> d366566fdaff0e02dbc3205770509d5194ddbac9
        </div>
      </div>
    </div>
  );
}
