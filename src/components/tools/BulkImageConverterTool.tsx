"use client";

import FileUpload from "./FileUpload";
import { useState } from "react";
import { Upload, Download, FileImage, Check, ArrowRight, Loader2, ArrowRightLeft, FolderArchive } from "lucide-react";
import { cn } from "@/lib/utils";
import JSZip from "jszip";

interface BulkImageConverterToolProps {
  sourceFormat?: string;
  targetFormat: string;
}

export default function BulkImageConverterTool({ sourceFormat = "ANY", targetFormat }: BulkImageConverterToolProps) {
  const [files, setFiles] = useState<{ file: File; converted?: string; status: "pending" | "converting" | "done" }[]>([]);

  const onFilesSelected = (selectedFiles: File[]) => {
    const newFiles = selectedFiles.map(f => ({ file: f, status: "pending" as const }));
    setFiles(prev => [...prev, ...newFiles]);
  };

  const convertFile = async (index: number) => {
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
          
          const mimeType = `image/${targetFormat.toLowerCase()}`;
          const converted = canvas.toDataURL(mimeType === "image/jpg" ? "image/jpeg" : mimeType, 0.9);
          
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
      if (files[i].status === "pending") convertFile(i);
    });
  };

  const downloadAll = async () => {
    const zip = new JSZip();
    const doneFiles = files.filter(f => f.status === "done" && f.converted);
    if (doneFiles.length === 0) return;

    for (const item of doneFiles) {
      const response = await fetch(item.converted!);
      const blob = await response.blob();
      zip.file(`${item.file.name.split('.')[0]}.${targetFormat.toLowerCase()}`, blob);
    }

    const content = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(content);
    const a = document.createElement("a");
    a.href = url;
    a.download = `converted_images_${targetFormat.toLowerCase()}.zip`;
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
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600">
            <ArrowRightLeft className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">{sourceFormat === "ANY" ? "Image" : sourceFormat} to {targetFormat} Converter</h3>
            <p className="text-sm text-slate-500">Fast and secure browser-side conversion</p>
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
                "flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-2xl cursor-grab active:cursor-grabbing transition-all",
                draggedIndex === i ? "opacity-40 border-primary-500 border-dashed bg-primary-50" : "hover:border-primary-200"
              )}
            >
              <div className="flex items-center gap-4 overflow-hidden">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-slate-400 shrink-0">
                  <FileImage className="w-5 h-5" />
                </div>
                <div className="overflow-hidden">
                  <p className="text-sm font-bold text-slate-700 truncate">{item.file.name}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {item.status === "pending" && (
                  <button onClick={(e) => { e.stopPropagation(); convertFile(i); }} className="text-xs font-bold text-primary-600 bg-white border border-slate-200 px-3 py-1.5 rounded-lg hover:bg-primary-50">Convert</button>
                )}
                {item.status === "converting" && <Loader2 className="w-5 h-5 text-primary-600 animate-spin" />}
                {item.status === "done" && (
                  <a href={item.converted} download={item.file.name.split('.')[0] + '.' + targetFormat.toLowerCase()} className="p-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200">
                    <Download className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>
          ))}

          <FileUpload onFilesSelected={onFilesSelected} accept={{ "image/*": [] }} />
        </div>

        {files.some(f => f.status === "pending") && (
          <button onClick={convertAll} className="w-full py-3.5 bg-primary-600 text-white rounded-2xl font-bold shadow-lg shadow-primary-500/20">Convert All</button>
        )}

        {files.some(f => f.status === "done") && (
          <button onClick={downloadAll} className="w-full py-3.5 bg-slate-900 text-white rounded-2xl font-bold flex items-center justify-center gap-2">
            <FolderArchive className="w-5 h-5" /> Download All as ZIP
          </button>
        )}
      </div>
    </div>
  );
}
