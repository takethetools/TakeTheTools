"use client";

import { useState } from "react";
import { Table, Copy, Check, RefreshCw } from "lucide-react";

export default function HtmlTableGeneratorTool() {
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(3);
  const [hasHeader, setHasHeader] = useState(true);
  const [bordered, setBordered] = useState(true);
  const [cellData, setCellData] = useState<string[][]>(() =>
    Array(4).fill(null).map((_, r) => Array(3).fill("").map((_, c) =>
      r === 0 ? `Header ${c + 1}` : `Row ${r} Col ${c + 1}`
    ))
  );
  const [output, setOutput] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  const updateCell = (r: number, c: number, val: string) => {
    const next = cellData.map(row => [...row]);
    while (next.length <= r) next.push(Array(cols).fill(""));
    while (next[r].length <= c) next[r].push("");
    next[r][c] = val;
    setCellData(next);
  };

  const getData = (r: number, c: number) => {
    return cellData[r]?.[c] ?? "";
  };

  const generate = () => {
    const borderStyle = bordered ? ` style="border: 1px solid #e2e8f0; border-collapse: collapse;"` : "";
    const cellStyle = bordered ? ` style="border: 1px solid #e2e8f0; padding: 8px 12px;"` : ` style="padding: 8px 12px;"`;
    let html = `<table${borderStyle}>\n`;
    if (hasHeader) {
      html += `  <thead>\n    <tr>\n`;
      for (let c = 0; c < cols; c++) {
        html += `      <th${cellStyle}>${getData(0, c) || `Header ${c + 1}`}</th>\n`;
      }
      html += `    </tr>\n  </thead>\n`;
    }
    html += `  <tbody>\n`;
    const startRow = hasHeader ? 1 : 0;
    for (let r = startRow; r <= rows; r++) {
      html += `    <tr>\n`;
      for (let c = 0; c < cols; c++) {
        html += `      <td${cellStyle}>${getData(r, c) || ""}</td>\n`;
      }
      html += `    </tr>\n`;
    }
    html += `  </tbody>\n</table>`;
    setOutput(html);
  };

  const reset = () => {
    setCellData(Array(4).fill(null).map((_, r) => Array(3).fill("").map((_, c) =>
      r === 0 ? `Header ${c + 1}` : `Row ${r} Col ${c + 1}`
    )));
    setOutput("");
  };

  const copy = () => {
    navigator.clipboard.writeText(output);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const totalRows = rows + (hasHeader ? 1 : 0);

  return (
    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600">
          <Table className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900">HTML Table Generator</h3>
          <p className="text-sm text-slate-500">Create HTML tables visually without writing code</p>
        </div>
      </div>

      {/* Settings */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1 block">Rows</label>
          <input type="number" min={1} max={20} value={rows}
            onChange={e => setRows(Math.max(1, Math.min(20, parseInt(e.target.value) || 1)))}
            className="w-full p-3 border border-slate-200 rounded-xl text-center font-bold focus:outline-none focus:ring-2 focus:ring-primary-300"
          />
        </div>
        <div>
          <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1 block">Columns</label>
          <input type="number" min={1} max={10} value={cols}
            onChange={e => setCols(Math.max(1, Math.min(10, parseInt(e.target.value) || 1)))}
            className="w-full p-3 border border-slate-200 rounded-xl text-center font-bold focus:outline-none focus:ring-2 focus:ring-primary-300"
          />
        </div>
        <div className="flex items-end">
          <label className="flex items-center gap-2 cursor-pointer pb-3">
            <input type="checkbox" checked={hasHeader} onChange={e => setHasHeader(e.target.checked)}
              className="w-4 h-4 accent-primary-600"
            />
            <span className="text-sm font-bold text-slate-700">Header Row</span>
          </label>
        </div>
        <div className="flex items-end">
          <label className="flex items-center gap-2 cursor-pointer pb-3">
            <input type="checkbox" checked={bordered} onChange={e => setBordered(e.target.checked)}
              className="w-4 h-4 accent-primary-600"
            />
            <span className="text-sm font-bold text-slate-700">Borders</span>
          </label>
        </div>
      </div>

      {/* Visual Table Editor */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <tbody>
            {Array(totalRows).fill(null).map((_, r) => (
              <tr key={r}>
                {Array(cols).fill(null).map((_, c) => (
                  <td key={c} className="p-1">
                    <input
                      value={getData(r, c)}
                      onChange={e => updateCell(r, c, e.target.value)}
                      className={`w-full p-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 ${
                        r === 0 && hasHeader
                          ? "bg-slate-800 text-white border-slate-600 font-bold"
                          : "bg-slate-50 border-slate-200"
                      }`}
                      placeholder={r === 0 && hasHeader ? `Header ${c + 1}` : `Cell`}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex gap-3">
        <button onClick={generate}
          className="flex-1 py-4 bg-primary-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-primary-700 transition-colors">
          Generate HTML Table
        </button>
        <button onClick={reset}
          className="px-6 py-4 bg-slate-100 text-slate-700 rounded-2xl font-bold hover:bg-slate-200 transition-colors">
          <RefreshCw className="w-5 h-5" />
        </button>
      </div>

      {output && (
        <div>
          <div className="flex items-center justify-between mb-2 px-1">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">HTML Output</label>
            <button onClick={copy} className="text-primary-600 text-xs font-bold flex items-center gap-1">
              {isCopied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
              {isCopied ? "Copied!" : "Copy HTML"}
            </button>
          </div>
          <pre className="w-full p-6 bg-slate-900 rounded-2xl font-mono text-xs text-blue-200 overflow-auto max-h-64">
            <code>{output}</code>
          </pre>
        </div>
      )}
    </div>
  );
}
