"use client";

import { useState } from "react";
<<<<<<< HEAD
import FileUpload from "./FileUpload";
import { Download, RefreshCw, Instagram, Twitter, Linkedin, Smartphone, Monitor, Check, Loader2, Layout } from "lucide-react";
import confetti from "canvas-confetti";
import JSZip from "jszip";

const PLATFORMS = [
  { name: "Instagram Post", w: 1080, h: 1080, icon: Instagram },
  { name: "Instagram Story", w: 1080, h: 1920, icon: Smartphone },
  { name: "Twitter Post", w: 1200, h: 675, icon: Twitter },
  { name: "Twitter Header", w: 1500, h: 500, icon: Twitter },
  { name: "LinkedIn Post", w: 1200, h: 627, icon: Linkedin },
  { name: "LinkedIn Cover", w: 1584, h: 396, icon: Linkedin },
  { name: "Facebook Post", w: 1200, h: 630, icon: Monitor },
  { name: "YouTube Thumbnail", w: 1280, h: 720, icon: Monitor },
];

interface ResizedResult { platform: string; url: string; w: number; h: number; }

export default function SocialMediaResizerTool() {
  const [files, setFiles] = useState<File[]>([]);
  const [selected, setSelected] = useState<string[]>(["Instagram Post", "Twitter Post"]);
  const [results, setResults] = useState<ResizedResult[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const onFilesSelected = (f: File[]) => { setFiles(f); setResults([]); };

  const toggle = (name: string) =>
    setSelected(p => p.includes(name) ? p.filter(x => x !== name) : [...p, name]);

  const resizeCanvas = (img: HTMLImageElement, tw: number, th: number): string => {
    const canvas = document.createElement("canvas");
    canvas.width = tw; canvas.height = th;
    const ctx = canvas.getContext("2d");
    if (!ctx) return "";
    const ia = img.width / img.height, ta = tw / th;
    let sx = 0, sy = 0, sw = img.width, sh = img.height;
    if (ia > ta) { sw = img.height * ta; sx = (img.width - sw) / 2; }
    else { sh = img.width / ta; sy = (img.height - sh) / 2; }
    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, tw, th);
    return canvas.toDataURL("image/jpeg", 0.92);
  };

  const handleResize = async () => {
    if (!files.length || !selected.length) return;
    setIsProcessing(true);
    const out: ResizedResult[] = [];
    for (const file of files) {
      const objectUrl = URL.createObjectURL(file);
      const img = await new Promise<HTMLImageElement>((res, rej) => {
        const i = new Image(); i.onload = () => res(i); i.onerror = rej; i.src = objectUrl;
      });
      URL.revokeObjectURL(objectUrl);
      for (const pname of selected) {
        const p = PLATFORMS.find(x => x.name === pname);
        if (!p) continue;
        const url = resizeCanvas(img, p.w, p.h);
        if (url) out.push({ platform: pname, url, w: p.w, h: p.h });
      }
    }
    setResults(out);
    setIsProcessing(false);
    if (out.length) confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
  };

  const downloadOne = (r: ResizedResult) => {
    const base = files[0]?.name.replace(/\.[^/.]+$/, "") || "image";
    const a = document.createElement("a");
    a.href = r.url;
    a.download = `${base}-${r.platform.replace(/\s+/g, "-").toLowerCase()}-${r.w}x${r.h}.jpg`;
    a.click();
  };

  const downloadAll = async () => {
    const zip = new JSZip();
    const base = files[0]?.name.replace(/\.[^/.]+$/, "") || "image";
    results.forEach(r => {
      const b64 = r.url.split(",")[1];
      zip.file(`${base}-${r.platform.replace(/\s+/g, "-").toLowerCase()}-${r.w}x${r.h}.jpg`, b64, { base64: true });
    });
    const blob = await zip.generateAsync({ type: "blob" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${base}-social-pack.zip`;
    a.click();
  };

  if (results.length > 0) return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h3 className="text-lg font-bold text-slate-900">{results.length} images ready</h3>
        <div className="flex gap-2">
          <button onClick={() => { setResults([]); setFiles([]); }}
            className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200 transition-all flex items-center gap-2 text-sm">
            <RefreshCw className="w-4 h-4" /> New
          </button>
          <button onClick={downloadAll}
            className="px-4 py-2 bg-primary-600 text-white rounded-xl font-bold hover:bg-primary-700 transition-all flex items-center gap-2 text-sm">
            <Download className="w-4 h-4" /> Download All (ZIP)
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {results.map((r, i) => (
          <div key={i} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="aspect-video bg-slate-100 overflow-hidden">
              <img src={r.url} alt={r.platform} className="w-full h-full object-cover" />
            </div>
            <div className="p-4 flex items-center justify-between">
              <div>
                <p className="font-bold text-slate-900 text-sm">{r.platform}</p>
                <p className="text-xs text-slate-400 font-mono mt-0.5">{r.w} × {r.h} px</p>
              </div>
              <button onClick={() => downloadOne(r)}
                className="flex items-center gap-1.5 px-3 py-2 bg-primary-600 text-white rounded-lg text-sm font-bold hover:bg-primary-700 transition-all">
                <Download className="w-4 h-4" /> Save
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <FileUpload onFilesSelected={onFilesSelected} accept={{ "image/*": [] }} multiple={false} />
      {files.length > 0 && (
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div>
            <p className="text-sm font-bold text-slate-700 mb-4">Select platforms to resize for</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {PLATFORMS.map(p => {
                const Icon = p.icon;
                const isSelected = selected.includes(p.name);
                return (
                  <button key={p.name} onClick={() => toggle(p.name)}
                    className={`p-3 rounded-2xl border text-left transition-all ${isSelected ? "bg-primary-50 border-primary-300 ring-2 ring-primary-500/20" : "bg-white border-slate-100 hover:border-slate-200"}`}>
                    <div className="flex items-center gap-2 mb-1">
                      <Icon className={`w-4 h-4 ${isSelected ? "text-primary-600" : "text-slate-400"}`} />
                      {isSelected && <Check className="w-3 h-3 text-primary-600 ml-auto" />}
                    </div>
                    <p className={`text-xs font-bold ${isSelected ? "text-primary-700" : "text-slate-600"}`}>{p.name}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{p.w}×{p.h}</p>
                  </button>
                );
              })}
            </div>
          </div>
          <button onClick={handleResize} disabled={isProcessing || !selected.length}
            className="w-full py-4 bg-primary-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary-500/20 hover:bg-primary-700 transition-all disabled:opacity-50">
            {isProcessing ? <Loader2 className="w-5 h-5 animate-spin" /> : <Layout className="w-5 h-5" />}
            {isProcessing ? "Resizing..." : `Resize for ${selected.length} platform${selected.length !== 1 ? "s" : ""}`}
          </button>
        </div>
      )}
=======
import { Layout, Zap, Copy, Check, Smartphone, Twitter, Instagram, Linkedin } from "lucide-react";

export default function SocialMediaResizerTool() {
  const [file, setFile] = useState<File | null>(null);
  const [platform, setPlatform] = useState("Instagram");
  const [done, setDone] = useState(false);

  const platforms = [
    { name: "Instagram Square", w: 1080, h: 1080, icon: Instagram },
    { name: "Twitter Header", w: 1500, h: 500, icon: Twitter },
    { name: "LinkedIn Cover", w: 1584, h: 396, icon: Linkedin },
    { name: "Story / Portrait", w: 1080, h: 1920, icon: Smartphone },
  ];

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setFile(e.target.files[0]);
  };

  return (
    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-8">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600">
          <Layout className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900">Social Media Resizer</h3>
          <p className="text-sm text-slate-500">Auto-resize images for perfect social media posting</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
         <div className="space-y-6">
            <div className="h-48 bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center relative">
               <input type="file" onChange={handleFile} className="absolute inset-0 opacity-0 cursor-pointer" />
               <p className="text-sm font-bold text-slate-400">{file ? file.name : "Choose an image"}</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
               {platforms.map((p, i) => (
                 <button 
                   key={i}
                   onClick={() => setPlatform(p.name)}
                   className={`p-4 rounded-2xl border text-left flex items-center gap-3 transition-all ${platform === p.name ? "bg-primary-50 border-primary-200 ring-2 ring-primary-500/10" : "bg-white border-slate-100"}`}
                 >
                    <p.icon className={`w-5 h-5 ${platform === p.name ? "text-primary-600" : "text-slate-400"}`} />
                    <span className={`text-xs font-bold ${platform === p.name ? "text-primary-700" : "text-slate-600"}`}>{p.name}</span>
                 </button>
               ))}
            </div>
         </div>

         <div className="flex flex-col justify-center">
            {file ? (
              <div className="space-y-6">
                 <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100 text-center">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Selected Format</p>
                    <p className="text-2xl font-black text-slate-900">{platform}</p>
                    <p className="text-sm text-slate-400 mt-1">Dimensions: {platforms.find(p=>p.name === platform)?.w} x {platforms.find(p=>p.name === platform)?.h} px</p>
                 </div>
                 <button className="w-full py-5 bg-primary-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2">
                    <Zap className="w-5 h-5" /> Resize & Download
                 </button>
              </div>
            ) : (
              <div className="text-center text-slate-400 py-12">
                 <p className="italic">Upload an image to see resize options</p>
              </div>
            )}
         </div>
      </div>
>>>>>>> d366566fdaff0e02dbc3205770509d5194ddbac9
    </div>
  );
}
