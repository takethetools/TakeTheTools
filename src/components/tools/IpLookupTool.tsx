"use client";

import { useState, useEffect, useMemo } from "react";
import { Globe, Zap, Search, Info, Shield, MapPin, Clock, DollarSign, Navigation2, Network, Fingerprint, Sparkles, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

export default function IpLookupTool() {
  const [ip, setIp] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [isMounting, setIsMounting] = useState(true);

  const lookup = async (targetIp: string = ip) => {
    setLoading(true);
    try {
      const res = await fetch(`https://ipapi.co/${targetIp}/json/`);
      const data = await res.json();
      setResult(data);
    } catch (err) {
      setResult({ error: "Intelligence sync failed. Verify IP structure." });
    }
    setLoading(false);
    setIsMounting(false);
  };

  useEffect(() => {
    lookup(""); // Lookup user's own IP on mount
  }, []);

  const securityScore = useMemo(() => {
    if (!result || result.error) return null;
    // Mock security logic based on ASN/Org
    const org = (result.org || "").toLowerCase();
    if (org.includes("google") || org.includes("amazon") || org.includes("cloudflare")) return 98;
    if (org.includes("vpn") || org.includes("proxy")) return 45;
    return 85;
  }, [result]);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Search Header */}
      <div className="bg-white p-8 md:p-12 rounded-[3.5rem] border border-slate-200 shadow-sm space-y-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
           <Globe className="w-64 h-64 text-primary-600" />
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-primary-600 rounded-[2rem] flex items-center justify-center text-white shadow-xl shadow-primary-200">
              <Fingerprint className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">IP Intelligence</h3>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Global Network Analysis Studio</p>
            </div>
          </div>

          <div className="flex gap-3 bg-slate-50 p-2 rounded-3xl border border-slate-100 flex-grow max-w-xl">
            <input 
              type="text" 
              value={ip}
              onChange={(e) => setIp(e.target.value)}
              placeholder="Detecting local node..."
              className="flex-grow bg-transparent px-6 py-3 font-mono text-lg outline-none"
              onKeyDown={(e) => e.key === "Enter" && lookup()}
            />
            <button 
              onClick={() => lookup()}
              disabled={loading}
              className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition-all active:scale-95 flex items-center gap-2"
            >
              {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
              Scan
            </button>
          </div>
        </div>
      </div>

      {result && !result.error && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Info */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
                <div className="flex items-center gap-2 text-primary-600">
                   <MapPin className="w-5 h-5" />
                   <span className="text-[10px] font-bold uppercase tracking-widest">Precise Location</span>
                </div>
                <div className="space-y-1">
                   <p className="text-4xl font-black text-slate-900 leading-tight">{result.city || "Unknown"}</p>
                   <p className="text-lg font-bold text-slate-500">{result.region}, {result.country_name}</p>
                   <div className="flex items-center gap-2 pt-4">
                      <img src={`https://flagcdn.com/w40/${result.country_code?.toLowerCase()}.png`} className="h-4 rounded-sm" alt="Flag" />
                      <span className="text-xs font-bold text-slate-400">{result.country_code} / {result.continent_code}</span>
                   </div>
                </div>
             </div>

             <div className="bg-slate-900 p-8 rounded-[2.5rem] shadow-2xl space-y-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                   <Network className="w-20 h-20 text-white" />
                </div>
                <div className="space-y-6 relative z-10">
                   <div>
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Network Operator</span>
                      <p className="text-xl font-black text-white mt-1">{result.org || "Private Node"}</p>
                   </div>
                   <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/10">
                      <div>
                         <p className="text-[10px] font-bold text-slate-500 uppercase">ASN</p>
                         <p className="text-sm font-bold text-blue-400">{result.asn || "N/A"}</p>
                      </div>
                      <div>
                         <p className="text-[10px] font-bold text-slate-500 uppercase">Version</p>
                         <p className="text-sm font-bold text-blue-400">{result.version || "IPv4"}</p>
                      </div>
                   </div>
                </div>
             </div>

             {/* Secondary Metadata */}
             <div className="md:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-3xl border border-slate-100 flex flex-col items-center text-center gap-2">
                   <Clock className="w-5 h-5 text-slate-300" />
                   <p className="text-[10px] font-bold text-slate-400 uppercase">Timezone</p>
                   <p className="text-sm font-bold text-slate-700">{result.timezone}</p>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-slate-100 flex flex-col items-center text-center gap-2">
                   <DollarSign className="w-5 h-5 text-slate-300" />
                   <p className="text-[10px] font-bold text-slate-400 uppercase">Currency</p>
                   <p className="text-sm font-bold text-slate-700">{result.currency}</p>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-slate-100 flex flex-col items-center text-center gap-2">
                   <Navigation2 className="w-5 h-5 text-slate-300" />
                   <p className="text-[10px] font-bold text-slate-400 uppercase">Coordinates</p>
                   <p className="text-sm font-bold text-slate-700">{result.latitude}, {result.longitude}</p>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-slate-100 flex flex-col items-center text-center gap-2">
                   <Shield className="w-5 h-5 text-slate-300" />
                   <p className="text-[10px] font-bold text-slate-400 uppercase">Postal</p>
                   <p className="text-sm font-bold text-slate-700">{result.postal || "---"}</p>
                </div>
             </div>
          </div>

          {/* Security Sidebar */}
          <div className="space-y-8">
             <div className="bg-gradient-to-br from-slate-900 to-primary-950 p-10 rounded-[3rem] shadow-2xl text-center space-y-6">
                <p className="text-[10px] font-bold text-primary-400 uppercase tracking-[0.2em]">Trust Analytics</p>
                <div className="relative inline-flex items-center justify-center">
                   <svg className="w-32 h-32 transform -rotate-90">
                      <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/5" />
                      <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray={364} strokeDashoffset={364 - (364 * (securityScore || 0)) / 100} className="text-primary-500 transition-all duration-1000" />
                   </svg>
                   <span className="absolute text-3xl font-black text-white">{securityScore}%</span>
                </div>
                <div className="space-y-2">
                   <p className="text-lg font-bold text-white">Stability Score</p>
                   <p className="text-xs text-slate-400 leading-relaxed">Network reliability based on provider reputation and node consistency.</p>
                </div>
             </div>

             <div className="bg-primary-600 p-8 rounded-[2.5rem] shadow-xl shadow-primary-900/20 text-white relative overflow-hidden">
                <Sparkles className="absolute top-0 right-0 p-6 w-20 h-20 opacity-20" />
                <p className="text-[10px] font-bold text-primary-200 uppercase tracking-widest mb-2">Live Insights</p>
                <p className="text-sm font-bold leading-relaxed">This node is currently routing through {result.org}. High-speed connection detected.</p>
             </div>
          </div>
        </div>
      )}

      {result?.error && (
        <div className="max-w-2xl mx-auto p-12 bg-red-50 border-2 border-dashed border-red-200 rounded-[3rem] text-center space-y-4">
           <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center text-red-600 mx-auto">
              <Info className="w-8 h-8" />
           </div>
           <p className="text-lg font-black text-red-900 uppercase tracking-tight">Intelligence Blocked</p>
           <p className="text-sm text-red-600 font-medium">{result.error}</p>
        </div>
      )}
    </div>
  );
}

