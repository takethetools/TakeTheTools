"use client";

import { useState } from "react";
import FileUpload from "./FileUpload";
import { Download, File as FileIcon, Loader2, RefreshCw, Scissors } from "lucide-react";
import { PDFDocument } from "pdf-lib";
import confetti from "canvas-confetti";

interface SplitResult {
  name: string;
  url: string;
}

export default function SplitPdfTool() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [results, setResults] = useState<SplitResult[]>([]);
  const [pageCount, setPageCount] = useState(0);

  const onFilesSelected = async (files: File[]) => {
    if (files.length > 0) {
      const f = files[0];
      setFile(f);
      setResults([]);
      
      try {
        const arrayBuffer = await f.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        setPageCount(pdf.getPageCount());
      } catch {
        alert("Could not read PDF. Please try again.");
        setFile(null);
      }
    }
  };

  const splitPdf = async () => {
    if (!file) return;
    setIsProcessing(true);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await PDFDocument.load(arrayBuffer);
      const count = pdf.getPageCount();
      const newResults: SplitResult[] = [];

      for (let i = 0; i < count; i++) {
        const newPdf = await PDFDocument.create();
        const [copiedPage] = await newPdf.copyPages(pdf, [i]);
        newPdf.addPage(copiedPage);
        const bytes = await newPdf.save();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const blob = new Blob([bytes as any], { type: "application/pdf" });
        newResults.push({
          name: `Page ${i + 1}.pdf`,
          url: URL.createObjectURL(blob)
        });
      }

      setResults(newResults);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#ef4444", "#dc2626"]
      });
    } catch (e) {
      console.error(e);
      alert("Error splitting PDF.");
    } finally {
      setIsProcessing(false);
    }
  };

  const reset = () => {
    setFile(null);
    setResults([]);
    setPageCount(0);
  };

  return (
    <div className="space-y-8">
      {!file ? (
        <FileUpload 
          onFilesSelected={onFilesSelected} 
          accept={{ "application/pdf": [".pdf"] }}
          maxFiles={1}
        />
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
          {/* Header */}
          <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
            <div>
              <h3 className="font-bold text-slate-900">{file.name}</h3>
              <p className="text-sm text-slate-500">{pageCount} pages detected</p>
            </div>
            <button onClick={reset} className="p-2 hover:bg-slate-200 rounded-lg text-slate-500 transition-colors">
              <RefreshCw className="w-5 h-5" />
            </button>
          </div>

          <div className="p-12 flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 bg-red-50 rounded-2xl flex items-center justify-center text-red-500 mb-6">
              <Scissors className="w-10 h-10" />
            </div>

            {results.length === 0 ? (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-slate-900">Separate Every Page</h3>
                <p className="text-slate-500 max-w-sm">Every page of this PDF will be converted into a separate PDF document.</p>
                <button 
                  onClick={splitPdf}
                  disabled={isProcessing}
                  className="px-10 py-4 bg-red-600 text-white rounded-xl font-bold shadow-lg hover:bg-red-700 transition-all flex items-center gap-2 group mx-auto"
                >
                  {isProcessing ? <Loader2 className="w-5 h-5 animate-spin" /> : <Scissors className="w-5 h-5" />}
                  {isProcessing ? "Processing..." : "Split PDF Now"}
                </button>
              </div>
            ) : (
              <div className="w-full space-y-4">
                <div className="text-left mb-6">
                  <h4 className="font-bold text-slate-900 mb-1">Your split files are ready:</h4>
                  <p className="text-sm text-slate-500">Download each page independently</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[300px] overflow-y-auto pr-2">
                  {results.map((res, i) => (
                    <a 
                      key={i}
                      href={res.url}
                      download={res.name}
                      className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-xl hover:border-primary-200 hover:bg-white transition-all group"
                    >
                      <div className="flex items-center gap-3">
                        <FileIcon className="w-4 h-4 text-red-500" />
                        <span className="text-sm font-bold text-slate-700">{res.name}</span>
                      </div>
                      <Download className="w-4 h-4 text-slate-300 group-hover:text-primary-600" />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
