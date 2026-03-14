"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

export default function BackToTop() {
    const [isVisible, setIsVisible] = useState(false);

    // Show button when page is scrolled up to given distance
    const toggleVisibility = () => {
        if (window.pageYOffset > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    // Set the top cordinate to 0
    // make scrolling smooth
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    useEffect(() => {
        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    return (
        <button
            type="button"
            onClick={scrollToTop}
            className={cn(
                "fixed bottom-8 right-8 z-50 p-4 rounded-2xl bg-primary-600 text-white shadow-2xl shadow-primary-500/40 hover:bg-primary-700 hover:scale-110 active:scale-95 transition-all duration-300",
                isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0 pointer-events-none"
            )}
            aria-label="Back to top"
        >
            <ArrowUp className="w-6 h-6" />
        </button>
    );
}
