import { Metadata } from "next";
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

export const metadata: Metadata = {
  title: `${productContent.name} | Vistaaram`,
  description: productContent.description,
};

export default function ProductPage({ params }: { params: { slug: string } }) {
  // In a real app, fetch product by slug.
  
  return (
    <>
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
