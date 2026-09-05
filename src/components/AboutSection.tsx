"use client";

import { siteData } from "@/data/site";
import { Fragment } from "react";
import Image from "next/image";

export function AboutSection() {
  return (
    <section 
      id="about" 
      className="w-full min-h-[calc(100vh-5rem)] lg:min-h-screen flex flex-col justify-center py-12 md:py-16 lg:py-20 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto scroll-mt-20 md:scroll-mt-24"
    >
      {/* Top horizontal divider line spanning across */}
      <div className="w-full h-[1px] bg-brand-border/70 mb-8 md:mb-10 lg:mb-12" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-0 items-start">
        
        {/* Left Column: Title & Bio Story */}
        <div className="lg:col-span-7 pr-0 lg:pr-10 xl:pr-14 flex flex-col">
          <h2 className="font-serif italic text-3xl md:text-4xl text-brand-text font-normal mb-6 md:mb-7 tracking-tight">
            About Me
          </h2>

          <div className="space-y-4 md:space-y-5 text-[14px] md:text-[14.5px] text-brand-text/85 leading-[1.75] font-sans">
            {siteData.about.bio.split('\n\n').map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
            <p className="pt-1 text-brand-text/85 font-medium">
              Thank you for visiting and taking the time to learn more about me!
            </p>
          </div>
        </div>

        {/* Right Column: Photo & Structured Details */}
        <div className="lg:col-span-5 border-t lg:border-t-0 lg:border-l border-brand-border/70 pt-8 lg:pt-0 pl-0 lg:pl-10 xl:pl-14 flex flex-col">
          
          {/* Photo: Compact portrait matching reference */}
          <div className="w-[180px] sm:w-[200px] lg:w-[190px] xl:w-[210px] aspect-[4/5] relative overflow-hidden rounded-[2px] bg-brand-border/40 mb-6 border border-brand-border/60 shadow-xs">
            <Image
              src={siteData.personal.profileImage}
              alt={siteData.personal.name}
              fill
              unoptimized
              className="object-cover object-top"
              sizes="(max-width: 768px) 200px, 220px"
              priority
            />
          </div>

          {/* Interests */}
          {siteData.about.interests && siteData.about.interests.length > 0 && (
            <div className="mb-5">
              <h3 className="font-serif italic text-[16px] text-brand-text font-normal mb-1.5">
                Interests
              </h3>
              <p className="text-[13px] text-brand-text/80 leading-[1.7] font-sans">
                {siteData.about.interests.map((interest, i) => (
                  <Fragment key={i}>
                    <span>{interest}</span>
                    {i < siteData.about.interests.length - 1 && (
                      <span className="mx-1.5 text-brand-text/40">·</span>
                    )}
                  </Fragment>
                ))}
              </p>
            </div>
          )}

          {/* Awards / Recognition */}
          {siteData.about.awards && siteData.about.awards.length > 0 && (
            <div className="mb-5">
              <h3 className="font-serif italic text-[16px] text-brand-text font-normal mb-1.5">
                Awards / Recognition
              </h3>
              <ul className="text-[13px] text-brand-text/80 leading-[1.7] font-sans space-y-1">
                {siteData.about.awards.map((award, i) => (
                  <li key={i}>{award}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Organizations / Involvement */}
          {siteData.about.organizations && siteData.about.organizations.length > 0 && (
            <div className="mb-5">
              <h3 className="font-serif italic text-[16px] text-brand-text font-normal mb-1.5">
                Organizations / Involvement
              </h3>
              <p className="text-[13px] text-brand-text/80 leading-[1.7] font-sans">
                {siteData.about.organizations.map((org, i) => (
                  <Fragment key={i}>
                    <span>{org}</span>
                    {i < siteData.about.organizations.length - 1 && (
                      <span className="mx-1.5 text-brand-text/40">·</span>
                    )}
                  </Fragment>
                ))}
              </p>
            </div>
          )}

          {/* Skills Badges / Pills */}
          {siteData.about.skills && siteData.about.skills.length > 0 && (
            <div>
              <h3 className="font-serif italic text-[16px] text-brand-text font-normal mb-2.5">
                Skills
              </h3>
              <div className="flex flex-wrap gap-1.5 md:gap-2">
                {siteData.about.skills.map((skill) => (
                  <span 
                    key={skill}
                    className="px-2.5 py-1 border border-brand-border/90 bg-white/50 text-[12px] text-brand-text/80 font-sans rounded-[2px] hover:border-brand-text/60 hover:bg-white transition-all shadow-2xs inline-block"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
