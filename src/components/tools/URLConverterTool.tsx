"use client";

import { useState } from "react";
import { Link, Copy, Check, ArrowRightLeft, AlertCircle, Globe, Download, Trash2 } from "lucide-react";
import confetti from "canvas-confetti";
import { cn } from "@/lib/utils";

interface URLConverterToolProps {
    mode?: "encode" | "decode";
}

export default function URLConverterTool({ mode: initialMode = "encode" }: URLConverterToolProps) {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [mode, setMode] = useState<"encode" | "decode">(initialMode);
    const [error, setError] = useState<string | null>(null);
    const [isCopied, setIsCopied] = useState(false);

    const process = () => {
        setError(null);
        try {
            if (!input.trim()) return;
            if (mode === "encode") {
                const encoded = encodeURIComponent(input);
                setOutput(encoded);
            } else {
                const decoded = decodeURIComponent(input);
                setOutput(decoded);
            }
            confetti({
                particleCount: 50,
                spread: 60,
                origin: { y: 0.8 },
            });
        } catch (e: unknown) {
            setError(e instanceof Error ? e.message : "Invalid input for URL conversion");
            setOutput("");
        }
    };

    const swap = () => {
        setMode(mode === "encode" ? "decode" : "encode");
        setInput(output);
        setOutput("");
        setError(null);
    };

    const copyToClipboard = () => {
        if (!output) return;
        navigator.clipboard.writeText(output);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    const downloadResult = () => {
        if (!output) return;
        const blob = new Blob([output], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = mode === "encode" ? "encoded-url.txt" : "decoded-url.txt";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const clear = () => {
        setInput("");
        setOutput("");
        setError(null);
    };

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="font-bold text-slate-900 flex items-center gap-2">
                            <Globe className="w-5 h-5 text-primary-600" />
                            {mode === "encode" ? "Raw URL/Text" : "Encoded URL"}
                        </h3>
                        <div className="flex gap-4">
                            <button
                                onClick={() => setInput(mode === "encode" ? "https://takethetools.com/search?q=hello world & special characters!" : "https%3A%2F%2Ftakethetools.com%2Fsearch%3Fq%3Dhello%20world%20%26%20special%20characters%21")}
                                className="text-xs font-bold text-primary-500 hover:text-primary-600 transition-colors uppercase tracking-wider"
                            >
                                Example
                            </button>
                            <button onClick={clear} className="text-xs font-bold text-slate-400 hover:text-red-500 transition-colors flex items-center gap-1 uppercase tracking-wider">
                                <Trash2 className="w-3 h-3" /> Clear
                            </button>
                        </div>
                    </div>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={mode === "encode" ? "Enter text or URL to encode..." : "Enter encoded URL to decode..."}
                        className="w-full h-[300px] p-6 bg-white border border-slate-200 rounded-2xl font-mono text-sm focus:ring-2 focus:ring-primary-500 outline-none shadow-inner"
                    />
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="font-bold text-slate-900">{mode === "encode" ? "Encoded Result" : "Decoded Result"}</h3>
                        {output && (
                            <div className="flex gap-2">
                                <button
                                    onClick={downloadResult}
                                    className="p-1.5 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-all"
                                    title="Download as .txt"
                                >
                                    <Download className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={copyToClipboard}
                                    className={cn(
                                        "flex items-center gap-2 px-3 py-1.5 rounded-lg font-bold text-xs transition-all",
                                        isCopied ? "bg-green-100 text-green-700" : "bg-primary-100 text-primary-600 hover:bg-primary-200"
                                    )}
                                >
                                    {isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                    {isCopied ? "Copied!" : "Copy"}
                                </button>
                            </div>
                        )}
                    </div>
                    <div className="relative h-[300px]">
                        <textarea
                            readOnly
                            value={output}
                            placeholder="Conversion result will appear here..."
                            className="w-full h-full p-6 bg-slate-900 text-slate-300 border border-slate-800 rounded-2xl font-mono text-sm outline-none shadow-2xl"
                        />
                        {error && (
                            <div className="absolute inset-x-0 top-0 p-4 bg-red-500/10 backdrop-blur-sm border-b border-red-500/20 text-red-400 text-xs flex items-start gap-2 rounded-t-2xl">
                                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                                <span>{error}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="bg-white border border-slate-200 p-6 rounded-3xl flex flex-wrap items-center justify-between gap-6 shadow-sm">
                <div className="flex items-center gap-4">
                    <div className="flex bg-slate-100 p-1 rounded-xl">
                        <button
                            onClick={() => setMode("encode")}
                            className={cn("px-4 py-2 rounded-lg text-sm font-bold transition-all", mode === "encode" ? "bg-white text-primary-600 shadow-sm" : "text-slate-500 hover:text-slate-700")}
                        >
                            Encode
                        </button>
                        <button
                            onClick={() => setMode("decode")}
                            className={cn("px-4 py-2 rounded-lg text-sm font-bold transition-all", mode === "decode" ? "bg-white text-primary-600 shadow-sm" : "text-slate-500 hover:text-slate-700")}
                        >
                            Decode
                        </button>
                    </div>
                    <button onClick={swap} className="p-2 bg-slate-100 rounded-full hover:bg-slate-200 text-slate-500 transition-colors" title="Swap Input/Output"><ArrowRightLeft className="w-4 h-4" /></button>
                </div>

                <button
                    onClick={process}
                    disabled={!input}
                    className="px-10 py-3 bg-primary-600 text-white rounded-xl font-bold shadow-lg shadow-primary-500/20 hover:bg-primary-700 transition-all disabled:opacity-50"
                >
                    {mode === "encode" ? "Encode URL" : "Decode URL"}
                </button>
            </div>
        </div>
    );
}
