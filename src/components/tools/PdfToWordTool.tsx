"use client";

import { useState } from "react";
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
    </div>
  );
}
