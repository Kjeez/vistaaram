import { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import ProductDetail from "@/components/sections/ProductDetail";
import HowToUse from "@/components/sections/HowToUse";
import ProductDetailsAccordion from "@/components/sections/ProductDetailsAccordion";
import ProductReviews from "@/components/sections/ProductReviews";
import FAQ from "@/components/sections/FAQ";
import RelatedProducts from "@/components/sections/RelatedProducts";
import PahadiDivider from "@/components/ui/PahadiDivider";
import StickyAddToCart from "@/components/sections/StickyAddToCart";
import PageTransition from "@/components/ui/PageTransition";
import { productContent } from "@/data/content";
import { PACK_OPTIONS } from "@/lib/medusa";
import { PRODUCT_PATH, SITE_URL } from "@/lib/site";

const PRODUCT_SLUG = PRODUCT_PATH.split("/").pop()!;

export const metadata: Metadata = {
  title: `${productContent.name} | Vistaaram`,
  description: productContent.description,
  alternates: { canonical: PRODUCT_PATH },
  openGraph: {
    type: "website",
    url: PRODUCT_PATH,
    title: `${productContent.name} | Vistaaram`,
    description: productContent.description,
    images: [{ url: productContent.images[0].src, alt: productContent.name }],
  },
};

export function generateStaticParams() {
  return [{ slug: PRODUCT_SLUG }];
}

// Structured data for Google Shopping / rich results, rendered into the server HTML.
const productJsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: productContent.name,
  description: productContent.description,
  image: productContent.images.map((img) => `${SITE_URL}${img.src}`),
  brand: { "@type": "Brand", name: "Vistaaram" },
  offers: {
    "@type": "AggregateOffer",
    url: `${SITE_URL}${PRODUCT_PATH}`,
    priceCurrency: "INR",
    lowPrice: Math.min(...PACK_OPTIONS.map((p) => p.price)),
    highPrice: Math.max(...PACK_OPTIONS.map((p) => p.price)),
    offerCount: PACK_OPTIONS.length,
    availability: "https://schema.org/InStock",
    itemCondition: "https://schema.org/NewCondition",
  },
};

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (slug !== PRODUCT_SLUG) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd).replace(/</g, "\\u003c") }}
      />
      <Navbar />
      <PageTransition>
        <main className="bg-[#FAF6EE]">
          <ProductDetail />
          
          <PahadiDivider className="py-4 bg-[#FAF6EE]" />
          
          <HowToUse />
          
          <PahadiDivider className="py-4 bg-[#FAF6EE]" />
          
          <ProductDetailsAccordion />
          
          <PahadiDivider className="py-4 bg-[#FAF6EE]" />
          
          <ProductReviews />
          
          <PahadiDivider className="py-4 bg-[#FAF6EE]" />
          
          <FAQ />
          
          <PahadiDivider className="py-4 bg-[#FAF6EE]" />
          
          <RelatedProducts />
        </main>
      </PageTransition>
      <Footer />
      
      <StickyAddToCart />
    </>
  );
}
