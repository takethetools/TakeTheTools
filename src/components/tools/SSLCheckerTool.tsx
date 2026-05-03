"use client";
import { useState } from "react";
import { Lock, Search, Loader2, CheckCircle, AlertCircle, Globe } from "lucide-react";

export default function SSLCheckerTool() {
  const [domain, setDomain] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const check = async () => {
    const d = domain.trim().replace(/^https?:\/\//,"").split("/")[0];
    if (!d) return;
    setLoading(true); setError(""); setResult(null);
    try {
      // Use Google's CT log / DNS approach for SSL check
      const res = await fetch(`https://dns.google/resolve?name=${d}&type=A`);
      const dns = await res.json();
      const resolves = dns.Status === 0;

      // Try to get SSL info via crt.sh
      const crtRes = await fetch(`https://crt.sh/?q=${d}&output=json`);
      let certs: any[] = [];
      if (crtRes.ok) {
        const crtData = await crtRes.json();
        certs = Array.isArray(crtData) ? crtData.slice(0, 5) : [];
      }

      const latestCert = certs[0];
      setResult({
        domain: d,
        resolves,
        hasCerts: certs.length > 0,
        totalCerts: certs.length,
        issuer: latestCert?.issuer_name?.match(/O=([^,]+)/)?.[1]?.trim() || "Unknown",
        validFrom: latestCert?.not_before ? new Date(latestCert.not_before).toLocaleDateString() : "—",
        validTo: latestCert?.not_after ? new Date(latestCert.not_after).toLocaleDateString() : "—",
        isExpired: latestCert?.not_after ? new Date(latestCert.not_after) < new Date() : null,
        commonName: latestCert?.common_name || d,
        certs: certs.map(c => ({
          id: c.id,
          issuer: c.issuer_name?.match(/O=([^,]+)/)?.[1]?.trim() || "—",
          validTo: c.not_after ? new Date(c.not_after).toLocaleDateString() : "—",
          name: c.common_name,
        }))
      });
    } catch {
      setError("SSL check failed. Domain may be unreachable or block CORS requests.");
    }
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex gap-3">
          <div className="flex-1 flex items-center gap-3 bg-slate-50 rounded-2xl px-4 border border-slate-100">
            <Lock className="w-5 h-5 text-slate-400 flex-shrink-0" />
            <input type="text" value={domain} onChange={e => setDomain(e.target.value)}
              onKeyDown={e => e.key === "Enter" && check()}
              placeholder="example.com"
              className="flex-1 bg-transparent py-4 outline-none text-slate-800 font-medium" />
          </div>
          <button onClick={check} disabled={loading || !domain.trim()}
            className="px-6 py-4 bg-primary-600 text-white rounded-2xl font-bold flex items-center gap-2 hover:bg-primary-700 transition-all disabled:opacity-50">
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
            Check SSL
          </button>
        </div>
        {error && <p className="text-red-500 text-sm font-medium">{error}</p>}
      </div>

      {result && (
        <div className="space-y-4">
          {/* Status card */}
          <div className={`p-6 rounded-3xl border flex items-start gap-4 ${result.hasCerts && !result.isExpired ? "bg-green-50 border-green-100" : "bg-red-50 border-red-100"}`}>
            {result.hasCerts && !result.isExpired
              ? <CheckCircle className="w-8 h-8 text-green-500 flex-shrink-0" />
              : <AlertCircle className="w-8 h-8 text-red-500 flex-shrink-0" />}
            <div>
              <p className="font-bold text-lg text-slate-900">{result.domain}</p>
              <p className={`text-sm font-medium ${result.hasCerts && !result.isExpired ? "text-green-700" : "text-red-700"}`}>
                {result.hasCerts ? (result.isExpired ? "SSL certificate found but EXPIRED" : "SSL certificate valid") : "No SSL certificate found"}
              </p>
            </div>
          </div>

          {/* Details */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50">
              <h3 className="font-bold text-slate-900">Certificate Details</h3>
            </div>
            <div className="divide-y divide-slate-50">
              {[
                ["Issuer", result.issuer],
                ["Common Name", result.commonName],
                ["Valid From", result.validFrom],
                ["Valid Until", result.validTo],
                ["Certificates Found", result.totalCerts.toString()],
                ["DNS Resolves", result.resolves ? "Yes" : "No"],
              ].map(([k, v]) => (
                <div key={k} className="flex items-center px-6 py-3 gap-4">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest w-36 flex-shrink-0">{k}</span>
                  <span className="text-sm text-slate-800 font-medium">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
