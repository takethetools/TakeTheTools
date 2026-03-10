"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

interface GoogleAdSenseProps {
    publisherId: string;
}

export default function GoogleAdSense({ publisherId }: GoogleAdSenseProps) {
    const [hasConsent, setHasConsent] = useState(false);

    useEffect(() => {
        // Check consent on mount and when localStorage changes
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

        // Listen for custom event or storage changes
        window.addEventListener("storage", checkConsent);
        window.addEventListener("cookie-consent-updated", checkConsent);

        return () => {
            window.removeEventListener("storage", checkConsent);
            window.removeEventListener("cookie-consent-updated", checkConsent);
        };
    }, []);

    useEffect(() => {
        if (hasConsent) {
            const script = document.createElement("script");
            script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${publisherId}`;
            script.async = true;
            script.crossOrigin = "anonymous";
            document.head.appendChild(script);

            return () => {
                document.head.removeChild(script);
            };
        }
    }, [hasConsent, publisherId]);

    return null;
}
