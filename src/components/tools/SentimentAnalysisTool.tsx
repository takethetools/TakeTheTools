"use client";

import { useState } from "react";
import { Smile, Frown, Meh, Zap, Copy, Check, MessageSquare } from "lucide-react";

export default function SentimentAnalysisTool() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<{ score: number; label: string; details: string[] } | null>(null);

  const analyzeSentiment = () => {
    if (!input) return;
    
    // Simple rule-based sentiment analysis
    const positiveWords = ["good", "great", "awesome", "excellent", "happy", "love", "wonderful", "best", "perfect", "easy", "fast"];
    const negativeWords = ["bad", "terrible", "worst", "slow", "hard", "difficult", "hate", "issue", "bug", "error", "fail", "poor"];
    
    const words = input.toLowerCase().split(/\W+/);
    let score = 0;
    const foundPos = words.filter(w => positiveWords.includes(w));
    const foundNeg = words.filter(w => negativeWords.includes(w));
    
    score = foundPos.length - foundNeg.length;
    
    let label = "Neutral";
    if (score > 1) label = "Positive";
    if (score > 3) label = "Very Positive";
    if (score < -1) label = "Negative";
    if (score < -3) label = "Very Negative";

    setResult({
      score,
      label,
      details: [
        `Detected ${foundPos.length} positive keywords`,
        `Detected ${foundNeg.length} negative keywords`,
        `Overall sentiment score: ${score}`
      ]
    });
  };

  return (
    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-8">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600">
          <MessageSquare className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900">Sentiment Analysis</h3>
          <p className="text-sm text-slate-500">Analyze the emotional tone of your text</p>
        </div>
      </div>

      <div className="space-y-6">
        <textarea 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full h-40 bg-slate-50 border border-slate-100 rounded-2xl p-6 font-sans text-slate-600 focus:outline-none"
          placeholder="Enter text to analyze (e.g., product reviews, social posts)..."
        />

        <button 
          onClick={analyzeSentiment}
          className="w-full py-4 bg-primary-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2"
        >
          <Zap className="w-5 h-5" /> Analyze Sentiment
        </button>

        {result && (
          <div className="p-6 rounded-2xl border transition-all duration-500 bg-slate-50 border-slate-100">
            <div className="flex items-center gap-4 mb-6">
              <div className={`p-4 rounded-2xl ${
                result.label.includes("Positive") ? "bg-green-100 text-green-600" : 
                result.label.includes("Negative") ? "bg-red-100 text-red-600" : "bg-blue-100 text-blue-600"
              }`}>
                {result.label.includes("Positive") ? <Smile className="w-8 h-8" /> : 
                 result.label.includes("Negative") ? <Frown className="w-8 h-8" /> : <Meh className="w-8 h-8" />}
              </div>
              <div>
                 <span className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Sentiment</span>
                 <h4 className="text-2xl font-bold text-slate-900">{result.label}</h4>
              </div>
            </div>

            <div className="space-y-3">
               {result.details.map((detail, i) => (
                 <div key={i} className="flex items-center gap-2 text-sm text-slate-600">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                    {detail}
                 </div>
               ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
