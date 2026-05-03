"use client";

import { useState, useEffect, useRef } from "react";
import { QrCode, Zap, Copy, Check, Download, Trash2, AlertCircle, Settings2, BarChart3 } from "lucide-react";
import JsBarcode from "jsbarcode";
import { cn } from "@/lib/utils";

interface BarcodeGeneratorToolProps {
  defaultFormat?: string;
}

const FORMATS = [
  { id: "CODE128", label: "Code 128", desc: "Alphanumeric, universal standard" },
  { id: "EAN13", label: "EAN-13", desc: "Global retail (13 digits)" },
  { id: "UPC", label: "UPC-A", desc: "North American retail (12 digits)" },
  { id: "CODE39", label: "Code 39", desc: "Legacy industrial" },
  { id: "ITF14", label: "ITF-14", desc: "Shipping and logistics" },
  { id: "MSI", label: "MSI Plessey", desc: "Inventory management" },
  { id: "pharmacode", label: "Pharmacode", desc: "Pharmaceutical labeling" },
];

export default function BarcodeGeneratorTool({ defaultFormat = "CODE128" }: BarcodeGeneratorToolProps) {
  const [input, setInput] = useState(defaultFormat === "EAN13" ? "123456789012" : "STUDIO-101");
  const [format, setFormat] = useState(defaultFormat);
  const [error, setError] = useState<string | null>(null);
  const [color, setColor] = useState("#000000");
  const [width, setWidth] = useState(2);
  const [height, setHeight] = useState(100);
  const [displayValue, setDisplayValue] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      try {
        setError(null);
        JsBarcode(canvasRef.current, input, {
          format: format,
          lineColor: color,
          width: width,
          height: height,
          displayValue: displayValue,
          background: "transparent",
          valid: (valid) => {
            if (!valid) throw new Error(`Invalid data for ${format}`);
          }
        });
      } catch (err: any) {
        setError(err.message || "Invalid input for selected format");
        const ctx = canvasRef.current.getContext("2d");
        if (ctx) ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      }
    }
  }, [input, format, color, width, height, displayValue]);

  const download = () => {
    if (!canvasRef.current || error) return;
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const padding = 40;
    canvas.width = canvasRef.current.width + padding;
    canvas.height = canvasRef.current.height + padding;
    if (ctx) {
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(canvasRef.current, padding/2, padding/2);
      const url = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = url;
      a.download = `barcode-${format}-${input}.png`;
      a.click();
    }
  };

  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Settings Side */}
      <div className="lg:col-span-7 space-y-6">
        <div className="bg-white p-8 md:p-10 rounded-[3rem] border border-slate-200 shadow-sm space-y-10">
           <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                 <div className="w-12 h-12 bg-primary-100 rounded-2xl flex items-center justify-center text-primary-600">
                    <BarChart3 className="w-6 h-6" />
                 </div>
                 <div>
                    <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter">Barcode Studio</h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Universal Standards Compliant</p>
                 </div>
              </div>
              <button onClick={() => setInput("")} className="p-3 text-slate-300 hover:text-red-500 transition-colors">
                 <Trash2 className="w-5 h-5" />
              </button>
           </div>

           <div className="space-y-6">
              <div className="space-y-3">
                 <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] pl-1">Data Input</label>
                 <input 
                   type="text" 
                   value={input} 
                   onChange={(e) => setInput(e.target.value)}
                   placeholder="Enter code data..."
                   className={cn(
                     "w-full p-6 bg-slate-50 border-2 rounded-[2rem] font-mono text-2xl outline-none transition-all",
                     error ? "border-red-100 ring-4 ring-red-50 text-red-600" : "border-slate-100 focus:border-primary-500 ring-primary-50 focus:ring-4"
                   )}
                 />
                 {error && (
                   <div className="flex items-center gap-2 text-red-500 px-4 py-2 bg-red-50 rounded-xl animate-in fade-in slide-in-from-top-1">
                      <AlertCircle className="w-4 h-4" />
                      <span className="text-xs font-bold">{error}</span>
                   </div>
                 )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-3">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] pl-1">Standards Format</label>
                    <select 
                      value={format} 
                      onChange={(e) => setFormat(e.target.value)}
                      className="w-full p-5 bg-slate-50 border-none rounded-2xl font-bold text-slate-700 focus:ring-4 ring-primary-50 outline-none appearance-none cursor-pointer"
                    >
                       {FORMATS.map(f => (
                         <option key={f.id} value={f.id}>{f.label} — {f.desc}</option>
                       ))}
                    </select>
                 </div>
                 <div className="space-y-3">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] pl-1">Barcode Color</label>
                    <div className="flex gap-4">
                       <input type="color" value={color} onChange={e => setColor(e.target.value)} className="h-14 w-20 bg-slate-50 border-none rounded-xl cursor-pointer p-1" />
                       <input type="text" value={color} onChange={e => setColor(e.target.value)} className="flex-grow p-4 bg-slate-50 border-none rounded-xl font-mono text-sm uppercase" />
                    </div>
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-slate-100">
                 <div className="space-y-3">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] pl-1">Line Width</label>
                    <input type="range" min="1" max="4" step="1" value={width} onChange={e => setWidth(parseInt(e.target.value))} className="w-full accent-primary-600" />
                 </div>
                 <div className="space-y-3">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] pl-1">Height</label>
                    <input type="range" min="40" max="150" value={height} onChange={e => setHeight(parseInt(e.target.value))} className="w-full accent-primary-600" />
                 </div>
                 <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Show Text</span>
                    <button onClick={() => setDisplayValue(!displayValue)} className={cn("w-10 h-5 rounded-full transition-all relative", displayValue ? "bg-primary-600" : "bg-slate-300")}>
                       <div className={cn("absolute top-1 w-3 h-3 bg-white rounded-full transition-all", displayValue ? "right-1" : "left-1")} />
                    </button>
                 </div>
              </div>
           </div>
        </div>
      </div>

      {/* Preview Side */}
      <div className="lg:col-span-5 flex flex-col gap-6">
         <div className="bg-slate-900 p-12 rounded-[3.5rem] shadow-2xl flex flex-col items-center justify-center min-h-[400px] relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
               <div className="absolute top-10 left-10 w-40 h-40 bg-white blur-[100px] rounded-full" />
            </div>

            <div className={cn(
              "bg-white p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-500 overflow-hidden max-w-full flex justify-center",
              error ? "opacity-20 grayscale scale-95" : "hover:scale-105"
            )}>
               <canvas ref={canvasRef} className="max-w-full"></canvas>
            </div>

            <button 
              onClick={download} 
              disabled={!!error}
              className="mt-12 w-full py-5 bg-primary-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-lg shadow-primary-900/40 hover:bg-primary-500 active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-20 disabled:grayscale"
            >
               <Download className="w-5 h-5" /> Export Hi-Res PNG
            </button>
         </div>

         <div className="bg-primary-50 p-8 rounded-[2.5rem] border border-primary-100 space-y-4">
            <div className="flex items-center gap-3">
               <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-primary-600 shadow-sm">
                  <Settings2 className="w-4 h-4" />
               </div>
               <p className="font-bold text-primary-900 uppercase tracking-widest text-[10px]">Developer Specs</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
               <div>
                  <p className="text-[10px] font-bold text-primary-400 uppercase">Format</p>
                  <p className="text-sm font-bold text-primary-700">{format}</p>
               </div>
               <div>
                  <p className="text-[10px] font-bold text-primary-400 uppercase">Density</p>
                  <p className="text-sm font-bold text-primary-700">{width}px per bar</p>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
