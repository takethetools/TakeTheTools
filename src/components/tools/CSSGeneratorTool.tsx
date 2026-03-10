"use client";

import { useState } from "react";
import { Palette, Layers, Copy, Check, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

interface CSSGeneratorToolProps {
    mode: "gradient" | "box-shadow";
}

export default function CSSGeneratorTool({ mode }: CSSGeneratorToolProps) {
    const [isCopied, setIsCopied] = useState(false);

    // Gradient State
    const [color1, setColor1] = useState("#4f46e5");
    const [color2, setColor2] = useState("#06b6d4");
    const [angle, setAngle] = useState(135);

    // Box Shadow State
    const [hOffset, setHOffset] = useState(0);
    const [vOffset, setVOffset] = useState(10);
    const [blur, setBlur] = useState(25);
    const [spread, setSpread] = useState(-5);
    const [shadowColor, setShadowColor] = useState("rgba(0,0,0,0.1)");

    const gradientCode = `linear-gradient(${angle}deg, ${color1}, ${color2})`;
    const boxShadowCode = `${hOffset}px ${vOffset}px ${blur}px ${spread}px ${shadowColor}`;

    const copyCode = () => {
        const code = mode === "gradient" ? `background: ${gradientCode};` : `box-shadow: ${boxShadowCode};`;
        navigator.clipboard.writeText(code);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    return (
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-8">
            <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600">
                    {mode === "gradient" ? <Palette className="w-6 h-6" /> : <Layers className="w-6 h-6" />}
                </div>
                <div>
                    <h3 className="text-xl font-bold text-slate-900 capitalize">{mode.replace("-", " ")} Generator</h3>
                    <p className="text-sm text-slate-500">Visual CSS generator with instant preview</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Controls */}
                <div className="space-y-6">
                    {mode === "gradient" ? (
                        <>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-2">Start Color</label>
                                <div className="flex gap-2">
                                    <input type="color" value={color1} onChange={(e) => setColor1(e.target.value)} className="h-12 w-20 rounded-xl cursor-pointer" />
                                    <input type="text" value={color1} onChange={(e) => setColor1(e.target.value)} className="flex-grow p-3 bg-slate-50 border border-slate-100 rounded-xl font-mono" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-2">End Color</label>
                                <div className="flex gap-2">
                                    <input type="color" value={color2} onChange={(e) => setColor2(e.target.value)} className="h-12 w-20 rounded-xl cursor-pointer" />
                                    <input type="text" value={color2} onChange={(e) => setColor2(e.target.value)} className="flex-grow p-3 bg-slate-50 border border-slate-100 rounded-xl font-mono" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between px-2">
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Angle ({angle}°)</label>
                                </div>
                                <input type="range" min="0" max="360" value={angle} onChange={(e) => setAngle(Number(e.target.value))} className="w-full accent-primary-600" />
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-2">H-Offset</label>
                                    <input type="number" value={hOffset} onChange={(e) => setHOffset(Number(e.target.value))} className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl font-mono" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-2">V-Offset</label>
                                    <input type="number" value={vOffset} onChange={(e) => setVOffset(Number(e.target.value))} className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl font-mono" />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-2">Blur</label>
                                    <input type="number" min="0" value={blur} onChange={(e) => setBlur(Number(e.target.value))} className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl font-mono" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-2">Spread</label>
                                    <input type="number" value={spread} onChange={(e) => setSpread(Number(e.target.value))} className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl font-mono" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-2">Color</label>
                                <input type="text" value={shadowColor} onChange={(e) => setShadowColor(e.target.value)} className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl font-mono" placeholder="rgba(0,0,0,0.1)" />
                            </div>
                        </>
                    )}

                    <div className="bg-slate-900 rounded-2xl p-6 relative">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Generated CSS</span>
                            <button onClick={copyCode} className="text-primary-400 hover:text-white transition-colors flex items-center gap-1 text-xs font-bold">
                                {isCopied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                                {isCopied ? "Copied" : "Copy Code"}
                            </button>
                        </div>
                        <code className="text-blue-100 font-mono text-sm break-all">
                            {mode === "gradient" ? `background: ${gradientCode};` : `box-shadow: ${boxShadowCode};`}
                        </code>
                    </div>
                </div>

                {/* Preview */}
                <div className="flex flex-col items-center justify-center gap-8">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Live Preview</span>
                    <div
                        className="w-full aspect-square max-w-[300px] rounded-3xl transition-all duration-300 bg-white"
                        style={{
                            background: mode === "gradient" ? gradientCode : "#ffffff",
                            boxShadow: mode === "box-shadow" ? boxShadowCode : "none"
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
