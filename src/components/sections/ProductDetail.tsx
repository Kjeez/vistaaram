"use client";

import { useState } from "react";
import Image from "next/image";
import { productContent } from "@/data/content";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

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

export default function ProductDetail() {
  const [activeThumb, setActiveThumb] = useState(0);
  const [qty, setQty] = useState(1);
  const { addItem } = useCart();
  const router = useRouter();
  const images = productContent.images;

  const handleAddToCart = () => {
    addItem({
      id: "sambrani-cup",
      name: productContent.name,
      price: productContent.price,
      originalPrice: productContent.mrp,
      quantity: qty,
      image: productContent.images[0].src,
      subtitle: "₹23 per cup · 12 cups per box",
    });
    router.push("/cart");
  };

  return (
    <section className="relative w-full bg-[#FAF6EE] pt-8 lg:pt-12">
      <div className="mx-auto max-w-[1360px] px-6 lg:px-12 pb-16">
        
        {/* Breadcrumb at the very top for desktop, or above image for mobile */}
        <div className="flex items-center text-[13px] text-[#6B6259] mb-6">
          <a href="/" className="hover:text-[#751E29] transition-colors">Home</a>
          <span className="mx-2 text-[#C9A24B]">/</span>
          <span className="text-[#4A423C] font-medium">{productContent.name}</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 xl:gap-12 items-start">
          
          {/* =================================================
              LEFT COLUMN — THUMBNAILS (15%)
          ================================================= */}
          
          <div className="hidden lg:flex flex-col gap-[14px] w-[110px] shrink-0">
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
                </div>
              </button>
            ))}
          </div>

          {/* =================================================
              CENTER COLUMN — MAIN IMAGE (45%)
          ================================================= */}
          
          <div className="w-full lg:w-[45%] flex flex-col items-center">
            <div className="relative w-full aspect-square lg:aspect-auto lg:h-[606px] rounded-[16px] overflow-hidden border border-[#E6DED2] bg-white shadow-[0_4px_24px_rgba(60,35,20,0.04)]">
              <Image 
                src={images[activeThumb].src} 
                alt={images[activeThumb].alt} 
                fill 
                className="object-cover" 
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="flex items-center gap-2 mt-4 text-[#756A63] text-[12px] font-medium">
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
                </button>
              ))}
            </div>
          </div>

          {/* =================================================
              RIGHT COLUMN — DETAILS (40%)
          ================================================= */}
          
          <div className="w-full lg:w-[40%] flex flex-col pt-2 lg:pt-0 lg:pl-6">
            
            {/* Eyebrow */}
            <p className="text-[#B48635] text-[11px] uppercase tracking-[0.24em] font-semibold mb-3">
              FROM THE SACRED VALLEY
            </p>
            
            {/* Title */}
            <h1 className="font-display font-semibold text-[#751E29] text-[36px] md:text-[42px] leading-[1.1] mb-5">
              Natural Sambrani
              <br />
              Hawan Cup
            </h1>
            
            {/* Pricing */}
            <div className="flex items-center gap-4 mb-2">
              <span className="text-[#8E8783] text-[22px] line-through font-medium">
                ₹399
              </span>
              <span className="text-[#751E29] text-[32px] font-bold leading-none">
                ₹279
              </span>
              <span className="bg-[#EADAB8] text-[#78591A] text-[12px] font-semibold px-3 py-1.5 rounded-full ml-1">
                You save ₹120
              </span>
            </div>
            <p className="text-[#A28850] text-[14px] italic font-display mb-6">
              That's ₹23 per cup — less than a day's agarbatti
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
            <div className="flex flex-wrap gap-2.5 mb-7">
              <span className="bg-[#EFE8D8] text-[#5A4F46] text-[12px] font-medium px-4 py-2 rounded-full border border-[#E6DED2]">
                12 Cups
              </span>
              <span className="bg-[#EFE8D8] text-[#5A4F46] text-[12px] font-medium px-4 py-2 rounded-full border border-[#E6DED2]">
                100% Natural
              </span>
              <span className="bg-[#EFE8D8] text-[#5A4F46] text-[12px] font-medium px-4 py-2 rounded-full border border-[#E6DED2]">
                Made in Uttarakhand
              </span>
            </div>
            
            {/* Pincode & Delivery Info */}
            <div className="flex flex-col gap-2.5 mb-7">
              <div className="flex h-[46px] w-full max-w-[360px] rounded-[6px] overflow-hidden border border-[#E6DED2] bg-white">
                <div className="flex items-center justify-center pl-3 pr-2">
                  <MapPinIcon />
                </div>
                <input 
                  type="text" 
                  placeholder="Enter delivery pincode" 
                  className="flex-1 text-[13px] text-[#4A423C] outline-none placeholder:text-[#A79C91]"
                />
                <button className="bg-[#751E29] text-white text-[13px] font-semibold px-6 hover:bg-[#5E1620] transition-colors">
                  Check
                </button>
              </div>
              <p className="text-[#756A63] text-[12px]">
                COD available · Ships in 24 hrs · Free returns
              </p>
            </div>
            
            {/* Add to Cart Actions */}
            <div className="flex items-center gap-4 mb-3">
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
                className="flex-1 h-[52px] rounded-full bg-[#751E29] text-[#FAF6EE] text-[13px] font-semibold tracking-[0.1em] uppercase flex items-center justify-center gap-3 shadow-[0_6px_18px_rgba(117,30,41,0.2)] hover:bg-[#5E1620] transition-all"
              >
                <CartIcon />
                ADD TO CART — ₹{productContent.price * qty}
              </button>
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
