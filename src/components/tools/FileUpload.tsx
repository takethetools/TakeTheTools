"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, X, File, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface FileUploadProps {
  onFilesSelected: (files: File[]) => void;
  accept?: Record<string, string[]>;
  maxFiles?: number;
  maxSize?: number; // in bytes
  className?: string;
  id?: string;
  multiple?: boolean;
}

export default function FileUpload({ 
  onFilesSelected, 
  accept, 
  maxFiles = 10, 
  maxSize = 10 * 1024 * 1024, // 10MB default
  className,
  multiple = true
}: FileUploadProps) {
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setError(null);
    if (acceptedFiles.length > 0) {
      onFilesSelected(acceptedFiles);
    }
  }, [onFilesSelected]);

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop,
    accept,
    maxFiles: multiple ? maxFiles : 1,
    maxSize,
    multiple,
  });

  return (
    <div className={cn("w-full", className)}>
      <div 
        {...getRootProps()} 
        className={cn(
          "relative border-2 border-dashed rounded-3xl p-12 transition-all cursor-pointer flex flex-col items-center justify-center text-center",
          isDragActive ? "border-primary-500 bg-primary-50" : "border-slate-200 bg-slate-50 hover:bg-white hover:border-primary-300",
          fileRejections.length > 0 && "border-red-300 bg-red-50"
        )}
      >
        <input {...getInputProps()} id="file-upload-input" />
        
        <div className={cn(
          "w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform",
          isDragActive ? "scale-110 bg-primary-600 text-white" : "bg-white text-primary-600 shadow-sm"
        )}>
          <Upload className="w-8 h-8" />
        </div>

        <h3 className="text-xl font-bold text-slate-900 mb-2">
          {isDragActive ? "Drop files here" : "Select or drag & drop files"}
        </h3>
        <p className="text-slate-500 text-sm max-w-xs mx-auto">
          We support {Object.values(accept || {}).flat().join(", ")} up to {maxSize / (1024 * 1024)}MB.
        </p>

        {fileRejections.length > 0 && (
          <div className="mt-6 p-4 bg-red-100 text-red-700 rounded-xl flex items-start gap-3 text-sm animate-in fade-in slide-in-from-top-2">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <div className="text-left">
              <p className="font-bold">Check your files:</p>
              <ul className="list-disc ml-4 opacity-90">
                {fileRejections.map(({ file, errors }) => (
                  <li key={file.name}>
                    {file.name}: {errors.map(e => e.message).join(", ")}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
