"use client";

import { useState } from "react";
import { Zap, Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function NewsletterForm() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setStatus("loading");
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setStatus("success");
        setEmail("");
        setTimeout(() => setStatus("idle"), 3000);
    };

    return (
        <form className="flex gap-2" onSubmit={handleSubmit}>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder={status === "success" ? "Subscribed!" : "Email address"}
                aria-label="Newsletter email address"
                className={cn(
                    "bg-slate-800 border-none rounded-lg px-4 py-2 text-sm w-full outline-none transition-all",
                    status === "success" ? "bg-green-900/50 text-green-400 font-bold" : "focus:ring-2 focus:ring-primary-500"
                )}
                disabled={status === "loading" || status === "success"}
            />
            <button
                type="submit"
                disabled={status === "loading" || status === "success"}
                aria-label="Subscribe to newsletter"
                className={cn(
                    "p-2 rounded-lg transition-all flex items-center justify-center min-w-[40px]",
                    status === "success" ? "bg-green-600 text-white" : "bg-primary-600 text-white hover:bg-primary-700"
                )}
            >
                {status === "loading" ? <Loader2 className="w-4 h-4 animate-spin" /> :
                    status === "success" ? <Check className="w-4 h-4" /> :
                        <Zap className="w-4 h-4 fill-current" />}
            </button>
        </form>
    );
}
