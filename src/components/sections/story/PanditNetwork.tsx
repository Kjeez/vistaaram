"use client";

import Image from "next/image";
import { ourStoryContent } from "@/data/content";

function PatternOverlay() {
  return (
    <div className="absolute right-0 top-0 w-full h-full opacity-10 pointer-events-none mix-blend-overlay">
      <Image
        src="/images/circle_design.png"
        alt=""
        fill
        className="object-contain object-right-top"
      />
    </div>
  );
}

export default function PanditNetwork() {
  const { eyebrow, headline, body } = ourStoryContent.panditNetwork;

  return (
    <section className="relative w-full bg-[#FAF6EE] overflow-hidden">
      <div className="flex flex-col lg:flex-row w-full min-h-[500px]">
        
        {/* Left: Image Panel */}
        <div className="relative w-full lg:w-1/2 min-h-[300px] lg:min-h-full">
          <Image
            src="/images/pandit_jis.jpg"
            alt="Pandits of Devbhoomi"
            fill
            className="object-cover"
          />
        </div>
        
        {/* Right: Maroon Content Panel */}
        <div className="relative w-full lg:w-1/2 bg-[#751E29] flex flex-col justify-center px-8 py-16 md:p-16 lg:p-24 overflow-hidden">
          <PatternOverlay />
          
          <div className="relative z-10 max-w-[500px]">
            <p className="text-[#C9A24B] text-[11px] font-semibold tracking-[0.2em] uppercase mb-4">
              {eyebrow}
            </p>
            
            <h2 className="font-display font-medium text-[#FAF6EE] text-[32px] md:text-[40px] leading-tight mb-6">
              {headline}
            </h2>
            
            <p className="text-[#EADAB8] text-[16px] md:text-[18px] leading-relaxed font-body">
              {body}
            </p>
          </div>
        </div>
        
      </div>
    </section>
  );
}
