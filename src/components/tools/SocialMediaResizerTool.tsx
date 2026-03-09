"use client";

import { useState } from "react";
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
    </div>
  );
}
