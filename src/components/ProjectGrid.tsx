"use client";

import Link from "next/link";
import { siteData } from "@/data/site";
import { motion } from "framer-motion";

export function ProjectGrid() {
  return (
    <>
      <section className="max-w-[1320px] mx-auto px-5 pb-5 mt-16 md:mt-24">
        <h3 className="tracking-[0.18em] uppercase text-[#9c9188] border-b-[1.5px] border-[#2c272347] m-0 pb-4 font-sans text-[11px] font-normal">
          Selected Works
        </h3>
      </section>

      <section id="projects" className="max-w-[1320px] mx-auto px-5 pb-20 scroll-mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[6px]">
        {siteData.projects.map((project) => (
          <Link
            key={project.slug}
            href={`/project/${project.slug}`}
            className="group relative block aspect-[4/3] bg-[#ede9e3] overflow-hidden"
          >
            {/* Image */}
            <div className="absolute inset-0 w-full h-full bg-[#E5E0D8]">
              <img 
                src={project.heroImage} 
                alt={project.title} 
                className="object-cover w-full h-full block transition-all duration-[1.4s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06] group-hover:saturate-[0.88] group-hover:brightness-[0.96]" 
              />
            </div>

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-[#0d0c0b61] opacity-0 group-hover:opacity-100 flex flex-col justify-center items-center p-6 text-center backdrop-blur-[2px] transition-all duration-[0.85s] ease-[cubic-bezier(0.22,1,0.36,1)] z-20 pointer-events-none">
              <h2 className="text-[#f6f2ea] m-0 font-serif text-[27px] font-light leading-[1.15] opacity-0 translate-y-[12px] group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-[0.75s] ease-[cubic-bezier(0.22,1,0.36,1)] delay-[180ms]">
                {project.title}
                <span className="block mx-auto mt-[11px] h-[1px] bg-[#f6f2ea80] w-0 group-hover:w-[46px] transition-all duration-[0.9s] ease-[cubic-bezier(0.22,1,0.36,1)] delay-[340ms]"></span>
              </h2>
              <p className="tracking-[0.22em] uppercase text-[#f6f2eac2] m-0 mt-[11px] text-[10.5px] opacity-0 translate-y-[10px] group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-[0.75s] ease-[cubic-bezier(0.22,1,0.36,1)] delay-[420ms]">
                {project.category}
              </p>
            </div>
          </Link>
        ))}
      </section>
    </>
  );
}
