"use client";

import { useState } from "react";
import { FileText, Download, Eye, Copy, Check } from "lucide-react";

const SAMPLE = `# My Document

## Introduction

This is a **Markdown to PDF** converter. Write your content using Markdown syntax and download a formatted PDF.

## Features

- **Bold text** and *italic text*
- Ordered and unordered lists
- Code blocks and inline \`code\`
- Headers from H1 to H6

## Code Example

\`\`\`javascript
function hello() {
  console.log("Hello, World!");
}
\`\`\`

## Conclusion

Your document is ready to export as PDF.`;

export default function MarkdownToPdfTool() {
  const [markdown, setMarkdown] = useState(SAMPLE);
  const [preview, setPreview] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const parseMarkdown = (md: string): string => {
    return md
      .replace(/^# (.+)$/gm, '<h1 style="font-size:2em;font-weight:bold;margin:0.5em 0;color:#1e293b;border-bottom:2px solid #e2e8f0;padding-bottom:0.3em">$1</h1>')
      .replace(/^## (.+)$/gm, '<h2 style="font-size:1.5em;font-weight:bold;margin:0.8em 0 0.4em;color:#1e293b">$1</h2>')
      .replace(/^### (.+)$/gm, '<h3 style="font-size:1.2em;font-weight:bold;margin:0.6em 0 0.3em;color:#334155">$1</h3>')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/`([^`]+)`/g, '<code style="background:#f1f5f9;padding:2px 6px;border-radius:4px;font-family:monospace;font-size:0.9em;color:#7c3aed">$1</code>')
      .replace(/```[\w]*\n([\s\S]*?)```/gm, '<pre style="background:#1e293b;color:#94a3b8;padding:1em;border-radius:8px;overflow-x:auto;margin:1em 0"><code style="background:none;color:inherit">$1</code></pre>')
      .replace(/^- (.+)$/gm, '<li style="margin:0.25em 0">$1</li>')
      .replace(/^\d+\. (.+)$/gm, '<li style="margin:0.25em 0">$1</li>')
      .replace(/(<li[^>]*>.*<\/li>\n?)+/g, (m) => `<ul style="padding-left:1.5em;margin:0.5em 0">${m}</ul>`)
      .replace(/^(?!<[h|u|p|pre]).+$/gm, (line) => line.trim() ? `<p style="margin:0.5em 0;line-height:1.6;color:#475569">${line}</p>` : '')
      .replace(/\n\n+/g, '<br/>');
  };

  const downloadPdf = () => {
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Document</title>
        <style>
          body { font-family: Georgia, serif; max-width: 800px; margin: 40px auto; padding: 0 40px; color: #1e293b; line-height: 1.7; }
          @media print { body { margin: 0; padding: 20px; } }
        </style>
      </head>
      <body>${parseMarkdown(markdown)}</body>
      </html>`;
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const win = window.open(url, '_blank');
    if (win) {
      win.onload = () => { win.print(); };
    }
  };

  const copyHtml = () => {
    navigator.clipboard.writeText(parseMarkdown(markdown));
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600">
          <FileText className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900">Markdown to PDF Converter</h3>
          <p className="text-sm text-slate-500">Write Markdown and download a formatted PDF document</p>
        </div>
      </div>

      <div className="flex gap-2">
        <button onClick={() => setPreview(false)}
          className={`flex-1 py-2 rounded-xl font-bold text-sm transition-colors ${!preview ? "bg-primary-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
          ✏️ Edit Markdown
        </button>
        <button onClick={() => setPreview(true)}
          className={`flex-1 py-2 rounded-xl font-bold text-sm transition-colors ${preview ? "bg-primary-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
          <Eye className="w-4 h-4 inline mr-1" />Preview
        </button>
      </div>

      {!preview ? (
        <textarea
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
          className="w-full h-72 p-5 bg-slate-50 border border-slate-200 rounded-2xl font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary-300"
          placeholder="# Your Title&#10;&#10;Write your content in **Markdown** here..."
        />
      ) : (
        <div
          className="w-full min-h-72 p-6 bg-white border border-slate-200 rounded-2xl prose prose-slate max-w-none overflow-auto"
          dangerouslySetInnerHTML={{ __html: parseMarkdown(markdown) }}
        />
      )}

      <div className="flex gap-3">
        <button onClick={downloadPdf}
          className="flex-1 py-4 bg-primary-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-primary-700 transition-colors">
          <Download className="w-5 h-5" /> Download PDF
        </button>
        <button onClick={copyHtml}
          className="px-6 py-4 bg-slate-100 text-slate-700 rounded-2xl font-bold hover:bg-slate-200 transition-colors flex items-center gap-2">
          {isCopied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
          {isCopied ? "Copied!" : "Copy HTML"}
        </button>
      </div>

      <p className="text-xs text-slate-400 text-center">
        Click "Download PDF" — your browser's print dialog will open. Select "Save as PDF" to download.
      </p>
    </div>
  );
}
