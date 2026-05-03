"use client";

import { useEffect, useRef } from "react";
import { ADSENSE_CLIENT } from "@/lib/ad-slots";

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
        setTimeout(checkWidthAndPush, 100);
      }
    };

    checkWidthAndPush();
  }, []);

  // Default sizes based on format
  const defaultStyle: React.CSSProperties =
    adFormat === "rectangle"
      ? { display: "inline-block", width: "300px", height: "250px" }
      : adFormat === "horizontal"
      ? { display: "block", width: "100%", height: "90px" }
      : { display: "block" };

  return (
    <ins
      ref={adRef}
      className={`adsbygoogle ${className}`}
      style={style || defaultStyle}
      data-ad-client={ADSENSE_CLIENT}
      data-ad-slot={adSlot}
      data-ad-format={adFormat}
      data-full-width-responsive={fullWidthResponsive ? "true" : "false"}
    />
  );
}
