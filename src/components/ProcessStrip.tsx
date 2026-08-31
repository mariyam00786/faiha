"use client";

import { siteData } from "@/data/site";
import { MapPin, Layers, PenTool, CheckSquare } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  MapPin: <MapPin className="w-5 h-5 text-terracotta" strokeWidth={1.5} />,
  Layers: <Layers className="w-5 h-5 text-terracotta" strokeWidth={1.5} />,
  PenTool: <PenTool className="w-5 h-5 text-terracotta" strokeWidth={1.5} />,
  CheckSquare: <CheckSquare className="w-5 h-5 text-terracotta" strokeWidth={1.5} />
};

export function ProcessStrip() {
  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 bg-charcoal text-sand relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-sand/10" />
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-sand/10" />

      {/* Decorative architectural background lines */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
         <div className="w-[1px] h-full bg-sand absolute left-1/4" />
         <div className="w-[1px] h-full bg-sand absolute left-2/4" />
         <div className="w-[1px] h-full bg-sand absolute left-3/4" />
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        <h2 className="text-xs tracking-widest text-sand/60 mb-16 uppercase">Workflow / Process</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {siteData.process.map((step, index) => (
            <div key={index} className="relative group">
              {/* Connector line for large screens */}
              {index < siteData.process.length - 1 && (
                <div className="hidden lg:block absolute top-6 left-12 w-[calc(100%-2rem)] h-[1px] bg-sand/20" />
              )}
              
              <div className="w-12 h-12 rounded-full border border-sand/20 flex items-center justify-center bg-charcoal relative z-10 group-hover:border-terracotta transition-colors mb-6">
                {iconMap[step.icon]}
              </div>
              
              <div className="flex gap-4 mb-2 items-baseline">
                <span className="font-mono text-xs text-sand/40 tracking-widest">0{index + 1}</span>
                <h3 className="font-serif text-xl">{step.title}</h3>
              </div>
              <p className="text-sm text-sand/70 pl-8">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
