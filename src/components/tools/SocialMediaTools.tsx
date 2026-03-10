"use client";

import { useState } from "react";
import { Share2, Mail, Copy, Check, Zap, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

interface SocialMediaToolsProps {
    mode: "headline" | "email-signature" | "hashtag" | "username";
}

export default function SocialMediaTools({ mode }: SocialMediaToolsProps) {
    const [input, setInput] = useState("");
    const [result, setResult] = useState<string | null>(null);
    const [isCopied, setIsCopied] = useState(false);

    const generate = () => {
        if (!input) return;

        if (mode === "headline") {
            const templates = [
                `Why ${input} is the Future of Digital Marketing`,
                `10 Secret Hacks to Master ${input} Today`,
                `The Only Guide to ${input} You'll Ever Need`,
                `How I Scaled My Business Using Just ${input}`,
                `Is ${input} Killing Your Productivity?`,
            ];
            setResult(templates.join("\n\n"));
        } else if (mode === "email-signature") {
            const parts = input.split(",").map(p => p.trim());
            const name = parts[0] || "Your Name";
            const role = parts[1] || "Your Role";
            const company = parts[2] || "Your Company";

            const signature = `
${name}
${role} | ${company}
📧 Email: example@email.com
🌐 Web: www.takethetools.com
--------------------------
Sent using TakeTheTools.com
      `.trim();
            setResult(signature);
        } else if (mode === "hashtag") {
            const tags = input.split(/[,\s]+/).map(t => `#${t.replace("#", "")}`).join(" ");
            const viral = ["#trending", "#viral", "#foryou", "#explore", "#takethetools"];
            setResult(`${tags}\n\n${viral.join(" ")}`);
        } else if (mode === "username") {
            const base = input.toLowerCase().replace(/\s+/g, "");
            const versions = [
                `${base}_official`,
                `the_${base}`,
                `${base}_labs`,
                `real_${base}`,
                `${base}_x`
            ];
            setResult(versions.join("\n"));
        }
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
                    {mode === "headline" ? <Share2 className="w-6 h-6" /> : <Mail className="w-6 h-6" />}
                </div>
                <div>
                    <h3 className="text-xl font-bold text-slate-900 capitalize">{mode.replace("-", " ")} Generator</h3>
                    <p className="text-sm text-slate-500">{mode === "headline" ? "Generate viral social media headlines" : "Create professional email signatures"}</p>
                </div>
            </div>

            <div className="space-y-6">
                <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-2">
                        {mode === "headline" ? "Enter Topic (e.g. AI, Cooking)" : "Enter Details (Name, Role, Company)"}
                    </label>
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-800"
                        placeholder={mode === "headline" ? "e.g. Artificial Intelligence" : "John Doe, CEO, Tech Solutions"}
                    />
                </div>

                <button onClick={generate} className="w-full py-4 bg-primary-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2">
                    <Zap className="w-5 h-5" /> Generate
                </button>

                {result && (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between px-2">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Results</label>
                            <button onClick={copyResult} className="text-primary-600 text-xs font-bold flex items-center gap-1">
                                {isCopied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                                Copy
                            </button>
                        </div>
                        <pre className="p-6 bg-slate-900 rounded-2xl text-blue-100 font-mono text-sm whitespace-pre-wrap">
                            {result}
                        </pre>
                    </div>
                )}
            </div>
        </div>
    );
}
