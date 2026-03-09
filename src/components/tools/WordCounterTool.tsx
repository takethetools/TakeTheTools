"use client";

import { useState } from "react";
import { Type } from "lucide-react";
import { cn } from "@/lib/utils";

export default function WordCounterTool() {
  const [text, setText] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  const stats = {
    words: text.trim() ? text.trim().split(/\s+/).length : 0,
    chars: text.length,
    charsNoSpaces: text.replace(/\s/g, "").length,
    lines: text.trim() ? text.split(/\r\n|\r|\n/).length : 0,
    readingTime: Math.ceil((text.trim() ? text.trim().split(/\s+/).length : 0) / 200), // 200 wpm
  };

  const copy = () => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { label: "Words", value: stats.words, color: "text-blue-600" },
          { label: "Characters", value: stats.chars, color: "text-purple-600" },
          { label: "No Spaces", value: stats.charsNoSpaces, color: "text-indigo-600" },
          { label: "Lines", value: stats.lines, color: "text-slate-600" },
          { label: "Read Time", value: `${stats.readingTime}m`, color: "text-green-600" },
        ].map((stat) => (
          <div key={stat.label} className="bg-white border border-slate-100 p-4 rounded-2xl shadow-sm text-center">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{stat.label}</p>
            <p className={cn("text-2xl font-display font-bold", stat.color)}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-slate-900 flex items-center gap-2">
            <Type className="w-5 h-5 text-primary-600" />
            Your Text
          </h3>
          <div className="flex gap-4">
            <button onClick={() => setText("")} className="text-xs font-bold text-slate-400 hover:text-red-500 transition-colors">Clear</button>
            <button onClick={copy} className="text-xs font-bold text-primary-500 hover:text-primary-600 transition-colors">
              {isCopied ? "Copied!" : "Copy Text"}
            </button>
          </div>
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type or paste your text here to count words and characters..."
          className="w-full h-64 p-8 bg-white border border-slate-200 rounded-3xl text-lg focus:ring-4 focus:ring-primary-100 outline-none transition-all shadow-inner"
        />
      </div>
    </div>
  );
}
