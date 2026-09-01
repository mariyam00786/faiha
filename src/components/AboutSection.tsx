"use client";

import { siteData } from "@/data/site";
import { Fragment } from "react";
import Image from "next/image";

export function AboutSection() {
  return (
    <section id="about" className="max-w-6xl mx-auto py-32 px-6 md:px-12 lg:px-24 border-t border-brand-border mt-12">
      <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
        
        {/* Left Column: Bio */}
        <div className="flex-1 lg:flex-[1.2] order-2 lg:order-1">
          <h2 className="font-sans text-3xl md:text-4xl font-normal text-brand-dark mb-10 tracking-wide">
            About Me
          </h2>
          <div className="flex flex-col gap-6 text-[15px] leading-[1.8] text-brand-dark/80 font-sans">
            {siteData.about.bio.split('\n\n').map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
            <p>Thank you for visiting and taking the time to learn more about me!</p>
          </div>
        </div>

        {/* Right Column: Details */}
        <div className="flex-1 flex flex-col gap-10 order-1 lg:order-2">
          
          <div className="w-full aspect-[4/5] bg-brand-border relative overflow-hidden">
            <Image
              src={siteData.personal.profileImage}
              alt={siteData.personal.name}
              fill
              unoptimized
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          <div>
            <h3 className="font-sans text-lg font-medium text-brand-dark mb-3">Interests</h3>
            <p className="text-[14px] text-brand-dark/70 leading-relaxed font-sans">
              {siteData.about.interests.map((interest, i) => (
                <Fragment key={i}>
                  {interest}
                  {i < siteData.about.interests.length - 1 && <span className="mx-3 whitespace-pre">·</span>}
                </Fragment>
              ))}
            </p>
          </div>

          {siteData.about.awards.length > 0 && (
            <div>
              <h3 className="font-sans text-lg font-medium text-brand-dark mb-3">Awards / Recognition</h3>
              <ul className="text-[14px] text-brand-dark/70 leading-relaxed font-sans space-y-2">
                {siteData.about.awards.map((award, i) => (
                  <li key={i}>{award}</li>
                ))}
              </ul>
            </div>
          )}

          {siteData.about.organizations.length > 0 && (
            <div>
              <h3 className="font-sans text-lg font-medium text-brand-dark mb-3">Organizations / Involvement</h3>
              <p className="text-[14px] text-brand-dark/70 leading-relaxed font-sans">
                {siteData.about.organizations.map((org, i) => (
                  <Fragment key={i}>
                    {org}
                    {i < siteData.about.organizations.length - 1 && <span className="mx-3 whitespace-pre">·</span>}
                  </Fragment>
                ))}
              </p>
            </div>
          )}

          <div>
            <h3 className="font-sans text-lg font-medium text-brand-dark mb-4">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {siteData.about.skills.map((skill) => (
                <span 
                  key={skill}
                  className="bg-brand-dark/5 px-3 py-1.5 text-[13px] text-brand-dark/90 font-sans rounded-md"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-sans text-lg font-medium text-brand-dark mb-3">Languages</h3>
            <p className="text-[14px] text-brand-dark/70 leading-relaxed font-sans">
              {siteData.about.languages.map((lang, i) => (
                <Fragment key={i}>
                  {lang}
                  {i < siteData.about.languages.length - 1 && <span className="mx-3 whitespace-pre">·</span>}
                </Fragment>
              ))}
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
