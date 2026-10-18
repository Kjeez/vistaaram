"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getProductId } from "@/lib/medusa";
import { useCustomer } from "@/context/CustomerContext";
import { errorMessage, fetchMyReviews, fetchProductReviews, Review, ReviewSummary, submitReview } from "@/lib/account";

function StarIcon({ filled = true, size = 14 }: { filled?: boolean; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? "#C9A24B" : "none"} stroke="#C9A24B" strokeWidth={filled ? 0 : 1.5}>
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function Stars({ rating, size }: { rating: number; size?: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <StarIcon key={n} filled={n <= Math.round(rating)} size={size} />
      ))}
    </div>
  );
}

function VerifiedIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9 12l2 2 4-4" />
      <circle cx="12" cy="12" r="10" />
    </svg>
  );
}

function DiyaIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#C9A24B" strokeWidth="1.5">
      <path d="M12 21c-4.97 0-9-4.03-9-9 0-4.97 4.03-9 9-9 1.5 0 2.92.38 4.15 1.05C18.25 4.6 21 8.2 21 12c0 4.97-4.03 9-9 9z" fill="#C9A24B" />
      <path d="M12 2c0 0 8 2 8 10s-8 10-8 10-8-2-8-10 8-10 8-10z" stroke="none" fill="#EADAB8" />
    </svg>
  );
}

const inputClass =
  "w-full rounded-lg border border-[#E5DCC8] bg-white px-4 py-3 text-[15px] text-[#4A3728] placeholder:text-[#B0A090] outline-none focus:border-[#C9A24B] focus:ring-2 focus:ring-[#C9A24B]/20";

function ReviewForm({ productId, onSubmitted }: { productId: string; onSubmitted: () => void }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!rating) return setError("Please choose a star rating.");
    if (content.trim().length < 10) return setError("Please write at least a sentence about your experience.");
    setBusy(true);
    try {
      await submitReview({ product_id: productId, rating, title: title.trim() || undefined, content: content.trim() });
      onSubmitted();
    } catch (err) {
      setError(errorMessage(err));
      setBusy(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
      <div>
        <p className="text-[13px] font-medium text-[#5A4F46] mb-2">Your rating *</p>
        <div className="flex gap-1" onMouseLeave={() => setHover(0)}>
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setRating(n)}
              onMouseEnter={() => setHover(n)}
              aria-label={`${n} star${n > 1 ? "s" : ""}`}
              className="p-0.5"
            >
              <StarIcon filled={n <= (hover || rating)} size={28} />
            </button>
          ))}
        </div>
      </div>
      <label className="block">
        <span className="block text-[13px] font-medium text-[#5A4F46] mb-1.5">Title (optional)</span>
        <input className={inputClass} value={title} maxLength={120} onChange={(e) => setTitle(e.target.value)} placeholder="Sum it up in a few words" />
      </label>
      <label className="block">
        <span className="block text-[13px] font-medium text-[#5A4F46] mb-1.5">Your review *</span>
        <textarea
          className={`${inputClass} min-h-[110px]`}
          value={content}
          maxLength={2000}
          onChange={(e) => setContent(e.target.value)}
          placeholder="How was the fragrance, the smoke, the burn time?"
        />
      </label>
      {error && <p className="text-[13px] text-red-600">{error}</p>}
      <button
        type="submit"
        disabled={busy}
        className="self-start bg-[#751E29] text-[#FAF6EE] font-semibold text-[13px] tracking-wide uppercase px-6 py-3 rounded-full hover:bg-[#5E1620] transition-colors disabled:opacity-60"
      >
        {busy ? "Submitting…" : "Submit review"}
      </button>
    </form>
  );
}

export default function ProductReviews() {
  const { customer } = useCustomer();
  const pathname = usePathname();
  const [productId, setProductId] = useState<string | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [summary, setSummary] = useState<ReviewSummary | null>(null);
  const [writing, setWriting] = useState(false);
  const [alreadyReviewed, setAlreadyReviewed] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const id = await getProductId();
      if (!id || cancelled) return;
      setProductId(id);
      try {
        const data = await fetchProductReviews(id);
        if (cancelled) return;
        setReviews(data.reviews);
        setSummary(data.summary);
      } catch {
        // Reviews are non-critical; the section falls back to its empty state.
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!customer || !productId) return;
    fetchMyReviews()
      .then((mine) => setAlreadyReviewed(mine.some((r) => r.product_id === productId)))
      .catch(() => {});
  }, [customer, productId]);

  const loginHref = `/account/login?next=${encodeURIComponent(`${pathname}#reviews`)}`;

  const writeAction = submitted ? (
    <p className="text-[14px] text-[#1F6B2A]">Thank you! Your review will appear here once our team has checked it.</p>
  ) : alreadyReviewed ? (
    <p className="text-[13px] text-[#8E8783]">You&apos;ve already reviewed this product. Thank you!</p>
  ) : !customer ? (
    <Link
      href={loginHref}
      className="inline-block bg-[#FAF6EE] border border-[#C9A24B] text-[#78591A] font-semibold text-[13px] tracking-wide uppercase px-6 py-3 rounded-full hover:bg-[#EADAB8] transition-colors"
    >
      Log in to write a review
    </Link>
  ) : writing && productId ? (
    <div className="w-full max-w-[560px] mx-auto bg-white border border-[#E6DED2] rounded-[12px] p-6">
      <ReviewForm
        productId={productId}
        onSubmitted={() => {
          setWriting(false);
          setSubmitted(true);
        }}
      />
    </div>
  ) : (
    <button
      onClick={() => setWriting(true)}
      className="bg-[#FAF6EE] border border-[#C9A24B] text-[#78591A] font-semibold text-[13px] tracking-wide uppercase px-6 py-3 rounded-full hover:bg-[#EADAB8] transition-colors"
    >
      Write a review
    </button>
  );

  return (
    <section id="reviews" className="relative w-full bg-[#FAF6EE] py-16 scroll-mt-24">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="font-display font-medium text-[#7A1F2B] text-[32px] md:text-[40px] mb-4">What Devotees Say</h2>
          {summary && summary.count > 0 && (
            <div className="flex items-center gap-3">
              <Stars rating={summary.average} size={18} />
              <span className="text-[#4A423C] text-[15px] font-medium">{summary.average.toFixed(1)} out of 5</span>
              <span className="bg-[#EADAB8] text-[#78591A] text-[13px] font-semibold px-3 py-1 rounded-full">
                {summary.count} {summary.count === 1 ? "review" : "reviews"}
              </span>
            </div>
          )}
        </div>

        {reviews.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              {reviews.map((review) => (
                <div key={review.id} className="bg-white border border-[#E6DED2] rounded-[12px] p-6 shadow-sm flex flex-col h-full">
                  <div className="flex items-center justify-between mb-4">
                    <Stars rating={review.rating} />
                    {review.verified_purchase && (
                      <div className="flex items-center gap-1 text-[11px] font-semibold text-[#8E8783] bg-[#FAF6EE] px-2 py-1 rounded">
                        <VerifiedIcon />
                        Verified Buyer
                      </div>
                    )}
                  </div>
                  {review.title && <p className="font-display text-[#751E29] text-[17px] mb-2">{review.title}</p>}
                  <p className="font-body text-[#4A423C] text-[15px] leading-relaxed mb-6 flex-1">{review.content}</p>
                  <div className="pt-4 border-t border-[#E6DED2] flex items-center justify-between">
                    <p className="text-[#751E29] text-[14px] font-semibold">{review.customer_name}</p>
                    <p className="text-[#8E8783] text-[12px]">
                      {new Date(review.created_at).toLocaleDateString("en-IN", { month: "short", year: "numeric" })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center">{writeAction}</div>
          </>
        ) : (
          <div className="max-w-[600px] mx-auto bg-white border border-[#C9A24B]/40 rounded-[12px] p-8 text-center shadow-sm flex flex-col items-center">
            <div className="flex justify-center mb-4">
              <DiyaIcon />
            </div>
            <h3 className="font-display text-[#751E29] text-[22px] font-medium mb-3">Be one of our first reviewers</h3>
            <p className="text-[#5A4F46] text-[15px] mb-6">Tried our Sambrani cups? Tell other devotees what you thought.</p>
            {writeAction}
          </div>
        )}
      </div>
    </section>
  );
}
