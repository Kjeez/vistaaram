"use client";

import Image from "next/image";
import Link from "next/link";
import { ourStoryContent } from "@/data/content";

function PatternOverlay() {
  return (
    <div className="absolute inset-0 w-full h-full opacity-10 pointer-events-none mix-blend-overlay">
      <Image 
        src="/images/mandala-bg.png" 
        alt="Mandala Pattern" 
        fill 
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
        
        <h2 className="font-display font-medium text-[#FAF6EE] text-[36px] md:text-[48px] leading-tight mb-8">
          {ourStoryContent.cta.headline}
        </h2>
        
        <Link 
          href={ourStoryContent.cta.buttonLink}
          className="inline-flex items-center justify-center h-[52px] px-8 rounded-full bg-[#C9A24B] text-[#5E1620] text-[13px] font-bold tracking-[0.1em] uppercase hover:bg-[#EADAB8] transition-colors shadow-lg hover:shadow-xl hover:scale-105 duration-300"
        >
          {ourStoryContent.cta.buttonText}
        </Link>
        
      </div>
    </section>
  );
}
