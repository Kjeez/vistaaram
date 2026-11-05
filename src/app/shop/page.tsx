import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import PageTransition from "@/components/ui/PageTransition";
import ShopCatalog from "@/components/editorial/ShopCatalog";
import FaqList from "@/components/editorial/FaqList";
import { RuledItem, Title, containerClass, textLinkClass, Eyebrow } from "@/components/editorial/ui";
import { storePolicy } from "@/data/content";
import { HINDI_TAGLINE, shopPromises, shortFaqs } from "@/data/editorial";
import { PACK_OPTIONS } from "@/lib/medusa";

export const metadata: Metadata = {
  title: "Shop Natural Sambrani Hawan Cups | Vistaaram",
  description: `Buy Vistaaram's 100% natural, charcoal-free sambrani hawan cups in packs of 1, 2 or 4 boxes. From ₹${PACK_OPTIONS[0].price}. Cash on Delivery, free shipping above ₹${storePolicy.freeShippingThreshold}.`,
  alternates: { canonical: "/shop" },
};

export default function ShopPage() {
  return (
    <>
      <Navbar />
      <PageTransition>
        <main className="bg-[#FAF6EE] text-[#2A1B18]">
          <section className={`${containerClass} pt-[clamp(32px,4vw,48px)]`}>
            <nav aria-label="Breadcrumb" className="text-[13px] text-[#66544D] flex gap-2">
              <Link href="/" className="hover:text-[#7A1F2B]">Home</Link>
              <span>/</span>
              <span className="text-[#2A1B18]">Shop</span>
            </nav>
            <div className="flex flex-wrap justify-between items-end gap-x-12 gap-y-5 mt-5 pb-8 border-b border-[#E6D9C2]">
              <div>
                <h1 className="font-display font-medium text-[clamp(44px,5.6vw,76px)] leading-none tracking-[-0.015em] text-[#7A1F2B]">The Sacred Shop</h1>
                <p lang="hi" className="font-hindi text-[20px] text-[#8A6526] mt-3.5">{HINDI_TAGLINE}</p>
              </div>
              <p className="text-[16px] leading-[1.65] text-[#4A3A34] max-w-[430px] [text-wrap:pretty]">
                Charcoal-free sambrani cups made from temple flowers, cow dung and sacred herbs. Pick the pack that suits your puja — bigger packs cost less per cup.
              </p>
            </div>
          </section>

          <ShopCatalog />

          <section className="bg-[#FAF6EE] border-t border-[#EFE5D3] pt-[clamp(64px,8vw,104px)]">
            <div className={containerClass}>
              <div className="flex flex-wrap justify-between items-end gap-4">
                <div>
                  <Eyebrow>The Vistaaram promise</Eyebrow>
                  <Title size="md" className="mt-3">Rooted in Devbhoomi</Title>
                </div>
                <Link href="/story" className={textLinkClass}>
                  Read our story →
                </Link>
              </div>
              <div className="mt-10 grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-x-9 gap-y-8">
                {shopPromises.map((p, i) => (
                  <RuledItem key={p.title} n={String(i + 1).padStart(2, "0")} title={p.title} text={p.text} titleClass="text-[22px]" />
                ))}
              </div>
            </div>
            <Image
              src="/images/temples.png"
              alt="The four dhams of Uttarakhand"
              width={2170}
              height={725}
              sizes="100vw"
              className="block w-full h-auto mt-[clamp(32px,4vw,56px)]"
            />
          </section>

          <FaqList eyebrow="Before you order" faqs={shortFaqs} moreHref="/#faq" />
        </main>
      </PageTransition>
      <Footer />
      {/* Room for the fixed add-to-cart bar on phones. */}
      <div className="min-[860px]:hidden h-[76px] bg-[#5A1520]" aria-hidden="true" />
    </>
  );
}
