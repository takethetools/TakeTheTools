"use client";

import { useState } from "react";
import { FileText, Copy, Check, RefreshCw, Settings2 } from "lucide-react";
import { cn } from "@/lib/utils";

const LOREM_TEXT = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

export default function LoremIpsumGeneratorTool() {
  const [count, setCount] = useState(3);
  const [type, setType] = useState<"paragraphs" | "words" | "sentences">("paragraphs");
  const [generatedText, setGeneratedText] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  const generate = () => {
    let result = "";
    const words = LOREM_TEXT.split(" ");
    const sentences = LOREM_TEXT.split(". ");

    if (type === "paragraphs") {
      for (let i = 0; i < count; i++) {
        result += LOREM_TEXT + "\n\n";
      }
    } else if (type === "sentences") {
      for (let i = 0; i < count; i++) {
        result += sentences[i % sentences.length] + ". ";
      }
    } else {
      for (let i = 0; i < count; i++) {
        result += words[i % words.length] + " ";
      }
    }

    setGeneratedText(result.trim());
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-8">
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
          <div className="flex items-center gap-3">
            <Settings2 className="w-6 h-6 text-primary-600" />
            <h3 className="text-xl font-bold text-slate-900">Generator Settings</h3>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <div className="flex bg-slate-100 p-1 rounded-xl">
              {(["paragraphs", "sentences", "words"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setType(t)}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-bold capitalize transition-all",
                    type === t ? "bg-white text-primary-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
                  )}
                >
                  {t}
                </button>
              ))}
            </div>
            
            <div className="flex items-center gap-3 bg-slate-100 px-4 py-2 rounded-xl">
              <span className="text-sm font-bold text-slate-500">Amount:</span>
              <input 
                type="number" 
                value={count} 
                onChange={(e) => setCount(Math.max(1, Math.min(100, parseInt(e.target.value) || 1)))}
                className="w-16 bg-transparent border-none outline-none font-bold text-primary-600"
              />
            </div>
          </div>
        </div>

        <button 
          onClick={generate}
          className="w-full py-4 bg-primary-600 text-white rounded-2xl font-bold shadow-lg shadow-primary-500/20 hover:bg-primary-700 transition-all flex items-center justify-center gap-2"
        >
          <RefreshCw className="w-5 h-5" /> Generate Placeholder Text
        </button>

        {generatedText && (
          <div className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-500">
                <FileText className="w-4 h-4" /> Resulting Text
              </div>
              <button 
                onClick={copyToClipboard}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm transition-all",
                  isCopied ? "bg-green-100 text-green-700" : "bg-primary-100 text-primary-600 hover:bg-primary-200"
                )}
              >
                {isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {isCopied ? "Copied!" : "Copy All"}
              </button>
            </div>
            <div className="p-8 bg-slate-50 border border-slate-100 rounded-2xl text-slate-600 leading-relaxed font-medium whitespace-pre-wrap">
              {generatedText}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
