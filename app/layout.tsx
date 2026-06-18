import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lumière — Modern Shopping Experience",
  description:
    "Discover curated collections of premium products. Shop the latest trends in fashion, home, and lifestyle at Lumière.",
  keywords: ["e-commerce", "shopping", "fashion", "lifestyle", "premium"],
  openGraph: {
    title: "Lumière — Modern Shopping Experience",
    description: "Discover curated collections of premium products.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="bg-white text-neutral-900 antialiased font-sans">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}