"use client";

import { useState } from "react";
<<<<<<< HEAD
import {
  Globe,
  Lock,
  ArrowRight,
  Search,
  Loader2,
  AlertCircle,
  ExternalLink,
} from "lucide-react";

interface NetworkLookupToolProps {
  mode: "whois" | "ssl" | "redirect";
}

interface SSLResult {
  domain: string;
  issuer?: string;
  validFrom?: string;
  validUntil?: string;
  error?: string;
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
      let domain = url.replace(/^https?:\/\//, "").split("/")[0];

      if (mode === "whois") {
        // WHOIS requires server-side access, show external service links
        setResult({
          message: "WHOIS lookup requires server-side processing",
          domain: domain,
          services: [
            {
              name: "ICANN WHOIS",
              url: `https://lookup.icann.org/lookup?name=${domain}`,
            },
            { name: "WHOIS.com", url: `https://www.whois.com/whois/${domain}` },
            {
              name: "MXToolbox",
              url: `https://mxtoolbox.com/whois.aspx?query=${domain}`,
            },
          ],
        });
      } else if (mode === "ssl") {
        // Try to check SSL cert using fetch headers
        try {
          const response = await fetch(`https://${domain}`, { method: "HEAD" });
          // If we get a response, the site has SSL
          setResult({
            domain: domain,
            status: "✓ SSL Certificate Detected",
            note: "This domain has an active SSL certificate. For detailed certificate info, use external services.",
            services: [
              {
                name: "SSL Labs",
                url: `https://www.ssllabs.com/ssltest/analyze.html?d=${domain}`,
              },
              {
                name: "Digicert",
                url: `https://www.digicert.com/help/certificate-installation-problem`,
              },
              {
                name: "MXToolbox SSL Check",
                url: `https://mxtoolbox.com/ssl.aspx?query=${domain}`,
              },
            ],
          });
        } catch (e) {
          setResult({
            domain: domain,
            status: "❌ Unable to Verify",
            note: "Could not verify SSL certificate. The domain may not be reachable or may not have SSL.",
            services: [
              {
                name: "SSL Labs",
                url: `https://www.ssllabs.com/ssltest/analyze.html?d=${domain}`,
              },
              {
                name: "Digicert",
                url: `https://www.digicert.com/help/certificate-installation-problem`,
              },
            ],
          });
        }
      } else if (mode === "redirect") {
        // Check redirect using CORS-enabled service
        try {
          const corsProxy = "https://api.allorigins.win/raw?url=";
          const targetUrl = url.startsWith("http") ? url : `https://${url}`;

          const response = await fetch(
            corsProxy + encodeURIComponent(targetUrl),
            { method: "HEAD" },
          );
          const finalUrl = response.url || targetUrl;

          setResult({
            original: targetUrl,
            final: finalUrl,
            status: response.status,
            redirected: response.redirected || false,
            note: response.redirected
              ? "This URL redirects to another location"
              : "No redirect detected",
          });
        } catch (e) {
          setResult({
            original: url,
            error: "Could not verify redirect. Try using external services.",
            services: [
              {
                name: "HTTP Status Code Checker",
                url: "https://httpstatus.io/",
              },
              {
                name: "Redirect Checker",
                url: "https://redirect-checker.org/",
              },
              { name: "MXToolbox", url: "https://mxtoolbox.com/http" },
            ],
          });
        }
      }
    } catch (e) {
      setError(
        "Failed to perform lookup. Please check the domain and try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-8">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600">
          {mode === "whois" ? (
            <Globe className="w-6 h-6" />
          ) : mode === "ssl" ? (
            <Lock className="w-6 h-6" />
          ) : (
            <ArrowRight className="w-6 h-6" />
          )}
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900 capitalize">
            {mode === "redirect" ? "HTTP Status & Redirect" : `${mode} Lookup`}
          </h3>
          <p className="text-sm text-slate-500">
            Check domain and network information
          </p>
        </div>
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && performLookup()}
          placeholder={
            mode === "redirect" ? "https://example.com" : "example.com"
          }
          className="flex-1 p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-primary-500 transition-colors"
        />
        <button
          onClick={performLookup}
          disabled={isLoading || !url}
          className="px-6 bg-primary-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 disabled:opacity-50 hover:bg-primary-700 transition-colors"
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Search className="w-5 h-5" />
          )}
          {isLoading ? "Checking..." : "Check"}
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-600 rounded-xl flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          {error}
        </div>
      )}

      {result && (
        <div className="space-y-4 animate-in fade-in">
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-2xl">
            <p className="text-sm text-blue-700 font-medium">
              {result.message ||
                result.status ||
                result.note ||
                "Lookup result"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(result)
              .filter(
                ([key]) =>
                  !["services", "message", "note", "error"].includes(key),
              )
              .map(([key, value]) => (
                <div
                  key={key}
                  className="p-4 bg-slate-50 rounded-2xl border border-slate-100"
                >
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    {key.replace(/([A-Z])/g, " $1")}
                  </p>
                  <p className="text-slate-900 font-medium break-all">
                    {String(value)}
                  </p>
                </div>
              ))}
          </div>

          {result.services && result.services.length > 0 && (
            <div>
              <h4 className="text-sm font-bold text-slate-900 mb-3">
                Recommended External Services
              </h4>
              <div className="space-y-2">
                {result.services.map((service: any, idx: number) => (
                  <a
                    key={idx}
                    href={service.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 bg-slate-50 hover:bg-primary-50 border border-slate-100 hover:border-primary-300 rounded-lg transition-colors"
                  >
                    <span className="text-sm font-medium text-slate-700">
                      {service.name}
                    </span>
                    <ExternalLink className="w-4 h-4 text-primary-600" />
                  </a>
                ))}
              </div>
            </div>
          )}

          {mode === "whois" && (
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl text-xs text-amber-800">
              <p className="font-semibold mb-1">About WHOIS Lookups:</p>
              <p>
                WHOIS data is typically accessed server-side. For accurate,
                up-to-date information about domain registration, use the
                services above.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
=======
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
>>>>>>> d366566fdaff0e02dbc3205770509d5194ddbac9
}
