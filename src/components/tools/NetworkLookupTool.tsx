"use client";

import { useState } from "react";
import { Globe, Lock, ArrowRight, Search, Loader2, Check, AlertCircle } from "lucide-react";

interface NetworkLookupToolProps {
    mode: "whois" | "ssl" | "redirect";
}

export default function NetworkLookupTool({ mode }: NetworkLookupToolProps) {
    const [url, setUrl] = useState("");
    const [result, setResult] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const performLookup = async () => {
        if (!url) return;
        setIsLoading(true);
        setError(null);
        setResult(null);

        try {
            // For a real app, you'd use a proxy or specialized API
            // Since we're client-side, we'll use some free APIs where possible or simulate for the demo

            let endpoint = "";
            if (mode === "whois") {
                // Mocking WHOIS as it usually requires server-side
                await new Promise(r => setTimeout(r, 1500));
                setResult({
                    domain: url,
                    registrar: "NameCheap, Inc.",
                    expiry: "2025-12-31",
                    status: "Active / ClientTransferProhibited"
                });
            } else if (mode === "ssl") {
                // Mocking SSL
                await new Promise(r => setTimeout(r, 1200));
                setResult({
                    commonName: url,
                    issuer: "Let's Encrypt R3",
                    validUntil: "2024-06-15",
                    strength: "TLS 1.3 / 2048-bit RSA"
                });
            } else if (mode === "redirect") {
                // Mocking Redirect
                await new Promise(r => setTimeout(r, 1000));
                setResult({
                    original: `http://${url}`,
                    status: 301,
                    final: `https://${url}`,
                    hops: 1
                });
            }
        } catch (e) {
            setError("Failed to fetch data. Please check the URL.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-8">
            <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600">
                    {mode === "whois" ? <Globe className="w-6 h-6" /> : mode === "ssl" ? <Lock className="w-6 h-6" /> : <ArrowRight className="w-6 h-6" />}
                </div>
                <div>
                    <h3 className="text-xl font-bold text-slate-900 capitalize">{mode} Checker</h3>
                    <p className="text-sm text-slate-500">Analyze domain and network status</p>
                </div>
            </div>

            <div className="flex gap-2">
                <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="example.com"
                    className="flex-1 p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-primary-500 transition-colors"
                />
                <button
                    onClick={performLookup}
                    disabled={isLoading || !url}
                    className="px-6 bg-primary-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 disabled:opacity-50"
                >
                    {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
                    Check
                </button>
            </div>

            {error && (
                <div className="p-4 bg-red-50 text-red-600 rounded-xl flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    {error}
                </div>
            )}

            {result && (
                <div className="space-y-4 animate-in fade-in slide-in-from-top-4">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-2">Results for {url}</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Object.entries(result).map(([key, value]) => (
                            <div key={key} className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">{key.replace(/([A-Z])/g, ' $1')}</p>
                                <p className="text-slate-900 font-medium">{String(value)}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
