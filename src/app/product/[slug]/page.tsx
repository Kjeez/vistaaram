import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import ProductReviews from "@/components/sections/ProductReviews";
import PageTransition from "@/components/ui/PageTransition";
import PackPurchase from "@/components/editorial/PackPurchase";
import FaqList from "@/components/editorial/FaqList";
import {
  ComingSoonStrip,
  HowToUseSection,
  InsideSection,
  ProcessSection,
  ProductSubNav,
  RitualsSection,
  VoicesSection,
} from "@/components/editorial/ProductSections";
import { shortFaqs } from "@/data/editorial";
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
        <main className="bg-[#FAF6EE] text-[#2A1B18]">
          <section className="mx-auto max-w-[1200px] px-5 sm:px-[clamp(20px,5vw,48px)] pt-6 pb-[clamp(64px,8vw,104px)]">
            <nav aria-label="Breadcrumb" className="text-[13px] text-[#66544D] flex flex-wrap gap-2">
              <Link href="/" className="hover:text-[#7A1F2B]">Home</Link>
              <span>/</span>
              <Link href="/shop" className="hover:text-[#7A1F2B]">Shop</Link>
              <span>/</span>
              <span className="text-[#2A1B18]">{productContent.name}</span>
            </nav>
            <div className="mt-6">
              <PackPurchase variant="product" />
            </div>
          </section>

          <ProductSubNav />
          <InsideSection />
          <HowToUseSection />
          <RitualsSection />
          <ProcessSection />
          <VoicesSection />
          {/* Real customer reviews (approved in the admin) and the write-a-review form. */}
          <ProductReviews />
          <FaqList id="faq" eyebrow="Common questions" faqs={shortFaqs} moreHref="/#faq" />
          <ComingSoonStrip />
        </main>
      </PageTransition>
      <Footer />
      {/* Room for the fixed add-to-cart bar on phones. */}
      <div className="min-[860px]:hidden h-[76px] bg-[#5A1520]" aria-hidden="true" />
    </>
  );
}
