"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface AdPlaceholderProps {
  type?: "horizontal" | "sidebar" | "banner" | "top-banner";
  className?: string;
  slot?: string;
}

export default function AdPlaceholder({ type = "horizontal", className, slot = "default-slot" }: AdPlaceholderProps) {
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    const checkConsent = () => {
      const consent = localStorage.getItem("cookie-consent");
      if (consent) {
        try {
          const parsed = JSON.parse(consent);
          if (parsed.marketing) {
            setHasConsent(true);
          }
        } catch (e) {
          console.error("Error parsing consent", e);
        }
      }
    };

    checkConsent();
    window.addEventListener("cookie-consent-updated", checkConsent);

    return () => {
      window.removeEventListener("cookie-consent-updated", checkConsent);
    };
  }, []);

  useEffect(() => {
    if (hasConsent) {
      try {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      } catch (e) {
        console.error("AdSense error", e);
      }
    }
  }, [hasConsent]);

  const styles = {
    horizontal: "w-full min-h-[90px] md:min-h-[250px]",
    sidebar: "w-full min-h-[250px] md:min-h-[600px]",
    banner: "w-full min-h-[90px]",
    "top-banner": "w-full h-20 md:h-24 bg-transparent",
  };

  if (hasConsent) {
    return (
      <div className={cn("overflow-hidden flex justify-center", styles[type], className)}>
        <ins
          className="adsbygoogle"
          style={{ display: "block", width: "100%", height: "100%" }}
          data-ad-client="ca-pub-2006415668111484"
          data-ad-slot={slot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "rounded-2xl flex flex-col items-center justify-center border-2 border-dashed border-slate-200 overflow-hidden relative group transition-all duration-300",
        type === "top-banner" ? "rounded-none border-none border-b" : "bg-slate-50/50 hover:bg-slate-50 hover:border-primary-200",
        styles[type],
        className
      )}
    >
      <div className={cn(
        "text-slate-400 font-bold uppercase tracking-widest absolute",
        type === "top-banner" ? "text-[10px] top-2" : "text-xs top-4"
      )}>
        Advertisement
      </div>
      <div className={cn("flex flex-col items-center", type === "top-banner" ? "gap-1" : "gap-2")}>
        <div className={cn(
          "bg-slate-200 rounded-full flex items-center justify-center text-slate-400 group-hover:scale-110 transition-transform",
          type === "top-banner" ? "w-8 h-8" : "w-12 h-12"
        )}>
          <svg className={cn(type === "top-banner" ? "w-4 h-4" : "w-6 h-6")} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <span className={cn("text-slate-600 font-medium", type === "top-banner" ? "text-sm" : "text-base text-center px-4")}>
          Support us by enabling marketing cookies
        </span>
      </div>
    </div>
  );
}
