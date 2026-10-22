"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { productContent, storePolicy } from "@/data/content";
import { ProductPackOption } from "@/lib/medusa";
import { PRODUCT_PATH } from "@/lib/site";

const FREE_SHIPPING_THRESHOLD = storePolicy.freeShippingThreshold;

const PACK_IMAGES: Record<number, string> = {
  1: "/images/product/1.jpg",
  2: "/images/product/2.jpg",
  4: "/images/product/2.jpg",
};

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1E5631" strokeWidth="2.5" aria-hidden="true">
      <path d="M5 12l5 5L20 7" />
    </svg>
  );
}

/** One pack (1, 2 or 4 boxes) with pricing and its own Add to Cart. */
export default function PackCard({ pack }: { pack: ProductPackOption }) {
  const { addItem } = useCart();
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const featured = pack.badgeType === "gold";

  const handleAdd = async () => {
    setBusy(true);
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
    router.push("/cart");
  };

  const perks = [
    `${pack.cups} sambrani cups (${pack.shortTitle})`,
    pack.price >= FREE_SHIPPING_THRESHOLD ? "Free shipping" : `Free shipping above ₹${FREE_SHIPPING_THRESHOLD}`,
    "Cash on Delivery available",
  ];

  return (
    <div
      className={`relative flex flex-col bg-white rounded-2xl overflow-hidden transition-shadow duration-300 hover:shadow-[0_12px_32px_rgba(60,35,20,0.10)] ${
        featured ? "border-2 border-[#751E29] shadow-[0_8px_24px_rgba(117,30,41,0.12)]" : "border border-[#E6DED2]"
      }`}
    >
      {pack.badge && (
        <div
          className={`absolute top-3 left-3 z-10 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
            pack.badgeType === "green" ? "bg-[#1E5631] text-white" : "bg-[#751E29] text-[#FAF6EE]"
          }`}
        >
          {pack.badge}
        </div>
      )}

      <Link href={PRODUCT_PATH} className="relative block aspect-[4/3] bg-[#FAF6EE]" aria-label={`${productContent.name}, ${pack.name}`}>
        <Image
          src={PACK_IMAGES[pack.boxes] ?? PACK_IMAGES[1]}
          alt={`${productContent.name} — ${pack.shortTitle}`}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover"
        />
        {pack.boxes > 1 && (
          <span className="absolute bottom-3 right-3 bg-white/95 text-[#751E29] font-display font-semibold text-[18px] px-3 py-1 rounded-full shadow-sm">
            × {pack.boxes}
          </span>
        )}
      </Link>

      <div className="flex flex-col flex-1 p-5 sm:p-6">
        <p className="text-[#B48635] text-[11px] uppercase tracking-[0.2em] font-semibold mb-1">{pack.name}</p>
        <h3 className="font-display text-[#751E29] text-[22px] leading-tight mb-3">
          {pack.shortTitle} · {pack.cups} Cups
        </h3>

        <div className="flex items-baseline gap-2 mb-1">
          <span className="text-[#751E29] text-[28px] font-bold leading-none">₹{pack.price}</span>
          <span className="text-[#8E8783] text-[15px] line-through">₹{pack.mrp}</span>
          <span className="text-[#1E5631] text-[13px] font-semibold">{pack.savingsPercent}% off</span>
        </div>
        <p className="text-[#8E8783] text-[13px] mb-5">
          {pack.ratePerCup} · {pack.ratePerBox}
        </p>

        <ul className="flex flex-col gap-2 mb-6 text-[14px] text-[#4A423C]">
          {perks.map((perk) => (
            <li key={perk} className="flex items-center gap-2">
              <CheckIcon />
              {perk}
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={handleAdd}
          disabled={busy}
          className={`mt-auto w-full h-[50px] rounded-full text-[13px] font-bold tracking-[0.1em] uppercase transition-colors disabled:opacity-60 ${
            featured
              ? "bg-[#751E29] text-[#FAF6EE] hover:bg-[#5E1620] shadow-[0_6px_18px_rgba(117,30,41,0.2)]"
              : "border border-[#751E29] text-[#751E29] hover:bg-[#751E29] hover:text-[#FAF6EE]"
          }`}
        >
          {busy ? "Adding…" : `Add to cart — ₹${pack.price}`}
        </button>
      </div>
    </div>
  );
}
