"use client";
<<<<<<< HEAD
import FileUpload from "./FileUpload";
=======
>>>>>>> d366566fdaff0e02dbc3205770509d5194ddbac9

import { useState, useCallback } from "react";
import { FileUp, Zap, Copy, Check, Download } from "lucide-react";

export default function WordToMarkdownTool() {
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
      const mammoth = await import("mammoth");
      const buffer = await file.arrayBuffer();
      const result = await mammoth.convertToHtml({ arrayBuffer: buffer });
      setOutput(result.value);
    } catch (e: any) {
      setError("Error converting file: " + (e.message || "Invalid .docx format"));
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

<<<<<<< HEAD
  const onFilesSelected = (files: File[]) => {
    if (files.length > 0) processFile(files[0]);
=======
  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
>>>>>>> d366566fdaff0e02dbc3205770509d5194ddbac9
  };

  const copy = () => {
    navigator.clipboard.writeText(output);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const download = () => {
    const blob = new Blob([output], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName.replace(/\.\w+$/, "") + ".md";
    a.click();
  };

  return (
    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-8">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600">
          <FileUp className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900">Word to Markdown Converter</h3>
          <p className="text-sm text-slate-500">Convert .docx files to clean Markdown</p>
        </div>
      </div>

      <div
        onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-3xl p-12 text-center transition-all cursor-pointer ${isDragging ? "border-primary-400 bg-primary-50" : "border-slate-200 hover:border-primary-300 hover:bg-slate-50"}`}
        onClick={() => document.getElementById("word-input")?.click()}
      >
<<<<<<< HEAD
        <input id="word-input" type="file" accept=".docx" className="hidden" onChange={(e) => e.target.files && processFile(e.target.files[0])} />
=======
        <input id="word-input" type="file" accept=".docx" className="hidden" onChange={handleFileInput} />
>>>>>>> d366566fdaff0e02dbc3205770509d5194ddbac9
        <FileUp className="w-10 h-10 text-slate-400 mx-auto mb-4" />
        <p className="font-bold text-slate-700">Drop your .docx file here or click to browse</p>
        <p className="text-sm text-slate-400 mt-2">Supports Microsoft Word .docx format</p>
        {fileName && <p className="text-sm text-primary-600 font-bold mt-3">📄 {fileName}</p>}
      </div>

      {isProcessing && (
        <div className="flex items-center justify-center gap-3 py-4">
          <div className="w-6 h-6 border-2 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
          <span className="text-slate-500 font-medium">Converting document...</span>
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-50 border border-red-100 rounded-2xl text-sm text-red-600 font-medium">{error}</div>
      )}

      {output && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Markdown Output</span>
            <div className="flex gap-3">
              <button onClick={copy} className="text-primary-600 text-xs font-bold flex items-center gap-1">
                {isCopied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                {isCopied ? "Copied!" : "Copy"}
              </button>
              <button onClick={download} className="text-slate-500 text-xs font-bold flex items-center gap-1">
                <Download className="w-3 h-3" /> Download .md
              </button>
            </div>
          </div>
          <textarea
            readOnly
            value={output}
            className="w-full h-80 p-5 bg-slate-900 rounded-2xl text-sm text-blue-100 font-mono resize-none"
          />
        </div>
      )}
    </div>
  );
}
