"use client";

import { useState } from "react";
import { Lock, Unlock, Zap, Copy, Check, Shield } from "lucide-react";
import CryptoJS from "crypto-js";

interface AESToolProps {
  mode: "encrypt" | "decrypt";
}

export default function AESTool({ mode }: AESToolProps) {
  const [input, setInput] = useState("");
  const [key, setKey] = useState("");
  const [output, setOutput] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  const process = () => {
    if (!input || !key) return;
    try {
      if (mode === "encrypt") {
        setOutput(CryptoJS.AES.encrypt(input, key).toString());
      } else {
        const bytes = CryptoJS.AES.decrypt(input, key);
        setOutput(bytes.toString(CryptoJS.enc.Utf8));
      }
    } catch (err) {
      setOutput("Error: Invalid key or input data.");
    }
  };

  const copyResult = () => {
    navigator.clipboard.writeText(output);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-8">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600">
          {mode === "encrypt" ? <Lock className="w-6 h-6" /> : <Unlock className="w-6 h-6" />}
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900 capitalize">AES {mode}</h3>
          <p className="text-sm text-slate-500">Secure AES-256 {mode}ion in browser</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
           <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-2">Passphrase / Secret Key</label>
           <input 
             type="password" 
             value={key} 
             onChange={(e) => setKey(e.target.value)}
             className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl"
             placeholder="Enter your private key..."
           />
        </div>

        <div className="space-y-2">
           <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-2">{mode === "encrypt" ? "Plaintext" : "Ciphertext"}</label>
           <textarea 
             value={input} 
             onChange={(e) => setInput(e.target.value)}
             className="w-full h-40 p-6 bg-slate-50 border border-slate-100 rounded-2xl font-mono text-sm"
             placeholder={mode === "encrypt" ? "Enter text to encrypt..." : "Enter AES encrypted string..."}
           />
        </div>

        <button onClick={process} className="w-full py-4 bg-primary-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2">
           <Zap className="w-5 h-5" /> {mode === "encrypt" ? "Encrypt" : "Decrypt"}
        </button>

        {output && (
          <div className="space-y-2">
             <div className="flex items-center justify-between px-2">
               <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Result</label>
               <button onClick={copyResult} className="text-primary-600 text-xs font-bold flex items-center gap-1">
                 {isCopied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                 Copy
               </button>
             </div>
             <textarea 
               value={output}
               readOnly
               className="w-full h-40 p-6 bg-slate-900 border-none rounded-2xl font-mono text-sm text-blue-100 focus:outline-none"
             />
          </div>
        )}
      </div>
    </div>
  );
}
