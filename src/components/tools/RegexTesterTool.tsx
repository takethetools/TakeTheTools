"use client";

import { useState, useEffect } from "react";
import { Search, Info, Check, Copy, AlertCircle, List } from "lucide-react";
import { cn } from "@/lib/utils";

export default function RegexTesterTool() {
  const [regex, setRegex] = useState("([a-zA-Z0-9._-]+)@([a-zA-Z0-9._-]+\\.[a-zA-Z0-9._-]+)");
  const [flags, setFlags] = useState("g");
  const [testString, setTestString] = useState("Contact us at support@globaltools.io or sales@example.com for more info.");
  const [matches, setMatches] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      setError(null);
      if (!regex) {
        setMatches([]);
        return;
      }
      const re = new RegExp(regex, flags);
      const m = [];
      let match;

      if (flags.includes('g')) {
        while ((match = re.exec(testString)) !== null) {
          m.push(match);
        }
      } else {
        match = re.exec(testString);
        if (match) m.push(match);
      }
      setMatches(m);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Invalid Regular Expression");
      setMatches([]);
    }
  }, [regex, flags, testString]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center gap-2 font-bold text-slate-900">
              <Search className="w-5 h-5 text-primary-600" />
              Regular Expression
            </div>
            <div className="flex gap-2">
              <div className="relative flex-grow">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-mono">/</span>
                <input
                  value={regex}
                  onChange={(e) => setRegex(e.target.value)}
                  className="w-full pl-6 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl font-mono text-sm focus:ring-2 focus:ring-primary-500 outline-none"
                  placeholder="pattern"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-mono">/</span>
              </div>
              <input
                value={flags}
                onChange={(e) => setFlags(e.target.value)}
                className="w-20 px-3 py-3 bg-slate-50 border border-slate-100 rounded-xl font-mono text-sm focus:ring-2 focus:ring-primary-500 outline-none"
                placeholder="flags"
              />
            </div>
            {error && (
              <div className="p-3 bg-red-50 text-red-600 rounded-xl text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                {error}
              </div>
            )}
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <div className="font-bold text-slate-900 flex items-center gap-2">
              <List className="w-5 h-5 text-primary-600" />
              Test String
            </div>
            <textarea
              value={testString}
              onChange={(e) => setTestString(e.target.value)}
              className="w-full h-64 p-6 bg-slate-50 border border-slate-100 rounded-2xl font-mono text-sm focus:ring-2 focus:ring-primary-500 outline-none resize-none"
              placeholder="Enter text to test your regex against..."
            />
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6 overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="font-bold text-slate-900 flex items-center gap-2">
              <Check className="w-5 h-5 text-green-600" />
              Matches ({matches.length})
            </div>
          </div>

          <div className="space-y-4 h-[500px] overflow-y-auto pr-2 custom-scrollbar">
            {matches.map((match, i) => (
              <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-1 bg-primary-100 text-primary-700 rounded text-[10px] font-bold uppercase">Match {i + 1}</span>
                  <span className="text-[10px] text-slate-400 font-mono">Index: {match.index}</span>
                </div>
                <div className="font-mono text-sm bg-white p-3 rounded-lg border border-slate-100 break-all">
                  {match[0]}
                </div>
                {match.length > 1 && (
                  <div className="space-y-2">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Groups</div>
                    {match.slice(1).map((group: string, gi: number) => (
                      <div key={gi} className="flex gap-2 items-start">
                        <span className="text-[10px] bg-slate-200 text-slate-600 px-1.5 py-0.5 rounded font-bold">{gi + 1}</span>
                        <span className="font-mono text-xs text-slate-600 break-all">{group}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {matches.length === 0 && !error && (
              <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-4">
                <Info className="w-12 h-12 opacity-20" />
                <p className="text-sm font-medium">No matches found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
