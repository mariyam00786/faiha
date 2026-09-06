"use client";

import { useState } from "react";
import Link from "next/link";
import { siteData } from "@/data/site";
import { ArrowDownToLine } from "lucide-react";

export default function ResumePage() {
  const [zoomLevel, setZoomLevel] = useState(1);

  const zoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.25, 2));
  };

  const zoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.25, 0.75));
  };

  return (
    <main className="resumeMain">
      <header className="topNav resumeNav">
        <div className="siteContainer topNavInner">
          <Link className="brand" href="/">
            {siteData.personal.name}
          </Link>
          <nav>
            <Link href="/#projects">Projects</Link>
            <Link href="/#about">About</Link>
            <Link href="/resume" className="activeLink">Resume</Link>
            <a
              href={siteData.portfolioPdfLink || "/FAIHA_FAISAL_Portfolio.pdf"}
              target="_blank"
              rel="noopener noreferrer"
            >
              Portfolio PDF
            </a>
          </nav>
        </div>
      </header>

      <div className="resumeFrame">
        <div className="resumeScroller">
          <img
            src="/images/resume-document.png"
            alt={`Resume of ${siteData.personal.name}`}
            className="resumePage"
            draggable={false}
            style={{
              height: `${100 * zoomLevel}%`,
              maxHeight: "none",
            }}
          />
        </div>

        <div className="resumeZoomTools">
          <button
            onClick={zoomIn}
            disabled={zoomLevel >= 2}
            aria-label="Zoom in"
            title="Zoom in"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
              <circle cx="10.5" cy="10.5" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
              <line x1="15.4" y1="15.4" x2="20.5" y2="20.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              <line x1="7.6" y1="10.5" x2="13.4" y2="10.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              <line x1="10.5" y1="7.6" x2="10.5" y2="13.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>

          <button
            onClick={zoomOut}
            disabled={zoomLevel <= 0.75}
            aria-label="Zoom out"
            title="Zoom out"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
              <circle cx="10.5" cy="10.5" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
              <line x1="15.4" y1="15.4" x2="20.5" y2="20.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              <line x1="7.6" y1="10.5" x2="13.4" y2="10.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>

          <a
            href={siteData.resumeLink || "/FAIHA_FAISAL_Resume.pdf"}
            download
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Download Resume PDF"
            title="Download PDF"
          >
            <ArrowDownToLine className="w-4 h-4" />
          </a>
        </div>
      </div>
    </main>
  );
}
