"use client";
import { useState } from "react";
import FileUpload from "./FileUpload";
import { Table, ExternalLink, AlertCircle, RefreshCw } from "lucide-react";

export default function PdfToExcelTool() {
  const [file, setFile] = useState<File | null>(null);

  const TOOLS = [
    { name: "ilovepdf.com — PDF to Excel", url: "https://www.ilovepdf.com/pdf_to_excel", note: "Free, no sign-up for small files" },
    { name: "smallpdf.com — PDF to Excel", url: "https://smallpdf.com/pdf-to-excel", note: "2 conversions/day free" },
    { name: "Adobe Acrobat Online", url: "https://www.adobe.com/acrobat/online/pdf-to-excel.html", note: "Free with sign-in" },
  ];

  return (
    <div className="space-y-6">
      {!file ? (
        <FileUpload onFilesSelected={f => f.length && setFile(f[0])} accept={{ "application/pdf": [".pdf"] }} multiple={false} />
      ) : (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-green-600">
                <Table className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-slate-900 truncate">{file.name}</p>
                <p className="text-sm text-slate-400">{(file.size / 1024).toFixed(1)} KB</p>
              </div>
              <button onClick={() => setFile(null)} className="text-slate-400 hover:text-slate-600">
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
            <div className="p-4 bg-amber-50 border border-amber-100 rounded-2xl flex gap-3 mb-6">
              <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-amber-700">PDF to Excel requires server-side table extraction (browser JS cannot reliably parse PDF table structures). Use one of these trusted free services:</p>
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
