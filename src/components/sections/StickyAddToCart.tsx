"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { productContent } from "@/data/content";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

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
  const [qty, setQty] = useState(1);
  const { addItem } = useCart();
  const router = useRouter();

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
      <div className="mx-auto max-w-[1360px] px-4 md:px-6 py-3 flex items-center justify-between gap-4">
        
        {/* Left Side: Product Info (Hidden on very small screens) */}
        <div className="hidden sm:flex items-center gap-4">
          <div className="relative w-12 h-12 rounded overflow-hidden border border-[#E6DED2]">
            <Image src={productContent.images[0].src} alt={productContent.name} fill className="object-cover" />
          </div>
          <div>
            <h3 className="font-semibold text-[#751E29] text-[14px] leading-tight mb-0.5">
              {productContent.name}
            </h3>
            <div className="flex items-center gap-2">
              <span className="text-[#8E8783] text-[12px] line-through">₹{productContent.mrp}</span>
              <span className="text-[#751E29] text-[14px] font-bold">₹{productContent.price}</span>
              <span className="bg-[#EADAB8] text-[#78591A] text-[10px] font-semibold px-2 py-0.5 rounded-full">
                You save ₹{productContent.mrp - productContent.price}
              </span>
            </div>
          </div>
        </div>

        {/* Right Side: Actions */}
        <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto">
          {/* Mobile Pricing (Visible only on small screens) */}
          <div className="flex sm:hidden flex-col">
            <span className="text-[#751E29] text-[16px] font-bold">₹{productContent.price}</span>
            <span className="text-[#8E8783] text-[12px] line-through">₹{productContent.mrp}</span>
          </div>

          <div className="flex items-center gap-3 ml-auto sm:ml-0">
            <div className="flex items-center justify-between border border-[#E6DED2] bg-[#FAF6EE] rounded-[6px] h-[44px] w-[90px] md:w-[100px] px-1 shrink-0">
              <button 
                onClick={() => setQty(Math.max(1, qty - 1))}
                className="w-7 h-7 flex items-center justify-center text-[#756A63] hover:text-black"
              >
                −
              </button>
              <span className="text-[14px] font-medium text-[#4A423C]">{qty}</span>
              <button 
                onClick={() => setQty(qty + 1)}
                className="w-7 h-7 flex items-center justify-center text-[#756A63] hover:text-black"
              >
                +
              </button>
            </div>
            
            <button 
              onClick={handleAddToCart}
              className="h-[44px] px-4 md:px-6 rounded-[6px] bg-[#751E29] text-[#FAF6EE] text-[12px] md:text-[13px] font-semibold tracking-wide flex items-center justify-center gap-2 shadow-sm hover:bg-[#5E1620] transition-colors whitespace-nowrap"
            >
              <CartIcon />
              <span className="hidden sm:inline">ADD TO CART — ₹{productContent.price * qty}</span>
              <span className="sm:hidden">ADD TO CART</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
