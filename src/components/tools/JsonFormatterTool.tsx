"use client";

import { useState, useEffect } from "react";
import { FileJson, AlertCircle, Maximize2, Minimize2 } from "lucide-react";
import confetti from "canvas-confetti";
import { cn } from "@/lib/utils";
import ToolActionBar from "./shared/ToolActionBar";

interface JsonFormatterToolProps {
  exampleInput?: string;
}

export default function JsonFormatterTool({ exampleInput }: JsonFormatterToolProps) {
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
        </div>
      </div>
    </div>
  );
}
