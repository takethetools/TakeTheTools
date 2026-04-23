"use client";

import { useState } from "react";
import { FileCode, Zap, Copy, Check, AlertCircle, Download } from "lucide-react";

function csvToXml(csv: string): string {
  const lines = csv.trim().split("\n").map(l => l.trim()).filter(Boolean);
  if (lines.length < 2) return "<!-- Need at least a header row and one data row -->";
  const headers = lines[0].split(",").map(h => h.trim().replace(/[^a-zA-Z0-9_-]/g, "_").replace(/^(\d)/, "_$1"));
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<root>\n`;
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(",").map(v => v.trim().replace(/^"|"$/g, ""));
    xml += `  <row>\n`;
    headers.forEach((h, idx) => {
      const val = (values[idx] ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
      xml += `    <${h}>${val}</${h}>\n`;
    });
    xml += `  </row>\n`;
  }
  xml += `</root>`;
  return xml;
}

function xmlToCsv(xml: string): string {
  const parser = typeof window !== "undefined" ? new window.DOMParser() : null;
  if (!parser) return "Error: Cannot parse XML in this environment";
  const doc = parser.parseFromString(xml, "text/xml");
  const errorNode = doc.querySelector("parsererror");
  if (errorNode) return "Error: Invalid XML - " + errorNode.textContent?.slice(0, 100);
  const rows = doc.querySelectorAll("row, record, item, entry");
  if (rows.length === 0) return "Error: No row elements found (expected <row>, <record>, <item>, or <entry>)";
  const headers = new Set<string>();
  rows.forEach(row => row.children && Array.from(row.children).forEach(child => headers.add(child.tagName)));
  const headerArr = Array.from(headers);
  const csvLines = [headerArr.join(",")];
  rows.forEach(row => {
    const vals = headerArr.map(h => {
      const el = row.querySelector(h);
      const val = el ? el.textContent?.replace(/,/g, ";") ?? "" : "";
      return val.includes(",") ? `"${val}"` : val;
    });
    csvLines.push(vals.join(","));
  });
  return csvLines.join("\n");
}

interface Props { mode: "csv-to-xml" | "xml-to-csv"; }

export default function CsvXmlConverterTool({ mode }: Props) {
  const [input, setInput] = useState(
    mode === "csv-to-xml"
      ? "name,age,city\nJohn Doe,30,New York\nJane Smith,25,London"
      : `<?xml version="1.0"?>\n<root>\n  <row><name>John</name><age>30</age></row>\n  <row><name>Jane</name><age>25</age></row>\n</root>`
  );
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  const convert = () => {
    if (!input.trim()) return;
    setError("");
    try {
      const result = mode === "csv-to-xml" ? csvToXml(input) : xmlToCsv(input);
      if (result.startsWith("Error:")) { setError(result); setOutput(""); }
      else setOutput(result);
    } catch (e) {
      setError("Conversion failed. Check your input format.");
    }
  };

  const copy = () => { navigator.clipboard.writeText(output); setIsCopied(true); setTimeout(() => setIsCopied(false), 2000); };

  const download = () => {
    const ext = mode === "csv-to-xml" ? "xml" : "csv";
    const blob = new Blob([output], { type: "text/plain" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = `converted.${ext}`; a.click();
  };

  const label = mode === "csv-to-xml" ? "CSV → XML" : "XML → CSV";
  const placeholder = mode === "csv-to-xml" ? "name,age\nJohn,30" : "<root><row><name>John</name></row></root>";

  return (
    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600">
          <FileCode className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900">{label} Converter</h3>
          <p className="text-sm text-slate-500">{mode === "csv-to-xml" ? "Convert CSV data to XML format" : "Convert XML to CSV spreadsheet format"}</p>
        </div>
      </div>

      <div>
        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 block">
          {mode === "csv-to-xml" ? "CSV Input" : "XML Input"}
        </label>
        <textarea value={input} onChange={e => setInput(e.target.value)}
          className="w-full h-44 p-5 bg-slate-50 border border-slate-200 rounded-2xl font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary-300"
          placeholder={placeholder}
        />
      </div>

      {error && (
        <div className="flex items-center gap-2 p-4 bg-red-50 rounded-2xl text-red-600 text-sm">
          <AlertCircle className="w-4 h-4 shrink-0" />{error}
        </div>
      )}

      <button onClick={convert}
        className="w-full py-4 bg-primary-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-primary-700 transition-colors">
        <Zap className="w-5 h-5" /> Convert to {mode === "csv-to-xml" ? "XML" : "CSV"}
      </button>

      {output && (
        <div>
          <div className="flex items-center justify-between mb-2 px-1">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Output</label>
            <div className="flex gap-3">
              <button onClick={download} className="text-slate-500 text-xs font-bold flex items-center gap-1 hover:text-slate-700">
                <Download className="w-3 h-3" /> Download
              </button>
              <button onClick={copy} className="text-primary-600 text-xs font-bold flex items-center gap-1">
                {isCopied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                {isCopied ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>
          <pre className="w-full p-6 bg-slate-900 rounded-2xl font-mono text-xs text-green-300 overflow-auto max-h-72">
            <code>{output}</code>
          </pre>
        </div>
      )}
    </div>
  );
}
