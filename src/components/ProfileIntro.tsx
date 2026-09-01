import Image from "next/image";
import { siteData } from "@/data/site";

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
        <div className="md:col-span-5 relative w-full aspect-[4/5] z-10 bg-brand-border shadow-lg">
          <Image
            src="/images/profile-intro.jpg"
            alt="Faiha Faisal"
            fill
            unoptimized
            className="object-cover"
          />
        </div>

        {/* Right Side: Text Content */}
        <div className="md:col-span-7 flex flex-col justify-center z-10">
          
          <h2 className="font-sans font-bold text-4xl md:text-5xl lg:text-6xl text-brand-dark leading-snug uppercase tracking-wide mb-16">
            FAIHA<br/>FAISAL
          </h2>

          <h3 className="font-sans font-bold text-xl md:text-2xl text-brand-text uppercase tracking-widest mb-6 flex items-center gap-4">
            HELLO!
            <div className="h-[2px] w-12 bg-brand-text/40"></div>
          </h3>
          
          <div className="prose prose-p:font-sans prose-p:italic prose-p:text-brand-dark/90 prose-p:leading-[1.8] text-[14px] md:text-[15px] max-w-2xl mb-12">
            {siteData.about.bio.split('\n\n').map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>

          <p className="font-sans italic text-brand-dark/70 text-sm">
            {siteData.personal.email}
          </p>

        </div>

      </div>
    </section>
  );
}
