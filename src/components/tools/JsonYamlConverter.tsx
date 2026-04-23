"use client";

import { useState } from "react";
import { FileJson, Zap, Copy, Check, Repeat } from "lucide-react";

interface JsonYamlConverterProps {
  mode: "json-to-yaml" | "yaml-to-json";
}

export default function JsonYamlConverter({ mode }: JsonYamlConverterProps) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  const convert = () => {
    if (!input) return;
    try {
      if (mode === "json-to-yaml") {
        const obj = JSON.parse(input);
        // Basic YAML stringifier for demonstration
        const yaml = Object.entries(obj).map(([k, v]) => `${k}: ${v}`).join("\n");
        setOutput(yaml);
      } else {
        const lines = input.split("\n");
        const obj: any = {};
        lines.forEach(line => {
          const [k, v] = line.split(":").map(s => s.trim());
          if (k && v) obj[k] = isNaN(Number(v)) ? v : Number(v);
        });
        setOutput(JSON.stringify(obj, null, 2));
      }
    } catch {
      setOutput("Error: Invalid Input Format");
    }
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
          <FileJson className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900 capitalize">{mode.replace(/-/g, " ")}</h3>
          <p className="text-sm text-slate-500">Convert data between JSON and YAML formats</p>
        </div>
      </div>

      <div className="space-y-6">
        <textarea 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full h-40 p-6 bg-slate-50 border border-slate-100 rounded-2xl font-mono text-sm"
          placeholder={mode === "json-to-yaml" ? '{"key": "value"}' : "key: value"}
        />

        <button onClick={convert} className="w-full py-4 bg-primary-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2">
           <Zap className="w-5 h-5" /> Convert
        </button>

        {output && (
          <div className="space-y-2">
             <div className="flex items-center justify-between px-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Result</span>
                <button onClick={copyResult} className="text-primary-600 text-xs font-bold flex items-center gap-1">
                   {isCopied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                   Copy Result
                </button>
             </div>
             <pre className="w-full p-8 bg-slate-900 rounded-3xl border border-slate-800 font-mono text-sm text-blue-100 overflow-auto">
                <code>{output}</code>
             </pre>
          </div>
        )}
      </div>
    </div>
  );
}
