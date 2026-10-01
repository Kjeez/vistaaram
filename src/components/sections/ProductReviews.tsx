"use client";

import Image from "next/image";
import { testimonialsContent } from "@/data/content";

function StarIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="#C9A24B">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
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
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" stroke="none" />
      <path d="M12 21c-4.97 0-9-4.03-9-9 0-4.97 4.03-9 9-9 1.5 0 2.92.38 4.15 1.05C18.25 4.6 21 8.2 21 12c0 4.97-4.03 9-9 9z" fill="#C9A24B" />
      <path d="M12 2c0 0 8 2 8 10s-8 10-8 10-8-2-8-10 8-10 8-10z" stroke="none" fill="#EADAB8" />
    </svg>
  );
}

export default function ProductReviews() {
  // Simulating the reviews array from content.ts (using testimonials for now)
  const reviews = testimonialsContent.testimonials || [];

  return (
    <section className="relative w-full bg-[#FAF6EE] py-16">
      <div className="mx-auto max-w-[1200px] px-6">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="font-display font-medium text-[#7A1F2B] text-[32px] md:text-[40px] mb-4">
            What Devotees Say
          </h2>
          {reviews.length > 0 && (
            <div className="bg-[#EADAB8] text-[#78591A] text-[13px] font-semibold px-4 py-1.5 rounded-full">
              {reviews.length} Verified Reviews
            </div>
          )}
        </div>

        {/* Reviews Grid or Empty State */}
        {reviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((review, i) => (
              <div key={i} className="bg-white border border-[#E6DED2] rounded-[12px] p-6 shadow-sm flex flex-col h-full">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-1">
                    {[...Array(review.rating)].map((_, idx) => (
                      <StarIcon key={idx} />
                    ))}
                  </div>
                  <div className="flex items-center gap-1 text-[11px] font-semibold text-[#8E8783] bg-[#FAF6EE] px-2 py-1 rounded">
                    <VerifiedIcon />
                    Verified Buyer
                  </div>
                </div>
                
                <p className="font-body text-[#4A423C] text-[15px] leading-relaxed mb-6 flex-1">
                  "{review.quote}"
                </p>
                
                <div className="flex items-center gap-3 pt-4 border-t border-[#E6DED2]">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden bg-[#FAF6EE]">
                    <Image src={review.avatar} alt={review.name} fill className="object-cover" />
                  </div>
                  <div>
                    <p className="text-[#751E29] text-[14px] font-semibold">{review.name}</p>
                    <p className="text-[#8E8783] text-[12px]">{review.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="max-w-[600px] mx-auto bg-white border border-[#C9A24B]/40 rounded-[12px] p-8 text-center shadow-sm">
            <div className="flex justify-center mb-4">
              <DiyaIcon />
            </div>
            <h3 className="font-display text-[#751E29] text-[22px] font-medium mb-3">
              Be one of our first 100 reviewers
            </h3>
            <p className="text-[#5A4F46] text-[15px] mb-6">
              Review your purchase and get 15% off your next order.
            </p>
            <button className="bg-[#FAF6EE] border border-[#C9A24B] text-[#78591A] font-semibold text-[13px] tracking-wide uppercase px-6 py-3 rounded-full hover:bg-[#EADAB8] transition-colors">
              Write a Review
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
