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
    adSlot = "2317951509",
    adFormat = "auto",
    fullWidthResponsive = true,
    className = "",
    style,
}: ManualAdUnitProps) {
    const adRef = useRef<HTMLModElement>(null);
    const pushed = useRef(false);

    useEffect(() => {
        if (pushed.current) return;

        const checkWidthAndPush = () => {
            if (adRef.current && adRef.current.offsetWidth > 0) {
                try {
                    (window as any).adsbygoogle = (window as any).adsbygoogle || [];
                    (window as any).adsbygoogle.push({});
                    pushed.current = true;
                } catch (err) {
                    console.error("AdSense Error:", err);
                }
            } else {
                // Try again in 100ms if width is not yet available
                setTimeout(checkWidthAndPush, 100);
            }
        };

        checkWidthAndPush();
    }, []);

    return (
        <ins
            ref={adRef}
            className={`adsbygoogle ${className}`}
            style={style || { display: "block" }}
            data-ad-client="ca-pub-3148286057781421"
            data-ad-slot={adSlot}
            data-ad-format={adFormat}
            data-full-width-responsive={fullWidthResponsive ? "true" : "false"}
        />
    );
}
