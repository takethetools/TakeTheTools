"use client";

<<<<<<< HEAD
import { useState, useRef, useCallback, useEffect } from "react";
import FileUpload from "./FileUpload";
import { Download, RefreshCw, Loader2, RotateCcw, Move } from "lucide-react";
import confetti from "canvas-confetti";

const ASPECT_PRESETS = [
  { label: "Free", value: null },
  { label: "1:1", value: 1 },
  { label: "4:3", value: 4 / 3 },
  { label: "16:9", value: 16 / 9 },
  { label: "3:4", value: 3 / 4 },
  { label: "9:16", value: 9 / 16 },
  { label: "3:2", value: 3 / 2 },
  { label: "2:3", value: 2 / 3 },
];

const OUTPUT_FORMATS = [
  { label: "JPG", mime: "image/jpeg", ext: "jpg" },
  { label: "PNG", mime: "image/png", ext: "png" },
  { label: "WebP", mime: "image/webp", ext: "webp" },
];

interface CropRect { x: number; y: number; w: number; h: number; }

export default function ImageCropperTool() {
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [imgEl, setImgEl] = useState<HTMLImageElement | null>(null);
  const [originalName, setOriginalName] = useState("image");
  const [aspectPreset, setAspectPreset] = useState<number | null>(null);
  const [outputFormat, setOutputFormat] = useState(OUTPUT_FORMATS[0]);
  const [quality, setQuality] = useState(92);
  const [rotation, setRotation] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [cropRect, setCropRect] = useState<CropRect>({ x: 0.1, y: 0.1, w: 0.8, h: 0.8 });
  const [dragging, setDragging] = useState<null | "move" | "tl" | "tr" | "bl" | "br" | "t" | "b" | "l" | "r">(null);
  const [dragStart, setDragStart] = useState({ mx: 0, my: 0, rect: cropRect });

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const onFilesSelected = (files: File[]) => {
    if (!files.length) return;
    setOriginalName(files[0].name.replace(/\.[^/.]+$/, ""));
    const url = URL.createObjectURL(files[0]);
    const img = new Image();
    img.onload = () => {
      setImgEl(img);
      setImgSrc(url);
      setCropRect({ x: 0.1, y: 0.1, w: 0.8, h: 0.8 });
      setRotation(0);
    };
    img.src = url;
  };

  // Snap crop when aspect ratio changes
  useEffect(() => {
    if (!aspectPreset || !imgEl) return;
    setCropRect(prev => {
      let { w, h, x, y } = prev;
      const currentAspect = w / h;
      if (currentAspect > aspectPreset) w = h * aspectPreset;
      else h = w / aspectPreset;
      
      // Ensure it still fits
      if (x + w > 1) x = 1 - w;
      if (y + h > 1) y = 1 - h;
      
      return { x, y, w, h };
    });
  }, [aspectPreset, imgEl]);

  // Redraw canvas whenever image, crop, rotation changes
  useEffect(() => {
    if (!imgEl || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const DISPLAY_W = canvas.offsetWidth || 700;
    const scale = DISPLAY_W / imgEl.width;
    const DISPLAY_H = imgEl.height * scale;
    canvas.width = DISPLAY_W;
    canvas.height = DISPLAY_H;

    // Draw image with rotation
    ctx.save();
    ctx.translate(DISPLAY_W / 2, DISPLAY_H / 2);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.drawImage(imgEl, -DISPLAY_W / 2, -DISPLAY_H / 2, DISPLAY_W, DISPLAY_H);
    ctx.restore();

    // Overlay dim
    ctx.fillStyle = "rgba(0,0,0,0.5)";
    ctx.fillRect(0, 0, DISPLAY_W, DISPLAY_H);

    // Clear crop area
    const cx = cropRect.x * DISPLAY_W;
    const cy = cropRect.y * DISPLAY_H;
    const cw = cropRect.w * DISPLAY_W;
    const ch = cropRect.h * DISPLAY_H;
    ctx.clearRect(cx, cy, cw, ch);
    // Re-draw image inside crop
    ctx.save();
    ctx.translate(DISPLAY_W / 2, DISPLAY_H / 2);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.drawImage(imgEl, -DISPLAY_W / 2, -DISPLAY_H / 2, DISPLAY_W, DISPLAY_H);
    ctx.restore();
    ctx.fillStyle = "rgba(0,0,0,0.5)";
    // Dim top
    ctx.fillRect(0, 0, DISPLAY_W, cy);
    // Dim bottom
    ctx.fillRect(0, cy + ch, DISPLAY_W, DISPLAY_H - cy - ch);
    // Dim left
    ctx.fillRect(0, cy, cx, ch);
    // Dim right
    ctx.fillRect(cx + cw, cy, DISPLAY_W - cx - cw, ch);

    // Re-draw image inside crop clean
    ctx.save();
    ctx.beginPath();
    ctx.rect(cx, cy, cw, ch);
    ctx.clip();
    ctx.translate(DISPLAY_W / 2, DISPLAY_H / 2);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.drawImage(imgEl, -DISPLAY_W / 2, -DISPLAY_H / 2, DISPLAY_W, DISPLAY_H);
    ctx.restore();

    // Border
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;
    ctx.strokeRect(cx, cy, cw, ch);

    // Rule of thirds
    ctx.strokeStyle = "rgba(255,255,255,0.3)";
    ctx.lineWidth = 1;
    for (let i = 1; i < 3; i++) {
      ctx.beginPath();
      ctx.moveTo(cx + (cw / 3) * i, cy);
      ctx.lineTo(cx + (cw / 3) * i, cy + ch);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(cx, cy + (ch / 3) * i);
      ctx.lineTo(cx + cw, cy + (ch / 3) * i);
      ctx.stroke();
    }

    // Corner handles
    const H = 10;
    ctx.fillStyle = "white";
    [[cx, cy], [cx + cw - H, cy], [cx, cy + ch - H], [cx + cw - H, cy + ch - H]].forEach(([hx, hy]) => {
      ctx.fillRect(hx, hy, H, H);
    });

    // Size indicator
    const pw = Math.round(cropRect.w * imgEl.width);
    const ph = Math.round(cropRect.h * imgEl.height);
    ctx.fillStyle = "rgba(0,0,0,0.6)";
    ctx.fillRect(cx + 4, cy + 4, 90, 20);
    ctx.fillStyle = "white";
    ctx.font = "11px monospace";
    ctx.fillText(`${pw} × ${ph}`, cx + 8, cy + 17);

  }, [imgEl, cropRect, rotation]);

  const getRelPos = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;
    return {
      mx: (clientX - rect.left) / rect.width,
      my: (clientY - rect.top) / rect.height,
    };
  };

  const getHandle = (mx: number, my: number): typeof dragging => {
    const { x, y, w, h } = cropRect;
    const T = 0.025;
    const inX = mx >= x - T && mx <= x + w + T;
    const inY = my >= y - T && my <= y + h + T;
    const nearL = Math.abs(mx - x) < T;
    const nearR = Math.abs(mx - x - w) < T;
    const nearT = Math.abs(my - y) < T;
    const nearB = Math.abs(my - y - h) < T;
    if (nearT && nearL) return "tl";
    if (nearT && nearR) return "tr";
    if (nearB && nearL) return "bl";
    if (nearB && nearR) return "br";
    if (nearT && inX) return "t";
    if (nearB && inX) return "b";
    if (nearL && inY) return "l";
    if (nearR && inY) return "r";
    if (mx > x && mx < x + w && my > y && my < y + h) return "move";
    return null;
  };

  const onMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const { mx, my } = getRelPos(e);
    const handle = getHandle(mx, my);
    if (handle) {
      setDragging(handle);
      setDragStart({ mx, my, rect: { ...cropRect } });
    }
  };

  const onTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    const { mx, my } = getRelPos(e);
    const handle = getHandle(mx, my);
    if (handle) {
      setDragging(handle);
      setDragStart({ mx, my, rect: { ...cropRect } });
    }
  };

  const onTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!dragging) return;
    e.preventDefault(); // Prevent scrolling while cropping
    const { mx, my } = getRelPos(e);
    handleDrag(mx, my);
  };

  const handleDrag = (mx: number, my: number) => {
    const dx = mx - dragStart.mx;
    const dy = my - dragStart.my;
    const r = { ...dragStart.rect };

    const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));
    const MIN = 0.05;

    let { x, y, w, h } = r;

    if (dragging === "move") {
      x = clamp(r.x + dx, 0, 1 - r.w);
      y = clamp(r.y + dy, 0, 1 - r.h);
    } else if (dragging === "tl") {
      const nx = clamp(r.x + dx, 0, r.x + r.w - MIN);
      const ny = clamp(r.y + dy, 0, r.y + r.h - MIN);
      x = nx; w = r.x + r.w - nx;
      y = ny; h = r.y + r.h - ny;
    } else if (dragging === "tr") {
      const ny = clamp(r.y + dy, 0, r.y + r.h - MIN);
      w = clamp(r.w + dx, MIN, 1 - r.x);
      y = ny; h = r.y + r.h - ny;
    } else if (dragging === "bl") {
      const nx = clamp(r.x + dx, 0, r.x + r.w - MIN);
      x = nx; w = r.x + r.w - nx;
      h = clamp(r.h + dy, MIN, 1 - r.y);
    } else if (dragging === "br") {
      w = clamp(r.w + dx, MIN, 1 - r.x);
      h = clamp(r.h + dy, MIN, 1 - r.y);
    } else if (dragging === "t") {
      const ny = clamp(r.y + dy, 0, r.y + r.h - MIN);
      y = ny; h = r.y + r.h - ny;
    } else if (dragging === "b") {
      h = clamp(r.h + dy, MIN, 1 - r.y);
    } else if (dragging === "l") {
      const nx = clamp(r.x + dx, 0, r.x + r.w - MIN);
      x = nx; w = r.x + r.w - nx;
    } else if (dragging === "r") {
      w = clamp(r.w + dx, MIN, 1 - r.x);
    }

    // Apply aspect ratio if locked
    if (aspectPreset && dragging !== "move") {
      const targetAspect = aspectPreset;
      if (dragging === "l" || dragging === "r") h = w / targetAspect;
      else if (dragging === "t" || dragging === "b") w = h * targetAspect;
      else {
        // Corners
        if (w / h > targetAspect) w = h * targetAspect;
        else h = w / targetAspect;
      }
      
      // Secondary clamps to ensure we don't go out of bounds after aspect correction
      if (x + w > 1) w = 1 - x;
      if (y + h > 1) h = 1 - y;
      // Re-apply aspect if secondary clamp changed something
      if (w / h > targetAspect) w = h * targetAspect;
      else h = w / targetAspect;
    }

    setCropRect({ x, y, w, h });
  };

  const onMouseUp = () => setDragging(null);

  // cursor
  const [cursor, setCursor] = useState("default");
  const onMouseMoveForCursor = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const { mx, my } = getRelPos(e);
    if (dragging) {
      handleDrag(mx, my);
      return;
    }
    const h = getHandle(mx, my);
    const cursorMap: Record<string, string> = {
      tl: "nw-resize", tr: "ne-resize", bl: "sw-resize", br: "se-resize",
      t: "n-resize", b: "s-resize", l: "w-resize", r: "e-resize", move: "move",
    };
    setCursor(h ? (cursorMap[h] || "default") : "crosshair");
  };

  const handleDownload = async () => {
    if (!imgEl) return;
    setIsProcessing(true);
    try {
      const canvas = document.createElement("canvas");
      const rotRad = (rotation * Math.PI) / 180;
      const bboxW = Math.abs(Math.cos(rotRad) * imgEl.width) + Math.abs(Math.sin(rotRad) * imgEl.height);
      const bboxH = Math.abs(Math.sin(rotRad) * imgEl.width) + Math.abs(Math.cos(rotRad) * imgEl.height);
      canvas.width = bboxW;
      canvas.height = bboxH;
      const ctx = canvas.getContext("2d")!;
      ctx.translate(bboxW / 2, bboxH / 2);
      ctx.rotate(rotRad);
      ctx.drawImage(imgEl, -imgEl.width / 2, -imgEl.height / 2);

      const px = Math.round(cropRect.x * bboxW);
      const py = Math.round(cropRect.y * bboxH);
      const pw = Math.round(cropRect.w * bboxW);
      const ph = Math.round(cropRect.h * bboxH);

      const data = ctx.getImageData(px, py, pw, ph);
      const out = document.createElement("canvas");
      out.width = pw; out.height = ph;
      out.getContext("2d")!.putImageData(data, 0, 0);

      out.toBlob(blob => {
        if (!blob) return;
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = `${originalName}-cropped.${outputFormat.ext}`;
        a.click();
        confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
        setIsProcessing(false);
      }, outputFormat.mime, quality / 100);
    } catch {
      alert("Crop failed. Please try again.");
=======
import { useState, useCallback } from "react";
import Cropper, { Area } from "react-easy-crop";
import FileUpload from "./FileUpload";
import { Download, Crop as CropIcon, RefreshCw, Loader2, RotateCcw } from "lucide-react";
import confetti from "canvas-confetti";

export default function ImageCropperTool() {
  const [image, setImage] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const onFilesSelected = (files: File[]) => {
    if (files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => setImage(reader.result as string));
      reader.readAsDataURL(files[0]);
    }
  };

  const onCropComplete = useCallback((_croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const createImage = (url: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
      const image = new Image();
      image.addEventListener("load", () => resolve(image));
      image.addEventListener("error", (error) => reject(error));
      image.setAttribute("crossOrigin", "anonymous");
      image.src = url;
    });

  const getCroppedImg = async (
    imageSrc: string,
    pixelCrop: Area,
    rotation = 0
  ): Promise<Blob | null> => {
    const image = await createImage(imageSrc);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) return null;

    const rotRad = (rotation * Math.PI) / 180;
    const { width: bBoxWidth, height: bBoxHeight } = {
      width: Math.abs(Math.cos(rotRad) * image.width) + Math.abs(Math.sin(rotRad) * image.height),
      height: Math.abs(Math.sin(rotRad) * image.width) + Math.abs(Math.cos(rotRad) * image.height),
    };

    canvas.width = bBoxWidth;
    canvas.height = bBoxHeight;

    ctx.translate(bBoxWidth / 2, bBoxHeight / 2);
    ctx.rotate(rotRad);
    ctx.translate(-image.width / 2, -image.height / 2);
    ctx.drawImage(image, 0, 0);

    const data = ctx.getImageData(
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height
    );

    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;
    ctx.putImageData(data, 0, 0);

    return new Promise((resolve) => {
      canvas.toBlob((file) => resolve(file), "image/jpeg", 0.9);
    });
  };

  const handleDownload = async () => {
    if (!image || !croppedAreaPixels) return;
    setIsProcessing(true);
    try {
      const croppedImage = await getCroppedImg(image, croppedAreaPixels, rotation);
      if (croppedImage) {
        const url = URL.createObjectURL(croppedImage);
        const link = document.createElement("a");
        link.href = url;
        link.download = "cropped-image.jpg";
        link.click();
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    } catch (e) {
      console.error(e);
      alert("Failed to crop image.");
    } finally {
>>>>>>> d366566fdaff0e02dbc3205770509d5194ddbac9
      setIsProcessing(false);
    }
  };

<<<<<<< HEAD
  return (
    <div className="space-y-5">
      {!imgSrc ? (
        <FileUpload onFilesSelected={onFilesSelected} accept={{ "image/*": [] }} />
      ) : (
        <>
          {/* Aspect + format bar */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 flex flex-wrap gap-6 items-center">
            <div className="flex flex-col gap-1.5">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Aspect Ratio</span>
              <div className="flex flex-wrap gap-1.5">
                {ASPECT_PRESETS.map(p => (
                  <button key={p.label} onClick={() => setAspectPreset(p.value)}
                    className={`px-3 py-1 rounded-lg text-sm font-bold transition-all ${aspectPreset === p.value ? "bg-primary-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Format</span>
              <div className="flex gap-1.5">
                {OUTPUT_FORMATS.map(f => (
                  <button key={f.label} onClick={() => setOutputFormat(f)}
                    className={`px-3 py-1 rounded-lg text-sm font-bold transition-all ${outputFormat.label === f.label ? "bg-primary-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
                    {f.label}
                  </button>
                ))}
              </div>
            </div>
            {outputFormat.label !== "PNG" && (
              <div className="flex flex-col gap-1.5 flex-1 min-w-[120px]">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Quality {quality}%</span>
                <input type="range" min={30} max={100} value={quality} onChange={e => setQuality(+e.target.value)}
                  className="w-full accent-primary-600" />
              </div>
            )}
          </div>

          {/* Canvas crop area */}
          <div ref={containerRef} className="relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl select-none">
            <canvas
              ref={canvasRef}
              style={{ display: "block", width: "100%", cursor }}
              onMouseDown={onMouseDown}
              onMouseMove={onMouseMoveForCursor}
              onMouseUp={onMouseUp}
              onMouseLeave={onMouseUp}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onMouseUp}
            />
            <div className="absolute top-3 right-3 bg-black/60 text-white text-xs font-mono px-2 py-1 rounded-lg flex items-center gap-1">
              <Move className="w-3 h-3" /> Drag to crop
            </div>
          </div>

          {/* Rotation + actions */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-5">
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-widest">
                <span>Rotation</span>
                <span className="text-primary-600 bg-primary-50 px-2 py-0.5 rounded font-mono">{rotation}°</span>
              </div>
              <input type="range" min={-180} max={180} value={rotation} onChange={e => setRotation(+e.target.value)}
                className="w-full accent-primary-600" />
              <div className="flex gap-2">
                {[-90, 0, 90].map(v => (
                  <button key={v} onClick={() => setRotation(r => v === 0 ? 0 : (r + v))}
                    className="flex-1 py-1.5 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold hover:bg-slate-200 transition-all">
                    {v === 0 ? "Reset" : `${v > 0 ? "+" : ""}${v}°`}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={handleDownload} disabled={isProcessing}
                className="flex-1 py-4 bg-primary-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary-500/20 hover:bg-primary-700 transition-all disabled:opacity-50">
                {isProcessing ? <Loader2 className="w-5 h-5 animate-spin" /> : <Download className="w-5 h-5" />}
                {isProcessing ? "Cropping..." : `Crop & Download ${outputFormat.label}`}
              </button>
              <button onClick={() => { setImgSrc(null); setImgEl(null); }}
                className="px-5 py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-200 transition-all">
                <RefreshCw className="w-5 h-5" />
              </button>
            </div>
          </div>
        </>
=======
  const clear = () => {
    setImage(null);
    setRotation(0);
    setZoom(1);
  };

  return (
    <div className="space-y-6">
      {!image ? (
        <FileUpload onFilesSelected={onFilesSelected} accept={{ 'image/*': [] }} />
      ) : (
        <div className="space-y-6">
          <div className="relative h-[500px] bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
            <Cropper
              image={image}
              crop={crop}
              zoom={zoom}
              rotation={rotation}
              aspect={1}
              onCropChange={setCrop}
              onRotationChange={setRotation}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
            />
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm font-bold text-slate-500 uppercase tracking-widest">
                  <span>Zoom</span>
                  <span className="text-primary-600 bg-primary-50 px-2 py-0.5 rounded">{zoom.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  value={zoom}
                  min={1}
                  max={3}
                  step={0.1}
                  onChange={(e) => setZoom(Number(e.target.value))}
                  className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-primary-600"
                />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm font-bold text-slate-500 uppercase tracking-widest">
                  <span>Rotation</span>
                  <span className="text-primary-600 bg-primary-50 px-2 py-0.5 rounded">{rotation}°</span>
                </div>
                <input
                  type="range"
                  value={rotation}
                  min={0}
                  max={360}
                  step={1}
                  onChange={(e) => setRotation(Number(e.target.value))}
                  className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-primary-600"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleDownload}
                disabled={isProcessing}
                className="flex-grow flex items-center justify-center gap-2 px-8 py-4 bg-primary-600 text-white rounded-xl font-bold shadow-lg shadow-primary-500/20 hover:bg-primary-700 transition-all disabled:opacity-50"
              >
                {isProcessing ? <Loader2 className="w-5 h-5 animate-spin" /> : <CropIcon className="w-5 h-5" />}
                {isProcessing ? "Processing..." : "Crop and Download"}
              </button>
              <button
                onClick={async () => {
                  try {
                    const response = await fetch("https://picsum.photos/1200/800");
                    const blob = await response.blob();
                    const reader = new FileReader();
                    reader.onload = () => setImage(reader.result as string);
                    reader.readAsDataURL(blob);
                  } catch (e) {
                    console.error("Failed to load example image", e);
                  }
                }}
                className="px-6 py-4 bg-white border border-slate-200 text-primary-600 rounded-xl font-bold hover:bg-primary-50 transition-all flex items-center justify-center gap-2"
              >
                Example
              </button>
              <button
                onClick={clear}
                className="px-8 py-4 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200 transition-all flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-5 h-5" /> Clear
              </button>
            </div>
          </div>
        </div>
>>>>>>> d366566fdaff0e02dbc3205770509d5194ddbac9
      )}
    </div>
  );
}
