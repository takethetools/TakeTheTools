"use client";

import { useState, useRef, useEffect } from "react";
import FileUpload from "./FileUpload";
import { Download, Palette, Loader2, RefreshCw, Layers, Check, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const FILTERS = [
  { id: "none", label: "Original", css: "none" },
  { id: "grayscale", label: "Grayscale", css: "grayscale(100%)" },
  { id: "sepia", label: "Sepia", css: "sepia(100%)" },
  { id: "invert", label: "Invert", css: "invert(100%)" },
  { id: "vintage", label: "Vintage", css: "sepia(50%) contrast(120%) brightness(90%)" },
  { id: "cool", label: "Cool", css: "hue-rotate(30deg) saturate(120%)" },
  { id: "warm", label: "Warm", css: "sepia(20%) saturate(150%) brightness(110%)" },
  { id: "dramatic", label: "Dramatic", css: "contrast(150%) brightness(80%) saturate(80%)" },
  { id: "blur", label: "Soft Blur", css: "blur(2px)" },
  { id: "bloom", label: "Bloom", css: "brightness(110%) contrast(90%) saturate(130%) blur(1px)" },
];

interface ImageFilterToolProps {
  defaultFilterId?: string;
}

export default function ImageFilterTool({ defaultFilterId = "none" }: ImageFilterToolProps) {
  const [image, setImage] = useState<string | null>(null);
  const [originalName, setOriginalName] = useState("image");
  const [activeFilter, setActiveFilter] = useState(
    FILTERS.find(f => f.id === defaultFilterId) || FILTERS[0]
  );
  const [isProcessing, setIsProcessing] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const onFilesSelected = (files: File[]) => {
    if (files.length > 0) {
      setOriginalName(files[0].name.replace(/\.[^/.]+$/, ""));
      const reader = new FileReader();
      reader.onload = (ev) => setImage(ev.target?.result as string);
      reader.readAsDataURL(files[0]);
    }
  };

  const downloadImage = () => {
    if (!image) return;
    setIsProcessing(true);
    const img = new Image();
    img.src = image;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.filter = activeFilter.css;
      ctx.drawImage(img, 0, 0);
      
      const url = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = url;
      a.download = `${originalName}-${activeFilter.id}.png`;
      a.click();
      setIsProcessing(false);
    };
  };

  return (
    <div className="space-y-8">
      {!image ? (
        <FileUpload onFilesSelected={onFilesSelected} accept={{ "image/*": [] }} />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Preview Area */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-[2.5rem] border border-slate-200 shadow-sm relative overflow-hidden group">
              <div className="absolute top-4 left-4 z-10 bg-black/50 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1.5 rounded-full tracking-widest uppercase">
                Preview: {activeFilter.label}
              </div>
              <div className="aspect-video bg-slate-900 rounded-3xl overflow-hidden flex items-center justify-center border border-slate-800 shadow-inner">
                 <img 
                    src={image} 
                    className="max-h-full object-contain transition-all duration-500 ease-out" 
                    style={{ filter: activeFilter.css }}
                    alt="Preview" 
                 />
              </div>
            </div>

            <div className="flex gap-4">
               <button 
                  onClick={downloadImage}
                  disabled={isProcessing}
                  className="flex-grow py-5 bg-primary-600 text-white rounded-2xl font-bold flex items-center justify-center gap-3 shadow-xl shadow-primary-500/20 hover:bg-primary-700 transition-all disabled:opacity-50"
               >
                  {isProcessing ? <Loader2 className="w-5 h-5 animate-spin" /> : <Download className="w-5 h-5" />}
                  Download Filtered Image
               </button>
               <button 
                  onClick={() => setImage(null)}
                  className="px-8 py-5 bg-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-200 transition-all"
               >
                  <RefreshCw className="w-5 h-5" />
               </button>
            </div>
          </div>

          {/* Filter Selection Grid */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-2">
               <Sparkles className="w-5 h-5 text-primary-600" />
               <h4 className="font-bold text-slate-900">Choose Filter</h4>
            </div>
            <div className="grid grid-cols-2 gap-3 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
               {FILTERS.map((f) => (
                 <button
                    key={f.id}
                    onClick={() => setActiveFilter(f)}
                    className={cn(
                      "relative aspect-square rounded-2xl overflow-hidden border-4 transition-all group",
                      activeFilter.id === f.id ? "border-primary-500 shadow-lg scale-95" : "border-white hover:border-slate-100 shadow-sm"
                    )}
                 >
                    <img 
                      src={image} 
                      className="w-full h-full object-cover transition-transform group-hover:scale-110" 
                      style={{ filter: f.css }} 
                      alt={f.label}
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-black/60 backdrop-blur-sm p-2 text-center">
                      <span className="text-[10px] font-bold text-white uppercase tracking-tighter">{f.label}</span>
                    </div>
                    {activeFilter.id === f.id && (
                      <div className="absolute top-2 right-2 w-5 h-5 bg-primary-500 rounded-full flex items-center justify-center shadow-lg">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    )}
                 </button>
               ))}
            </div>
            
            <div className="p-6 bg-slate-50 border border-slate-100 rounded-[2rem] space-y-2">
               <p className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                 <Palette className="w-3 h-3" /> Quick Tip
               </p>
               <p className="text-[11px] text-slate-500 leading-relaxed">
                 Filters are applied instantly in your browser. Use <b>Dramatic</b> for high-contrast photos or <b>Vintage</b> for a nostalgic look.
               </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
