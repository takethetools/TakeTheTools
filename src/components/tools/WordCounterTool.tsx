"use client";

import { useState, useEffect } from "react";
import { Type } from "lucide-react";
import { cn } from "@/lib/utils";
import ToolActionBar from "./shared/ToolActionBar";

interface WordCounterToolProps {
  exampleInput?: string;
}

export default function WordCounterTool({ exampleInput }: WordCounterToolProps) {
  const [text, setText] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (exampleInput && !text) {
      // Auto-load example if provided and input is empty (optional behavior)
      // For now, we just make it available via the button
    }
  }, [exampleInput]);

  const stats = {
    words: text.trim() ? text.trim().split(/\s+/).length : 0,
    chars: text.length,
    charsNoSpaces: text.replace(/\s/g, "").length,
    lines: text.trim() ? text.split(/\r\n|\r|\n/).length : 0,
    readingTime: Math.ceil((text.trim() ? text.trim().split(/\s+/).length : 0) / 200), // 200 wpm
  };

  const copy = () => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const download = () => {
    if (!text) return;
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "word-count-result.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const loadExample = () => {
    if (exampleInput) {
      setText(exampleInput);
    }
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
        <ToolActionBar
          title="Your Text Analysis"
          hasInput={!!text}
          hasOutput={!!text}
          isCopied={isCopied}
          onClear={() => setText("")}
          onCopy={copy}
          onDownload={download}
          onExample={exampleInput ? loadExample : undefined}
        />

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
