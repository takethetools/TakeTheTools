"use client";

import { useState } from "react";
import FileUpload from "./FileUpload";
import { Download, Check, File as FileIcon, Loader2, AlertCircle, RefreshCw, X } from "lucide-react";
import JSZip from "jszip";
import confetti from "canvas-confetti";
import { cn } from "@/lib/utils";

interface ProcessedFile {
  file: File;
  status: "idle" | "processing" | "completed" | "error";
  resultUrl?: string;
  error?: string;
}

export default function WebPToPngTool() {
  const [files, setFiles] = useState<ProcessedFile[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const onFilesSelected = (newFiles: File[]) => {
    const processed: ProcessedFile[] = newFiles.map(f => ({
      file: f,
      status: "idle",
    }));
    setFiles(prev => [...prev, ...processed]);
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const convertFile = async (processedFile: ProcessedFile): Promise<ProcessedFile> => {
    return new Promise((resolve) => {
      const img = new Image();
      const reader = new FileReader();

      reader.onload = (e) => {
        img.src = e.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext("2d");
          
          if (!ctx) {
            resolve({ ...processedFile, status: "error", error: "Canvas context failed" });
            return;
          }

          ctx.drawImage(img, 0, 0);
          const resultUrl = canvas.toDataURL("image/png");
          resolve({ ...processedFile, status: "completed", resultUrl });
        };
        img.onerror = () => {
          resolve({ ...processedFile, status: "error", error: "Failed to load image" });
        };
      };
      
      reader.onerror = () => {
        resolve({ ...processedFile, status: "error", error: "Failed to read file" });
      };

      reader.readAsDataURL(processedFile.file);
    });
  };

  const handleConvert = async () => {
    setIsProcessing(true);
    const updatedFiles = [...files];

    for (let i = 0; i < updatedFiles.length; i++) {
      if (updatedFiles[i].status !== "completed") {
        updatedFiles[i] = { ...updatedFiles[i], status: "processing" };
        setFiles([...updatedFiles]);
        
        const result = await convertFile(updatedFiles[i]);
        updatedFiles[i] = result;
        setFiles([...updatedFiles]);
      }
    }

    setIsProcessing(false);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#3b82f6", "#60a5fa", "#93c5fd"]
    });
  };

  const downloadAll = async () => {
    const zip = new JSZip();
    files.forEach((f, i) => {
      if (f.resultUrl) {
        const base64Data = f.resultUrl.split(",")[1];
        zip.file(f.file.name.replace(/\.[^/.]+$/, "") + ".png", base64Data, { base64: true });
      }
    });

    const content = await zip.generateAsync({ type: "blob" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(content);
    link.download = "global-tools-converted-pngs.zip";
    link.click();
  };

  const reset = () => {
    setFiles([]);
  };

  return (
    <div className="space-y-8">
      {files.length === 0 ? (
        <FileUpload 
          onFilesSelected={onFilesSelected} 
          accept={{ "image/webp": [".webp"] }}
        />
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
          {/* Header */}
          <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
            <div>
              <h3 className="font-bold text-slate-900">Queue ({files.length} files)</h3>
              <p className="text-sm text-slate-500">Ready for conversion</p>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={reset}
                className="p-2 hover:bg-slate-200 rounded-lg text-slate-500 transition-colors"
                title="Clear all"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* List */}
          <div className="max-h-[400px] overflow-y-auto">
            {files.map((f, i) => (
              <div key={i} className="px-8 py-4 border-b border-slate-50 flex items-center justify-between group hover:bg-slate-50/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400">
                    <FileIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900 truncate max-w-[200px]">{f.file.name}</p>
                    <p className="text-xs text-slate-400">{(f.file.size / 1024).toFixed(1)} KB</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  {f.status === "processing" && <Loader2 className="w-5 h-5 text-primary-600 animate-spin" />}
                  {f.status === "completed" && <Check className="w-5 h-5 text-green-500" />}
                  {f.status === "error" && <AlertCircle className="w-5 h-5 text-red-500" />}
                  
                  {f.status === "completed" && f.resultUrl && (
                    <a 
                      href={f.resultUrl} 
                      download={f.file.name.replace(/\.[^/.]+$/, "") + ".png"}
                      className="p-2 bg-primary-100 text-primary-600 rounded-lg hover:bg-primary-600 hover:text-white transition-all shadow-sm shadow-primary-500/10"
                    >
                      <Download className="w-4 h-4" />
                    </a>
                  )}
                  
                  {f.status === "idle" && (
                    <button 
                      onClick={() => removeFile(i)}
                      className="p-2 text-slate-300 hover:text-red-500 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="px-8 py-6 bg-slate-50 flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="text-sm text-slate-500">
              {files.filter(f => f.status === "completed").length} of {files.length} converted
            </div>
            <div className="flex gap-4 w-full md:w-auto">
              <FileUpload 
                onFilesSelected={onFilesSelected} 
                accept={{ "image/webp": [".webp"] }}
                className="hidden"
                id="add-more"
              />
              <label htmlFor="file-upload-input" className="cursor-pointer px-6 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 font-bold hover:bg-slate-50 transition-all flex items-center gap-2 flex-grow md:flex-grow-0 justify-center">
                Add More
              </label>
              
              {files.some(f => f.status === "completed") ? (
                <button 
                  onClick={downloadAll}
                  className="px-8 py-3 bg-green-600 text-white rounded-xl font-bold shadow-lg shadow-green-500/20 hover:bg-green-700 transition-all flex items-center gap-2 flex-grow md:flex-grow-0 justify-center"
                >
                  <Download className="w-5 h-5" /> Download All (.ZIP)
                </button>
              ) : (
                <button 
                  onClick={handleConvert}
                  disabled={isProcessing}
                  className={cn(
                    "px-10 py-3 bg-primary-600 text-white rounded-xl font-bold shadow-lg shadow-primary-500/20 hover:bg-primary-700 transition-all flex items-center gap-2 flex-grow md:flex-grow-0 justify-center",
                    isProcessing && "opacity-50 cursor-not-allowed"
                  )}
                >
                  {isProcessing ? <Loader2 className="w-5 h-5 animate-spin" /> : <RefreshCw className="w-5 h-5" />}
                  {isProcessing ? "Converting..." : "Convert All"}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
// Note: Changed the label htmlFor to 'file-upload-input' which should be added to FileUpload.tsx
