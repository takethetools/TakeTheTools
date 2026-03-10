"use client";

import { useEffect, useRef } from "react";

interface ManualAdUnitProps {
    adSlot?: string;
    adFormat?: "auto" | "rectangle" | "horizontal" | "vertical" | "fluid";
    fullWidthResponsive?: boolean;
    className?: string;
    style?: React.CSSProperties;
}

export default function ManualAdUnit({
    adSlot = "3171595105",
    adFormat = "auto",
    fullWidthResponsive = true,
    className = "",
    style,
}: ManualAdUnitProps) {
    const adRef = useRef<HTMLModElement>(null);
    const pushed = useRef(false);

    useEffect(() => {
        // Don't push if already pushed for this instance
        if (pushed.current) return;

        const tryPush = () => {
            if (typeof window === "undefined") return;

            // Wait for adsbygoogle script to be available
            const adsbygoogle = (window as any).adsbygoogle;

            // Safety check: only push if the script is loaded and we have a ref
            if (adsbygoogle && adRef.current) {
                try {
                    // Push ad and mark as pushed
                    adsbygoogle.push({});
                    pushed.current = true;
                } catch (e) {
                    // In development, AdSense often fails on localhost/null origins
                    if (process.env.NODE_ENV === 'development') {
                        // console.warn("AdSense push skipped/failed in development", e);
                    }
                }
            }
        };

        // Trigger push as soon as possible
        tryPush();

        // Also try on window load if it hasn't happened yet
        window.addEventListener('load', tryPush);

        return () => {
            window.removeEventListener('load', tryPush);
        };
    }, []);

    return (
        <ins
            ref={adRef}
            className={`adsbygoogle ${className}`}
            style={style || { display: "block" }}
            data-ad-client="ca-pub-2006415668111484"
            data-ad-slot={adSlot}
            data-ad-format={adFormat}
            data-full-width-responsive={fullWidthResponsive ? "true" : "false"}
        />
    );
}
