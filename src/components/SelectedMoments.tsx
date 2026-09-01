"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useAnimationFrame, useMotionValue, wrap } from "framer-motion";
import { siteData } from "@/data/site";
import Image from "next/image";

export function SelectedMoments() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  
  const [contentWidth, setContentWidth] = useState(0);
  
  // Duplicate items 4 times to ensure seamless wrapping on any screen size
  const duplicatedMoments = [...siteData.moments, ...siteData.moments, ...siteData.moments, ...siteData.moments];

  const x = useMotionValue(0);
  
  const baseVelocity = -1; // Default auto-scroll speed moving left
  const velocity = useMotionValue(baseVelocity);
  const isDragging = useRef(false);

  useEffect(() => {
    if (trackRef.current) {
      // The total scroll width divided by 4 gives us the exact width of one original set of items (including gaps)
      setContentWidth(trackRef.current.scrollWidth / 4);
    }
  }, []);

  useAnimationFrame((t, delta) => {
    if (isDragging.current) return;
    
    // Normalize delta to roughly 16ms per frame so speed is consistent on all refresh rates
    let moveBy = velocity.get() * (delta / 16); 
    
    let currentX = x.get();
    let nextX = currentX + moveBy;

    if (contentWidth > 0) {
      // Wrap seamlessly between -contentWidth and 0
      x.set(wrap(-contentWidth, 0, nextX));
    } else {
      x.set(nextX);
    }
  });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging.current) return;
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const xPos = e.clientX - rect.left;
    const width = rect.width;
    
    // Normalize from -1 (left edge) to 1 (right edge)
    const normalized = (xPos / width) * 2 - 1;
    
    // Multiply by a factor for speed. 
    // Mouse on right (normalized > 0) scrolls left (negative speed).
    // Mouse on left (normalized < 0) scrolls right (positive speed).
    const speed = -normalized * 4;
    
    velocity.set(speed);
  };

  const handleMouseLeave = () => {
    velocity.set(baseVelocity); // Return to default slow auto-scroll
  };

  return (
    <section 
      ref={containerRef}
      className="py-24 overflow-hidden relative"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="px-6 md:px-12 lg:px-24 mb-12 pointer-events-none">
        <h2 className="section-label">SELECTED MOMENTS</h2>
        <div className="divider-y" />
        <div className="md:hidden mt-4 flex justify-end">
          <span className="font-sans text-[10px] uppercase tracking-widest text-brand-dark/50">Swipe to explore &rarr;</span>
        </div>
      </div>

      <div className="cursor-grab active:cursor-grabbing w-full overflow-hidden">
        <motion.div 
          ref={trackRef}
          style={{ x }}
          drag="x"
          // We allow dragging back and forth within a wide range; when drag ends, the animation loop will instantly wrap it back to the safe zone if it exceeded it.
          dragConstraints={{ left: -contentWidth * 3, right: contentWidth }} 
          onDragStart={() => (isDragging.current = true)}
          onDragEnd={() => {
            isDragging.current = false;
            // Instantly wrap the X position so it doesn't get stuck out of bounds after a crazy drag
            if (contentWidth > 0) {
              x.set(wrap(-contentWidth, 0, x.get()));
            }
          }}
          className="flex gap-4 w-max px-6 md:px-12 lg:px-24"
        >
          {duplicatedMoments.map((moment, i) => (
            <div 
              key={i} 
              className="min-w-[280px] md:min-w-[400px] h-[300px] md:h-[450px] bg-brand-border relative overflow-hidden shrink-0 pointer-events-none"
            >
              {moment ? (
                <motion.div
                  className="w-full h-full relative"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.5, // Slight stagger so they don't all breathe identically
                  }}
                >
                  <Image
                    src={moment}
                    alt={`Selected Moment ${i + 1}`}
                    fill
                    unoptimized
                    className="object-cover"
                  />
                </motion.div>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                   <span className="text-[10px] uppercase tracking-widest text-brand-text/40 font-sans text-center break-all p-4">
                     Image Placeholder
                   </span>
                </div>
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
