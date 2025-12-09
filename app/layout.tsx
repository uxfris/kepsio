import type { Metadata } from "next";
import { Faculty_Glyphic, Lexend_Deca } from "next/font/google";
import "./globals.css";

const facultyGlyphic = Faculty_Glyphic({
  variable: "--font-faculty-glyphic",
  subsets: ["latin"],
  weight: "400"
});

const lexendDeca = Lexend_Deca({
  variable: "--font-lexend-deca",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: {
    default: "Kepsio — AI Caption Generator",
    template: "%s | Kepsio",
  },
  description:
    "AI-powered caption generator for creating engaging social media captions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${facultyGlyphic.variable} ${lexendDeca.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
