"use client";

import { useState } from "react";
import FileUpload from "./FileUpload";
import { Lock, ExternalLink, AlertCircle, RefreshCw, FileText } from "lucide-react";

export default function PasswordProtectPDFTool() {
  const [file, setFile] = useState<File | null>(null);

  const TRUSTED_SERVICES = [
    { name: "ilovepdf.com — Protect PDF", url: "https://www.ilovepdf.com/protect-pdf", note: "Strong AES encryption, very reliable." },
    { name: "smallpdf.com — Password Protect", url: "https://smallpdf.com/protect-pdf", note: "Simple and secure browser-based upload." },
    { name: "Adobe Acrobat Online — Protect", url: "https://www.adobe.com/acrobat/online/password-protect-pdf.html", note: "Official Adobe security standards." },
  ];

  return (
    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-8 text-center">
      <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center text-primary-600 mx-auto">
        <Lock className="w-8 h-8" />
      </div>
      <div className="max-w-md mx-auto space-y-2">
        <h3 className="text-2xl font-bold text-slate-900">Password Protect PDF</h3>
        <p className="text-slate-500">Secure your sensitive documents with industry-standard encryption.</p>
      </div>

      {!file ? (
        <FileUpload onFilesSelected={f => f.length && setFile(f[0])} accept={{ "application/pdf": [".pdf"] }} multiple={false} />
      ) : (
        <div className="space-y-6 max-w-lg mx-auto text-left">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-slate-600">
                <FileText className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-slate-900 truncate">{file.name}</p>
                <p className="text-sm text-slate-400">{(file.size / 1024).toFixed(1)} KB</p>
              </div>
              <button onClick={() => setFile(null)} className="text-slate-400 hover:text-slate-600">
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
            
            <div className="p-4 bg-blue-50 border border-blue-100 rounded-2xl flex gap-3 mb-6">
              <AlertCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-blue-700">For maximum security, PDF encryption requires specialized server-side libraries to ensure the password cannot be easily bypassed. We recommend these trusted free services for secure encryption:</p>
            </div>

            <div className="space-y-3">
              {TRUSTED_SERVICES.map(t => (
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
