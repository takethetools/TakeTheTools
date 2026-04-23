"use client";

import { useState, useEffect, useRef } from "react";
import { QrCode, Zap, Copy, Check, Download, Trash2, AlertCircle } from "lucide-react";
import JsBarcode from "jsbarcode";

export default function BarcodeGeneratorTool() {
  const [input, setInput] = useState("12345678");
  const [format, setFormat] = useState("CODE128");
  const [error, setError] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      try {
        setError(null);
        JsBarcode(canvasRef.current, input, {
          format: format,
          lineColor: "#000",
          width: 2,
          height: 100,
          displayValue: true,
          background: "#fff",
          valid: (valid) => {
            if (!valid) throw new Error("Invalid input for " + format);
          }
        });
      } catch (err: any) {
        setError(err.message || "Invalid input for selected format");
        // Clear canvas if invalid
        const ctx = canvasRef.current.getContext("2d");
        if (ctx) ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      }
    }
  }, [input, format]);

  const download = () => {
    if (!canvasRef.current || error) return;
    const url = canvasRef.current.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = `barcode-${input}.png`;
    a.click();
  };

  const getHint = () => {
    switch(format) {
      case "EAN13": return "Requires 12 or 13 digits";
      case "UPC": return "Requires 11 or 12 digits";
      case "ITF14": return "Requires exactly 14 digits";
      default: return null;
    }
  };

  return (
    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-8">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600">
          <QrCode className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900">Barcode Generator</h3>
          <p className="text-sm text-slate-500">Generate professional barcodes for products and inventory</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         <div className="space-y-6">
            <div className="space-y-2">
               <div className="flex justify-between items-center pl-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Data / Number</label>
                  {getHint() && <span className="text-[10px] text-primary-500 font-bold">{getHint()}</span>}
               </div>
               <div className="relative">
                  <input 
                    type="text" 
                    value={input} 
                    onChange={(e) => setInput(e.target.value)}
                    className={`w-full p-4 bg-slate-50 border rounded-2xl font-mono text-xl focus:ring-2 transition-all ${error ? "border-red-200 focus:ring-red-100" : "border-slate-100 focus:ring-primary-100"}`}
                  />
                  <button 
                    onClick={() => setInput("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500"
                  >
                     <Trash2 className="w-4 h-4" />
                  </button>
               </div>
            </div>

            <div className="space-y-2">
               <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-2">Format</label>
               <select 
                 value={format} 
                 onChange={(e) => setFormat(e.target.value)}
                 className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold focus:ring-2 focus:ring-primary-100 outline-none"
               >
                  <option value="CODE128">Code 128 (Alphanumeric)</option>
                  <option value="EAN13">EAN-13 (Standard Retail)</option>
                  <option value="UPC">UPC (Retail)</option>
                  <option value="CODE39">Code 39 (Legacy)</option>
                  <option value="ITF14">ITF-14 (Shipping)</option>
                  <option value="MSI">MSI (Inventory)</option>
                  <option value="pharmacode">Pharmacode (Medical)</option>
               </select>
            </div>

            {error && (
              <div className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 animate-in fade-in slide-in-from-top-2">
                 <AlertCircle className="w-5 h-5 shrink-0" />
                 <p className="text-sm font-medium">{error}</p>
              </div>
            )}
         </div>

         <div className="flex flex-col items-center justify-center p-8 bg-slate-50 rounded-3xl border border-slate-100 relative min-h-[300px]">
            <div className={`bg-white p-6 rounded-2xl shadow-sm border border-slate-100 mb-6 overflow-hidden max-w-full transition-opacity ${error ? "opacity-20 grayscale" : "opacity-100"}`}>
               <canvas ref={canvasRef} className="max-w-full h-auto"></canvas>
            </div>
            <button 
              onClick={download} 
              disabled={!!error}
              className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg hover:shadow-slate-300/50 active:scale-[0.98] transition-all disabled:opacity-20 disabled:cursor-not-allowed"
            >
               <Download className="w-5 h-5" /> Download Barcode
            </button>
         </div>
      </div>
    </div>
  );
}
