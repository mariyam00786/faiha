"use client";

import { siteData } from "@/data/site";
import { Fragment } from "react";
import Image from "next/image";

export function AboutSection() {
  return (
    <section id="about" className="py-24 px-6 md:px-12 lg:px-24">
      <div className="mb-12">
        <h2 className="section-label">ABOUT ME</h2>
        <div className="divider-y" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
        
        {/* Left Column: Bio */}
        <div className="lg:col-span-7 order-2 lg:order-1">
          <div className="prose prose-lg prose-p:text-brand-text/80 prose-p:leading-[1.8] prose-p:font-sans prose-p:text-[15px] prose-p:mb-8">
            {siteData.about.bio.split('\n\n').map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
          <p className="mt-12 text-[15px] text-brand-text/80">Thank you for visiting and taking the time to learn more about me!</p>
        </div>

        {/* Right Column: Details */}
        <div className="lg:col-span-5 flex flex-col gap-12 order-1 lg:order-2">
          
          <div className="aspect-[4/5] w-full max-w-sm mx-auto lg:mx-0 bg-[#E5E0D8] relative overflow-hidden">
            <Image
              src={siteData.personal.profileImage}
              alt={siteData.personal.name}
              fill
              unoptimized
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 384px"
            />
          </div>

          <div>
            <h3 className="font-serif italic text-xl mb-4">Interests</h3>
            <p className="text-[13px] text-brand-text/80 leading-relaxed font-sans">
              {siteData.about.interests.map((interest, i) => (
                <Fragment key={i}>
                  {interest}
                  {i < siteData.about.interests.length - 1 && <span className="mx-2">·</span>}
                </Fragment>
              ))}
            </p>
          </div>

          {siteData.about.awards.length > 0 && (
            <div>
              <h3 className="font-serif italic text-xl mb-4">Awards / Recognition</h3>
              <ul className="text-[13px] text-brand-text/80 leading-relaxed font-sans space-y-2">
                {siteData.about.awards.map((award, i) => (
                  <li key={i}>{award}</li>
                ))}
              </ul>
            </div>
          )}

          {siteData.about.organizations.length > 0 && (
            <div>
              <h3 className="font-serif italic text-xl mb-4">Organizations / Involvement</h3>
              <p className="text-[13px] text-brand-text/80 leading-relaxed font-sans">
                {siteData.about.organizations.map((org, i) => (
                  <Fragment key={i}>
                    {org}
                    {i < siteData.about.organizations.length - 1 && <span className="mx-2">·</span>}
                  </Fragment>
                ))}
              </p>
            </div>
          )}

          <div>
            <h3 className="font-serif italic text-xl mb-4">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {siteData.about.skills.map((skill) => (
                <div 
                  key={skill}
                  className="px-3 py-1.5 border border-brand-border text-[11px] text-brand-text/70 uppercase tracking-widest font-sans"
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-serif italic text-xl mb-4">Languages</h3>
            <p className="text-[13px] text-brand-text/80 leading-relaxed font-sans">
              {siteData.about.languages.map((lang, i) => (
                <Fragment key={i}>
                  {lang}
                  {i < siteData.about.languages.length - 1 && <span className="mx-2">·</span>}
                </Fragment>
              ))}
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
