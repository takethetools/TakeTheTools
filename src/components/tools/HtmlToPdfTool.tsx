"use client";

import { useState } from "react";
import { Code, Download, Eye, Copy, Check } from "lucide-react";

const SAMPLE_HTML = `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; padding: 40px; color: #333; }
    h1 { color: #3B82F6; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px; }
    table { width: 100%; border-collapse: collapse; margin: 20px 0; }
    th, td { border: 1px solid #e5e7eb; padding: 10px; text-align: left; }
    th { background: #f8fafc; font-weight: bold; }
  </style>
</head>
<body>
  <h1>My Report</h1>
  <p>This HTML document will be converted to PDF using your browser's print function.</p>
  <table>
    <tr><th>Item</th><th>Value</th></tr>
    <tr><td>Revenue</td><td>$12,500</td></tr>
    <tr><td>Expenses</td><td>$8,200</td></tr>
    <tr><td>Profit</td><td>$4,300</td></tr>
  </table>
</body>
</html>`;

export default function HtmlToPdfTool() {
  const [html, setHtml] = useState(SAMPLE_HTML);
  const [preview, setPreview] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const downloadPdf = () => {
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const win = window.open(url, "_blank");
    if (win) {
      win.onload = () => setTimeout(() => win.print(), 500);
    }
  };

  const copyHtml = () => {
    navigator.clipboard.writeText(html);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600">
          <Code className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900">HTML to PDF Converter</h3>
          <p className="text-sm text-slate-500">Convert HTML code to a PDF document</p>
        </div>
      </div>

      <div className="flex gap-2">
        <button onClick={() => setPreview(false)}
          className={`flex-1 py-2 rounded-xl font-bold text-sm transition-colors ${!preview ? "bg-primary-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
          {"</>"}  Edit HTML
        </button>
        <button onClick={() => setPreview(true)}
          className={`flex-1 py-2 rounded-xl font-bold text-sm transition-colors ${preview ? "bg-primary-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
          <Eye className="w-4 h-4 inline mr-1" />Preview
        </button>
      </div>

      {!preview ? (
        <textarea value={html} onChange={(e) => setHtml(e.target.value)}
          className="w-full h-72 p-5 bg-slate-900 text-blue-200 border border-slate-700 rounded-2xl font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary-300"
        />
      ) : (
        <iframe srcDoc={html} title="HTML Preview"
          className="w-full h-72 rounded-2xl border border-slate-200 bg-white"
          sandbox="allow-same-origin"
        />
      )}

      <div className="flex gap-3">
        <button onClick={downloadPdf}
          className="flex-1 py-4 bg-primary-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-primary-700 transition-colors">
          <Download className="w-5 h-5" /> Convert to PDF
        </button>
        <button onClick={copyHtml}
          className="px-6 py-4 bg-slate-100 text-slate-700 rounded-2xl font-bold hover:bg-slate-200 transition-colors flex items-center gap-2">
          {isCopied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
          {isCopied ? "Copied!" : "Copy"}
        </button>
      </div>

      <p className="text-xs text-slate-400 text-center">
        Click "Convert to PDF" → browser print dialog opens → choose "Save as PDF"
      </p>
    </div>
  );
}
