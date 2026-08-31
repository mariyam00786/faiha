"use client";

import Link from "next/link";
import { siteData } from "@/data/site";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export function ProjectGrid() {
  return (
    <section id="work" className="py-24">
      <div className="px-6 md:px-12 lg:px-24 mb-12">
        <h2 className="section-label">SELECTED WORKS</h2>
        <div className="divider-y" />
      </div>

      <div className="px-6 md:px-12 lg:px-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          {siteData.projects.map((project) => (
            <Link 
              key={project.slug} 
              href={`/project/${project.slug}`}
              className="group block"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-[#EAE8E3]">
                {/* Image Placeholder */}
                <motion.div 
                  className="absolute inset-0 w-full h-full flex items-center justify-center bg-[#E5E0D8]"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  <span className="text-[10px] uppercase tracking-widest text-brand-text/40 font-sans text-center break-all p-4 z-10">
                    {project.heroImage}
                  </span>
                </motion.div>
                
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-brand-text/0 group-hover:bg-brand-text/10 transition-colors duration-300 z-20 pointer-events-none" />
              </div>
              
              <div className="py-4">
                <h3 className="font-serif italic text-xl mb-1 group-hover:opacity-70 transition-opacity">
                  {project.title}
                </h3>
                <p className="text-[11px] tracking-[0.1em] uppercase text-brand-text/60">
                  {project.category}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
