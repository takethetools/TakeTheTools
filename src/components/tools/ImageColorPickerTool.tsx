"use client";

import { useState, useRef } from "react";
import { Palette, Zap, Copy, Check, MousePointer2, Image as ImageIcon } from "lucide-react";

export default function ImageColorPickerTool() {
  const [image, setImage] = useState<string | null>(null);
  const [color, setColor] = useState("#6366f1");
  const [isCopied, setIsCopied] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImage(url);
    }
  };

  const pickColor = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    const pixel = ctx.getImageData(x, y, 1, 1).data;
    const hex = "#" + [pixel[0], pixel[1], pixel[2]].map(x => x.toString(16).padStart(2, "0")).join("");
    setColor(hex);
  };

  const copyColor = () => {
    navigator.clipboard.writeText(color);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-8">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600">
          <Palette className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900">Image Color Picker</h3>
          <p className="text-sm text-slate-500">Extract exact HEX/RGB colors from any image</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-6">
           <div className="h-96 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 relative overflow-hidden group">
              {image ? (
                <canvas 
                  ref={canvasRef}
                  onClick={pickColor}
                  onMouseMove={(e) => e.buttons === 1 && pickColor(e)}
                  className="w-full h-full object-contain cursor-crosshair"
                  onLoad={(e) => {
                    const canvas = canvasRef.current;
                    if (!canvas) return;
                    const ctx = canvas.getContext("2d");
                    const img = new Image();
                    img.onload = () => {
                       canvas.width = img.width;
                       canvas.height = img.height;
                       ctx?.drawImage(img, 0, 0);
                    };
                    img.src = image;
                  }}
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                   <ImageIcon className="w-12 h-12 text-slate-300 mb-4" />
                   <p className="text-sm font-bold text-slate-400">Upload image to start picking colors</p>
                </div>
              )}
              <input 
                type="file" 
                accept="image/*"
                onChange={handleImage}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
           </div>
        </div>

        <div className="flex flex-col justify-center space-y-8">
           <div className="flex items-center gap-6">
              <div 
                className="w-32 h-32 rounded-3xl border-4 border-white shadow-xl transition-colors duration-200"
                style={{ backgroundColor: color }}
              />
              <div className="space-y-1">
                 <span className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono">Picked Color</span>
                 <div className="text-4xl font-black text-slate-900 font-mono">{color.toUpperCase()}</div>
              </div>
           </div>

           <button 
             onClick={copyColor}
             className="w-full py-5 bg-slate-900 text-white rounded-2xl font-bold flex items-center justify-center gap-2"
           >
              {isCopied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
              {isCopied ? "Copied!" : "Copy HEX Code"}
           </button>

           <div className="p-4 bg-slate-50 rounded-2xl flex items-center gap-3 text-slate-500">
              <MousePointer2 className="w-4 h-4" />
              <p className="text-xs font-medium">Click precisely on the image to sample a color.</p>
           </div>
        </div>
      </div>
    </div>
  );
}
