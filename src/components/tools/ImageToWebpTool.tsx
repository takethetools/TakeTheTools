"use client";
import FileUpload from "./FileUpload";

import { useState } from "react";
import { Upload, Download, FileImage, Check, ArrowRight, Loader2, Zap, FolderArchive } from "lucide-react";
import { cn } from "@/lib/utils";
import JSZip from "jszip";

interface ImageToWebpToolProps {
  sourceFormat?: "JPG" | "PNG" | "ANY";
}

export default function ImageToWebpTool({ sourceFormat = "ANY" }: ImageToWebpToolProps) {
  const [files, setFiles] = useState<{ file: File; converted?: string; status: "pending" | "converting" | "done" }[]>([]);
  const [quality, setQuality] = useState(80);

  const onFilesSelected = (selectedFiles: File[]) => {
    const newFiles = selectedFiles.map(f => ({ file: f, status: "pending" as const }));
    setFiles(prev => [...prev, ...newFiles]);
  };

  const convertToWebp = async (index: number) => {
    const item = files[index];
    setFiles(prev => {
      const copy = [...prev];
      copy[index].status = "converting";
      return copy;
    });

    try {
      const img = new Image();
      const reader = new FileReader();

      reader.onload = (e) => {
        img.src = e.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext("2d");
          ctx?.drawImage(img, 0, 0);
          
          const converted = canvas.toDataURL("image/webp", quality / 100);
          setFiles(prev => {
            const copy = [...prev];
            copy[index].converted = converted;
            copy[index].status = "done";
            return copy;
          });
        };
      };
      reader.readAsDataURL(item.file);
    } catch (error) {
      console.error(error);
    }
  };

  const convertAll = () => {
    files.forEach((_, i) => {
      if (files[i].status === "pending") convertToWebp(i);
    });
  };

  const downloadAll = async () => {
    const zip = new JSZip();
    const doneFiles = files.filter(f => f.status === "done" && f.converted);
    if (doneFiles.length === 0) return;

    for (const item of doneFiles) {
      const response = await fetch(item.converted!);
      const blob = await response.blob();
      zip.file(`${item.file.name.split('.')[0]}.webp`, blob);
    }

    const content = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(content);
    const a = document.createElement("a");
    a.href = url;
    a.download = "converted_images_webp.zip";
    a.click();
  };

  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const onDragStart = (index: number) => setDraggedIndex(index);

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

  const onDragEnd = () => setDraggedIndex(null);

  return (
    <div className="space-y-8">
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-8">
        <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
           <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">Image to WebP Optimizer</h3>
              <p className="text-sm text-slate-500">Convert {sourceFormat === "ANY" ? "Images" : sourceFormat} to modern WebP</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl w-full md:w-auto border border-slate-100">
             <span className="text-xs font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">Quality</span>
             <input 
               type="range" 
               min="10" 
               max="100" 
               value={quality} 
               onChange={(e) => setQuality(Number(e.target.value))}
               className="w-32 accent-primary-600 h-1.5 rounded-lg appearance-none bg-slate-200"
             />
             <span className="text-sm font-mono font-bold text-primary-600 w-8">{quality}%</span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {files.map((item, i) => (
            <div 
              key={i} 
              draggable
              onDragStart={() => onDragStart(i)}
              onDragOver={(e) => onDragOver(e, i)}
              onDragEnd={onDragEnd}
              className={cn(
                "flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-2xl group cursor-grab active:cursor-grabbing transition-all",
                draggedIndex === i ? "opacity-40 border-primary-500 border-dashed bg-primary-50" : "hover:border-primary-200"
              )}
            >
              <div className="flex items-center gap-4 overflow-hidden">
                <div className="w-12 h-12 bg-white rounded-xl border border-slate-100 flex items-center justify-center text-slate-400 shrink-0">
                  <FileImage className="w-6 h-6" />
                </div>
                <div className="overflow-hidden">
                  <p className="text-sm font-bold text-slate-700 truncate">{item.file.name}</p>
                  <p className="text-xs text-slate-400 uppercase">{(item.file.size / 1024).toFixed(1)} KB</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {item.status === "pending" && (
                  <button 
                    onClick={(e) => { e.stopPropagation(); convertToWebp(i); }}
                    className="p-3 bg-white text-primary-600 rounded-xl hover:bg-primary-50 transition-colors border border-slate-100 font-bold text-sm"
                  >
                    Convert
                  </button>
                )}
                {item.status === "converting" && <Loader2 className="w-6 h-6 text-primary-600 animate-spin" />}
                {item.status === "done" && (
                  <a 
                    href={item.converted} 
                    download={item.file.name.split('.')[0] + '.webp'}
                    className="flex items-center gap-2 px-5 py-2.5 bg-green-600 text-white rounded-xl font-bold text-sm shadow-sm hover:bg-green-700 transition-all"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </a>
                )}
              </div>
            </div>
          ))}

          <FileUpload onFilesSelected={onFilesSelected} accept={{ "image/*": [] }} />
        </div>

        {files.some(f => f.status === "pending") && (
          <button 
            onClick={convertAll}
            className="w-full py-4 bg-primary-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-xl shadow-primary-500/20 hover:bg-primary-700 transition-all"
          >
            <Zap className="w-5 h-5" />
            Convert All to WebP
          </button>
        )}

        {files.some(f => f.status === "done") && (
          <button 
            onClick={downloadAll}
            className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-xl shadow-slate-900/20 hover:bg-slate-800 transition-all"
          >
            <FolderArchive className="w-5 h-5" />
            Download All as ZIP
          </button>
        )}
      </div>
    </div>
  );
}
