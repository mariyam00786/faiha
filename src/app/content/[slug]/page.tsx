import { contentsData } from "@/data/contents";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { FloatingNav } from "@/components/FloatingNav";
import { Footer } from "@/components/Footer";

export function generateStaticParams() {
  return contentsData.map((item) => ({
    slug: item.slug,
  }));
}

export default async function ContentGalleryPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const content = contentsData.find((c) => c.slug === resolvedParams.slug);

  if (!content) {
    notFound();
  }

  // Fallback for flat galleries
  const flatImages = content.gallery && content.gallery.length > 0 
    ? content.gallery 
    : Array(6).fill(content.image);

  return (
    <main className="min-h-screen flex flex-col bg-brand-bg">
      <FloatingNav />
      
      {/* Header */}
      <section className="pt-32 pb-16 px-6 md:px-12 lg:px-24 border-b border-brand-dark/10">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-brand-dark/60 hover:text-brand-dark transition-colors mb-12 uppercase tracking-widest text-xs font-sans"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
        
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-brand-dark mb-4 uppercase">
          {content.title}
        </h1>
        <p className="font-serif italic text-xl md:text-2xl text-brand-text/70 max-w-2xl">
          {content.description}
        </p>
      </section>

      {/* Render Distinct Projects if they exist */}
      {content.projects && content.projects.length > 0 ? (
        <div className="flex flex-col">
          {content.projects.map((project, idx) => (
            <section key={idx} className="py-24 px-6 md:px-12 lg:px-24 border-b border-brand-dark/10 last:border-b-0">
              <div className="max-w-4xl mb-16">
                <h2 className="font-sans text-2xl md:text-4xl tracking-widest uppercase text-brand-dark mb-6">
                  {project.title}
                </h2>
                <div className="w-12 h-1 bg-brand-dark mb-8" />
                <p className="font-serif italic text-lg md:text-2xl text-brand-text/80 leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Project Image Grid */}
              <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                {(project.images.length > 0 ? project.images : Array(3).fill(content.image)).map((img, imgIdx) => (
                  <div key={imgIdx} className="break-inside-avoid relative group overflow-hidden">
                    <div className={`relative w-full ${imgIdx % 3 === 0 ? 'aspect-square' : imgIdx % 2 === 0 ? 'aspect-[3/4]' : 'aspect-[4/3]'} bg-brand-border`}>
                      <Image
                        src={img}
                        alt={`${project.title} image ${imgIdx + 1}`}
                        fill
                        unoptimized
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : (
        /* Fallback Flat Gallery */
        <section className="px-6 md:px-12 lg:px-24 py-24 flex-grow">
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {flatImages.map((img, index) => (
              <div key={index} className="break-inside-avoid relative group overflow-hidden">
                <div className={`relative w-full ${index % 3 === 0 ? 'aspect-square' : index % 2 === 0 ? 'aspect-[3/4]' : 'aspect-[4/3]'} bg-brand-border`}>
                  <Image
                    src={img}
                    alt={`${content.title} detailed shot ${index + 1}`}
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              </div>
            ))}
          </div>
          
          {content.gallery.length === 0 && (
            <div className="text-center mt-12 p-8 border border-brand-dark/20 border-dashed text-brand-text/50 font-sans text-sm tracking-widest uppercase">
              Add images to the `{content.slug}` gallery array in src/data/contents.ts to see them here!
            </div>
          )}
        </section>
      )}

      <Footer />
    </main>
  );
}
