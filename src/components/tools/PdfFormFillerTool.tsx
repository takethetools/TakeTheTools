"use client";
import { useState } from "react";
import FileUpload from "./FileUpload";
import { FileText, Download, Loader2, RefreshCw, AlertCircle, ExternalLink } from "lucide-react";

export default function PdfFormFillerTool() {
  const [file, setFile] = useState<File | null>(null);
  const [fields, setFields] = useState<{ name: string; value: string }[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const TOOLS = [
    { name: "Fill.io — PDF Form Filler", url: "https://fill.io", note: "Free online form filler" },
    { name: "PDFescape.com", url: "https://www.pdfescape.com", note: "Free for files under 10MB / 100 pages" },
    { name: "DocHub.com", url: "https://dochub.com", note: "Free tier with sign-in" },
  ];

  const onFilesSelected = async (files: File[]) => {
    if (!files.length) return;
    setFile(files[0]);
    setFields([
      { name: "Full Name", value: "" },
      { name: "Date", value: "" },
      { name: "Signature", value: "" },
    ]);
  };

  return (
    <div className="space-y-6">
      {!file ? (
        <FileUpload onFilesSelected={onFilesSelected} accept={{ "application/pdf": [".pdf"] }} multiple={false} />
      ) : (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600">
                <FileText className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-slate-900 truncate">{file.name}</p>
                <p className="text-sm text-slate-400">{(file.size / 1024).toFixed(1)} KB</p>
              </div>
              <button onClick={() => setFile(null)} className="text-slate-400 hover:text-slate-600"><RefreshCw className="w-4 h-4" /></button>
            </div>

            <div className="p-4 bg-amber-50 border border-amber-100 rounded-2xl flex gap-3">
              <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-amber-700">Filling PDF form fields requires reading the PDF's AcroForm structure. Use one of these free services that support this natively:</p>
            </div>

            <div className="space-y-3">
              {TOOLS.map(t => (
                <a key={t.name} href={t.url} target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 rounded-2xl border border-slate-100 transition-all group">
                  <div>
                    <p className="font-bold text-slate-900 text-sm group-hover:text-primary-600 transition-colors">{t.name}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{t.note}</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-primary-600 flex-shrink-0" />
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
