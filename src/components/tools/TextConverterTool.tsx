"use client";

import { useState } from "react";
import { Type, Copy, Check, Zap, ArrowRightLeft, Radio, RefreshCw } from "lucide-react";

interface TextConverterToolProps {
  mode: "morse" | "binary" | "slug" | "upside-down" | "leetspeak" | "rot13" | "atbash";
}

export default function TextConverterTool({ mode }: TextConverterToolProps) {
  const [input, setInput] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  const convert = () => {
    if (mode === "morse") {
      const MORSE_MAP: Record<string, string> = {
        'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
        'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
        'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
        'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
        'Y': '-.--', 'Z': '--..', '1': '.----', '2': '..---', '3': '...--',
        '4': '....-', '5': '.....', '6': '-....', '7': '--...', '8': '---..',
        '9': '----.', '0': '-----', ' ': '/'
      };
      return input.toUpperCase().split("").map(c => MORSE_MAP[c] || c).join(" ");
    } else if (mode === "binary") {
      return input.split("").map(c => c.charCodeAt(0).toString(2).padStart(8, '0')).join(" ");
    } else if (mode === "slug") {
      return input.toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g, '-');
    } else if (mode === "leetspeak") {
      const leet: Record<string, string> = { 'a': '4', 'e': '3', 'l': '1', 'o': '0', 's': '5', 't': '7' };
      return input.toLowerCase().split('').map(c => leet[c] || c).join('');
    } else if (mode === "rot13") {
      return input.replace(/[a-zA-Z]/g, (c) => {
        const charCode = c.charCodeAt(0);
        const limit = c <= "Z" ? 90 : 122;
        const rotated = charCode + 13;
        return String.fromCharCode(limit >= rotated ? rotated : rotated - 26);
      });
    } else if (mode === "atbash") {
      return input.replace(/[a-zA-Z]/g, (c: string) => {
        const base = c <= 'Z' ? 65 : 97;
        return String.fromCharCode(base + (25 - (c.charCodeAt(0) - base)));
      });
    } else if (mode === "upside-down") {
      const charMap: Record<string, string> = {
        'a': 'ɐ', 'b': 'q', 'c': 'ɔ', 'd': 'p', 'e': 'ǝ', 'f': 'ɟ', 'g': 'ƃ', 'h': 'ɥ', 'i': 'ᴉ', 'j': 'ɾ',
        'k': 'ʞ', 'm': 'ɯ', 'n': 'u', 'p': 'd', 'q': 'b', 'r': 'ɹ', 't': 'ʇ', 'u': 'n', 'v': 'ʌ', 'w': 'ʍ',
        'y': 'ʎ', '1': 'Ɩ', '2': 'ᄅ', '3': 'Ɛ', '4': 'ㄣ', '5': 'ϛ', '6': '9', '7': 'ㄥ', '8': '8', '9': '6',
        '0': '0', '.': '˙', ',': '\'', '(': ')', ')': '(', '[': ']', ']': '[', '{': '}', '}': '{', '?': '¿',
        '!': '¡', ' ': ' '
      };
      return input.toLowerCase().split('').map(c => charMap[c] || c).reverse().join('');
    }
    return "";
  };

  const output = convert();

  const copyResult = () => {
    navigator.clipboard.writeText(output);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const icons: Record<string, React.ReactNode> = {
    "morse": <Radio className="w-6 h-6" />,
    "binary": <Zap className="w-6 h-6" />,
    "slug": <ArrowRightLeft className="w-6 h-6" />,
    "upside-down": <RefreshCw className="w-6 h-6" />
  };

  return (
    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600">
            {icons[mode]}
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900 capitalize">{mode} Converter</h3>
            <p className="text-sm text-slate-500">Fast browser-side text encoding</p>
          </div>
        </div>
        {output && (
          <button onClick={copyResult} className="px-6 py-2 bg-slate-900 text-white rounded-xl font-bold text-sm flex items-center gap-2">
            {isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {isCopied ? "Copied" : "Copy Result"}
          </button>
        )}
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-2">Input Text</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full h-40 bg-slate-50 border border-slate-100 rounded-2xl p-6 font-mono text-sm text-slate-600 focus:outline-none"
            placeholder="Type something..."
          />
        </div>

        {output && (
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-2">Converted Result</label>
            <div className="w-full p-6 bg-slate-100 rounded-2xl font-mono text-sm text-slate-700 break-all border border-slate-200">
              {output}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
