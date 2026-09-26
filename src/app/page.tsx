import { CartProvider } from "@/context/CartContext";
import Ticker from "@/components/sections/Ticker";
import Navbar from "@/components/sections/Navbar";
import HeroSlider from "@/components/sections/HeroSlider";
import WhyVistaaram from "@/components/sections/WhyVistaaram";
import PahadiDivider from "@/components/ui/PahadiDivider";
import ProductPDP from "@/components/sections/ProductPDP";
import Process from "@/components/sections/Process";
import PanditStory from "@/components/sections/PanditStory";
import Rituals from "@/components/sections/Rituals";
import Testimonials from "@/components/sections/Testimonials";
import StoriesCarousel from "@/components/sections/StoriesCarousel";
import FAQ from "@/components/sections/FAQ";
import ComingSoon from "@/components/sections/ComingSoon";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <CartProvider>
      <Ticker />
      <Navbar />
      <main>
        <HeroSlider />
        <WhyVistaaram />
        <ProductPDP />
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
    </CartProvider>
  );
}
