"use client";

import { useState, useMemo } from "react";
import { ShieldCheck, ShieldAlert, Shield, Eye, EyeOff, CheckCircle2, XCircle, AlertCircle, Zap, Clock, Copy, Check } from "lucide-react";

const COMMON_PASSWORDS = ["password", "123456", "password1", "qwerty", "abc123", "letmein", "monkey", "dragon", "master", "sunshine"];

function getEntropy(password: string): number {
  let pool = 0;
  if (/[a-z]/.test(password)) pool += 26;
  if (/[A-Z]/.test(password)) pool += 26;
  if (/[0-9]/.test(password)) pool += 10;
  if (/[^a-zA-Z0-9]/.test(password)) pool += 32;
  return Math.round(password.length * Math.log2(pool || 1));
}

function getCrackTime(entropy: number): string {
  // Assuming 1 billion guesses/sec (modern GPU brute-force)
  const guesses = Math.pow(2, entropy);
  const seconds = guesses / 1e9;
  if (seconds < 1) return "Less than a second";
  if (seconds < 60) return `${Math.round(seconds)} seconds`;
  if (seconds < 3600) return `${Math.round(seconds / 60)} minutes`;
  if (seconds < 86400) return `${Math.round(seconds / 3600)} hours`;
  if (seconds < 2592000) return `${Math.round(seconds / 86400)} days`;
  if (seconds < 31536000) return `${Math.round(seconds / 2592000)} months`;
  if (seconds < 3.154e10) return `${Math.round(seconds / 31536000)} years`;
  if (seconds < 3.154e13) return `${Math.round(seconds / 3.154e10)} thousand years`;
  return "Centuries";
}

function analyzePassword(password: string) {
  const checks = [
    { id: "length8", label: "At least 8 characters", pass: password.length >= 8 },
    { id: "length12", label: "At least 12 characters", pass: password.length >= 12 },
    { id: "uppercase", label: "Contains uppercase letter", pass: /[A-Z]/.test(password) },
    { id: "lowercase", label: "Contains lowercase letter", pass: /[a-z]/.test(password) },
    { id: "number", label: "Contains a number", pass: /[0-9]/.test(password) },
    { id: "symbol", label: "Contains a symbol (!@#$...)", pass: /[^a-zA-Z0-9]/.test(password) },
    { id: "notCommon", label: "Not a common password", pass: !COMMON_PASSWORDS.some(c => password.toLowerCase().includes(c)) },
    { id: "noRepeat", label: "No repeated characters (aaa)", pass: !/(.)\1{2,}/.test(password) },
  ];

  const passed = checks.filter(c => c.pass).length;
  const entropy = getEntropy(password);

  let score: 0 | 1 | 2 | 3 | 4;
  if (entropy < 28 || passed <= 2) score = 0;
  else if (entropy < 36 || passed <= 3) score = 1;
  else if (entropy < 60 || passed <= 5) score = 2;
  else if (entropy < 80 || passed <= 6) score = 3;
  else score = 4;

  return { checks, score, entropy, crackTime: getCrackTime(entropy) };
}

const STRENGTH_CONFIG = [
  { label: "Very Weak", color: "bg-red-500", text: "text-red-600", bg: "bg-red-50", border: "border-red-100", icon: ShieldAlert, barColor: "bg-red-500" },
  { label: "Weak", color: "bg-orange-500", text: "text-orange-600", bg: "bg-orange-50", border: "border-orange-100", icon: ShieldAlert, barColor: "bg-orange-500" },
  { label: "Fair", color: "bg-yellow-500", text: "text-yellow-600", bg: "bg-yellow-50", border: "border-yellow-100", icon: Shield, barColor: "bg-yellow-500" },
  { label: "Strong", color: "bg-blue-500", text: "text-blue-600", bg: "bg-blue-50", border: "border-blue-100", icon: ShieldCheck, barColor: "bg-blue-500" },
  { label: "Very Strong", color: "bg-green-500", text: "text-green-600", bg: "bg-green-50", border: "border-green-100", icon: ShieldCheck, barColor: "bg-green-500" },
];

export default function PasswordStrengthTool() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [copied, setCopied] = useState(false);

  const { checks, score, entropy, crackTime } = useMemo(() => analyzePassword(password), [password]);

  const config = STRENGTH_CONFIG[score];
  const StrengthIcon = config.icon;

  const copyPassword = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-8">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900">Password Strength Checker</h3>
          <p className="text-sm text-slate-500">Test how secure your password is in real time</p>
        </div>
      </div>

      {/* Input */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-2">Enter Your Password</label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-5 pr-28 bg-slate-50 border border-slate-100 rounded-2xl text-xl font-bold text-slate-800 font-mono focus:ring-2 focus:ring-primary-100 outline-none"
            placeholder="Type your password..."
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-2">
            <button onClick={() => setShowPassword(!showPassword)} className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
            <button onClick={copyPassword} className="p-2 text-slate-400 hover:text-primary-600 transition-colors">
              {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {password && (
        <>
          {/* Strength Bar */}
          <div className={`p-6 rounded-2xl border ${config.bg} ${config.border} space-y-4`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <StrengthIcon className={`w-6 h-6 ${config.text}`} />
                <span className={`text-xl font-bold ${config.text}`}>{config.label}</span>
              </div>
              <span className="text-sm text-slate-400 font-bold">{entropy} bits entropy</span>
            </div>
            <div className="flex gap-1">
              {[0, 1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className={`h-2 flex-1 rounded-full transition-all duration-500 ${i <= score ? config.barColor : "bg-white/60"}`}
                />
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-slate-50 rounded-2xl text-center">
              <p className="text-2xl font-bold text-slate-900 mb-1">{password.length}</p>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Length</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl text-center">
              <p className="text-2xl font-bold text-slate-900 mb-1">{entropy}</p>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Entropy bits</p>
            </div>
            <div className="col-span-2 p-4 bg-slate-50 rounded-2xl text-center">
              <p className="text-lg font-bold text-slate-900 mb-1 flex items-center justify-center gap-2">
                <Clock className="w-4 h-4 text-primary-500" /> {crackTime}
              </p>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Estimated time to crack</p>
            </div>
          </div>

          {/* Checklist */}
          <div className="space-y-2">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Security Checklist</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {checks.map((c) => (
                <div
                  key={c.id}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${c.pass ? "bg-green-50 text-green-700" : "bg-slate-50 text-slate-400"}`}
                >
                  {c.pass ? (
                    <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                  ) : (
                    <XCircle className="w-4 h-4 text-slate-300 shrink-0" />
                  )}
                  {c.label}
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {!password && (
        <div className="text-center py-12 text-slate-400">
          <Shield className="w-12 h-12 mx-auto mb-3 opacity-20" />
          <p className="font-medium">Start typing to analyze your password</p>
          <p className="text-sm mt-1">Your password never leaves your browser</p>
        </div>
      )}
    </div>
  );
}
