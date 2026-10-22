import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import PackCard from "@/components/shop/PackCard";
import PahadiDivider from "@/components/ui/PahadiDivider";
import PageTransition from "@/components/ui/PageTransition";
import { businessDetails, comingSoonContent, productContent, storePolicy } from "@/data/content";
import { PACK_OPTIONS } from "@/lib/medusa";
import { PRODUCT_PATH } from "@/lib/site";

export const metadata: Metadata = {
  title: "Shop Natural Sambrani Hawan Cups | Vistaaram",
  description: `Buy Vistaaram's 100% natural, charcoal-free sambrani hawan cups in packs of 1, 2 or 4 boxes. From ₹${PACK_OPTIONS[0].price}. Cash on Delivery, free shipping above ₹${storePolicy.freeShippingThreshold}.`,
  alternates: { canonical: "/shop" },
};

const TRUST = [
  { title: "Cash on Delivery", text: "Pay when your order arrives" },
  { title: `Free shipping above ₹${storePolicy.freeShippingThreshold}`, text: `₹${storePolicy.shippingFee} below that` },
  { title: `Ships ${storePolicy.dispatchTime}`, text: `Delivered in ${storePolicy.deliveryTime}` },
  { title: `${storePolicy.returnWindowDays}-day easy returns`, text: "On unused packs" },
];

export default function ShopPage() {
  return (
    <>
      <Navbar />
      <PageTransition>
        <main className="bg-[#FAF6EE]">
          {/* Header */}
          <section className="mx-auto max-w-[1200px] px-4 sm:px-6 pt-8 md:pt-12 pb-10">
            <nav aria-label="Breadcrumb" className="flex items-center text-[13px] text-[#6B6259] mb-8">
              <Link href="/" className="hover:text-[#751E29] transition-colors">Home</Link>
              <span className="mx-2 text-[#C9A24B]">/</span>
              <span className="text-[#4A423C] font-medium">Shop</span>
            </nav>
            <div className="text-center max-w-[680px] mx-auto">
              <p className="text-[#B48635] text-[11px] sm:text-[12px] uppercase tracking-[0.24em] font-semibold mb-3">
                From Devbhoomi, Uttarakhand
              </p>
              <h1 className="font-display font-semibold text-[#751E29] text-[34px] sm:text-[44px] leading-[1.1] mb-4">
                {productContent.name}
              </h1>
              <p className="text-[#5A4F46] text-[15px] sm:text-[16px] leading-relaxed">
                Charcoal-free cups made from temple flowers, cow dung and sacred herbs. Pick the pack that suits your
                puja — bigger packs cost less per cup.
              </p>
            </div>
          </section>

          {/* Packs */}
          <section className="mx-auto max-w-[1200px] px-4 sm:px-6 pb-12" aria-label="Choose your pack">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
              {PACK_OPTIONS.map((pack) => (
                <PackCard key={pack.id} pack={pack} />
              ))}
            </div>
            <p className="text-center mt-8 text-[14px] text-[#5A4F46]">
              Want the full details — ingredients, how to use, reviews?{" "}
              <Link href={PRODUCT_PATH} className="text-[#751E29] font-medium underline underline-offset-4 hover:text-[#5E1620]">
                View product details
              </Link>
            </p>
          </section>

          {/* Trust strip */}
          <section className="bg-white border-y border-[#E6DED2]">
            <div className="mx-auto max-w-[1200px] px-4 sm:px-6 py-8 grid grid-cols-2 lg:grid-cols-4 gap-6">
              {TRUST.map((item) => (
                <div key={item.title} className="text-center">
                  <p className="font-display text-[#751E29] text-[16px] sm:text-[18px] leading-tight">{item.title}</p>
                  <p className="text-[#8E8783] text-[12px] sm:text-[13px] mt-1">{item.text}</p>
                </div>
              ))}
            </div>
          </section>

          <PahadiDivider className="py-6 bg-[#FAF6EE]" />

          {/* Coming soon */}
          <section className="mx-auto max-w-[1200px] px-4 sm:px-6 pb-20">
            <div className="text-center mb-10">
              <p className="text-[#B48635] text-[11px] uppercase tracking-[0.24em] font-semibold mb-2">
                {comingSoonContent.sectionTitle}
              </p>
              <h2 className="font-display text-[#751E29] text-[28px] sm:text-[36px]">{comingSoonContent.sectionSubtitle}</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {comingSoonContent.items.map((item) => (
                <div key={item.name} className="bg-white border border-[#E6DED2] rounded-2xl overflow-hidden flex flex-col">
                  <div className="relative aspect-[4/3] bg-[#FAF6EE]">
                    <Image src={item.image} alt={item.name} fill sizes="(max-width: 640px) 100vw, 33vw" className="object-cover" />
                    <span className="absolute top-3 left-3 bg-white/95 text-[#751E29] text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                      Coming soon
                    </span>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="font-display text-[#751E29] text-[20px] mb-2">{item.name}</h3>
                    <p className="text-[#5A4F46] text-[14px] leading-relaxed mb-5">{item.description}</p>
                    <a
                      href={`https://wa.me/${businessDetails.whatsappNumber}?text=${encodeURIComponent(comingSoonContent.notifyMessage(item.name))}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto inline-flex items-center justify-center h-[44px] rounded-full border border-[#C9A24B] text-[#78591A] text-[13px] font-semibold hover:bg-[#EADAB8] transition-colors"
                    >
                      {comingSoonContent.notifyCta} →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </PageTransition>
      <Footer />
    </>
  );
}
