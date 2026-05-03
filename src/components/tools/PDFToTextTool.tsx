"use client";
<<<<<<< HEAD
import FileUpload from "./FileUpload";
=======
>>>>>>> d366566fdaff0e02dbc3205770509d5194ddbac9

import { useState } from "react";
import { Upload, Download, FileText, Loader2, Copy, Check, X } from "lucide-react";
import * as pdfjsLib from "pdfjs-dist";

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;

export default function PDFToTextTool() {
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

<<<<<<< HEAD
  const onFilesSelected = async (selectedFiles: File[]) => {
    const uploadedFile = selectedFiles[0];
=======
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
>>>>>>> d366566fdaff0e02dbc3205770509d5194ddbac9
    if (uploadedFile) {
      setFile(uploadedFile);
      setIsProcessing(true);
      
      try {
        const arrayBuffer = await uploadedFile.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        let fullText = "";
        
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          const pageText = content.items.map((item: any) => item.str).join(" ");
          fullText += `--- Page ${i} ---\n${pageText}\n\n`;
        }
        
        setText(fullText);
      } catch (err) {
        console.error(err);
        alert("Error extracting text from PDF.");
      }
      setIsProcessing(false);
    }
  };

  const copyText = () => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const downloadText = () => {
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${file?.name.split('.')[0] || 'text'}.txt`;
    link.click();
  };

  return (
    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-8">
      {!file ? (
<<<<<<< HEAD
        <FileUpload onFilesSelected={onFilesSelected} accept={{ "application/pdf": [".pdf"] }} multiple={false} />
=======
        <label className="border-2 border-dashed border-slate-200 rounded-3xl p-20 flex flex-col items-center justify-center gap-4 cursor-pointer hover:bg-slate-50 transition-colors">
          <input type="file" accept="application/pdf" onChange={handleUpload} className="hidden" />
          <Upload className="w-12 h-12 text-slate-300" />
          <p className="font-bold text-slate-700">Upload PDF to extract text</p>
        </label>
>>>>>>> d366566fdaff0e02dbc3205770509d5194ddbac9
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
             <div className="flex items-center gap-3">
                <FileText className="w-6 h-6 text-primary-600" />
                <h3 className="font-bold text-slate-900">{file.name}</h3>
             </div>
             <div className="flex gap-2">
                <button onClick={copyText} className="p-3 bg-slate-100 text-slate-600 rounded-xl hover:bg-slate-200 transition-all shadow-sm">
                  {isCopied ? <Check className="w-5 h-5 text-green-600" /> : <Copy className="w-5 h-5" />}
                </button>
                <button onClick={downloadText} className="flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-xl font-bold shadow-lg shadow-primary-500/20">
                  <Download className="w-5 h-5" /> Download .txt
                </button>
                <button onClick={() => {setFile(null); setText("");}} className="p-3 bg-slate-100 text-slate-600 rounded-xl">
                  <X className="w-5 h-5" />
                </button>
             </div>
          </div>

          <div className="relative">
            {isProcessing && (
              <div className="absolute inset-0 bg-white/50 backdrop-blur-sm flex items-center justify-center z-10 rounded-2xl">
                <div className="flex flex-col items-center gap-4">
                  <Loader2 className="w-10 h-10 text-primary-600 animate-spin" />
                  <p className="font-bold text-slate-700">Extracting text...</p>
                </div>
              </div>
            )}
            <textarea 
              value={text} 
              readOnly 
              className="w-full h-[500px] bg-slate-50 border border-slate-100 rounded-2xl p-6 font-mono text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
              placeholder="Extracted text will appear here..."
            ></textarea>
          </div>
        </div>
      )}
    </div>
  );
}
