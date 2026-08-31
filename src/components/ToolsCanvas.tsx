"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { RotateCcw } from "lucide-react";
import { siteData } from "@/data/site";

// Helper to generate a placeholder "icon" for software
function SoftwareIcon({ name }: { name: string }) {
  const getStyle = (name: string) => {
    switch(name.toLowerCase()) {
      case 'adobe photoshop': return { bg: '#31A8FF', text: '#001E36', label: 'Ps' };
      case 'autocad': return { bg: '#E42824', text: '#FFFFFF', label: 'A' };
      case 'sketchup': return { bg: '#005F9E', text: '#FFFFFF', label: 'Su' };
      case 'revit': return { bg: '#0696D7', text: '#FFFFFF', label: 'R' };
      case '3ds max': return { bg: '#37B34A', text: '#FFFFFF', label: '3M' };
      case 'd5 rendering': return { bg: '#1A1A1A', text: '#FFFFFF', label: 'D5' };
      case 'lumion': return { bg: '#FF6B00', text: '#FFFFFF', label: 'L' };
      case 'microsoft office': return { bg: '#D83B01', text: '#FFFFFF', label: 'O' };
      default: return { bg: '#38322B', text: '#FFFFFF', label: name.substring(0, 2) };
    }
  };

  const style = getStyle(name);

  return (
    <div 
      className="w-12 h-12 rounded-lg flex items-center justify-center font-sans font-bold text-lg mx-auto mb-3"
      style={{ backgroundColor: style.bg, color: style.text }}
    >
      {style.label}
    </div>
  );
}

export function ToolsCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const resetLayout = () => {
    controls.start((i) => ({ 
      x: getRandomOffset(i).x, 
      y: getRandomOffset(i).y, 
      rotate: getRandomRotation(i), 
      transition: { type: "spring", stiffness: 100, damping: 15 } 
    }));
  };

  // Generate random initial scattered positions
  const getRandomRotation = (index: number) => {
    const rotations = [-12, 8, -5, 15, -20, 10, -8, 5];
    return rotations[index % rotations.length];
  };

  const getRandomOffset = (index: number) => {
    const offsets = [
      { x: -100, y: -40 }, { x: 50, y: 30 }, { x: -30, y: 80 }, { x: 120, y: -60 },
      { x: -150, y: 20 }, { x: 80, y: 90 }, { x: 20, y: -90 }, { x: -80, y: 60 }
    ];
    return offsets[index % offsets.length];
  };

  return (
    <section className="py-24 px-6 md:px-12 lg:px-24">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <h2 className="font-serif italic text-3xl md:text-4xl text-brand-text mb-2">My Tools & Software</h2>
          <p className="text-[10px] tracking-widest uppercase text-brand-text/50 font-sans">
            DRAG THE CARDS AROUND ✥
          </p>
        </div>
        
        <button 
          onClick={resetLayout}
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-brand-border hover:bg-brand-text/5 transition-colors text-xs font-sans text-brand-text/70"
        >
          <RotateCcw className="w-3 h-3" />
          Reset layout
        </button>
      </div>

      <div 
        ref={containerRef}
        className="w-full h-[600px] border-8 border-[#5A4F42] rounded-md relative overflow-hidden bg-[#D8D3C8]"
        style={{
          backgroundImage: "radial-gradient(#C4BFB5 1px, transparent 1px)",
          backgroundSize: "16px 16px"
        }}
      >
        {isClient && siteData.about.skills.map((skill, i) => {
          const initialOffset = getRandomOffset(i);
          return (
            <motion.div
              key={skill}
              custom={i}
              drag
              dragConstraints={containerRef}
              dragElastic={0.1}
              dragMomentum={true}
              whileDrag={{ scale: 1.1, zIndex: 50, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2)" }}
              initial={{ 
                x: initialOffset.x, 
                y: initialOffset.y,
                rotate: getRandomRotation(i) 
              }}
              animate={controls}
              className="absolute left-1/2 top-1/2 -ml-16 -mt-16 w-32 h-32 bg-[#F9F9F9] rounded-sm shadow-md cursor-grab active:cursor-grabbing flex flex-col items-center justify-center p-4 border border-[#EEEEEE]"
            >
              <SoftwareIcon name={skill} />
              <span className="text-[10px] text-brand-text/70 text-center font-sans tracking-wide leading-tight">
                {skill}
              </span>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
