"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
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

export function ProjectDetailClient({ project }: Props) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [gallerySlide, setGallerySlide] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [progressKey, setProgressKey] = useState(0); // To reset CSS animation

  // Use the images array from project data, fallback to heroImage if empty
  const images = project.images && project.images.length > 0 
    ? project.images 
    : Array(6).fill(project.heroImage);

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % images.length);
      setProgressKey((prev) => prev + 1);
    }, 5000);
    return () => clearInterval(timer);
  }, [images.length]);

  const handleNext = () => {
    setActiveSlide((prev) => (prev + 1) % images.length);
    setProgressKey((prev) => prev + 1);
  };

  const handlePrev = () => {
    setActiveSlide((prev) => (prev - 1 + images.length) % images.length);
    setProgressKey((prev) => prev + 1);
  };

  const handleThumbClick = (index: number) => {
    setActiveSlide(index);
    setProgressKey((prev) => prev + 1);
  };

  const handleGalleryClick = () => {
    setGallerySlide((prev) => (prev + 1) % images.length);
  };

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
    </>
  );
}
