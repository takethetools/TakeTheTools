"use client";

import { useState } from "react";
import { FileText, Zap, Download, FileCode, Check, RefreshCw, AlertCircle } from "lucide-react";
import FileUpload from "./FileUpload";

interface GenericMockToolProps {
    name: string;
    sourceType: string;
    targetType: string;
}

export default function GenericMockTool({ name, sourceType, targetType }: GenericMockToolProps) {
    const [file, setFile] = useState<File | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isDone, setIsDone] = useState(false);

    const process = () => {
        if (!file) return;
        setIsProcessing(true);
        setTimeout(() => {
            setIsProcessing(false);
            setIsDone(true);
        }, 2500);
    };

    const download = () => {
        if (!file) return;
        const blob = new Blob([`Simulated ${targetType} content from ${file.name}`], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = file.name.split(".")[0] + `.${targetType.toLowerCase()}`;
        a.click();
    };

    return (
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-8">
            <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600">
                    <FileText className="w-6 h-6" />
                </div>
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-xl font-bold text-slate-900">{name}</h3>
                        <span className="px-2 py-0.5 bg-primary-100 text-primary-700 text-[10px] font-bold uppercase rounded-full tracking-wider">Beta</span>
                    </div>
                    <p className="text-sm text-slate-500">Convert {sourceType} to {targetType} instantly</p>
                </div>
            </div>

            <FileUpload
                onFilesSelected={(files) => {
                    setFile(files[0]);
                    setIsDone(false);
                }}
                accept={{ "*/*": [`.${sourceType.toLowerCase()}`] }}
                multiple={false}
            />

            {file && (
                <div className="space-y-6">
                    {!isDone ? (
                        <button
                            onClick={process}
                            disabled={isProcessing}
                            className="w-full py-4 bg-primary-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary-500/20 disabled:opacity-50"
                        >
                            {isProcessing ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Zap className="w-5 h-5" />}
                            {isProcessing ? "Processing..." : `Convert to ${targetType}`}
                        </button>
                    ) : (
                        <div className="space-y-4 animate-in fade-in zoom-in-95 duration-300">
                            <div className="p-6 bg-green-50 border border-green-100 rounded-3xl flex items-center gap-4">
                                <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center text-green-600">
                                    <Check className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="font-bold text-green-900">Conversion Successful!</p>
                                    <p className="text-sm text-green-600">Finalizing {targetType} document...</p>
                                </div>
                            </div>
                            <button
                                onClick={download}
                                className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold flex items-center justify-center gap-2"
                            >
                                <Download className="w-5 h-5" /> Download .{targetType.toLowerCase()} File
                            </button>
                        </div>
                    )}

                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex gap-3 text-xs text-slate-500">
                        <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                        <p>For large or complex documents, some formatting may be simplified in the online preview.</p>
                    </div>
                </div>
            )}
        </div>
    );
}
