import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import PackCard from "@/components/shop/PackCard";
import WhyVistaaram from "@/components/sections/WhyVistaaram";
import FAQ from "@/components/sections/FAQ";
import PahadiDivider from "@/components/ui/PahadiDivider";
import PageTransition from "@/components/ui/PageTransition";
import { DecoratedHeading, FlowerSpray, Mandala, PageHero, TrustBand } from "@/components/ui/Decor";
import { businessDetails, comingSoonContent, productContent, storePolicy } from "@/data/content";
import { PACK_OPTIONS } from "@/lib/medusa";
import { PRODUCT_PATH } from "@/lib/site";

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
        <main className="bg-[#FAF6EE]">
          <PageHero
            breadcrumb={[{ label: "Home", href: "/" }, { label: "Shop" }]}
            eyebrow="From Devbhoomi, Uttarakhand"
            title="The Sacred Shop"
            hindi
            subtitle="Charcoal-free sambrani cups made from temple flowers, cow dung and sacred herbs. Pick the pack that suits your puja — bigger packs cost less per cup."
          />

          {/* Packs */}
          <section className="relative overflow-hidden pt-4 pb-16 md:pb-24" aria-label="Choose your pack">
            <Mandala className="absolute left-1/2 top-40 -translate-x-1/2 w-[700px] h-[700px]" opacity={0.05} />
            <FlowerSpray variant={1} className="hidden lg:block absolute left-0 top-24 w-[150px] h-[220px]" opacity={0.35} />
            <FlowerSpray variant={2} className="hidden lg:block absolute right-0 bottom-10 w-[150px] h-[220px]" opacity={0.35} />

            <div className="relative mx-auto max-w-[1200px] px-4 sm:px-6">
              <DecoratedHeading
                eyebrow="Choose your pack"
                title={productContent.name}
                subtitle="12 cups in every box · each cup gives a gentle, fragrant smoke for your daily puja."
                className="mb-12"
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
                {PACK_OPTIONS.map((pack) => (
                  <PackCard key={pack.id} pack={pack} />
                ))}
              </div>
              <p className="text-center mt-10 text-[14px] text-[#5A4F46]">
                Want the full details — ingredients, how to use, reviews?{" "}
                <Link href={PRODUCT_PATH} className="text-[#751E29] font-medium underline underline-offset-4 hover:text-[#5E1620]">
                  View product details
                </Link>
              </p>
            </div>
          </section>

          <TrustBand
            items={[
              { icon: "cod", title: "Cash on Delivery", text: "Pay when your order arrives" },
              { icon: "truck", title: `Free shipping above ₹${storePolicy.freeShippingThreshold}`, text: `₹${storePolicy.shippingFee} below that` },
              { icon: "clock", title: `Ships ${storePolicy.dispatchTime}`, text: `Delivered in ${storePolicy.deliveryTime}` },
              { icon: "returns", title: `${storePolicy.returnWindowDays}-day easy returns`, text: "On unused packs" },
            ]}
          />

          <WhyVistaaram />

          <PahadiDivider className="py-6 bg-[#FAF6EE]" />

          {/* Coming soon */}
          <section className="relative overflow-hidden mx-auto max-w-[1200px] px-4 sm:px-6 pb-20">
            <div className="hidden md:block absolute right-0 top-0 w-[200px] h-[170px] pointer-events-none select-none opacity-60" aria-hidden="true">
              <Image src="/images/diya.png" alt="" fill sizes="200px" className="object-contain object-right-top" />
            </div>
            <DecoratedHeading
              eyebrow={comingSoonContent.sectionTitle}
              title={comingSoonContent.sectionSubtitle}
              subtitle="Be the first to know when these arrive — we'll message you on WhatsApp."
              className="mb-12"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {comingSoonContent.items.map((item) => (
                <div
                  key={item.name}
                  className="group relative bg-white border border-[#C9A24B]/30 rounded-2xl overflow-hidden flex flex-col hover:border-[#C9A24B]/70 hover:shadow-[0_12px_32px_rgba(60,35,20,0.10)] transition-[border-color,box-shadow]"
                >
                  <div className="relative aspect-[4/3] bg-[#FAF6EE] overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="(max-width: 640px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <span className="absolute top-3 left-3 bg-[#7A1F2B] text-[#FAF6EE] text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                      Coming soon
                    </span>
                  </div>
                  <div className="relative p-6 flex flex-col flex-1 text-center">
                    <Mandala className="absolute -right-16 -bottom-16 w-[160px] h-[160px]" opacity={0.08} />
                    <h3 className="font-display text-[#751E29] text-[21px] mb-2">{item.name}</h3>
                    <p className="text-[#5A4F46] text-[14px] leading-relaxed mb-6">{item.description}</p>
                    <a
                      href={`https://wa.me/${businessDetails.whatsappNumber}?text=${encodeURIComponent(comingSoonContent.notifyMessage(item.name))}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative mt-auto inline-flex items-center justify-center h-[44px] rounded-full border border-[#C9A24B] text-[#78591A] text-[13px] font-semibold hover:bg-[#EADAB8] transition-colors"
                    >
                      {comingSoonContent.notifyCta} →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <FAQ />
        </main>
      </PageTransition>
      <Footer />
    </>
  );
}
