"use client";
<<<<<<< HEAD
import { useState } from "react";
import { Calculator, Zap, RotateCcw, Copy, Check } from "lucide-react";

type Mode = "gcd-lcm" | "prime" | "circle" | "percentage" | "average" | "fraction" | "decimal" | "quadratic" | "stats" | "matrix" | "scientific" | "roman" | "binary";

const MODE_CONFIG: Record<Mode, { title: string; fields: { key: string; label: string; placeholder: string }[]; hint?: string }> = {
  "gcd-lcm": { title: "GCD & LCM Calculator", fields: [{ key: "nums", label: "Numbers", placeholder: "e.g. 12, 18, 30" }], hint: "Enter 2 or more numbers separated by commas" },
  "prime": { title: "Prime Factorization", fields: [{ key: "n", label: "Number", placeholder: "e.g. 360" }] },
  "circle": { title: "Circle Calculator", fields: [{ key: "r", label: "Radius", placeholder: "e.g. 7" }] },
  "percentage": {
    title: "Percentage Calculator", hint: "Calculates: What is X% of Y?",
    fields: [{ key: "pct", label: "Percentage (%)", placeholder: "e.g. 25" }, { key: "total", label: "Total / Whole", placeholder: "e.g. 200" }]
  },
  "average": { title: "Average / Mean", fields: [{ key: "nums", label: "Numbers", placeholder: "e.g. 4, 8, 15, 16, 23, 42" }] },
  "fraction": { title: "Fraction to Decimal", fields: [{ key: "num", label: "Numerator", placeholder: "e.g. 3" }, { key: "den", label: "Denominator", placeholder: "e.g. 8" }] },
  "decimal": { title: "Decimal to Fraction", fields: [{ key: "dec", label: "Decimal", placeholder: "e.g. 0.375" }] },
  "quadratic": {
    title: "Quadratic Equation Solver", hint: "Solves ax² + bx + c = 0",
    fields: [{ key: "a", label: "a (coefficient of x²)", placeholder: "e.g. 1" }, { key: "b", label: "b (coefficient of x)", placeholder: "e.g. -5" }, { key: "c", label: "c (constant)", placeholder: "e.g. 6" }]
  },
  "stats": {
    title: "Statistics Calculator",
    fields: [{ key: "nums", label: "Dataset", placeholder: "e.g. 4, 8, 15, 16, 23, 42" }]
  },
  "matrix": {
    title: "Matrix Determinant", hint: "Enter 4 values for 2×2 or 9 values for 3×3",
    fields: [{ key: "nums", label: "Matrix elements (row by row)", placeholder: "e.g. 1, 2, 3, 4 (for 2×2)" }]
  },
  "scientific": {
    title: "Scientific Functions", hint: "Calculates sin, cos, tan, log, ln, sqrt, square, eˣ",
    fields: [{ key: "num", label: "Number / Angle (degrees for trig)", placeholder: "e.g. 45" }]
  },
  "roman": { title: "Roman Numeral Converter", fields: [{ key: "num", label: "Number (1–3999)", placeholder: "e.g. 2024" }] },
  "binary": { title: "Binary Arithmetic", fields: [{ key: "expr", label: "Expression", placeholder: "e.g. 1010 + 1100" }], hint: "Use binary numbers with + - * / operators" },
};

export default function MathTool({ mode }: { mode: Mode }) {
  const config = MODE_CONFIG[mode];
  const [vals, setVals] = useState<Record<string, string>>({});
  const [result, setResult] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const setVal = (key: string, v: string) => setVals(prev => ({ ...prev, [key]: v }));

  const calculate = () => {
    try {
      let res = "";

      if (mode === "gcd-lcm") {
        const nums = (vals.nums || "").split(/[,\s]+/).map(Number).filter(n => !isNaN(n) && n > 0);
        if (nums.length < 2) { setResult("❌ Enter at least 2 numbers"); return; }
        const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
        const lcm = (a: number, b: number) => (a * b) / gcd(a, b);
        const g = nums.reduce(gcd), l = nums.reduce(lcm);
        res = `GCD (Greatest Common Divisor): ${g}\nLCM (Least Common Multiple): ${l}`;

      } else if (mode === "prime") {
        const n = parseInt(vals.n || "");
        if (isNaN(n) || n < 2) { setResult("❌ Enter a number ≥ 2"); return; }
        const factors: number[] = [];
        let temp = n, d = 2;
        while (temp >= d * d) { while (temp % d === 0) { factors.push(d); temp /= d; } d++; }
        if (temp > 1) factors.push(temp);
        const isPrime = factors.length === 1;
        res = `${n} = ${factors.join(" × ")}\n\n${isPrime ? `✓ ${n} is a PRIME number` : `${n} is composite (not prime)`}`;

      } else if (mode === "circle") {
        const r = parseFloat(vals.r || "");
        if (isNaN(r) || r <= 0) { setResult("❌ Enter a positive radius"); return; }
        res = `Radius: ${r}\nDiameter: ${(r * 2).toFixed(6)}\nCircumference: ${(2 * Math.PI * r).toFixed(6)}\nArea: ${(Math.PI * r * r).toFixed(6)}\nSphere Volume: ${((4 / 3) * Math.PI * r * r * r).toFixed(6)}\nSphere Surface: ${(4 * Math.PI * r * r).toFixed(6)}`;

      } else if (mode === "percentage") {
        const pct = parseFloat(vals.pct || ""), total = parseFloat(vals.total || "");
        if (isNaN(pct) || isNaN(total)) { setResult("❌ Enter both values"); return; }
        const val = (pct / 100) * total;
        res = `${pct}% of ${total} = ${val.toFixed(4)}\n\n• As fraction: ${pct}/100\n• Remaining: ${(total - val).toFixed(4)} (${100 - pct}%)\n• ${total} is 100% of ${total}\n• 1% of ${total} = ${(total / 100).toFixed(4)}`;

      } else if (mode === "average") {
        const nums = (vals.nums || "").split(/[,\s]+/).map(Number).filter(n => !isNaN(n));
        if (!nums.length) { setResult("❌ Enter numbers"); return; }
        const sum = nums.reduce((a, b) => a + b, 0);
        const mean = sum / nums.length;
        const sorted = [...nums].sort((a, b) => a - b);
        const mid = Math.floor(sorted.length / 2);
        const median = sorted.length % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid];
        const freq: Record<number, number> = {};
        nums.forEach(n => freq[n] = (freq[n] || 0) + 1);
        const maxFreq = Math.max(...Object.values(freq));
        const modes = Object.keys(freq).filter(k => freq[+k] === maxFreq).join(", ");
        const variance = nums.reduce((acc, n) => acc + (n - mean) ** 2, 0) / nums.length;
        res = `Count: ${nums.length}\nSum: ${sum}\nMean (Average): ${mean.toFixed(6)}\nMedian: ${median}\nMode: ${modes}\nMin: ${sorted[0]}\nMax: ${sorted[sorted.length - 1]}\nRange: ${sorted[sorted.length - 1] - sorted[0]}\nVariance: ${variance.toFixed(6)}\nStd Dev: ${Math.sqrt(variance).toFixed(6)}`;

      } else if (mode === "stats") {
        const nums = (vals.nums || "").split(/[,\s]+/).map(Number).filter(n => !isNaN(n));
        if (!nums.length) { setResult("❌ Enter numbers"); return; }
        const sorted = [...nums].sort((a, b) => a - b);
        const sum = nums.reduce((a, b) => a + b, 0);
        const mean = sum / nums.length;
        const mid = Math.floor(sorted.length / 2);
        const median = sorted.length % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid];
        const variance = nums.reduce((a, n) => a + (n - mean) ** 2, 0) / nums.length;
        const q1 = sorted[Math.floor(sorted.length / 4)];
        const q3 = sorted[Math.floor((3 * sorted.length) / 4)];
        res = `Count: ${nums.length}\nSum: ${sum}\nMean: ${mean.toFixed(4)}\nMedian: ${median}\nQ1: ${q1}\nQ3: ${q3}\nIQR: ${q3 - q1}\nVariance: ${variance.toFixed(4)}\nStd Deviation: ${Math.sqrt(variance).toFixed(4)}\nMin: ${sorted[0]}\nMax: ${sorted[sorted.length - 1]}\nRange: ${sorted[sorted.length - 1] - sorted[0]}`;

      } else if (mode === "fraction") {
        const num = parseFloat(vals.num || ""), den = parseFloat(vals.den || "");
        if (isNaN(num) || isNaN(den) || den === 0) { setResult("❌ Enter valid numerator and denominator"); return; }
        const dec = num / den;
        const pct = dec * 100;
        res = `${num}/${den} = ${dec.toFixed(8)}\n\nAs percentage: ${pct.toFixed(4)}%\nAs ratio: ${num} : ${den}\nReciprocal: ${den}/${num} = ${(den / num).toFixed(8)}`;

      } else if (mode === "decimal") {
        const dec = parseFloat(vals.dec || "");
        if (isNaN(dec)) { setResult("❌ Enter a decimal number"); return; }
        const str = dec.toString();
        const len = (str.split(".")[1] || "").length;
        let den = Math.pow(10, len);
        let num = Math.round(dec * den);
        const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
        const g = gcd(Math.abs(num), den);
        res = `${dec} = ${num / g}/${den / g}\n\nSimplified: ${num / g}/${den / g}\nAs percentage: ${(dec * 100).toFixed(4)}%`;

      } else if (mode === "quadratic") {
        const a = parseFloat(vals.a || ""), b = parseFloat(vals.b || ""), c = parseFloat(vals.c || "");
        if (isNaN(a) || isNaN(b) || isNaN(c) || a === 0) { setResult("❌ Enter valid a, b, c (a ≠ 0)"); return; }
        const disc = b * b - 4 * a * c;
        const vertex_x = -b / (2 * a), vertex_y = a * vertex_x * vertex_x + b * vertex_x + c;
        if (disc < 0) {
          const real = -b / (2 * a), imag = Math.sqrt(-disc) / (2 * a);
          res = `Equation: ${a}x² + ${b}x + ${c} = 0\nDiscriminant: ${disc} (negative → complex roots)\n\nx₁ = ${real.toFixed(4)} + ${imag.toFixed(4)}i\nx₂ = ${real.toFixed(4)} - ${imag.toFixed(4)}i\n\nVertex: (${vertex_x.toFixed(4)}, ${vertex_y.toFixed(4)})`;
        } else if (disc === 0) {
          res = `Equation: ${a}x² + ${b}x + ${c} = 0\nDiscriminant: 0 (one repeated root)\n\nx = ${(-b / (2 * a)).toFixed(6)}\n\nVertex: (${vertex_x.toFixed(4)}, ${vertex_y.toFixed(4)})`;
        } else {
          const x1 = (-b + Math.sqrt(disc)) / (2 * a), x2 = (-b - Math.sqrt(disc)) / (2 * a);
          res = `Equation: ${a}x² + ${b}x + ${c} = 0\nDiscriminant: ${disc.toFixed(4)} (two real roots)\n\nx₁ = ${x1.toFixed(6)}\nx₂ = ${x2.toFixed(6)}\n\nSum of roots: ${(x1 + x2).toFixed(4)}\nProduct of roots: ${(x1 * x2).toFixed(4)}\nVertex: (${vertex_x.toFixed(4)}, ${vertex_y.toFixed(4)})`;
        }

      } else if (mode === "matrix") {
        const nums = (vals.nums || "").split(/[,\s]+/).map(Number).filter(n => !isNaN(n));
        if (nums.length === 4) {
          const [[a, b], [c, d]] = [[nums[0], nums[1]], [nums[2], nums[3]]];
          const det = a * d - b * c;
          const invDet = det !== 0 ? 1 / det : null;
          res = `Matrix:\n| ${a}  ${b} |\n| ${c}  ${d} |\n\nDeterminant: ${det}\nTrace: ${a + d}\n${invDet ? `Inverse:\n| ${(d * invDet).toFixed(4)}  ${(-b * invDet).toFixed(4)} |\n| ${(-c * invDet).toFixed(4)}  ${(a * invDet).toFixed(4)} |` : "Inverse: Does not exist (det = 0)"}`;
        } else if (nums.length === 9) {
          const [a, b, c, d, e, f, g, h, i] = nums;
          const det = a * (e * i - f * h) - b * (d * i - f * g) + c * (d * h - e * g);
          res = `Matrix:\n| ${a}  ${b}  ${c} |\n| ${d}  ${e}  ${f} |\n| ${g}  ${h}  ${i} |\n\nDeterminant: ${det}\nTrace: ${a + e + i}`;
        } else {
          setResult("❌ Enter exactly 4 values (2×2) or 9 values (3×3)"); return;
        }

      } else if (mode === "scientific") {
        const num = parseFloat(vals.num || "");
        if (isNaN(num)) { setResult("❌ Enter a number"); return; }
        const rad = (num * Math.PI) / 180;
        res = `Number: ${num}\n\nTrigonometry (degrees):\n  sin(${num}°) = ${Math.sin(rad).toFixed(8)}\n  cos(${num}°) = ${Math.cos(rad).toFixed(8)}\n  tan(${num}°) = ${Math.tan(rad).toFixed(8)}\n\nLogarithms:\n  log₁₀(${num}) = ${num > 0 ? Math.log10(num).toFixed(8) : "undefined"}\n  ln(${num}) = ${num > 0 ? Math.log(num).toFixed(8) : "undefined"}\n  log₂(${num}) = ${num > 0 ? Math.log2(num).toFixed(8) : "undefined"}\n\nPowers & Roots:\n  √${num} = ${num >= 0 ? Math.sqrt(num).toFixed(8) : "undefined"}\n  ∛${num} = ${Math.cbrt(num).toFixed(8)}\n  ${num}² = ${(num ** 2).toFixed(4)}\n  ${num}³ = ${(num ** 3).toFixed(4)}\n  eˣ = ${Math.exp(num).toFixed(8)}`;

      } else if (mode === "roman") {
        const num = parseInt(vals.num || "");
        if (isNaN(num) || num < 1 || num > 3999) { setResult("❌ Enter a number between 1 and 3999"); return; }
        const map: [number, string][] = [[1000,"M"],[900,"CM"],[500,"D"],[400,"CD"],[100,"C"],[90,"XC"],[50,"L"],[40,"XL"],[10,"X"],[9,"IX"],[5,"V"],[4,"IV"],[1,"I"]];
        let roman = "", n = num;
        for (const [v, s] of map) { while (n >= v) { roman += s; n -= v; } }
        res = `${num} → ${roman}\n\nBreakdown:\n${map.filter(([v]) => num >= v).map(([v, s]) => {
          let cnt = 0, tmp = num;
          const chunks = [];
          for (const [mv, ms] of map) { while (tmp >= mv) { if (mv === v) cnt++; tmp -= mv; } }
          return cnt > 0 ? `  ${s} × ${cnt} = ${v * cnt}` : null;
        }).filter(Boolean).join("\n")}`;

      } else if (mode === "binary") {
        const expr = (vals.expr || "").trim();
        if (!expr) { setResult("❌ Enter a binary expression"); return; }
        const parts = expr.split(/([+\-*/])/).map(s => s.trim()).filter(Boolean);
        const ops: string[] = [], operands: number[] = [];
        parts.forEach(p => {
          if (["+", "-", "*", "/"].includes(p)) ops.push(p);
          else {
            const n = parseInt(p, 2);
            if (isNaN(n)) { setResult(`❌ "${p}" is not valid binary`); return; }
            operands.push(n);
          }
        });
        let result = operands[0];
        ops.forEach((op, i) => {
          if (op === "+") result += operands[i + 1];
          else if (op === "-") result -= operands[i + 1];
          else if (op === "*") result *= operands[i + 1];
          else if (op === "/") result = Math.floor(result / operands[i + 1]);
        });
        res = `Expression: ${expr}\n\nDecimal values:\n${operands.map((o, i) => `  ${parts.filter(p => !["+","-","*","/"].includes(p))[i]} (binary) = ${o} (decimal)`).join("\n")}\n\nResult:\n  Binary: ${result.toString(2)}\n  Decimal: ${result}\n  Octal: ${result.toString(8)}\n  Hex: 0x${result.toString(16).toUpperCase()}`;
      }

      setResult(res);
    } catch (e) {
      setResult("❌ Calculation error. Check your inputs.");
    }
  };

  const copy = () => {
    if (!result) return;
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-5">
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-5">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600">
            <Calculator className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">{config.title}</h3>
            {config.hint && <p className="text-xs text-slate-400 mt-0.5">{config.hint}</p>}
          </div>
        </div>

        <div className="space-y-3">
          {config.fields.map(field => (
            <div key={field.key} className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">{field.label}</label>
              <input
                type="text"
                value={vals[field.key] || ""}
                onChange={e => setVal(field.key, e.target.value)}
                onKeyDown={e => e.key === "Enter" && calculate()}
                placeholder={field.placeholder}
                className="w-full px-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl font-medium text-slate-800 outline-none focus:ring-2 focus:ring-primary-500 transition-all"
              />
            </div>
          ))}
        </div>

        <div className="flex gap-3">
          <button onClick={calculate}
            className="flex-1 py-4 bg-primary-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary-500/20 hover:bg-primary-700 active:scale-[0.98] transition-all">
            <Zap className="w-5 h-5" /> Calculate
          </button>
          <button onClick={() => { setVals({}); setResult(null); }}
            className="px-5 py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-200 transition-all">
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>
      </div>

      {result && (
        <div className="bg-slate-900 rounded-3xl p-6 relative border border-slate-800 shadow-lg">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-primary-500 rounded-l-3xl" />
          <div className="flex items-start justify-between gap-3 mb-2">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Result</p>
            <button onClick={copy} className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors px-2 py-1 rounded-lg hover:bg-slate-700">
              {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          <pre className="text-blue-100 font-mono text-sm leading-relaxed whitespace-pre-wrap">{result}</pre>
        </div>
      )}
    </div>
  );
=======

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
            } else if (mode === "percentage") {
                const nums = inputs.split(/[,\s]+/).map(Number).filter(n => !isNaN(n));
                if (nums.length >= 2) {
                    const percent = nums[0];
                    const total = nums[1];
                    const resultVal = (percent / 100) * total;
                    setResult(`${percent}% of ${total} is ${resultVal.toFixed(4)}`);
                } else {
                    setResult("Please enter two numbers (percent, total)");
                }
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
>>>>>>> d366566fdaff0e02dbc3205770509d5194ddbac9
}
