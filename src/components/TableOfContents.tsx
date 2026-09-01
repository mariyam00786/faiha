"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { contentsData } from "@/data/contents";

export function TableOfContents() {
  return (
    <section className="relative w-full min-h-screen py-16 md:py-24 overflow-hidden flex flex-col justify-center" id="content">
      <div className="px-6 md:px-12 lg:px-24 mb-12 md:mb-16 flex flex-col md:flex-row justify-end items-end md:items-center">
        <h2 className="font-serif text-6xl md:text-8xl lg:text-[10rem] tracking-tight text-brand-dark leading-none">
          CONTENT
        </h2>
        <div className="md:hidden mt-2">
          <span className="font-sans text-[10px] uppercase tracking-widest text-brand-dark/50">Swipe to explore &rarr;</span>
        </div>
      </div>

      {/* Horizontal scrolling container */}
      <div className="w-full overflow-x-auto pb-12 snap-x snap-mandatory px-6 md:px-12 lg:px-24 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <div className="flex gap-8 md:gap-16 min-w-max items-end pt-12">
          {contentsData.map((item, index) => (
            <motion.div
              key={item.id}
              className="relative flex flex-col w-[200px] md:w-[240px] shrink-0 snap-start"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {/* Number and Dashed Line Container */}
              <div className="relative pl-6">
                {/* The vertical dashed line */}
                <div className="absolute left-[3px] top-12 bottom-0 w-[1.5px] border-l-[2px] border-dashed border-brand-dark/50 z-0" />
                
                {/* The dot at the bottom of the line */}
                <div className="absolute left-[-2px] -bottom-[4px] w-[10px] h-[10px] bg-brand-dark rounded-full z-10" />

                {/* Big Number */}
                <h3 className="font-serif text-4xl md:text-5xl text-brand-dark mb-6 relative z-10 -ml-6 bg-[#FBF9F6] inline-block pr-2 leading-none">
                  {item.id}
                </h3>

                {/* Image Box */}
                <div className="w-full aspect-[4/5] bg-black/5 border border-black/10 mb-8 relative group overflow-hidden">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-xs text-brand-text/30 font-sans tracking-widest uppercase">
                      Image Placeholder
                    </div>
                  )}
                </div>
              </div>

              {/* Text Content Area */}
              <div className="mt-2 pl-6">
                {/* Main Category */}
                <div className="flex items-end justify-between border-b border-brand-dark/40 pb-1 mb-2">
                  <span className="font-sans text-xs md:text-sm uppercase tracking-widest text-brand-text max-w-[100%] leading-tight pr-2">
                    {item.title}
                  </span>
                </div>

                {/* Description */}
                <div className="mt-2">
                  <span className="font-serif italic text-xs md:text-sm tracking-wide text-brand-text/70 block leading-relaxed pr-2">
                    {item.description}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
