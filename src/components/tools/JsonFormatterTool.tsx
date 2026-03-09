"use client";

import { useState } from "react";
import { Copy, Check, Trash2, FileJson, AlertCircle, Maximize2, Minimize2, Download } from "lucide-react";
import confetti from "canvas-confetti";
import { cn } from "@/lib/utils";

export default function JsonFormatterTool() {
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
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const downloadJson = () => {
    if (!output) return;
    const blob = new Blob([output], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "formatted.json";
    a.click();
  };

  const clear = () => {
    setInput("");
    setOutput("");
    setError(null);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Area */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 flex items-center gap-2">
              <FileJson className="w-5 h-5 text-primary-600" />
              Input JSON
            </h3>
            <button 
              onClick={clear}
              className="text-xs font-bold text-slate-400 hover:text-red-500 transition-colors flex items-center gap-1"
            >
              <Trash2 className="w-3 h-3" /> Clear
            </button>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='Paste your JSON here... e.g. {"name": "John", "age": 30}'
            className="w-full h-[400px] p-6 bg-white border border-slate-200 rounded-2xl font-mono text-sm focus:ring-2 focus:ring-primary-500 outline-none shadow-inner"
          />
        </div>

        {/* Output Area */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900">Result</h3>
            <div className="flex gap-2">
              {output && (
                <>
                  <button 
                    onClick={downloadJson}
                    className="p-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-all"
                    title="Download JSON"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={copyToClipboard}
                    className={cn(
                      "flex items-center gap-2 px-3 py-1.5 rounded-lg font-bold text-xs transition-all",
                      isCopied ? "bg-green-100 text-green-700" : "bg-primary-100 text-primary-600 hover:bg-primary-200"
                    )}
                  >
                    {isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {isCopied ? "Copied!" : "Copy Result"}
                  </button>
                </>
              )}
            </div>
          </div>
          <div className="relative group h-[400px]">
            <textarea
              readOnly
              value={output}
              placeholder="Formatted JSON will appear here..."
              className="w-full h-full p-6 bg-slate-900 text-slate-300 border border-slate-800 rounded-2xl font-mono text-sm outline-none shadow-2xl"
            />
            {error && (
              <div className="absolute inset-x-0 top-0 p-4 bg-red-500/10 backdrop-blur-sm border-b border-red-500/20 text-red-400 text-xs flex items-start gap-2 rounded-t-2xl animate-in slide-in-from-top-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Control Bar */}
      <div className="bg-white border border-slate-200 p-6 rounded-3xl flex flex-wrap items-center justify-between gap-6 shadow-sm">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">Indent</span>
            <select 
              value={indent} 
              onChange={(e) => setIndent(parseInt(e.target.value))}
              className="bg-slate-100 border-none rounded-lg px-3 py-1 text-sm font-bold outline-none ring-primary-500 focus:ring-2"
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
            className="flex-grow md:flex-grow-0 px-6 py-3 bg-white border border-slate-200 text-slate-900 rounded-xl font-bold hover:bg-slate-50 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <Minimize2 className="w-5 h-5" /> Minify
          </button>
          <button 
            onClick={formatJson}
            disabled={!input}
            className="flex-grow md:flex-grow-0 px-10 py-3 bg-primary-600 text-white rounded-xl font-bold shadow-lg shadow-primary-500/20 hover:bg-primary-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <Maximize2 className="w-5 h-5" /> Format JSON
          </button>
        </div>
      </div>
    </div>
  );
}
