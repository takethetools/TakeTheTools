"use client";

import { useState } from "react";
import { Terminal, Copy, Check, Zap, ArrowRight, Loader2 } from "lucide-react";

export default function CurlToFetchTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  const convert = () => {
    if (!input) return;
    try {
      // Basic cURL parsing logic
      const urlMatch = input.match(/curl\s+(?:--request\s+\w+\s+)?['"]?([^'"]+)['"]?/);
      if (!urlMatch) {
         setOutput("// Error: Could not find URL in curl command");
         return;
      }
      
      const url = urlMatch[1];
      const methodMatch = input.match(/(?:-X|--request)\s+(\w+)/);
      const method = methodMatch ? methodMatch[1].toUpperCase() : "GET";
      
      const headers: Record<string, string> = {};
      const headerMatches = input.matchAll(/(?:-H|--header)\s+['"]([^'"]+)['"]/g);
      for (const match of headerMatches) {
        const [key, value] = match[1].split(/:\s*/);
        headers[key] = value;
      }

      const dataMatch = input.match(/(?:-d|--data(?:-binary)?)\s+['"]([^'"]+)['"]/);
      const data = dataMatch ? dataMatch[1] : null;

      const fetchCode = `fetch("${url}", {
  method: "${method}",
  headers: ${JSON.stringify(headers, null, 2)},
  ${data ? `body: JSON.stringify(${data})` : ""}
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));`;

      setOutput(fetchCode);
    } catch (err) {
      setOutput("// Error parsing cURL command");
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
            <Terminal className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">cURL to Fetch Converter</h3>
            <p className="text-sm text-slate-500">Transform cURL commands into JavaScript Fetch requests</p>
          </div>
        </div>
        
        <button 
          onClick={convert}
          className="px-8 py-3 bg-primary-600 text-white rounded-xl font-bold flex items-center gap-2"
        >
          <Zap className="w-4 h-4" /> Convert
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <textarea 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full h-40 bg-slate-50 border border-slate-100 rounded-2xl p-6 font-mono text-sm text-slate-600 focus:outline-none"
          placeholder='curl "https://api.example.com/data" -H "Authorization: Bearer token"'
        />
        
        {output && (
          <div className="space-y-2">
            <div className="flex items-center justify-between px-2">
               <span className="text-xs font-bold text-slate-400 capitalize">JavaScript Fetch</span>
               <button onClick={copyResult} className="text-primary-600 text-xs font-bold flex items-center gap-1">
                 {isCopied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                 Copy Code
               </button>
            </div>
            <pre className="w-full p-6 bg-slate-900 rounded-2xl font-mono text-sm text-blue-100 overflow-x-auto">
              <code>{output}</code>
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
