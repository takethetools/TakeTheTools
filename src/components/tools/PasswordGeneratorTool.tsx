"use client";

import { useState, useCallback, useEffect } from "react";
import { Copy, Check, RefreshCw, ShieldCheck, Download } from "lucide-react";
import confetti from "canvas-confetti";
import { cn } from "@/lib/utils";

export default function PasswordGeneratorTool() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  });
  const [isCopied, setIsCopied] = useState(false);

  const generatePassword = useCallback(() => {
    const charset = {
      uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      lowercase: "abcdefghijklmnopqrstuvwxyz",
      numbers: "0123456789",
      symbols: "!@#$%^&*()_+~`|}{[]:;?><,./-=",
    };

    let characters = "";
    if (options.uppercase) characters += charset.uppercase;
    if (options.lowercase) characters += charset.lowercase;
    if (options.numbers) characters += charset.numbers;
    if (options.symbols) characters += charset.symbols;

    if (!characters) {
      setPassword("Choose at least one option");
      return;
    }

    let result = "";
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    setPassword(result);
  }, [length, options]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    generatePassword();
  }, [generatePassword]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    setIsCopied(true);
    confetti({ particleCount: 40, spread: 50 });
    setTimeout(() => setIsCopied(false), 2000);
  };

  const downloadPassword = () => {
    const blob = new Blob([password], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "generated-password.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const strength = () => {
    let score = 0;
    if (length > 12) score++;
    if (length > 20) score++;
    if (options.uppercase && options.lowercase) score++;
    if (options.numbers) score++;
    if (options.symbols) score++;

    if (score < 2) return { text: "Weak", color: "bg-red-500", width: "w-1/3" };
    if (score < 4) return { text: "Medium", color: "bg-yellow-500", width: "w-2/3" };
    return { text: "Strong", color: "bg-green-500", width: "w-full" };
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Result Display */}
      <div className="relative group">
        <div className="absolute inset-0 bg-primary-400 opacity-10 blur-xl group-hover:opacity-20 transition-opacity rounded-3xl"></div>
        <div className="relative bg-white border border-slate-200 p-8 rounded-3xl shadow-sm flex items-center justify-between gap-4">
          <div className="font-mono text-2xl md:text-3xl font-bold text-slate-800 break-all select-all">
            {password}
          </div>
          <div className="flex gap-2">
            <button
              onClick={generatePassword}
              title="Generate New"
              className="p-3 bg-slate-100 text-slate-500 rounded-xl hover:bg-slate-200 transition-all hover:rotate-180 duration-500"
            >
              <RefreshCw className="w-6 h-6" />
            </button>
            <button
              onClick={downloadPassword}
              title="Download as .txt"
              className="p-3 bg-slate-100 text-slate-500 rounded-xl hover:bg-slate-200 transition-all"
            >
              <Download className="w-6 h-6" />
            </button>
            <button
              onClick={copyToClipboard}
              title="Copy to Clipboard"
              className={cn(
                "p-3 rounded-xl transition-all shadow-lg",
                isCopied ? "bg-green-600 text-white" : "bg-primary-600 text-white hover:bg-primary-700"
              )}
            >
              {isCopied ? <Check className="w-6 h-6" /> : <Copy className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Strength Indicator */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-widest">
          <span>Password Strength</span>
          <span className={strength().text === "Strong" ? "text-green-600" : ""}>{strength().text}</span>
        </div>
        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
          <div className={cn("h-full transition-all duration-500", strength().color, strength().width)}></div>
        </div>
      </div>

      {/* Settings */}
      <div className="bg-white border border-slate-200 p-8 rounded-3xl space-y-8">
        <div className="space-y-4">
          <div className="flex justify-between items-center text-sm font-bold text-slate-500 uppercase tracking-wider">
            <span>Password Length</span>
            <span className="text-primary-600 text-lg">{length}</span>
          </div>
          <input
            type="range"
            min="6"
            max="64"
            value={length}
            onChange={(e) => setLength(parseInt(e.target.value))}
            className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-primary-600"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { id: "uppercase", label: "Uppercase (A-Z)" },
            { id: "lowercase", label: "Lowercase (a-z)" },
            { id: "numbers", label: "Numbers (0-9)" },
            { id: "symbols", label: "Symbols (!@#$)" },
          ].map((opt) => (
            <label key={opt.id} className="flex items-center justify-between p-4 border border-slate-100 rounded-2xl cursor-pointer hover:bg-slate-50 transition-colors">
              <span className="font-bold text-slate-700">{opt.label}</span>
              <input
                type="checkbox"
                checked={options[opt.id as keyof typeof options]}
                onChange={() => setOptions(prev => ({ ...prev, [opt.id]: !prev[opt.id as keyof typeof options] }))}
                className="w-6 h-6 rounded-lg accent-primary-600 pointer-events-none"
              />
            </label>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3 p-6 bg-primary-50 rounded-2xl text-primary-700 text-sm">
        <ShieldCheck className="w-6 h-6 flex-shrink-0" />
        <p>Your password is generated locally in your browser and is never sent to our servers.</p>
      </div>
    </div>
  );
}
