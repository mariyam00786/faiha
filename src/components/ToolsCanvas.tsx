"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

interface SkillItem {
  id: string;
  name: string;
  icon: string;
  top: string;
  left: string;
  rot: number;
}

const TOOLS_LIST: SkillItem[] = [
  { id: "photoshop", name: "Photoshop", icon: "/icons/photoshop.svg", top: "11.0%", left: "8.8%", rot: -6 },
  { id: "illustrator", name: "Illustrator", icon: "/icons/illustrator.svg", top: "16.2%", left: "24.3%", rot: 4 },
  { id: "indesign", name: "InDesign", icon: "/icons/indesign.svg", top: "9.4%", left: "40.6%", rot: -3 },
  { id: "autocad", name: "AutoCAD", icon: "/icons/autocad.svg", top: "17.9%", left: "56.9%", rot: 5 },
  { id: "revit", name: "Revit", icon: "/icons/revit.svg", top: "11.0%", left: "74.0%", rot: -5 },
  { id: "enscape", name: "Enscape", icon: "/icons/enscape.svg", top: "36.7%", left: "12.4%", rot: -7 },
  { id: "canva", name: "Canva", icon: "/icons/canva.svg", top: "41.7%", left: "29.4%", rot: 3 },
  { id: "office", name: "Microsoft Office", icon: "/icons/office.svg", top: "33.2%", left: "46.6%", rot: -4 },
  { id: "3dsmax", name: "3ds Max", icon: "/icons/3dsmax.svg", top: "40.3%", left: "63.7%", rot: 6 },
  { id: "lumion", name: "Lumion", icon: "/icons/lumion.svg", top: "35.0%", left: "80.0%", rot: -3 },
  { id: "sketchup", name: "SketchUp", icon: "/icons/sketchup.svg", top: "64.1%", left: "17.4%", rot: 4 },
  { id: "procreate", name: "Procreate", icon: "/icons/procreate.svg", top: "67.5%", left: "36.3%", rot: -6 },
  { id: "blender", name: "Blender", icon: "/icons/blender.svg", top: "62.4%", left: "55.1%", rot: 5 },
];

export function ToolsCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleReset = () => {
    controls.start((custom) => ({
      x: 0,
      y: 0,
      rotate: custom.rot,
      transition: { type: "spring", stiffness: 120, damping: 14 }
    }));
  };

  return (
    <section className="skillsBoard siteContainer" id="skills">
      <div className="skillsBoardHeader">
        <div>
          <h3 className="skillsBoardTitle">My Tools & Software</h3>
          <p className="skillsBoardHint">Drag the cards around ✨</p>
        </div>
        <button
          className="skillsBoardReset"
          onClick={handleReset}
          type="button"
        >
          ↺ Reset layout
        </button>
      </div>

      <div className="skillsBoardCanvas" ref={containerRef}>
        {isClient && TOOLS_LIST.map((tool) => (
          <motion.div
            key={tool.id}
            custom={tool}
            drag
            dragConstraints={containerRef}
            dragElastic={0.08}
            dragMomentum={true}
            whileDrag={{ scale: 1.08, zIndex: 50 }}
            initial={{ x: 0, y: 0, rotate: tool.rot }}
            animate={controls}
            className="skillCard"
            style={{
              top: tool.top,
              left: tool.left,
              zIndex: 1,
            }}
          >
            <img src={tool.icon} alt={tool.name} draggable={false} />
            <span>{tool.name}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
