import { siteData } from "@/data/site";
import { FloatingNav } from "@/components/FloatingNav";
import { Footer } from "@/components/Footer";
import { ArrowDownToLine } from "lucide-react";

export default function ResumePage() {
  return (
    <main className="min-h-screen bg-brand-bg">
      <FloatingNav />
      
      <article className="pt-32 md:pt-48 pb-24 px-6 md:px-12 lg:px-24 max-w-5xl mx-auto">
        <header className="mb-16 md:mb-24 flex flex-col md:flex-row justify-between items-start md:items-end gap-8 border-b border-brand-border pb-12">
          <h1 className="font-serif italic text-4xl md:text-6xl lg:text-7xl">Resume</h1>
          <div className="flex flex-wrap items-center gap-3">
            <a 
              href={siteData.portfolioPdfLink || "/FAIHA_FAISAL_Portfolio.pdf"} 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-[11px] uppercase tracking-widest bg-[#25211e] text-[#FAF8F5] px-6 py-3 rounded-full hover:bg-[#3d3631] transition-colors shadow-sm"
            >
              Portfolio PDF <ArrowDownToLine className="w-4 h-4" />
            </a>
            <a 
              href={siteData.resumeLink} 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-[11px] uppercase tracking-widest border border-brand-border px-6 py-3 rounded-full hover:bg-brand-text/5 transition-colors"
            >
              Resume CV <ArrowDownToLine className="w-4 h-4" />
            </a>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-24">
          
          {/* Experience Section */}
          <section className="md:col-span-12 lg:col-span-7">
            <h2 className="section-label">EXPERIENCE</h2>
            <div className="flex flex-col gap-12">
              {siteData.about.experience.map((exp, i) => (
                <div key={i} className="group">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-baseline mb-2 gap-2">
                    <h3 className="font-serif italic text-2xl">{exp.title}</h3>
                    <span className="text-[11px] tracking-widest uppercase text-brand-text/60">{exp.location}</span>
                  </div>
                  <h4 className="text-sm font-semibold mb-4 text-brand-text/80 uppercase tracking-wide">{exp.company}</h4>
                  <p className="text-[15px] leading-relaxed text-brand-text/70">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Education & Skills Section */}
          <section className="md:col-span-12 lg:col-span-5 flex flex-col gap-16">
            
            <div>
              <h2 className="section-label">EDUCATION</h2>
              <div className="flex flex-col gap-8">
                {siteData.about.education.map((edu, i) => (
                  <div key={i}>
                    <h3 className="font-serif italic text-xl mb-1">{edu.degree}</h3>
                    <p className="text-[13px] text-brand-text/80 leading-relaxed mb-1">{edu.institution}</p>
                    <span className="text-[11px] tracking-widest uppercase text-brand-text/60">{edu.year}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="section-label">SKILLS</h2>
              <div className="flex flex-wrap gap-2">
                {siteData.about.skills.map((skill) => (
                  <div 
                    key={skill}
                    className="px-3 py-1.5 border border-brand-border text-[11px] text-brand-text/70 uppercase tracking-widest font-sans bg-white/50"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>

          </section>

        </div>
      </article>

      <Footer />
    </main>
  );
}
