"use client";
import { useState } from "react";
import { Search, Globe, Loader2, RefreshCw, Copy, Check } from "lucide-react";

export default function WhoisLookupTool() {
  const [domain, setDomain] = useState("");
  const [result, setResult] = useState<Record<string,string> | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const lookup = async () => {
    const d = domain.trim().replace(/^https?:\/\//,"").split("/")[0];
    if (!d) return;
    setLoading(true); setError(""); setResult(null);
    try {
      const res = await fetch(`https://api.domainsdb.info/v1/domains/search?domain=${d}&limit=1`);
      const json = await res.json();
      const item = json.domains?.[0];
      if (item) {
        setResult({
          "Domain": item.domain || d,
          "Country": item.country || "—",
          "Create Date": item.create_date ? new Date(item.create_date).toLocaleDateString() : "—",
          "Update Date": item.update_date ? new Date(item.update_date).toLocaleDateString() : "—",
          "isDead": item.isDead === "False" ? "Active" : "Inactive",
          "A Records": Array.isArray(item.A) ? item.A.join(", ") : "—",
          "NS Records": Array.isArray(item.NS) ? item.NS.join(", ") : "—",
          "MX Records": Array.isArray(item.MX) ? item.MX.join(", ") : "—",
        });
      } else {
        // fallback: basic DNS info via public API
        const r2 = await fetch(`https://dns.google/resolve?name=${d}&type=A`);
        const j2 = await r2.json();
        setResult({
          "Domain": d,
          "Status": j2.Status === 0 ? "Resolves (Active)" : "Not found",
          "A Records": j2.Answer?.map((a:any) => a.data).join(", ") || "—",
          "TTL": j2.Answer?.[0]?.TTL ? `${j2.Answer[0].TTL}s` : "—",
        });
      }
    } catch {
      setError("Lookup failed. Please check the domain and try again.");
    }
    setLoading(false);
  };

  const copyAll = () => {
    if (!result) return;
    navigator.clipboard.writeText(Object.entries(result).map(([k,v]) => `${k}: ${v}`).join("\n"));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex gap-3">
          <div className="flex-1 flex items-center gap-3 bg-slate-50 rounded-2xl px-4 border border-slate-100">
            <Globe className="w-5 h-5 text-slate-400 flex-shrink-0" />
            <input
              type="text" value={domain}
              onChange={e => setDomain(e.target.value)}
              onKeyDown={e => e.key === "Enter" && lookup()}
              placeholder="example.com"
              className="flex-1 bg-transparent py-4 outline-none text-slate-800 font-medium"
            />
          </div>
          <button onClick={lookup} disabled={loading || !domain.trim()}
            className="px-6 py-4 bg-primary-600 text-white rounded-2xl font-bold flex items-center gap-2 hover:bg-primary-700 transition-all disabled:opacity-50">
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
            Lookup
          </button>
        </div>
        {error && <p className="text-red-500 text-sm font-medium px-2">{error}</p>}
      </div>

      {result && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
            <h3 className="font-bold text-slate-900">WHOIS Results — {result["Domain"]}</h3>
            <button onClick={copyAll} className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm font-bold hover:bg-slate-50 transition-all">
              {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
          <div className="divide-y divide-slate-50">
            {Object.entries(result).map(([key, val]) => (
              <div key={key} className="flex items-start px-6 py-3 gap-4">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest w-32 flex-shrink-0 pt-0.5">{key}</span>
                <span className="text-sm text-slate-800 font-medium break-all">{val}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
