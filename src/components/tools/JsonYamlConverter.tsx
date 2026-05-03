"use client";

import { useState } from "react";
import { FileJson, Zap, Copy, Check, Repeat } from "lucide-react";

interface JsonYamlConverterProps {
<<<<<<< HEAD
  mode: "json-to-yaml" | "yaml-to-json" | "yaml-to-toml" | "toml-to-json";
}

function jsonToYaml(obj: any, indent = 0): string {
  const spaces = " ".repeat(indent);
  const result: string[] = [];

  function stringifyValue(value: any): string {
    if (value === null || value === undefined) return "null";
    if (typeof value === "string") {
      if (value.includes(":") || value.includes("#") || value.includes("\n")) {
        return `"${value.replace(/"/g, '\\"')}"`;
      }
      return value;
    }
    if (typeof value === "boolean") return value ? "true" : "false";
    if (typeof value === "number") return String(value);
    return String(value);
  }

  for (const [key, value] of Object.entries(obj)) {
    if (Array.isArray(value)) {
      result.push(`${spaces}${key}:`);
      value.forEach((item) => {
        result.push(
          `${spaces}  - ${typeof item === "object" ? JSON.stringify(item) : stringifyValue(item)}`,
        );
      });
    } else if (typeof value === "object" && value !== null) {
      result.push(`${spaces}${key}:`);
      result.push(jsonToYaml(value, indent + 2));
    } else {
      result.push(`${spaces}${key}: ${stringifyValue(value)}`);
    }
  }
  return result.join("\n");
}

function yamlToJson(yaml: string): any {
  const lines = yaml.split("\n").map((l) => l.trimEnd());
  const obj: any = {};
  const stack: any[] = [obj];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line || line.trim().startsWith("#")) continue;

    const indent = line.search(/\S/);
    const content = line.trim();

    if (content.startsWith("-")) {
      const arrayItem = content.substring(1).trim();
      const current = stack[stack.length - 1];
      const lastKey = Object.keys(current).pop();
      if (lastKey) {
        if (!Array.isArray(current[lastKey])) {
          current[lastKey] = [];
        }
        (current[lastKey] as any[]).push(arrayItem);
      }
    } else if (content.includes(":")) {
      const [key, ...valueParts] = content.split(":");
      const value = valueParts.join(":").trim();

      while (stack.length > 1 && indent <= (lines[i - 1]?.search(/\S/) ?? 0)) {
        stack.pop();
      }

      const parsed =
        isNaN(Number(value)) && value !== "true" && value !== "false"
          ? value
          : value === "true"
            ? true
            : value === "false"
              ? false
              : value === "null"
                ? null
                : Number(value);
      stack[stack.length - 1][key.trim()] = parsed;
    }
  }
  return obj;
}

function yamlToToml(yaml: string): string {
  const obj = yamlToJson(yaml);

  function stringifyToml(obj: any, prefix = ""): string[] {
    const lines: string[] = [];

    for (const [key, value] of Object.entries(obj)) {
      const fullKey = prefix ? `${prefix}.${key}` : key;

      if (Array.isArray(value)) {
        if (value.length > 0 && typeof value[0] === "object") {
          lines.push(`[[${fullKey}]]`);
          value.forEach((item) => {
            for (const [k, v] of Object.entries(item as any)) {
              lines.push(`${k} = ${tomlValue(v)}`);
            }
          });
        } else {
          lines.push(
            `${fullKey} = [${value.map((v) => tomlValue(v)).join(", ")}]`,
          );
        }
      } else if (typeof value === "object" && value !== null) {
        lines.push(`[${fullKey}]`);
        lines.push(...stringifyToml(value, fullKey));
      } else {
        lines.push(`${fullKey} = ${tomlValue(value)}`);
      }
    }
    return lines;
  }

  function tomlValue(value: any): string {
    if (typeof value === "string") return `"${value.replace(/"/g, '\\"')}"`;
    if (typeof value === "boolean") return value ? "true" : "false";
    if (value === null) return '""';
    return String(value);
  }

  return stringifyToml(obj).join("\n");
}

function tomlToJson(toml: string): string {
  const lines = toml.split("\n");
  const obj: any = {};
  let currentSection: any = obj;
  let currentPath = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    if (trimmed.startsWith("[")) {
      const section = trimmed.slice(1, -1).trim();
      currentPath = section.split(".");
      currentSection = obj;
      for (const part of currentPath.slice(0, -1)) {
        if (!currentSection[part]) currentSection[part] = {};
        currentSection = currentSection[part];
      }
      const lastPart = currentPath[currentPath.length - 1];
      if (!currentSection[lastPart]) currentSection[lastPart] = {};
      currentSection = currentSection[lastPart];
    } else if (trimmed.includes("=")) {
      const [key, ...valueParts] = trimmed.split("=");
      const valueStr = valueParts.join("=").trim();
      let value: any = valueStr;

      if (valueStr === "true") value = true;
      else if (valueStr === "false") value = false;
      else if (valueStr.startsWith('"') && valueStr.endsWith('"'))
        value = valueStr.slice(1, -1);
      else if (valueStr.startsWith("[") && valueStr.endsWith("]")) {
        value = JSON.parse(valueStr);
      } else if (!isNaN(Number(valueStr))) value = Number(valueStr);

      currentSection[key.trim()] = value;
    }
  }

  return JSON.stringify(obj, null, 2);
}

export default function JsonYamlConverter({ mode }: JsonYamlConverterProps) {
  const [input, setInput] = useState(
    mode === "json-to-yaml"
      ? '{\n  "name": "John",\n  "age": 30\n}'
      : mode === "yaml-to-json"
        ? "name: John\nage: 30"
        : mode === "yaml-to-toml"
          ? "name: John\nage: 30"
          : 'name = "John"\nage = 30',
  );
=======
  mode: "json-to-yaml" | "yaml-to-json";
}

export default function JsonYamlConverter({ mode }: JsonYamlConverterProps) {
  const [input, setInput] = useState("");
>>>>>>> d366566fdaff0e02dbc3205770509d5194ddbac9
  const [output, setOutput] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  const convert = () => {
    if (!input) return;
    try {
<<<<<<< HEAD
      let result = "";
      if (mode === "json-to-yaml") {
        const obj = JSON.parse(input);
        result = jsonToYaml(obj);
      } else if (mode === "yaml-to-json") {
        result = JSON.stringify(yamlToJson(input), null, 2);
      } else if (mode === "yaml-to-toml") {
        result = yamlToToml(input);
      } else if (mode === "toml-to-json") {
        result = tomlToJson(input);
      }
      setOutput(result);
    } catch {
      setOutput("Error: Invalid input format");
=======
      if (mode === "json-to-yaml") {
        const obj = JSON.parse(input);
        // Basic YAML stringifier for demonstration
        const yaml = Object.entries(obj).map(([k, v]) => `${k}: ${v}`).join("\n");
        setOutput(yaml);
      } else {
        const lines = input.split("\n");
        const obj: any = {};
        lines.forEach(line => {
          const [k, v] = line.split(":").map(s => s.trim());
          if (k && v) obj[k] = isNaN(Number(v)) ? v : Number(v);
        });
        setOutput(JSON.stringify(obj, null, 2));
      }
    } catch {
      setOutput("Error: Invalid Input Format");
>>>>>>> d366566fdaff0e02dbc3205770509d5194ddbac9
    }
  };

  const copyResult = () => {
    navigator.clipboard.writeText(output);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

<<<<<<< HEAD
  const getModeTitle = () => {
    if (mode === "json-to-yaml") return "JSON to YAML";
    if (mode === "yaml-to-json") return "YAML to JSON";
    if (mode === "yaml-to-toml") return "YAML to TOML";
    return "TOML to JSON";
  };

=======
>>>>>>> d366566fdaff0e02dbc3205770509d5194ddbac9
  return (
    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-8">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600">
          <FileJson className="w-6 h-6" />
        </div>
        <div>
<<<<<<< HEAD
          <h3 className="text-xl font-bold text-slate-900">{getModeTitle()}</h3>
          <p className="text-sm text-slate-500">Convert between data formats</p>
=======
          <h3 className="text-xl font-bold text-slate-900 capitalize">{mode.replace(/-/g, " ")}</h3>
          <p className="text-sm text-slate-500">Convert data between JSON and YAML formats</p>
>>>>>>> d366566fdaff0e02dbc3205770509d5194ddbac9
        </div>
      </div>

      <div className="space-y-6">
<<<<<<< HEAD
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full h-40 p-6 bg-slate-50 border border-slate-100 rounded-2xl font-mono text-sm"
          placeholder="Enter your data here..."
        />

        <button
          onClick={convert}
          className="w-full py-4 bg-primary-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2"
        >
          <Zap className="w-5 h-5" /> Convert
=======
        <textarea 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full h-40 p-6 bg-slate-50 border border-slate-100 rounded-2xl font-mono text-sm"
          placeholder={mode === "json-to-yaml" ? '{"key": "value"}' : "key: value"}
        />

        <button onClick={convert} className="w-full py-4 bg-primary-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2">
           <Zap className="w-5 h-5" /> Convert
>>>>>>> d366566fdaff0e02dbc3205770509d5194ddbac9
        </button>

        {output && (
          <div className="space-y-2">
<<<<<<< HEAD
            <div className="flex items-center justify-between px-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                Result
              </span>
              <button
                onClick={copyResult}
                className="text-primary-600 text-xs font-bold flex items-center gap-1"
              >
                {isCopied ? (
                  <Check className="w-3 h-3" />
                ) : (
                  <Copy className="w-3 h-3" />
                )}
                Copy Result
              </button>
            </div>
            <pre className="w-full p-8 bg-slate-900 rounded-3xl border border-slate-800 font-mono text-sm text-blue-100 overflow-auto">
              <code>{output}</code>
            </pre>
=======
             <div className="flex items-center justify-between px-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Result</span>
                <button onClick={copyResult} className="text-primary-600 text-xs font-bold flex items-center gap-1">
                   {isCopied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                   Copy Result
                </button>
             </div>
             <pre className="w-full p-8 bg-slate-900 rounded-3xl border border-slate-800 font-mono text-sm text-blue-100 overflow-auto">
                <code>{output}</code>
             </pre>
>>>>>>> d366566fdaff0e02dbc3205770509d5194ddbac9
          </div>
        )}
      </div>
    </div>
  );
}
