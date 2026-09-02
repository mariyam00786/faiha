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
    { name: "Projects", href: "/#projects" },
    { name: "About", href: "/#about" },
    { name: "Resume", href: "/resume" },
    { name: "Portfolio PDF", href: "/FAIHA_FAISAL_Portfolio.pdf", external: true },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 w-full backdrop-blur-[14px] bg-[#f8f7f3a6] border-b border-[#2c27231a] transition-all">
        <div className="max-w-[1320px] mx-auto px-5 py-4 flex items-center justify-between">
          {/* Brand Name on Left (Always Visible) */}
          <Link 
            href="/" 
            className="font-serif italic text-[24px] md:text-[25px] font-normal tracking-[0.05em] text-[#25211e] hover:opacity-85 transition-opacity"
          >
            Faiha Faisal
          </Link>
          
          {/* Mobile Menu Toggle Button */}
          <button 
            className="md:hidden text-[#2c2723] p-1.5 -mr-1.5 focus:outline-none"
            onClick={() => setIsOpen(true)}
            aria-label="Open Menu"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Desktop Nav on Right with Sliding Underline Hover */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map((link) => {
              const isActive = pathname === link.href && !link.external;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  target={link.external ? "_blank" : "_self"}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className={cn(
                    "relative inline-block text-[13px] uppercase tracking-[0.06em] font-sans font-normal transition-colors py-0.5",
                    isActive ? "text-[#2c2723] after:w-full" : "text-[#5a5148] hover:text-[#2c2723]",
                    "after:content-[''] after:absolute after:bottom-[-1px] after:left-0 after:h-[1px] after:bg-[#2c2723] after:transition-all after:duration-[250ms] hover:after:w-full",
                    !isActive && "after:w-0"
                  )}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Mobile Slide-in Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-[#f8f7f3]/98 backdrop-blur-md flex flex-col p-6"
          >
            <div className="flex justify-between items-center mb-12 border-b border-[#2c27231a] pb-4">
              <Link 
                href="/" 
                className="font-serif italic text-2xl text-[#25211e]" 
                onClick={() => setIsOpen(false)}
              >
                Faiha Faisal
              </Link>
              <button 
                className="text-[#2c2723] p-2 -mr-2"
                onClick={() => setIsOpen(false)}
                aria-label="Close Menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <nav className="flex flex-col gap-6 text-sm tracking-[0.1em] uppercase pl-2">
              {links.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  target={link.external ? "_blank" : "_self"}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  onClick={() => setIsOpen(false)}
                  className="text-[#5a5148] hover:text-[#2c2723] transition-colors py-2 border-b border-[#2c27230f]"
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
