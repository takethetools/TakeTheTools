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
            if (adsbygoogle && adRef.current) {
                try {
                    adsbygoogle.push({});
                    pushed.current = true;
                } catch (e) {
                    // Silently ignore - ad blocker or script not ready
                }
            }
        };

        // Try immediately
        tryPush();

        // If not pushed yet, retry after script likely loads
        if (!pushed.current) {
            const timer = setTimeout(tryPush, 2000);
            return () => clearTimeout(timer);
        }
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
