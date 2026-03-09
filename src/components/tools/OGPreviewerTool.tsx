"use client";

import { useState, useRef } from "react";
import { Eye, Copy, Check, Zap, Share2, Globe, Layout, Image as ImageIcon, Upload, X } from "lucide-react";

export default function OGPreviewerTool() {
  const [title, setTitle] = useState("Your Page Title");
  const [description, setDescription] = useState("Your page description goes here for social sharing preview.");
  const [image, setImage] = useState("https://placehold.co/1200x630/6366f1/ffffff?text=OG+Image+Preview");
  const [url, setUrl] = useState("example.com");
  const [platform, setPlatform] = useState<"facebook" | "twitter">("facebook");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-12">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600">
          <Eye className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900">OG Previewer</h3>
          <p className="text-sm text-slate-500">Preview how your site looks on social media (Facebook, Twitter, etc.)</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-6">
           <div className="space-y-2">
             <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Page Title</label>
             <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. My Awesome Website" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-primary-100 outline-none" />
           </div>
           <div className="space-y-2">
             <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Description</label>
             <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="e.g. A brief summary of your content..." className="w-full h-24 p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-primary-100 outline-none" />
           </div>
           <div className="space-y-2">
             <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Image URL or Upload</label>
             <div className="flex gap-2">
                <input type="text" value={image.startsWith('data:') ? 'Local Image Uploaded' : image} onChange={(e) => setImage(e.target.value)} className="flex-grow p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-primary-100 outline-none" />
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="p-4 bg-white border border-slate-100 rounded-2xl hover:bg-slate-50 text-slate-500 transition-all"
                  title="Upload Image"
                >
                   <Upload className="w-5 h-5" />
                </button>
                <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />
             </div>
           </div>
           <div className="space-y-2">
             <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Domain Name</label>
             <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="e.g. my-awesome-site.com" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-primary-100 outline-none" />
           </div>
        </div>

        <div className="space-y-6">
           <div className="flex bg-slate-100 p-1 rounded-2xl border border-slate-100 w-fit">
              <button 
                onClick={() => setPlatform("facebook")}
                className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${platform === "facebook" ? "bg-white text-primary-600 shadow-sm" : "text-slate-500"}`}
              >
                Facebook / LinkedIn
              </button>
              <button 
                onClick={() => setPlatform("twitter")}
                className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${platform === "twitter" ? "bg-white text-primary-600 shadow-sm" : "text-slate-500"}`}
              >
                Twitter Card
              </button>
           </div>

           <div className="pt-4">
              {platform === "facebook" ? (
                <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm max-w-[500px]">
                   <div className="h-64 bg-slate-100 overflow-hidden relative group">
                      {image ? (
                        <img src={image} alt="OG Preview" className="w-full h-full object-cover" />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                           <ImageIcon className="w-12 h-12 opacity-20" />
                        </div>
                      )}
                   </div>
                   <div className="p-4 bg-slate-50 border-t border-slate-100">
                      <p className="text-[10px] text-slate-500 uppercase font-bold mb-1 tracking-wider">{url || "EXAMPLE.COM"}</p>
                      <h4 className="text-lg font-bold text-slate-900 leading-tight mb-2 line-clamp-1">{title || "Your Page Title"}</h4>
                      <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed">{description || "Your page description goes here..."}</p>
                   </div>
                </div>
              ) : (
                <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden max-w-[500px] border-slate-200 border">
                   <div className="aspect-[1.91/1] bg-slate-100 overflow-hidden">
                      {image ? (
                        <img src={image} alt="OG Preview" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-400">
                           <ImageIcon className="w-12 h-12 opacity-20" />
                        </div>
                      )}
                   </div>
                   <div className="p-4 border-t border-slate-100">
                      <p className="text-xs text-slate-400 mb-1">{url || "example.com"}</p>
                      <h4 className="text-sm font-bold text-slate-900 leading-tight mb-1">{title || "Your Page Title"}</h4>
                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-1">{description || "Your page description..."}</p>
                   </div>
                </div>
              )}
           </div>

           <div className="p-4 bg-blue-50 border border-blue-100 rounded-2xl flex gap-3 text-blue-700">
              <Share2 className="w-5 h-5 shrink-0" />
              <p className="text-xs font-medium leading-relaxed">
                 This is an approximation. Each platform handles metadata slightly differently. 
                 Ensure you have <code>og:title</code>, <code>og:description</code>, and <code>og:image</code> meta tags on your site.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
}
