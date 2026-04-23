"use client";

import { useState } from "react";
import { Upload, Download, FileImage, Check, ArrowRight, Loader2, ArrowRightLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface BulkImageConverterToolProps {
  sourceFormat?: string;
  targetFormat: string;
}

export default function BulkImageConverterTool({ sourceFormat = "ANY", targetFormat }: BulkImageConverterToolProps) {
  const [files, setFiles] = useState<{ file: File; converted?: string; status: "pending" | "converting" | "done" }[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).map(f => ({ file: f, status: "pending" as const }));
      setFiles([...files, ...newFiles]);
    }
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
            <div key={i} className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-2xl">
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
                  <button onClick={() => convertFile(i)} className="text-xs font-bold text-primary-600 bg-white border border-slate-200 px-3 py-1.5 rounded-lg hover:bg-primary-50">Convert</button>
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

          <label className="border-2 border-dashed border-slate-200 rounded-3xl p-10 flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-slate-50 transition-colors">
            <input type="file" multiple onChange={handleFileChange} className="hidden" />
            <Upload className="w-8 h-8 text-slate-300" />
            <div className="text-center">
              <p className="font-bold text-slate-700">Add Files</p>
              <p className="text-xs text-slate-400">Target: {targetFormat}</p>
            </div>
          </label>
        </div>

        {files.some(f => f.status === "pending") && (
          <button onClick={convertAll} className="w-full py-3.5 bg-primary-600 text-white rounded-2xl font-bold shadow-lg shadow-primary-500/20">Convert All</button>
        )}
      </div>
    </div>
  );
}
