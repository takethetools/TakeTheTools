"use client";

import { useState } from "react";
<<<<<<< HEAD
import FileUpload from "./FileUpload";
import { Download, Trash2, FileText, Loader2, Check, X } from "lucide-react";
=======
import { Upload, Download, Trash2, FileText, Loader2, Check, X } from "lucide-react";
>>>>>>> d366566fdaff0e02dbc3205770509d5194ddbac9
import { cn } from "@/lib/utils";
import { PDFDocument } from "pdf-lib";
import * as pdfjsLib from "pdfjs-dist";

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;

export default function DeletePDFPagesTool() {
  const [file, setFile] = useState<File | null>(null);
  const [pages, setPages] = useState<{ id: number; selected: boolean; preview: string }[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDone, setIsDone] = useState(false);

<<<<<<< HEAD
  const onFilesSelected = async (files: File[]) => {
    const uploadedFile = files[0];
=======
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
>>>>>>> d366566fdaff0e02dbc3205770509d5194ddbac9
    if (uploadedFile) {
      setFile(uploadedFile);
      setIsProcessing(true);
      
      const arrayBuffer = await uploadedFile.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      
      const newPages = [];
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 0.3 });
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        await page.render({ canvasContext: context!, viewport }).promise;
        newPages.push({ id: i, selected: false, preview: canvas.toDataURL() });
      }
      setPages(newPages);
      setIsProcessing(false);
    }
  };

  const togglePage = (id: number) => {
    setPages(prev => prev.map(p => p.id === id ? { ...p, selected: !p.selected } : p));
  };

  const downloadNewPdf = async () => {
    if (!file) return;
    const pagesToDelete = pages.filter(p => p.selected).map(p => p.id - 1);
    if (pagesToDelete.length === 0) return alert("Please select pages to delete.");
    if (pagesToDelete.length === pages.length) return alert("Cannot delete all pages.");

    setIsProcessing(true);
    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer);
    
    // Sort indices in descending order to avoid shift issues
    const sortedIndices = [...pagesToDelete].sort((a, b) => b - a);
    sortedIndices.forEach(index => pdfDoc.removePage(index));
    
    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes as any], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `updated-${file.name}`;
    link.click();
    
    setIsProcessing(false);
    setIsDone(true);
  };

  return (
    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-8">
      {!file ? (
<<<<<<< HEAD
        <FileUpload onFilesSelected={onFilesSelected} accept={{ "application/pdf": [".pdf"] }} multiple={false} />
=======
        <label className="border-2 border-dashed border-slate-200 rounded-3xl p-20 flex flex-col items-center justify-center gap-4 cursor-pointer hover:bg-slate-50 transition-colors">
          <input type="file" accept="application/pdf" onChange={handleUpload} className="hidden" />
          <Upload className="w-12 h-12 text-slate-300" />
          <p className="font-bold text-slate-700">Upload PDF to remove pages</p>
        </label>
>>>>>>> d366566fdaff0e02dbc3205770509d5194ddbac9
      ) : (
        <div className="space-y-8">
          <div className="flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-md py-4 z-10 border-b border-slate-100">
             <div className="flex items-center gap-2 text-primary-600 font-bold">
                <Trash2 className="w-5 h-5" />
                {pages.filter(p => p.selected).length} pages selected for deletion
             </div>
             <button 
               onClick={downloadNewPdf}
               disabled={pages.filter(p => p.selected).length === 0 || isProcessing}
               className="px-6 py-2 bg-red-600 text-white rounded-xl font-bold text-sm flex items-center gap-2 shadow-lg shadow-red-500/20 disabled:opacity-50"
             >
               {isProcessing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
               Remove & Download
             </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {pages.map((p) => (
              <div 
                key={p.id} 
                onClick={() => togglePage(p.id)}
                className={cn(
                  "relative aspect-[3/4] bg-slate-50 border-4 rounded-2xl overflow-hidden cursor-pointer transition-all hover:scale-105",
                  p.selected ? "border-red-500" : "border-slate-100"
                )}
              >
                <img src={p.preview} className="w-full h-full object-cover" alt={`Page ${p.id}`} />
                {p.selected && (
                  <div className="absolute inset-0 bg-red-500/20 flex items-center justify-center">
                    <div className="bg-red-500 text-white p-2 rounded-full shadow-lg">
                      <X className="w-6 h-6" />
                    </div>
                  </div>
                )}
                <div className="absolute bottom-2 left-2 bg-slate-900/50 text-white text-[10px] font-bold px-2 py-1 rounded-md backdrop-blur-md">
                   Page {p.id}
                </div>
              </div>
            ))}
          </div>

          {isDone && (
            <div className="bg-green-50 border border-green-100 p-4 rounded-2xl flex items-center justify-between">
              <span className="text-green-700 font-bold flex items-center gap-2"><Check className="w-5 h-5" /> Success</span>
              <button onClick={() => {setFile(null); setIsDone(false);}} className="text-sm font-bold text-green-700">Clear</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
