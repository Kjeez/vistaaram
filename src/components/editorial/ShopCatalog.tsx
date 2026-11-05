"use client";

import { useState } from "react";
import Image from "next/image";
import { businessDetails, comingSoonContent } from "@/data/content";
import PackPurchase from "./PackPurchase";
import { Eyebrow, Title, containerClass } from "./ui";

const FILTERS = [
  { key: "all", label: "All", soon: false },
  { key: "cups", label: "Hawan Cups", soon: false },
  { key: "kits", label: "Puja Kits", soon: true },
  { key: "samagri", label: "Samagri", soon: true },
  { key: "gifts", label: "Gifting", soon: true },
] as const;

type FilterKey = (typeof FILTERS)[number]["key"];

// Category of each coming-soon item, in comingSoonContent order.
const SOON_CATEGORIES: { cat: FilterKey; label: string }[] = [
  { cat: "kits", label: "Puja Kits" },
  { cat: "samagri", label: "Samagri" },
  { cat: "gifts", label: "Gifting" },
];

/** Filter chips, the hawan cup spotlight and the coming-soon grid on /shop. */
export default function ShopCatalog() {
  const [filter, setFilter] = useState<FilterKey>("all");
  const soon = comingSoonContent.items
    .map((item, i) => ({ ...item, ...SOON_CATEGORIES[i] }))
    .filter((item) => filter === "all" || filter === item.cat);
  const showSpotlight = filter === "all" || filter === "cups";

  return (
    <>
      <div className={`${containerClass} flex flex-wrap items-center justify-between gap-4 py-5`}>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter products">
          {FILTERS.map((f) => {
            const on = f.key === filter;
            return (
              <button
                key={f.key}
                type="button"
                aria-pressed={on}
                onClick={() => setFilter(f.key)}
                className={`h-[38px] px-4 rounded-full border text-[14px] font-medium flex items-center gap-2 whitespace-nowrap transition-colors ${
                  on ? "border-[#7A1F2B] bg-[#7A1F2B] text-[#FAF1E4]" : "border-[#D9C49A] text-[#2A1B18] hover:border-[#7A1F2B]"
                }`}
              >
                {f.label}
                {f.soon && <span className="text-[11px] opacity-75">Soon</span>}
              </button>
            );
          })}
        </div>
        <span className="text-[13px] text-[#66544D]">1 available · {comingSoonContent.items.length} coming soon</span>
      </div>

      {showSpotlight && (
        <section aria-label="Natural Sambrani Hawan Cup" className={`${containerClass} pt-2 pb-[clamp(72px,9vw,112px)]`}>
          <PackPurchase variant="shop" />
        </section>
      )}

      {soon.length > 0 && (
        <section id="coming-soon" className="bg-[#FFFDF8] border-t border-[#EFE5D3] scroll-mt-24">
          <div className={`${containerClass} py-[clamp(64px,8vw,104px)]`}>
            <div className="flex flex-wrap justify-between items-end gap-x-10 gap-y-4">
              <div>
                <Eyebrow>Coming soon</Eyebrow>
                <Title size="md" className="mt-3">More sacred offerings from Devbhoomi</Title>
              </div>
              <p className="text-[16px] leading-relaxed text-[#4A3A34] max-w-[360px]">
                Be the first to know when these arrive — we&apos;ll message you on WhatsApp.
              </p>
            </div>
            <div className="mt-11 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-7 gap-y-10">
              {soon.map((item) => (
                <article key={item.name} className="flex flex-col">
                  <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-[#EFE5D3]">
                    <Image src={item.image} alt={item.name} fill sizes="(max-width: 640px) 100vw, 33vw" className="object-cover" />
                    <span className="absolute top-3.5 left-3.5 bg-[#FAF6EE]/95 text-[#7A1F2B] text-[11px] font-semibold tracking-[0.14em] uppercase px-[11px] py-1.5 rounded-[13px]">
                      Coming soon
                    </span>
                  </div>
                  <p className="text-[11px] tracking-[0.2em] uppercase text-[#8A6526] font-semibold mt-5">{item.label}</p>
                  <h3 className="font-display font-medium text-[24px] text-[#2A1B18] mt-2">{item.name}</h3>
                  <p className="text-[15px] leading-relaxed text-[#66544D] mt-2 flex-1">{item.description}</p>
                  <a
                    href={`https://wa.me/${businessDetails.whatsappNumber}?text=${encodeURIComponent(comingSoonContent.notifyMessage(item.name))}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 h-[46px] rounded-full border border-[#C6A15B] text-[#7A1F2B] text-[14px] font-semibold flex items-center justify-center hover:bg-[#F6EEDD] transition-colors"
                  >
                    Notify me on WhatsApp →
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
