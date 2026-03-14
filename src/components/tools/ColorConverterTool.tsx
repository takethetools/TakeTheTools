"use client";

import { useState, useEffect } from "react";
import { Palette, Copy, Check, RefreshCw, Download, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ColorConverterTool() {
  const [color, setColor] = useState("#4f46e5");
  const [conversions, setConversions] = useState<{ name: string; value: string }[]>([]);
  const [isCopied, setIsCopied] = useState<string | null>(null);

  const hexToRgb = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return { r, g, b };
  };

  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;
    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
  };

  useEffect(() => {
    if (/^#[0-9A-F]{6}$/i.test(color)) {
      const rgb = hexToRgb(color);
      const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

      setConversions([
        { name: "HEX", value: color.toUpperCase() },
        { name: "RGB", value: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` },
        { name: "HSL", value: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` },
        { name: "CSS Variable", value: `--primary: ${hsl.h} ${hsl.s}% ${hsl.l}%;` },
      ]);
    }
  }, [color]);

  const copy = (val: string, id: string) => {
    navigator.clipboard.writeText(val);
    setIsCopied(id);
    setTimeout(() => setIsCopied(null), 2000);
  };

  const downloadResult = () => {
    const csv = conversions.map(c => `${c.name},${c.value}`).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `color-conversions-${color.replace("#", "")}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const clear = () => {
    setColor("#000000");
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-8">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="w-full md:w-1/3 flex flex-col items-center gap-6">
            <div className="flex justify-between w-full items-center">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-2">Select Color</h3>
              <div className="flex gap-4">
                <button
                  onClick={() => setColor("#4f46e5")}
                  className="text-xs font-bold text-primary-500 hover:text-primary-600 transition-colors uppercase tracking-wider"
                >
                  Example
                </button>
                <button
                  onClick={clear}
                  className="text-xs font-bold text-slate-400 hover:text-red-500 transition-colors flex items-center gap-1 uppercase tracking-wider"
                >
                  <Trash2 className="w-3 h-3" /> Clear
                </button>
              </div>
            </div>
            <div
              className="w-48 h-48 rounded-3xl shadow-2xl border-4 border-white animate-in zoom-in-50 duration-700"
              style={{ backgroundColor: color }}
            ></div>
            <div className="w-full flex gap-2">
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-20 h-12 rounded-xl cursor-pointer bg-slate-50 p-1 border border-slate-100"
              />
              <input
                type="text"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-center font-mono font-bold text-slate-700 focus:ring-2 focus:ring-primary-500 outline-none"
              />
            </div>
          </div>

          <div className="w-full md:w-2/3 grid grid-cols-1 gap-4">
            {conversions.map((sys) => (
              <div key={sys.name} className="p-6 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-between group hover:border-primary-200 transition-colors">
                <div className="space-y-1">
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{sys.name}</h3>
                    <button
                      onClick={downloadResult}
                      className="text-[10px] font-bold text-slate-300 hover:text-primary-600 uppercase tracking-wider flex items-center gap-1"
                      title="Download CSV"
                    >
                      <Download className="w-3 h-3" /> CSV
                    </button>
                  </div>
                  <div className="text-xl font-mono font-bold text-slate-900">{sys.value}</div>
                </div>
                <button
                  onClick={() => copy(sys.value, sys.name)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm transition-all shadow-sm",
                    isCopied === sys.name ? "bg-green-600 text-white" : "bg-white text-primary-600 hover:bg-primary-50"
                  )}
                >
                  {isCopied === sys.name ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {isCopied === sys.name ? "Copied" : "Copy"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
