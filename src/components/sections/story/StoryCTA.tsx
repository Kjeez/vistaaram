"use client";

import Image from "next/image";
import Link from "next/link";
import { ourStoryContent, storePolicy } from "@/data/content";
import { OrnamentDivider } from "@/components/ui/Decor";

function PatternOverlay() {
  return (
    <div className="absolute inset-0 w-full h-full opacity-10 pointer-events-none mix-blend-overlay">
      <Image 
        src="/images/circle_design.png"
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
      />
    </div>
  );
}

export default function StoryCTA() {
  return (
    <section className="relative w-full bg-[#7A1F2B] overflow-hidden py-24 md:py-32">
      <PatternOverlay />
      
      <div className="relative z-10 mx-auto max-w-[800px] px-6 flex flex-col items-center text-center">
        
        <div className="relative w-[120px] h-[100px] mb-6 opacity-90 pointer-events-none select-none" aria-hidden="true">
          <Image src="/images/diya.png" alt="" fill sizes="120px" className="object-contain drop-shadow-[0_0_24px_rgba(232,199,122,0.35)]" />
        </div>
        <h2 className="font-display font-medium text-[#FAF6EE] text-[36px] md:text-[48px] leading-tight mb-5">
          {ourStoryContent.cta.headline}
        </h2>
        <OrnamentDivider light className="mb-5" />
        <p className="font-display text-[#E8C77A] text-[18px] md:text-[20px] mb-9">देवभूमि की पवित्र सुगंध, अब आपके घर में।</p>
        
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto">
          <Link
            href={ourStoryContent.cta.buttonLink}
            className="w-full sm:w-auto inline-flex items-center justify-center h-[52px] px-8 rounded-full bg-[#C9A24B] text-[#5E1620] text-[13px] font-bold tracking-[0.1em] uppercase hover:bg-[#EADAB8] transition-colors shadow-lg hover:shadow-xl hover:scale-105 duration-300"
          >
            {ourStoryContent.cta.buttonText}
          </Link>
          <Link
            href="/shop"
            className="w-full sm:w-auto inline-flex items-center justify-center h-[52px] px-8 rounded-full border border-[#C9A24B] text-[#FAF6EE] text-[13px] font-bold tracking-[0.1em] uppercase hover:bg-[#C9A24B]/15 transition-colors"
          >
            See all packs
          </Link>
        </div>
        <p className="mt-6 text-[13px] text-[#FAF6EE]/75">
          Cash on Delivery · Free shipping above ₹{storePolicy.freeShippingThreshold} · {storePolicy.returnWindowDays}-day returns
        </p>
        
      </div>
    </section>
  );
}
