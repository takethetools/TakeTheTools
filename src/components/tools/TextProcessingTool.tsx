"use client";

import { useState } from "react";
import { Type, Copy, Check, Zap, RefreshCw, Trash2, List, Scissors, Mail, Download } from "lucide-react";
import { cn } from "@/lib/utils";

interface TextProcessingToolProps {
  mode: "reverse" | "remove-duplicates" | "sort-lines" | "remove-whitespace" | "remove-empty-lines" | "add-prefix-suffix" | "remove-html" | "extract-emails" | "extract-urls";
  prefix?: string;
  suffix?: string;
}

export default function TextProcessingTool({ mode, prefix = "", suffix = "" }: TextProcessingToolProps) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  const processText = () => {
    if (mode === "reverse") {
      setOutput(input.split("").reverse().join(""));
    } else if (mode === "remove-duplicates") {
      const lines = input.split("\n");
      const uniqueLines = Array.from(new Set(lines));
      setOutput(uniqueLines.join("\n"));
    } else if (mode === "sort-lines") {
      const lines = input.split("\n");
      setOutput(lines.sort().join("\n"));
    } else if (mode === "remove-whitespace") {
      setOutput(input.replace(/\s+/g, " ").trim());
    } else if (mode === "remove-empty-lines") {
      setOutput(input.split("\n").filter(line => line.trim() !== "").join("\n"));
    } else if (mode === "add-prefix-suffix") {
      setOutput(input.split("\n").map(line => `${prefix}${line}${suffix}`).join("\n"));
    } else if (mode === "remove-html") {
      setOutput(input.replace(/<[^>]*>?/gm, ""));
    } else if (mode === "extract-emails") {
      const emails = input.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
      setOutput(emails ? Array.from(new Set(emails)).join("\n") : "No emails found");
    } else if (mode === "extract-urls") {
      const urls = input.match(/(https?:\/\/[^\s]+)/g);
      setOutput(urls ? Array.from(new Set(urls)).join("\n") : "No URLs found");
    }
  };

  const downloadText = () => {
    if (!output) return;
    const blob = new Blob([output], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `processed-${mode}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const copyResult = () => {
    navigator.clipboard.writeText(output);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const titles: Record<string, string> = {
    "reverse": "Text Reverser",
    "remove-duplicates": "Remove Duplicate Lines",
    "sort-lines": "Alphabetical Line Sorter",
    "remove-whitespace": "Remove Whitespace",
    "remove-empty-lines": "Remove Empty Lines",
    "add-prefix-suffix": "Add Prefix/Suffix to Lines",
    "remove-html": "Remove HTML Tags",
    "extract-emails": "Extract Emails",
    "extract-urls": "Extract URLs"
  };

  const icons: Record<string, React.ReactNode> = {
    "reverse": <RefreshCw className="w-6 h-6" />,
    "remove-duplicates": <Trash2 className="w-6 h-6" />,
    "sort-lines": <List className="w-6 h-6" />,
    "remove-whitespace": <Scissors className="w-6 h-6" />,
    "remove-empty-lines": <Trash2 className="w-6 h-6" />,
    "add-prefix-suffix": <Type className="w-6 h-6" />,
    "remove-html": <Scissors className="w-6 h-6" />,
    "extract-emails": <Mail className="w-6 h-6" />,
    "extract-urls": <RefreshCw className="w-6 h-6" />
  };

  return (
    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-8">
      <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600">
            {icons[mode]}
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">{titles[mode]}</h3>
            <p className="text-sm text-slate-500">Quickly {mode.replace(/-/g, " ")} your text</p>
          </div>
        </div>

        <button
          onClick={processText}
          className="px-8 py-3 bg-primary-600 text-white rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-primary-500/20"
        >
          <Zap className="w-4 h-4" /> Process
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between px-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-2">Source Text</label>
            <div className="flex gap-4">
              <button
                onClick={() => setInput("Hello World!\nApple\nBanana\nApple\nOrange\n\nVisit: https://takethetools.com\nContact: info@takethetools.com")}
                className="text-xs font-bold text-primary-500 hover:text-primary-600 transition-colors uppercase tracking-wider"
              >
                Example
              </button>
              <button
                onClick={() => setInput("")}
                className="text-xs font-bold text-slate-400 hover:text-red-500 transition-colors uppercase tracking-wider"
              >
                Clear
              </button>
            </div>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full h-80 bg-slate-50 border border-slate-100 rounded-2xl p-6 font-mono text-sm text-slate-600 focus:outline-none shadow-inner"
            placeholder="Enter or paste your text here..."
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between px-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Result</label>
            {output && (
              <div className="flex gap-4">
                <button onClick={downloadText} className="text-slate-500 hover:text-primary-600 text-xs font-bold flex items-center gap-1 uppercase tracking-wider">
                  <Download className="w-3 h-3" /> Download
                </button>
                <button onClick={copyResult} className="text-primary-600 text-xs font-bold flex items-center gap-1 uppercase tracking-wider">
                  {isCopied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  Copy
                </button>
              </div>
            )}
          </div>
          <textarea
            value={output}
            readOnly
            className="w-full h-80 bg-slate-100 border-none rounded-2xl p-6 font-mono text-sm text-slate-700 focus:outline-none"
            placeholder="Result will appear here..."
          />
        </div>
      </div>
    </div>
  );
}
