"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCustomer } from "@/context/CustomerContext";
import { errorMessage, fetchWishlist, WishlistEntry } from "@/lib/account";
import { PRODUCT_HANDLE } from "@/lib/medusa";
import { AccountShell, Card, Loading, Notice, PageTitle, primaryButtonClass } from "./ui";

/** Storefront URL for a Medusa product handle (the site uses its own SEO slug). */
function productPath(handle: string) {
  return handle === PRODUCT_HANDLE ? "/product/natural-sambrani-hawan-cup" : `/product/${handle}`;
}

function Wishlist() {
  const { toggleWishlist } = useCustomer();
  const [items, setItems] = useState<WishlistEntry[] | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchWishlist()
      .then(setItems)
      .catch((err) => {
        setError(errorMessage(err, "We couldn't load your wishlist."));
        setItems([]);
      });
  }, []);

  const remove = async (productId: string) => {
    setItems((prev) => prev?.filter((i) => i.product_id !== productId) ?? null);
    try {
      await toggleWishlist(productId);
    } catch (err) {
      setError(errorMessage(err));
    }
  };

  if (!items) return <Loading label="Loading your wishlist…" />;

  return (
    <>
      <PageTitle title="Wishlist" subtitle="Products you've saved for later." />
      {error && <div className="mb-4"><Notice tone="error">{error}</Notice></div>}
      {items.length === 0 ? (
        <Card className="text-center">
          <p className="text-[15px] text-[#5A4F46] mb-5">Your wishlist is empty. Tap the heart on a product to save it here.</p>
          <Link href="/shop" className={`${primaryButtonClass} inline-flex`}>
            Browse products
          </Link>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {items
            .filter((i) => i.product)
            .map(({ product_id, product }) => (
              <Card key={product_id} className="!p-4 flex gap-4 items-center">
                <Link href={productPath(product!.handle)} className="relative w-20 h-20 shrink-0 rounded-lg overflow-hidden bg-white border border-[#E6DED2]">
                  <Image
                    src={product!.thumbnail?.replace(/^http:\/\/localhost(:\d+)?/, "") || "/images/product/1.jpg"}
                    alt={product!.title}
                    fill
                    className="object-cover"
                  />
                </Link>
                <div className="flex-1 min-w-0">
                  <Link href={productPath(product!.handle)} className="font-medium text-[#4A423C] text-[15px] hover:text-[#751E29]">
                    {product!.title}
                  </Link>
                  <div className="flex gap-4 mt-2 text-[13px]">
                    <Link href={productPath(product!.handle)} className="text-[#751E29] hover:underline">View &amp; buy</Link>
                    <button onClick={() => remove(product_id)} className="text-[#8E8783] hover:underline">Remove</button>
                  </div>
                </div>
              </Card>
            ))}
        </div>
      )}
    </>
  );
}

export default function WishlistPage() {
  return (
    <AccountShell>
      <Wishlist />
    </AccountShell>
  );
}
