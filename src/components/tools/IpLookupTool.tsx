"use client";

import { useState } from "react";
import { Globe, Zap, Search, Info, Shield, MapPin } from "lucide-react";

export default function IpLookupTool() {
  const [ip, setIp] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const lookup = async () => {
    setLoading(true);
    try {
      const res = await fetch(`https://ipapi.co/${ip}/json/`);
      const data = await res.json();
      setResult(data);
    } catch (err) {
      setResult({ error: "Could not fetch IP data. Please check the IP address." });
    }
    setLoading(false);
  };

  return (
    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-8">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600">
          <Globe className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900">IP Lookup</h3>
          <p className="text-sm text-slate-500">Find geolocation and network info for any IP</p>
        </div>
      </div>

      <div className="flex gap-4">
        <input 
          type="text" 
          value={ip}
          onChange={(e) => setIp(e.target.value)}
          placeholder="Enter IP address (e.g. 8.8.8.8)"
          className="flex-grow p-4 bg-slate-50 border border-slate-100 rounded-2xl font-mono"
        />
        <button 
          onClick={lookup}
          disabled={loading}
          className="px-8 py-4 bg-primary-600 text-white rounded-2xl font-bold flex items-center gap-2 disabled:opacity-50"
        >
          {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Search className="w-5 h-5" />}
          Lookup
        </button>
      </div>

      {result && !result.error && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-4">
              <div className="flex items-center gap-2 text-primary-600">
                 <MapPin className="w-4 h-4" />
                 <span className="text-xs font-bold uppercase tracking-widest">Location</span>
              </div>
              <div className="space-y-1">
                 <p className="text-2xl font-bold text-slate-900">{result.city}, {result.region}</p>
                 <p className="text-sm text-slate-500">{result.country_name} ({result.country_code})</p>
              </div>
           </div>

           <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-4">
              <div className="flex items-center gap-2 text-primary-600">
                 <Shield className="w-4 h-4" />
                 <span className="text-xs font-bold uppercase tracking-widest">Network</span>
              </div>
              <div className="space-y-1">
                 <p className="text-lg font-bold text-slate-900">{result.org || "Unknown ISP"}</p>
                 <p className="text-sm text-slate-500">ASN: {result.asn}</p>
              </div>
           </div>
        </div>
      )}

      {result?.error && (
        <div className="p-4 bg-red-50 text-red-600 rounded-2xl text-sm font-medium border border-red-100">
           {result.error}
        </div>
      )}
    </div>
  );
}
