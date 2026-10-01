"use client";

import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import PahadiDivider from "@/components/ui/PahadiDivider";
import PageTransition from "@/components/ui/PageTransition";
import CartLineItem from "@/components/cart/CartLineItem";
import OrderSummary from "@/components/cart/OrderSummary";
import CartEmptyState from "@/components/cart/CartEmptyState";
import CartBeforeYouGo from "@/components/cart/CartBeforeYouGo";
import { useCart } from "@/context/CartContext";
import { useEffect, useState } from "react";

export default function CartPage() {
  const { items, subtotal, count } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const FREE_SHIPPING_THRESHOLD = 499;
  const amountAway = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progressPercent = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);
  const hasFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;

  if (!mounted) return null; // prevent hydration mismatch

  return (
    <>
      <Navbar />
      <PageTransition>
        <main className="bg-[#FAF6EE] min-h-screen py-10 md:py-16">
        <div className="mx-auto max-w-[1200px] px-6">
          
          {/* HEADER */}
          <div className="flex flex-col items-center text-center mb-8">
            <h1 className="font-display font-medium text-[#7A1F2B] text-[2.25rem] leading-tight mb-2">
              Your Cart
            </h1>
            <p className="text-[#8E8783] text-[14px]">
              {count} {count === 1 ? 'item' : 'items'}
            </p>
          </div>
          
          <div className="w-full max-w-[600px] mx-auto mb-10">
            <PahadiDivider className="py-2 bg-transparent" />
          </div>

          {items.length === 0 ? (
            <CartEmptyState />
          ) : (
            <div className="flex flex-col w-full">
              
              {/* FREE-SHIPPING BAR */}
              <div className="w-full max-w-[800px] mx-auto mb-10 md:mb-14">
                <div className="flex justify-center mb-3 text-[13px] md:text-[14px] font-medium">
                  {hasFreeShipping ? (
                    <span className="text-[#C9A24B]">🎉 You've unlocked FREE shipping!</span>
                  ) : (
                    <span className="text-[#751E29]">
                      You're <span className="font-bold">₹{amountAway}</span> away from FREE shipping
                    </span>
                  )}
                </div>
                <div className="relative w-full h-[8px] bg-[#E6DED2] rounded-full overflow-hidden">
                  <div 
                    className="absolute top-0 left-0 h-full bg-[#C9A24B] rounded-full transition-all duration-300 ease-out"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <div className="flex justify-between mt-2 text-[11px] text-[#A79C91] font-medium">
                  <span>₹0</span>
                  <span>₹499</span>
                </div>
              </div>

              {/* MAIN GRID */}
              <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">
                
                {/* Left Column: Items */}
                <div className="w-full lg:w-[60%] flex flex-col gap-2">
                  <div className="flex justify-between text-[#8E8783] text-[11px] font-semibold tracking-widest uppercase border-b border-[#E6DED2] pb-3 mb-2 px-2">
                    <span>Product</span>
                    <div className="flex gap-[40px] md:gap-[90px] mr-2 md:mr-4">
                      <span>Quantity</span>
                      <span>Total</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col">
                    {items.map(item => (
                      <CartLineItem key={item.id} item={item} />
                    ))}
                  </div>
                </div>

                {/* Right Column: Order Summary */}
                <div className="w-full lg:w-[40%] shrink-0 relative">
                  <OrderSummary />
                </div>
              </div>
            </div>
          )}

          {/* BELOW FOLD: Before You Go */}
          <CartBeforeYouGo />

        </div>
        </main>
      </PageTransition>
      <Footer />
    </>
  );
}
