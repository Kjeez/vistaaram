"use client";

import { useState } from "react";
import { productContent } from "@/data/content";
import Head from "next/head";
import Script from "next/script";

function PlusIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C9A24B" strokeWidth="1.5">
      <path d="M12 5v14M5 12h14" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MinusIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C9A24B" strokeWidth="1.5">
      <path d="M5 12h14" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const ACCORDION_DATA = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C9A24B" strokeWidth="1.5">
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" stroke="none" />
        <path d="M12 21c-4.97 0-9-4.03-9-9 0-4.97 4.03-9 9-9 1.5 0 2.92.38 4.15 1.05C18.25 4.6 21 8.2 21 12c0 4.97-4.03 9-9 9z" stroke="none" />
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" stroke="none" />
        <path d="M12 2c0 0 8 2 8 10s-8 10-8 10-8-2-8-10 8-10 8-10z" />
        <path d="M12 22V2" />
      </svg>
    ),
    title: "What's Inside",
    content: "Temple flowers, cow dung and traditional herbs, nothing artificial."
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C9A24B" strokeWidth="1.5">
        <path d="M12 3l9 15H3L12 3z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Specifications",
    content: "12 cups · burns 12-15 minutes · shelf life 18 months · packed in Dehradun."
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C9A24B" strokeWidth="1.5">
        <rect x="3" y="8" width="18" height="12" rx="2" ry="2" />
        <path d="M16 8V6a2 2 0 0 0-2-2H10a2 2 0 0 0-2 2v2" />
        <line x1="8" y1="12" x2="16" y2="12" />
      </svg>
    ),
    title: "Shipping & Returns",
    content: "Dispatched in 24 hours, delivery in 3-5 days, free above ₹499, 7-day easy returns."
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C9A24B" strokeWidth="1.5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
    title: "Our Promise",
    content: "If your cups don't arrive perfect, we replace them, no questions asked."
  }
];

export default function ProductDetailsAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": productContent.name,
    "image": productContent.images[0].src,
    "description": productContent.description,
    "brand": {
      "@type": "Brand",
      "name": "Vistaaram"
    },
    "offers": {
      "@type": "Offer",
      "url": "https://vistaaram.in/product/natural-sambrani-hawan-cup",
      "priceCurrency": "INR",
      "price": "279",
      "availability": "https://schema.org/InStock",
      "itemCondition": "https://schema.org/NewCondition"
    },
    // "aggregateRating": {
    //   "@type": "AggregateRating",
    //   "ratingValue": "4.8",
    //   "reviewCount": "100"
    // }
  };

  return (
    <section className="relative w-full bg-[#FAF6EE] py-16">
      
      <Script id="product-jsonld" type="application/ld+json" strategy="lazyOnload">
        {JSON.stringify(jsonLd)}
      </Script>

      <div className="mx-auto max-w-[800px] px-6">
        
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="font-display font-medium text-[#7A1F2B] text-[32px] md:text-[40px]">
            Details & Rituals
          </h2>
        </div>

        {/* Accordion Rows */}
        <div className="flex flex-col border-t border-[#C9A24B]/30">
          {ACCORDION_DATA.map((item, index) => {
            const isOpen = openIndex === index;
            
            return (
              <div 
                key={index}
                className="border-b border-[#C9A24B]/30 overflow-hidden"
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full py-5 flex items-center justify-between text-left group"
                >
                  <div className="flex items-center gap-4">
                    <span className="shrink-0">{item.icon}</span>
                    <span className="font-semibold text-[#751E29] text-[16px] md:text-[18px]">
                      {item.title}
                    </span>
                  </div>
                  <div className="shrink-0 transition-transform duration-300">
                    {isOpen ? <MinusIcon /> : <PlusIcon />}
                  </div>
                </button>
                
                <div 
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100 pb-5" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden pl-10 pr-4">
                    <p className="text-[#5A4F46] text-[14px] md:text-[15px] leading-relaxed font-body">
                      {item.content}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
