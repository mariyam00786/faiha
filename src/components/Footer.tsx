"use client";

import { siteData } from "@/data/site";

export function Footer() {
  const marqueeGroupText = Array(6).fill(`${siteData.personal.name} · \u00a0`).join("");

  return (
    <footer id="contact" className="siteFooter bg-[#592727] text-[#f5efe6] mt-[100px] overflow-hidden">
      
      {/* Top Section */}
      <div className="max-w-[1320px] mx-auto px-5 pt-[44px] md:pt-[56px] pb-[32px] md:pb-[40px] flex flex-col md:flex-row justify-between items-start gap-7 md:gap-10">
        
        {/* Left Side: Tagline & Email */}
        <div className="footerIntro">
          <p className="font-serif italic font-light text-[22px] text-[#f0e6d8] mb-[14px] leading-tight">
            Interior Design · Visual Art
          </p>
          <a 
            href={`mailto:${siteData.personal.email}`}
            className="text-[13px] tracking-[0.04em] text-[#c9b8a4] hover:text-[#f0e6d8] transition-colors border-b border-[#f0e6d8]/30 hover:border-[#f0e6d8] pb-0.5 inline-block font-sans"
          >
            {siteData.personal.email}
          </a>
        </div>

        {/* Right Side: Columns */}
        <div className="flex gap-9 md:gap-16">
          <div>
            <h4 className="text-[11px] tracking-[0.16em] uppercase text-[#9c8a76] font-sans font-normal mb-3">
              Social
            </h4>
            <div className="flex flex-col gap-2 text-[13px] font-sans text-[#c9b8a4]">
              <a 
                href={siteData.personal.linkedin} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-[#f0e6d8] transition-colors"
              >
                LinkedIn
              </a>
              {siteData.personal.phone && (
                <a 
                  href={`tel:${siteData.personal.phone}`} 
                  className="hover:text-[#f0e6d8] transition-colors"
                >
                  Phone
                </a>
              )}
            </div>
          </div>
          
          <div>
            <h4 className="text-[11px] tracking-[0.16em] uppercase text-[#9c8a76] font-sans font-normal mb-3">
              Sections
            </h4>
            <div className="flex flex-col gap-2 text-[13px] font-sans text-[#c9b8a4]">
              <a href="/#about" className="hover:text-[#f0e6d8] transition-colors">
                About
              </a>
              <a href="/#projects" className="hover:text-[#f0e6d8] transition-colors">
                Projects
              </a>
              <a href="/resume" target="_blank" rel="noopener noreferrer" className="hover:text-[#f0e6d8] transition-colors">
                Resume
              </a>
              <a 
                href={siteData.portfolioPdfLink || "/FAIHA_FAISAL_Portfolio.pdf"} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-[#f0e6d8] transition-colors"
              >
                Portfolio PDF
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* Marquee Banner */}
      <div 
        className="marquee-wrap w-full overflow-hidden border-t border-b border-[#f0e6d8]/15 py-3 md:py-[18px] whitespace-nowrap cursor-default" 
        aria-hidden="true"
      >
        <div className="marquee-track flex w-max will-change-transform">
          <span className="shrink-0 font-[family-name:var(--font-bodoni)] font-serif italic font-normal text-[40px] md:text-[76px] leading-none tracking-[0.02em] text-[#f5efe6] select-none">
            {marqueeGroupText}
          </span>
          <span className="shrink-0 font-[family-name:var(--font-bodoni)] font-serif italic font-normal text-[40px] md:text-[76px] leading-none tracking-[0.02em] text-[#f5efe6] select-none">
            {marqueeGroupText}
          </span>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-[1320px] mx-auto px-5 pt-5 md:pt-6 pb-8 md:pb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-3 text-[12px] font-sans text-[#9c8a76]">
        <p>© {new Date().getFullYear()} {siteData.personal.name}. All rights reserved.</p>
        <p className="flex items-center gap-2">
          <span className="dot-pulse w-1.5 h-1.5 rounded-full bg-[#b08a63] inline-block" aria-hidden="true" />
          Based in {siteData.personal.location}
        </p>
      </div>

    </footer>
  );
}
