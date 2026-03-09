"use client";

import { useState } from "react";
import { ArrowRightLeft, Copy, Check, Zap, FileJson, FileSpreadsheet } from "lucide-react";

interface JsonCsvConverterProps {
  mode: "json-to-csv" | "csv-to-json";
}

export default function JsonCsvConverter({ mode }: JsonCsvConverterProps) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  const convert = () => {
    try {
      if (mode === "json-to-csv") {
        const json = JSON.parse(input);
        const array = Array.isArray(json) ? json : [json];
        const headers = Object.keys(array[0]);
        const csv = [
          headers.join(","),
          ...array.map(row => headers.map(header => JSON.stringify(row[header])).join(","))
        ].join("\n");
        setOutput(csv);
      } else {
        const lines = input.trim().split("\n");
        const headers = lines[0].split(",");
        const result = lines.slice(1).map(line => {
          const values = line.split(",");
          return headers.reduce((obj: any, header, i) => {
            let val = values[i]?.replace(/^"|"$/g, "");
            obj[header.trim()] = isNaN(Number(val)) ? val : Number(val);
            return obj;
          }, {});
        });
        setOutput(JSON.stringify(result, null, 2));
      }
    } catch (err) {
      setOutput("Error processing data. Please check format.");
    }
  };

  const copyResult = () => {
    navigator.clipboard.writeText(output);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-8">
      <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600">
            {mode === "json-to-csv" ? <FileJson className="w-6 h-6" /> : <FileSpreadsheet className="w-6 h-6" />}
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900 capitalize">{mode.replace(/-/g, " ")}</h3>
            <p className="text-sm text-slate-500">Convert between JSON and CSV formats</p>
          </div>
        </div>
        
        <button 
          onClick={convert}
          className="px-8 py-3 bg-primary-600 text-white rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-primary-500/20"
        >
          <Zap className="w-5 h-5" />
          Convert Now
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-2">Source {mode === "json-to-csv" ? "JSON" : "CSV"}</label>
          <textarea 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full h-80 bg-slate-50 border border-slate-100 rounded-2xl p-6 font-mono text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
            placeholder={mode === "json-to-csv" ? '[{"id": 1, "name": "John"}]' : "id,name\n1,John"}
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between px-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Result</label>
            {output && (
              <button onClick={copyResult} className="text-primary-600 text-xs font-bold flex items-center gap-1">
                {isCopied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                Copy Result
              </button>
            )}
          </div>
          <textarea 
            value={output}
            readOnly
            className="w-full h-80 bg-slate-900 border-none rounded-2xl p-6 font-mono text-sm text-blue-100 focus:outline-none"
            placeholder="Result will appear here..."
          />
        </div>
      </div>
    </div>
  );
}
