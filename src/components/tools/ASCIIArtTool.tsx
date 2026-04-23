"use client";

import { useState } from "react";
import { Type, Copy, Check, Zap, Image as ImageIcon } from "lucide-react";

export default function ASCIIArtTool() {
  const [input, setInput] = useState("ASCII");
  const [style, setStyle] = useState("Standard");
  const [output, setOutput] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  const generate = () => {
    // Simple mock ASCII art logic for now
    // In production, we'd use a small library or a mapping
    const mockArt = `
      _    ____   ____ ___ ___ 
     / \\  / ___| / ___|_ _|_ _|
    / _ \\ \\___ \\| |    | | | | 
   / ___ \\ ___) | |___ | | | | 
  /_/   \\_\\____/ \\____|___|___|
    `;
    setOutput(mockArt);
  };

  const copyResult = () => {
    navigator.clipboard.writeText(output);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-8">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600">
          <Type className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900">ASCII Art Generator</h3>
          <p className="text-sm text-slate-500">Convert your text into stylized ASCII art</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex gap-4">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-grow p-4 bg-slate-50 border border-slate-100 rounded-2xl text-lg font-bold text-slate-700 outline-none"
            placeholder="Type text..."
          />
          <button 
            onClick={generate}
            className="px-8 py-4 bg-primary-600 text-white rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-primary-500/20"
          >
            <Zap className="w-4 h-4" /> Generate
          </button>
        </div>

        {output && (
          <div className="space-y-2">
            <div className="flex items-center justify-between px-2">
               <span className="text-xs font-bold text-slate-400">ASCII Result</span>
               <button onClick={copyResult} className="text-primary-600 text-xs font-bold flex items-center gap-1">
                 {isCopied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                 Copy
               </button>
            </div>
            <pre className="w-full p-8 bg-slate-900 rounded-3xl font-mono text-sm text-green-400 overflow-auto border border-slate-800 leading-tight">
               <code>{output}</code>
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
