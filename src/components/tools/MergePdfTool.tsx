"use client";

import { useState } from "react";
import FileUpload from "./FileUpload";
import { Download, File as FileIcon, Loader2, RefreshCw, X, Combine, ArrowUp, ArrowDown } from "lucide-react";
import { PDFDocument } from "pdf-lib";
import confetti from "canvas-confetti";
import { cn } from "@/lib/utils";

interface PdfFile {
  file: File;
  id: string;
}

export default function MergePdfTool() {
  const [files, setFiles] = useState<PdfFile[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultUrl, setResultUrl] = useState<string | null>(null);

  const onFilesSelected = (newFiles: File[]) => {
    const pdfs: PdfFile[] = newFiles.map(f => ({
      file: f,
      id: Math.random().toString(36).substring(7),
    }));
    setFiles(prev => [...prev, ...pdfs]);
    setResultUrl(null);
  };

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
    setResultUrl(null);
  };

<<<<<<< HEAD
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const onDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const onDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;
    
    const newFiles = [...files];
    const draggedItem = newFiles[draggedIndex];
    newFiles.splice(draggedIndex, 1);
    newFiles.splice(index, 0, draggedItem);
    setDraggedIndex(index);
    setFiles(newFiles);
  };

  const onDragEnd = () => {
    setDraggedIndex(null);
=======
  const moveFile = (index: number, direction: "up" | "down") => {
    const newFiles = [...files];
    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex >= 0 && newIndex < newFiles.length) {
      [newFiles[index], newFiles[newIndex]] = [newFiles[newIndex], newFiles[index]];
      setFiles(newFiles);
    }
>>>>>>> d366566fdaff0e02dbc3205770509d5194ddbac9
  };

  const mergePdfs = async () => {
    if (files.length < 2) return;
    setIsProcessing(true);
    try {
      const mergedPdf = await PDFDocument.create();

      for (const pdfFile of files) {
        const arrayBuffer = await pdfFile.file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        copiedPages.forEach((page: any) => mergedPdf.addPage(page));
      }

      const mergedPdfBytes = await mergedPdf.save();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const blob = new Blob([mergedPdfBytes as any], { type: "application/pdf" });
      setResultUrl(URL.createObjectURL(blob));

      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#ef4444", "#f87171"]
      });
    } catch (e) {
      console.error(e);
      alert("Error merging PDFs. Please check if files are valid.");
    } finally {
      setIsProcessing(false);
    }
  };

  const reset = () => {
    setFiles([]);
    setResultUrl(null);
  };

  return (
    <div className="space-y-8">
      {files.length === 0 ? (
        <FileUpload
          onFilesSelected={onFilesSelected}
          accept={{ "application/pdf": [".pdf"] }}
        />
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
          {/* Header */}
          <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
            <div>
              <h3 className="font-bold text-slate-900">PDF Queue ({files.length} files)</h3>
<<<<<<< HEAD
              <p className="text-sm text-slate-500">Drag to reorder files for the merged document</p>
=======
              <p className="text-sm text-slate-500">Arrange files in the order you want them merged</p>
>>>>>>> d366566fdaff0e02dbc3205770509d5194ddbac9
            </div>
            <button onClick={reset} className="p-2 hover:bg-slate-200 rounded-lg text-slate-500 transition-colors">
              <RefreshCw className="w-5 h-5" />
            </button>
          </div>

          {/* List */}
<<<<<<< HEAD
          <div className="max-h-[400px] overflow-y-auto p-2 space-y-2">
            {files.map((f, i) => (
              <div 
                key={f.id} 
                draggable
                onDragStart={() => onDragStart(i)}
                onDragOver={(e) => onDragOver(e, i)}
                onDragEnd={onDragEnd}
                className={cn(
                  "px-6 py-4 bg-white border border-slate-100 rounded-2xl flex items-center justify-between group transition-all cursor-grab active:cursor-grabbing",
                  draggedIndex === i ? "opacity-40 border-primary-500 border-dashed bg-primary-50" : "hover:border-primary-200 hover:shadow-md"
                )}
              >
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 flex items-center justify-center text-slate-300">
                    <Combine className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center text-red-500">
                    <FileIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900 truncate max-w-[200px]">{f.file.name}</p>
                    <p className="text-xs text-slate-400">{(f.file.size / 1024).toFixed(1)} KB • Page Order: {i+1}</p>
=======
          <div className="max-h-[400px] overflow-y-auto">
            {files.map((f, i) => (
              <div key={f.id} className="px-8 py-4 border-b border-slate-50 flex items-center justify-between group hover:bg-slate-50/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="flex flex-col gap-1">
                    <button
                      onClick={() => moveFile(i, "up")}
                      disabled={i === 0}
                      className="p-1 hover:bg-slate-200 rounded disabled:opacity-30"
                    >
                      <ArrowUp className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => moveFile(i, "down")}
                      disabled={i === files.length - 1}
                      className="p-1 hover:bg-slate-200 rounded disabled:opacity-30"
                    >
                      <ArrowDown className="w-3 h-3" />
                    </button>
                  </div>
                  <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center text-red-500">
                    <FileIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900 truncate max-w-[200px]">{f.file.name}</p>
                    <p className="text-xs text-slate-400">{(f.file.size / 1024).toFixed(1)} KB</p>
>>>>>>> d366566fdaff0e02dbc3205770509d5194ddbac9
                  </div>
                </div>

                <button onClick={() => removeFile(f.id)} className="p-2 text-slate-300 hover:text-red-500 transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="px-8 py-6 bg-slate-50 flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="text-sm text-slate-500">
              Files will be merged from top to bottom
            </div>
            <div className="flex gap-4 w-full md:w-auto">
              <input
                type="file"
                id="file-upload-input-more"
                className="hidden"
                accept=".pdf"
                multiple
                onChange={(e) => {
                  if (e.target.files) {
                    onFilesSelected(Array.from(e.target.files));
                    e.target.value = ""; // Reset to allow same file selection
                  }
                }}
              />
              <label
                htmlFor="file-upload-input-more"
                className="cursor-pointer px-6 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 font-bold hover:bg-slate-50 transition-all flex items-center gap-2 flex-grow justify-center"
              >
                Add More
              </label>

              {resultUrl ? (
                <a
                  href={resultUrl}
                  download="merged_document.pdf"
                  className="px-8 py-3 bg-green-600 text-white rounded-xl font-bold shadow-lg hover:bg-green-700 transition-all flex items-center gap-2 flex-grow justify-center"
                >
                  <Download className="w-5 h-5" /> Download Merged PDF
                </a>
              ) : (
                <button
                  onClick={mergePdfs}
                  disabled={isProcessing || files.length < 2}
                  className={cn(
                    "px-10 py-3 bg-red-600 text-white rounded-xl font-bold shadow-lg hover:bg-red-700 transition-all flex items-center gap-2 flex-grow justify-center",
                    (isProcessing || files.length < 2) && "opacity-50 cursor-not-allowed"
                  )}
                >
                  {isProcessing ? <Loader2 className="w-5 h-5 animate-spin" /> : <Combine className="w-5 h-5" />}
                  {isProcessing ? "Merging..." : "Merge PDF"}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
