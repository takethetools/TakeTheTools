"use client";

import { useState, useEffect } from "react";
import {
    LayoutTemplate,
    Save,
    Loader2,
    CheckCircle2,
    AlertCircle,
    ToggleLeft,
    ToggleRight,
    Settings2
} from "lucide-react";
import { clsx } from "clsx";

export default function AdsAdminPage() {
    const [loading, setLoading] = useState(true);
    const [ads, setAds] = useState<any[]>([]);
    const [message, setMessage] = useState({ type: "", text: "" });

    useEffect(() => {
        fetchAds();
    }, []);

    const fetchAds = async () => {
        try {
            const res = await fetch("/api/admin/config?type=ads");
            const data = await res.json();
            setAds(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleToggle = async (ad: any) => {
        try {
            const res = await fetch("/api/admin/config?type=ads", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...ad, isEnabled: !ad.isEnabled }),
            });
            if (res.ok) fetchAds();
        } catch (err) {
            console.error("Failed to toggle ad");
        }
    };

    const handleUpdate = async (ad: any) => {
        try {
            const res = await fetch("/api/admin/config?type=ads", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(ad),
            });
            if (res.ok) {
                setMessage({ type: "success", text: `Ad placement "${ad.location}" updated.` });
                setTimeout(() => setMessage({ type: "", text: "" }), 3000);
            }
        } catch (err) {
            setMessage({ type: "error", text: "Failed to update ad." });
        }
    };

    if (loading) {
        return (
            <div className="py-20 flex flex-col items-center justify-center gap-4">
                <Loader2 className="w-10 h-10 text-primary-600 animate-spin" />
                <p className="text-slate-500 font-medium font-display">Loading ad placements...</p>
            </div>
        );
    }

    return (
        <div className="space-y-8 max-w-5xl mx-auto">
            <div>
                <h1 className="text-3xl font-display font-bold text-slate-900 tracking-tight">Ads Manager</h1>
                <p className="text-slate-500 mt-1">Manage Google AdSense placements and visibility across the site.</p>
            </div>

            {message.text && (
                <div className={clsx(
                    "p-4 rounded-2xl border flex items-center gap-3 font-medium transition-all",
                    message.type === "success" ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-red-50 text-red-600 border-red-100"
                )}>
                    {message.type === "success" ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                    {message.text}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {ads.map((ad) => (
                    <div key={ad.id} className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm space-y-6 group">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-slate-50 text-slate-400 group-hover:text-primary-600 rounded-2xl transition-colors">
                                    <LayoutTemplate className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900 capitalize">{ad.location}</h3>
                                    <p className="text-xs text-slate-400">Ad Placement</p>
                                </div>
                            </div>
                            <button
                                onClick={() => handleToggle(ad)}
                                className={clsx(
                                    "transition-colors",
                                    ad.isEnabled ? "text-primary-600" : "text-slate-300"
                                )}
                            >
                                {ad.isEnabled ? <ToggleRight className="w-10 h-10" /> : <ToggleLeft className="w-10 h-10" />}
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 mb-1 uppercase tracking-wider">Ad Slot ID</label>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="text"
                                        value={ad.adSlot}
                                        onChange={(e) => {
                                            const newAds = [...ads];
                                            const index = newAds.findIndex(a => a.id === ad.id);
                                            newAds[index] = { ...newAds[index], adSlot: e.target.value };
                                            setAds(newAds);
                                        }}
                                        className="flex-1 px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-primary-500 font-mono text-sm"
                                    />
                                    <button
                                        onClick={() => handleUpdate(ad)}
                                        className="p-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
                                    >
                                        <Save className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 text-xs font-medium text-slate-500 bg-slate-50 p-3 rounded-xl">
                                <Settings2 className="w-4 h-4" />
                                <span>Format: {ad.adFormat || "Auto"}</span>
                            </div>
                        </div>
                    </div>
                ))}
                {ads.length === 0 && (
                    <div className="col-span-full py-20 text-center text-slate-400 italic">No ad placements found.</div>
                )}
            </div>
        </div>
    );
}
