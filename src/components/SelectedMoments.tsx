"use client";

import { useRef, useState, useEffect } from "react";
import { siteData } from "@/data/site";

export function SelectedMoments() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Repeat moments to enable continuous exploration
  const moments = [...siteData.moments, ...siteData.moments];

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!viewportRef.current) return;
    setIsDown(true);
    setStartX(e.pageX - viewportRef.current.offsetLeft);
    setScrollLeft(viewportRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDown(false);
  };

  const handleMouseUp = () => {
    setIsDown(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown || !viewportRef.current) return;
    e.preventDefault();
    const x = e.pageX - viewportRef.current.offsetLeft;
    const walk = (x - startX) * 1.6;
    viewportRef.current.scrollLeft = scrollLeft - walk;
  };

  // Subtle auto-scroll when not dragging
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    let animationFrameId: number;
    const scrollStep = () => {
      if (!isDown && el) {
        el.scrollLeft += 0.75;
        // Loop back seamlessly when reaching halfway
        if (el.scrollLeft >= el.scrollWidth / 2) {
          el.scrollLeft = 0;
        }
      }
      animationFrameId = requestAnimationFrame(scrollStep);
    };

    animationFrameId = requestAnimationFrame(scrollStep);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isDown]);

  return (
    <section className="bestWorksFrame">
      <div className="bestWorksLabel">
        <h3>Selected Moments</h3>
        <p className="bestWorksHint">Drag to explore</p>
      </div>

      <div
        className="filmstripViewport"
        ref={viewportRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        <div className="filmstripTrack">
          {moments.map((imgSrc, idx) => (
            <div className="filmstripSlide" key={idx}>
              <img
                src={imgSrc}
                alt=""
                className="kenBurnsLoop"
                draggable={false}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
