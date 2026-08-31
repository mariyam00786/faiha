"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export function FloatingNav() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: "Projects", href: "/#work" },
    { name: "About", href: "/#about" },
    { name: "Resume", href: "/resume" },
    { name: "Portfolio PDF", href: "/FAIHA_FAISAL_Resume.pdf", external: true },
  ];

  return (
    <>
      <header className="absolute top-0 right-0 w-full z-50 p-6 md:p-12 flex justify-between md:justify-end items-center">
        {/* Mobile Logo / Menu Toggle */}
        <div className="md:hidden">
          <Link href="/" className="font-serif italic text-xl">
            Faiha Faisal
          </Link>
        </div>
        
        <button 
          className="md:hidden text-brand-text p-2 -mr-2"
          onClick={() => setIsOpen(true)}
          aria-label="Open Menu"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8 lg:gap-12 text-[11px] tracking-[0.2em] uppercase">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              target={link.external ? "_blank" : "_self"}
              className={cn(
                "hover:opacity-60 transition-opacity",
                pathname === link.href && !link.external && "opacity-60"
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </header>

      {/* Mobile Slide-in Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-brand-bg/95 backdrop-blur-sm flex flex-col p-6"
          >
            <div className="flex justify-between items-center mb-16">
              <Link href="/" className="font-serif italic text-xl" onClick={() => setIsOpen(false)}>
                Faiha Faisal
              </Link>
              <button 
                className="text-brand-text p-2 -mr-2"
                onClick={() => setIsOpen(false)}
                aria-label="Close Menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <nav className="flex flex-col gap-8 text-sm tracking-[0.2em] uppercase pl-4">
              {links.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  target={link.external ? "_blank" : "_self"}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "hover:opacity-60 transition-opacity",
                    pathname === link.href && !link.external && "opacity-60"
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
