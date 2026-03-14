"use client";

import { useState } from "react";
import { Container, Server, Copy, Check, Zap, RotateCcw, Download, Trash2, FileCode } from "lucide-react";
import { cn } from "@/lib/utils";

interface DevGeneratorToolProps {
    mode: "docker" | "nginx";
}

export default function DevGeneratorTool({ mode }: DevGeneratorToolProps) {
    const [config, setConfig] = useState<any>({
        runtime: "node",
        port: "3000",
        domain: "example.com",
        proxyPass: "http://localhost:3000"
    });

    const [result, setResult] = useState<string | null>(null);
    const [isCopied, setIsCopied] = useState(false);

    const generate = () => {
        if (mode === "docker") {
            const dockerfile = `
# Build Stage
FROM ${config.runtime === 'node' ? 'node:18-alpine' : 'python:3.9-slim'} AS builder
WORKDIR /app
COPY package*.json ./
RUN ${config.runtime === 'node' ? 'npm install' : 'pip install -r requirements.txt'}
COPY . .
RUN ${config.runtime === 'node' ? 'npm run build' : '# python build command'}

# Production Stage
FROM ${config.runtime === 'node' ? 'node:18-alpine' : 'python:3.9-slim'}
WORKDIR /app
COPY --from=builder /app ./
EXPOSE ${config.port}
CMD [${config.runtime === 'node' ? '"npm", "start"' : '"python", "app.py"'}]
      `.trim();
            setResult(dockerfile);
        } else if (mode === "nginx") {
            const nginx = `
server {
    listen 80;
    server_name ${config.domain};

    location / {
        proxy_pass ${config.proxyPass};
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Security Headers
    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-XSS-Protection "1; mode=block";
    add_header X-Content-Type-Options "nosniff";
}
      `.trim();
            setResult(nginx);
        }
    };

    const downloadResult = () => {
        if (!result) return;
        const blob = new Blob([result], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = mode === "docker" ? "Dockerfile" : "nginx.conf";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const clear = () => {
        setResult(null);
        if (mode === "docker") setConfig({ runtime: "node", port: "3000" });
        else setConfig({ domain: "example.com", proxyPass: "http://localhost:3000" });
    };

    const copyResult = () => {
        if (!result) return;
        navigator.clipboard.writeText(result);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    return (
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-8">
            <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600">
                    {mode === "docker" ? <Container className="w-6 h-6" /> : <Server className="w-6 h-6" />}
                </div>
                <div className="flex-grow">
                    <div className="flex justify-between items-center mb-1">
                        <h3 className="text-xl font-bold text-slate-900 capitalize">{mode} Config Generator</h3>
                        <div className="flex gap-4">
                            <button
                                onClick={() => {
                                    if (mode === "docker") setConfig({ runtime: "node", port: "8080" });
                                    else setConfig({ domain: "takethetools.com", proxyPass: "http://localhost:8080" });
                                    setTimeout(generate, 0); // Trigger generate next tick
                                }}
                                className="text-xs font-bold text-primary-500 hover:text-primary-600 transition-colors uppercase tracking-wider"
                            >
                                Example
                            </button>
                            <button
                                onClick={clear}
                                className="text-xs font-bold text-slate-400 hover:text-red-500 transition-colors flex items-center gap-1 uppercase tracking-wider"
                            >
                                <Trash2 className="w-3 h-3" /> Clear
                            </button>
                        </div>
                    </div>
                    <p className="text-sm text-slate-500">Generate production-ready configurations</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mode === "docker" ? (
                    <>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-2">Runtime</label>
                            <select
                                value={config.runtime}
                                onChange={(e) => setConfig({ ...config, runtime: e.target.value })}
                                className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none"
                            >
                                <option value="node">Node.js</option>
                                <option value="python">Python</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-2">Port</label>
                            <input
                                type="text"
                                value={config.port}
                                onChange={(e) => setConfig({ ...config, port: e.target.value })}
                                className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl"
                            />
                        </div>
                    </>
                ) : (
                    <>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-2">Domain</label>
                            <input
                                type="text"
                                value={config.domain}
                                onChange={(e) => setConfig({ ...config, domain: e.target.value })}
                                className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl"
                                placeholder="example.com"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-2">Proxy Pass</label>
                            <input
                                type="text"
                                value={config.proxyPass}
                                onChange={(e) => setConfig({ ...config, proxyPass: e.target.value })}
                                className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl"
                                placeholder="http://localhost:3000"
                            />
                        </div>
                    </>
                )}
            </div>

            <button onClick={generate} className="w-full py-4 bg-primary-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2">
                <Zap className="w-5 h-5" /> Generate Config
            </button>

            {result && (
                <div className="space-y-4">
                    <div className="flex items-center justify-between px-2">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Generated {mode === 'docker' ? 'Dockerfile' : 'nginx.conf'}</label>
                        <div className="flex gap-4">
                            <button onClick={downloadResult} className="text-slate-500 hover:text-primary-600 text-xs font-bold flex items-center gap-1 uppercase tracking-wider">
                                <Download className="w-3 h-3" /> Download
                            </button>
                            <button onClick={copyResult} className="text-primary-600 text-xs font-bold flex items-center gap-1 uppercase tracking-wider">
                                {isCopied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                                {isCopied ? "Copied!" : "Copy"}
                            </button>
                        </div>
                    </div>
                    <pre className="p-6 bg-slate-900 rounded-2xl text-blue-100 font-mono text-xs overflow-x-auto whitespace-pre">
                        {result}
                    </pre>
                </div>
            )}
        </div>
    );
}
