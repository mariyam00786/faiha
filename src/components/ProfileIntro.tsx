import Image from "next/image";

export function ProfileIntro() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center py-24 px-6 md:px-12 lg:px-24 overflow-hidden border-b border-brand-dark/10">
      
      {/* Decorative architectural background lines to match theme */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
         <div className="w-[1px] h-full bg-brand-dark absolute left-1/4" />
         <div className="w-[1px] h-full bg-brand-dark absolute left-2/4" />
         <div className="w-[1px] h-full bg-brand-dark absolute left-3/4" />
      </div>

      <div className="relative w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-end md:justify-between gap-12 md:gap-0">
        
        {/* Left Side: Image & PROFILE text */}
        <div className="relative w-full md:w-1/2 flex justify-center md:justify-start">
          
          {/* PROFILE Text Overlapping */}
          <div className="absolute -top-16 md:-top-24 left-0 md:-left-16 z-20 pointer-events-none select-none">
            <h2 className="font-serif text-7xl sm:text-8xl md:text-[10rem] leading-[0.85] text-brand-dark flex flex-col">
              <span className="tracking-[0.1em] font-normal">PRO</span>
              <span className="tracking-[0.1em] font-light ml-8 md:ml-16 italic opacity-90">FILE</span>
            </h2>
          </div>

          {/* The Image */}
          <div className="relative w-[85%] sm:w-[70%] md:w-[75%] lg:w-[65%] aspect-[3/4] mt-24 md:mt-12 z-10 shadow-2xl bg-brand-border">
            <Image
              src="/images/profile-intro.jpg"
              alt="Faiha Faisal"
              fill
              unoptimized
              className="object-cover grayscale-[20%]"
            />
          </div>
        </div>

        {/* Right Side: Name */}
        <div className="relative w-full md:w-1/2 flex flex-col justify-end items-end md:pb-12 z-10">
          <div className="text-right">
            <h3 className="font-serif text-6xl md:text-7xl lg:text-8xl text-brand-dark leading-none">Faiha</h3>
            <p className="font-sans text-sm md:text-lg tracking-[0.4em] uppercase text-brand-dark/80 mt-4 md:mt-6 font-light">
              FAISAL
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
