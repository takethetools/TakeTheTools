import { cn } from "@/lib/utils";

interface AdPlaceholderProps {
  type?: "horizontal" | "sidebar" | "banner" | "top-banner";
  className?: string;
}

export default function AdPlaceholder({ type = "horizontal", className }: AdPlaceholderProps) {
  const styles = {
    horizontal: "w-full h-32 md:h-48",
    sidebar: "w-full min-h-[400px]",
    banner: "w-full h-24 md:h-32",
    "top-banner": "w-full h-20 md:h-24 bg-white border-b border-slate-100",
  };

  return (
    <div 
      className={cn(
        "rounded-2xl flex flex-col items-center justify-center border-2 border-dashed border-slate-200 overflow-hidden relative group transition-all duration-300",
        type === "top-banner" ? "rounded-none border-none border-b" : "bg-slate-50/50 hover:bg-slate-50 hover:border-primary-200",
        styles[type],
        className
      )}
    >
      <div className={cn(
        "text-slate-400 font-bold uppercase tracking-widest absolute",
        type === "top-banner" ? "text-[10px] top-2" : "text-xs top-4"
      )}>
        Advertisement
      </div>
      <div className={cn("flex flex-col items-center", type === "top-banner" ? "gap-1" : "gap-2")}>
        <div className={cn(
          "bg-slate-200 rounded-full flex items-center justify-center text-slate-400 group-hover:scale-110 transition-transform",
          type === "top-banner" ? "w-8 h-8" : "w-12 h-12"
        )}>
          <svg className={cn(type === "top-banner" ? "w-4 h-4" : "w-6 h-6")} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <span className={cn("text-slate-400 font-medium", type === "top-banner" ? "text-sm" : "text-base")}>
          Google AdSense Placeholder
        </span>
      </div>
      
      {/* Visual filler */}
      <div className="mt-4 flex gap-2">
        <div className="w-8 h-1 bg-slate-200 rounded-full"></div>
        <div className="w-16 h-1 bg-slate-200 rounded-full"></div>
        <div className="w-8 h-1 bg-slate-200 rounded-full"></div>
      </div>
    </div>
  );
}
