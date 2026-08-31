"use client";

import { siteData } from "@/data/site";
import { motion } from "framer-motion";

export function Footer() {
  const marqueeText = Array(10).fill(`${siteData.personal.name} · `).join("");

  return (
    <footer id="contact" className="bg-[#38322B] text-[#F7F6F2] overflow-hidden">
      
      <div className="px-6 md:px-12 lg:px-24 pt-24 pb-16 flex flex-col md:flex-row justify-between gap-16">
        
        {/* Left Side: Contact */}
        <div>
          <h2 className="font-serif italic text-2xl mb-8">Interior Design · Visual Art</h2>
          <a 
            href={`mailto:${siteData.personal.email}`}
            className="text-[13px] text-[#F7F6F2]/70 hover:text-[#F7F6F2] transition-colors border-b border-[#F7F6F2]/30 pb-1 font-sans"
          >
            {siteData.personal.email}
          </a>
        </div>

        {/* Right Side: Links Grid */}
        <div className="grid grid-cols-2 gap-16 md:gap-32">
          <div>
            <h3 className="text-[10px] tracking-[0.2em] uppercase text-[#F7F6F2]/40 font-sans mb-6">Social</h3>
            <ul className="flex flex-col gap-4 text-[13px] font-sans text-[#F7F6F2]/80">
              <li>
                <a href={siteData.personal.linkedin} target="_blank" rel="noreferrer" className="hover:text-[#F7F6F2] transition-colors">LinkedIn</a>
              </li>
              <li>
                <a href={`tel:${siteData.personal.phone}`} className="hover:text-[#F7F6F2] transition-colors">Phone</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-[10px] tracking-[0.2em] uppercase text-[#F7F6F2]/40 font-sans mb-6">Sections</h3>
            <ul className="flex flex-col gap-4 text-[13px] font-sans text-[#F7F6F2]/80">
              <li><a href="/#about" className="hover:text-[#F7F6F2] transition-colors">About</a></li>
              <li><a href="/#work" className="hover:text-[#F7F6F2] transition-colors">Projects</a></li>
              <li><a href="/resume" className="hover:text-[#F7F6F2] transition-colors">Resume</a></li>
              <li><a href={siteData.resumeLink} target="_blank" rel="noreferrer" className="hover:text-[#F7F6F2] transition-colors">Portfolio PDF</a></li>
            </ul>
          </div>
        </div>

      </div>

      {/* Marquee */}
      <div className="w-full border-t border-b border-[#F7F6F2]/10 py-6 md:py-10 flex whitespace-nowrap overflow-hidden relative">
        <motion.div 
          className="font-serif italic text-6xl md:text-8xl lg:text-[7rem] leading-none text-[#F7F6F2] pr-8"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 30, repeat: Infinity }}
        >
          {marqueeText}
        </motion.div>
      </div>

      {/* Copyright */}
      <div className="px-6 md:px-12 lg:px-24 py-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] font-sans text-[#F7F6F2]/40 tracking-wider">
        <p>© {new Date().getFullYear()} {siteData.personal.name}. All rights reserved.</p>
        <p className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#F7F6F2]/40" />
          Based in {siteData.personal.location}
        </p>
      </div>

    </footer>
  );
}
