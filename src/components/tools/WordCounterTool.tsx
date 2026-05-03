"use client";

import { useState, useMemo } from "react";
import { Type, Clock, Mic, BarChart3, ListOrdered } from "lucide-react";
import { cn } from "@/lib/utils";
import ToolActionBar from "./shared/ToolActionBar";

interface WordCounterToolProps {
  exampleInput?: string;
}

export default function WordCounterTool({ exampleInput }: WordCounterToolProps) {
  const [text, setText] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  const stats = useMemo(() => {
    const trimmed = text.trim();
    const words = trimmed ? trimmed.split(/\s+/).length : 0;
    const chars = text.length;
    const charsNoSpaces = text.replace(/\s/g, "").length;
    const lines = trimmed ? text.split(/\r\n|\r|\n/).length : 0;
    const paragraphs = trimmed ? text.split(/\n\s*\n/).length : 0;
    const sentences = trimmed ? text.split(/[.!?]+/).filter(s => s.trim().length > 0).length : 0;
    
    // Density analysis
    const wordList = trimmed.toLowerCase().match(/\b\w+\b/g) || [];
    const freq: Record<string, number> = {};
    const stopwords = ["the", "and", "a", "an", "is", "of", "to", "in", "it", "that", "for", "on", "was", "with"];
    wordList.forEach(w => {
      if (w.length > 2 && !stopwords.includes(w)) {
        freq[w] = (freq[w] || 0) + 1;
      }
    });
    const density = Object.entries(freq)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    return {
      words,
      chars,
      charsNoSpaces,
      lines,
      paragraphs,
      sentences,
      readingTime: Math.ceil(words / 200) || 0,
      speakingTime: Math.ceil(words / 130) || 0,
      avgWordLen: words > 0 ? (charsNoSpaces / words).toFixed(1) : "0",
      density
    };
  }, [text]);

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
    a.download = "text-analysis.txt";
    a.click();
  };

  return (
    <div className="space-y-8">
      {/* Top Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {[
          { label: "Words", value: stats.words, icon: Type, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Characters", value: stats.chars, icon: ListOrdered, color: "text-purple-600", bg: "bg-purple-50" },
          { label: "Sentences", value: stats.sentences, icon: Type, color: "text-indigo-600", bg: "bg-indigo-50" },
          { label: "Paragraphs", value: stats.paragraphs, icon: Type, color: "text-amber-600", bg: "bg-amber-50" },
          { label: "Reading", value: `${stats.readingTime}m`, icon: Clock, color: "text-green-600", bg: "bg-green-50" },
          { label: "Speaking", value: `${stats.speakingTime}m`, icon: Mic, color: "text-pink-600", bg: "bg-pink-50" },
        ].map((stat) => (
          <div key={stat.label} className={cn("p-4 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center transition-all hover:scale-105 bg-white")}>
            <div className={cn("w-8 h-8 rounded-full mb-2 flex items-center justify-center", stat.bg)}>
              <stat.icon className={cn("w-4 h-4", stat.color)} />
            </div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
            <p className={cn("text-xl font-black", stat.color)}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <ToolActionBar
            title="Advanced Text Analyzer"
            hasInput={!!text}
            hasOutput={!!text}
            isCopied={isCopied}
            onClear={() => setText("")}
            onCopy={copy}
            onDownload={download}
            onExample={exampleInput ? () => setText(exampleInput) : undefined}
          />
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type or paste your text here to begin advanced analysis..."
            className="w-full h-96 p-8 bg-white border border-slate-200 rounded-[2.5rem] text-lg focus:ring-8 focus:ring-primary-50/50 outline-none transition-all shadow-inner resize-none font-medium text-slate-700"
          />
        </div>

        <div className="space-y-6">
          {/* Density Card */}
          <div className="bg-white p-6 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-primary-600" />
              <h4 className="font-bold text-slate-900">Keyword Density</h4>
            </div>
            {stats.density.length > 0 ? (
              <div className="space-y-3">
                {stats.density.map(([word, count]) => {
                  const percentage = ((count / stats.words) * 100).toFixed(1);
                  return (
                    <div key={word} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="font-mono font-bold text-slate-700">{word}</span>
                        <span className="text-slate-400 font-bold">{count}x ({percentage}%)</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-50 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary-500 rounded-full" 
                          style={{ width: `${Math.min(100, (count / stats.density[0][1]) * 100)}%` }} 
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-xs text-slate-400 italic">Enter text to see keyword frequency analysis.</p>
            )}
          </div>

          {/* More Info */}
          <div className="p-6 bg-primary-600 rounded-[2.5rem] text-white shadow-xl shadow-primary-500/20">
             <h4 className="font-bold mb-2 flex items-center gap-2">
               <Zap className="w-4 h-4" /> Insight
             </h4>
             <p className="text-sm opacity-90 leading-relaxed">
               Average word length is <span className="font-bold">{stats.avgWordLen}</span> characters. 
               {Number(stats.avgWordLen) > 6 ? " Your vocabulary is quite advanced!" : " Your writing is clear and accessible."}
             </p>
          </div>
        </div>
      </div>
    </div>
  );
}

import { Zap } from "lucide-react";
