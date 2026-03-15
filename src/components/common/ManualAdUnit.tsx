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
        if (pushed.current) return;

        try {
            (window as any).adsbygoogle = (window as any).adsbygoogle || [];
            (window as any).adsbygoogle.push({});
            pushed.current = true;
        } catch (err) {
            if (process.env.NODE_ENV === 'development') {
                // Keep console clean on localhost
            }
        }
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
