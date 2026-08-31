import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Faiha Faisal | Junior Interior Designer",
  description: "Portfolio of Faiha Faisal, Junior Interior Designer based in Kerala, India.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${playfair.variable} ${inter.variable} font-sans antialiased bg-[#F7F6F2] text-[#38322B] selection:bg-[#38322B] selection:text-[#F7F6F2]`}
      >
        {children}
      </body>
    </html>
  );
}
