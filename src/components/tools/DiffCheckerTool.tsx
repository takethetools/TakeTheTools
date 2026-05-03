"use client";

import { useState } from "react";
import { Columns2, Copy, Check, Info, ArrowRightLeft } from "lucide-react";
import { cn } from "@/lib/utils";

export default function DiffCheckerTool() {
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [diff, setDiff] = useState<{ type: "added" | "removed" | "equal"; value: string }[]>([]);

  const checkDiff = () => {
    // Very simple line-based diff for demo purposes
    // In production, would use a library like 'diff'
    const lines1 = text1.split("\n");
    const lines2 = text2.split("\n");
    const result: any[] = [];

    const maxLines = Math.max(lines1.length, lines2.length);
    for (let i = 0; i < maxLines; i++) {
        const l1 = lines1[i] || "";
        const l2 = lines2[i] || "";
        
        if (l1 === l2) {
            result.push({ type: "equal", value: l1 });
        } else {
            if (l1) result.push({ type: "removed", value: l1 });
            if (l2) result.push({ type: "added", value: l2 });
        }
    }
    setDiff(result);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h4 className="font-bold text-slate-500 text-xs uppercase tracking-widest pl-2">Original Text</h4>
          <textarea
            value={text1}
            onChange={(e) => setText1(e.target.value)}
            className="w-full h-64 p-6 bg-white border border-slate-200 rounded-3xl font-mono text-sm focus:ring-2 focus:ring-primary-500 outline-none resize-none shadow-sm"
            placeholder="Paste original text here..."
          />
        </div>
        <div className="space-y-4">
          <h4 className="font-bold text-slate-500 text-xs uppercase tracking-widest pl-2">Changed Text</h4>
          <textarea
            value={text2}
            onChange={(e) => setText2(e.target.value)}
            className="w-full h-64 p-6 bg-white border border-slate-200 rounded-3xl font-mono text-sm focus:ring-2 focus:ring-primary-500 outline-none resize-none shadow-sm"
            placeholder="Paste modified text here..."
          />
        </div>
      </div>

      <button 
        onClick={checkDiff}
        className="w-full py-4 bg-primary-600 text-white rounded-2xl font-bold shadow-lg shadow-primary-500/20 hover:bg-primary-700 transition-all flex items-center justify-center gap-2"
      >
        <ArrowRightLeft className="w-5 h-5" /> Compare Texts
      </button>

      {diff.length > 0 && (
        <div className="bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl animate-in zoom-in-95 duration-500">
          <div className="bg-slate-800/50 px-6 py-4 flex items-center gap-2 border-b border-slate-700">
            <Columns2 className="w-4 h-4 text-primary-400" />
            <span className="text-sm font-bold text-slate-300">Comparison Result</span>
          </div>
          <div className="p-6 font-mono text-sm space-y-1 max-h-[500px] overflow-y-auto">
            {diff.map((line, i) => (
              <div 
                key={i} 
                className={cn(
                  "px-3 py-1 rounded flex gap-4",
                  line.type === "added" && "bg-green-500/10 text-green-400",
                  line.type === "removed" && "bg-red-500/10 text-red-400",
                  line.type === "equal" && "text-slate-400"
                )}
              >
                <span className="w-4 opacity-50 select-none">
                  {line.type === "added" ? "+" : line.type === "removed" ? "-" : " "}
                </span>
                <span className="break-all">{line.value || " "}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
