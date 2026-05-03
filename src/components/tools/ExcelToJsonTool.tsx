"use client";
import FileUpload from "./FileUpload";

import { useState, useCallback } from "react";
import { FileUp, Zap, Copy, Check, Download, Table } from "lucide-react";

export default function ExcelToJsonTool() {
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const processFile = useCallback(async (file: File) => {
    setError("");
    setOutput("");
    setFileName(file.name);
    setIsProcessing(true);

    try {
      const XLSX = await import("xlsx");
      const buffer = await file.arrayBuffer();
      const wb = XLSX.read(buffer, { type: "array" });
      const sheetName = wb.SheetNames[0];
      const ws = wb.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(ws);
      setOutput(JSON.stringify(json, null, 2));
    } catch (e: any) {
      setError("Error reading file: " + (e.message || "Invalid format"));
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) processFile(file);
  };

  const onFilesSelected = (files: File[]) => {
    if (files.length > 0) processFile(files[0]);
  };

  const copy = () => {
    navigator.clipboard.writeText(output);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const download = () => {
    const blob = new Blob([output], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName.replace(/\.\w+$/, "") + ".json";
    a.click();
  };

  return (
    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-8">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600">
          <Table className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900">Excel to JSON Converter</h3>
          <p className="text-sm text-slate-500">Convert .xlsx and .xls spreadsheets to JSON</p>
        </div>
      </div>

      <div
        onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-3xl p-12 text-center transition-all cursor-pointer ${isDragging ? "border-primary-400 bg-primary-50" : "border-slate-200 hover:border-primary-300 hover:bg-slate-50"}`}
        onClick={() => document.getElementById("excel-input")?.click()}
      >
        <input id="excel-input" type="file" accept=".xlsx,.xls,.csv" className="hidden" onChange={(e) => e.target.files && processFile(e.target.files[0])} />
        <FileUp className="w-10 h-10 text-slate-400 mx-auto mb-4" />
        <p className="font-bold text-slate-700">Drop Excel file here or click to upload</p>
        <p className="text-sm text-slate-400 mt-2">Supports .xlsx, .xls, .csv</p>
        {fileName && <p className="text-sm text-primary-600 font-bold mt-3">📄 {fileName}</p>}
      </div>

      {isProcessing && (
        <div className="flex items-center justify-center gap-3 py-4">
          <div className="w-6 h-6 border-2 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
          <span className="text-slate-500 font-medium">Converting...</span>
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-50 border border-red-100 rounded-2xl text-sm text-red-600 font-medium">{error}</div>
      )}

      {output && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">JSON Output ({output.length.toLocaleString()} chars)</span>
            <div className="flex gap-3">
              <button onClick={copy} className="text-primary-600 text-xs font-bold flex items-center gap-1">
                {isCopied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                {isCopied ? "Copied!" : "Copy"}
              </button>
              <button onClick={download} className="text-slate-500 text-xs font-bold flex items-center gap-1">
                <Download className="w-3 h-3" /> Download JSON
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
