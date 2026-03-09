"use client";

import { useState, useRef } from "react";
import FileUpload from "./FileUpload";
import { Download, FileImage, Loader2, RefreshCw, Files } from "lucide-react";
import JSZip from "jszip";
import confetti from "canvas-confetti";

export default function PdfToJpgTool() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [pages, setPages] = useState<{ id: number, url: string }[]>([]);
  const [progress, setProgress] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);

  const onFilesSelected = (files: File[]) => {
    if (files.length > 0) {
      setFile(files[0]);
      setPages([]);
      setProgress(0);
    }
  };

  const convertToJpg = async () => {
    if (!file) return;
    setIsProcessing(true);
    setPages([]);

    try {
    // Import PDF.js dynamically
    // @ts-ignore
    const pdfjs = await import("pdfjs-dist/build/pdf");
    // @ts-ignore
    await import("pdfjs-dist/build/pdf.worker.entry");

      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
      const numPages = pdf.numPages;
      const convertedPages = [];

      for (let i = 1; i <= numPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 2.0 }); // High quality
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        if (!context) continue;

        canvas.height = viewport.height;
        canvas.width = viewport.width;

        await page.render({
          canvasContext: context,
          viewport: viewport,
        }).promise;

        const url = canvas.toDataURL("image/jpeg", 0.9);
        convertedPages.push({ id: i, url });
        setProgress(Math.round((i / numPages) * 100));
      }

      setPages(convertedPages);
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (error) {
      console.error("PDF to JPG conversion failed:", error);
      alert("Failed to convert PDF. Please ensure the file is a valid PDF.");
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadAllAsZip = async () => {
    if (pages.length === 0) return;
    const zip = new JSZip();
    pages.forEach((page) => {
      const data = page.url.split(",")[1];
      zip.file(`page-${page.id}.jpg`, data, { base64: true });
    });
    const content = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(content);
    const link = document.createElement("a");
    link.href = url;
    link.download = "pdf-pages.zip";
    link.click();
  };

  const clear = () => {
    setFile(null);
    setPages([]);
    setProgress(0);
  };

  return (
    <div className="space-y-6">
      {!file ? (
        <FileUpload 
          onFilesSelected={onFilesSelected} 
          accept={{ 'application/pdf': ['.pdf'] }}
        />
      ) : (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 flex items-center gap-2">
                <Files className="w-5 h-5 text-primary-600" />
                {file.name}
              </h3>
              <button 
                onClick={clear}
                className="text-xs font-bold text-slate-400 hover:text-red-500 transition-colors"
                disabled={isProcessing}
              >
                Change File
              </button>
            </div>

            {!pages.length ? (
              <button 
                onClick={convertToJpg}
                disabled={isProcessing}
                className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-primary-600 text-white rounded-xl font-bold shadow-lg shadow-primary-500/20 hover:bg-primary-700 transition-all disabled:opacity-50"
              >
                {isProcessing ? <Loader2 className="w-5 h-5 animate-spin" /> : <FileImage className="w-5 h-5" />}
                {isProcessing ? `Converting... ${progress}%` : "Convert PDF to JPG"}
              </button>
            ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {pages.map((page) => (
                    <div key={page.id} className="relative group aspect-[1/1.4] rounded-xl overflow-hidden border border-slate-100 bg-slate-50 shadow-sm">
                      <img src={page.url} alt={`Page ${page.id}`} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                        <a 
                          href={page.url} 
                          download={`page-${page.id}.jpg`}
                          className="p-2 bg-white text-slate-900 rounded-lg shadow-lg hover:scale-105 transition-transform"
                        >
                          <Download className="w-4 h-4" />
                        </a>
                      </div>
                      <div className="absolute bottom-2 right-2 px-2 py-1 bg-white/90 backdrop-blur-sm rounded text-[10px] font-bold text-slate-600">
                        Page {page.id}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-slate-50">
                  <button 
                    onClick={downloadAllAsZip}
                    className="flex-grow flex items-center justify-center gap-2 px-8 py-4 bg-green-600 text-white rounded-xl font-bold shadow-lg shadow-green-500/20 hover:bg-green-700 transition-all"
                  >
                    <Download className="w-5 h-5" /> Download All (ZIP)
                  </button>
                  <button 
                    onClick={clear}
                    className="px-8 py-4 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200 transition-all flex items-center justify-center gap-2"
                  >
                    <RefreshCw className="w-5 h-5" /> Start Over
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
