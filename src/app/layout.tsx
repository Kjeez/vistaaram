import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import ScrollToTop from "@/components/ui/ScrollToTop";

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vistaaram — Natural Sambrani Hawan Cup from Devbhoomi, Uttarakhand",
  description:
    "Experience divine fragrance with Vistaaram's 100% natural Sambrani Hawan Cup. Handcrafted in Uttarakhand with temple flowers, cow dung, and sacred herbs. Charcoal-free, chemical-free. ₹279.",
  keywords: [
    "sambrani",
    "hawan cup",
    "dhoop",
    "natural incense",
    "Uttarakhand",
    "Devbhoomi",
    "temple flowers",
    "puja",
    "vistaaram",
  ],
  openGraph: {
    title: "Vistaaram — Natural Sambrani Hawan Cup",
    description:
      "100% natural, charcoal-free Sambrani cups handcrafted in Devbhoomi Uttarakhand.",
    siteName: "Vistaaram",
    type: "website",
    url: "https://vistaaram.in",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${playfairDisplay.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream text-ink font-body">
        <ScrollToTop />
        {children}
      </body>
    </html>
  );
}
