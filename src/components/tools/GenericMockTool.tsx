"use client";

import { useState } from "react";
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
}
