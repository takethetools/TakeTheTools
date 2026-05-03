"use client";

import { useState, useRef, useEffect } from "react";
import FileUpload from "./FileUpload";
import { Download, RefreshCw, Type, Loader2, Move } from "lucide-react";
import confetti from "canvas-confetti";

const POSITIONS = [
  { label: "Top Left", x: 0.05, y: 0.05 },
  { label: "Top Center", x: 0.5, y: 0.05 },
  { label: "Top Right", x: 0.95, y: 0.05 },
  { label: "Center", x: 0.5, y: 0.5 },
  { label: "Bottom Left", x: 0.05, y: 0.95 },
  { label: "Bottom Center", x: 0.5, y: 0.95 },
  { label: "Bottom Right", x: 0.95, y: 0.95 },
  { label: "Custom", x: -1, y: -1 },
];

export default function WatermarkImageTool() {
  const [imgEl, setImgEl] = useState<HTMLImageElement | null>(null);
  const [originalName, setOriginalName] = useState("image");
  const [text, setText] = useState("© My Brand");
  const [fontSize, setFontSize] = useState(4);
  const [opacity, setOpacity] = useState(70);
  const [color, setColor] = useState("#ffffff");
  const [posX, setPosX] = useState(0.95);
  const [posY, setPosY] = useState(0.95);
  const [selectedPos, setSelectedPos] = useState("Bottom Right");
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ mx: 0, my: 0 });
  const [isProcessing, setIsProcessing] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const onFilesSelected = (files: File[]) => {
    if (!files.length) return;
    setOriginalName(files[0].name.replace(/\.[^/.]+$/, ""));
    const url = URL.createObjectURL(files[0]);
    const img = new Image();
    img.onload = () => setImgEl(img);
    img.src = url;
  };

  const getTextAlign = (): CanvasTextAlign => {
    if (posX < 0.33) return "left";
    if (posX > 0.66) return "right";
    return "center";
  };

  // Redraw every time params change
  useEffect(() => {
    if (!imgEl || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const DISP_W = Math.min(imgEl.width, 1200);
    const scale = DISP_W / imgEl.width;
    const DISP_H = imgEl.height * scale;

    canvas.width = DISP_W;
    canvas.height = DISP_H;

    ctx.drawImage(imgEl, 0, 0, DISP_W, DISP_H);

    const fs = Math.round((fontSize / 100) * DISP_W);
    ctx.font = `bold ${fs}px Arial, sans-serif`;
    ctx.globalAlpha = opacity / 100;
    ctx.fillStyle = color;
    ctx.textAlign = getTextAlign();
    ctx.textBaseline = "middle";

    // Shadow for readability
    ctx.shadowColor = "rgba(0,0,0,0.6)";
    ctx.shadowBlur = fs * 0.3;

    const tx = posX * DISP_W;
    const ty = posY * DISP_H;
    ctx.fillText(text, tx, ty);
    ctx.globalAlpha = 1;
    ctx.shadowBlur = 0;

    // Position indicator dot
    ctx.fillStyle = "rgba(99,102,241,0.8)";
    ctx.beginPath();
    ctx.arc(tx, ty, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;
    ctx.stroke();
  }, [imgEl, text, fontSize, opacity, color, posX, posY]);

  const selectPosition = (p: typeof POSITIONS[0]) => {
    setSelectedPos(p.label);
    if (p.x >= 0) { setPosX(p.x); setPosY(p.y); }
  };

  const onCanvasMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDragging(true);
    setSelectedPos("Custom");
    updatePos(e.clientX, e.clientY);
  };

  const onTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    setIsDragging(true);
    setSelectedPos("Custom");
    updatePos(e.touches[0].clientX, e.touches[0].clientY);
  };

  const updatePos = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const nx = Math.max(0.01, Math.min(0.99, (clientX - rect.left) / rect.width));
    const ny = Math.max(0.01, Math.min(0.99, (clientY - rect.top) / rect.height));
    setPosX(nx); setPosY(ny);
  };

  const onCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (isDragging) updatePos(e.clientX, e.clientY);
  };

  const onTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (isDragging) {
      e.preventDefault();
      updatePos(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleDownload = () => {
    if (!imgEl) return;
    setIsProcessing(true);

    const canvas = document.createElement("canvas");
    canvas.width = imgEl.width;
    canvas.height = imgEl.height;
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(imgEl, 0, 0);

    const fs = Math.round((fontSize / 100) * imgEl.width);
    ctx.font = `bold ${fs}px Arial, sans-serif`;
    ctx.globalAlpha = opacity / 100;
    ctx.fillStyle = color;
    ctx.textAlign = getTextAlign();
    ctx.textBaseline = "middle";
    ctx.shadowColor = "rgba(0,0,0,0.6)";
    ctx.shadowBlur = fs * 0.3;
    ctx.fillText(text, posX * imgEl.width, posY * imgEl.height);

    canvas.toBlob(blob => {
      if (!blob) return;
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `${originalName}-watermarked.png`;
      a.click();
      confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
      setIsProcessing(false);
    }, "image/png");
  };

  return (
    <div className="space-y-5">
      {!imgEl ? (
        <FileUpload onFilesSelected={onFilesSelected} accept={{ "image/*": [] }} />
      ) : (
        <>
          {/* Canvas preview */}
          <div className="relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl">
            <canvas
              ref={canvasRef}
              style={{ display: "block", width: "100%", cursor: "crosshair" }}
              onMouseDown={onCanvasMouseDown}
              onMouseMove={onCanvasMouseMove}
              onMouseUp={() => setIsDragging(false)}
              onMouseLeave={() => setIsDragging(false)}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={() => setIsDragging(false)}
            />
            <div className="absolute bottom-3 left-3 bg-black/60 text-white text-xs px-2 py-1 rounded-lg flex items-center gap-1">
              <Move className="w-3 h-3" /> Click or drag to move watermark
            </div>
          </div>

          {/* Controls */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-5">
            {/* Text */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Watermark Text</label>
              <input type="text" value={text} onChange={e => setText(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl font-medium text-slate-800 outline-none focus:ring-2 focus:ring-primary-500" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Font size */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-widest">
                  <span>Font Size</span>
                  <span className="text-primary-600">{fontSize}%</span>
                </div>
                <input type="range" min={1} max={15} value={fontSize} onChange={e => setFontSize(+e.target.value)}
                  className="w-full accent-primary-600" />
              </div>
              {/* Opacity */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-widest">
                  <span>Opacity</span>
                  <span className="text-primary-600">{opacity}%</span>
                </div>
                <input type="range" min={10} max={100} value={opacity} onChange={e => setOpacity(+e.target.value)}
                  className="w-full accent-primary-600" />
              </div>
            </div>

            {/* Color */}
            <div className="flex items-center gap-3">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Color</label>
              <div className="flex gap-2 flex-wrap">
                {["#ffffff", "#000000", "#ff0000", "#ffff00", "#00ff00", "#0000ff"].map(c => (
                  <button key={c} onClick={() => setColor(c)}
                    className={`w-7 h-7 rounded-full border-2 transition-all ${color === c ? "border-primary-600 scale-110" : "border-slate-200"}`}
                    style={{ background: c }} />
                ))}
                <input type="color" value={color} onChange={e => setColor(e.target.value)}
                  className="w-7 h-7 rounded-full cursor-pointer border-0" title="Custom color" />
              </div>
            </div>

            {/* Position presets */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Position Preset</label>
              <div className="grid grid-cols-4 gap-2">
                {POSITIONS.map(p => (
                  <button key={p.label} onClick={() => selectPosition(p)}
                    className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-all ${selectedPos === p.label ? "bg-primary-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-2 border-t border-slate-100">
              <button onClick={handleDownload} disabled={isProcessing}
                className="flex-1 py-4 bg-primary-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary-500/20 hover:bg-primary-700 transition-all disabled:opacity-50">
                {isProcessing ? <Loader2 className="w-5 h-5 animate-spin" /> : <Download className="w-5 h-5" />}
                {isProcessing ? "Saving..." : "Download with Watermark"}
              </button>
              <button onClick={() => setImgEl(null)}
                className="px-5 py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-200 transition-all">
                <RefreshCw className="w-5 h-5" />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
