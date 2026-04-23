"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, Copy, Check, Image, Download } from "lucide-react";

export default function ImageToBase64Tool() {
  const [base64, setBase64] = useState("");
  const [imgInfo, setImgInfo] = useState<{ name: string; size: number; type: string } | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [format, setFormat] = useState<"data-uri" | "raw">("data-uri");

  const onDrop = useCallback((files: File[]) => {
    const file = files[0];
    if (!file) return;
    setImgInfo({ name: file.name, size: file.size, type: file.type });
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setBase64(result);
    };
    reader.readAsDataURL(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg", ".bmp"] },
    multiple: false,
  });

  const getOutput = () => {
    if (!base64) return "";
    if (format === "data-uri") return base64;
    return base64.split(",")[1] || "";
  };

  const copy = () => {
    navigator.clipboard.writeText(getOutput());
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const download = () => {
    const blob = new Blob([getOutput()], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "base64.txt";
    a.click();
  };

  const outputStr = getOutput();
  const sizeKb = outputStr ? (outputStr.length / 1024).toFixed(1) : "0";

  return (
    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600">
          <Image className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900">Image to Base64 Converter</h3>
          <p className="text-sm text-slate-500">Encode any image to Base64 for embedding in HTML or CSS</p>
        </div>
      </div>

      <div {...getRootProps()} className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-colors ${isDragActive ? "border-primary-400 bg-primary-50" : "border-slate-200 hover:border-primary-300 hover:bg-slate-50"}`}>
        <input {...getInputProps()} />
        <Upload className="w-8 h-8 text-slate-400 mx-auto mb-3" />
        <p className="font-bold text-slate-700">{isDragActive ? "Drop your image here" : "Click or drag & drop an image"}</p>
        <p className="text-sm text-slate-400 mt-1">JPG, PNG, WebP, GIF, SVG supported</p>
      </div>

      {imgInfo && (
        <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl text-sm">
          <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center">
            <Image className="w-5 h-5 text-primary-600" />
          </div>
          <div>
            <p className="font-bold text-slate-800">{imgInfo.name}</p>
            <p className="text-slate-500">{imgInfo.type} · {(imgInfo.size / 1024).toFixed(1)} KB original → {sizeKb} KB Base64</p>
          </div>
        </div>
      )}

      {base64 && (
        <>
          <div className="flex gap-3">
            <button onClick={() => setFormat("data-uri")}
              className={`flex-1 py-2 rounded-xl font-bold text-sm transition-colors ${format === "data-uri" ? "bg-primary-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
              Data URI
            </button>
            <button onClick={() => setFormat("raw")}
              className={`flex-1 py-2 rounded-xl font-bold text-sm transition-colors ${format === "raw" ? "bg-primary-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
              Raw Base64
            </button>
          </div>

          {format === "data-uri" && (
            <div className="p-4 bg-slate-50 rounded-2xl">
              <p className="text-xs font-bold text-slate-500 mb-2">Preview in HTML:</p>
              <code className="text-xs text-slate-700 font-mono break-all">{`<img src="${base64.slice(0, 60)}..." />`}</code>
            </div>
          )}

          <div>
            <div className="flex justify-between mb-2 px-1">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Base64 Output ({sizeKb} KB)</label>
              <div className="flex gap-3">
                <button onClick={download} className="text-slate-500 text-xs font-bold flex items-center gap-1 hover:text-slate-700">
                  <Download className="w-3 h-3" /> Download
                </button>
                <button onClick={copy} className="text-primary-600 text-xs font-bold flex items-center gap-1">
                  {isCopied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  {isCopied ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>
            <textarea readOnly value={outputStr}
              className="w-full h-32 p-4 bg-slate-900 text-green-300 font-mono text-xs rounded-2xl resize-none border-0 focus:outline-none"
            />
          </div>
        </>
      )}
    </div>
  );
}
