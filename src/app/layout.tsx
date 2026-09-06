import type { Metadata } from "next";
import { Instrument_Sans, Cormorant_Garamond, Bodoni_Moda } from "next/font/google";
import "./globals.css";

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
});

const bodoniModa = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Faiha Faisal — Interior Architecture & Design",
  description: "Interior Design Portfolio of Faiha Faisal. Selected works across residential interiors, courtyards, elevations, and technical architectural documentation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased scroll-smooth">
      <body
        className={`${instrumentSans.variable} ${cormorantGaramond.variable} ${bodoniModa.variable} min-h-full flex flex-col bg-[#f8f7f3] text-[#2c2723]`}
      >
        {children}
      </body>
    </html>
  );
}
