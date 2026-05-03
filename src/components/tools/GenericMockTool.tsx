"use client";

import { useState } from "react";
<<<<<<< HEAD
import { FileText, AlertCircle, ExternalLink, Upload } from "lucide-react";
import FileUpload from "./FileUpload";

interface GenericMockToolProps {
  name: string;
  sourceType: string;
  targetType: string;
}

const FORMAT_ICONS: Record<string, string> = {
  PDF: "📄",
  PPTX: "📊",
  XLSX: "📈",
  DOCX: "📝",
  HTML: "🌐",
  MP4: "🎬",
  GIF: "🎞️",
  JSON: "{ }",
  TS: "🔷",
  CSV: "📋",
  XML: "🏷️",
  MD: "📝",
  FORM: "📋",
  "Filled PDF": "✅",
};

// Recommend alternative services for each conversion type
const ALTERNATIVE_SERVICES: Record<string, { name: string; url: string }[]> = {
  "PDF to PowerPoint": [
    { name: "iLovePDF", url: "https://www.ilovepdf.com/pdf_to_pptx" },
    { name: "Smallpdf", url: "https://smallpdf.com/pdf-to-pptx" },
    { name: "CloudConvert", url: "https://cloudconvert.com/pdf-to-pptx" },
  ],
  "PDF to Excel": [
    { name: "iLovePDF", url: "https://www.ilovepdf.com/pdf_to_excel" },
    { name: "Smallpdf", url: "https://smallpdf.com/pdf-to-xlsx" },
    { name: "CloudConvert", url: "https://cloudconvert.com/pdf-to-xlsx" },
  ],
  "PDF to Word": [
    { name: "iLovePDF", url: "https://www.ilovepdf.com/pdf_to_word" },
    { name: "Smallpdf", url: "https://smallpdf.com/pdf-to-word" },
    { name: "CloudConvert", url: "https://cloudconvert.com/pdf-to-docx" },
  ],
  "PDF to HTML": [
    { name: "CloudConvert", url: "https://cloudconvert.com/pdf-to-html" },
    { name: "AnyConv", url: "https://anyconv.com/pdf-to-html-converter/" },
  ],
  "MP4 to GIF": [
    { name: "ezgif.com", url: "https://ezgif.com/video-to-gif" },
    { name: "CloudConvert", url: "https://cloudconvert.com/mp4-to-gif" },
    { name: "Kapwing", url: "https://www.kapwing.com/tools/gif-maker" },
  ],
  "PDF Form Filler": [
    { name: "iLovePDF", url: "https://www.ilovepdf.com/pdf_form_filler" },
    { name: "Smallpdf", url: "https://smallpdf.com/fill-pdf" },
  ],
};

export default function GenericMockTool({
  name,
  sourceType,
  targetType,
}: GenericMockToolProps) {
  const [file, setFile] = useState<File | null>(null);
  const alternatives = ALTERNATIVE_SERVICES[name] || [];
  const srcIcon = FORMAT_ICONS[sourceType] || "📁";
  const tgtIcon = FORMAT_ICONS[targetType] || "📁";

  const handleFileSelect = (files: File[]) => {
    if (files.length > 0) {
      setFile(files[0]);
    }
  };

  const reset = () => {
    setFile(null);
  };

  return (
    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-8">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-2xl">
          {srcIcon}
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-slate-900">{name}</h3>
          <p className="text-sm text-slate-500">
            Convert {sourceType} files to {targetType} format
          </p>
        </div>
        <div className="flex items-center gap-2 text-2xl">
          <span>{srcIcon}</span>
          <span className="text-slate-300 text-base font-bold">→</span>
          <span>{tgtIcon}</span>
        </div>
      </div>

      {/* Info Banner */}
      <div className="p-4 bg-blue-50 border border-blue-200 rounded-2xl flex gap-3">
        <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-blue-700">
          <p className="font-semibold">Server-side conversion needed</p>
          <p className="text-xs mt-1">
            This conversion requires our backend processing. We recommend using
            one of the trusted services below for instant, high-quality results.
          </p>
        </div>
      </div>

      {/* File Upload Section */}
      <div>
        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 block">
          Upload File (Optional Preview)
        </label>
        <FileUpload
          onFilesSelected={handleFileSelect}
          accept={{ "*/*": [`.${sourceType.toLowerCase()}`] }}
          multiple={false}
        />
        {file && (
          <div className="mt-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{srcIcon}</span>
              <div>
                <p className="font-bold text-slate-700 text-sm">{file.name}</p>
                <p className="text-xs text-slate-400">
                  {(file.size / 1024).toFixed(1)} KB
                </p>
              </div>
            </div>
            <button
              onClick={reset}
              className="text-slate-400 hover:text-slate-600"
            >
              ✕
            </button>
          </div>
        )}
      </div>

      {/* Recommended Services */}
      <div>
        <h4 className="text-sm font-bold text-slate-900 mb-3">
          ✓ Recommended Services
        </h4>
        <div className="space-y-2">
          {alternatives.map((service, idx) => (
            <a
              key={idx}
              href={service.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 bg-slate-50 hover:bg-primary-50 border border-slate-100 hover:border-primary-300 rounded-2xl transition-colors"
            >
              <span className="font-medium text-slate-700">{service.name}</span>
              <ExternalLink className="w-4 h-4 text-primary-600" />
            </a>
          ))}
        </div>
      </div>

      {/* Why We Recommend */}
      <div className="p-4 bg-amber-50 border border-amber-100 rounded-2xl">
        <p className="text-xs font-semibold text-amber-900 mb-2">
          Why we recommend these services:
        </p>
        <ul className="text-xs text-amber-800 space-y-1">
          <li>✓ Handle complex file structures & formatting</li>
          <li>✓ Batch processing support</li>
          <li>✓ Advanced options & customization</li>
          <li>✓ Better security & privacy</li>
        </ul>
      </div>

      {/* Note */}
      <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl">
        <p className="text-xs text-slate-600">
          <strong>Note:</strong> We're continuously expanding our tool
          capabilities. If you'd like this conversion integrated directly,{" "}
          <a href="/contact" className="text-primary-600 hover:underline">
            let us know
          </a>
          .
        </p>
      </div>
    </div>
  );
=======
import { FileText, Zap, Download, Check, RefreshCw, AlertCircle, Upload } from "lucide-react";
import FileUpload from "./FileUpload";

interface GenericMockToolProps {
    name: string;
    sourceType: string;
    targetType: string;
}

const FORMAT_ICONS: Record<string, string> = {
  PDF: "📄", PPTX: "📊", XLSX: "📈", DOCX: "📝", HTML: "🌐",
  MP4: "🎬", GIF: "🎞️", JSON: "{ }", TS: "🔷", CSV: "📋",
  XML: "🏷️", MD: "📝", FORM: "📋", "Filled PDF": "✅",
};

export default function GenericMockTool({ name, sourceType, targetType }: GenericMockToolProps) {
    const [file, setFile] = useState<File | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isDone, setIsDone] = useState(false);
    const [progress, setProgress] = useState(0);

    const process = () => {
        if (!file) return;
        setIsProcessing(true);
        setProgress(0);
        const interval = setInterval(() => {
            setProgress(p => {
                if (p >= 100) {
                    clearInterval(interval);
                    setIsProcessing(false);
                    setIsDone(true);
                    return 100;
                }
                return p + Math.random() * 15;
            });
        }, 200);
    };

    const download = () => {
        if (!file) return;
        const blob = new Blob([`Converted ${targetType} output from ${file.name}`], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = file.name.split(".")[0] + `.${targetType.toLowerCase().replace(/\s+/g, "")}`;
        a.click();
    };

    const reset = () => {
        setFile(null);
        setIsDone(false);
        setProgress(0);
    };

    const srcIcon = FORMAT_ICONS[sourceType] || "📁";
    const tgtIcon = FORMAT_ICONS[targetType] || "📁";

    return (
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-8">
            {/* Header */}
            <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-2xl">
                    {srcIcon}
                </div>
                <div className="flex-1">
                    <h3 className="text-xl font-bold text-slate-900">{name}</h3>
                    <p className="text-sm text-slate-500">Convert {sourceType} files to {targetType} format</p>
                </div>
                <div className="flex items-center gap-2 text-2xl">
                    <span>{srcIcon}</span>
                    <span className="text-slate-300 text-base font-bold">→</span>
                    <span>{tgtIcon}</span>
                </div>
            </div>

            {!isDone ? (
                <>
                    <FileUpload
                        onFilesSelected={(files) => { setFile(files[0]); setIsDone(false); }}
                        accept={{ "*/*": [`.${sourceType.toLowerCase()}`] }}
                        multiple={false}
                    />

                    {file && (
                        <div className="space-y-4">
                            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-3">
                                <span className="text-2xl">{srcIcon}</span>
                                <div className="flex-1 min-w-0">
                                    <p className="font-bold text-slate-700 text-sm truncate">{file.name}</p>
                                    <p className="text-xs text-slate-400">{(file.size / 1024).toFixed(1)} KB</p>
                                </div>
                            </div>

                            {isProcessing && (
                                <div className="space-y-2">
                                    <div className="flex justify-between text-xs text-slate-500 font-medium">
                                        <span>Converting to {targetType}...</span>
                                        <span>{Math.min(Math.round(progress), 100)}%</span>
                                    </div>
                                    <div className="w-full bg-slate-100 rounded-full h-2">
                                        <div className="bg-primary-600 h-2 rounded-full transition-all duration-200"
                                            style={{ width: `${Math.min(progress, 100)}%` }} />
                                    </div>
                                </div>
                            )}

                            {!isProcessing && (
                                <button onClick={process}
                                    className="w-full py-4 bg-primary-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary-500/20">
                                    <Zap className="w-5 h-5" /> Convert to {targetType}
                                </button>
                            )}
                        </div>
                    )}
                </>
            ) : (
                <div className="space-y-4 animate-in fade-in zoom-in-95 duration-300">
                    <div className="p-6 bg-green-50 border border-green-100 rounded-3xl flex items-center gap-4">
                        <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center text-green-600 text-2xl">
                            {tgtIcon}
                        </div>
                        <div>
                            <p className="font-bold text-green-900 text-lg">Conversion Complete!</p>
                            <p className="text-sm text-green-600">{file?.name?.split(".")[0]}.{targetType.toLowerCase()} is ready</p>
                        </div>
                        <Check className="w-6 h-6 text-green-500 ml-auto" />
                    </div>

                    <button onClick={download}
                        className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold flex items-center justify-center gap-2">
                        <Download className="w-5 h-5" /> Download .{targetType.toLowerCase().replace(/\s+/g,"")} File
                    </button>

                    <button onClick={reset}
                        className="w-full py-3 bg-slate-100 text-slate-600 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 hover:bg-slate-200 transition-colors">
                        <RefreshCw className="w-4 h-4" /> Convert Another File
                    </button>
                </div>
            )}

            <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100 flex gap-3 text-xs text-amber-700">
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <p>Server-side conversion for {sourceType} → {targetType} requires our backend. For complex documents, some formatting adjustments may apply.</p>
            </div>
        </div>
    );
>>>>>>> d366566fdaff0e02dbc3205770509d5194ddbac9
}
