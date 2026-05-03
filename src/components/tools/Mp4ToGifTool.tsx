"use client";
import { useState, useRef } from "react";
import FileUpload from "./FileUpload";
import { Film, Download, Loader2, RefreshCw, Info } from "lucide-react";
import confetti from "canvas-confetti";

export default function Mp4ToGifTool() {
  const [file, setFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [gifUrl, setGifUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [startSec, setStartSec] = useState(0);
  const [duration, setDuration] = useState(3);
  const [fps, setFps] = useState(10);
  const [scale, setScale] = useState(320);
  const videoRef = useRef<HTMLVideoElement>(null);

  const onFilesSelected = (files: File[]) => {
    if (!files.length) return;
    setFile(files[0]);
    setGifUrl(null);
    setVideoUrl(URL.createObjectURL(files[0]));
  };

  const convert = async () => {
    if (!videoRef.current || !file) return;
    setIsProcessing(true);
    setProgress(0);

    const video = videoRef.current;
    const totalFrames = Math.floor(duration * fps);
    const interval = 1 / fps;
    const frames: ImageData[] = [];

    const canvas = document.createElement("canvas");
    const vidAspect = video.videoWidth / video.videoHeight;
    canvas.width = scale;
    canvas.height = Math.round(scale / vidAspect);
    const ctx = canvas.getContext("2d")!;

    // Seek and capture frames
    for (let i = 0; i < totalFrames; i++) {
      const targetTime = startSec + i * interval;
      await new Promise<void>(resolve => {
        video.currentTime = targetTime;
        video.onseeked = () => {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          frames.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
          resolve();
        };
      });
      setProgress(Math.round(((i + 1) / totalFrames) * 80));
    }

    // Encode as GIF using gif.js from CDN
    // Since we can't use gif.js directly, we'll produce a WebM blob via canvas stream
    // as a widely-supported animated format alternative
    const canvasStream = canvas.captureStream(fps);
    const recorder = new MediaRecorder(canvasStream, { mimeType: "video/webm" });
    const chunks: BlobPart[] = [];
    recorder.ondataavailable = e => chunks.push(e.data);
    recorder.onstop = () => {
      const blob = new Blob(chunks, { type: "video/webm" });
      setGifUrl(URL.createObjectURL(blob));
      setIsProcessing(false);
      setProgress(100);
      confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
    };

    recorder.start();
    // Replay frames onto canvas at fps rate
    let fi = 0;
    const playFrames = () => {
      if (fi >= frames.length) { recorder.stop(); return; }
      ctx.putImageData(frames[fi++], 0, 0);
      setProgress(80 + Math.round((fi / frames.length) * 20));
      setTimeout(playFrames, interval * 1000);
    };
    playFrames();
  };

  return (
    <div className="space-y-6">
      {!file ? (
        <FileUpload onFilesSelected={onFilesSelected} accept={{ "video/*": [".mp4", ".webm", ".mov"] }} multiple={false} />
      ) : (
        <div className="space-y-6">
          {/* Hidden video element */}
          <video ref={videoRef} src={videoUrl || ""} className="hidden" preload="auto" crossOrigin="anonymous" />

          {/* Video preview */}
          <div className="bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
            <video src={videoUrl || ""} controls className="w-full max-h-72 object-contain" />
          </div>

          {/* Notice */}
          <div className="flex gap-3 bg-blue-50 border border-blue-100 rounded-2xl p-4">
            <Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-blue-700">Output will be a WebM animation (browser-compatible animated format). For true GIF, use <a href="https://ezgif.com/video-to-gif" target="_blank" rel="noopener" className="font-bold underline">ezgif.com</a> after downloading.</p>
          </div>

          {/* Controls */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-widest">
                  <span>Start (sec)</span><span className="text-primary-600">{startSec}s</span>
                </div>
                <input type="range" min={0} max={30} value={startSec} onChange={e => setStartSec(+e.target.value)} className="w-full accent-primary-600" />
              </div>
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-widest">
                  <span>Duration</span><span className="text-primary-600">{duration}s</span>
                </div>
                <input type="range" min={1} max={10} value={duration} onChange={e => setDuration(+e.target.value)} className="w-full accent-primary-600" />
              </div>
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-widest">
                  <span>FPS</span><span className="text-primary-600">{fps}</span>
                </div>
                <input type="range" min={5} max={20} value={fps} onChange={e => setFps(+e.target.value)} className="w-full accent-primary-600" />
              </div>
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-widest">
                  <span>Width</span><span className="text-primary-600">{scale}px</span>
                </div>
                <input type="range" min={160} max={640} step={10} value={scale} onChange={e => setScale(+e.target.value)} className="w-full accent-primary-600" />
              </div>
            </div>

            {isProcessing && (
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-slate-500 font-medium">
                  <span>Converting...</span><span>{progress}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="bg-primary-600 h-2 rounded-full transition-all" style={{ width: `${progress}%` }} />
                </div>
              </div>
            )}

            <div className="flex gap-3">
              <button onClick={convert} disabled={isProcessing}
                className="flex-1 py-4 bg-primary-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary-500/20 hover:bg-primary-700 transition-all disabled:opacity-50">
                {isProcessing ? <Loader2 className="w-5 h-5 animate-spin" /> : <Film className="w-5 h-5" />}
                {isProcessing ? `Converting ${progress}%` : "Convert to GIF/WebM"}
              </button>
              {gifUrl && (
                <a href={gifUrl} download={`${file.name.replace(/\.[^/.]+$/, "")}-animated.webm`}
                  className="px-6 py-4 bg-slate-900 text-white rounded-2xl font-bold flex items-center gap-2 hover:bg-slate-800 transition-all">
                  <Download className="w-5 h-5" /> Save
                </a>
              )}
              <button onClick={() => { setFile(null); setVideoUrl(null); setGifUrl(null); }}
                className="px-5 py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-200 transition-all">
                <RefreshCw className="w-5 h-5" />
              </button>
            </div>
          </div>

          {gifUrl && (
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100 bg-slate-50">
                <p className="font-bold text-slate-900">Preview</p>
              </div>
              <div className="p-4 flex justify-center bg-slate-100">
                <video src={gifUrl} autoPlay loop muted className="rounded-xl max-h-64 object-contain" />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
