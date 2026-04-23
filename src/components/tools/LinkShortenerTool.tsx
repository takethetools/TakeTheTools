"use client";

import { useState } from "react";
import { Link, Copy, Check, ExternalLink, Trash2 } from "lucide-react";

// Client-side URL shortener using a hash-based approach
function generateShortCode(url: string): string {
  let hash = 0;
  for (let i = 0; i < url.length; i++) {
    const char = url.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let code = '';
  let h = Math.abs(hash);
  for (let i = 0; i < 6; i++) {
    code += chars[h % chars.length];
    h = Math.floor(h / chars.length);
  }
  return code;
}

interface ShortenedLink { original: string; short: string; code: string; clicks: number; date: string; }

export default function LinkShortenerTool() {
  const [url, setUrl] = useState("");
  const [links, setLinks] = useState<ShortenedLink[]>([]);
  const [error, setError] = useState("");
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const isValidUrl = (str: string) => {
    try { new URL(str); return true; } catch { return false; }
  };

  const shorten = () => {
    setError("");
    let inputUrl = url.trim();
    if (!inputUrl) { setError("Please enter a URL."); return; }
    if (!inputUrl.startsWith("http://") && !inputUrl.startsWith("https://")) {
      inputUrl = "https://" + inputUrl;
    }
    if (!isValidUrl(inputUrl)) { setError("Please enter a valid URL."); return; }

    const code = generateShortCode(inputUrl + Date.now());
    const newLink: ShortenedLink = {
      original: inputUrl,
      short: `tttools.co/${code}`,
      code,
      clicks: 0,
      date: new Date().toLocaleDateString(),
    };
    setLinks(prev => [newLink, ...prev]);
    setUrl("");
  };

  const copy = (idx: number) => {
    navigator.clipboard.writeText(`https://${links[idx].short}`);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  const remove = (idx: number) => setLinks(prev => prev.filter((_, i) => i !== idx));

  return (
    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600">
          <Link className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900">URL Shortener</h3>
          <p className="text-sm text-slate-500">Create compact short links from long URLs</p>
        </div>
      </div>

      <div className="flex gap-3">
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && shorten()}
          type="url"
          placeholder="https://your-very-long-url.com/with/lots/of/parameters..."
          className="flex-1 px-5 py-4 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-300"
        />
        <button
          onClick={shorten}
          className="px-8 py-4 bg-primary-600 text-white rounded-2xl font-bold hover:bg-primary-700 transition-colors whitespace-nowrap">
          Shorten
        </button>
      </div>

      {error && <p className="text-sm text-red-500 font-medium">{error}</p>}

      {links.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Your Links</h4>
          {links.map((link, idx) => (
            <div key={idx} className="p-5 bg-slate-50 rounded-2xl border border-slate-100 space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-primary-600 text-sm font-mono">{link.short}</p>
                  <p className="text-xs text-slate-400 truncate mt-1">{link.original}</p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button onClick={() => copy(idx)}
                    className="p-2 bg-white border border-slate-200 rounded-xl hover:bg-primary-50 hover:border-primary-200 transition-colors"
                    title="Copy link">
                    {copiedIdx === idx ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4 text-slate-500" />}
                  </button>
                  <a href={link.original} target="_blank" rel="noopener noreferrer"
                    className="p-2 bg-white border border-slate-200 rounded-xl hover:bg-primary-50 hover:border-primary-200 transition-colors"
                    title="Open original">
                    <ExternalLink className="w-4 h-4 text-slate-500" />
                  </a>
                  <button onClick={() => remove(idx)}
                    className="p-2 bg-white border border-slate-200 rounded-xl hover:bg-red-50 hover:border-red-200 transition-colors"
                    title="Delete">
                    <Trash2 className="w-4 h-4 text-slate-400" />
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-400">
                <span>Created: {link.date}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {links.length === 0 && (
        <div className="text-center py-8 text-slate-400">
          <Link className="w-10 h-10 mx-auto mb-3 opacity-30" />
          <p className="text-sm">Paste a long URL above and click Shorten</p>
        </div>
      )}

      <p className="text-xs text-slate-400 bg-slate-50 rounded-xl p-3">
        <strong>Note:</strong> Short links generated here are for demonstration. For production use with real redirect tracking, use services like Bitly, TinyURL, or self-hosted solutions.
      </p>
    </div>
  );
}
