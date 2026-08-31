import { siteData } from "@/data/site";
import { notFound } from "next/navigation";
import { FloatingNav } from "@/components/FloatingNav";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface PageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return siteData.projects.map((p) => ({
    slug: p.slug,
  }));
}

export default async function ProjectPage({ params }: PageProps) {
  const resolvedParams = await params;
  const project = siteData.projects.find((p) => p.slug === resolvedParams.slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-brand-bg">
      <FloatingNav />
      
      <article className="pt-32 md:pt-48 pb-24">
        {/* Header */}
        <header className="px-6 md:px-12 lg:px-24 mb-16 md:mb-24">
          <Link 
            href="/#work" 
            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-widest text-brand-text/60 hover:text-brand-text transition-colors mb-12"
          >
            <ArrowLeft className="w-3 h-3" /> Back to Projects
          </Link>

          <h1 className="font-serif italic text-4xl md:text-6xl lg:text-7xl mb-6">{project.title}</h1>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
            <p className="text-lg md:text-xl text-brand-text/80 max-w-2xl font-sans">
              {project.shortDescription}
            </p>
            
            <div className="flex flex-col gap-2 text-sm text-brand-text/60 text-right w-full md:w-auto border-t border-brand-border pt-4 md:border-none md:pt-0">
              <p><span className="uppercase tracking-widest text-[10px] mr-2">Category:</span> {project.category}</p>
              <p><span className="uppercase tracking-widest text-[10px] mr-2">Year:</span> {project.year}</p>
              {project.materials && (
                <p><span className="uppercase tracking-widest text-[10px] mr-2">Materials:</span> {project.materials.join(", ")}</p>
              )}
            </div>
          </div>
        </header>

        {/* Room-by-room sections */}
        <div className="flex flex-col gap-24 md:gap-32">
          {project.rooms.map((room) => (
            <section key={room.name}>
              <div className="px-6 md:px-12 lg:px-24 mb-8">
                <h2 className="section-label">{room.name}</h2>
                <div className="divider-y" />
              </div>
              
              <div className="px-6 md:px-12 lg:px-24">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {room.images.map((image, i) => (
                    <div 
                      key={i} 
                      className={`relative aspect-[4/3] bg-[#EAE8E3] overflow-hidden ${
                        i === 0 && room.images.length % 2 !== 0 ? 'md:col-span-2 aspect-[16/9]' : ''
                      }`}
                    >
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-[10px] uppercase tracking-widest text-brand-text/40 font-sans text-center break-all p-4">
                          {image}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          ))}
        </div>

      </article>

      <Footer />
    </main>
  );
}
