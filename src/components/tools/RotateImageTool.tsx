"use client";

import { useState, useRef, useEffect } from "react";
import { Upload, Download, RotateCw, RotateCcw, FlipHorizontal, FlipVertical, Loader2, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import FileUpload from "./FileUpload";

export default function RotateImageTool() {
    const [file, setFile] = useState<File | null>(null);
    const [image, setImage] = useState<HTMLImageElement | null>(null);
    const [rotation, setRotation] = useState(0);
    const [flipH, setFlipH] = useState(false);
    const [flipV, setFlipV] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (file) {
            const img = new Image();
            img.onload = () => setImage(img);
            img.src = URL.createObjectURL(file);
        }
    }, [file]);

    const draw = () => {
        if (!image || !canvasRef.current) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Calculate dimensions based on rotation
        const isRotated = (rotation / 90) % 2 !== 0;
        canvas.width = isRotated ? image.height : image.width;
        canvas.height = isRotated ? image.width : image.height;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();

        // Move to center
        ctx.translate(canvas.width / 2, canvas.height / 2);

        // Rotate
        ctx.rotate((rotation * Math.PI) / 180);

        // Flip
        ctx.scale(flipH ? -1 : 1, flipV ? -1 : 1);

        // Draw
        ctx.drawImage(image, -image.width / 2, -image.height / 2);

        ctx.restore();
    };

    useEffect(() => {
        if (image) draw();
    }, [image, rotation, flipH, flipV]);

    const handleRotate = (dir: "cw" | "ccw") => {
        setRotation(prev => (dir === "cw" ? (prev + 90) % 360 : (prev - 90 + 360) % 360));
    };

    const download = () => {
        if (!canvasRef.current) return;
        setIsProcessing(true);
        const link = document.createElement("a");
        link.download = `rotated_${file?.name || "image.png"}`;
        link.href = canvasRef.current.toDataURL("image/png", 1.0);
        link.click();
        setIsProcessing(false);
    };

    return (
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-8 text-center max-w-4xl mx-auto">
            <div className="flex flex-col items-center gap-2 mb-4">
                <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center text-primary-600">
                    <RotateCw className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Rotate & Flip Image</h3>
                <p className="text-slate-500">Fine-tune your image orientation instantly</p>
            </div>

            <FileUpload
                onFilesSelected={(files) => setFile(files[0])}
                accept={{ "image/*": [".png", ".jpg", ".jpeg", ".webp"] }}
                multiple={false}
            />

            {image && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                    <div className="flex flex-wrap justify-center gap-4">
                        <button
                            onClick={() => handleRotate("ccw")}
                            className="px-6 py-3 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-700 flex items-center gap-2 hover:bg-slate-100 transition-all hover:scale-105 active:scale-95"
                        >
                            <RotateCcw className="w-5 h-5" /> 90° CCW
                        </button>
                        <button
                            onClick={() => handleRotate("cw")}
                            className="px-6 py-3 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-700 flex items-center gap-2 hover:bg-slate-100 transition-all hover:scale-105 active:scale-95"
                        >
                            <RotateCw className="w-5 h-5" /> 90° CW
                        </button>
                        <button
                            onClick={() => setFlipH(!flipH)}
                            className={cn("px-6 py-3 border rounded-2xl font-bold flex items-center gap-2 transition-all hover:scale-105 active:scale-95",
                                flipH ? "bg-primary-50 border-primary-200 text-primary-600" : "bg-slate-50 border-slate-200 text-slate-700")}
                        >
                            <FlipHorizontal className="w-5 h-5" /> Flip Horizontal
                        </button>
                        <button
                            onClick={() => setFlipV(!flipV)}
                            className={cn("px-6 py-3 border rounded-2xl font-bold flex items-center gap-2 transition-all hover:scale-105 active:scale-95",
                                flipV ? "bg-primary-50 border-primary-200 text-primary-600" : "bg-slate-50 border-slate-200 text-slate-700")}
                        >
                            <FlipVertical className="w-5 h-5" /> Flip Vertical
                        </button>
                    </div>

                    <div className="relative rounded-3xl overflow-hidden bg-slate-100 border-4 border-white shadow-2xl aspect-video flex items-center justify-center p-8 min-h-[400px]">
                        <canvas ref={canvasRef} className="max-w-full max-h-[400px] object-contain drop-shadow-2xl" />
                    </div>

                    <div className="flex gap-4">
                        <button
                            onClick={download}
                            disabled={isProcessing}
                            className="flex-1 py-5 bg-primary-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-xl shadow-primary-500/20 hover:bg-primary-700 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50"
                        >
                            {isProcessing ? <Loader2 className="w-6 h-6 animate-spin" /> : <Download className="w-6 h-6" />}
                            {isProcessing ? "Processing..." : "Download Rotated Image"}
                        </button>
                        <button
                            onClick={() => { setFile(null); setImage(null); setRotation(0); setFlipH(false); setFlipV(false); }}
                            className="px-8 py-5 bg-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-200 transition-all"
                        >
                            Reset
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
