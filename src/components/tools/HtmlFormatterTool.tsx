"use client";

import { useState } from "react";
import { Code2, Copy, Check, Info } from "lucide-react";
import { cn } from "@/lib/utils";

export default function HtmlFormatterTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  const formatHtml = () => {
    if (!input.trim()) return;
    
    // Simple HTML prettifier logic
    let formatted = "";
    let indent = 0;
    const tokens = input.split(/>\s*</);

    if (tokens.length <= 1) {
      setOutput(input);
      return;
    }

    tokens.forEach((token, index) => {
      let currentToken = token;
      if (index === 0) {
        currentToken = currentToken.startsWith("<") ? currentToken.substring(1) : currentToken;
      }
      if (index === tokens.length - 1) {
        currentToken = currentToken.endsWith(">") ? currentToken.substring(0, currentToken.length - 1) : currentToken;
      }

      if (currentToken.startsWith("/")) {
        indent--;
      }

      formatted += "  ".repeat(Math.max(0, indent)) + "<" + currentToken + ">\n";

      if (!currentToken.startsWith("/") && !currentToken.endsWith("/") && !currentToken.includes("img") && !currentToken.includes("br") && !currentToken.includes("hr") && !currentToken.includes("input")) {
        indent++;
      }
    });

    setOutput(formatted.trim());
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-bold text-slate-900">
              <Code2 className="w-5 h-5 text-primary-600" />
              Raw HTML
            </div>
            <button onClick={() => setInput("")} className="text-xs font-bold text-slate-400 hover:text-red-500 transition-colors">Clear</button>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="<div class='test'><h1>Hello</h1></div>..."
            className="w-full h-96 p-6 bg-slate-50 border border-slate-100 rounded-2xl font-mono text-sm focus:ring-2 focus:ring-primary-500 outline-none resize-none"
          />
          <button 
            onClick={formatHtml}
            className="w-full py-4 bg-primary-600 text-white rounded-xl font-bold shadow-lg shadow-primary-500/20 hover:bg-primary-700 transition-all"
          >
            Beautify HTML
          </button>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm h-full flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 font-bold text-slate-900">
              <Check className="w-5 h-5 text-green-600" />
              Beautified HTML
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
              className="w-full h-[410px] p-6 bg-slate-900 text-orange-400 border border-slate-800 rounded-2xl font-mono text-sm outline-none resize-none"
              placeholder="Beautified result..."
            />
            {!output && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-500 pointer-events-none">
                <Info className="w-12 h-12 opacity-10 mb-4" />
                <p className="text-sm">Result will appear here</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
