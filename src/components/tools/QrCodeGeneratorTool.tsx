"use client";

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
  };

  const downloadQrCode = () => {
    const svg = qrRef.current;
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

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

    img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
  };

  return (
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
              </button>
            ))}
          </div>

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
        </div>
      </div>
    </div>
  );
}
