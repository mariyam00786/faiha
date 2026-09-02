import Image from "next/image";
import { siteData } from "@/data/site";
import { Typewriter } from "./Typewriter";

export function ProfileIntro() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center py-24 px-6 md:px-12 lg:px-24 overflow-hidden border-b border-brand-dark/10">
      
      {/* Decorative architectural background lines to match theme */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
         <div className="w-[1px] h-full bg-brand-dark absolute left-1/4" />
         <div className="w-[1px] h-full bg-brand-dark absolute left-2/4" />
         <div className="w-[1px] h-full bg-brand-dark absolute left-3/4" />
      </div>

      {/* Subtle color warmth */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[50vw] h-[80vh] bg-brand-border/30 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="relative w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-20 items-center">
        
        {/* Left Side: Image */}
        <div className="md:col-span-5 relative w-full aspect-[4/5] z-10 bg-brand-border shadow-lg group">
          <Image
            src="/images/profile-hero.png"
            alt="Faiha Faisal"
            fill
            unoptimized
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>

        {/* Right Side: Text Content */}
        <div className="md:col-span-7 flex flex-col justify-center z-10 pl-0 md:pl-8 lg:pl-16">
          
          <h2 className="font-sans font-bold text-4xl md:text-5xl lg:text-6xl text-brand-dark leading-snug uppercase tracking-wide mb-12">
            FAIHA FAISAL
          </h2>

          <div className="font-sans text-xl md:text-2xl text-brand-dark mb-6 flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
            <span className="font-bold uppercase tracking-widest text-brand-text">HELLO!</span>
            <span className="hidden md:block w-8 h-[2px] bg-brand-text/40"></span>
            <span className="font-serif italic text-brand-dark h-8 flex items-center">
              I&apos;m <span className="ml-[6px]"><Typewriter /></span>
            </span>
          </div>
          
          <div className="prose prose-p:font-sans prose-p:italic prose-p:text-brand-dark/90 prose-p:leading-[1.8] text-[14px] md:text-[15px] max-w-2xl mb-12">
            {siteData.about.bio.split('\n\n').slice(0, 2).map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-6">
            <p className="font-sans italic text-brand-dark/70 text-sm">
              {siteData.personal.email}
            </p>
            
            <div className="flex flex-wrap items-center gap-4">
              <a 
                href={siteData.portfolioPdfLink || "/FAIHA_FAISAL_Portfolio.pdf"} 
                target="_blank" 
                rel="noopener noreferrer"
                className="group/btn flex items-center gap-3 px-6 py-3 bg-[#25211E] text-[#FAF8F5] border border-[#25211E] hover:bg-[#3d3631] transition-colors duration-300 shadow-sm"
              >
                <span className="font-sans text-xs tracking-widest uppercase font-medium">
                  Portfolio PDF
                </span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform duration-300 group-hover/btn:translate-x-1">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>

              <a 
                href={siteData.resumeLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="group/btn flex items-center gap-3 px-6 py-3 border border-brand-dark/20 hover:border-brand-dark transition-colors duration-300 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-brand-dark transform -translate-x-full transition-transform duration-300 ease-out group-hover/btn:translate-x-0" />
                <span className="font-sans text-xs tracking-widest uppercase text-brand-dark group-hover/btn:text-white relative z-10 transition-colors duration-300">
                  Resume
                </span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-brand-dark group-hover/btn:text-white relative z-10 transition-transform duration-300 group-hover/btn:translate-x-1">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
