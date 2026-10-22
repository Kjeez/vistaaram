"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { pincodeCheckContent, productContent } from "@/data/content";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { PACK_OPTIONS, ProductPackOption } from "@/lib/medusa";
import WishlistButton from "@/components/ui/WishlistButton";
import RatingSummary from "@/components/ui/RatingSummary";

/* =========================================================
   ICONS
========================================================= */

function DiamondDecor() {
  return (
    <div className="absolute left-1/2 -translate-x-1/2 top-[-7px] bg-[#FAF6EE] px-2 text-[#C9A24B] text-[12px] leading-none">
      ✦
    </div>
  );
}

function LeafIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7A1F2B" strokeWidth="1.2">
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" stroke="none" />
      <path d="M12 21c-4.97 0-9-4.03-9-9 0-4.97 4.03-9 9-9 1.5 0 2.92.38 4.15 1.05C18.25 4.6 21 8.2 21 12c0 4.97-4.03 9-9 9z" stroke="none" />
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" stroke="none" />
      <path d="M12 2c0 0 8 2 8 10s-8 10-8 10-8-2-8-10 8-10 8-10z" />
      <path d="M12 22V2" />
    </svg>
  );
}

function FlaskIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7A1F2B" strokeWidth="1.2">
      <path d="M9 3h6" />
      <path d="M10 3v4l-6 11a2 2 0 0 0 1.7 3h14.6a2 2 0 0 0 1.7-3l-6-11V3" />
      <path d="M5.5 14h13" />
    </svg>
  );
}

function LotusIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#7A1F2B" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22c0-5 3-9 7-10-4 1-7 5-7 10z" />
      <path d="M12 22c0-5-3-9-7-10 4 1 7 5 7 10z" />
      <path d="M12 22c0-8 5-14 9-16-4 2-9 8-9 16z" />
      <path d="M12 22c0-8-5-14-9-16 4 2 9 8 9 16z" />
      <path d="M12 22c0-10 0-18 0-18" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#756A63" strokeWidth="1.5">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="9" cy="21" r="1.5" />
      <circle cx="20" cy="21" r="1.5" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  );
}

function GiftIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C9A24B" strokeWidth="1.5">
      <rect x="3" y="8" width="18" height="4" rx="1" />
      <path d="M12 8v13" />
      <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7" />
      <path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5" />
    </svg>
  );
}

export interface ProductDetailProps {
  showBreadcrumb?: boolean;
  showTopBorder?: boolean;
  id?: string;
}

export default function ProductDetail({
  showBreadcrumb = true,
  showTopBorder = false,
  id = "product",
}: ProductDetailProps = {}) {
  const [selectedPack, setSelectedPack] = useState<ProductPackOption>(PACK_OPTIONS[0]);
  const [activeThumb, setActiveThumb] = useState(0);
  const [qty, setQty] = useState(1);
  const [pincode, setPincode] = useState("");
  const [pincodeResult, setPincodeResult] = useState<{ ok: boolean; message: string } | null>(null);
  const { addItem } = useCart();
  const router = useRouter();
  const images = productContent.images;
  const thumbsRef = useRef<HTMLDivElement>(null);
  const [thumbsHeight, setThumbsHeight] = useState<number | null>(606);

  useEffect(() => {
    const el = thumbsRef.current;
    if (!el) return;

    const updateHeight = () => {
      if (window.innerWidth >= 1024) {
        if (el.offsetHeight > 0) {
          setThumbsHeight(el.offsetHeight);
        }
      } else {
        setThumbsHeight(null);
      }
    };

    updateHeight();
    const observer = new ResizeObserver(updateHeight);
    observer.observe(el);
    window.addEventListener("resize", updateHeight);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateHeight);
    };
  }, [images.length]);

  // Sync pack change with external components (e.g. StickyAddToCart)
  const handleSelectPack = (pack: ProductPackOption) => {
    setSelectedPack(pack);
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("vistaaram:pack-change", { detail: pack.id }));
    }
  };

  useEffect(() => {
    const onExternalPackChange = (e: Event) => {
      const pack = PACK_OPTIONS.find((p) => p.id === (e as CustomEvent).detail);
      if (pack) setSelectedPack(pack);
    };
    window.addEventListener("vistaaram:pack-change", onExternalPackChange);
    return () => window.removeEventListener("vistaaram:pack-change", onExternalPackChange);
  }, []);

  const handleAddToCart = async () => {
    await addItem({
      id: `sambrani-cup-${selectedPack.id}`,
      name: `${productContent.name} — ${selectedPack.name}`,
      variantId: selectedPack.variantId,
      price: selectedPack.price,
      originalPrice: selectedPack.mrp,
      quantity: qty,
      image: productContent.images[0].src,
      subtitle: `${selectedPack.cups} Cups · ${selectedPack.shortTitle} · ${selectedPack.ratePerBox}`,
    });
    router.push("/cart");
  };

  return (
    <section id={id} className={`relative w-full bg-[#FAF6EE] ${showBreadcrumb ? "pt-8 lg:pt-12" : ""}`}>
      {showTopBorder && (
        <div className="relative w-full border-t border-[#E6DED2]">
          <DiamondDecor />
        </div>
      )}

      <div className={`mx-auto max-w-[1360px] px-6 lg:px-12 ${showBreadcrumb ? "pb-16" : "py-16"}`}>
        
        {/* Breadcrumb at the very top for desktop, or above image for mobile */}
        {showBreadcrumb && (
          <div className="flex items-center text-[13px] text-[#6B6259] mb-6">
            <Link href="/" className="hover:text-[#751E29] transition-colors">Home</Link>
            <span className="mx-2 text-[#C9A24B]">/</span>
            <Link href="/shop" className="hover:text-[#751E29] transition-colors">Shop</Link>
            <span className="mx-2 text-[#C9A24B]">/</span>
            <span className="text-[#4A423C] font-medium truncate">{productContent.name}</span>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8 xl:gap-12 items-start">
          
          {/* =================================================
              GALLERY: THUMBNAILS + MAIN BIG IMAGE (STICKY)
          ================================================= */}
          <div className="w-full lg:w-[56%] xl:w-[58%] flex flex-col lg:sticky lg:top-[88px] self-start">
            <div className="flex flex-col lg:flex-row gap-4 xl:gap-5 items-stretch">
              
              {/* LEFT COLUMN — THUMBNAILS (110px) */}
              <div 
                ref={thumbsRef}
                className="hidden lg:flex flex-col gap-[14px] w-[110px] shrink-0"
              >
                {images.map((img, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActiveThumb(i)}
                    className={`
                      relative w-full aspect-square rounded-[8px] overflow-hidden 
                      border transition-all duration-200 cursor-pointer
                      ${i === activeThumb ? "border-[2px] border-[#C9A24B] shadow-sm p-0.5" : "border-[#E6DED2] hover:border-[#C9A24B]/50"}
                    `}
                  >
                    <div className="relative w-full h-full rounded-[4px] overflow-hidden bg-white">
                      <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="110px" />
                      {i === 4 && (
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center pointer-events-none">
                          <div className="w-7 h-7 rounded-full border border-white/80 bg-white/10 backdrop-blur-sm flex items-center justify-center">
                            <svg width="9" height="9" viewBox="0 0 24 24" fill="white">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </div>
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>

              {/* CENTER COLUMN — MAIN BIG IMAGE */}
              <div className="flex-1 min-w-0 flex flex-col">
                <div 
                  className="relative w-full aspect-square lg:aspect-auto rounded-[16px] overflow-hidden border border-[#E6DED2] bg-white shadow-[0_4px_24px_rgba(60,35,20,0.04)]"
                  style={thumbsHeight && thumbsHeight > 0 ? { height: `${thumbsHeight}px` } : { height: "606px" }}
                >
                  <Image 
                    src={images[activeThumb].src} 
                    alt={images[activeThumb].alt} 
                    fill 
                    className="object-cover" 
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </div>

            </div>

            {/* Desktop zoom hint */}
            <div className="hidden lg:flex items-center justify-center gap-2 mt-4 text-[#756A63] text-[12px] font-medium">
              <SearchIcon />
              <span>Hover to zoom · Click to expand</span>
            </div>

            {/* Mobile thumbnails (hidden on desktop) */}
            <div className="flex lg:hidden gap-3 mt-6 w-full overflow-x-auto pb-2 scrollbar-hide">
              {images.map((img, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveThumb(i)}
                  className={`
                    relative w-[70px] h-[70px] shrink-0 rounded-[8px] overflow-hidden bg-white
                    border transition-all duration-200
                    ${i === activeThumb ? "border-[2px] border-[#C9A24B]" : "border-[#E6DED2]"}
                  `}
                >
                  <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="70px" />
                  {i === 4 && (
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center pointer-events-none">
                      <div className="w-5 h-5 rounded-full border border-white/80 bg-white/10 backdrop-blur-sm flex items-center justify-center">
                        <svg width="7" height="7" viewBox="0 0 24 24" fill="white">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  )}
                </button>
              ))}
            </div>

            {/* Mobile zoom hint */}
            <div className="flex lg:hidden items-center justify-center gap-2 mt-3 text-[#756A63] text-[12px] font-medium">
              <SearchIcon />
              <span>Hover to zoom · Click to expand</span>
            </div>
          </div>

          {/* =================================================
              RIGHT COLUMN — DETAILS
          ================================================= */}
          <div className="w-full lg:w-[44%] xl:w-[42%] flex flex-col pt-2 lg:pt-0 lg:pl-4 xl:pl-6">
            
            {/* Eyebrow */}
            <p className="text-[#B48635] text-[11px] uppercase tracking-[0.24em] font-semibold mb-3">
              FROM THE SACRED VALLEY
            </p>
            
            {/* Title */}
            <h1 className="font-display font-semibold text-[#751E29] text-[36px] md:text-[42px] leading-[1.1] mb-3">
              Natural Sambrani
              <br />
              Hawan Cup
            </h1>
            <RatingSummary className="mb-4" />
            
            {/* Pricing */}
            <div className="flex items-center gap-4 mb-2">
              <span className="text-[#8E8783] text-[22px] line-through font-medium">
                ₹{selectedPack.mrp * qty}
              </span>
              <span className="text-[#751E29] text-[32px] font-bold leading-none">
                ₹{selectedPack.price * qty}
              </span>
              <span className="bg-[#EADAB8] text-[#78591A] text-[12px] font-semibold px-3 py-1.5 rounded-full ml-1">
                You save ₹{(selectedPack.mrp - selectedPack.price) * qty} ({selectedPack.savingsPercent}% OFF)
              </span>
            </div>
            <p className="text-[#A28850] text-[14px] italic font-display mb-6">
              {selectedPack.tagline}
            </p>
            
            {/* Features (3 columns) */}
            <div className="flex items-start justify-between border-y border-[#E6DED2] py-5 mb-7">
              <div className="flex flex-col items-center text-center px-2">
                <LeafIcon />
                <p className="mt-3 text-[#751E29] text-[13px] font-semibold leading-[1.3]">
                  Charcoal<br />Free
                </p>
              </div>
              <div className="w-px h-[50px] bg-[#E6DED2] mt-2" />
              <div className="flex flex-col items-center text-center px-2">
                <FlaskIcon />
                <p className="mt-3 text-[#751E29] text-[13px] font-semibold leading-[1.3]">
                  Chemical<br />Free
                </p>
              </div>
              <div className="w-px h-[50px] bg-[#E6DED2] mt-2" />
              <div className="flex flex-col items-center text-center px-2">
                <LotusIcon />
                <p className="mt-3 text-[#751E29] text-[13px] font-semibold leading-[1.3]">
                  Made with Temple<br />Flowers & Cow Dung
                </p>
              </div>
            </div>
            
            {/* Chips */}
            <div className="flex flex-wrap gap-2.5 mb-6">
              <span className="bg-[#EFE8D8] text-[#5A4F46] text-[12px] font-medium px-4 py-2 rounded-full border border-[#E6DED2]">
                {selectedPack.cups} Cups ({selectedPack.shortTitle})
              </span>
              <span className="bg-[#EFE8D8] text-[#5A4F46] text-[12px] font-medium px-4 py-2 rounded-full border border-[#E6DED2]">
                100% Natural
              </span>
              <span className="bg-[#EFE8D8] text-[#5A4F46] text-[12px] font-medium px-4 py-2 rounded-full border border-[#E6DED2]">
                Made in Uttarakhand
              </span>
            </div>

            {/* Pack Size Selector (Pack of 1, Pack of 2, Pack of 4) */}
            <div className="mb-7">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-[12px] font-bold tracking-[0.16em] uppercase text-[#751E29]">
                    Select Pack Size
                  </span>
                  <span className="text-[#C9A24B] text-[10px]">✦</span>
                  <span className="text-[12px] text-[#756A63] font-medium">
                    {selectedPack.name} ({selectedPack.cups} Cups)
                  </span>
                </div>
                {selectedPack.freeShipping && (
                  <span className="text-[11px] font-semibold text-[#1E5631] bg-[#EAF5EC] px-2.5 py-0.5 rounded-full border border-[#C8E6C9] flex items-center gap-1">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    Free Express Shipping
                  </span>
                )}
              </div>

              <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
                {PACK_OPTIONS.map((pack) => {
                  const isSelected = selectedPack.id === pack.id;
                  return (
                    <button
                      key={pack.id}
                      type="button"
                      onClick={() => handleSelectPack(pack)}
                      className={`
                        relative flex flex-col items-start p-3 sm:p-3.5 rounded-[12px] text-left transition-all duration-200 cursor-pointer
                        ${
                          isSelected
                            ? "bg-[#FFFDF8] border-[2px] border-[#751E29] shadow-[0_6px_20px_rgba(117,30,41,0.12)] -translate-y-0.5"
                            : "bg-white border border-[#E6DED2] hover:border-[#C9A24B] hover:shadow-[0_2px_8px_rgba(60,35,20,0.06)]"
                        }
                      `}
                    >
                      {/* Badge on top */}
                      {pack.badge && (
                        <div
                          className={`
                            absolute -top-[10px] left-1/2 -translate-x-1/2 whitespace-nowrap px-2.5 py-[2px] rounded-full text-[9px] font-bold uppercase tracking-wider shadow-sm z-10
                            ${
                              pack.badgeType === "green"
                                ? "bg-[#1E5631] text-white border border-[#2E7D32]"
                                : "bg-[#751E29] text-[#FAF6EE] border border-[#C9A24B]"
                            }
                          `}
                        >
                          {pack.badge}
                        </div>
                      )}

                      {/* Header with Radio circle & Pack name */}
                      <div className="flex items-center gap-1.5 sm:gap-2 w-full mb-1">
                        <div
                          className={`
                            w-4 h-4 rounded-full border flex items-center justify-center shrink-0 transition-colors
                            ${isSelected ? "border-[#751E29] bg-[#751E29]" : "border-[#C9A24B]/70 bg-white"}
                          `}
                        >
                          {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </div>
                        <span
                          className={`text-[13px] sm:text-[14px] font-semibold leading-tight truncate ${
                            isSelected ? "text-[#751E29]" : "text-[#4A423C]"
                          }`}
                        >
                          {/* Narrow phones fit "1 Box" but not "Pack of 1" in a third of the width. */}
                          <span className="sm:hidden">{pack.shortTitle}</span>
                          <span className="hidden sm:inline">{pack.name}</span>
                        </span>
                      </div>

                      {/* Cups & Boxes subtitle */}
                      <div className="text-[11px] text-[#756A63] pl-5.5 sm:pl-6 mb-2">
                        {pack.cups} Cups<span className="hidden sm:inline"> · {pack.shortTitle}</span>
                      </div>

                      {/* Pricing & strike */}
                      <div className="pl-5.5 sm:pl-6 mt-auto w-full">
                        <div className="flex items-baseline gap-1.5 flex-wrap">
                          <span className="text-[16px] sm:text-[18px] font-bold text-[#751E29] leading-none">
                            ₹{pack.price}
                          </span>
                          <span className="text-[11px] text-[#8E8783] line-through">
                            ₹{pack.mrp}
                          </span>
                        </div>

                        {/* Rate / savings note */}
                        <div className="mt-1.5 inline-block text-[10px] font-semibold px-1.5 py-0.5 rounded bg-[#FAF4E8] text-[#78591A] border border-[#EADAB8]/60">
                          {pack.ratePerBox}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
            
            {/* Pincode & Delivery Info */}
            <div className="flex flex-col gap-2.5 mb-7">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  // Indian pincodes are 6 digits and never start with 0.
                  setPincodeResult(
                    /^[1-9]\d{5}$/.test(pincode)
                      ? { ok: true, message: pincodeCheckContent.success(pincode) }
                      : { ok: false, message: pincodeCheckContent.invalid }
                  );
                }}
                className="flex h-[46px] w-full max-w-[360px] rounded-[6px] overflow-hidden border border-[#E6DED2] bg-white"
              >
                <div className="flex items-center justify-center pl-3 pr-2">
                  <MapPinIcon />
                </div>
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  value={pincode}
                  onChange={(e) => {
                    setPincode(e.target.value.replace(/\D/g, ""));
                    setPincodeResult(null);
                  }}
                  placeholder={pincodeCheckContent.placeholder}
                  aria-label="Delivery pincode"
                  className="flex-1 min-w-0 text-[13px] text-[#4A423C] outline-none placeholder:text-[#A79C91]"
                />
                <button type="submit" className="bg-[#751E29] text-white text-[13px] font-semibold px-6 hover:bg-[#5E1620] transition-colors">
                  {pincodeCheckContent.cta}
                </button>
              </form>
              {pincodeResult && (
                <p role="status" className={`text-[12px] font-medium ${pincodeResult.ok ? "text-[#2E7D32]" : "text-[#B3261E]"}`}>
                  {pincodeResult.message}
                </p>
              )}
              <p className="text-[#756A63] text-[12px]">
                {pincodeCheckContent.promise}
              </p>
            </div>
            
            {/* Add to Cart Actions — on phones the button takes its own full-width row */}
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 sm:gap-4 mb-3">
              <div className="flex items-center justify-between border border-[#E6DED2] bg-white rounded-full h-[52px] w-[110px] px-2 shrink-0">
                <button 
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="w-8 h-8 flex items-center justify-center text-[#756A63] hover:text-black"
                >
                  −
                </button>
                <span className="text-[14px] font-medium text-[#4A423C]">{qty}</span>
                <button 
                  onClick={() => setQty(qty + 1)}
                  className="w-8 h-8 flex items-center justify-center text-[#756A63] hover:text-black"
                >
                  +
                </button>
              </div>
              
              <button 
                onClick={handleAddToCart}
                className="order-last sm:order-none basis-full sm:basis-auto flex-1 h-[52px] rounded-full bg-[#751E29] text-[#FAF6EE] text-[13px] font-semibold tracking-[0.1em] uppercase flex items-center justify-center gap-3 shadow-[0_6px_18px_rgba(117,30,41,0.2)] hover:bg-[#5E1620] transition-all"
              >
                <CartIcon />
                ADD TO CART — ₹{selectedPack.price * qty}
              </button>

              <WishlistButton className="ml-auto sm:ml-0" />
            </div>
            
            {/* Trust Badges */}
            <p className="text-[#8E8783] text-[11px] text-center mb-8">
              Free shipping above ₹499 · Secure payments · 7-day easy returns
            </p>
            
            {/* Upsell / Launch box */}
            <div className="flex items-center gap-4 p-4 rounded-[8px] border border-[#C9A24B]/40 bg-[#FAF6EE]/50">
              <div className="shrink-0">
                <GiftIcon />
              </div>
              <p className="text-[12px] text-[#5A4F46] leading-[1.4] flex-1">
                The Daily Puja Kit is launching soon — sandalwood, kapoor, ghee wicks, Ganga water & more.
              </p>
              <button className="text-[#751E29] text-[12px] font-semibold shrink-0 hover:underline">
                Notify Me →
              </button>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
}
