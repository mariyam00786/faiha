"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { siteData } from "@/data/site";

const TYPEWRITER_PHRASES = [
  "Faiha Faisal",
  "an Interior Designer",
  "a Spatial Storyteller",
  "a 3D Visualizer",
];

export function HomeIntro() {
  // Typewriter effect state
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fullPhrase = TYPEWRITER_PHRASES[phraseIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting) {
      if (currentText.length < fullPhrase.length) {
        timeout = setTimeout(() => {
          setCurrentText(fullPhrase.slice(0, currentText.length + 1));
        }, 110);
      } else {
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 2200);
      }
    } else {
      if (currentText.length > 0) {
        timeout = setTimeout(() => {
          setCurrentText(fullPhrase.slice(0, currentText.length - 1));
        }, 55);
      } else {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % TYPEWRITER_PHRASES.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, phraseIndex]);

  return (
    <section className="homeIntro">
      <div className="homeIntroText">
        <p>
          Welcome, I’m{" "}
          <span className="typewriter">
            {currentText}
            <span className="typewriterCursor" aria-hidden="true">
              |
            </span>
          </span>
        </p>

        <h1>{siteData.personal.philosophy}</h1>

        <div className="contactLinks">
          <a href={`mailto:${siteData.personal.email}`}>{siteData.personal.email}</a>
          <a
            href={siteData.personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a href={`tel:${siteData.personal.phone}`}>{siteData.personal.phone}</a>
        </div>
      </div>

      <div className="photoAlbumWrap">
        <Link href="/#about" className="photoAlbumLink" aria-label="Read My Story">
          <p className="photoAlbumLabel">My Story</p>
          <div className="photoAlbumSingle">
            <img
              src="/images/faiha-profile.png"
              alt="Faiha Faisal — Interior Designer"
              draggable={false}
            />
          </div>
        </Link>
      </div>
    </section>
  );
}
