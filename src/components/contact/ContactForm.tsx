"use client";

import { useState } from "react";
import { Send, Loader2, CheckCircle2, AlertCircle } from "lucide-react";

export default function ContactForm() {
  const [isPending, setIsPending] = useState(false);
  const [result, setResult] = useState<{ success?: string; error?: string } | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsPending(true);
    setResult(null);

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("https://formsubmit.co/ajax/takethetools7@gmail.com", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setResult({ success: "Your message has been sent successfully." });
        (event.target as HTMLFormElement).reset();
      } else {
        const json = await response.json();
        setResult({ error: json.message || "Failed to send message. Please try again later." });
      }
    } catch (err) {
      setResult({ error: "An unexpected error occurred. Please try again later." });
    } finally {
      setIsPending(false);
    }
  }

  return (
    <div className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-slate-100 shadow-2xl shadow-slate-200/50">
      <h2 className="text-2xl font-bold text-slate-900 mb-8">Send us a message</h2>
      
      {result?.success && (
        <div className="mb-8 p-4 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center gap-3 text-emerald-700 font-medium animate-in fade-in slide-in-from-top-4">
          <CheckCircle2 className="w-5 h-5" />
          {result.success}
        </div>
      )}

      {result?.error && (
        <div className="mb-8 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-700 font-medium animate-in fade-in slide-in-from-top-4">
          <AlertCircle className="w-5 h-5" />
          {result.error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-2">Full Name</label>
            <input 
              name="name"
              type="text" 
              required
              className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-primary-100 outline-none transition-all" 
              placeholder="John Doe" 
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-2">Email Address</label>
            <input 
              name="email"
              type="email" 
              required
              className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-primary-100 outline-none transition-all" 
              placeholder="john@example.com" 
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-2">Reason for Contact</label>
          <select 
            name="reason"
            className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-primary-100 outline-none font-medium transition-all"
          >
            <option>General Inquiry</option>
            <option>Bug Report</option>
            <option>Tool Request</option>
            <option>Other</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-2">Subject</label>
          <input 
            name="subject"
            type="text" 
            className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-primary-100 outline-none transition-all" 
            placeholder="Brief summary of your message" 
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-2">Message</label>
          <textarea 
            name="message"
            required
            className="w-full h-40 p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-primary-100 outline-none resize-none transition-all" 
            placeholder="Tell us as much as you can..."
          ></textarea>
        </div>

        <button 
          type="submit" 
          disabled={isPending}
          className="w-full py-5 bg-primary-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-primary-700 transition-all shadow-lg shadow-primary-500/30 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isPending ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" /> Sending...
            </>
          ) : (
            <>
              <Send className="w-5 h-5" /> Send Message
            </>
          )}
        </button>

        <p className="text-center text-xs text-slate-400">We typically respond within 24 hours. Average response time is 6 hours.</p>
      </form>
    </div>
  );
}
