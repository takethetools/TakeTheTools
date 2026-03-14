"use client";

import { useState, useEffect } from "react";
import { Palette, Copy, Check, RefreshCw, Download, Layers } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ColorPickerTool() {
    const [color, setColor] = useState("#4f46e5");
    const [isCopied, setIsCopied] = useState<string | null>(null);
    const [palette, setPalette] = useState<string[]>([]);

    const generatePalette = (baseColor: string) => {
        // Simple logic to generate a palette (lighter and darker versions)
        const hex = baseColor.replace("#", "");
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);

        const shades = [
            adjust(r, g, b, 40),
            adjust(r, g, b, 20),
            baseColor,
            adjust(r, g, b, -20),
            adjust(r, g, b, -40),
        ];
        setPalette(shades);
    };

    const adjust = (r: number, g: number, b: number, percent: number) => {
        const amt = Math.round(2.55 * percent);
        const newR = Math.max(0, Math.min(255, r + amt));
        const newG = Math.max(0, Math.min(255, g + amt));
        const newB = Math.max(0, Math.min(255, b + amt));
        return "#" + (1 << 24 | newR << 16 | newG << 8 | newB).toString(16).slice(1);
    };

    useEffect(() => {
        generatePalette(color);
    }, [color]);

    const copy = (val: string, id: string) => {
        navigator.clipboard.writeText(val);
        setIsCopied(id);
        setTimeout(() => setIsCopied(null), 2000);
    };

    const downloadPalette = () => {
        const content = `Color Palette\n\nBase Color: ${color}\n\nPalette:\n${palette.join("\n")}`;
        const blob = new Blob([content], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `palette-${color.replace("#", "")}.txt`;
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="space-y-10">
            <div className="bg-white p-10 rounded-3xl border border-slate-200 shadow-sm space-y-10">
                <div className="flex flex-col lg:flex-row gap-12 items-start">
                    {/* Picker & Large Preview */}
                    <div className="w-full lg:w-1/2 space-y-8">
                        <div
                            className="w-full h-64 rounded-3xl shadow-2xl border-8 border-white animate-in zoom-in-95 duration-500"
                            style={{ backgroundColor: color }}
                        ></div>
                        <div className="flex gap-4">
                            <input
                                type="color"
                                value={color}
                                onChange={(e) => setColor(e.target.value)}
                                className="w-20 h-20 rounded-2xl cursor-pointer bg-slate-50 p-1 border border-slate-200"
                            />
                            <div className="flex-grow space-y-2">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Hex Code</label>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={color}
                                        onChange={(e) => setColor(e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 font-mono font-bold text-xl text-slate-700 focus:ring-2 focus:ring-primary-500 outline-none"
                                    />
                                    <button
                                        onClick={() => copy(color, "main")}
                                        className={cn(
                                            "px-6 rounded-2xl transition-all",
                                            isCopied === "main" ? "bg-green-600 text-white" : "bg-primary-600 text-white hover:bg-primary-700"
                                        )}
                                    >
                                        {isCopied === "main" ? <Check className="w-6 h-6" /> : <Copy className="w-6 h-6" />}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Palette & Formats */}
                    <div className="w-full lg:w-1/2 space-y-8">
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <h3 className="font-bold text-slate-900 flex items-center gap-2">
                                    <Layers className="w-5 h-5 text-primary-600" />
                                    Generated Palette
                                </h3>
                                <button
                                    onClick={downloadPalette}
                                    className="text-xs font-bold text-slate-400 hover:text-primary-600 uppercase tracking-wider flex items-center gap-1"
                                >
                                    <Download className="w-3 h-3" /> Download .txt
                                </button>
                            </div>
                            <div className="flex h-24 rounded-2xl overflow-hidden shadow-sm border border-slate-100">
                                {palette.map((c, i) => (
                                    <div
                                        key={i}
                                        style={{ backgroundColor: c }}
                                        onClick={() => copy(c, `p-${i}`)}
                                        className="flex-grow cursor-pointer hover:flex-[1.5] transition-all duration-300 group flex items-center justify-center relative"
                                    >
                                        <span className="opacity-0 group-hover:opacity-100 bg-white/90 text-[10px] font-bold px-1.5 py-0.5 rounded shadow-sm transition-opacity">
                                            {isCopied === `p-${i}` ? "Copied!" : c}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="font-bold text-slate-900 flex items-center gap-2">
                                <Palette className="w-5 h-5 text-primary-600" />
                                Common Formats
                            </h3>
                            <div className="grid grid-cols-1 gap-3">
                                {[
                                    { name: "RGB", val: hexToRgbString(color) },
                                    { name: "HSL", val: hexToHslString(color) }
                                ].map(f => (
                                    <div key={f.name} className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-2xl group transition-colors hover:border-primary-200">
                                        <div>
                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{f.name}</span>
                                            <div className="font-mono font-bold text-slate-800">{f.val}</div>
                                        </div>
                                        <button
                                            onClick={() => copy(f.val, f.name)}
                                            className={cn(
                                                "p-2 rounded-lg transition-all",
                                                isCopied === f.name ? "bg-green-600 text-white" : "text-primary-600 hover:bg-primary-50"
                                            )}
                                        >
                                            {isCopied === f.name ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-8 bg-primary-50 rounded-3xl border border-primary-100 flex gap-4 items-start">
                <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600 shrink-0">
                    <RefreshCw className="w-5 h-5" />
                </div>
                <div>
                    <h4 className="font-bold text-primary-900 mb-1">Modern Color Workflow</h4>
                    <p className="text-primary-700 text-sm leading-relaxed">
                        Our Color Picker is designed for modern web design workflows. Quickly generate monochromatic palettes, copy CSS-ready formats, and experiment with colors directly in your browser. Perfect for designers and developers alike.
                    </p>
                </div>
            </div>
        </div>
    );
}

function hexToRgbString(hex: string) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgb(${r}, ${g}, ${b})`;
}

function hexToHslString(hex: string) {
    let r = parseInt(hex.slice(1, 3), 16) / 255;
    let g = parseInt(hex.slice(3, 5), 16) / 255;
    let b = parseInt(hex.slice(5, 7), 16) / 255;
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
    return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
}
