"use client";

import { useState } from "react";
import { FileCode, Copy, Check, Info, Code2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function XmlFormatterTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const formatXml = () => {
    if (!input.trim()) return;
    setError(null);

    try {
      let formatted = "";
      let reg = /(>)(<)(\/*)/g;
      let xml = input.replace(reg, "$1\r\n$2$3");
      let pad = 0;
      
      xml.split("\r\n").forEach((node) => {
        let indent = 0;
        if (node.match(/.+<\/\w[^>]*>$/)) {
          indent = 0;
        } else if (node.match(/^<\/\w/)) {
          if (pad !== 0) {
            pad -= 1;
          }
        } else if (node.match(/^<\w[^>]*[^\/]>.*$/)) {
          indent = 1;
        } else {
          indent = 0;
        }

        let padding = "";
        for (let i = 0; i < pad; i++) {
          padding += "  ";
        }

        formatted += padding + node + "\r\n";
        pad += indent;
      });

      setOutput(formatted.trim());
    } catch (e) {
      setError("Invalid XML content");
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const clear = () => {
    setInput("");
    setOutput("");
    setError(null);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <FileCode className="w-5 h-5 text-primary-600" />
                Input XML
              </div>
              <button onClick={clear} className="text-xs font-bold text-slate-400 hover:text-red-500 transition-colors">
                Clear
              </button>
            </div>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="<root><node>value</node></root>..."
              className="w-full h-96 p-6 bg-slate-50 border border-slate-100 rounded-2xl font-mono text-sm focus:ring-2 focus:ring-primary-500 outline-none resize-none"
            />
            {error && <p className="text-red-500 text-xs font-bold">{error}</p>}
            <button 
              onClick={formatXml}
              className="w-full py-4 bg-primary-600 text-white rounded-xl font-bold shadow-lg shadow-primary-500/20 hover:bg-primary-700 transition-all"
            >
              Format XML
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm h-full flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <Check className="w-5 h-5 text-green-600" />
                Formatted XML
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
                className="w-full h-[410px] p-6 bg-slate-900 text-green-400 border border-slate-800 rounded-2xl font-mono text-sm outline-none resize-none"
                placeholder="Formatted XML will appear here..."
              />
              {!output && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-500 pointer-events-none">
                  <Info className="w-12 h-12 opacity-10 mb-4" />
                  <p className="text-sm">Format to see result</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
