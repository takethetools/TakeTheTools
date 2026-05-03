"use client";

<<<<<<< HEAD
import { useState, useRef, useMemo } from "react";
import { QRCodeSVG } from "qrcode.react";
import { 
  QrCode, Download, Type, Wifi, Contact2, Mail, MessageSquare, 
  MapPin, Trash2, Sliders, Palette, Layout, Sparkles, Image as ImageIcon,
  Share2, ShieldCheck, ChevronRight, Info, Check
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

type QrType = "text" | "wifi" | "vcard" | "sms" | "email" | "location";

const inputClass = "w-full p-4 bg-slate-50 border-2 border-slate-200 rounded-2xl text-base font-semibold text-slate-800 outline-none focus:border-primary-400 focus:ring-4 focus:ring-primary-50 transition-all placeholder:text-slate-400";
const textareaClass = "w-full h-36 p-4 bg-slate-50 border-2 border-slate-200 rounded-2xl text-base font-semibold text-slate-800 outline-none focus:border-primary-400 focus:ring-4 focus:ring-primary-50 transition-all resize-none placeholder:text-slate-400";
const labelClass = "text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1 block mb-2";

export default function QrCodeGeneratorTool() {
  const [type, setType] = useState<QrType>("text");
  const [value, setValue] = useState("https://takethetools.com");
  const [wifi, setWifi] = useState({ ssid: "", password: "", encryption: "WPA" });
  const [vcard, setVcard] = useState({ name: "", email: "", phone: "", org: "" });
  const [sms, setSms] = useState({ phone: "", message: "" });
  const [email, setEmail] = useState({ address: "", subject: "", body: "" });
  const [location, setLocation] = useState({ lat: "", lng: "" });

  const [fgColor, setFgColor] = useState("#0f172a");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [level, setLevel] = useState<"L" | "M" | "Q" | "H">("H");
  const [includeMargin, setIncludeMargin] = useState(true);
  const [activeTab, setActiveTab] = useState<"content" | "style">("content");
  
  const [logo, setLogo] = useState<string | null>(null);
  const [logoSize, setLogoSize] = useState(60);

  const qrRef = useRef<SVGSVGElement>(null);

  const getQrValue = useMemo(() => {
    switch (type) {
      case "wifi": return `WIFI:S:${wifi.ssid};T:${wifi.encryption};P:${wifi.password};;`;
      case "vcard": return `BEGIN:VCARD\nVERSION:3.0\nN:${vcard.name}\nORG:${vcard.org}\nEMAIL:${vcard.email}\nTEL:${vcard.phone}\nEND:VCARD`;
      case "sms": return `SMSTO:${sms.phone}:${sms.message}`;
      case "email": return `MATMSG:TO:${email.address};SUB:${email.subject};BODY:${email.body};;`;
      case "location": return `geo:${location.lat},${location.lng}`;
      default: return value;
    }
  }, [type, value, wifi, vcard, sms, email, location]);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setLogo(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
=======
import { useState, useRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import { QrCode, Download } from "lucide-react";
import { cn } from "@/lib/utils";

interface QrCodeGeneratorToolProps {
  initialType?: "text" | "wifi" | "vcard";
}

export default function QrCodeGeneratorTool({ initialType = "text" }: QrCodeGeneratorToolProps) {
  const [type, setType] = useState(initialType);
  const [value, setValue] = useState(initialType === "text" ? "https://takethetools.com" : "");
  const [wifi, setWifi] = useState({ ssid: "", password: "", encryption: "WPA" });
  const [vcard, setVcard] = useState({ name: "", email: "", phone: "" });
  const [size] = useState(256);
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [level, setLevel] = useState<"L" | "M" | "Q" | "H">("L");
  const qrRef = useRef<SVGSVGElement>(null);

  const getQrValue = () => {
    if (type === "wifi") {
      return `WIFI:S:${wifi.ssid};T:${wifi.encryption};P:${wifi.password};;`;
    }
    if (type === "vcard") {
      return `BEGIN:VCARD\nVERSION:3.0\nN:${vcard.name}\nEMAIL:${vcard.email}\nTEL:${vcard.phone}\nEND:VCARD`;
    }
    return value;
>>>>>>> d366566fdaff0e02dbc3205770509d5194ddbac9
  };

  const downloadQrCode = () => {
    const svg = qrRef.current;
    if (!svg) return;
<<<<<<< HEAD
=======

>>>>>>> d366566fdaff0e02dbc3205770509d5194ddbac9
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
<<<<<<< HEAD
    img.onload = () => {
      canvas.width = 2048;
      canvas.height = 2048;
      ctx?.drawImage(img, 0, 0, 2048, 2048);
      const link = document.createElement("a");
      link.download = `qrcode_studio_${type}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    };
=======

    img.onload = () => {
      canvas.width = size;
      canvas.height = size;
      ctx?.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.download = "qrcode.png";
      downloadLink.href = `${pngFile}`;
      downloadLink.click();
    };

>>>>>>> d366566fdaff0e02dbc3205770509d5194ddbac9
    img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
  };

  return (
<<<<<<< HEAD
    <div className="max-w-7xl mx-auto space-y-8 p-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
            <Sparkles className="w-6 h-6 text-primary-600 shrink-0" />
            <span className="flex items-center gap-2">
              QR Code Studio
              <span className="text-primary-600 uppercase text-[9px] bg-primary-50 px-2 py-1 rounded-lg tracking-widest font-black border border-primary-100/50 leading-none">Pro</span>
            </span>
          </h2>
          <p className="text-sm text-slate-500 font-medium">Create branded, scan-optimized QR codes for any purpose.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Type Selector */}
        <div className="lg:col-span-2 flex lg:flex-col gap-3 overflow-x-auto pb-4 lg:pb-0 pr-2"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
           {[
             { id: "text", icon: Type, label: "Text/URL" },
             { id: "wifi", icon: Wifi, label: "WiFi" },
             { id: "vcard", icon: Contact2, label: "Contact" },
             { id: "sms", icon: MessageSquare, label: "SMS" },
             { id: "email", icon: Mail, label: "Email" },
             { id: "location", icon: MapPin, label: "Location" },
           ].map((t) => (
             <button
               key={t.id}
               onClick={() => setType(t.id as QrType)}
               className={cn(
                 "flex flex-col items-center justify-center min-w-[90px] lg:min-w-0 lg:w-full aspect-square rounded-2xl transition-all duration-300 relative group",
                 type === t.id 
                  ? "bg-slate-900 text-white shadow-xl shadow-slate-200 scale-[1.02]" 
                  : "bg-white text-slate-400 hover:text-slate-600 border-2 border-slate-100 hover:bg-slate-50 hover:border-slate-200"
               )}
             >
               <t.icon className="w-5 h-5 mb-1.5" />
               <span className="text-[9px] font-black uppercase tracking-tighter">{t.label}</span>
             </button>
           ))}
        </div>

        {/* Configuration Area */}
        <div className="lg:col-span-6 bg-white rounded-[2.5rem] border-2 border-slate-100 shadow-xl overflow-hidden flex flex-col min-h-[500px]">
          <div className="flex bg-slate-50 border-b border-slate-100 p-2">
            {[
              { id: "content", label: "1. Content", icon: Layout },
              { id: "style", label: "2. Design", icon: Palette },
            ].map((tab) => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)} 
                className={cn(
                  "flex-1 py-4 flex items-center justify-center gap-2 font-black text-[11px] uppercase tracking-widest transition-all rounded-2xl",
                  activeTab === tab.id 
                    ? "text-primary-600 bg-white shadow-sm" 
                    : "text-slate-400 hover:text-slate-600 hover:bg-white/50"
                )}
              >
                <tab.icon className="w-4 h-4" /> {tab.label}
=======
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Settings */}
        <div className="space-y-6">
          <div className="flex bg-slate-100 p-1 rounded-xl mb-4">
            {(["text", "wifi", "vcard"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setType(t)}
                className={cn(
                  "flex-grow py-2 rounded-lg text-sm font-bold transition-all capitalize",
                  type === t ? "bg-white text-primary-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
                )}
              >
                {t}
>>>>>>> d366566fdaff0e02dbc3205770509d5194ddbac9
              </button>
            ))}
          </div>

<<<<<<< HEAD
          <div className="p-8 md:p-10 flex-grow">
            <AnimatePresence mode="wait">
              {activeTab === "content" ? (
                <motion.div 
                  key="content"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  {/* TEXT / URL */}
                  {type === "text" && (
                    <div>
                       <label className={labelClass}>URL or Text</label>
                       <textarea 
                         value={value} 
                         onChange={e => setValue(e.target.value)} 
                         placeholder="https://example.com" 
                         className={textareaClass}
                       />
                    </div>
                  )}

                  {/* WIFI */}
                  {type === "wifi" && (
                    <div className="space-y-6">
                       <div>
                          <label className={labelClass}>Network Name (SSID)</label>
                          <input value={wifi.ssid} onChange={e => setWifi({...wifi, ssid: e.target.value})} className={inputClass} placeholder="My_WiFi_Network" />
                       </div>
                       <div>
                          <label className={labelClass}>Password</label>
                          <input type="password" value={wifi.password} onChange={e => setWifi({...wifi, password: e.target.value})} className={inputClass} placeholder="Enter password" />
                       </div>
                       <div>
                          <label className={labelClass}>Encryption</label>
                          <select value={wifi.encryption} onChange={e => setWifi({...wifi, encryption: e.target.value})} className={inputClass}>
                            <option value="WPA">WPA/WPA2</option>
                            <option value="WEP">WEP</option>
                            <option value="nopass">None</option>
                          </select>
                       </div>
                    </div>
                  )}

                  {/* VCARD / CONTACT */}
                  {type === "vcard" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div>
                          <label className={labelClass}>Full Name</label>
                          <input value={vcard.name} onChange={e => setVcard({...vcard, name: e.target.value})} className={inputClass} placeholder="John Doe" />
                       </div>
                       <div>
                          <label className={labelClass}>Email</label>
                          <input value={vcard.email} onChange={e => setVcard({...vcard, email: e.target.value})} className={inputClass} placeholder="john@example.com" />
                       </div>
                       <div>
                          <label className={labelClass}>Phone</label>
                          <input value={vcard.phone} onChange={e => setVcard({...vcard, phone: e.target.value})} className={inputClass} placeholder="+1 234 567 890" />
                       </div>
                       <div>
                          <label className={labelClass}>Organization</label>
                          <input value={vcard.org} onChange={e => setVcard({...vcard, org: e.target.value})} className={inputClass} placeholder="Company Inc." />
                       </div>
                    </div>
                  )}

                  {/* SMS */}
                  {type === "sms" && (
                    <div className="space-y-6">
                       <div>
                          <label className={labelClass}>Phone Number</label>
                          <input value={sms.phone} onChange={e => setSms({...sms, phone: e.target.value})} className={inputClass} placeholder="+1 234 567 890" />
                       </div>
                       <div>
                          <label className={labelClass}>Message</label>
                          <textarea value={sms.message} onChange={e => setSms({...sms, message: e.target.value})} className={textareaClass} placeholder="Hello there..." />
                       </div>
                    </div>
                  )}

                  {/* EMAIL */}
                  {type === "email" && (
                    <div className="space-y-6">
                       <div>
                          <label className={labelClass}>Email Address</label>
                          <input value={email.address} onChange={e => setEmail({...email, address: e.target.value})} className={inputClass} placeholder="contact@example.com" />
                       </div>
                       <div>
                          <label className={labelClass}>Subject</label>
                          <input value={email.subject} onChange={e => setEmail({...email, subject: e.target.value})} className={inputClass} placeholder="Hello!" />
                       </div>
                       <div>
                          <label className={labelClass}>Body</label>
                          <textarea value={email.body} onChange={e => setEmail({...email, body: e.target.value})} className={textareaClass} placeholder="Write your message here..." />
                       </div>
                    </div>
                  )}

                  {/* LOCATION */}
                  {type === "location" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div>
                          <label className={labelClass}>Latitude</label>
                          <input value={location.lat} onChange={e => setLocation({...location, lat: e.target.value})} className={inputClass} placeholder="40.7128" />
                       </div>
                       <div>
                          <label className={labelClass}>Longitude</label>
                          <input value={location.lng} onChange={e => setLocation({...location, lng: e.target.value})} className={inputClass} placeholder="-74.0060" />
                       </div>
                    </div>
                  )}
                </motion.div>
              ) : (
                <motion.div 
                  key="style"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-8"
                >
                  <div className="grid grid-cols-2 gap-6">
                     <div className="space-y-3">
                        <label className={labelClass}>Foreground</label>
                        <div className="flex gap-4 items-center bg-slate-50 p-4 rounded-2xl border-2 border-slate-200">
                           <input type="color" value={fgColor} onChange={e => setFgColor(e.target.value)} className="w-10 h-10 rounded-lg cursor-pointer border-none bg-transparent" />
                           <p className="text-xs font-mono font-bold text-slate-600 uppercase">{fgColor}</p>
                        </div>
                     </div>
                     <div className="space-y-3">
                        <label className={labelClass}>Background</label>
                        <div className="flex gap-4 items-center bg-slate-50 p-4 rounded-2xl border-2 border-slate-200">
                           <input type="color" value={bgColor} onChange={e => setBgColor(e.target.value)} className="w-10 h-10 rounded-lg cursor-pointer border-none bg-transparent" />
                           <p className="text-xs font-mono font-bold text-slate-600 uppercase">{bgColor}</p>
                        </div>
                     </div>
                  </div>

                  <div className="space-y-6 pt-6 border-t border-slate-100">
                     <div className="flex items-center justify-between bg-slate-50 p-6 rounded-2xl border-2 border-slate-200">
                        <div>
                           <p className="text-xs font-black text-slate-900 uppercase tracking-tight">Add Logo / Icon</p>
                           <p className="text-[10px] font-medium text-slate-400">PNG, SVG or JPG</p>
                        </div>
                        <label className="relative cursor-pointer">
                           <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
                           <div className="px-5 py-3 bg-white border-2 border-slate-200 rounded-xl font-bold text-xs hover:bg-slate-50 hover:border-primary-300 transition-all flex items-center gap-2 shadow-sm">
                              <ImageIcon className="w-4 h-4 text-primary-600" /> {logo ? "Update" : "Upload"}
                           </div>
                        </label>
                     </div>

                     {logo && (
                       <div className="space-y-4 px-2">
                          <div className="flex justify-between items-center">
                             <label className={labelClass}>Logo Size</label>
                             <span className="text-xs font-black text-primary-600 bg-primary-50 px-2 py-0.5 rounded-lg">{logoSize}px</span>
                          </div>
                          <input 
                            type="range" min="20" max="120" value={logoSize} 
                            onChange={e => setLogoSize(parseInt(e.target.value))} 
                            className="w-full h-2 bg-slate-200 rounded-full appearance-none accent-primary-600 cursor-pointer"
                          />
                       </div>
                     )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Preview Panel */}
        <div className="lg:col-span-4 flex flex-col items-center">
          <div className="sticky top-8 space-y-6 w-full">
            <div className="bg-slate-900 p-8 md:p-10 rounded-[3rem] shadow-2xl flex flex-col items-center relative overflow-hidden group">
               <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary-600/10 to-indigo-600/10" />
               
               {/* QR Container */}
               <div className="relative z-10 bg-white p-6 md:p-8 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform transition-transform group-hover:scale-[1.02]">
                  <QRCodeSVG
                    ref={qrRef}
                    value={getQrValue || " "}
                    size={240}
                    fgColor={fgColor}
                    bgColor={bgColor}
                    level={level}
                    includeMargin={includeMargin}
                    imageSettings={logo ? {
                      src: logo,
                      x: undefined,
                      y: undefined,
                      height: logoSize,
                      width: logoSize,
                      excavate: true,
                    } : undefined}
                    style={{ width: "100%", height: "auto", display: "block" }}
                  />
               </div>

               <div className="mt-8 w-full space-y-4 relative z-10">
                  <button 
                    onClick={downloadQrCode} 
                    className="w-full py-4 bg-white text-slate-900 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:bg-slate-50 hover:scale-[1.01] transition-all flex items-center justify-center gap-3"
                  >
                     <Download className="w-5 h-5 text-primary-600" /> Export HQ PNG
                  </button>
                  <div className="flex gap-4">
                     <div className="flex-1 p-3 bg-white/10 rounded-xl border border-white/10 text-center">
                        <p className="text-[8px] font-black text-slate-400 uppercase mb-1">Error Level</p>
                        <select value={level} onChange={(e) => setLevel(e.target.value as any)} className="bg-transparent text-white text-[10px] font-bold outline-none cursor-pointer">
                           <option value="L" className="text-slate-900">Low (7%)</option>
                           <option value="M" className="text-slate-900">Med (15%)</option>
                           <option value="Q" className="text-slate-900">Quar (25%)</option>
                           <option value="H" className="text-slate-900">High (30%)</option>
                        </select>
                     </div>
                     <button onClick={() => setIncludeMargin(!includeMargin)} className={cn("flex-1 p-3 rounded-xl border text-center transition-all", includeMargin ? "bg-primary-600 border-primary-500 text-white" : "bg-white/5 border-white/10 text-slate-400")}>
                        <p className="text-[8px] font-black uppercase mb-1">Quiet Zone</p>
                        <p className="text-[10px] font-bold">{includeMargin ? "Enabled" : "Disabled"}</p>
                     </button>
                  </div>
               </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border-2 border-slate-100 flex items-center gap-4">
               <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 shrink-0">
                  <ShieldCheck className="w-5 h-5" />
               </div>
               <div>
                  <p className="text-xs font-black text-slate-900">Scan Optimized</p>
                  <p className="text-[10px] text-slate-500 font-medium">Verified for all mobile devices.</p>
               </div>
            </div>
          </div>
=======
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-slate-900 flex items-center gap-2">
                <QrCode className="w-5 h-5 text-primary-600" />
                {type.toUpperCase()} Details
              </h3>
              <div className="flex gap-4">
                <button
                  onClick={() => {
                    setValue("");
                    setWifi({ ssid: "", password: "", encryption: "WPA" });
                    setVcard({ name: "", email: "", phone: "" });
                  }}
                  className="text-xs font-bold text-slate-400 hover:text-red-500 transition-colors uppercase tracking-wider"
                >
                  Clear
                </button>
                <button
                  onClick={() => {
                    if (type === "text") setValue("https://takethetools.com");
                    if (type === "wifi") setWifi({ ssid: "My Awesome Network", password: "securepassword123", encryption: "WPA" });
                    if (type === "vcard") setVcard({ name: "John Doe", email: "john@example.com", phone: "+1 234 567 890" });
                  }}
                  className="text-xs font-bold text-primary-500 hover:text-primary-600 transition-colors uppercase tracking-wider"
                >
                  Example
                </button>
              </div>
            </div>

            {type === "text" && (
              <textarea
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Enter URL or text for QR code..."
                className="w-full h-32 p-6 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary-500 outline-none"
              />
            )}

            {type === "wifi" && (
              <div className="space-y-4 bg-white p-6 rounded-2xl border border-slate-200">
                <input
                  placeholder="Network SSID"
                  className="w-full p-3 bg-slate-50 rounded-xl"
                  value={wifi.ssid}
                  onChange={e => setWifi({ ...wifi, ssid: e.target.value })}
                />
                <input
                  placeholder="Password"
                  type="password"
                  className="w-full p-3 bg-slate-50 rounded-xl"
                  value={wifi.password}
                  onChange={e => setWifi({ ...wifi, password: e.target.value })}
                />
              </div>
            )}

            {type === "vcard" && (
              <div className="space-y-4 bg-white p-6 rounded-2xl border border-slate-200">
                <input
                  placeholder="Full Name"
                  className="w-full p-3 bg-slate-50 rounded-xl"
                  value={vcard.name}
                  onChange={e => setVcard({ ...vcard, name: e.target.value })}
                />
                <input
                  placeholder="Email"
                  className="w-full p-3 bg-slate-50 rounded-xl"
                  value={vcard.email}
                  onChange={e => setVcard({ ...vcard, email: e.target.value })}
                />
                <input
                  placeholder="Phone"
                  className="w-full p-3 bg-slate-50 rounded-xl"
                  value={vcard.phone}
                  onChange={e => setVcard({ ...vcard, phone: e.target.value })}
                />
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Foreground</label>
              <div className="flex items-center gap-2 bg-white border border-slate-200 p-2 rounded-xl">
                <input type="color" value={fgColor} onChange={(e) => setFgColor(e.target.value)} className="w-8 h-8 rounded cursor-pointer" />
                <span className="text-sm font-mono">{fgColor}</span>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Background</label>
              <div className="flex items-center gap-2 bg-white border border-slate-200 p-2 rounded-xl">
                <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="w-8 h-8 rounded cursor-pointer" />
                <span className="text-sm font-mono">{bgColor}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className="flex flex-col items-center justify-center p-12 bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl">
          <div className="bg-white p-6 rounded-2xl shadow-2xl mb-8">
            <QRCodeSVG
              ref={qrRef}
              value={getQrValue() || " "}
              size={size}
              fgColor={fgColor}
              bgColor={bgColor}
              level={level}
              includeMargin={true}
            />
          </div>
          <button
            onClick={downloadQrCode}
            className="px-10 py-4 bg-primary-600 text-white rounded-xl font-bold shadow-lg hover:bg-primary-700 transition-all flex items-center gap-2"
          >
            <Download className="w-5 h-5" /> Download QR Code
          </button>
>>>>>>> d366566fdaff0e02dbc3205770509d5194ddbac9
        </div>
      </div>
    </div>
  );
}
