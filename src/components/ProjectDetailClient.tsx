"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { ArrowLeft, Maximize2, X, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import "@/app/project-page.css"; // Ensure you import the custom CSS

interface Project {
  slug: string;
  title: string;
  concept?: string;
  category: string;
  year: string;
  facts?: { label: string; value: string }[];
  heroImage: string;
  shortDescription: string;
  descriptionParagraphs?: string[];
  software?: string[];
  images?: string[];
  materials?: string[];
  rooms?: any[];
}

interface Props {
  project: Project;
}

const drawingTitles: Record<string, string> = {
  "drawing-1.png": "Sheet 01 · Ground Floor Working Plan",
  "drawing-2.png": "Sheet 02 · First Floor Working Plan",
  "drawing-3.png": "Sheet 03 · Ground Floor Electrical Layout",
  "drawing-4.png": "Sheet 04 · First Floor Electrical Layout",
  "drawing-5.png": "Sheet 05 · Ground Floor Plumbing Layout",
  "drawing-6.png": "Sheet 06 · Ground Floor Ceiling Layout",
  "drawing-7.png": "Sheet 07 · First Floor Ceiling Layout",
  "drawing-8.png": "Sheet 08 · Flooring Layout",
  "WARDROBE.jpg.jpeg": "Detail Sheet 09 · Built-in Wardrobe Elevation & Sections",
  "WARDROBE DETAIL.jpg.jpeg": "Detail Sheet 10 · Built-in Wardrobe Millwork & Internal Dimensions",
  "wall with kttl.jpg.jpeg": "Detail Sheet 11 · Wall Paneling & Bed Headboard Joinery Detail",
  "KATTL WITH SIDE TABLE.jpg.jpeg": "Detail Sheet 12 · Master Cot (Kattl) & Bedside Table Joinery",
  "11.png": "Master Suite · Ambient Bedroom Perspective & Bed",
  "22.png": "Master Suite · Built-in Wardrobe Elevation & Door"
};

function getImageTitle(path: string): string | null {
  const filename = path.split("/").pop() || "";
  return drawingTitles[filename] || null;
}

export function ProjectDetailClient({ project }: Props) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [gallerySlide, setGallerySlide] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [progressKey, setProgressKey] = useState(0); // To reset CSS animation

  // Use the images array from project data, fallback to heroImage if empty
  const images = project.images && project.images.length > 0 
    ? project.images 
    : Array(6).fill(project.heroImage);

  // Auto-advance carousel (pause when lightbox is open)
  useEffect(() => {
    if (isLightboxOpen) return;
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % images.length);
      setProgressKey((prev) => prev + 1);
    }, 6000);
    return () => clearInterval(timer);
  }, [images.length, isLightboxOpen]);

  const handleNext = useCallback(() => {
    setActiveSlide((prev) => (prev + 1) % images.length);
    setProgressKey((prev) => prev + 1);
  }, [images.length]);

  const handlePrev = useCallback(() => {
    setActiveSlide((prev) => (prev - 1 + images.length) % images.length);
    setProgressKey((prev) => prev + 1);
  }, [images.length]);

  const handleThumbClick = (index: number) => {
    setActiveSlide(index);
    setProgressKey((prev) => prev + 1);
  };

  const handleGalleryClick = () => {
    setGallerySlide((prev) => (prev + 1) % images.length);
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!isLightboxOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsLightboxOpen(false);
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLightboxOpen, handleNext, handlePrev]);

  return (
    <>
      <section className="projectTitleBar">
        <h1>{project.title}</h1>
        <p className="projectConcept">{project.concept || project.category}</p>
      </section>

      <section className="projectDetailPage">
        <aside className="projectDetailText">
          <div className="projectFacts">
            {project.facts && project.facts.length > 0 ? (
              project.facts.map((fact, idx) => (
                <p key={idx}><strong>{fact.label}</strong> — {fact.value}</p>
              ))
            ) : (
              <>
                <p><strong>Year</strong> — {project.year}</p>
                <p><strong>Category</strong> — {project.category}</p>
              </>
            )}
          </div>
          
          {project.descriptionParagraphs && project.descriptionParagraphs.length > 0 ? (
            project.descriptionParagraphs.map((para, idx) => (
              <p 
                key={idx} 
                className="descPara" 
                style={{ animationDelay: `${0.15 + idx * 0.25}s` }}
                dangerouslySetInnerHTML={{ __html: para }}
              />
            ))
          ) : (
            <p className="descPara" style={{ animationDelay: "0.15s" }}>
              {project.shortDescription}
            </p>
          )}

          <div className="software">
            {(project.software || ["AutoCAD", "SketchUp", "Photoshop"]).map((sw, idx) => (
              <span key={idx} className="softwareChip">
                {sw}
              </span>
            ))}
          </div>
        </aside>

        <section className="projectImageSide">
          {/* Header Bar with Sheet Title / Image Number & Inspect Button */}
          <div className="flex items-center justify-between text-xs py-2 px-3 bg-white/80 backdrop-blur border border-[#2c27231a] mb-2 rounded-[2px] transition-all">
            <div className="flex items-center gap-2 text-brand-dark/90 font-medium truncate pr-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#b08a63] shrink-0" />
              <span className="truncate">
                {getImageTitle(images[activeSlide]) || `${project.title} · Slide ${activeSlide + 1} of ${images.length}`}
              </span>
            </div>
            <button 
              type="button"
              onClick={() => setIsLightboxOpen(true)}
              className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-brand-dark/80 hover:text-brand-dark transition-colors px-2.5 py-1 rounded bg-[#2c27230a] hover:bg-[#2c272318] shrink-0 font-sans cursor-pointer"
              title="Inspect drawing in high-resolution fullscreen"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Inspect Full Size</span>
            </button>
          </div>

          <div className="projectCarousel">
            <div 
              className="projectCarouselTrack" 
              ref={carouselRef}
              style={{
                transform: `translateX(-${activeSlide * 100}%)`,
                transition: "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)"
              }}
            >
              {images.map((img, idx) => (
                <div className="projectCarouselSlide" key={idx}>
                  <img src={img} alt="" aria-hidden="true" className="slideBackdrop" draggable="false" />
                  <img src={img} alt={`${project.title} — image ${idx + 1}`} className="slideImage" draggable="false" />
                </div>
              ))}
            </div>

            <div className="projectProgress">
              <div 
                key={progressKey}
                className="projectProgressFill" 
                style={{ animationDuration: "5000ms", animationPlayState: "running" }}
              />
            </div>

            <button className="projectCarouselArrow left" aria-label="Previous image" onClick={handlePrev}>‹</button>
            <button className="projectCarouselArrow right" aria-label="Next image" onClick={handleNext}>›</button>
          </div>

          <div className="projectThumbs">
            {images.map((img, idx) => (
              <button 
                key={idx}
                className={activeSlide === idx ? "activeThumb" : ""}
                aria-label={`Go to image ${idx + 1}`}
                onClick={() => handleThumbClick(idx)}
              >
                <img src={img} alt="" draggable="false" />
                <span className="thumbNumber">{idx + 1}</span>
              </button>
            ))}
          </div>
        </section>
      </section>

      <div className="backHomeRow">
        <Link href="/#projects" className="backHomeButton">
          <span>←</span>All projects
        </Link>
      </div>

      <section className="projectGalleryFrame">
        <p className="siteContainer clickGalleryHint">Click to see the next image</p>
        <div className="clickGallery" onClick={handleGalleryClick}>
          {images.map((img, idx) => (
            <img 
              key={idx}
              src={img} 
              alt={`${project.title} — gallery image ${idx + 1}`} 
              className={gallerySlide === idx ? "isActive" : ""} 
              draggable="false" 
            />
          ))}
        </div>
      </section>

      {/* High-Resolution Fullscreen Inspection Lightbox */}
      {isLightboxOpen && (
        <div 
          className="fixed inset-0 z-50 bg-[#0d0c0be6] backdrop-blur-md flex flex-col justify-between p-4 sm:p-6"
          onClick={() => setIsLightboxOpen(false)}
        >
          {/* Top Bar */}
          <div 
            className="flex items-center justify-between text-white/90 pb-3 border-b border-white/10 z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col">
              <span className="text-[10px] tracking-[0.2em] uppercase text-[#b08a63] font-sans">
                {project.title} · {activeSlide + 1} of {images.length}
              </span>
              <h4 className="font-serif text-base sm:text-lg text-white font-normal truncate max-w-xl">
                {getImageTitle(images[activeSlide]) || `${project.title} — Detail View`}
              </h4>
            </div>

            <div className="flex items-center gap-3">
              <a 
                href={images[activeSlide]} 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-white/80 hover:text-white px-3 py-1.5 rounded border border-white/20 hover:border-white/40 transition-colors font-sans"
                title="Open original file in new tab"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Open Original</span>
              </a>
              <button 
                onClick={() => setIsLightboxOpen(false)}
                className="text-white/70 hover:text-white p-1.5 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Close Fullscreen"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Main Inspection View */}
          <div 
            className="relative flex-grow flex items-center justify-center p-2 sm:p-6 select-none"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={handlePrev} 
              aria-label="Previous image"
              className="absolute left-2 sm:left-6 z-20 text-white/70 hover:text-white p-3 rounded-full bg-black/40 hover:bg-black/70 border border-white/15 transition-all cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <img 
              src={images[activeSlide]} 
              alt={getImageTitle(images[activeSlide]) || `${project.title} detail`}
              className="max-h-[82vh] max-w-[92vw] w-auto h-auto object-contain shadow-2xl rounded-[2px]"
              draggable={false}
            />

            <button 
              onClick={handleNext} 
              aria-label="Next image"
              className="absolute right-2 sm:right-6 z-20 text-white/70 hover:text-white p-3 rounded-full bg-black/40 hover:bg-black/70 border border-white/15 transition-all cursor-pointer"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Bottom Bar: Instructions / Sheet metadata */}
          <div 
            className="flex items-center justify-between text-xs text-white/50 pt-2 border-t border-white/10 z-10 font-sans"
            onClick={(e) => e.stopPropagation()}
          >
            <span>Use Left / Right arrow keys to navigate · ESC to close</span>
            <span>Architectural Documentation · High Resolution</span>
          </div>
        </div>
      )}
    </>
  );
}
