"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useCustomer } from "@/context/CustomerContext";
import { getProductId } from "@/lib/medusa";

/** Heart toggle for the product page; sends guests to login and back. */
export default function WishlistButton({ className = "" }: { className?: string }) {
  const { customer, wishlist, toggleWishlist } = useCustomer();
  const router = useRouter();
  const pathname = usePathname();
  const [productId, setProductId] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    getProductId().then(setProductId);
  }, []);

  const saved = productId ? wishlist.has(productId) : false;

  const handleClick = async () => {
    if (!customer) {
      router.push(`/account/login?next=${encodeURIComponent(pathname)}`);
      return;
    }
    if (!productId || busy) return;
    setBusy(true);
    try {
      await toggleWishlist(productId);
    } catch {
      // The context already rolled the heart back to the server's state.
    } finally {
      setBusy(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={busy}
      aria-pressed={saved}
      aria-label={saved ? "Remove from wishlist" : "Save to wishlist"}
      title={saved ? "Saved to wishlist" : "Save to wishlist"}
      className={`h-[52px] w-[52px] shrink-0 rounded-full border border-[#E6DED2] bg-white flex items-center justify-center hover:border-[#751E29] transition-colors ${className}`}
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill={saved ? "#751E29" : "none"} stroke="#751E29" strokeWidth="1.6">
        <path d="M12 21s-7.5-4.6-9.6-9.2C.9 8.5 3 4.5 6.8 4.5c2.1 0 3.6 1.1 5.2 3 1.6-1.9 3.1-3 5.2-3 3.8 0 5.9 4 4.4 7.3C19.5 16.4 12 21 12 21z" />
      </svg>
    </button>
  );
}
