"use client";

import { useState, useRef } from "react";
import FileUpload from "./FileUpload";
import { Download, Loader2, RefreshCw, Music, Video, Play } from "lucide-react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";
import confetti from "canvas-confetti";
import { cn } from "@/lib/utils";

export default function Mp4ToMp3Tool() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const ffmpegRef = useRef(new FFmpeg());

  const loadFFmpeg = async () => {
    const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd";
    const ffmpeg = ffmpegRef.current;
    await ffmpeg.load({
      coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
      wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, "application/wasm"),
    });
  };

  const onFilesSelected = (files: File[]) => {
    if (files.length > 0) {
      setFile(files[0]);
      setResultUrl(null);
      setProgress(0);
    }
  };

  const convertToMp3 = async () => {
    if (!file) return;
    setIsProcessing(true);
    setProgress(0);
    
    try {
      const ffmpeg = ffmpegRef.current;
      if (!ffmpeg.loaded) await loadFFmpeg();

      ffmpeg.on("progress", ({ progress }) => {
        setProgress(Math.round(progress * 100));
      });

      const inputName = "input.mp4";
      const outputName = "output.mp3";

      await ffmpeg.writeFile(inputName, await fetchFile(file));
      await ffmpeg.exec(["-i", inputName, "-vn", "-ab", "128k", "-ar", "44100", "-y", outputName]);

      const data = await ffmpeg.readFile(outputName);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const blob = new Blob([data as any], { type: "audio/mp3" });
      setResultUrl(URL.createObjectURL(blob));

      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#3b82f6", "#1e40af"]
      });
    } catch (e) {
      console.error(e);
      alert("Error converting video. Make sure it's a valid MP4 file.");
    } finally {
      setIsProcessing(false);
    }
  };

  const reset = () => {
    setFile(null);
    setResultUrl(null);
    setProgress(0);
  };

  return (
    <div className="space-y-8">
      {!file ? (
        <FileUpload 
          onFilesSelected={onFilesSelected} 
          accept={{ "video/mp4": [".mp4"] }}
          maxFiles={1}
        />
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="px-8 py-12 flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 bg-primary-50 rounded-2xl flex items-center justify-center text-primary-600 mb-6 relative">
              <Video className="w-10 h-10" />
              <div className="absolute -right-2 -bottom-2 bg-white p-2 rounded-lg shadow-sm">
                <Music className="w-5 h-5 text-slate-400" />
              </div>
            </div>
            
            <h3 className="text-xl font-bold text-slate-900 mb-2">{file.name}</h3>
            <p className="text-slate-500 mb-8">{(file.size / (1024 * 1024)).toFixed(2)} MB • Ready to convert</p>

            {isProcessing && (
              <div className="w-full max-w-md space-y-4 mb-8">
                <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary-600 transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <p className="text-sm font-bold text-primary-600">{progress}% Processing...</p>
              </div>
            )}

            <div className="flex gap-4">
              <button 
                onClick={reset}
                className="px-8 py-3 bg-white border border-slate-200 text-slate-600 rounded-xl font-bold hover:bg-slate-50 transition-all"
              >
                Cancel
              </button>
              
              {resultUrl ? (
                <a 
                  href={resultUrl} 
                  download={file.name.replace(/\.[^/.]+$/, "") + ".mp3"}
                  className="px-10 py-3 bg-green-600 text-white rounded-xl font-bold shadow-lg hover:bg-green-700 transition-all flex items-center gap-2"
                >
                  <Download className="w-5 h-5" /> Download MP3
                </a>
              ) : (
                <button 
                  onClick={convertToMp3}
                  disabled={isProcessing}
                  className={cn(
                    "px-10 py-3 bg-primary-600 text-white rounded-xl font-bold shadow-lg hover:bg-primary-700 transition-all flex items-center gap-2",
                    isProcessing && "opacity-50 cursor-not-allowed"
                  )}
                >
                  {isProcessing ? <Loader2 className="w-5 h-5 animate-spin" /> : <Play className="w-5 h-5 fill-current" />}
                  {isProcessing ? "Converting..." : "Convert to MP3"}
                </button>
              )}
            </div>
          </div>
          
          <div className="px-8 py-4 bg-slate-50 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-400">
            <RefreshCw className="w-3 h-3" />
            <span>Powered by FFmpeg.wasm - Processing happens securely in your browser.</span>
          </div>
        </div>
      )}
    </div>
  );
}
// Note: FFmpeg requires specific COOP/COEP headers to work in browser. 
// We should mention this in the implementation notes.
