"use client";

import { useState } from "react";
import { Palette, Copy, Check } from "lucide-react";

function hexToHsl(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

function hslToHex(h: number, s: number, l: number): string {
  s /= 100; l /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const col = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * col).toString(16).padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

function generatePalette(hex: string, type: string): { color: string; label: string }[] {
  const [h, s, l] = hexToHsl(hex);
  switch (type) {
    case "complementary":
      return [
        { color: hex, label: "Base" },
        { color: hslToHex((h + 180) % 360, s, l), label: "Complement" },
        { color: hslToHex(h, s, Math.min(l + 20, 95)), label: "Light" },
        { color: hslToHex(h, s, Math.max(l - 20, 5)), label: "Dark" },
        { color: hslToHex((h + 180) % 360, s, Math.min(l + 20, 95)), label: "Comp Light" },
      ];
    case "analogous":
      return [
        { color: hslToHex((h - 30 + 360) % 360, s, l), label: "-30°" },
        { color: hslToHex((h - 15 + 360) % 360, s, l), label: "-15°" },
        { color: hex, label: "Base" },
        { color: hslToHex((h + 15) % 360, s, l), label: "+15°" },
        { color: hslToHex((h + 30) % 360, s, l), label: "+30°" },
      ];
    case "triadic":
      return [
        { color: hex, label: "Base" },
        { color: hslToHex((h + 120) % 360, s, l), label: "+120°" },
        { color: hslToHex((h + 240) % 360, s, l), label: "+240°" },
        { color: hslToHex(h, s, Math.min(l + 25, 95)), label: "Light" },
        { color: hslToHex(h, s, Math.max(l - 25, 5)), label: "Dark" },
      ];
    case "monochromatic":
    default:
      return [
        { color: hslToHex(h, s, Math.min(l + 40, 95)), label: "Lightest" },
        { color: hslToHex(h, s, Math.min(l + 20, 90)), label: "Lighter" },
        { color: hex, label: "Base" },
        { color: hslToHex(h, s, Math.max(l - 20, 10)), label: "Darker" },
        { color: hslToHex(h, s, Math.max(l - 40, 5)), label: "Darkest" },
      ];
  }
}

function getTextColor(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return (r * 0.299 + g * 0.587 + b * 0.114) > 128 ? "#000000" : "#ffffff";
}

export default function ColorPaletteGeneratorTool() {
  const [baseColor, setBaseColor] = useState("#3B82F6");
  const [type, setType] = useState("monochromatic");
  const [palette, setPalette] = useState<{ color: string; label: string }[]>([]);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const [allCopied, setAllCopied] = useState(false);

  const generate = () => {
    setPalette(generatePalette(baseColor, type));
  };

  const copyColor = (hex: string, idx: number) => {
    navigator.clipboard.writeText(hex);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  const copyAll = () => {
    const css = palette.map(p => `/* ${p.label} */\n  --color-${p.label.toLowerCase().replace(/\s+/g, "-")}: ${p.color};`).join("\n");
    navigator.clipboard.writeText(`:root {\n${css}\n}`);
    setAllCopied(true);
    setTimeout(() => setAllCopied(false), 2000);
  };

  return (
    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600">
          <Palette className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900">Color Palette Generator</h3>
          <p className="text-sm text-slate-500">Generate harmonious color schemes for UI design</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 block">Base Color</label>
          <div className="flex gap-3">
            <input type="color" value={baseColor} onChange={e => setBaseColor(e.target.value)}
              className="w-14 h-12 rounded-xl border border-slate-200 cursor-pointer p-1"
            />
            <input type="text" value={baseColor} onChange={e => { if (/^#[0-9A-Fa-f]{6}$/.test(e.target.value)) setBaseColor(e.target.value); }}
              className="flex-1 px-4 py-3 border border-slate-200 rounded-xl font-mono font-bold uppercase focus:outline-none focus:ring-2 focus:ring-primary-300"
            />
          </div>
        </div>
        <div className="flex-1">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 block">Palette Type</label>
          <select value={type} onChange={e => setType(e.target.value)}
            className="w-full px-4 py-3 border border-slate-200 rounded-xl font-bold bg-white focus:outline-none focus:ring-2 focus:ring-primary-300">
            <option value="monochromatic">Monochromatic</option>
            <option value="complementary">Complementary</option>
            <option value="analogous">Analogous</option>
            <option value="triadic">Triadic</option>
          </select>
        </div>
      </div>

      <button onClick={generate}
        className="w-full py-4 bg-primary-600 text-white rounded-2xl font-bold hover:bg-primary-700 transition-colors">
        Generate Palette
      </button>

      {palette.length > 0 && (
        <div className="space-y-4">
          <div className="grid grid-cols-5 gap-2">
            {palette.map((swatch, idx) => (
              <div key={idx} className="space-y-1">
                <button
                  onClick={() => copyColor(swatch.color, idx)}
                  style={{ backgroundColor: swatch.color, color: getTextColor(swatch.color) }}
                  className="w-full aspect-square rounded-2xl flex items-center justify-center transition-transform hover:scale-105 relative group shadow-sm"
                  title={`Copy ${swatch.color}`}
                >
                  {copiedIdx === idx
                    ? <Check className="w-5 h-5" />
                    : <Copy className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />}
                </button>
                <p className="text-center text-[10px] font-bold text-slate-500 uppercase truncate">{swatch.label}</p>
                <p className="text-center text-[10px] font-mono text-slate-400">{swatch.color}</p>
              </div>
            ))}
          </div>
          <button onClick={copyAll}
            className="w-full py-3 bg-slate-100 text-slate-700 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-200 transition-colors text-sm">
            {allCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {allCopied ? "Copied as CSS Variables!" : "Copy All as CSS Variables"}
          </button>
        </div>
      )}
    </div>
  );
}
