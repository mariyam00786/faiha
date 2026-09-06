"use client";

import { useState } from "react";
import Link from "next/link";
import { siteData } from "@/data/site";
import { Menu, X } from "lucide-react";

export function FloatingNav() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="topNav">
      <div className="siteContainer topNavInner">
        <Link className="brand" href="/">
          {siteData.personal.name}
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex">
          <Link href="/#projects">Projects</Link>
          <Link href="/#about">About</Link>
          <Link href="/resume">Resume</Link>
          <a
            href={siteData.portfolioPdfLink || "/FAIHA_FAISAL_Portfolio.pdf"}
            target="_blank"
            rel="noopener noreferrer"
          >
            Portfolio PDF
          </a>
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-[#2c2723] p-1.5 focus:outline-none"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-[#f8f7f3] border-b border-[#2c27231a] px-5 py-6 flex flex-col gap-5">
          <Link
            href="/#projects"
            onClick={() => setMobileOpen(false)}
            className="text-[14px] uppercase tracking-[0.06em] text-[#5a5148] hover:text-[#2c2723]"
          >
            Projects
          </Link>
          <Link
            href="/#about"
            onClick={() => setMobileOpen(false)}
            className="text-[14px] uppercase tracking-[0.06em] text-[#5a5148] hover:text-[#2c2723]"
          >
            About
          </Link>
          <Link
            href="/resume"
            onClick={() => setMobileOpen(false)}
            className="text-[14px] uppercase tracking-[0.06em] text-[#5a5148] hover:text-[#2c2723]"
          >
            Resume
          </Link>
          <a
            href={siteData.portfolioPdfLink || "/FAIHA_FAISAL_Portfolio.pdf"}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileOpen(false)}
            className="text-[14px] uppercase tracking-[0.06em] text-[#5a5148] hover:text-[#2c2723]"
          >
            Portfolio PDF
          </a>
        </div>
      )}
    </header>
  );
}
