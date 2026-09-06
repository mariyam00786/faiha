import Link from "next/link";
import { siteData } from "@/data/site";

export function Footer() {
  const marqueeName = `${siteData.personal.name} · \u00a0`;
  const marqueeGroup = Array(6).fill(marqueeName).join("");

  return (
    <footer className="siteFooter">
      <div className="siteContainer footerTop">
        <div className="footerIntro">
          <p className="footerTagline">Interior Design · Visual Art</p>
          <a href={`mailto:${siteData.personal.email}`} className="footerEmail">
            {siteData.personal.email}
          </a>
        </div>

        <div className="footerColumns">
          <div className="footerColumn">
            <h4>Social</h4>
            <a
              href={siteData.personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            <a
              href={`tel:${siteData.personal.phone}`}
            >
              Phone
            </a>
          </div>

          <div className="footerColumn">
            <h4>Sections</h4>
            <Link href="/#about">About</Link>
            <Link href="/#projects">Projects</Link>
            <Link href="/resume">Resume</Link>
            <a
              href={siteData.portfolioPdfLink || "/FAIHA_FAISAL_Portfolio.pdf"}
              target="_blank"
              rel="noopener noreferrer"
            >
              Portfolio PDF
            </a>
          </div>
        </div>
      </div>

      <div className="marqueeWrap" aria-hidden="true">
        <div className="marqueeTrack">
          <span className="marqueeGroup">{marqueeGroup}</span>
          <span className="marqueeGroup">{marqueeGroup}</span>
        </div>
      </div>

      <div className="siteContainer footerBottom">
        <p>© 2026 {siteData.personal.name}. All rights reserved.</p>
        <p className="footerLocation">
          <span className="footerDot" aria-hidden="true"></span>
          Based in {siteData.personal.location}
        </p>
      </div>
    </footer>
  );
}
