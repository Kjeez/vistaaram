"use client";

import Link from "next/link";

function DiyaIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#C9A24B" strokeWidth="1.2">
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" stroke="none" />
      <path d="M12 21c-4.97 0-9-4.03-9-9 0-4.97 4.03-9 9-9 1.5 0 2.92.38 4.15 1.05C18.25 4.6 21 8.2 21 12c0 4.97-4.03 9-9 9z" fill="none" />
      <path d="M12 2c0 0 8 2 8 10s-8 10-8 10-8-2-8-10 8-10 8-10z" stroke="none" />
      <path d="M12 20s-6-3-6-8c0-3.3 2.7-6 6-9 3.3 3 6 5.7 6 9 0 5-6 8-6 8z" fill="none" />
      <path d="M12 11s-2-1.5-2-3.5c0-1.1.9-2 2-3 1.1 1 2 1.9 2 3 0 2-2 3.5-2 3.5z" />
    </svg>
  );
}

export default function CartEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 px-6">
      <div className="mb-6">
        <DiyaIcon />
      </div>
      <h2 className="font-display font-medium text-[#7A1F2B] text-[24px] md:text-[28px] mb-3">
        Your cart is waiting for its first blessing
      </h2>
      <p className="text-[#8E8783] text-[15px] mb-8">
        Bring home the sacred fragrance of Devbhoomi.
      </p>
      <Link 
        href="/product/natural-sambrani-hawan-cup"
        className="inline-flex items-center justify-center h-[48px] px-8 rounded-full border-[1.5px] border-[#C9A24B] text-[#78591A] font-semibold tracking-wide bg-transparent hover:bg-[#EADAB8]/30 transition-colors"
      >
        Explore the Hawan Cup
      </Link>
    </div>
  );
}
