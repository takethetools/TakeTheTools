"use client";

import { useState, useRef } from "react";
import FileUpload from "./FileUpload";
import { Download, Loader2, RefreshCw, Video, Play, FileVideo } from "lucide-react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";
import confetti from "canvas-confetti";

export default function VideoConverterTool() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  
  const ffmpegRef = useRef<any>(null);

  const loadFFmpeg = async () => {
    const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd";
    const ffmpeg = new FFmpeg();
    ffmpeg.on("progress", ({ progress }) => {
      setProgress(Math.round(progress * 100));
    });
    await ffmpeg.load({
      coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
      wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, "application/wasm"),
    });
    ffmpegRef.current = ffmpeg;
  };

  const onFilesSelected = (files: File[]) => {
    if (files.length > 0) {
      setFile(files[0]);
      setResultUrl(null);
      setProgress(0);
      setError(null);
    }
  };

  const convertVideo = async () => {
    if (!file) return;
    setIsProcessing(true);
    setProgress(0);
    setError(null);

    try {
      if (!ffmpegRef.current) {
        await loadFFmpeg();
      }
      const ffmpeg = ffmpegRef.current;
      const inputName = "input" + file.name.substring(file.name.lastIndexOf("."));
      const outputName = "output.mp4";

      await ffmpeg.writeFile(inputName, await fetchFile(file));
      
      // Convert to MP4 (H.264)
      await ffmpeg.exec(["-i", inputName, "-c:v", "libx264", "-preset", "ultrafast", "-crf", "22", "-c:a", "aac", "-b:a", "128k", "-movflags", "+faststart", outputName]);

      const data = await ffmpeg.readFile(outputName);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const blob = new Blob([data as any], { type: "video/mp4" });
      setResultUrl(URL.createObjectURL(blob));

      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e: unknown) {
      console.error(e);
      setError("Conversion failed. Please try a different file.");
    } finally {
      setIsProcessing(false);
    }
  };

  const clear = () => {
    setFile(null);
    setResultUrl(null);
    setProgress(0);
    setError(null);
  };

  return (
    <div className="space-y-6">
      {!file ? (
        <FileUpload 
          onFilesSelected={onFilesSelected} 
          accept={{ 
            'video/x-msvideo': ['.avi'], 
            'video/quicktime': ['.mov'],
            'video/mp4': ['.mp4'],
            'video/x-matroska': ['.mkv']
          }} 
        />
      ) : (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center text-primary-600">
                  <FileVideo className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 line-clamp-1">{file.name}</h3>
                  <p className="text-xs text-slate-400 font-medium">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                </div>
              </div>
              <button onClick={clear} className="text-xs font-bold text-slate-400 hover:text-red-500 transition-colors">
                Change File
              </button>
            </div>

            {error && (
              <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
                <RefreshCw className="w-4 h-4" /> {error}
              </div>
            )}

            {!resultUrl ? (
              <div className="space-y-4">
                <button 
                  onClick={convertVideo}
                  disabled={isProcessing}
                  className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-primary-600 text-white rounded-xl font-bold shadow-lg shadow-primary-500/20 hover:bg-primary-700 transition-all disabled:opacity-50"
                >
                  {isProcessing ? <Loader2 className="w-5 h-5 animate-spin" /> : <Video className="w-5 h-5" />}
                  {isProcessing ? `Converting... ${progress}%` : "Convert to MP4"}
                </button>
                {isProcessing && (
                   <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                     <div 
                       className="bg-primary-600 h-full transition-all duration-300" 
                       style={{ width: `${progress}%` }}
                     />
                   </div>
                )}
              </div>
            ) : (
              <div className="space-y-6 animate-in zoom-in-95 duration-300">
                <div className="aspect-video bg-slate-900 rounded-2xl overflow-hidden shadow-2xl relative group">
                  <video src={resultUrl} controls className="w-full h-full" />
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-slate-50">
                  <a 
                    href={resultUrl} 
                    download={`converted-${file.name.substring(0, file.name.lastIndexOf("."))}.mp4`}
                    className="flex-grow flex items-center justify-center gap-2 px-8 py-4 bg-green-600 text-white rounded-xl font-bold shadow-lg shadow-green-500/20 hover:bg-green-700 transition-all"
                  >
                    <Download className="w-5 h-5" /> Download MP4
                  </a>
                  <button 
                    onClick={clear}
                    className="px-8 py-4 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200 transition-all flex items-center justify-center gap-2"
                  >
                    <RefreshCw className="w-5 h-5" /> Convert Another
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
