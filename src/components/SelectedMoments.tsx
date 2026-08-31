"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useAnimation, useMotionValue } from "framer-motion";
import { siteData } from "@/data/site";

export function SelectedMoments() {
  const [carouselWidth, setCarouselWidth] = useState(0);
  const carousel = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (carousel.current) {
      setCarouselWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
    }
  }, []);

  return (
    <section className="py-24 overflow-hidden">
      <div className="px-6 md:px-12 lg:px-24 mb-12">
        <h2 className="section-label">SELECTED MOMENTS</h2>
        <div className="divider-y" />
      </div>

      <motion.div 
        ref={carousel} 
        className="cursor-grab active:cursor-grabbing px-6 md:px-12 lg:px-24"
        whileTap={{ cursor: "grabbing" }}
      >
        <motion.div 
          drag="x"
          dragConstraints={{ right: 0, left: -carouselWidth }}
          className="flex gap-4 w-max"
        >
          {siteData.moments.map((moment, i) => (
            <motion.div 
              key={i} 
              className="min-w-[280px] md:min-w-[400px] h-[300px] md:h-[450px] bg-[#E5E0D8] relative pointer-events-none"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                 <span className="text-[10px] uppercase tracking-widest text-brand-text/40 font-sans text-center break-all p-4">
                   {moment}
                 </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
