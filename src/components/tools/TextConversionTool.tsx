"use client";

import { useState, useCallback } from "react";
import { Zap, Copy, Check, RefreshCw, Download } from "lucide-react";

interface TextConversionToolProps {
  mode: "json-to-typescript" | "csv-to-xml" | "xml-to-csv" | "json-to-xml" | "html-to-text" | "html-table-generator" | "json-beautifier" | "json-minifier";
}

export default function TextConversionTool({ mode }: TextConversionToolProps) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(3);
  const [tableData, setTableData] = useState<string[][]>([["Header 1","Header 2","Header 3"],["Row 1 Col 1","Row 1 Col 2","Row 1 Col 3"],["Row 2 Col 1","Row 2 Col 2","Row 2 Col 3"]]);

  const getTitle = () => {
    const titles: Record<string, string> = {
      "json-to-typescript": "JSON to TypeScript Interface",
      "csv-to-xml": "CSV to XML Converter",
      "xml-to-csv": "XML to CSV Converter",
      "json-to-xml": "JSON to XML Converter",
      "html-to-text": "HTML to Plain Text",
      "html-table-generator": "HTML Table Generator",
      "json-beautifier": "JSON Beautifier",
      "json-minifier": "JSON Minifier",
    };
    return titles[mode] || mode;
  };

  const getPlaceholder = () => {
    const placeholders: Record<string, string> = {
      "json-to-typescript": '{\n  "id": 1,\n  "name": "John",\n  "email": "john@example.com",\n  "active": true\n}',
      "csv-to-xml": "name,age,city\nJohn,30,New York\nJane,25,London",
      "xml-to-csv": '<root>\n  <row>\n    <name>John</name>\n    <age>30</age>\n  </row>\n</root>',
      "json-to-xml": '{\n  "person": {\n    "name": "John",\n    "age": 30\n  }\n}',
      "html-to-text": "<h1>Hello World</h1>\n<p>This is a <strong>paragraph</strong> with some <a href=\"#\">links</a>.</p>",
      "json-beautifier": '{"name":"John","age":30,"city":"New York","tags":["admin","user"]}',
      "json-minifier": '{\n  "name": "John",\n  "age": 30,\n  "city": "New York"\n}',
    };
    return placeholders[mode] || "Enter your input here...";
  };

  const jsonToTypeScript = (jsonStr: string): string => {
    const obj = JSON.parse(jsonStr);
    const interfaces: string[] = [];

    const getType = (val: any, key: string = ""): string => {
      if (val === null) return "null";
      if (Array.isArray(val)) {
        if (val.length === 0) return "any[]";
        const itemType = getType(val[0]);
        return `${itemType}[]`;
      }
      if (typeof val === "object") {
        const interfaceName = key.charAt(0).toUpperCase() + key.slice(1) + "Type";
        const props = Object.entries(val).map(([k, v]) => `  ${k}: ${getType(v, k)};`).join("\n");
        interfaces.push(`interface ${interfaceName} {\n${props}\n}`);
        return interfaceName;
      }
      return typeof val;
    };

    const rootProps = Object.entries(obj).map(([k, v]) => `  ${k}: ${getType(v, k)};`).join("\n");
    interfaces.push(`interface RootObject {\n${rootProps}\n}`);
    return interfaces.reverse().join("\n\n");
  };

  const csvToXml = (csvStr: string): string => {
    const lines = csvStr.trim().split("\n").map(l => l.split(",").map(v => v.trim()));
    const headers = lines[0];
    const rows = lines.slice(1);
    const xmlRows = rows.map(row => {
      const fields = headers.map((h, i) => `    <${h.replace(/\s+/g,"_")}>${row[i] || ""}</${h.replace(/\s+/g,"_")}>`).join("\n");
      return `  <row>\n${fields}\n  </row>`;
    }).join("\n");
    return `<?xml version="1.0" encoding="UTF-8"?>\n<root>\n${xmlRows}\n</root>`;
  };

  const xmlToCsv = (xmlStr: string): string => {
    const rows: string[][] = [];
    const rowMatches = xmlStr.match(/<row>([\s\S]*?)<\/row>/g) || [];
    rowMatches.forEach((rowStr, i) => {
      const fields = rowStr.match(/<(\w+)>(.*?)<\/\1>/g) || [];
      if (i === 0) {
        rows.push(fields.map(f => f.match(/<(\w+)>/)?.[1] || ""));
      }
      rows.push(fields.map(f => f.match(/<\w+>(.*?)<\/\w+>/)?.[1] || ""));
    });
    return rows.map(r => r.join(",")).join("\n");
  };

  const jsonToXml = (jsonStr: string): string => {
    const obj = JSON.parse(jsonStr);
    const toXml = (o: any, tag: string, indent: number = 0): string => {
      const pad = "  ".repeat(indent);
      if (o === null || o === undefined) return `${pad}<${tag}/>\n`;
      if (typeof o !== "object") return `${pad}<${tag}>${String(o)}</${tag}>\n`;
      if (Array.isArray(o)) return o.map(item => toXml(item, tag, indent)).join("");
      const children = Object.entries(o).map(([k, v]) => toXml(v, k, indent + 1)).join("");
      return `${pad}<${tag}>\n${children}${pad}</${tag}>\n`;
    };
    const root = Object.keys(obj)[0];
    return `<?xml version="1.0" encoding="UTF-8"?>\n` + toXml(obj[root], root);
  };

  const htmlToText = (html: string): string => {
    return html
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<\/p>/gi, "\n\n")
      .replace(/<\/div>/gi, "\n")
      .replace(/<\/h[1-6]>/gi, "\n\n")
      .replace(/<\/li>/gi, "\n")
      .replace(/<[^>]+>/g, "")
      .replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
      .replace(/&nbsp;/g, " ").replace(/&quot;/g, '"')
      .replace(/\n{3,}/g, "\n\n").trim();
  };

  const process = () => {
    setError("");
    try {
      let result = "";
      if (mode === "json-to-typescript") result = jsonToTypeScript(input);
      else if (mode === "csv-to-xml") result = csvToXml(input);
      else if (mode === "xml-to-csv") result = xmlToCsv(input);
      else if (mode === "json-to-xml") result = jsonToXml(input);
      else if (mode === "html-to-text") result = htmlToText(input);
      else if (mode === "json-beautifier") result = JSON.stringify(JSON.parse(input), null, 2);
      else if (mode === "json-minifier") result = JSON.stringify(JSON.parse(input));
      setOutput(result);
    } catch (e: any) {
      setError("Error: " + (e.message || "Invalid input format"));
      setOutput("");
    }
  };

  const copy = () => {
    navigator.clipboard.writeText(output);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const download = () => {
    const extMap: Record<string, string> = {
      "json-to-typescript": "ts", "csv-to-xml": "xml", "xml-to-csv": "csv",
      "json-to-xml": "xml", "html-to-text": "txt", "json-beautifier": "json", "json-minifier": "json"
    };
    const blob = new Blob([output], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `output.${extMap[mode] || "txt"}`;
    a.click();
  };

  // HTML Table Generator — special UI
  if (mode === "html-table-generator") {
    const updateCell = (r: number, c: number, val: string) => {
      const newData = tableData.map(row => [...row]);
      while (newData.length <= r) newData.push(Array(cols).fill(""));
      while (newData[r].length <= c) newData[r].push("");
      newData[r][c] = val;
      setTableData(newData);
    };

    const buildData = (r: number, c: number) => {
      const data: string[][] = [];
      for (let i = 0; i < r; i++) {
        data.push(Array(c).fill("").map((_, j) => tableData[i]?.[j] ?? (i === 0 ? `Header ${j+1}` : "")));
      }
      return data;
    };

    const generateHtml = () => {
      const data = buildData(rows, cols);
      const thead = `  <thead>\n    <tr>\n${data[0].map(h => `      <th>${h}</th>`).join("\n")}\n    </tr>\n  </thead>`;
      const tbody = data.slice(1).map(row => `    <tr>\n${row.map(c => `      <td>${c}</td>`).join("\n")}\n    </tr>`).join("\n");
      const html = `<table border="1" cellpadding="8" cellspacing="0">\n${thead}\n  <tbody>\n${tbody}\n  </tbody>\n</table>`;
      setOutput(html);
    };

    const currentData = buildData(rows, cols);

    return (
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-8">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600">
            <Zap className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">HTML Table Generator</h3>
            <p className="text-sm text-slate-500">Build HTML tables visually</p>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">Rows</label>
            <input type="number" min={2} max={20} value={rows} onChange={e => setRows(Number(e.target.value))}
              className="w-full p-3 border border-slate-200 rounded-xl text-center font-bold" />
          </div>
          <div className="flex-1">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">Columns</label>
            <input type="number" min={1} max={10} value={cols} onChange={e => setCols(Number(e.target.value))}
              className="w-full p-3 border border-slate-200 rounded-xl text-center font-bold" />
          </div>
        </div>

        <div className="overflow-auto">
          <table className="w-full border-collapse text-sm">
            {currentData.map((row, r) => (
              <tr key={r} className={r === 0 ? "bg-slate-100" : "bg-white"}>
                {row.map((cell, c) => (
                  <td key={c} className="border border-slate-200 p-1">
                    <input value={cell} onChange={e => updateCell(r, c, e.target.value)}
                      className={`w-full p-2 rounded-lg text-sm outline-none focus:ring-2 ring-primary-200 ${r===0 ? "font-bold bg-slate-50" : "bg-white"}`}
                      placeholder={r === 0 ? `Header ${c+1}` : ""}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </table>
        </div>

        <button onClick={generateHtml} className="w-full py-4 bg-primary-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2">
          <Zap className="w-5 h-5" /> Generate HTML Table
        </button>

        {output && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Generated HTML</span>
              <button onClick={copy} className="text-primary-600 text-xs font-bold flex items-center gap-1">
                {isCopied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                {isCopied ? "Copied!" : "Copy"}
              </button>
            </div>
            <pre className="w-full p-6 bg-slate-900 rounded-2xl text-sm text-blue-100 font-mono overflow-auto max-h-64">
              <code>{output}</code>
            </pre>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-8">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600">
          <Zap className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900">{getTitle()}</h3>
          <p className="text-sm text-slate-500">Free online conversion tool</p>
        </div>
      </div>

      <div className="space-y-4">
        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Input</label>
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          className="w-full h-48 p-5 bg-slate-50 border border-slate-200 rounded-2xl font-mono text-sm resize-none focus:outline-none focus:ring-2 ring-primary-200"
          placeholder={getPlaceholder()}
        />
      </div>

      <button onClick={process} disabled={!input.trim()}
        className="w-full py-4 bg-primary-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary-500/20 disabled:opacity-40">
        <Zap className="w-5 h-5" /> Convert
      </button>

      {error && (
        <div className="p-4 bg-red-50 border border-red-100 rounded-2xl text-sm text-red-600 font-medium">{error}</div>
      )}

      {output && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Output</span>
            <div className="flex gap-2">
              <button onClick={copy} className="text-primary-600 text-xs font-bold flex items-center gap-1">
                {isCopied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                {isCopied ? "Copied!" : "Copy"}
              </button>
              <button onClick={download} className="text-slate-500 text-xs font-bold flex items-center gap-1 ml-3">
                <Download className="w-3 h-3" /> Download
              </button>
            </div>
          </div>
          <pre className="w-full p-6 bg-slate-900 rounded-2xl text-sm text-blue-100 font-mono overflow-auto max-h-80">
            <code>{output}</code>
          </pre>
        </div>
      )}
    </div>
  );
}
