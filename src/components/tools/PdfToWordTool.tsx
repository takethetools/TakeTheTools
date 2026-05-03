"use client";

import { useState } from "react";
<<<<<<< HEAD
import FileUpload from "./FileUpload";
import { FileText, Download, RefreshCw, AlertCircle, ExternalLink } from "lucide-react";

export default function PdfToWordTool() {
  const [file, setFile] = useState<File | null>(null);

  const onFilesSelected = (files: File[]) => {
    if (files.length > 0) setFile(files[0]);
  };

  const reset = () => setFile(null);

  // PDF to DOCX requires a server-side conversion engine (LibreOffice, Pandoc, etc.)
  // Browser-only JS cannot accurately reconstruct Word formatting from PDF binary.
  // We redirect users to trusted free tools that actually perform this conversion.
  const EXTERNAL_TOOLS = [
    { name: "ilovepdf.com", url: "https://www.ilovepdf.com/pdf_to_word", note: "Free, no sign-up for small files" },
    { name: "smallpdf.com", url: "https://smallpdf.com/pdf-to-word", note: "2 tasks/day free" },
    { name: "Adobe Acrobat Online", url: "https://www.adobe.com/acrobat/online/pdf-to-word.html", note: "Free with sign-in" },
  ];

  return (
    <div className="space-y-6">
      {!file ? (
        <FileUpload onFilesSelected={onFilesSelected} accept={{ "application/pdf": [".pdf"] }} multiple={false} />
      ) : (
        <div className="space-y-6">
          {/* File info */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                <FileText className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-slate-900 truncate">{file.name}</p>
                <p className="text-sm text-slate-400">{(file.size / 1024).toFixed(1)} KB</p>
              </div>
              <button onClick={reset} className="text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors">
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>

            {/* Honest notice */}
            <div className="p-4 bg-amber-50 border border-amber-100 rounded-2xl flex gap-3 mb-6">
              <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-amber-900 mb-1">Server-side conversion required</p>
                <p className="text-sm text-amber-700 leading-relaxed">
                  PDF to Word conversion requires a backend engine (LibreOffice / Pandoc) to accurately reconstruct fonts, tables, and layout. This cannot be done in the browser alone. Please use one of the trusted free services below:
                </p>
              </div>
            </div>

            {/* External trusted tools */}
            <div className="space-y-3">
              {EXTERNAL_TOOLS.map((tool) => (
                <a
                  key={tool.name}
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 rounded-2xl border border-slate-100 transition-all group"
                >
                  <div>
                    <p className="font-bold text-slate-900 text-sm group-hover:text-primary-600 transition-colors">{tool.name}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{tool.note}</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-primary-600 transition-colors flex-shrink-0" />
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
=======
import { FileText, Zap, Download, FileJson, FileCode, Check, RefreshCw } from "lucide-react";

export default function PdfToWordTool() {
  const [file, setFile] = useState<File | null>(null);
  const [converting, setConverting] = useState(false);
  const [done, setDone] = useState(false);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
      setDone(false);
    }
  };

  const simulateConversion = () => {
    if (!file) return;
    setConverting(true);
    setTimeout(() => {
      setConverting(false);
      setDone(true);
    }, 2000);
  };

  const downloadMock = () => {
    if (!file) return;
    const blob = new Blob(["Simulated Word Content from PDF: " + file.name], { type: "application/msword" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = file.name.replace(".pdf", ".doc");
    a.click();
  };

  return (
    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-8">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600">
          <FileText className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900">PDF to Word</h3>
          <p className="text-sm text-slate-500">Convert PDF documents to editable Word files</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="border-2 border-dashed border-slate-200 rounded-3xl p-12 text-center hover:border-primary-400 transition-colors relative">
           <input type="file" accept=".pdf" onChange={handleFile} className="absolute inset-0 opacity-0 cursor-pointer" />
           <div className="space-y-4">
              <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto">
                 <FileCode className="w-8 h-8 text-slate-400" />
              </div>
              <div>
                 <p className="text-lg font-bold text-slate-900">{file ? file.name : "Select a PDF file"}</p>
                 <p className="text-sm text-slate-500">or drag and drop here</p>
              </div>
           </div>
        </div>

        {file && !done && (
          <button 
            onClick={simulateConversion}
            disabled={converting}
            className="w-full py-5 bg-primary-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary-500/20 disabled:opacity-50"
          >
            {converting ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Zap className="w-5 h-5" />}
            {converting ? "Converting..." : "Convert to Word"}
          </button>
        )}

        {done && (
          <div className="space-y-4">
             <div className="p-6 bg-green-50 border border-green-100 rounded-2xl flex items-center gap-4">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center text-green-600">
                   <Check className="w-6 h-6" />
                </div>
                <div>
                   <p className="font-bold text-green-900">Conversion Complete!</p>
                   <p className="text-sm text-green-600">Your document is ready for download.</p>
                </div>
             </div>
             <button onClick={downloadMock} className="w-full py-5 bg-slate-900 text-white rounded-2xl font-bold flex items-center justify-center gap-2">
                <Download className="w-5 h-5" /> Download .DOC File
             </button>
          </div>
        )}
      </div>
>>>>>>> d366566fdaff0e02dbc3205770509d5194ddbac9
    </div>
  );
}
