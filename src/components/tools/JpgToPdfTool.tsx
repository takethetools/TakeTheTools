"use client";

import { useState, useCallback } from "react";
import FileUpload from "./FileUpload";
import { Download, File as FileIcon, Loader2, RefreshCw, X, Plus, Files } from "lucide-react";
import { PDFDocument } from "pdf-lib";
import confetti from "canvas-confetti";
import { cn } from "@/lib/utils";

interface ImageFile {
  id: string;
  file: File;
  preview: string;
}

export default function JpgToPdfTool() {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultUrl, setResultUrl] = useState<string | null>(null);

  const onFilesSelected = (selectedFiles: File[]) => {
    const newImages = selectedFiles.map(file => ({
      id: Math.random().toString(36).substring(7),
      file,
      preview: URL.createObjectURL(file)
    }));
    setImages(prev => [...prev, ...newImages]);
    setResultUrl(null);
  };

  const removeImage = (id: string) => {
    setImages(prev => prev.filter(img => img.id !== id));
    setResultUrl(null);
  };

  const convertToPdf = async () => {
    if (images.length === 0) return;
    setIsProcessing(true);

    try {
      const pdfDoc = await PDFDocument.create();

      for (const img of images) {
        const imageBytes = await img.file.arrayBuffer();
        let pdfImage;
        
        if (img.file.type === "image/jpeg" || img.file.type === "image/jpg") {
          pdfImage = await pdfDoc.embedJpg(imageBytes);
        } else if (img.file.type === "image/png") {
          pdfImage = await pdfDoc.embedPng(imageBytes);
        } else {
          continue; // Skip unsupported
        }

        const page = pdfDoc.addPage([pdfImage.width, pdfImage.height]);
        page.drawImage(pdfImage, {
          x: 0,
          y: 0,
          width: pdfImage.width,
          height: pdfImage.height,
        });
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes as any], { type: "application/pdf" });
      setResultUrl(URL.createObjectURL(blob));
      
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (error) {
      console.error("PDF conversion failed:", error);
      alert("Failed to create PDF. Please ensure all files are valid images.");
    } finally {
      setIsProcessing(false);
    }
  };

  const clear = () => {
    setImages([]);
    setResultUrl(null);
  };

  return (
    <div className="space-y-6">
      {!images.length ? (
        <FileUpload 
          onFilesSelected={onFilesSelected} 
          accept={{ 'image/jpeg': ['.jpg', '.jpeg'], 'image/png': ['.png'] }}
          multiple={true}
        />
      ) : (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 flex items-center gap-2">
                <Files className="w-5 h-5 text-primary-600" />
                Selected Images ({images.length})
              </h3>
              <button 
                onClick={clear}
                className="text-xs font-bold text-slate-400 hover:text-red-500 transition-colors"
                disabled={isProcessing}
              >
                Clear All
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {images.map((img) => (
                <div key={img.id} className="relative group aspect-square rounded-xl overflow-hidden border border-slate-100 bg-slate-50">
                  <img src={img.preview} alt="Preview" className="w-full h-full object-cover" />
                  <button 
                    onClick={() => removeImage(img.id)}
                    className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
              <label 
                htmlFor="file-upload-input"
                className="aspect-square flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-xl hover:border-primary-400 hover:bg-primary-50 transition-all cursor-pointer group"
              >
                <Plus className="w-6 h-6 text-slate-400 group-hover:text-primary-600 mb-1" />
                <span className="text-[10px] font-bold text-slate-400 group-hover:text-primary-600 uppercase">Add More</span>
              </label>
            </div>
            
            <div className="hidden">
              <FileUpload onFilesSelected={onFilesSelected} multiple={true} />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-slate-50">
              {resultUrl ? (
                <>
                  <a 
                    href={resultUrl} 
                    download="images-to-pdf.pdf"
                    className="flex-grow flex items-center justify-center gap-2 px-8 py-4 bg-green-600 text-white rounded-xl font-bold shadow-lg shadow-green-500/20 hover:bg-green-700 transition-all"
                  >
                    <Download className="w-5 h-5" /> Download PDF
                  </a>
                  <button 
                    onClick={clear}
                    className="px-8 py-4 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200 transition-all flex items-center justify-center gap-2"
                  >
                    <RefreshCw className="w-5 h-5" /> Start Over
                  </button>
                </>
              ) : (
                <button 
                  onClick={convertToPdf}
                  disabled={isProcessing}
                  className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-primary-600 text-white rounded-xl font-bold shadow-lg shadow-primary-500/20 hover:bg-primary-700 transition-all disabled:opacity-50"
                >
                  {isProcessing ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <FileIcon className="w-5 h-5" />
                  )}
                  {isProcessing ? "Generating PDF..." : "Convert to PDF"}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
