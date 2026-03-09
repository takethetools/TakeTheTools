"use client";

import { useState } from "react";
import { FileText, Eye, Copy, Check, Layout, Columns } from "lucide-react";
import ReactMarkdown from "react-markdown";

export default function MarkdownPreviewerTool() {
  const [input, setInput] = useState("# Hello World\n\nStart typing **markdown** here...");
  const [isCopied, setIsCopied] = useState(false);

  const copyMarkdown = () => {
    navigator.clipboard.writeText(input);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-8">
      <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">Markdown Previewer</h3>
            <p className="text-sm text-slate-500">Real-time preview for your markdown content</p>
          </div>
        </div>
        
        <button onClick={copyMarkdown} className="px-6 py-2.5 bg-slate-100 text-slate-600 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-slate-200">
          {isCopied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
          Copy Markdown
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border border-slate-100 rounded-3xl overflow-hidden min-h-[500px]">
        <div className="flex flex-col border-r border-slate-100">
          <div className="bg-slate-50 px-6 py-3 border-b border-slate-100 flex items-center gap-2">
             <Layout className="w-4 h-4 text-slate-400" />
             <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Editor</span>
          </div>
          <textarea 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-grow w-full p-6 font-mono text-sm text-slate-600 focus:outline-none resize-none bg-white"
            placeholder="Type your markdown here..."
          />
        </div>
        <div className="flex flex-col bg-slate-50/30">
          <div className="bg-slate-50 px-6 py-3 border-b border-slate-100 flex items-center gap-2">
             <Eye className="w-4 h-4 text-slate-400" />
             <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Preview</span>
          </div>
          <div className="flex-grow p-8 prose prose-slate prose-sm max-w-none overflow-auto">
             <ReactMarkdown>{input}</ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
}
