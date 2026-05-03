"use client";

import { useState } from "react";
import { Instagram, Copy, Check, Zap, Type, Sparkles } from "lucide-react";

export default function InstaBioFontGeneratorTool() {
  const [input, setInput] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  // Fancy font maps
  const fonts = [
    { name: "Serif", map: (t: string) => t.replace(/[a-zA-Z]/g, (c) => {
        const charCode = c.charCodeAt(0);
        return charCode >= 65 && charCode <= 90 ? String.fromCodePoint(0x1D400 + charCode - 65) : String.fromCodePoint(0x1D41A + charCode - 97);
    }) },
    { name: "Script", map: (t: string) => t.replace(/[a-zA-Z]/g, (c) => {
        const charCode = c.charCodeAt(0);
        return charCode >= 65 && charCode <= 90 ? String.fromCodePoint(0x1D4D0 + charCode - 65) : String.fromCodePoint(0x1D4EA + charCode - 97);
    }) },
    { name: "Fraktur", map: (t: string) => t.replace(/[a-zA-Z]/g, (c) => {
        const charCode = c.charCodeAt(0);
        return charCode >= 65 && charCode <= 90 ? String.fromCodePoint(0x1D504 + charCode - 65) : String.fromCodePoint(0x1D51E + charCode - 97);
    }) },
    { name: "Double Struck", map: (t: string) => t.replace(/[a-zA-Z]/g, (c) => {
        const charCode = c.charCodeAt(0);
        return charCode >= 65 && charCode <= 90 ? String.fromCodePoint(0x1D538 + charCode - 65) : String.fromCodePoint(0x1D552 + charCode - 97);
    }) },
  ];

  const results = input ? fonts.map(f => ({ name: f.name, text: f.map(input) })) : [];

  const copyResult = (text: string) => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-8">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center text-pink-600">
          <Instagram className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900">Insta Bio Font Generator</h3>
          <p className="text-sm text-slate-500">Create cool fancy text for your Instagram profile</p>
        </div>
      </div>

      <div className="space-y-6">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full p-6 bg-slate-50 border border-slate-100 rounded-2xl text-lg font-bold text-slate-700 outline-none focus:ring-2 focus:ring-pink-500/20"
          placeholder="Type your bio text here..."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           {results.map((res, i) => (
             <div key={i} className="p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:border-pink-200 transition-all group relative">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">{res.name}</span>
                <p className="text-xl text-slate-800 font-medium mb-4">{res.text}</p>
                <button 
                  onClick={() => copyResult(res.text)}
                  className="w-full py-2 bg-white text-slate-600 border border-slate-200 rounded-xl text-xs font-bold hover:bg-pink-600 hover:text-white hover:border-pink-600 transition-all"
                >
                  Copy Style
                </button>
             </div>
           ))}
           {input === "" && (
             <div className="col-span-full py-20 text-center text-slate-400 space-y-4">
                <Sparkles className="w-12 h-12 mx-auto opacity-20" />
                <p className="italic">Type something to see fancy fonts</p>
             </div>
           )}
        </div>
      </div>
    </div>
  );
}
