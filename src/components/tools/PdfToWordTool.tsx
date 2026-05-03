"use client";

import { useState } from "react";
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
    </div>
  );
}
