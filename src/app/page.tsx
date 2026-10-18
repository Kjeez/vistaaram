import Ticker from "@/components/sections/Ticker";
import Navbar from "@/components/sections/Navbar";
import HeroSlider from "@/components/sections/HeroSlider";
import WhyVistaaram from "@/components/sections/WhyVistaaram";
import PahadiDivider from "@/components/ui/PahadiDivider";
import ProductDetail from "@/components/sections/ProductDetail";
import Process from "@/components/sections/Process";
import PanditStory from "@/components/sections/PanditStory";
import Rituals from "@/components/sections/Rituals";
import Testimonials from "@/components/sections/Testimonials";
import StoriesCarousel from "@/components/sections/StoriesCarousel";
import FAQ from "@/components/sections/FAQ";
import ComingSoon from "@/components/sections/ComingSoon";
import Footer from "@/components/sections/Footer";
import { faqContent } from "@/data/content";

// FAQ rich results in Google; mirrors the questions rendered by <FAQ />.
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqContent.faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c") }}
      />
      <Ticker />
      <Navbar />
      <main>
        <HeroSlider />
        <WhyVistaaram />
        <ProductDetail showBreadcrumb={false} showTopBorder={true} id="product" />
        <Process />
        <PahadiDivider className="py-4 bg-cream" />
        <PanditStory />
        <Rituals />
        <Testimonials />
        <StoriesCarousel />
        <PahadiDivider className="py-4 bg-cream" />
        <FAQ />
        <PahadiDivider className="py-4 bg-cream" />
        <ComingSoon />
      </main>
      <Footer />
    </>
  );
}
