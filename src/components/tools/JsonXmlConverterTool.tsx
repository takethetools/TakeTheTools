"use client";

import { useState } from "react";
import { Braces, Zap, Copy, Check, AlertCircle } from "lucide-react";

function jsonToXml(json: string): string {
  try {
    const obj = JSON.parse(json);
    function convert(val: unknown, tag: string, indent: string): string {
      if (val === null || val === undefined) return `${indent}<${tag}/>\n`;
<<<<<<< HEAD
      if (Array.isArray(val))
        return val.map((item) => convert(item, tag, indent)).join("");
      if (typeof val === "object") {
        let xml = `${indent}<${tag}>\n`;
        for (const [k, v] of Object.entries(val as Record<string, unknown>)) {
          const safeKey = k
            .replace(/[^a-zA-Z0-9_-]/g, "_")
            .replace(/^(\d)/, "_$1");
=======
      if (Array.isArray(val)) return val.map(item => convert(item, tag, indent)).join("");
      if (typeof val === "object") {
        let xml = `${indent}<${tag}>\n`;
        for (const [k, v] of Object.entries(val as Record<string, unknown>)) {
          const safeKey = k.replace(/[^a-zA-Z0-9_-]/g, "_").replace(/^(\d)/, "_$1");
>>>>>>> d366566fdaff0e02dbc3205770509d5194ddbac9
          xml += convert(v, safeKey, indent + "  ");
        }
        xml += `${indent}</${tag}>\n`;
        return xml;
      }
<<<<<<< HEAD
      const escaped = String(val)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
=======
      const escaped = String(val).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
>>>>>>> d366566fdaff0e02dbc3205770509d5194ddbac9
      return `${indent}<${tag}>${escaped}</${tag}>\n`;
    }
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    if (typeof obj === "object" && !Array.isArray(obj)) {
      xml += `<root>\n`;
      for (const [k, v] of Object.entries(obj as Record<string, unknown>)) {
<<<<<<< HEAD
        const safeKey = k
          .replace(/[^a-zA-Z0-9_-]/g, "_")
          .replace(/^(\d)/, "_$1");
=======
        const safeKey = k.replace(/[^a-zA-Z0-9_-]/g, "_").replace(/^(\d)/, "_$1");
>>>>>>> d366566fdaff0e02dbc3205770509d5194ddbac9
        xml += convert(v, safeKey, "  ");
      }
      xml += `</root>`;
    } else {
      xml += convert(obj, "root", "");
    }
    return xml;
  } catch {
    return "Error: Invalid JSON input";
  }
}

<<<<<<< HEAD
function xmlToJson(xml: string): string {
  try {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xml, "text/xml");

    if (xmlDoc.getElementsByTagName("parsererror").length > 0) {
      return "Error: Invalid XML";
    }

    function parseElement(element: Element): unknown {
      if (element.children.length === 0) {
        const text = element.textContent?.trim();
        if (!text) return null;
        if (text === "true") return true;
        if (text === "false") return false;
        const num = parseFloat(text);
        return isNaN(num) ? text : num;
      }

      const result: Record<string, unknown> = {};
      for (let i = 0; i < element.children.length; i++) {
        const child = element.children[i];
        const key = child.tagName;
        const value = parseElement(child);

        if (result[key]) {
          if (Array.isArray(result[key])) {
            (result[key] as unknown[]).push(value);
          } else {
            result[key] = [result[key], value];
          }
        } else {
          result[key] = value;
        }
      }
      return result;
    }

    const root = xmlDoc.documentElement;
    let json: unknown;

    if (root.children.length === 1 && root.children[0].children.length === 0) {
      json = parseElement(root.children[0]);
    } else {
      json = { [root.tagName]: parseElement(root) };
    }

    return JSON.stringify(json, null, 2);
  } catch {
    return "Error: Failed to parse XML";
  }
}

interface Props {
  mode: "json-to-xml" | "xml-to-json";
}

export default function JsonXmlConverterTool({ mode }: Props) {
  const [input, setInput] = useState(
    mode === "json-to-xml"
      ? '{\n  "user": {\n    "id": 1,\n    "name": "John Doe",\n    "email": "john@example.com",\n    "tags": ["admin", "user"]\n  }\n}'
      : '<?xml version="1.0" encoding="UTF-8"?>\n<root>\n  <user>\n    <id>1</id>\n    <name>John Doe</name>\n    <email>john@example.com</email>\n  </user>\n</root>',
  );
=======
interface Props { mode: "json-to-xml" }

export default function JsonXmlConverterTool({ mode }: Props) {
  const [input, setInput] = useState('{\n  "user": {\n    "id": 1,\n    "name": "John Doe",\n    "email": "john@example.com",\n    "tags": ["admin", "user"]\n  }\n}');
>>>>>>> d366566fdaff0e02dbc3205770509d5194ddbac9
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  const convert = () => {
    setError("");
<<<<<<< HEAD
    const result = mode === "json-to-xml" ? jsonToXml(input) : xmlToJson(input);
    if (result.startsWith("Error:")) {
      setError(result);
      setOutput("");
    } else setOutput(result);
  };

  const copy = () => {
    navigator.clipboard.writeText(output);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const inputLabel = mode === "json-to-xml" ? "JSON Input" : "XML Input";
  const outputLabel = mode === "json-to-xml" ? "XML Output" : "JSON Output";
  const buttonText =
    mode === "json-to-xml" ? "Convert to XML" : "Convert to JSON";
  const title =
    mode === "json-to-xml" ? "JSON to XML Converter" : "XML to JSON Converter";
=======
    const result = jsonToXml(input);
    if (result.startsWith("Error:")) { setError(result); setOutput(""); }
    else setOutput(result);
  };

  const copy = () => { navigator.clipboard.writeText(output); setIsCopied(true); setTimeout(() => setIsCopied(false), 2000); };
>>>>>>> d366566fdaff0e02dbc3205770509d5194ddbac9

  return (
    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600">
          <Braces className="w-6 h-6" />
        </div>
        <div>
<<<<<<< HEAD
          <h3 className="text-xl font-bold text-slate-900">{title}</h3>
          <p className="text-sm text-slate-500">
            Transform between JSON and XML formats
          </p>
        </div>
      </div>
      <div>
        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 block">
          {inputLabel}
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full h-48 p-5 bg-slate-50 border border-slate-200 rounded-2xl font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary-300"
          placeholder={
            mode === "json-to-xml"
              ? '{"key": "value"}'
              : '<?xml version="1.0"?>\n<root></root>'
          }
        />
      </div>
      {error && (
        <div className="flex items-center gap-2 p-4 bg-red-50 rounded-2xl text-red-600 text-sm">
          <AlertCircle className="w-4 h-4" />
          {error}
        </div>
      )}
      <button
        onClick={convert}
        className="w-full py-4 bg-primary-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-primary-700 transition-colors"
      >
        <Zap className="w-5 h-5" /> {buttonText}
=======
          <h3 className="text-xl font-bold text-slate-900">JSON to XML Converter</h3>
          <p className="text-sm text-slate-500">Transform JSON objects into valid XML documents</p>
        </div>
      </div>
      <div>
        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 block">JSON Input</label>
        <textarea value={input} onChange={e => setInput(e.target.value)}
          className="w-full h-48 p-5 bg-slate-50 border border-slate-200 rounded-2xl font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary-300"
          placeholder='{"key": "value"}'
        />
      </div>
      {error && <div className="flex items-center gap-2 p-4 bg-red-50 rounded-2xl text-red-600 text-sm"><AlertCircle className="w-4 h-4" />{error}</div>}
      <button onClick={convert} className="w-full py-4 bg-primary-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-primary-700 transition-colors">
        <Zap className="w-5 h-5" /> Convert to XML
>>>>>>> d366566fdaff0e02dbc3205770509d5194ddbac9
      </button>
      {output && (
        <div>
          <div className="flex justify-between mb-2 px-1">
<<<<<<< HEAD
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              {outputLabel}
            </label>
            <button
              onClick={copy}
              className="text-primary-600 text-xs font-bold flex items-center gap-1"
            >
              {isCopied ? (
                <Check className="w-3 h-3" />
              ) : (
                <Copy className="w-3 h-3" />
              )}{" "}
              {isCopied ? "Copied!" : "Copy"}
            </button>
          </div>
          <pre className="w-full p-6 bg-slate-900 rounded-2xl font-mono text-xs text-blue-200 overflow-auto max-h-72">
            <code>{output}</code>
          </pre>
=======
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">XML Output</label>
            <button onClick={copy} className="text-primary-600 text-xs font-bold flex items-center gap-1">
              {isCopied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />} {isCopied ? "Copied!" : "Copy"}
            </button>
          </div>
          <pre className="w-full p-6 bg-slate-900 rounded-2xl font-mono text-xs text-blue-200 overflow-auto max-h-72"><code>{output}</code></pre>
>>>>>>> d366566fdaff0e02dbc3205770509d5194ddbac9
        </div>
      )}
    </div>
  );
}
