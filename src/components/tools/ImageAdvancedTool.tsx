"use client";

import { useState, useRef, useEffect } from "react";
import { Type, CornerUpRight, Download, Loader2, Image as ImageIcon } from "lucide-react";
import FileUpload from "./FileUpload";

interface ImageAdvancedToolProps {
    mode: "add-text" | "round-corners" | "exif" | "handwriting";
}

export default function ImageAdvancedTool({ mode }: ImageAdvancedToolProps) {
    const [file, setFile] = useState<File | null>(null);
    const [image, setImage] = useState<HTMLImageElement | null>(null);
    const [text, setText] = useState("Your Caption");
    const [radius, setRadius] = useState(50);
    const [isProcessing, setIsProcessing] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (file) {
            const img = new Image();
            img.onload = () => setImage(img);
            img.src = URL.createObjectURL(file);
        }
    }, [file]);

    useEffect(() => {
        if (image && canvasRef.current) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext("2d");
            if (!ctx) return;

            canvas.width = image.width;
            canvas.height = image.height;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            if (mode === "round-corners") {
                ctx.beginPath();
                ctx.moveTo(radius, 0);
                ctx.lineTo(canvas.width - radius, 0);
                ctx.quadraticCurveTo(canvas.width, 0, canvas.width, radius);
                ctx.lineTo(canvas.width, canvas.height - radius);
                ctx.quadraticCurveTo(canvas.width, canvas.height, canvas.width - radius, canvas.height);
                ctx.lineTo(radius, canvas.height);
                ctx.quadraticCurveTo(0, canvas.height, 0, canvas.height - radius);
                ctx.lineTo(0, radius);
                ctx.quadraticCurveTo(0, 0, radius, 0);
                ctx.closePath();
                ctx.clip();
            }

            ctx.drawImage(image, 0, 0);

            if (mode === "add-text") {
                ctx.font = `${Math.floor(canvas.height / 10)}px Inter, sans-serif`;
                ctx.fillStyle = "white";
                ctx.strokeStyle = "black";
                ctx.lineWidth = Math.floor(canvas.height / 100);
                ctx.textAlign = "center";
                ctx.strokeText(text, canvas.width / 2, canvas.height - 50);
                ctx.fillText(text, canvas.width / 2, canvas.height - 50);
            } else if (mode === "handwriting") {
                ctx.font = `${Math.floor(canvas.height / 15)}px cursive`;
                ctx.fillStyle = "#1e293b";
                ctx.textAlign = "left";
                ctx.fillText(text, 50, 100);
            } else if (mode === "exif") {
                ctx.fillStyle = "rgba(0,0,0,0.3)";
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.font = `${Math.floor(canvas.height / 20)}px Inter, sans-serif`;
                ctx.fillStyle = "white";
                ctx.textAlign = "center";
                ctx.fillText("EXIF Data Scrubbed", canvas.width / 2, canvas.height / 2);
            }
        }
    }, [image, text, radius, mode]);

    const download = () => {
        if (!canvasRef.current) return;
        setIsProcessing(true);
        const link = document.createElement("a");
        link.download = `edited_${file?.name || "image.png"}`;
        link.href = canvasRef.current.toDataURL("image/png");
        link.click();
        setIsProcessing(false);
    };

    return (
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-8">
            <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600">
                    {mode === "add-text" ? <Type className="w-6 h-6" /> : <CornerUpRight className="w-6 h-6" />}
                </div>
                <div>
                    <h3 className="text-xl font-bold text-slate-900 capitalize">Image {mode.replace("-", " ")}</h3>
                    <p className="text-sm text-slate-500">{mode === "add-text" ? "Add captions to your photos" : "Create stylish rounded images"}</p>
                </div>
            </div>

            <FileUpload
                onFilesSelected={(files) => setFile(files[0])}
                accept={{ "image/*": [".png", ".jpg", ".jpeg", ".webp"] }}
                multiple={false}
            />

            {file && (
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {mode === "add-text" && (
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-2">Caption</label>
                                <input
                                    type="text"
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                    className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl"
                                />
                            </div>
                        )}
                        {mode === "round-corners" && (
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-2">Radius ({radius}px)</label>
                                <input
                                    type="range"
                                    min="0"
                                    max="500"
                                    value={radius}
                                    onChange={(e) => setRadius(parseInt(e.target.value))}
                                    className="w-full h-12 bg-slate-50 p-4"
                                />
                            </div>
                        )}
                    </div>

                    <div className="relative rounded-2xl overflow-hidden bg-slate-100 border border-slate-100 aspect-video flex items-center justify-center">
                        <canvas ref={canvasRef} className="max-w-full max-h-full object-contain shadow-2xl" />
                    </div>

                    <button
                        onClick={download}
                        disabled={isProcessing}
                        className="w-full py-4 bg-primary-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2"
                    >
                        {isProcessing ? <Loader2 className="w-5 h-5 animate-spin" /> : <Download className="w-5 h-5" />}
                        {isProcessing ? "Processing..." : `Download Edited Image`}
                    </button>
                </div>
            )}
        </div>
    );
}
