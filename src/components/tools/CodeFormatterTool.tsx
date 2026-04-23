"use client";

import { useState } from "react";
import { FileCode, Code, Loader2, Check, Copy, Download, Zap, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

interface CodeFormatterToolProps {
  language: "css" | "javascript" | "html" | "typescript";
}

export default function CodeFormatterTool({ language }: CodeFormatterToolProps) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isFormatting, setIsFormatting] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const formatCode = () => {
    if (!input) return;
    setIsFormatting(true);

    // Using a simple regex-based formatter for now to keep it client-side without heavy libs
    // In production, we'd use 'prettier' or similar if bundle size allows
    setTimeout(() => {
        try {
            let formatted = input;
            if (language === "css") {
                formatted = input
                    .replace(/\s*([\{\};,])\s*/g, "$1\n")
                    .replace(/\n\s*\n/g, "\n")
                    .replace(/\{/g, " {\n  ")
                    .replace(/;/g, ";\n  ")
                    .replace(/\s*\}\s*/g, "\n}\n");
            } else if (language === "javascript" || language === "typescript") {
                formatted = input
                    .replace(/\s*([\{\};])\s*/g, "$2\n")
                    .replace(/\{/g, " {\n  ")
                    .replace(/\n\s*\n/g, "\n");
            }
            setOutput(formatted.trim());
        } catch (err) {
            console.error(err);
            setOutput("Error formatting code. Please check syntax.");
        }
        setIsFormatting(false);
    }, 500);
  };

  const copyResult = () => {
    navigator.clipboard.writeText(output);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-8">
      <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600">
            <FileCode className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900 capitalize">{language} Formatter</h3>
            <p className="text-sm text-slate-500">Beautify and indent your {language} code</p>
          </div>
        </div>
        
        <div className="flex gap-2">
           <button onClick={() => setInput("")} className="px-4 py-2 text-slate-500 font-bold text-sm hover:text-slate-700">Clear</button>
           <button 
             onClick={formatCode}
             disabled={!input || isFormatting}
             className="px-8 py-3 bg-primary-600 text-white rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-primary-500/20"
           >
             {isFormatting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
             Format Code
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-2">Input Raw Code</label>
          <textarea 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full h-[400px] bg-slate-50 border border-slate-100 rounded-2xl p-6 font-mono text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
            placeholder={`Paste your ${language} here...`}
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between px-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Formatted Result</label>
            {output && (
              <button onClick={copyResult} className="text-primary-600 text-xs font-bold flex items-center gap-1 hover:underline">
                {isCopied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                {isCopied ? "Copied" : "Copy"}
              </button>
            )}
          </div>
          <textarea 
            value={output}
            readOnly
            className="w-full h-[400px] bg-slate-900 border-none rounded-2xl p-6 font-mono text-sm text-blue-100 focus:outline-none"
            placeholder="Formatted code will appear here..."
          />
        </div>
      </div>
    </div>
  );
}
