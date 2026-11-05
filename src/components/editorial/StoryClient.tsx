"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { PACK_OPTIONS } from "@/lib/medusa";
import { productContent } from "@/data/content";
import { madeSteps } from "@/data/editorial";

/** Section header (passed as children) with prev/next buttons, over a full-bleed snap-scrolling photo strip. */
export function MadeCarousel({ children }: { children: React.ReactNode }) {
  const scroller = useRef<HTMLDivElement>(null);

  const scroll = (dir: number) => {
    const el = scroller.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    el.scrollBy({ left: dir * (card ? card.offsetWidth + 24 : 340), behavior: "smooth" });
  };

  const arrowClass =
    "w-[52px] h-[52px] rounded-full border border-[#C6A15B] text-[#7A1F2B] text-[18px] hover:bg-[#7A1F2B] hover:text-[#FAF1E4] hover:border-[#7A1F2B] transition-colors";

  return (
    <>
      <div className="mx-auto max-w-[1200px] px-5 sm:px-[clamp(20px,5vw,48px)] flex flex-wrap justify-between items-end gap-7">
        {children}
        <div className="flex gap-2.5">
          <button type="button" onClick={() => scroll(-1)} aria-label="Previous step" className={arrowClass}>
            ←
          </button>
          <button type="button" onClick={() => scroll(1)} aria-label="Next step" className={arrowClass}>
            →
          </button>
        </div>
      </div>
      {/* Left edge lines up with the 1200px container on wide screens; the strip bleeds off the right. */}
      <div
        ref={scroller}
        className="mt-12 flex gap-6 overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden px-5 sm:px-[clamp(20px,5vw,48px)] min-[1296px]:pl-[calc((100vw-1200px)/2+48px)] scroll-pl-5 sm:scroll-pl-[clamp(20px,5vw,48px)] min-[1296px]:scroll-pl-[calc((100vw-1200px)/2+48px)]"
      >
        {madeSteps.map((s, i) => (
          <figure key={s.image} className="shrink-0 w-[clamp(250px,26vw,320px)] snap-start">
            <div className="relative aspect-[4/5] rounded-md overflow-hidden bg-[#E6D9C2]">
              <Image src={s.image} alt="" fill sizes="320px" className="object-cover" />
            </div>
            <figcaption className="flex gap-3.5 items-baseline mt-[18px] pt-4 border-t border-[#D9C49A]">
              <span className="font-display italic text-[26px] text-[#8A6526]">{String(i + 1).padStart(2, "0")}</span>
              <span className="text-[16px] leading-[1.45] text-[#2A1B18]">{s.caption}</span>
            </figcaption>
          </figure>
        ))}
        <div className="shrink-0 w-px" aria-hidden="true" />
      </div>
    </>
  );
}

/** Gold "Add to cart — ₹279" button on the story CTA; adds one Pack of 1 and offers the cart. */
export function StoryAddToCart() {
  const { addItem } = useCart();
  const [state, setState] = useState<"idle" | "busy" | "done" | "error">("idle");
  const pack = PACK_OPTIONS[0];

  const add = async () => {
    if (state === "busy") return;
    setState("busy");
    try {
      await addItem({
        id: `sambrani-cup-${pack.id}`,
        name: `${productContent.name} — ${pack.name}`,
        variantId: pack.variantId,
        price: pack.price,
        originalPrice: pack.mrp,
        quantity: 1,
        image: productContent.images[0].src,
        subtitle: `${pack.cups} Cups · ${pack.shortTitle} · ${pack.ratePerBox}`,
      });
      setState("done");
    } catch {
      setState("error");
    }
  };

  const base = "h-[54px] px-[30px] rounded-full font-semibold text-[14px] tracking-[0.12em] uppercase flex items-center";

  if (state === "done") {
    return (
      <Link href="/cart" className={`${base} bg-[#D9B262] text-[#3A0E15] hover:bg-[#E7C47A]`}>
        ✓ Added — view cart
      </Link>
    );
  }

  return (
    <button type="button" onClick={add} disabled={state === "busy"} className={`${base} bg-[#D9B262] text-[#3A0E15] hover:bg-[#E7C47A] disabled:opacity-70`}>
      {state === "busy" ? "Adding…" : state === "error" ? "Try again" : `Add to cart — ₹${pack.price}`}
    </button>
  );
}
