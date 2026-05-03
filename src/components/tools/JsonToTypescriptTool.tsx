"use client";

import { useState } from "react";
import { FileCode, Zap, Copy, Check, AlertCircle } from "lucide-react";

function jsonToTypescript(json: string): string {
  try {
    const obj = JSON.parse(json);
    const interfaces: string[] = [];

    function getType(value: unknown, key: string): string {
      if (value === null) return "null";
      if (Array.isArray(value)) {
        if (value.length === 0) return "unknown[]";
        const itemType = getType(value[0], key);
        return `${itemType}[]`;
      }
      if (typeof value === "object") {
        const interfaceName = key.charAt(0).toUpperCase() + key.slice(1);
        buildInterface(value as Record<string, unknown>, interfaceName);
        return interfaceName;
      }
      return typeof value;
    }

    function buildInterface(obj: Record<string, unknown>, name: string) {
      const lines: string[] = [`interface ${name} {`];
      for (const [key, value] of Object.entries(obj)) {
        const type = getType(value, key);
        const optional = value === null ? "?" : "";
        lines.push(`  ${key}${optional}: ${type};`);
      }
      lines.push("}");
      interfaces.unshift(lines.join("\n"));
    }

    buildInterface(obj, "RootObject");
    return interfaces.join("\n\n");
  } catch {
    return "// Error: Invalid JSON input";
  }
}

export default function JsonToTypescriptTool() {
  const [input, setInput] = useState('{\n  "id": 1,\n  "name": "John Doe",\n  "email": "john@example.com",\n  "isActive": true,\n  "tags": ["admin", "user"],\n  "address": {\n    "city": "New York",\n    "zip": "10001"\n  }\n}');
  const [output, setOutput] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [error, setError] = useState("");

  const convert = () => {
    if (!input.trim()) return;
    setError("");
    try {
      JSON.parse(input);
      const result = jsonToTypescript(input);
      setOutput(result);
    } catch {
      setError("Invalid JSON. Please check your input.");
      setOutput("");
    }
  };

  const copyResult = () => {
    navigator.clipboard.writeText(output);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600">
          <FileCode className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900">JSON to TypeScript Interface</h3>
          <p className="text-sm text-slate-500">Generate TypeScript interfaces from JSON objects</p>
        </div>
      </div>

      <div>
        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 block">JSON Input</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full h-48 p-5 bg-slate-50 border border-slate-200 rounded-2xl font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary-300"
          placeholder='{"key": "value"}'
        />
      </div>

      {error && (
        <div className="flex items-center gap-2 p-4 bg-red-50 rounded-2xl text-red-600 text-sm">
          <AlertCircle className="w-4 h-4 shrink-0" />
          {error}
        </div>
      )}

      <button
        onClick={convert}
        className="w-full py-4 bg-primary-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-primary-700 transition-colors"
      >
        <Zap className="w-5 h-5" /> Generate TypeScript Interface
      </button>

      {output && (
        <div>
          <div className="flex items-center justify-between mb-2 px-1">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">TypeScript Output</label>
            <button onClick={copyResult} className="text-primary-600 text-xs font-bold flex items-center gap-1 hover:text-primary-700">
              {isCopied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
              {isCopied ? "Copied!" : "Copy"}
            </button>
          </div>
          <pre className="w-full p-6 bg-slate-900 rounded-2xl font-mono text-sm text-green-300 overflow-auto max-h-80">
            <code>{output}</code>
          </pre>
        </div>
      )}
    </div>
  );
}
