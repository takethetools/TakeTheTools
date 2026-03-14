"use client";

import React from "react";
import { Copy, Download, Trash2, Zap, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface ToolActionBarProps {
    onClear?: () => void;
    onCopy?: () => void;
    onDownload?: () => void;
    onExample?: () => void;
    isCopied?: boolean;
    hasInput?: boolean;
    hasOutput?: boolean;
    title?: string;
    className?: string;
}

export default function ToolActionBar({
    onClear,
    onCopy,
    onDownload,
    onExample,
    isCopied,
    hasInput,
    hasOutput,
    title,
    className
}: ToolActionBarProps) {
    return (
        <div className={cn("flex items-center justify-between mb-4", className)}>
            {title && <h3 className="font-bold text-slate-900">{title}</h3>}
            <div className="flex items-center gap-3 ml-auto">
                {onExample && (
                    <button
                        onClick={onExample}
                        className="text-xs font-bold text-primary-500 hover:text-primary-600 transition-colors uppercase tracking-wider flex items-center gap-1"
                    >
                        <Zap className="w-3 h-3" /> Load Example
                    </button>
                )}
                {onClear && (
                    <button
                        onClick={onClear}
                        disabled={!hasInput}
                        className="text-xs font-bold text-slate-400 hover:text-red-500 transition-colors flex items-center gap-1 uppercase tracking-wider disabled:opacity-30 disabled:hover:text-slate-400"
                    >
                        <Trash2 className="w-3 h-3" /> Clear
                    </button>
                )}
                {onDownload && (
                    <button
                        onClick={onDownload}
                        disabled={!hasOutput}
                        className="p-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-all disabled:opacity-30"
                        title="Download Result"
                    >
                        <Download className="w-4 h-4" />
                    </button>
                )}
                {onCopy && (
                    <button
                        onClick={onCopy}
                        disabled={!hasOutput}
                        className={cn(
                            "flex items-center gap-2 px-3 py-1.5 rounded-lg font-bold text-xs transition-all disabled:opacity-30",
                            isCopied ? "bg-green-100 text-green-700 font-bold" : "bg-primary-100 text-primary-600 hover:bg-primary-200"
                        )}
                    >
                        {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        {isCopied ? "Copied!" : "Copy Result"}
                    </button>
                )}
            </div>
        </div>
    );
}
