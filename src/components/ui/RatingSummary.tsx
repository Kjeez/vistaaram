"use client";

import { useEffect, useState } from "react";
import { getProductId } from "@/lib/medusa";
import { fetchProductReviews, ReviewSummary } from "@/lib/account";
import { PRODUCT_PATH } from "@/lib/site";

/** Star rating + review count from approved reviews; renders nothing until there is at least one. */
export default function RatingSummary({ className = "" }: { className?: string }) {
  const [summary, setSummary] = useState<ReviewSummary | null>(null);

  useEffect(() => {
    let cancelled = false;
    getProductId()
      .then((id) => (id ? fetchProductReviews(id) : null))
      .then((data) => {
        if (!cancelled && data) setSummary(data.summary);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  if (!summary || summary.count === 0) return null;

  return (
    <a href={`${PRODUCT_PATH}#reviews`} className={`inline-flex items-center gap-2 text-[13px] text-[#5A4F46] hover:text-[#751E29] ${className}`}>
      <span className="flex gap-0.5" aria-hidden="true">
        {[1, 2, 3, 4, 5].map((n) => (
          <svg key={n} width="15" height="15" viewBox="0 0 24 24" fill={n <= Math.round(summary.average) ? "#C9A24B" : "none"} stroke="#C9A24B" strokeWidth="1.5">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        ))}
      </span>
      <span className="font-medium">{summary.average.toFixed(1)}</span>
      <span className="underline underline-offset-2">
        {summary.count} {summary.count === 1 ? "review" : "reviews"}
      </span>
    </a>
  );
}
