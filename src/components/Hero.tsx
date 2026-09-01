"use client";

import { motion } from "framer-motion";
import { siteData } from "@/data/site";

export function Hero() {
  return (
    <section className="h-screen w-full relative overflow-hidden">

      {/* Main Text Area - Positioned towards the center-bottom */}
      <div className="absolute left-0 right-0 bottom-[25%] md:bottom-[30%] flex flex-col items-center justify-center w-full">
        
        {/* Background blurred "PORTFOLIO" text */}
        <motion.div 
          className="absolute flex justify-center w-full pointer-events-none select-none z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <h1 
            className="text-[18vw] sm:text-[16vw] md:text-[14.5vw] font-black text-[#6B3737] opacity-60 blur-[2px] md:blur-[8px] tracking-tight uppercase leading-none whitespace-nowrap"
            style={{ transform: "scaleY(1.3)" }}
          >
            PORTFOLIO
          </h1>
        </motion.div>

        {/* Overlay cursive text */}
        <motion.div 
          className="relative z-10 text-center translate-y-[25%]"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
        >
          <h2 className="font-script text-[9vw] sm:text-[6vw] md:text-[4.5rem] text-[#592727] font-normal tracking-wide leading-none" style={{ textShadow: "0 1px 2px rgba(251,249,246,0.5)" }}>
            Learning. Unlearning. Shaping.
          </h2>
        </motion.div>
      </div>

      {/* Footer / Bottom text elements */}
      <motion.div 
        className="absolute bottom-10 left-0 right-0 px-6 md:px-16 flex justify-between items-center text-[10px] md:text-xs tracking-[0.2em] uppercase font-sans text-[#592727]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <div className="text-left w-1/3">
          {siteData.personal.name}
        </div>
        <div className="text-center w-1/3 tracking-[0.25em]">
          INTERIOR DESIGN
        </div>
        <div className="text-right w-1/3">
          SELECTED WORKS.
        </div>
      </motion.div>
    </section>
  );
}
