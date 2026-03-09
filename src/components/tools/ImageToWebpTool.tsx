"use client";

import { useState } from "react";
import { Upload, Download, FileImage, Check, ArrowRight, Loader2, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageToWebpToolProps {
  sourceFormat?: "JPG" | "PNG" | "ANY";
}

export default function ImageToWebpTool({ sourceFormat = "ANY" }: ImageToWebpToolProps) {
  const [files, setFiles] = useState<{ file: File; converted?: string; status: "pending" | "converting" | "done" }[]>([]);
  const [quality, setQuality] = useState(80);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).map(f => ({ file: f, status: "pending" as const }));
      setFiles([...files, ...newFiles]);
    }
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
            <div key={i} className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-2xl group hover:border-primary-200 transition-all">
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
                    onClick={() => convertToWebp(i)}
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

          <label className="border-2 border-dashed border-slate-200 rounded-3xl p-12 flex flex-col items-center justify-center gap-4 cursor-pointer hover:border-primary-300 hover:bg-primary-50/30 transition-all">
            <input type="file" multiple accept="image/*" onChange={handleFileChange} className="hidden" />
            <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-slate-400">
              <Upload className="w-8 h-8" />
            </div>
            <div className="text-center">
              <p className="font-bold text-slate-900">Add {sourceFormat !== "ANY" ? sourceFormat : "Images"}</p>
              <p className="text-sm text-slate-500">Drag and drop or click to upload</p>
            </div>
          </label>
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
      </div>
    </div>
  );
}
