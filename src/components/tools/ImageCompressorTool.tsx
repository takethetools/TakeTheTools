"use client";

import { useState } from "react";
import FileUpload from "./FileUpload";
import { Download, Check, File as FileIcon, Loader2, AlertCircle, RefreshCw, X, Sliders } from "lucide-react";
import JSZip from "jszip";
import confetti from "canvas-confetti";
import { cn } from "@/lib/utils";

interface ProcessedFile {
  file: File;
  status: "idle" | "processing" | "completed" | "error";
  resultUrl?: string;
  originalSize: number;
  compressedSize?: number;
  error?: string;
}

export default function ImageCompressorTool() {
  const [files, setFiles] = useState<ProcessedFile[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [quality, setQuality] = useState(0.6);

  const onFilesSelected = (newFiles: File[]) => {
    const processed: ProcessedFile[] = newFiles.map(f => ({
      file: f,
      status: "idle",
      originalSize: f.size,
    }));
    setFiles(prev => [...prev, ...processed]);
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const compressFile = async (processedFile: ProcessedFile): Promise<ProcessedFile> => {
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

          // Determine mime type based on original or default to jpeg for better compression
          const mimeType = processedFile.file.type === "image/png" ? "image/jpeg" : processedFile.file.type;

          canvas.toBlob((blob) => {
            if (blob) {
              const resultUrl = URL.createObjectURL(blob);
              resolve({
                ...processedFile,
                status: "completed",
                resultUrl,
                compressedSize: blob.size
              });
            } else {
              resolve({ ...processedFile, status: "error", error: "Compression failed" });
            }
          }, mimeType, quality);
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

        const result = await compressFile(updatedFiles[i]);
        updatedFiles[i] = result;
        setFiles([...updatedFiles]);
      }
    }

    setIsProcessing(false);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  const downloadAll = async () => {
    const zip = new JSZip();
    for (const f of files) {
      if (f.resultUrl) {
        const response = await fetch(f.resultUrl);
        const blob = await response.blob();
        const extension = f.file.type.split("/")[1] || "jpg";
        zip.file(`${f.file.name.replace(/\.[^/.]+$/, "")}_compressed.${extension}`, blob);
      }
    }

    const content = await zip.generateAsync({ type: "blob" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(content);
    link.download = "global-tools-compressed-images.zip";
    link.click();
  };

  const reset = () => {
    setFiles([]);
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const calculateSaving = (original: number, compressed: number) => {
    const saving = ((original - compressed) / original) * 100;
    return Math.max(0, Math.round(saving));
  };

  return (
    <div className="space-y-8">
      {files.length === 0 ? (
        <FileUpload
          onFilesSelected={onFilesSelected}
          accept={{ "image/*": [".jpg", ".jpeg", ".png", ".webp"] }}
        />
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
          {/* Header */}
          <div className="px-8 py-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between bg-slate-50 gap-4">
            <div>
              <h3 className="font-bold text-slate-900">Compression Queue ({files.length} files)</h3>
              <p className="text-sm text-slate-500">Fast client-side compression</p>
            </div>

            <div className="flex items-center gap-4 bg-white px-4 py-2 rounded-xl border border-slate-200">
              <Sliders className="w-4 h-4 text-slate-400" />
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Quality</span>
              <input
                type="range"
                min="0.1"
                max="0.9"
                step="0.05"
                value={quality}
                onChange={(e) => setQuality(parseFloat(e.target.value))}
                className="w-24 md:w-32 accent-primary-600"
              />
              <span className="text-sm font-bold text-primary-600 w-10 text-center">{Math.round(quality * 100)}%</span>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={async () => {
                  try {
                    const response = await fetch("https://picsum.photos/800/600");
                    const blob = await response.blob();
                    const file = new File([blob], "example-image.jpg", { type: "image/jpeg" });
                    onFilesSelected([file]);
                  } catch (e) {
                    console.error("Failed to load example image", e);
                  }
                }}
                className="text-xs font-bold text-primary-500 hover:text-primary-600 transition-colors uppercase tracking-wider"
              >
                Example
              </button>
              <button
                onClick={reset}
                className="text-xs font-bold text-slate-400 hover:text-red-500 transition-colors flex items-center gap-1 uppercase tracking-wider"
              >
                <RefreshCw className="w-3 h-3" /> Clear
              </button>
            </div>
          </div>

          {/* List */}
          <div className="max-h-[400px] overflow-y-auto">
            {files.map((f, i) => (
              <div key={i} className="px-8 py-5 border-b border-slate-50 flex items-center justify-between group hover:bg-slate-50/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400">
                    <FileIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900 truncate max-w-[200px]">{f.file.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-slate-400 line-through">{formatSize(f.originalSize)}</span>
                      {f.compressedSize && (
                        <span className="text-xs font-bold text-green-600">{formatSize(f.compressedSize)}</span>
                      )}
                      {f.compressedSize && (
                        <span className="text-[10px] px-1.5 py-0.5 bg-green-100 text-green-700 rounded-full">
                          -{calculateSaving(f.originalSize, f.compressedSize)}%
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  {f.status === "processing" && <Loader2 className="w-5 h-5 text-primary-600 animate-spin" />}
                  {f.status === "completed" && <Check className="w-5 h-5 text-green-500" />}

                  {f.status === "completed" && f.resultUrl && (
                    <a
                      href={f.resultUrl}
                      download={`${f.file.name.replace(/\.[^/.]+$/, "")}_compressed.${f.file.type.split("/")[1] || "jpg"}`}
                      className="p-2 bg-primary-100 text-primary-600 rounded-lg hover:bg-primary-600 hover:text-white transition-all shadow-sm"
                    >
                      <Download className="w-4 h-4" />
                    </a>
                  )}

                  {f.status === "idle" && (
                    <button onClick={() => removeFile(i)} className="p-2 text-slate-300 hover:text-red-500 transition-colors">
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
              Total Saving: {files.some(f => f.compressedSize) ?
                `${calculateSaving(
                  files.reduce((acc, curr) => acc + curr.originalSize, 0),
                  files.reduce((acc, curr) => acc + (curr.compressedSize || curr.originalSize), 0)
                )}%` : "0%"}
            </div>
            <div className="flex gap-4 w-full md:w-auto">
              <label htmlFor="file-upload-input" className="cursor-pointer px-6 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 font-bold hover:bg-slate-50 transition-all flex items-center gap-2 flex-grow justify-center">
                Add More
              </label>

              {files.some(f => f.status === "completed") ? (
                <button onClick={downloadAll} className="px-8 py-3 bg-green-600 text-white rounded-xl font-bold shadow-lg hover:bg-green-700 transition-all flex items-center gap-2 flex-grow justify-center">
                  <Download className="w-5 h-5" /> Download All
                </button>
              ) : (
                <button
                  onClick={handleConvert}
                  disabled={isProcessing}
                  className={cn(
                    "px-10 py-3 bg-primary-600 text-white rounded-xl font-bold shadow-lg hover:bg-primary-700 transition-all flex items-center gap-2 flex-grow justify-center",
                    isProcessing && "opacity-50 cursor-not-allowed"
                  )}
                >
                  {isProcessing ? <Loader2 className="w-5 h-5 animate-spin" /> : "Compress All"}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
