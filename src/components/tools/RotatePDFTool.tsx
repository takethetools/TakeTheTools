"use client";

import { useState, useRef } from "react";
import { Upload, Download, RotateCw, FileText, Loader2, Check, RefreshCw } from "lucide-react";
import { PDFDocument, degrees } from "pdf-lib";
import * as pdfjsLib from "pdfjs-dist";

// Set worker source for PDF.js
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;

export default function RotatePDFTool() {
  const [file, setFile] = useState<File | null>(null);
  const [pages, setPages] = useState<{ id: number; rotation: number; preview: string }[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      setIsProcessing(true);
      
      const arrayBuffer = await uploadedFile.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const numPages = pdf.numPages;
      
      const newPages = [];
      for (let i = 1; i <= numPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 0.3 });
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        
        await page.render({ canvasContext: context!, viewport }).promise;
        newPages.push({
          id: i,
          rotation: 0,
          preview: canvas.toDataURL()
        });
      }
      setPages(newPages);
      setIsProcessing(false);
    }
  };

  const rotatePage = (id: number) => {
    setPages(prev => prev.map(p => 
      p.id === id ? { ...p, rotation: (p.rotation + 90) % 360 } : p
    ));
  };

  const rotateAll = () => {
    setPages(prev => prev.map(p => ({ ...p, rotation: (p.rotation + 90) % 360 })));
  };

  const downloadRotated = async () => {
    if (!file) return;
    setIsProcessing(true);
    
    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer);
    const pdfPages = pdfDoc.getPages();
    
    pages.forEach((p, i) => {
      if (p.rotation !== 0) {
        const page = pdfPages[i];
        const currentRotation = page.getRotation().angle;
        page.setRotation(degrees(currentRotation + p.rotation));
      }
    });
    
    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes as any], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `rotated-${file.name}`;
    link.click();
    
    setIsProcessing(false);
    setIsDone(true);
  };

  return (
    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-8">
      {!file ? (
        <label className="border-2 border-dashed border-slate-200 rounded-3xl p-20 flex flex-col items-center justify-center gap-4 cursor-pointer hover:bg-slate-50 transition-colors">
          <input type="file" accept="application/pdf" onChange={handleUpload} className="hidden" />
          <Upload className="w-12 h-12 text-slate-300" />
          <div className="text-center">
            <p className="font-bold text-slate-700">Upload PDF to rotate pages</p>
            <p className="text-sm text-slate-400">All processing is done in your browser</p>
          </div>
        </label>
      ) : (
        <div className="space-y-8">
          <div className="flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-md py-4 z-10 border-b border-slate-100">
             <div className="flex items-center gap-4">
                <FileText className="w-6 h-6 text-primary-600" />
                <h3 className="font-bold text-slate-900 truncate max-w-[200px]">{file.name}</h3>
             </div>
             <div className="flex gap-3">
                <button onClick={rotateAll} className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl font-bold text-sm flex items-center gap-2">
                  <RotateCw className="w-4 h-4" /> Rotate All
                </button>
                <button 
                  onClick={downloadRotated} 
                  disabled={isProcessing}
                  className="px-6 py-2 bg-primary-600 text-white rounded-xl font-bold text-sm flex items-center gap-2 shadow-lg shadow-primary-500/20"
                >
                  {isProcessing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                  Download PDF
                </button>
             </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {pages.map((p) => (
              <div key={p.id} className="group relative space-y-2">
                <div 
                  className="aspect-[3/4] bg-slate-50 border border-slate-200 rounded-xl overflow-hidden shadow-sm transition-transform duration-300"
                  style={{ transform: `rotate(${p.rotation}deg)` }}
                >
                  <img src={p.preview} className="w-full h-full object-cover" alt={`Page ${p.id}`} />
                </div>
                <div className="flex items-center justify-between px-1">
                   <span className="text-xs font-bold text-slate-400">Page {p.id}</span>
                   <button 
                     onClick={() => rotatePage(p.id)}
                     className="w-8 h-8 bg-white border border-slate-100 rounded-lg flex items-center justify-center text-primary-600 hover:bg-primary-50 shadow-sm"
                   >
                     <RotateCw className="w-4 h-4" />
                   </button>
                </div>
              </div>
            ))}
          </div>

          {isDone && (
            <div className="bg-green-50 border border-green-100 p-4 rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-3 text-green-700 font-bold">
                <Check className="w-5 h-5" /> PDF saved successfully!
              </div>
              <button onClick={() => {setFile(null); setIsDone(false);}} className="text-sm font-bold text-green-700 hover:underline">Start over</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
