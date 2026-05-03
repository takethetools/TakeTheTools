"use client";

import { useState } from "react";
import { Mic, Search, Zap, Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface MiscellaneousToolsProps {
    mode: "nato" | "keyword-density";
}

export default function MiscellaneousTools({ mode }: MiscellaneousToolsProps) {
    const [input, setInput] = useState("");
    const [result, setResult] = useState<any>(null);
    const [isCopied, setIsCopied] = useState(false);

    const process = () => {
        if (!input) return;

        if (mode === "nato") {
            const natoMap: Record<string, string> = {
                'A': 'Alpha', 'B': 'Bravo', 'C': 'Charlie', 'D': 'Delta', 'E': 'Echo', 'F': 'Foxtrot',
                'G': 'Golf', 'H': 'Hotel', 'I': 'India', 'J': 'Juliet', 'K': 'Kilo', 'L': 'Lima',
                'M': 'Mike', 'N': 'November', 'O': 'Oscar', 'P': 'Papa', 'Q': 'Quebec', 'R': 'Romeo',
                'S': 'Sierra', 'T': 'Tango', 'U': 'Uniform', 'V': 'Victor', 'W': 'Whiskey', 'X': 'X-ray',
                'Y': 'Yankee', 'Z': 'Zulu'
            };
            const converted = input.toUpperCase().split('').map(c => natoMap[c] || c).join(' ');
            setResult(converted);
        } else if (mode === "keyword-density") {
            const words = input.toLowerCase().match(/\w+/g) || [];
            const totalWords = words.length;
            const counts: Record<string, number> = {};
            words.forEach(w => counts[w] = (counts[w] || 0) + 1);

            const density = Object.entries(counts)
                .map(([word, count]) => ({ word, count, percent: (count / totalWords * 100).toFixed(2) }))
                .sort((a, b) => b.count - a.count)
                .slice(0, 10);
            setResult(density);
        }
    };

    const copyResult = () => {
        const text = mode === "nato" ? result : JSON.stringify(result, null, 2);
        navigator.clipboard.writeText(text);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    return (
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-8">
            <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600">
                    {mode === "nato" ? <Mic className="w-6 h-6" /> : <Search className="w-6 h-6" />}
                </div>
                <div>
                    <h3 className="text-xl font-bold text-slate-900 capitalize">{mode.replace("-", " ")} tool</h3>
                    <p className="text-sm text-slate-500">{mode === "nato" ? "Convert text to NATO phonetic alphabet" : "Analyze keyword frequency and density"}</p>
                </div>
            </div>

            <div className="space-y-6">
                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="w-full h-40 p-6 bg-slate-50 border border-slate-100 rounded-2xl font-mono text-sm"
                    placeholder={mode === "nato" ? "Enter text..." : "Paste your article content here..."}
                />

                <button onClick={process} className="w-full py-4 bg-primary-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2">
                    <Zap className="w-5 h-5" /> {mode === "nato" ? "Convert" : "Analyze"}
                </button>

                {result && (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between px-2">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Result</label>
                            <button onClick={copyResult} className="text-primary-600 text-xs font-bold flex items-center gap-1">
                                {isCopied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                                Copy
                            </button>
                        </div>

                        {mode === "nato" ? (
                            <div className="p-6 bg-slate-900 rounded-2xl text-blue-100 font-mono text-lg break-words">
                                {result}
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {result.map((item: any, i: number) => (
                                    <div key={i} className="flex justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                                        <span className="font-bold text-slate-700">{item.word}</span>
                                        <span className="text-primary-600 font-bold">{item.count} ({item.percent}%)</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
