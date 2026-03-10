"use client";

import { useState } from "react";
import { Calculator, Zap, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

interface MathToolProps {
    mode: "gcd-lcm" | "prime" | "circle" | "percentage" | "average" | "fraction" | "decimal" | "quadratic" | "stats" | "matrix";
}

export default function MathTool({ mode }: MathToolProps) {
    const [inputs, setInputs] = useState<string>("");
    const [result, setResult] = useState<string | null>(null);

    const calculate = () => {
        if (!inputs) return;

        try {
            if (mode === "gcd-lcm") {
                const nums = inputs.split(/[,\s]+/).map(Number).filter(n => !isNaN(n));
                const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
                const lcm = (a: number, b: number): number => (a * b) / gcd(a, b);

                let currentGcd = nums[0];
                let currentLcm = nums[0];
                for (let i = 1; i < nums.length; i++) {
                    currentGcd = gcd(currentGcd, nums[i]);
                    currentLcm = lcm(currentLcm, nums[i]);
                }
                setResult(`GCD: ${currentGcd}\nLCM: ${currentLcm}`);
            } else if (mode === "prime") {
                const n = parseInt(inputs);
                if (isNaN(n)) return;
                const factors = [];
                let d = 2;
                let temp = n;
                while (temp >= d * d) {
                    if (temp % d === 0) {
                        factors.push(d);
                        temp /= d;
                    } else {
                        d++;
                    }
                }
                factors.push(temp);
                setResult(`Prime Factors: ${factors.join(" × ")}`);
            } else if (mode === "circle") {
                const r = parseFloat(inputs);
                if (isNaN(r)) return;
                const area = Math.PI * r * r;
                const circumference = 2 * Math.PI * r;
                setResult(`Area: ${area.toFixed(4)}\nCircumference: ${circumference.toFixed(4)}`);
            } else if (mode === "fraction") {
                const [num, den] = inputs.split("/").map(Number);
                if (isNaN(num) || isNaN(den)) return;
                setResult(`Decimal: ${(num / den).toFixed(6)}`);
            } else if (mode === "decimal") {
                const decimal = parseFloat(inputs);
                if (isNaN(decimal)) return;
                const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
                let len = decimal.toString().split(".")[1]?.length || 0;
                let denominator = Math.pow(10, len);
                let numerator = Math.floor(decimal * denominator);
                let divisor = gcd(numerator, denominator);
                setResult(`Fraction: ${numerator / divisor}/${denominator / divisor}`);
            } else if (mode === "quadratic") {
                const [a, b, c] = inputs.split(/[,\s]+/).map(Number);
                const disc = b * b - 4 * a * c;
                if (disc < 0) {
                    setResult("Imaginary Roots");
                } else {
                    const r1 = (-b + Math.sqrt(disc)) / (2 * a);
                    const r2 = (-b - Math.sqrt(disc)) / (2 * a);
                    setResult(`x1: ${r1.toFixed(4)}\nx2: ${r2.toFixed(4)}`);
                }
            } else if (mode === "stats") {
                const nums = inputs.split(/[,\s]+/).map(Number).filter(n => !isNaN(n)).sort((a, b) => a - b);
                const sum = nums.reduce((a, b) => a + b, 0);
                const mean = sum / nums.length;
                const median = nums.length % 2 === 0 ? (nums[nums.length / 2 - 1] + nums[nums.length / 2]) / 2 : nums[Math.floor(nums.length / 2)];
                setResult(`Mean: ${mean.toFixed(2)}\nMedian: ${median}\nCount: ${nums.length}`);
            } else if (mode === "matrix") {
                const nums = inputs.split(/[,\s]+/).map(Number).filter(n => !isNaN(n));
                if (nums.length === 4) {
                    const det = nums[0] * nums[3] - nums[1] * nums[2];
                    setResult(`2x2 Determinant: ${det}`);
                } else if (nums.length === 9) {
                    const det = nums[0] * (nums[4] * nums[8] - nums[5] * nums[7]) -
                        nums[1] * (nums[3] * nums[8] - nums[5] * nums[6]) +
                        nums[2] * (nums[3] * nums[7] - nums[4] * nums[6]);
                    setResult(`3x3 Determinant: ${det}`);
                } else {
                    setResult("Please enter 4 or 9 numbers");
                }
            }
        } catch (e) {
            setResult("Error: Invalid calculation.");
        }
    };

    return (
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-8">
            <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600">
                    <Calculator className="w-6 h-6" />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-slate-900 capitalize">{mode.replace("-", " & ")} Calculator</h3>
                    <p className="text-sm text-slate-500">Fast and accurate math processing</p>
                </div>
            </div>

            <div className="space-y-6">
                <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-2">
                        {mode === "gcd-lcm" ? "Enter numbers (comma or space separated)" :
                            mode === "quadratic" ? "Enter a, b, c values" :
                                mode === "matrix" ? "Enter elements (4 for 2x2, 9 for 3x3)" :
                                    mode === "stats" ? "Enter dataset" :
                                        mode === "circle" ? "Enter Radius" : "Enter Number"}
                    </label>
                    <input
                        type="text"
                        value={inputs}
                        onChange={(e) => setInputs(e.target.value)}
                        className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-800"
                        placeholder="e.g. 12, 18, 30"
                    />
                </div>

                <button onClick={calculate} className="w-full py-4 bg-primary-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary-500/20 active:scale-[0.98] transition-all">
                    <Zap className="w-5 h-5" /> Calculate
                </button>

                {result && (
                    <div className="bg-slate-900 rounded-2xl p-6 relative group overflow-hidden">
                        <div className="absolute top-0 left-0 w-1 h-full bg-primary-500"></div>
                        <pre className="text-blue-100 font-mono text-lg whitespace-pre-wrap">{result}</pre>
                        <button onClick={() => { setResult(null); setInputs(""); }} className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors">
                            <RotateCcw className="w-4 h-4" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
