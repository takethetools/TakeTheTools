"use client";

import { useState, useEffect } from "react";
import { ArrowRightLeft, AlertCircle, FileText } from "lucide-react";
import confetti from "canvas-confetti";
import { cn } from "@/lib/utils";
import ToolActionBar from "./shared/ToolActionBar";

interface Base64ToolProps {
  exampleInput?: string;
}

export default function Base64Tool({ exampleInput }: Base64ToolProps) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [error, setError] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  const process = () => {
    setError(null);
    try {
      if (!input.trim()) return;
      if (mode === "encode") {
        const encoded = btoa(input);
        setOutput(encoded);
      } else {
        const decoded = atob(input);
        setOutput(decoded);
      }
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
      });
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Invalid Base64 input");
      setOutput("");
    }
  };

  const swap = () => {
    setMode(mode === "encode" ? "decode" : "encode");
    setInput(output);
    setOutput("");
    setError(null);
  };

  const copyToClipboard = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const downloadResult = () => {
    if (!output) return;
    const blob = new Blob([output], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = mode === "encode" ? "encoded-base64.txt" : "decoded-text.txt";
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
      // For Base64, we might need to handle encode/decode specific examples
      // But for simplicity, we use the raw example provided
      setInput(exampleInput);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <ToolActionBar
            title={mode === "encode" ? "Plain Text Source" : "Base64 String Source"}
            hasInput={!!input}
            onClear={clear}
            onExample={exampleInput ? loadExample : undefined}
          />
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={mode === "encode" ? "Enter text to encode..." : "Enter Base64 string to decode..."}
            className="w-full h-[300px] p-6 bg-white border border-slate-200 rounded-3xl font-mono text-sm focus:ring-4 focus:ring-primary-100 outline-none transition-all shadow-inner"
          />
        </div>

        <div className="space-y-4">
          <ToolActionBar
            title={mode === "encode" ? "Base64 Result" : "Decoded Text Result"}
            hasOutput={!!output}
            isCopied={isCopied}
            onCopy={copyToClipboard}
            onDownload={downloadResult}
          />
          <div className="relative h-[300px]">
            <textarea
              readOnly
              value={output}
              placeholder="The processed result will appear here..."
              className="w-full h-full p-6 bg-slate-900 text-slate-300 border border-slate-800 rounded-3xl font-mono text-sm outline-none shadow-2xl"
            />
            {error && (
              <div className="absolute inset-x-0 top-0 p-4 bg-red-500/10 backdrop-blur-sm border-b border-red-500/20 text-red-400 text-xs flex items-start gap-2 rounded-t-3xl">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 p-8 rounded-[2.5rem] flex flex-wrap items-center justify-between gap-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex bg-slate-100 p-1 rounded-2xl">
            <button
              onClick={() => setMode("encode")}
              className={cn("px-6 py-2.5 rounded-xl text-sm font-bold transition-all", mode === "encode" ? "bg-white text-primary-600 shadow-md" : "text-slate-500 hover:text-slate-700")}
            >
              Encode
            </button>
            <button
              onClick={() => setMode("decode")}
              className={cn("px-6 py-2.5 rounded-xl text-sm font-bold transition-all", mode === "decode" ? "bg-white text-primary-600 shadow-md" : "text-slate-500 hover:text-slate-700")}
            >
              Decode
            </button>
          </div>
          <button
            onClick={swap}
            className="p-3 bg-slate-100 rounded-full hover:bg-slate-200 text-slate-500 hover:text-primary-600 transition-all hover:rotate-180 duration-500"
            title="Swap input and output"
          >
            <ArrowRightLeft className="w-5 h-5" />
          </button>
        </div>

        <button
          onClick={process}
          disabled={!input}
          className="px-12 py-4 bg-primary-600 text-white rounded-2xl font-bold shadow-xl shadow-primary-500/20 hover:bg-primary-700 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {mode === "encode" ? "Encode to Base64" : "Decode Base64"}
        </button>
      </div>
    </div>
  );
}
