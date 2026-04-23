"use client";

import { useState } from "react";
import { Banknote, Percent, Zap, RotateCcw, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";

interface FinanceCalculatorToolProps {
    mode: "compound-interest" | "simple-interest" | "tip" | "discount";
}

export default function FinanceCalculatorTool({ mode }: FinanceCalculatorToolProps) {
    const [inputs, setInputs] = useState<Record<string, string>>({
        principal: "1000",
        rate: "5",
        time: "1",
        bill: "50",
        tipPercent: "15",
        originalPrice: "100",
        discountPercent: "20"
    });

    const [result, setResult] = useState<string | null>(null);

    const calculate = () => {
        try {
            if (mode === "compound-interest") {
                const p = parseFloat(inputs.principal);
                const r = parseFloat(inputs.rate) / 100;
                const t = parseFloat(inputs.time);
                const amount = p * Math.pow((1 + r), t);
                setResult(`Total Amount: $${amount.toFixed(2)}\nInterest Earned: $${(amount - p).toFixed(2)}`);
            } else if (mode === "simple-interest") {
                const p = parseFloat(inputs.principal);
                const r = parseFloat(inputs.rate) / 100;
                const t = parseFloat(inputs.time);
                const interest = p * r * t;
                setResult(`Interest Earned: $${interest.toFixed(2)}\nTotal Amount: $${(p + interest).toFixed(2)}`);
            } else if (mode === "tip") {
                const bill = parseFloat(inputs.bill);
                const tip = bill * (parseFloat(inputs.tipPercent) / 100);
                setResult(`Tip Amount: $${tip.toFixed(2)}\nTotal Bill: $${(bill + tip).toFixed(2)}`);
            } else if (mode === "discount") {
                const price = parseFloat(inputs.originalPrice);
                const savings = price * (parseFloat(inputs.discountPercent) / 100);
                setResult(`Savings: $${savings.toFixed(2)}\nFinal Price: $${(price - savings).toFixed(2)}`);
            }
        } catch (e) {
            setResult("Error: Invalid inputs.");
        }
    };

    const updateInput = (key: string, val: string) => {
        setInputs(prev => ({ ...prev, [key]: val }));
    };

    return (
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-8">
            <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600">
                    <Banknote className="w-6 h-6" />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-slate-900 capitalize">{mode.replace("-", " ")} Calculator</h3>
                    <p className="text-sm text-slate-500">Calculate your finances instantly</p>
                </div>
            </div>

            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {mode.includes("interest") && (
                        <>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-2">Principal ($)</label>
                                <input type="number" value={inputs.principal} onChange={(e) => updateInput("principal", e.target.value)} className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-2">Annual Rate (%)</label>
                                <input type="number" value={inputs.rate} onChange={(e) => updateInput("rate", e.target.value)} className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-2">Time (Years)</label>
                                <input type="number" value={inputs.time} onChange={(e) => updateInput("time", e.target.value)} className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl" />
                            </div>
                        </>
                    )}

                    {mode === "tip" && (
                        <>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-2">Bill Amount ($)</label>
                                <input type="number" value={inputs.bill} onChange={(e) => updateInput("bill", e.target.value)} className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-2">Tip Percentage (%)</label>
                                <input type="number" value={inputs.tipPercent} onChange={(e) => updateInput("tipPercent", e.target.value)} className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl" />
                            </div>
                        </>
                    )}

                    {mode === "discount" && (
                        <>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-2">Original Price ($)</label>
                                <input type="number" value={inputs.originalPrice} onChange={(e) => updateInput("originalPrice", e.target.value)} className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-2">Discount (%)</label>
                                <input type="number" value={inputs.discountPercent} onChange={(e) => updateInput("discountPercent", e.target.value)} className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl" />
                            </div>
                        </>
                    )}
                </div>

                <button onClick={calculate} className="w-full py-4 bg-primary-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary-500/20 active:scale-[0.98] transition-all">
                    <Zap className="w-5 h-5" /> Calculate
                </button>

                {result && (
                    <div className="bg-slate-900 rounded-2xl p-6 relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-1 h-full bg-primary-500"></div>
                        <pre className="text-blue-100 font-mono text-lg whitespace-pre-wrap">{result}</pre>
                        <button onClick={() => setResult(null)} className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors">
                            <RotateCcw className="w-4 h-4" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
