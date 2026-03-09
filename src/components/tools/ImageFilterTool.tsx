"use client";

import { useState, useRef } from "react";
import { Upload, Download, RotateCw, FlipVertical, Palette, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageFilterToolProps {
  filterType?: "grayscale" | "invert" | "rotate" | "flip" | "sepia";
}

export default function ImageFilterTool({ filterType }: ImageFilterToolProps) {
  const [image, setImage] = useState<string | null>(null);
  const [processed, setProcessed] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setImage(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const applyEffect = () => {
    if (!image) return;
    setIsProcessing(true);
    const img = new Image();
    img.src = image;
    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      if (filterType === "rotate") {
        canvas.width = img.height;
        canvas.height = img.width;
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate(90 * Math.PI / 180);
        ctx.drawImage(img, -img.width / 2, -img.height / 2);
      } else if (filterType === "flip") {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.scale(-1, 1);
        ctx.drawImage(img, -img.width, 0);
      } else {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.filter = filterType === "grayscale" ? "grayscale(100%)" : 
                    filterType === "invert" ? "invert(100%)" : 
                    filterType === "sepia" ? "sepia(100%)" : "none";
        ctx.drawImage(img, 0, 0);
      }

      setProcessed(canvas.toDataURL("image/png"));
      setIsProcessing(false);
    };
  };

  return (
    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-8">
      {!image ? (
        <label className="border-2 border-dashed border-slate-200 rounded-3xl p-16 flex flex-col items-center justify-center gap-4 cursor-pointer hover:bg-slate-50 transition-colors">
          <input type="file" accept="image/*" onChange={handleUpload} className="hidden" />
          <Upload className="w-10 h-10 text-slate-300" />
          <p className="font-bold text-slate-700">Upload image to apply {filterType}</p>
        </label>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="space-y-2">
               <span className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-2">Original</span>
               <div className="aspect-video bg-slate-50 rounded-2xl overflow-hidden border border-slate-100 flex items-center justify-center">
                 <img src={image} className="max-h-full object-contain" alt="Original" />
               </div>
             </div>
             <div className="space-y-2">
               <span className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-2">Result</span>
               <div className="aspect-video bg-slate-100 rounded-2xl overflow-hidden border border-slate-100 flex items-center justify-center group relative">
                 {processed ? (
                   <img src={processed} className="max-h-full object-contain" alt="Processed" />
                 ) : (
                   <p className="text-slate-400 italic">Click process to see result</p>
                 )}
               </div>
             </div>
          </div>

          <div className="flex gap-4">
            <button 
              onClick={applyEffect}
              className="flex-grow py-4 bg-primary-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary-500/20"
            >
              {isProcessing ? <Loader2 className="w-5 h-5 animate-spin" /> : <Palette className="w-5 h-5" />}
              Apply {filterType}
            </button>
            {processed && (
              <a href={processed} download={`filtered-image.png`} className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold flex items-center justify-center gap-2">
                <Download className="w-5 h-5" />
                Download
              </a>
            )}
            <button onClick={() => {setImage(null); setProcessed(null);}} className="px-6 py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold">Clear</button>
          </div>
        </div>
      )}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}
