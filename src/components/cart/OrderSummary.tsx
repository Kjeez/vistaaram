"use client";

import { useCart } from "@/context/CartContext";
import { useState } from "react";
import Link from "next/link";

function LockIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#A79C91" strokeWidth="1.5">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

function BoxIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#A79C91" strokeWidth="1.5">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  );
}

function RefreshIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#A79C91" strokeWidth="1.5">
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
    </svg>
  );
}

function TruckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#A79C91" strokeWidth="1.5">
      <rect x="1" y="3" width="15" height="13" />
      <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
      <circle cx="5.5" cy="18.5" r="2.5" />
      <circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
  );
}

export default function OrderSummary() {
  const { subtotal, shipping, discount, total, applyCoupon, coupon, removeCoupon } = useCart();
  const [codeInput, setCodeInput] = useState("");
  const [couponMsg, setCouponMsg] = useState<{ text: string; isError: boolean } | null>(null);

  const handleApplyCoupon = () => {
    if (!codeInput) return;
    const res = applyCoupon(codeInput);
    setCouponMsg({ text: res.message, isError: !res.success });
    if (res.success) setCodeInput("");
  };

  const handleRemoveCoupon = () => {
    removeCoupon();
    setCouponMsg(null);
  };

  return (
    <div className="bg-[#FAF6EE] border border-[#C9A24B]/30 rounded-xl p-6 lg:p-8 flex flex-col w-full shadow-sm sticky top-24">
      
      <h2 className="font-display font-medium text-[#7A1F2B] text-[22px] md:text-[24px] mb-6">
        Order Summary
      </h2>
      
      <div className="flex flex-col gap-4 text-[14px] text-[#5A4F46] font-body border-b border-[#E6DED2] pb-6 mb-6">
        <div className="flex justify-between items-center">
          <span>Subtotal</span>
          <span className="font-medium text-[#4A423C]">₹{subtotal}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span>Shipping</span>
          {shipping === 0 ? (
            <span className="font-semibold text-[#C9A24B]">FREE</span>
          ) : (
            <span className="font-medium text-[#4A423C]">₹{shipping}</span>
          )}
        </div>

        {discount > 0 && (
          <div className="flex justify-between items-center text-[#228B22]">
            <span>Discount ({coupon})</span>
            <span className="font-medium">-₹{discount}</span>
          </div>
        )}
      </div>

      {/* Coupon Field */}
      <div className="flex flex-col gap-2 mb-6">
        {coupon ? (
          <div className="flex items-center justify-between bg-[#EFE8D8] px-3 py-2 rounded text-[13px] text-[#5A4F46]">
            <span>Code <strong>{coupon}</strong> applied</span>
            <button onClick={handleRemoveCoupon} className="text-[#751E29] hover:underline">Remove</button>
          </div>
        ) : (
          <div className="flex items-center h-10 w-full border border-[#E6DED2] bg-white rounded overflow-hidden">
            <input 
              type="text" 
              placeholder="Coupon code" 
              value={codeInput}
              onChange={(e) => setCodeInput(e.target.value)}
              className="flex-1 h-full px-3 text-[13px] outline-none placeholder:text-[#A79C91]"
            />
            <button 
              onClick={handleApplyCoupon}
              className="h-full px-4 bg-[#751E29] text-white text-[13px] font-semibold hover:bg-[#5E1620] transition-colors"
            >
              Apply
            </button>
          </div>
        )}
        {couponMsg && (
          <span className={`text-[12px] ${couponMsg.isError ? 'text-red-500' : 'text-[#228B22]'}`}>
            {couponMsg.text}
          </span>
        )}
      </div>

      {/* Total */}
      <div className="flex justify-between items-center mb-6">
        <span className="font-display font-medium text-[#751E29] text-[20px]">TOTAL</span>
        <span className="font-display font-semibold text-[#751E29] text-[28px]">₹{total}</span>
      </div>

      {/* Checkout Button */}
      <Link 
        href="/checkout"
        className="w-full h-[52px] rounded-full bg-[#751E29] text-[#FAF6EE] text-[13px] font-bold tracking-[0.1em] uppercase flex items-center justify-center gap-2 shadow-[0_6px_18px_rgba(117,30,41,0.2)] hover:bg-[#5E1620] transition-colors mb-6"
      >
        <LockIcon />
        CHECKOUT — ₹{total}
      </Link>

      {/* Trust Chips (2x2 Grid) */}
      <div className="grid grid-cols-2 gap-y-4 gap-x-2 text-[12px] text-[#8E8783]">
        <div className="flex items-center gap-2">
          <BoxIcon /> <span>COD Available</span>
        </div>
        <div className="flex items-center gap-2">
          <ShieldIcon /> <span>Secure Payments</span>
        </div>
        <div className="flex items-center gap-2">
          <RefreshIcon /> <span>7-Day Returns</span>
        </div>
        <div className="flex items-center gap-2">
          <TruckIcon /> <span>Ships in 24 hrs</span>
        </div>
      </div>

    </div>
  );
}
