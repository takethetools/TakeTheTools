"use client";

import { useState, useRef } from "react";
import { Type, Copy, Check, Zap, Download, Monitor } from "lucide-react";
import { cn } from "@/lib/utils";

const THEMES = [
  { id: "matrix", label: "Matrix", bg: "bg-black", text: "text-green-500", border: "border-green-900" },
  { id: "classic", label: "Classic", bg: "bg-slate-900", text: "text-slate-100", border: "border-slate-800" },
  { id: "vintage", label: "Vintage", bg: "bg-[#2b2b2b]", text: "text-amber-500", border: "border-amber-900" },
  { id: "clean", label: "Clean", bg: "bg-white", text: "text-slate-900", border: "border-slate-200" },
];

export default function ASCIIArtTool() {
  const [input, setInput] = useState("ASCII");
  const [output, setOutput] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [theme, setTheme] = useState(THEMES[0]);
  const preRef = useRef<HTMLPreElement>(null);

  const generate = () => {
    if (!input) return;
    
    const charMap: Record<string, string[]> = {
      'A': ["  A  ", " A A ", "AAAAA", "A   A", "A   A"],
      'B': ["BBBB ", "B   B", "BBBB ", "B   B", "BBBB "],
      'C': [" CCCC", "C    ", "C    ", "C    ", " CCCC"],
      'D': ["DDDD ", "D   D", "D   D", "D   D", "DDDD "],
      'E': ["EEEEE", "E    ", "EEE  ", "E    ", "EEEEE"],
      'F': ["EEEEE", "E    ", "EEE  ", "E    ", "E    "],
      'G': [" GGGG", "G    ", "G  GG", "G   G", " GGGG"],
      'H': ["H   H", "H   H", "HHHHH", "H   H", "H   H"],
      'I': ["IIIII", "  I  ", "  I  ", "  I  ", "IIIII"],
      'J': ["JJJJJ", "    J", "    J", "J   J", " JJJ "],
      'K': ["K   K", "K  K ", "KKK  ", "K  K ", "K   K"],
      'L': ["L    ", "L    ", "L    ", "L    ", "LLLLL"],
      'M': ["M   M", "MM MM", "M M M", "M   M", "M   M"],
      'N': ["N   N", "NN  N", "N N N", "N  NN", "N   N"],
      'O': [" OOO ", "O   O", "O   O", "O   O", " OOO "],
      'P': ["PPPP ", "P   P", "PPPP ", "P    ", "P    "],
      'Q': [" QOO ", "O   O", "O O O", "O  OO", " OOOQ"],
      'R': ["RRRR ", "R   R", "RRRR ", "R  R ", "R   R"],
      'S': [" SSSS", "S    ", " SSS ", "    S", "SSSS "],
      'T': ["TTTTT", "  T  ", "  T  ", "  T  ", "  T  "],
      'U': ["U   U", "U   U", "U   U", "U   U", " UUU "],
      'V': ["V   V", "V   V", "V   V", " V V ", "  V  "],
      'W': ["W   W", "W   W", "W W W", "WW WW", "W   W"],
      'X': ["X   X", " X X ", "  X  ", " X X ", "X   X"],
      'Y': ["Y   Y", " Y Y ", "  Y  ", "  Y  ", "  Y  "],
      'Z': ["ZZZZZ", "   Z ", "  Z  ", " Z   ", "ZZZZZ"],
      ' ': ["     ", "     ", "     ", "     ", "     "],
      '0': [" 000 ", "0   0", "0   0", "0   0", " 000 "],
      '1': ["  1  ", " 11  ", "  1  ", "  1  ", " 111 "],
      '2': [" 222 ", "2   2", "  22 ", " 2   ", "22222"],
      '3': [" 333 ", "    3", "  33 ", "    3", " 333 "],
      '4': ["4  4 ", "4  4 ", "44444", "   4 ", "   4 "],
      '5': ["55555", "5    ", "5555 ", "    5", "5555 "],
      '6': [" 666 ", "6    ", "6666 ", "6   6", " 666 "],
      '7': ["77777", "   7 ", "  7  ", " 7   ", "7    "],
      '8': [" 888 ", "8   8", " 888 ", "8   8", " 888 "],
      '9': [" 999 ", "9   9", " 9999", "    9", " 999 "],
      '!': ["  !  ", "  !  ", "  !  ", "     ", "  !  "],
      '.': ["     ", "     ", "     ", "     ", "  .  "],
    };

    const text = input.toUpperCase();
    let resultRows = ["", "", "", "", ""];
    
    for (const char of text) {
      const art = charMap[char] || charMap[' '];
      for (let i = 0; i < 5; i++) {
        resultRows[i] += art[i] + "  ";
      }
    }
    
    setOutput(resultRows.join("\n"));
  };

  const downloadAsImage = () => {
    if (!preRef.current) return;
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d")!;
    const text = output;
    const lines = text.split("\n");
    
    ctx.font = "14px monospace";
    const metrics = ctx.measureText(lines[0]);
    const lineHeight = 18;
    
    canvas.width = metrics.width + 40;
    canvas.height = lines.length * lineHeight + 40;
    
    ctx.fillStyle = theme.bg === "bg-white" ? "#ffffff" : theme.bg === "bg-black" ? "#000000" : theme.bg === "bg-slate-900" ? "#0f172a" : "#2b2b2b";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = theme.text === "text-green-500" ? "#22c55e" : theme.text === "text-amber-500" ? "#f59e0b" : theme.text === "text-slate-100" ? "#f1f5f9" : "#0f172a";
    ctx.font = "14px monospace";
    ctx.textBaseline = "top";
    
    lines.forEach((line, i) => {
      ctx.fillText(line, 20, 20 + i * lineHeight);
    });
    
    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = `ascii-art-${theme.id}.png`;
    a.click();
  };

  return (
    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600">
            <Type className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">ASCII Art Studio</h3>
            <p className="text-sm text-slate-500">Transform text into stylish characters</p>
          </div>
        </div>
        <div className="flex gap-2">
           {THEMES.map(t => (
             <button 
               key={t.id} 
               onClick={() => setTheme(t)}
               className={cn(
                 "w-8 h-8 rounded-full border-2 transition-all",
                 theme.id === t.id ? "border-primary-600 scale-110 shadow-lg" : "border-transparent",
                 t.bg
               )}
               title={t.label}
             />
           ))}
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyUp={(e) => e.key === "Enter" && generate()}
            className="flex-grow p-5 bg-slate-50 border border-slate-100 rounded-2xl text-xl font-bold text-slate-700 outline-none focus:ring-4 ring-primary-50 transition-all"
            placeholder="Enter text here..."
          />
          <button 
            onClick={generate}
            className="px-10 py-5 bg-primary-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary-500/20 hover:bg-primary-700 transition-all"
          >
            <Zap className="w-5 h-5" /> Generate
          </button>
        </div>

        {output ? (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between px-2">
               <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                 <Monitor className="w-3 h-3" />
                 <span>PREVIEW ({theme.label})</span>
               </div>
               <div className="flex gap-4">
                 <button onClick={() => {
                   navigator.clipboard.writeText(output);
                   setIsCopied(true);
                   setTimeout(() => setIsCopied(false), 2000);
                 }} className="text-primary-600 text-xs font-bold flex items-center gap-1.5 hover:opacity-70 transition-opacity">
                   {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                   {isCopied ? "COPIED" : "COPY TEXT"}
                 </button>
                 <button onClick={downloadAsImage} className="text-slate-500 text-xs font-bold flex items-center gap-1.5 hover:text-slate-900 transition-colors">
                   <Download className="w-3.5 h-3.5" />
                   DOWNLOAD IMAGE
                 </button>
               </div>
            </div>
            <div className={cn("p-10 rounded-[2.5rem] border transition-all duration-300 shadow-inner overflow-auto", theme.bg, theme.border)}>
              <pre ref={preRef} className={cn("font-mono text-sm leading-tight text-center", theme.text)}>
                 <code>{output}</code>
              </pre>
            </div>
          </div>
        ) : (
          <div className="h-64 border-2 border-dashed border-slate-100 rounded-[2.5rem] flex flex-col items-center justify-center text-slate-300 gap-3">
             <Type className="w-10 h-10 opacity-20" />
             <p className="text-sm font-bold opacity-30">Type something above to see the magic</p>
          </div>
        )}
      </div>
    </div>
  );
}
