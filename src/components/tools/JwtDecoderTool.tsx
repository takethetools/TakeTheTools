"use client";

import { useState } from "react";
import { Shield, FileCode, AlertCircle, Copy, Check, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function JwtDecoderTool() {
  const [input, setInput] = useState("");
  const [header, setHeader] = useState("");
  const [payload, setPayload] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  const decodeJwt = () => {
    setError(null);
    try {
      if (!input.trim()) return;
      const parts = input.split(".");
      if (parts.length !== 3) {
        throw new Error("Invalid JWT format. Should have 3 parts separated by dots.");
      }

      const decodedHeader = JSON.stringify(JSON.parse(atob(parts[0])), null, 2);
      const decodedPayload = JSON.stringify(JSON.parse(atob(parts[1])), null, 2);

      setHeader(decodedHeader);
      setPayload(decodedPayload);
    } catch (e: any) {
      setError(e.message || "Failed to decode JWT");
      setHeader("");
      setPayload("");
    }
  };

  const copyPayload = () => {
    if (!payload) return;
    navigator.clipboard.writeText(payload);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="font-bold text-slate-900 flex items-center gap-2">
          <Shield className="w-5 h-5 text-primary-600" />
          Enter JWT Token
        </h3>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste your JWT here..."
          className="w-full h-32 p-6 bg-white border border-slate-200 rounded-2xl font-mono text-sm focus:ring-2 focus:ring-primary-500 outline-none"
        />
        <button 
          onClick={decodeJwt}
          className="w-full py-4 bg-primary-600 text-white rounded-xl font-bold shadow-lg hover:bg-primary-700 transition-all"
        >
          Decode JWT
        </button>
      </div>

      {error ? (
        <div className="p-6 bg-red-50 border border-red-100 rounded-2xl flex items-start gap-4 text-red-700">
          <AlertCircle className="w-6 h-6 flex-shrink-0" />
          <p className="font-medium">{error}</p>
        </div>
      ) : payload && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-bold text-slate-500 uppercase tracking-widest text-xs">Header</h4>
            <div className="bg-slate-900 rounded-2xl p-6 font-mono text-sm text-pink-400 overflow-auto max-h-[400px]">
              <pre>{header}</pre>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-bold text-slate-500 uppercase tracking-widest text-xs">Payload</h4>
              <button 
                onClick={copyPayload}
                className="text-xs font-bold text-primary-500 hover:text-primary-600 transition-colors"
              >
                {isCopied ? "Copied!" : "Copy Payload"}
              </button>
            </div>
            <div className="bg-slate-900 rounded-2xl p-6 font-mono text-sm text-blue-400 overflow-auto max-h-[400px]">
              <pre>{payload}</pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
