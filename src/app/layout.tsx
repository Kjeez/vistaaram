import type { Metadata } from "next";
import { Playfair_Display, Inter, Tiro_Devanagari_Hindi } from "next/font/google";
import "./globals.css";
import ScrollToTop from "@/components/ui/ScrollToTop";
import ScrollTriggerRefresh from "@/components/ui/ScrollTriggerRefresh";
import { IS_STAGING, SITE_URL } from "@/lib/site";

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

// Devanagari lines ("देवभूमि की पवित्र सुगंध…") on the story and shop pages.
const tiroHindi = Tiro_Devanagari_Hindi({
  variable: "--font-hindi",
  subsets: ["devanagari"],
  weight: "400",
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  ...(IS_STAGING && { robots: { index: false, follow: false } }),
  alternates: { canonical: "/" },
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
    locale: "en_IN",
    url: "/",
    images: [{ url: "/images/product/1.jpg", alt: "Vistaaram Natural Sambrani Hawan Cups" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vistaaram — Natural Sambrani Hawan Cup",
    description: "100% natural, charcoal-free Sambrani cups handcrafted in Devbhoomi Uttarakhand.",
    images: ["/images/product/1.jpg"],
  },
};

import { CartProvider } from "@/context/CartContext";
import { CustomerProvider } from "@/context/CustomerContext";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${playfairDisplay.variable} ${inter.variable} ${tiroHindi.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream text-ink font-body">
        <CartProvider>
          <CustomerProvider>
            <ScrollToTop />
            <ScrollTriggerRefresh />
            {children}
          </CustomerProvider>
        </CartProvider>
      </body>
    </html>
  );
}
