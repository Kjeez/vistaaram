"use client";

import Image from "next/image";

function LotusIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C9A24B" strokeWidth="1.5">
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" stroke="none" />
      <path d="M12 21c-4.97 0-9-4.03-9-9 0-4.97 4.03-9 9-9 1.5 0 2.92.38 4.15 1.05C18.25 4.6 21 8.2 21 12c0 4.97-4.03 9-9 9z" stroke="none" />
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" stroke="none" />
      <path d="M12 2c0 0 8 2 8 10s-8 10-8 10-8-2-8-10 8-10 8-10z" />
      <path d="M12 22V2" />
    </svg>
  );
}

function CartPlusIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="9" cy="21" r="1.5" />
      <circle cx="20" cy="21" r="1.5" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
      <path d="M11 10h4M13 8v4" stroke="currentColor" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="#C9A24B">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

const relatedProducts = [
  {
    id: 1,
    title: "Value Pack",
    desc: "2 Boxes, Save 10%",
    image: "/images/product-4.jpg",
    price: 502,
    originalPrice: 558,
    status: "available",
    rating: 4.8,
    reviews: 120,
    cta: "Add Bundle",
    badge: "",
  },
  {
    id: 2,
    title: "Daily Puja Kit",
    desc: "Sandalwood, Kapoor, Ghee Wicks & More",
    image: "/images/coming-soon-1.jpg",
    price: null,
    status: "coming_soon",
    cta: "Notify Me",
    badge: "Coming Soon",
  },
  {
    id: 3,
    title: "Devotional Gifting Pack",
    desc: "A Beautiful Gift for Your Loved Ones",
    image: "/images/coming-soon-3.jpg",
    price: null,
    status: "coming_soon",
    cta: "Notify Me",
    badge: "Coming Soon",
  },
];

export default function RelatedProducts() {
  return (
    <section className="relative w-full bg-[#FAF6EE] py-16 overflow-hidden">
      <div className="mx-auto max-w-[1200px] px-6">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <p className="text-[#C9A24B] text-[11px] font-semibold tracking-[0.2em] uppercase mb-4">
            COMPLETE YOUR RITUAL
          </p>
          <h2 className="font-display font-semibold text-[#7A1F2B] text-[32px] md:text-[42px] leading-tight">
            You May Also Like
          </h2>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {relatedProducts.map((item) => (
            <div key={item.id} className="group relative bg-white rounded-xl border border-[#C9A24B]/30 hover:border-[#C9A24B]/60 hover:shadow-xl transition-all duration-500 overflow-hidden flex flex-col h-[420px]">
              
              {/* Image */}
              <div className="relative w-full h-[220px] overflow-hidden bg-[#FAF6EE]">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                {item.badge && (
                  <div className="absolute top-3 right-3 bg-white text-[#751E29] text-[11px] font-bold px-3 py-1 rounded-full shadow-sm">
                    {item.badge}
                  </div>
                )}
              </div>

              {/* Decorative Circular Badge */}
              <div className="absolute left-1/2 -translate-x-1/2 top-[220px] -mt-5 w-[42px] h-[42px] bg-white border border-[#C9A24B]/40 rounded-full flex items-center justify-center z-10 shadow-sm group-hover:scale-110 transition-transform duration-500">
                <LotusIcon />
              </div>

              {/* Content */}
              <div className="flex flex-col items-center text-center p-6 pt-8 flex-1">
                <h3 className="font-display font-semibold text-[#751E29] text-[20px] md:text-[22px] mb-1">
                  {item.title}
                </h3>
                <p className="text-[#8E8783] text-[13px] md:text-[14px] leading-relaxed mb-3">
                  {item.desc}
                </p>
                
                {item.status === 'available' && item.price && (
                  <div className="flex flex-col items-center mb-4">
                    <div className="flex items-center gap-1 mb-1">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon key={i} />
                      ))}
                      <span className="text-[11px] text-[#A79C91] ml-1">{item.rating} ({item.reviews} reviews)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[#751E29] text-[18px] font-bold">₹{item.price}</span>
                      <span className="text-[#8E8783] text-[14px] line-through">₹{item.originalPrice}</span>
                    </div>
                  </div>
                )}

                <div className="mt-auto w-full">
                  <button className="w-full h-[42px] rounded-full bg-[#751E29] text-[#FAF6EE] text-[13px] font-semibold tracking-wide flex items-center justify-center gap-2 shadow-[0_4px_12px_rgba(117,30,41,0.2)] hover:bg-[#5E1620] transition-colors">
                    {item.status === 'available' ? <CartPlusIcon /> : <BellIcon />}
                    {item.cta}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
