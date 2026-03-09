"use client";

import { useState } from "react";
import FileUpload from "./FileUpload";
import { Download, Check, File as FileIcon, Loader2, AlertCircle, RefreshCw, X, Maximize } from "lucide-react";
import JSZip from "jszip";
import confetti from "canvas-confetti";
import { cn } from "@/lib/utils";

interface ProcessedFile {
  file: File;
  status: "idle" | "processing" | "completed" | "error";
  resultUrl?: string;
  originalWidth?: number;
  originalHeight?: number;
}

export default function ImageResizerTool() {
  const [files, setFiles] = useState<ProcessedFile[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [width, setWidth] = useState(1920);
  const [height, setHeight] = useState(1080);
  const [maintainAspectRatio, setMaintainAspectRatio] = useState(true);

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

  const resizeFile = async (processedFile: ProcessedFile): Promise<ProcessedFile> => {
    return new Promise((resolve) => {
      const img = new Image();
      const reader = new FileReader();

      reader.onload = (e) => {
        img.src = e.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          
          let targetWidth = width;
          let targetHeight = height;

          if (maintainAspectRatio) {
            const ratio = img.width / img.height;
            if (width / height > ratio) {
              targetWidth = height * ratio;
            } else {
              targetHeight = width / ratio;
            }
          }

          canvas.width = targetWidth;
          canvas.height = targetHeight;
          const ctx = canvas.getContext("2d");
          
          if (!ctx) {
            resolve({ ...processedFile, status: "error" });
            return;
          }

          ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
          const resultUrl = canvas.toDataURL(processedFile.file.type);
          resolve({ 
            ...processedFile, 
            status: "completed", 
            resultUrl,
            originalWidth: img.width,
            originalHeight: img.height
          });
        };
      };
      reader.readAsDataURL(processedFile.file);
    });
  };

  const handleConvert = async () => {
    setIsProcessing(true);
    const updatedFiles = [...files];
    for (let i = 0; i < updatedFiles.length; i++) {
        updatedFiles[i] = { ...updatedFiles[i], status: "processing" };
        setFiles([...updatedFiles]);
        updatedFiles[i] = await resizeFile(updatedFiles[i]);
        setFiles([...updatedFiles]);
    }
    setIsProcessing(false);
    confetti();
  };

  const downloadAll = async () => {
    const zip = new JSZip();
    for (const f of files) {
      if (f.resultUrl) {
        const response = await fetch(f.resultUrl);
        const blob = await response.blob();
        zip.file(f.file.name, blob);
      }
    }
    const content = await zip.generateAsync({ type: "blob" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(content);
    link.download = "resized-images.zip";
    link.click();
  };

  return (
    <div className="space-y-8">
      {files.length === 0 ? (
        <FileUpload onFilesSelected={onFilesSelected} accept={{ "image/*": [".jpg", ".png", ".webp"] }} />
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm text-slate-800">
          <div className="px-8 py-6 border-b border-slate-100 bg-slate-50 flex flex-col md:flex-row gap-6 md:items-center justify-between">
            <div className="flex-grow space-y-4">
              <h3 className="font-bold">Resize Settings</h3>
              <div className="flex flex-wrap gap-4 items-center">
                <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-slate-200">
                  <span className="text-xs font-bold text-slate-400">W</span>
                  <input 
                    type="number" 
                    value={width} 
                    onChange={e => setWidth(parseInt(e.target.value))}
                    className="w-20 outline-none font-bold"
                  />
                </div>
                <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-slate-200">
                  <span className="text-xs font-bold text-slate-400">H</span>
                  <input 
                    type="number" 
                    value={height} 
                    onChange={e => setHeight(parseInt(e.target.value))}
                    className="w-20 outline-none font-bold"
                  />
                </div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={maintainAspectRatio} 
                    onChange={e => setMaintainAspectRatio(e.target.checked)}
                    className="w-4 h-4 rounded accent-primary-600"
                  />
                  <span className="text-sm font-medium">Keep Aspect Ratio</span>
                </label>
              </div>
            </div>
            <button onClick={() => setFiles([])} className="p-2 hover:bg-slate-200 rounded-lg text-slate-500 transition-colors self-end md:self-auto">
              <RefreshCw className="w-5 h-5" />
            </button>
          </div>

          <div className="max-h-[300px] overflow-y-auto">
            {files.map((f, i) => (
              <div key={i} className="px-8 py-4 border-b border-slate-50 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400"><FileIcon className="w-5 h-5" /></div>
                  <p className="text-sm font-bold truncate max-w-[200px]">{f.file.name}</p>
                </div>
                <div className="flex items-center gap-4">
                  {f.status === "completed" && <Check className="w-5 h-5 text-green-500" />}
                  {f.status === "processing" && <Loader2 className="w-5 h-5 animate-spin text-primary-600" />}
                  {f.status === "idle" && <button onClick={() => removeFile(i)}><X className="w-5 h-5 text-slate-300" /></button>}
                </div>
              </div>
            ))}
          </div>

          <div className="px-8 py-6 bg-slate-50 flex flex-col md:flex-row gap-4 items-center justify-end">
            <button onClick={handleConvert} disabled={isProcessing} className="px-10 py-3 bg-primary-600 text-white rounded-xl font-bold shadow-lg flex items-center gap-2 w-full md:w-auto justify-center">
              {isProcessing ? <Loader2 className="w-5 h-5 animate-spin" /> : <Maximize className="w-5 h-5" />}
              Resize All
            </button>
            {files.some(f => f.status === "completed") && (
              <button onClick={downloadAll} className="px-10 py-3 bg-green-600 text-white rounded-xl font-bold shadow-lg flex items-center gap-2 w-full md:w-auto justify-center">
                <Download className="w-5 h-5" /> Download All
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
