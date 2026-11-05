"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { storePolicy } from "@/data/content";

const AUTO_HIDE_MS = 8000;

/**
 * Bar that slides up from the bottom of the screen after something is added to the cart:
 * what was added, the cart total, progress to free shipping, and View cart / Checkout.
 */
export default function CartAddedBar() {
  const { lastAdded, dismissLastAdded, count, subtotal } = useCart();
  const pathname = usePathname();
  const [hovered, setHovered] = useState(false);
  const onCartPages = pathname === "/cart" || pathname.startsWith("/checkout");

  // Hide after a few seconds unless the pointer is over it; a new add restarts the timer.
  useEffect(() => {
    if (!lastAdded || hovered) return;
    const t = setTimeout(dismissLastAdded, AUTO_HIDE_MS);
    return () => clearTimeout(t);
  }, [lastAdded, hovered, dismissLastAdded]);

  // Leaving for the cart or checkout makes the bar redundant.
  useEffect(() => {
    if (onCartPages && lastAdded) dismissLastAdded();
  }, [onCartPages, lastAdded, dismissLastAdded]);

  if (!lastAdded || onCartPages) return null;

  const { freeShippingThreshold } = storePolicy;
  const toFree = Math.max(0, freeShippingThreshold - subtotal);

  return (
    <div
      key={lastAdded.addedAt}
      role="status"
      aria-live="polite"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="fixed inset-x-0 bottom-0 z-[70] px-3 pb-[max(12px,env(safe-area-inset-bottom))] sm:px-6 sm:pb-6 pointer-events-none animate-[cartBarIn_0.35s_ease-out]"
    >
      <div className="pointer-events-auto mx-auto max-w-[760px] bg-[#FFFDF8] border border-[#E2CFA6] rounded-2xl shadow-[0_-8px_40px_rgba(42,27,24,0.18)] p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5">
        <div className="flex items-center gap-3.5 min-w-0 flex-1">
          <div className="relative w-14 h-14 shrink-0 rounded-lg overflow-hidden bg-[#EFE8D8]">
            <Image src={lastAdded.image} alt="" fill sizes="56px" className="object-cover" />
          </div>
          <div className="min-w-0">
            <p className="text-[12px] font-semibold tracking-[0.14em] uppercase text-[#2F7A4B]">✓ Added to cart</p>
            <p className="text-[15px] text-[#2A1B18] font-medium truncate">
              {lastAdded.name} <span className="text-[#8A7A70] font-normal">× {lastAdded.quantity}</span>
            </p>
            <p className="text-[13px] text-[#66544D]">
              {count} {count === 1 ? "item" : "items"} · ₹{subtotal.toLocaleString("en-IN")}
              {" · "}
              {toFree > 0 ? (
                <span>₹{toFree} more for free shipping</span>
              ) : (
                <span className="text-[#2F7A4B] font-medium">Free shipping unlocked</span>
              )}
            </p>
          </div>
          <button
            type="button"
            onClick={dismissLastAdded}
            aria-label="Close"
            className="sm:hidden self-start -mt-1 -mr-1 w-8 h-8 shrink-0 rounded-full text-[#8A7A70] hover:bg-[#F3EBDD] text-[18px] leading-none"
          >
            ×
          </button>
        </div>
        <div className="flex items-center gap-2.5 shrink-0">
          <Link
            href="/cart"
            className="flex-1 sm:flex-none h-11 px-5 rounded-full border border-[#7A1F2B] text-[#7A1F2B] text-[13px] font-semibold tracking-[0.1em] uppercase flex items-center justify-center hover:bg-[#7A1F2B]/5"
          >
            View cart
          </Link>
          <Link
            href="/checkout"
            className="flex-1 sm:flex-none h-11 px-6 rounded-full bg-[#7A1F2B] text-[#FAF1E4] text-[13px] font-semibold tracking-[0.1em] uppercase flex items-center justify-center hover:bg-[#561520]"
          >
            Checkout
          </Link>
          <button
            type="button"
            onClick={dismissLastAdded}
            aria-label="Close"
            className="hidden sm:flex w-9 h-9 items-center justify-center rounded-full text-[#8A7A70] hover:bg-[#F3EBDD] text-[20px] leading-none"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
}
