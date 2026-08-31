"use client";

import { motion } from "framer-motion";
import { siteData } from "@/data/site";
import Image from "next/image";

export function Hero() {
  return (
    <section className="min-h-screen pt-32 md:pt-48 pb-24 px-6 md:px-12 lg:px-24 flex flex-col md:flex-row justify-between md:items-start gap-16 relative">
      {/* Left side text */}
      <div className="max-w-2xl flex-1">
        <div className="font-serif italic text-5xl md:text-6xl lg:text-[5rem] leading-none mb-12 relative overflow-hidden">
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            Welcome, I&apos;m <br />
            {siteData.personal.name}
          </motion.div>
        </div>
        
        <motion.p 
          className="text-lg md:text-[1.35rem] leading-relaxed text-brand-text/90 mb-12 max-w-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {siteData.personal.philosophy}
        </motion.p>
        
        <motion.div 
          className="flex flex-wrap gap-8 text-[11px] tracking-[0.1em] uppercase border-b border-transparent w-max pb-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <a href={`mailto:${siteData.personal.email}`} className="border-b border-brand-text/30 hover:border-brand-text pb-0.5 transition-colors">
            {siteData.personal.email}
          </a>
          <a href={siteData.personal.linkedin} target="_blank" rel="noreferrer" className="border-b border-brand-text/30 hover:border-brand-text pb-0.5 transition-colors">
            LinkedIn
          </a>
          <a href={`tel:${siteData.personal.phone}`} className="border-b border-brand-text/30 hover:border-brand-text pb-0.5 transition-colors">
            Phone
          </a>
        </motion.div>
      </div>

      {/* Right side photo stack */}
      <motion.div 
        className="w-full max-w-[280px] mx-auto md:mx-0 relative pt-12 md:pt-0"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <h3 className="text-center font-serif italic text-lg mb-8 text-brand-text/80">MY STORY</h3>
        
        <div className="relative aspect-square w-full">
          {siteData.album.slice(0, 4).map((photo, i) => {
            // Calculate a slight rotation and offset for the stack effect
            const rotation = i === 3 ? 2 : i === 2 ? -4 : i === 1 ? 5 : -2;
            const offset = i === 3 ? "translate-x-0 translate-y-0" : i === 2 ? "translate-x-[-8px] translate-y-[4px]" : i === 1 ? "translate-x-[6px] translate-y-[-6px]" : "translate-x-[2px] translate-y-[8px]";
            const zIndex = 40 - i * 10;
            
            return (
              <div 
                key={i}
                className={`absolute inset-0 bg-[#F4F4F4] p-3 pb-12 shadow-[0_4px_20px_rgba(0,0,0,0.1)] border border-[#EAEAEA] ${offset}`}
                style={{ 
                  zIndex, 
                  transform: `rotate(${rotation}deg)`,
                  transformOrigin: "bottom center"
                }}
              >
                <div className="w-full h-full bg-[#E5E0D8] overflow-hidden relative flex items-center justify-center">
                  <span className="text-[10px] uppercase tracking-widest text-brand-text/40 font-sans text-center break-all p-2">
                    {photo}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
      
    </section>
  );
}
