"use client";

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
      setIsProcessing(false);
    }
  };

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
                onClick={() => setRotation(0)}
                className="px-6 py-4 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200 transition-all flex items-center justify-center gap-2"
                title="Reset Rotation"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
              <button 
                onClick={clear}
                className="px-8 py-4 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200 transition-all flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-5 h-5" /> Start Over
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
