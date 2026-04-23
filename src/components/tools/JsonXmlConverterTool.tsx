"use client";

import { useState } from "react";
import { Braces, Zap, Copy, Check, AlertCircle } from "lucide-react";

function jsonToXml(json: string): string {
  try {
    const obj = JSON.parse(json);
    function convert(val: unknown, tag: string, indent: string): string {
      if (val === null || val === undefined) return `${indent}<${tag}/>\n`;
      if (Array.isArray(val)) return val.map(item => convert(item, tag, indent)).join("");
      if (typeof val === "object") {
        let xml = `${indent}<${tag}>\n`;
        for (const [k, v] of Object.entries(val as Record<string, unknown>)) {
          const safeKey = k.replace(/[^a-zA-Z0-9_-]/g, "_").replace(/^(\d)/, "_$1");
          xml += convert(v, safeKey, indent + "  ");
        }
        xml += `${indent}</${tag}>\n`;
        return xml;
      }
      const escaped = String(val).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
      return `${indent}<${tag}>${escaped}</${tag}>\n`;
    }
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    if (typeof obj === "object" && !Array.isArray(obj)) {
      xml += `<root>\n`;
      for (const [k, v] of Object.entries(obj as Record<string, unknown>)) {
        const safeKey = k.replace(/[^a-zA-Z0-9_-]/g, "_").replace(/^(\d)/, "_$1");
        xml += convert(v, safeKey, "  ");
      }
      xml += `</root>`;
    } else {
      xml += convert(obj, "root", "");
    }
    return xml;
  } catch {
    return "Error: Invalid JSON input";
  }
}

interface Props { mode: "json-to-xml" }

export default function JsonXmlConverterTool({ mode }: Props) {
  const [input, setInput] = useState('{\n  "user": {\n    "id": 1,\n    "name": "John Doe",\n    "email": "john@example.com",\n    "tags": ["admin", "user"]\n  }\n}');
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  const convert = () => {
    setError("");
    const result = jsonToXml(input);
    if (result.startsWith("Error:")) { setError(result); setOutput(""); }
    else setOutput(result);
  };

  const copy = () => { navigator.clipboard.writeText(output); setIsCopied(true); setTimeout(() => setIsCopied(false), 2000); };

  return (
    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600">
          <Braces className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900">JSON to XML Converter</h3>
          <p className="text-sm text-slate-500">Transform JSON objects into valid XML documents</p>
        </div>
      </div>
      <div>
        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 block">JSON Input</label>
        <textarea value={input} onChange={e => setInput(e.target.value)}
          className="w-full h-48 p-5 bg-slate-50 border border-slate-200 rounded-2xl font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary-300"
          placeholder='{"key": "value"}'
        />
      </div>
      {error && <div className="flex items-center gap-2 p-4 bg-red-50 rounded-2xl text-red-600 text-sm"><AlertCircle className="w-4 h-4" />{error}</div>}
      <button onClick={convert} className="w-full py-4 bg-primary-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-primary-700 transition-colors">
        <Zap className="w-5 h-5" /> Convert to XML
      </button>
      {output && (
        <div>
          <div className="flex justify-between mb-2 px-1">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">XML Output</label>
            <button onClick={copy} className="text-primary-600 text-xs font-bold flex items-center gap-1">
              {isCopied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />} {isCopied ? "Copied!" : "Copy"}
            </button>
          </div>
          <pre className="w-full p-6 bg-slate-900 rounded-2xl font-mono text-xs text-blue-200 overflow-auto max-h-72"><code>{output}</code></pre>
        </div>
      )}
    </div>
  );
}
