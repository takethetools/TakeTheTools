"use client";

import { useState } from "react";
import { Volume2, Zap, Play, Square, Download, Settings } from "lucide-react";

export default function TextToSpeechTool() {
  const [text, setText] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);

  const speak = () => {
    if (!text) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  const stop = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  return (
    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-8">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600">
          <Volume2 className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900">Text to Speech</h3>
          <p className="text-sm text-slate-500">Convert your text into natural sounding audio</p>
        </div>
      </div>

      <div className="space-y-6">
        <textarea 
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full h-64 p-8 bg-slate-50 border border-slate-100 rounded-3xl text-lg font-medium resize-none focus:outline-none"
          placeholder="Type something to hear it read aloud..."
        />

        <div className="flex gap-4">
           {!isSpeaking ? (
             <button 
               onClick={speak}
               className="flex-grow py-5 bg-primary-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary-500/20"
             >
                <Play className="w-6 h-6" /> Listen to Text
             </button>
           ) : (
             <button 
               onClick={stop}
               className="flex-grow py-5 bg-red-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-red-500/20"
             >
                <Square className="w-6 h-6" /> Stop Reading
             </button>
           )}
        </div>
        
        <div className="p-4 bg-slate-50 rounded-2xl flex items-center gap-3 text-slate-500">
           <Settings className="w-4 h-4" />
           <p className="text-xs font-medium">Uses your device's native speech synthesis engine.</p>
        </div>
      </div>
    </div>
  );
}
