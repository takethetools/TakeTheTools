"use client";

import { Info, Cpu, Rocket } from "lucide-react";

export default function ComingSoonTool() {
  return (
    <div className="bg-white p-12 rounded-3xl border border-slate-200 shadow-sm text-center space-y-6">
      <div className="w-20 h-20 bg-primary-50 rounded-2xl flex items-center justify-center mx-auto text-primary-600 animate-pulse">
        <Cpu className="w-10 h-10" />
      </div>
      <div className="max-w-md mx-auto">
        <h3 className="text-2xl font-bold text-slate-900 mb-2">Tool in Development</h3>
        <p className="text-slate-500 leading-relaxed">
          We are currently building this tool to ensure it meets our high standards for performance and security. 
          It will be available shortly!
        </p>
      </div>
      <div className="flex items-center justify-center gap-2 text-primary-600 font-bold bg-primary-50 py-3 px-6 rounded-2xl w-fit mx-auto">
        <Rocket className="w-5 h-5" />
        Coming Soon
      </div>
    </div>
  );
}
