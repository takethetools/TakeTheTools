"use client";

import { useState } from "react";
<<<<<<< HEAD
import { Download, Type, FileText, Loader2, Check } from "lucide-react";
import FileUpload from "./FileUpload";
=======
import { Upload, Download, Type, FileText, Loader2, Check } from "lucide-react";
>>>>>>> d366566fdaff0e02dbc3205770509d5194ddbac9
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

export default function WatermarkPDFTool() {
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState("CONFIDENTIAL");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDone, setIsDone] = useState(false);

<<<<<<< HEAD
  const onFilesSelected = (files: File[]) => {
    if (files.length > 0) setFile(files[0]);
=======
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    if (uploadedFile) setFile(uploadedFile);
>>>>>>> d366566fdaff0e02dbc3205770509d5194ddbac9
  };

  const addWatermark = async () => {
    if (!file || !text) return;
    setIsProcessing(true);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
      const pages = pdfDoc.getPages();

      pages.forEach((page) => {
        const { width, height } = page.getSize();
        page.drawText(text, {
          x: width / 2 - 100,
          y: height / 2,
          size: 50,
          font: font,
          color: rgb(0.7, 0.7, 0.7),
          opacity: 0.4,
          rotate: { angle: 45, type: "degrees" } as any,
        });
      });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes as any], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `watermarked-${file.name}`;
      link.click();
      
      setIsProcessing(false);
      setIsDone(true);
    } catch (err) {
      console.error(err);
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-8 text-center">
       <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center text-primary-600 mx-auto">
         <Type className="w-8 h-8" />
       </div>
       <div className="max-w-md mx-auto space-y-2">
         <h3 className="text-2xl font-bold text-slate-900">Watermark PDF</h3>
         <p className="text-slate-500">Protect your documents by adding a transparent watermark across every page.</p>
       </div>

       {!file ? (
<<<<<<< HEAD
         <FileUpload onFilesSelected={onFilesSelected} accept={{ "application/pdf": [".pdf"] }} multiple={false} />
=======
         <label className="border-2 border-dashed border-slate-200 rounded-3xl p-12 flex flex-col items-center justify-center gap-4 cursor-pointer hover:bg-slate-50 transition-colors">
           <input type="file" accept="application/pdf" onChange={handleUpload} className="hidden" />
           <Upload className="w-8 h-8 text-slate-300" />
           <p className="font-bold text-slate-700">Select PDF File</p>
         </label>
>>>>>>> d366566fdaff0e02dbc3205770509d5194ddbac9
       ) : (
         <div className="space-y-6 max-w-sm mx-auto">
            <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl flex items-center gap-3">
               <FileText className="w-6 h-6 text-primary-600" />
               <p className="text-sm font-bold text-slate-700 truncate">{file.name}</p>
            </div>

            <div className="space-y-2 text-left">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-2">Watermark Text</label>
              <input 
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full bg-slate-100 border-none rounded-2xl px-6 py-4 font-bold text-slate-700 focus:ring-2 focus:ring-primary-500 outline-none"
              />
            </div>

            <button 
              onClick={addWatermark}
              disabled={!text || isProcessing}
              className="w-full py-4 bg-primary-600 text-white rounded-2xl font-bold shadow-xl shadow-primary-500/20 hover:bg-primary-700 transition-all disabled:opacity-50"
            >
              {isProcessing ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : "Add Watermark"}
            </button>

            {isDone && (
              <div className="bg-green-50 text-green-700 p-4 rounded-xl font-bold flex items-center justify-center gap-2">
                <Check className="w-5 h-5" /> Downloaded successfully!
              </div>
            )}
         </div>
       )}
    </div>
  );
}
