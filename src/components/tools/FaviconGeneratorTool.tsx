"use client";

import { useState } from "react";
import FileUpload from "./FileUpload";
import { Download, Globe, Loader2, RefreshCw, X, LayoutGrid } from "lucide-react";
import JSZip from "jszip";
import confetti from "canvas-confetti";

const SIZES = [16, 32, 48, 64, 128, 256, 512];

export default function FaviconGeneratorTool() {
  const [image, setImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [previews, setPreviews] = useState<{ size: number; url: string }[]>([]);

  const onFilesSelected = (files: File[]) => {
    if (files.length > 0) {
      const reader = new FileReader();
      reader.onload = (e) => setImage(e.target?.result as string);
      reader.readAsDataURL(files[0]);
    }
  };

  const generateFavicon = async () => {
    if (!image) return;
    setIsProcessing(true);
    
    try {
      const img = new Image();
      img.src = image;
      await new Promise((resolve) => (img.onload = resolve));

      const newPreviews = await Promise.all(
        SIZES.map(async (size) => {
          const canvas = document.createElement("canvas");
          canvas.width = size;
          canvas.height = size;
          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.drawImage(img, 0, 0, size, size);
          }
          return { size, url: canvas.toDataURL("image/png") };
        })
      );

      setPreviews(newPreviews);
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      console.error(e);
      alert("Failed to generate favicon.");
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadAll = async () => {
    const zip = new JSZip();
    previews.forEach((p) => {
      const data = p.url.split(",")[1];
      zip.file(`favicon-${p.size}x${p.size}.png`, data, { base64: true });
    });
    
    const content = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(content);
    const link = document.createElement("a");
    link.href = url;
    link.download = "favicon-package.zip";
    link.click();
  };

  const clear = () => {
    setImage(null);
    setPreviews([]);
  };

  return (
    <div className="space-y-6">
      {!image ? (
        <FileUpload onFilesSelected={onFilesSelected} accept={{ 'image/*': [] }} />
      ) : (
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Globe className="w-6 h-6 text-primary-600" />
                <h3 className="text-xl font-bold text-slate-900">Generate Favicon</h3>
              </div>
              <button 
                onClick={clear}
                className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                title="Remove image"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <div className="flex flex-col items-center gap-8">
              <div className="relative w-32 h-32 rounded-2xl overflow-hidden border-4 border-primary-50 shadow-inner">
                <img src={image} alt="Original" className="w-full h-full object-contain" />
              </div>

              {!previews.length ? (
                <button 
                  onClick={generateFavicon}
                  disabled={isProcessing}
                  className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-primary-600 text-white rounded-2xl font-bold shadow-lg shadow-primary-500/20 hover:bg-primary-700 transition-all disabled:opacity-50"
                >
                  {isProcessing ? <Loader2 className="w-5 h-5 animate-spin" /> : <LayoutGrid className="w-5 h-5" />}
                  {isProcessing ? "Generating..." : "Generate Favicon Package"}
                </button>
              ) : (
                <div className="w-full space-y-8 animate-in fade-in duration-500">
                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-4">
                    {previews.map((p) => (
                      <div key={p.size} className="flex flex-col items-center gap-2">
                        <div className="w-12 h-12 bg-slate-50 rounded-lg flex items-center justify-center border border-slate-100 p-1">
                          <img src={p.url} alt={`${p.size}x${p.size}`} className="max-w-full max-h-full" />
                        </div>
                        <span className="text-[10px] font-bold text-slate-400">{p.size}px</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-slate-50">
                    <button 
                      onClick={downloadAll}
                      className="flex-grow flex items-center justify-center gap-2 px-8 py-4 bg-green-600 text-white rounded-2xl font-bold shadow-lg shadow-green-500/20 hover:bg-green-700 transition-all"
                    >
                      <Download className="w-5 h-5" /> Download ZIP Package
                    </button>
                    <button 
                      onClick={clear}
                      className="px-8 py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-200 transition-all flex items-center justify-center gap-2"
                    >
                      <RefreshCw className="w-5 h-5" /> Start Over
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
