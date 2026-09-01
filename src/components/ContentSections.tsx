"use client";

import { contentsData } from "@/data/contents";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function ContentSections() {
  return (
    <div className="w-full flex flex-col relative z-10" id="content-sections">
      {contentsData.map((item, index) => {
        const isEven = index % 2 !== 0;

        return (
          <section
            key={item.id}
            className="min-h-[70vh] md:min-h-screen w-full flex flex-col md:flex-row relative overflow-hidden border-t border-brand-dark/10 group cursor-pointer"
          >
            <Link href={`/content/${item.slug}`} className="absolute inset-0 z-20" aria-label={`Explore ${item.title} Gallery`} />

            {/* Image Side */}
            <motion.div 
              className={`w-full md:w-1/2 h-[50vh] md:h-auto relative overflow-hidden ${
                isEven ? "md:order-2 border-l border-brand-dark/10" : "md:order-1 border-r border-brand-dark/10"
              }`}
              initial={{ opacity: 0, scale: 1.05 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                quality={100}
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0 grayscale"
              />
            </motion.div>

            {/* Text Side */}
            <div 
              className={`w-full md:w-1/2 flex flex-col justify-center px-8 py-16 md:px-16 lg:px-24 bg-transparent ${
                isEven ? "md:order-1" : "md:order-2"
              }`}
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true, margin: "-100px" }}
                className="relative"
              >
                <h2 className="font-serif text-5xl md:text-7xl lg:text-9xl text-brand-dark mb-4 md:mb-6 opacity-20 transition-opacity duration-500 group-hover:opacity-40">
                  {item.id}
                </h2>
                <h3 className="font-sans text-3xl md:text-4xl lg:text-5xl tracking-widest uppercase text-brand-dark mb-4 group-hover:text-brand-text transition-colors duration-500">
                  {item.title}
                </h3>
                <div className="w-12 h-1 bg-brand-dark mb-6 md:mb-8 transition-all duration-500 group-hover:w-24 group-hover:bg-brand-text" />
                <p className="font-serif italic text-lg md:text-2xl text-brand-text/80 leading-relaxed max-w-xl mb-8">
                  {item.description}
                </p>
                
                <div className="flex items-center gap-2 text-brand-dark opacity-100 transform translate-y-0 md:opacity-0 md:translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                  <span className="font-sans text-sm tracking-[0.2em] uppercase">Explore Gallery</span>
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </motion.div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
