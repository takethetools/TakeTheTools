"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Cookie, X, Settings, ShieldCheck, Info } from "lucide-react";

type ConsentType = {
    essential: boolean;
    analytics: boolean;
    marketing: boolean;
};

export default function CookieConsent() {
    const [isVisible, setIsVisible] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [consent, setConsent] = useState<ConsentType>({
        essential: true,
        analytics: false,
        marketing: false,
    });

    useEffect(() => {
        // Best-effort detection for EEA, UK, Switzerland
        // We use timezone as a proxy for client-side detection
        const isEEA = () => {
            const eeaTimezones = [
                'Europe/London', 'Europe/Dublin', 'Europe/Paris', 'Europe/Berlin',
                'Europe/Rome', 'Europe/Madrid', 'Europe/Brussels', 'Europe/Amsterdam',
                'Europe/Vienna', 'Europe/Zurich', 'Europe/Stockholm', 'Europe/Oslo',
                'Europe/Helsinki', 'Europe/Copenhagen', 'Europe/Warsaw', 'Europe/Prague',
                'Europe/Budapest', 'Europe/Lisbon', 'Europe/Athens'
            ];
            try {
                const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
                return eeaTimezones.some(e => tz === e || tz.startsWith('Europe/'));
            } catch (e) {
                return true; // Default to showing if detection fails
            }
        };

        const savedConsent = localStorage.getItem("cookie-consent");
        if (!savedConsent) {
            if (isEEA()) {
                const timer = setTimeout(() => setIsVisible(true), 1500);
                return () => clearTimeout(timer);
            }
        } else {
            try {
                const parsed = JSON.parse(savedConsent);
                updateGoogleConsent(parsed);
            } catch (e) {
                setIsVisible(true);
            }
        }
    }, []);

    const updateGoogleConsent = (c: ConsentType) => {
        if (typeof window !== "undefined" && (window as any).gtag) {
            (window as any).gtag("consent", "update", {
                ad_storage: c.marketing ? "granted" : "denied",
                ad_user_data: c.marketing ? "granted" : "denied",
                ad_personalization: c.marketing ? "granted" : "denied",
                analytics_storage: c.analytics ? "granted" : "denied",
            });
        }
    };

    const saveAndClose = (newConsent: ConsentType) => {
        localStorage.setItem("cookie-consent", JSON.stringify(newConsent));
        updateGoogleConsent(newConsent);
        setIsVisible(false);
        setShowSettings(false);
    };

    const handleAcceptAll = () => {
        const allAccepted = { essential: true, analytics: true, marketing: true };
        saveAndClose(allAccepted);
    };

    const handleDeclineAll = () => {
        const allDeclined = { essential: true, analytics: false, marketing: false };
        saveAndClose(allDeclined);
    };

    if (!isVisible) return null;

    return (
        <>
            {/* Main Banner */}
            {!showSettings && (
                <div
                    role="region"
                    aria-label="Cookie Consent"
                    className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6 animate-in fade-in slide-in-from-bottom-10 duration-700"
                >
                    <div className="container mx-auto">
                        <div className="bg-white rounded-[2rem] border border-slate-200 shadow-[0_20px_50px_rgba(0,0,0,0.1)] p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 backdrop-blur-xl bg-white/95">
                            <div className="flex items-start gap-4">
                                <div className="bg-primary-50 p-3 rounded-2xl text-primary-600 hidden md:block">
                                    <Cookie className="w-6 h-6" />
                                </div>
                                <div className="text-center md:text-left">
                                    <h3 className="text-lg font-bold text-slate-900 mb-1 flex items-center justify-center md:justify-start gap-2">
                                        <span className="md:hidden"><Cookie className="w-5 h-5 text-primary-600" /></span>
                                        Cookie Settings
                                    </h3>
                                    <p className="text-sm text-slate-600 leading-relaxed max-w-2xl">
                                        We use cookies to enhance your experience, serve personalized ads, and analyze our traffic. By clicking "Consent", you agree to our use of cookies. Read our{" "}
                                        <Link href="/privacy-policy" className="text-primary-600 hover:underline font-medium">Privacy Policy</Link> and{" "}
                                        <Link href="/cookie-policy" className="text-primary-600 hover:underline font-medium">Cookie Policy</Link>.
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
                                <button
                                    onClick={() => setShowSettings(true)}
                                    aria-label="Manage detailed cookie options"
                                    className="flex items-center justify-center gap-2 px-6 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50 rounded-xl transition-all w-full sm:w-auto border border-slate-100"
                                >
                                    <Settings className="w-4 h-4" />
                                    Manage Options
                                </button>
                                <button
                                    onClick={handleDeclineAll}
                                    aria-label="Do not consent to cookies"
                                    className="px-6 py-3 text-sm font-bold text-slate-900 hover:bg-slate-100 rounded-xl transition-all w-full sm:w-auto"
                                >
                                    Do Not Consent
                                </button>
                                <button
                                    onClick={handleAcceptAll}
                                    aria-label="Consent to all cookies"
                                    className="px-8 py-3 bg-slate-900 text-white text-sm font-bold rounded-xl hover:bg-slate-800 transition-all shadow-lg w-full sm:w-auto"
                                >
                                    Consent
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Settings Modal */}
            {showSettings && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-100">
                        <div className="p-8">
                            <div className="flex justify-between items-center mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="bg-primary-50 p-2 rounded-xl text-primary-600">
                                        <ShieldCheck className="w-6 h-6" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-slate-900">Privacy Preferences</h2>
                                </div>
                                <button
                                    onClick={() => setShowSettings(false)}
                                    className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                                >
                                    <X className="w-6 h-6 text-slate-400" />
                                </button>
                            </div>

                            <div className="space-y-6 mb-8">
                                {/* Essential */}
                                <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                                    <div className="flex-grow">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h4 className="font-bold text-slate-900">Essential Cookies</h4>
                                            <span className="text-[10px] bg-slate-200 text-slate-600 px-1.5 py-0.5 rounded-md font-black uppercase tracking-wider">Required</span>
                                        </div>
                                        <p className="text-xs text-slate-500">Necessary for the website to function. They cannot be disabled.</p>
                                    </div>
                                    <div className="h-6 w-11 bg-primary-600 rounded-full relative cursor-not-allowed opacity-50">
                                        <div className="absolute right-1 top-1 bg-white w-4 h-4 rounded-full"></div>
                                    </div>
                                </div>

                                {/* Analytics */}
                                <label className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-slate-100 hover:border-primary-200 cursor-pointer transition-all">
                                    <div className="flex-grow">
                                        <h4 className="font-bold text-slate-900 mb-1">Analytics Cookies</h4>
                                        <p className="text-xs text-slate-500">Allow us to improve the site by collecting information on how you use it.</p>
                                    </div>
                                    <input
                                        type="checkbox"
                                        checked={consent.analytics}
                                        onChange={(e) => setConsent({ ...consent, analytics: e.target.checked })}
                                        className="sr-only peer"
                                    />
                                    <div className="h-6 w-11 bg-slate-200 rounded-full relative peer-checked:bg-primary-600 transition-colors">
                                        <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-all peer-checked:translate-x-5"></div>
                                    </div>
                                </label>

                                {/* Marketing */}
                                <label className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-slate-100 hover:border-primary-200 cursor-pointer transition-all">
                                    <div className="flex-grow">
                                        <h4 className="font-bold text-slate-900 mb-1">Marketing Cookies</h4>
                                        <p className="text-xs text-slate-500">Used to track visitors across websites to deliver more relevant ads.</p>
                                    </div>
                                    <input
                                        type="checkbox"
                                        checked={consent.marketing}
                                        onChange={(e) => setConsent({ ...consent, marketing: e.target.checked })}
                                        className="sr-only peer"
                                    />
                                    <div className="h-6 w-11 bg-slate-200 rounded-full relative peer-checked:bg-primary-600 transition-colors">
                                        <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-all peer-checked:translate-x-5"></div>
                                    </div>
                                </label>
                            </div>

                            <div className="flex flex-col gap-3">
                                <button
                                    onClick={() => saveAndClose(consent)}
                                    className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all"
                                >
                                    Save Settings
                                </button>
                                <div className="text-center">
                                    <p className="text-[10px] text-slate-400">
                                        By clicking save, you agree to our
                                        <Link href="/privacy-policy" className="mx-1 text-slate-600 hover:underline">Privacy Policy</Link>
                                        and
                                        <Link href="/contact" className="mx-1 text-slate-600 hover:underline">Contact Us</Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
