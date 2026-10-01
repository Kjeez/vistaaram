"use client";

import Image from "next/image";
import { useCart, CartItem } from "@/context/CartContext";
import { useState } from "react";

export default function CartLineItem({ item }: { item: CartItem }) {
  const { updateQuantity, removeItem, addBundle } = useCart();
  const [toastMessage, setToastMessage] = useState("");

  const handleRemove = () => {
    removeItem(item.id);
    // Simple toast simulation
    setToastMessage("Removed — Undo");
    setTimeout(() => setToastMessage(""), 3000);
  };

  const lineTotal = item.price * item.quantity;

  return (
    <div className="flex flex-col">
      <div className="flex flex-col sm:flex-row gap-6 py-6 items-start sm:items-center">
        
        {/* Thumbnail */}
        <div className="relative w-24 h-24 shrink-0 rounded-xl overflow-hidden bg-white border border-[#E6DED2]">
          <Image src={item.image} alt={item.name} fill className="object-cover" />
        </div>

        {/* Info */}
        <div className="flex flex-col flex-1 min-w-0">
          <h3 className="font-display text-[#751E29] text-[18px] md:text-[20px] font-medium leading-tight mb-1 truncate">
            {item.name}
          </h3>
          <p className="text-[#8E8783] text-[13px] mb-4">
            {item.subtitle}
          </p>

          <div className="flex items-center justify-between mt-auto">
            
            {/* Qty Stepper & Remove */}
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-between border border-[#C9A24B]/40 bg-white rounded-[6px] h-9 w-[100px] px-1">
                <button 
                  onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                  className="w-7 h-7 flex items-center justify-center text-[#756A63] hover:text-black transition-colors"
                >
                  −
                </button>
                <span className="text-[14px] font-medium text-[#4A423C]">{item.quantity}</span>
                <button 
                  onClick={() => updateQuantity(item.id, Math.min(10, item.quantity + 1))}
                  className="w-7 h-7 flex items-center justify-center text-[#756A63] hover:text-black transition-colors"
                >
                  +
                </button>
              </div>
              
              <button 
                onClick={handleRemove}
                className="text-[#A79C91] text-[13px] underline underline-offset-2 hover:text-[#751E29] transition-colors"
              >
                Remove
              </button>
            </div>

            {/* Line Total */}
            <div className="text-right">
              <p className="font-display text-[#751E29] text-[18px] md:text-[20px] font-medium">
                ₹{lineTotal}
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* Upsell Row (only show if quantity is 1) */}
      {item.quantity === 1 && item.id === 'sambrani-cup' && (
        <div className="flex items-center justify-between bg-[#FAF6EE] border border-[#C9A24B]/40 rounded-lg p-3 sm:px-4 sm:py-3 mt-2 mb-4">
          <div className="flex items-center gap-3">
            {/* Simple diya icon */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C9A24B" strokeWidth="1.5" className="shrink-0">
              <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" stroke="none" />
              <path d="M12 21c-4.97 0-9-4.03-9-9 0-4.97 4.03-9 9-9 1.5 0 2.92.38 4.15 1.05C18.25 4.6 21 8.2 21 12c0 4.97-4.03 9-9 9z" fill="none" />
              <path d="M12 20s-6-3-6-8c0-3.3 2.7-6 6-9 3.3 3 6 5.7 6 9 0 5-6 8-6 8z" fill="none" />
            </svg>
            <p className="text-[#5A4F46] text-[13px] md:text-[14px]">
              <span className="font-medium">Complete your ritual</span> — add a 2nd box and save 10%
            </p>
          </div>
          <button 
            onClick={addBundle}
            className="shrink-0 ml-4 h-8 px-4 border border-[#C9A24B] rounded-full text-[#78591A] text-[12px] font-semibold tracking-wide bg-white hover:bg-[#EADAB8] transition-colors whitespace-nowrap"
          >
            Add — ₹502 total
          </button>
        </div>
      )}

      {/* Divider */}
      <div className="w-full h-[1px] bg-[#C9A24B]/30" />

      {/* Toast Overlay */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#3A0F14] text-white px-6 py-3 rounded-full text-[13px] font-medium shadow-xl z-50 animate-in fade-in slide-in-from-bottom-4">
          {toastMessage}
        </div>
      )}
    </div>
  );
}
