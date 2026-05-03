"use client";

import { useState } from "react";
import { Key, Zap, Copy, Check, RefreshCw } from "lucide-react";

export default function RSAKeyGeneratorTool() {
  const [keySize, setKeySize] = useState<2048 | 4096>(2048);
  const [publicKey, setPublicKey] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedKey, setCopiedKey] = useState<"public" | "private" | null>(null);

  const generate = async () => {
    setIsGenerating(true);
    setPublicKey("");
    setPrivateKey("");
    try {
      const keyPair = await window.crypto.subtle.generateKey(
        { name: "RSA-OAEP", modulusLength: keySize, publicExponent: new Uint8Array([1, 0, 1]), hash: "SHA-256" },
        true,
        ["encrypt", "decrypt"]
      );
      const pubExported = await window.crypto.subtle.exportKey("spki", keyPair.publicKey);
      const privExported = await window.crypto.subtle.exportKey("pkcs8", keyPair.privateKey);
      const toBase64 = (buf: ArrayBuffer) => btoa(String.fromCharCode(...new Uint8Array(buf)));
      const formatPem = (b64: string, type: string) => {
        const lines = b64.match(/.{1,64}/g)?.join("\n") || b64;
        return `-----BEGIN ${type}-----\n${lines}\n-----END ${type}-----`;
      };
      setPublicKey(formatPem(toBase64(pubExported), "PUBLIC KEY"));
      setPrivateKey(formatPem(toBase64(privExported), "PRIVATE KEY"));
    } catch (e) {
      setPublicKey("Error generating keys. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const copy = (text: string, type: "public" | "private") => {
    navigator.clipboard.writeText(text);
    setCopiedKey(type);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-8">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600">
          <Key className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900">RSA Key Pair Generator</h3>
          <p className="text-sm text-slate-500">Generate public & private RSA keys in your browser</p>
        </div>
      </div>

      <div className="p-4 bg-blue-50 border border-blue-100 rounded-2xl text-sm text-blue-700">
        Keys are generated using the <strong>Web Crypto API</strong> entirely in your browser. No keys are ever sent to our servers.
      </div>

      <div className="space-y-3">
        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Key Size</label>
        <div className="flex gap-3">
          {([1024, 2048, 4096] as const).map(size => (
            <button key={size} onClick={() => setKeySize(size as 2048 | 4096)}
              className={`flex-1 py-3 rounded-2xl font-bold text-sm border-2 transition-all ${keySize === size ? "border-primary-600 bg-primary-50 text-primary-700" : "border-slate-200 text-slate-500 hover:border-slate-300"}`}>
              {size}-bit {size === 2048 ? "⭐" : size === 4096 ? "🔒" : "⚡"}
            </button>
          ))}
        </div>
        <p className="text-xs text-slate-400">2048-bit is recommended for most uses. 4096-bit is maximum security (slower).</p>
      </div>

      <button onClick={generate} disabled={isGenerating}
        className="w-full py-4 bg-primary-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary-500/20 disabled:opacity-50">
        {isGenerating ? <><RefreshCw className="w-5 h-5 animate-spin" /> Generating {keySize}-bit Keys...</> : <><Zap className="w-5 h-5" /> Generate RSA Key Pair</>}
      </button>

      {publicKey && (
        <div className="space-y-6">
          {[{ label: "Public Key", value: publicKey, type: "public" as const, color: "green" },
            { label: "Private Key", value: privateKey, type: "private" as const, color: "red" }].map(({ label, value, type, color }) => (
            <div key={type} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className={`text-xs font-bold uppercase tracking-widest ${color === "green" ? "text-green-600" : "text-red-600"}`}>{label}</span>
                <button onClick={() => copy(value, type)} className="text-primary-600 text-xs font-bold flex items-center gap-1">
                  {copiedKey === type ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  {copiedKey === type ? "Copied!" : "Copy"}
                </button>
              </div>
              <textarea readOnly value={value}
                className={`w-full h-36 p-4 rounded-2xl text-xs font-mono resize-none border-2 ${color === "green" ? "bg-green-50 border-green-100 text-green-900" : "bg-red-50 border-red-100 text-red-900"}`}
              />
              {type === "private" && (
                <p className="text-xs text-red-500 font-medium">⚠️ Keep your private key secret. Never share it with anyone.</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
