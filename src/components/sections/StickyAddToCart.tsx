"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { productContent } from "@/data/content";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { PACK_OPTIONS, ProductPackOption } from "@/lib/medusa";

function CartIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="9" cy="21" r="1.5" />
      <circle cx="20" cy="21" r="1.5" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  );
}

export default function StickyAddToCart() {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedPack, setSelectedPack] = useState<ProductPackOption>(PACK_OPTIONS[0]);
  const [qty, setQty] = useState(1);
  const { addItem } = useCart();
  const router = useRouter();

  // Listen for pack selection changes from ProductDetail
  useEffect(() => {
    const handlePackChange = (e: Event) => {
      const packId = (e as CustomEvent<string>).detail;
      const found = PACK_OPTIONS.find((p) => p.id === packId);
      if (found) setSelectedPack(found);
    };
    window.addEventListener("vistaaram:pack-change", handlePackChange);
    return () => window.removeEventListener("vistaaram:pack-change", handlePackChange);
  }, []);

  const handleSelectPack = (pack: ProductPackOption) => {
    setSelectedPack(pack);
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("vistaaram:pack-change", { detail: pack.id }));
    }
  };

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

  // Show when scrolled past 600px
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 600) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t border-[#E6DED2] shadow-[0_-4px_24px_rgba(60,35,20,0.08)] z-50 animate-in slide-in-from-bottom-full duration-300">
      <div className="mx-auto max-w-[1360px] px-4 md:px-6 py-2.5 sm:py-3 flex items-center justify-between gap-4">
        
        {/* Left Side: Product Info & Pack Switcher */}
        <div className="flex items-center gap-3 sm:gap-4 min-w-0">
          <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded overflow-hidden border border-[#E6DED2] shrink-0">
            <Image src={productContent.images[0].src} alt={productContent.name} fill className="object-cover" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-[#751E29] text-[13px] sm:text-[14px] leading-tight truncate">
                {productContent.name}
              </h3>
              {selectedPack.badge && (
                <span className="hidden md:inline-block bg-[#751E29] text-[#FAF6EE] text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider">
                  {selectedPack.badge}
                </span>
              )}
            </div>
            
            {/* On phones the price is shown next to the button instead, so this row would only be cut off. */}
            <div className="hidden sm:flex items-center gap-2 mt-0.5">
              <span className="text-[#8E8783] text-[11px] sm:text-[12px] line-through">
                ₹{selectedPack.mrp}
              </span>
              <span className="text-[#751E29] text-[13px] sm:text-[14px] font-bold">
                ₹{selectedPack.price}
              </span>
              <span className="hidden sm:inline-block bg-[#EADAB8] text-[#78591A] text-[10px] font-semibold px-2 py-0.5 rounded-full">
                Save ₹{selectedPack.mrp - selectedPack.price}
              </span>
            </div>
          </div>

          {/* Quick Pack Tabs for Desktop/Tablet */}
          <div className="hidden lg:flex items-center gap-1 ml-4 pl-4 border-l border-[#E6DED2]">
            {PACK_OPTIONS.map((pack) => {
              const isSel = selectedPack.id === pack.id;
              return (
                <button
                  key={pack.id}
                  onClick={() => handleSelectPack(pack)}
                  className={`
                    px-2.5 py-1 text-[11px] rounded-full font-medium transition-all cursor-pointer
                    ${isSel 
                      ? "bg-[#751E29] text-white shadow-xs font-semibold" 
                      : "bg-[#FAF6EE] text-[#756A63] hover:text-[#751E29] hover:bg-[#EFE8D8]"
                    }
                  `}
                >
                  {pack.name} (₹{pack.price})
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Side: Actions */}
        <div className="flex items-center justify-end gap-2.5 sm:gap-3 shrink-0">
          {/* Mobile Pricing */}
          <div className="flex sm:hidden flex-col text-right">
            <span className="text-[#751E29] text-[15px] font-bold leading-tight">₹{selectedPack.price * qty}</span>
            <span className="text-[#8E8783] text-[10px]">{selectedPack.name}</span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex items-center justify-between border border-[#E6DED2] bg-[#FAF6EE] rounded-[6px] h-[42px] sm:h-[44px] w-[84px] sm:w-[96px] px-1 shrink-0">
              <button 
                onClick={() => setQty(Math.max(1, qty - 1))}
                className="w-7 h-7 flex items-center justify-center text-[#756A63] hover:text-black cursor-pointer"
              >
                −
              </button>
              <span className="text-[13px] sm:text-[14px] font-medium text-[#4A423C]">{qty}</span>
              <button 
                onClick={() => setQty(qty + 1)}
                className="w-7 h-7 flex items-center justify-center text-[#756A63] hover:text-black cursor-pointer"
              >
                +
              </button>
            </div>
            
            <button 
              onClick={handleAddToCart}
              className="h-[42px] sm:h-[44px] px-4 md:px-6 rounded-[6px] bg-[#751E29] text-[#FAF6EE] text-[12px] md:text-[13px] font-semibold tracking-wide flex items-center justify-center gap-2 shadow-sm hover:bg-[#5E1620] transition-colors whitespace-nowrap cursor-pointer"
            >
              <CartIcon />
              <span className="hidden sm:inline">ADD TO CART — ₹{selectedPack.price * qty}</span>
              <span className="sm:hidden">ADD — ₹{selectedPack.price * qty}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
