"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

function InstagramIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white drop-shadow-md">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>
  );
}

function PlayIcon() {
  return (
    <div className="w-16 h-16 rounded-full bg-black/40 backdrop-blur-sm border-2 border-white/80 flex items-center justify-center hover:scale-110 hover:bg-black/60 transition-all cursor-pointer shadow-xl">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="white" className="ml-1">
        <path d="M5 3l14 9-14 9V3z" />
      </svg>
    </div>
  );
}

const reelsData = [
  { 
    id: 1, 
    image: "/images/product-5.jpg", 
    sticker: { text: "Finally received\nour final product\npackaging ✅", bg: "bg-[#0055FF]", rotate: "-rotate-2" },
    hasPlay: false 
  },
  { 
    id: 2, 
    image: "/images/ritual-3.jpg", 
    sticker: { text: "This is what good\nenergy at home\nlooks like ✨", bg: "bg-black/90", rotate: "-rotate-1" },
    hasPlay: true 
  },
  { 
    id: 3, 
    image: "/images/product-3.jpg", 
    sticker: null,
    hasPlay: false 
  },
  { 
    id: 4, 
    image: "/images/process-3.jpg", 
    sticker: { text: "Why Every\nStep Matters", bg: "bg-[#0055FF]", rotate: "rotate-2" },
    hasPlay: false 
  },
  { 
    id: 5, 
    image: "/images/avatar-2.jpg", 
    sticker: null,
    hasPlay: true 
  },
];

export default function StoriesCarousel() {
  const sectionRef = useRef<HTMLElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".animate-in", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      });
    },
    { scope: sectionRef }
  );

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -320, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 320, behavior: "smooth" });
    }
  };

  return (
    <section id="stories" ref={sectionRef} className="relative w-full py-16 md:py-24 bg-[#FAF6EE] overflow-hidden">
      
      <div className="relative z-10 mx-auto max-w-[1440px] px-4 md:px-8 flex flex-col items-center">
        
        {/* Header */}
        <div className="animate-in flex flex-row items-center justify-center w-full gap-4 md:gap-8 mb-12">
          <div className="hidden md:flex flex-1 max-w-[150px] items-center gap-2">
            <span className="w-1.5 h-1.5 rotate-45 bg-[#C9A24B]" />
            <span className="h-px bg-[#C9A24B]/50 w-full" />
          </div>
          
          <h2 className="font-display font-semibold text-[#7A1F2B] text-[22px] md:text-[32px] lg:text-[40px] text-center leading-tight">
            Real reels from our workshop in Dehradun, Uttarakhand
          </h2>

          <div className="hidden md:flex flex-1 max-w-[150px] items-center gap-2 flex-row-reverse">
            <span className="w-1.5 h-1.5 rotate-45 bg-[#C9A24B]" />
            <span className="h-px bg-[#C9A24B]/50 w-full" />
          </div>
        </div>

        {/* Carousel Area */}
        <div className="animate-in relative w-full max-w-[1300px]">
          
          {/* Nav Buttons */}
          <button 
            onClick={scrollLeft}
            className="hidden md:flex absolute left-[-20px] lg:left-[-50px] top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full items-center justify-center shadow-lg border border-[#C9A24B]/20 text-[#7A1F2B] hover:scale-105 transition-transform z-20"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </button>

          <button 
            onClick={scrollRight}
            className="hidden md:flex absolute right-[-20px] lg:right-[-50px] top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full items-center justify-center shadow-lg border border-[#C9A24B]/20 text-[#7A1F2B] hover:scale-105 transition-transform z-20"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>

          {/* Cards Track */}
          <div 
            ref={sliderRef}
            className="flex gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide py-4 px-2"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {reelsData.map((reel) => (
              <div 
                key={reel.id} 
                className="snap-center shrink-0 w-[240px] md:w-[260px] lg:w-[280px] aspect-[9/16] bg-black rounded-[24px] border border-white/50 shadow-xl overflow-hidden relative group"
              >
                {/* Background Video/Image */}
                <Image src={reel.image} alt="Reel Thumbnail" fill className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/20" />

                {/* Top Left Instagram Icon */}
                <div className="absolute top-4 left-4 z-10">
                  <InstagramIcon />
                </div>

                {/* Center Content Overlay */}
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-6">
                  
                  {reel.sticker && (
                    <div className={`${reel.sticker.bg} text-white font-bold text-[14px] md:text-[16px] leading-tight text-center px-4 py-3 rounded-[12px] shadow-lg ${reel.sticker.rotate} mb-4 whitespace-pre-line`}>
                      {reel.sticker.text}
                    </div>
                  )}

                  {reel.hasPlay && <PlayIcon />}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="animate-in mt-12 relative z-10">
          <a 
            href="https://instagram.com/vistaaram" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 bg-[#7A1F2B] hover:bg-[#5A1520] text-white font-bold text-[12px] md:text-[14px] tracking-[0.1em] uppercase py-3.5 px-8 rounded-full transition-colors duration-300 shadow-lg"
          >
            <InstagramIcon />
            <span>Follow @vistaaram.in on Instagram →</span>
          </a>
        </div>

      </div>
    </section>
  );
}
