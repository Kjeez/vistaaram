"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { PACK_OPTIONS, ProductPackOption } from "@/lib/medusa";
import { PRODUCT_PATH } from "@/lib/site";
import { pincodeCheckContent, productContent, storePolicy } from "@/data/content";
import { productHighlights, shopTrust, socialProof } from "@/data/editorial";
import WishlistButton from "@/components/ui/WishlistButton";

const fmt = (n: number) => n.toLocaleString("en-IN");

// Per-cup lines from the design, keyed by pack.
const PER_LINE: Record<string, string> = {
  "pack-1": "That's ₹23 per cup — less than a day's agarbatti",
  "pack-2": "That's ₹20.9 per cup, with free shipping",
  "pack-4": "That's ₹19.7 per cup — our lowest price",
};

const BADGE_BG: Record<string, string> = { gold: "bg-[#7A1F2B]", green: "bg-[#3F6B47]" };

type Variant = "product" | "shop";

function Stars() {
  return <span className="text-[#B98A2E] tracking-[2px]" aria-hidden="true">★★★★★</span>;
}

function PackOption({ pack, selected, onSelect }: { pack: ProductPackOption; selected: boolean; onSelect: () => void }) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onSelect}
      className={`grid grid-cols-[20px_1fr_auto] items-center gap-3.5 text-left px-[18px] py-3.5 rounded-[10px] border transition-[border-color,box-shadow,background-color] ${
        selected ? "border-[#7A1F2B] shadow-[inset_0_0_0_1px_#7A1F2B] bg-[#FFFDF8]" : "border-[#E0CFA9] hover:border-[#C6A15B]"
      }`}
    >
      <span className={`w-[18px] h-[18px] rounded-full border-[1.5px] flex items-center justify-center ${selected ? "border-[#7A1F2B]" : "border-[#E0CFA9]"}`}>
        {selected && <span className="w-2 h-2 rounded-full bg-[#7A1F2B]" />}
      </span>
      <span className="flex flex-col gap-0.5 min-w-0">
        <span className="flex items-center flex-wrap gap-2 text-[16px] font-semibold text-[#2A1B18]">
          {pack.name}
          {pack.badge && (
            <span className={`text-[10px] font-bold tracking-[0.1em] uppercase px-2 py-[3px] rounded-[10px] text-[#FAF1E4] ${BADGE_BG[pack.badgeType ?? "gold"]}`}>
              {pack.badge.toLowerCase().replace(/^\w/, (c) => c.toUpperCase())}
            </span>
          )}
        </span>
        <span className="text-[13px] text-[#66544D]">
          {pack.boxes} {pack.boxes === 1 ? "box" : "boxes"} · {pack.cups} cups · {pack.ratePerCup}
        </span>
      </span>
      <span className="flex flex-col items-end gap-0.5">
        <span className="text-[17px] font-semibold text-[#2A1B18]">₹{fmt(pack.price)}</span>
        <span className="text-[12px] text-[#8C7B73] line-through">₹{fmt(pack.mrp)}</span>
      </span>
    </button>
  );
}

/**
 * Product gallery + pack picker + add to cart, as drawn in the design.
 * "product" is the full product page buy box; "shop" is the spotlight card on /shop.
 */
export default function PackPurchase({ variant, mobileBar = true }: { variant: Variant; mobileBar?: boolean }) {
  const isProduct = variant === "product";
  const images = isProduct ? productContent.images : productContent.images.slice(0, 4);
  const [packIndex, setPackIndex] = useState(isProduct ? 0 : 1);
  const [qty, setQty] = useState(1);
  const [img, setImg] = useState(0);
  const [adding, setAdding] = useState(false);
  const [toast, setToast] = useState<{ ok: boolean; text: string } | null>(null);
  const [pin, setPin] = useState("");
  const [pinState, setPinState] = useState<"" | "ok" | "bad">("");
  const toastTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const { addItem } = useCart();

  useEffect(() => () => clearTimeout(toastTimer.current), []);

  const pack = PACK_OPTIONS[packIndex];
  const total = pack.price * qty;
  const freeShip = total >= storePolicy.freeShippingThreshold;

  const showToast = (ok: boolean, text: string) => {
    setToast({ ok, text });
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 3200);
  };

  const addToCart = async () => {
    if (adding) return;
    setAdding(true);
    try {
      await addItem({
        id: `sambrani-cup-${pack.id}`,
        name: `${productContent.name} — ${pack.name}`,
        variantId: pack.variantId,
        price: pack.price,
        originalPrice: pack.mrp,
        quantity: qty,
        image: productContent.images[0].src,
        subtitle: `${pack.cups} Cups · ${pack.shortTitle} · ${pack.ratePerBox}`,
      });
      showToast(true, `${pack.name} × ${qty}`);
    } catch {
      showToast(false, "Couldn't add to cart. Please try again.");
    } finally {
      setAdding(false);
    }
  };

  const gallery = isProduct ? (
    <div className="grid grid-cols-1 sm:grid-cols-[72px_minmax(0,1fr)] gap-3.5">
      <div className="order-2 sm:order-1 flex sm:flex-col gap-2.5 overflow-x-auto sm:overflow-visible">
        {images.map((im, i) => (
          <button
            key={im.src}
            type="button"
            onClick={() => setImg(i)}
            aria-label={`Show image ${i + 1}`}
            className={`relative shrink-0 w-[64px] h-[64px] sm:w-[72px] sm:h-[72px] rounded-md overflow-hidden border-[1.5px] bg-[#EFE5D3] transition-opacity ${
              i === img ? "border-[#7A1F2B] opacity-100" : "border-transparent opacity-70 hover:opacity-100"
            }`}
          >
            <Image src={im.src} alt="" fill sizes="72px" className="object-cover" />
          </button>
        ))}
      </div>
      <div className="order-1 sm:order-2 relative aspect-[4/5] rounded-lg overflow-hidden bg-[#EFE5D3]">
        <Image src={images[img].src} alt={images[img].alt} fill priority sizes="(max-width: 860px) 100vw, 50vw" className="object-cover" />
        <span className="absolute top-4 left-4 bg-[#7A1F2B] text-[#FAF1E4] text-[11px] font-semibold tracking-[0.14em] uppercase px-3 py-[7px] rounded-[14px]">
          Bestseller
        </span>
      </div>
    </div>
  ) : (
    <div className="flex flex-col gap-3">
      <div className="relative aspect-square rounded-lg overflow-hidden bg-[#EFE5D3]">
        <Image src={images[img].src} alt={images[img].alt} fill sizes="(max-width: 860px) 100vw, 50vw" className="object-cover" />
        <span className="absolute top-4 left-4 bg-[#7A1F2B] text-[#FAF1E4] text-[11px] font-semibold tracking-[0.14em] uppercase px-3 py-[7px] rounded-[14px]">
          Bestseller
        </span>
      </div>
      <div className="grid grid-cols-4 gap-3">
        {images.map((im, i) => (
          <button
            key={im.src}
            type="button"
            onClick={() => setImg(i)}
            aria-label={`Show image ${i + 1}`}
            className={`relative aspect-square rounded-md overflow-hidden border-[1.5px] bg-[#EFE5D3] transition-opacity ${
              i === img ? "border-[#7A1F2B] opacity-100" : "border-transparent opacity-75 hover:opacity-100"
            }`}
          >
            <Image src={im.src} alt="" fill sizes="150px" className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  );

  const priceRow = (
    <div className={`flex items-baseline flex-wrap gap-3 ${isProduct ? "mt-6" : "mt-7 pt-6 border-t border-[#E6D9C2]"}`}>
      <span className={`${isProduct ? "text-[42px]" : "text-[40px]"} font-semibold text-[#2A1B18] tracking-[-0.01em] leading-none`}>₹{fmt(pack.price)}</span>
      <span className="text-[18px] text-[#8C7B73] line-through">₹{fmt(pack.mrp)}</span>
      <span className="text-[13px] font-semibold bg-[#F1E2BF] text-[#5E4313] px-2.5 py-1 rounded-xl">
        {isProduct ? `You save ₹${fmt(pack.mrp - pack.price)} (${pack.savingsPercent}% off)` : `${pack.savingsPercent}% off`}
      </span>
    </div>
  );

  const pinMsg =
    pinState === "ok" ? pincodeCheckContent.success(pin) : pinState === "bad" ? pincodeCheckContent.invalid : pincodeCheckContent.promise;

  return (
    <>
      <div className="grid grid-cols-1 min-[860px]:grid-cols-2 gap-[clamp(32px,5vw,72px)] items-start">
        {gallery}

        <div>
          {isProduct ? (
            <>
              <p className="text-[12px] tracking-[0.24em] uppercase text-[#8A6526] font-semibold">From the sacred valley</p>
              <h1 className="font-display font-medium text-[clamp(38px,4.2vw,56px)] leading-[1.04] text-[#7A1F2B] mt-3">{productContent.name}</h1>
              <a href="#voices" className="flex flex-wrap items-center gap-x-3 gap-y-2 mt-3.5 text-[14px] text-[#4A3A34]">
                <Stars />
                <span className="font-semibold">{socialProof.rating}</span>
                <span className="border-b border-[#D9C49A]">from {socialProof.homes} homes</span>
              </a>
            </>
          ) : (
            <>
              <p className="flex items-center gap-2 text-[13px] text-[#3F6B47] font-medium">
                <span className="w-[7px] h-[7px] rounded-full bg-[#3F7A4A]" />
                In stock · ships {storePolicy.dispatchTime}
              </p>
              <h2 className="font-display font-medium text-[clamp(34px,3.6vw,48px)] leading-[1.06] mt-3.5">
                <Link href={PRODUCT_PATH} className="text-[#7A1F2B] hover:text-[#561520]">
                  {productContent.name}
                </Link>
              </h2>
              <p className="flex flex-wrap items-center gap-x-3 gap-y-2 mt-3.5 text-[14px] text-[#4A3A34]">
                <Stars />
                <span className="font-semibold">{socialProof.rating}</span>
                <span className="text-[#C6A15B]">·</span>
                <span>12 cups per box</span>
                <span className="text-[#C6A15B]">·</span>
                <span>Made in Uttarakhand</span>
              </p>
              <div className="flex flex-wrap gap-2 mt-5">
                {productHighlights.map((h) => (
                  <span key={h} className="text-[13px] px-3 py-1.5 border border-[#E0CFA9] rounded-[14px] text-[#4A3A34]">
                    {h}
                  </span>
                ))}
              </div>
            </>
          )}

          {priceRow}
          <p className="font-display italic text-[16px] text-[#66544D] mt-1.5">{PER_LINE[pack.id] ?? pack.tagline}</p>

          {isProduct && (
            <div className="grid grid-cols-3 mt-6 border-y border-[#E6D9C2]">
              {productHighlights.map((h, i) => (
                <div key={h} className={`px-2 py-4 text-center text-[13px] sm:text-[14px] font-medium text-[#2A1B18] ${i === 1 ? "border-x border-[#E6D9C2]" : ""}`}>
                  {h}
                </div>
              ))}
            </div>
          )}

          <p className="text-[12px] tracking-[0.2em] uppercase text-[#8A6526] font-semibold mt-7">Choose your pack</p>
          <div role="radiogroup" aria-label="Pack size" className="flex flex-col gap-2.5 mt-3">
            {PACK_OPTIONS.map((p, i) => (
              <PackOption key={p.id} pack={p} selected={i === packIndex} onSelect={() => setPackIndex(i)} />
            ))}
          </div>

          <div className="flex gap-2.5 mt-5">
            <div className="flex items-center h-[56px] border border-[#D9C49A] rounded-full shrink-0">
              <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity" className="w-11 h-full text-[18px] text-[#2A1B18]">
                −
              </button>
              <span className="min-w-5 text-center font-semibold" aria-live="polite">{qty}</span>
              <button type="button" onClick={() => setQty((q) => Math.min(20, q + 1))} aria-label="Increase quantity" className="w-11 h-full text-[18px] text-[#2A1B18]">
                +
              </button>
            </div>
            <button
              type="button"
              onClick={addToCart}
              disabled={adding}
              className="flex-1 min-w-0 h-[56px] rounded-full bg-[#7A1F2B] text-[#FAF1E4] text-[13px] sm:text-[14px] font-semibold tracking-[0.12em] uppercase hover:bg-[#561520] transition-colors disabled:opacity-70"
            >
              {adding ? "Adding…" : `Add to cart — ₹${fmt(total)}`}
            </button>
            {isProduct && <WishlistButton className="!h-[56px] !w-[56px] !border-[#D9C49A] !bg-transparent" />}
          </div>
          <p className={`text-[14px] mt-3 text-center ${freeShip ? "text-[#3F6B47]" : "text-[#66544D]"}`}>
            {freeShip ? "✓ Free shipping on this order" : `Add ₹${fmt(storePolicy.freeShippingThreshold - total)} more for free shipping`}
          </p>

          {isProduct ? (
            <>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  // Indian pincodes are 6 digits and never start with 0.
                  setPinState(/^[1-9]\d{5}$/.test(pin) ? "ok" : "bad");
                }}
                className="mt-6 p-[18px] rounded-[10px] bg-[#FFFDF8] border border-[#E6D9C2]"
              >
                <label htmlFor="pdp-pincode" className="text-[14px] font-semibold text-[#2A1B18]">
                  Check delivery
                </label>
                <div className="flex mt-2.5 h-[46px] border border-[#D9C49A] rounded-lg overflow-hidden">
                  <input
                    id="pdp-pincode"
                    value={pin}
                    onChange={(e) => {
                      setPin(e.target.value.replace(/\D/g, "").slice(0, 6));
                      setPinState("");
                    }}
                    inputMode="numeric"
                    maxLength={6}
                    placeholder={pincodeCheckContent.placeholder}
                    className="flex-1 min-w-0 bg-transparent px-3.5 text-[15px] text-[#2A1B18] outline-none placeholder:text-[#9C8B82]"
                  />
                  <button type="submit" className="shrink-0 px-5 bg-[#2A1B18] text-[#FAF1E4] text-[14px] font-semibold hover:bg-[#3E2A25] transition-colors">
                    {pincodeCheckContent.cta}
                  </button>
                </div>
                <p role="status" className={`text-[13px] mt-2.5 ${pinState === "ok" ? "text-[#3F6B47]" : pinState === "bad" ? "text-[#9B2C2C]" : "text-[#66544D]"}`}>
                  {pinMsg}
                </p>
              </form>
              <Link
                href="/shop#coming-soon"
                className="mt-3.5 flex items-center justify-between gap-4 px-[18px] py-3.5 rounded-[10px] border border-dashed border-[#C6A15B] text-[#4A3A34] text-[14px] leading-normal hover:bg-[#FFFDF8] transition-colors"
              >
                <span>The Daily Puja Kit is launching soon — sandalwood, kapoor, ghee wicks, Ganga water &amp; more.</span>
                <span className="shrink-0 text-[#7A1F2B] font-semibold">Notify me →</span>
              </Link>
            </>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-x-6 gap-y-[18px] mt-7 py-[22px] border-y border-[#E6D9C2]">
                {shopTrust.map((t) => (
                  <div key={t.title}>
                    <div className="text-[15px] font-semibold text-[#2A1B18]">{t.title}</div>
                    <div className="text-[13px] text-[#66544D] mt-0.5">{t.text}</div>
                  </div>
                ))}
              </div>
              <Link href={PRODUCT_PATH} className="inline-flex mt-5 text-[15px] font-medium text-[#7A1F2B] border-b border-[#C6A15B] pb-0.5 hover:text-[#561520]">
                Full details — ingredients, how to use, reviews →
              </Link>
            </>
          )}
        </div>
      </div>

      {toast && (
        <div
          role="status"
          className="fixed top-[84px] right-4 sm:right-8 z-[60] bg-[#2A1B18] text-[#FAF1E4] px-5 py-3.5 rounded-[10px] text-[14px] flex gap-3 items-center shadow-[0_12px_30px_rgba(42,27,24,0.25)]"
        >
          {toast.ok ? (
            <>
              <span className="text-[#E2BE72]">✓</span>
              <span>Added to cart · {toast.text}</span>
              <Link href="/cart" className="text-[#E2BE72] font-semibold underline underline-offset-2 hover:text-[#F1D48F]">
                View cart
              </Link>
            </>
          ) : (
            <span>{toast.text}</span>
          )}
        </div>
      )}

      {mobileBar && (
        <>
          <div className="min-[860px]:hidden fixed inset-x-0 bottom-0 z-40 bg-[#FFFDF8] border-t border-[#E6D9C2] px-4 py-3 flex items-center gap-3.5 shadow-[0_-8px_24px_rgba(42,27,24,0.08)]">
            <div className="flex flex-col">
              <span className="text-[12px] text-[#66544D]">
                {pack.name} × {qty}
              </span>
              <span className="text-[20px] font-semibold text-[#2A1B18] leading-tight">₹{fmt(total)}</span>
            </div>
            <button
              type="button"
              onClick={addToCart}
              disabled={adding}
              className="flex-1 h-[50px] rounded-full bg-[#7A1F2B] text-[#FAF1E4] text-[13px] font-semibold tracking-[0.12em] uppercase disabled:opacity-70"
            >
              {adding ? "Adding…" : "Add to cart"}
            </button>
          </div>
        </>
      )}
    </>
  );
}
