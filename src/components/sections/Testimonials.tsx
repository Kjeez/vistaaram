"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { testimonialsContent } from "@/data/content";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

function SmallLotus() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[#C9A24B]">
      <path d="M12 22c0-4.5 2.5-8 6-9-3 1-6 4.5-6 9z" fill="currentColor" />
      <path d="M12 22c0-4.5-2.5-8-6-9 3 1 6 4.5 6 9z" fill="currentColor" />
      <path d="M12 22c0-7 4-12 8-14-3 1.5-8 7-8 14z" fill="currentColor" />
      <path d="M12 22c0-7-4-12-8-14 3 1.5 8 7 8 14z" fill="currentColor" />
      <path d="M12 22c0-9 0-16 0-16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-[#C9A24B]">
      <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" className="text-white">
      <path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z" />
    </svg>
  );
}

export default function Testimonials() {
  const { testimonials } = testimonialsContent;
  const sectionRef = useRef<HTMLElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

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

  // Auto-slide effect
  useEffect(() => {
    if (isHovered) return;
    
    const interval = setInterval(() => {
      if (sliderRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          sliderRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          sliderRef.current.scrollBy({ left: 400, behavior: "smooth" });
        }
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [isHovered]);

  const handleScroll = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      // Prevent division by zero if not scrollable
      if (scrollWidth <= clientWidth) return;
      const progress = scrollLeft / (scrollWidth - clientWidth);
      // Map progress (0 to 1) to dots index (0 to length-1)
      const index = Math.min(
        testimonials.length - 1,
        Math.max(0, Math.round(progress * (testimonials.length - 1)))
      );
      setActiveIndex(index);
    }
  };

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -400, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 400, behavior: "smooth" });
    }
  };

  return (
    <section id="testimonials" ref={sectionRef} className="relative w-full py-20 md:py-24 bg-[#FAF6EE] overflow-hidden">
      
      {/* Decorative Flowers */}
      <div className="absolute left-0 top-0 w-[200px] h-[300px] md:w-[250px] md:h-[400px] pointer-events-none opacity-40 z-0 -translate-x-4 -translate-y-4">
        <Image src="/images/flower1.png" alt="Decorative Floral" fill className="object-contain object-top-left" />
      </div>
      <div className="absolute right-0 top-0 w-[200px] h-[300px] md:w-[250px] md:h-[400px] pointer-events-none opacity-40 z-0 translate-x-4 -translate-y-4">
        <Image src="/images/flower2.png" alt="Decorative Floral" fill className="object-contain object-top-right" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1440px] px-4 md:px-12 flex flex-col items-center">
        
        {/* Header */}
        <div className="animate-in flex flex-col items-center text-center mb-10 w-full">
          <div className="flex items-center justify-center w-full gap-4 md:gap-8 mb-4">
            <div className="flex-1 max-w-[80px] md:max-w-[150px] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rotate-45 bg-[#C9A24B]" />
              <span className="h-px bg-[#C9A24B]/50 w-full" />
            </div>
            
            <SmallLotus />

            <div className="flex-1 max-w-[80px] md:max-w-[150px] flex items-center gap-2 flex-row-reverse">
              <span className="w-1.5 h-1.5 rotate-45 bg-[#C9A24B]" />
              <span className="h-px bg-[#C9A24B]/50 w-full" />
            </div>
          </div>
          
          <h2 className="font-display font-medium text-[#7A1F2B] text-[40px] md:text-[54px] lg:text-[64px] leading-none mb-3">
            Voices of Devotion
          </h2>
          <p className="text-[#625A54] text-[15px] md:text-[17px] font-body">
            Real stories from homes, hearts and rituals across India.
          </p>
        </div>

        {/* Stats Bar */}
        <div className="animate-in flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 py-5 px-8 md:px-16 border border-[#C9A24B]/40 rounded-full bg-white/40 backdrop-blur-sm mb-16 shadow-sm">
          {/* Stat 1 */}
          <div className="flex items-center gap-4">
            <span className="text-3xl">🛕</span>
            <div className="text-left">
              <div className="text-[#7A1F2B] font-bold text-lg md:text-xl leading-tight">2,000+</div>
              <div className="text-[#625A54] text-xs md:text-sm">homes across India</div>
            </div>
          </div>

          <div className="hidden md:block w-px h-10 bg-[#C9A24B]/30" />

          {/* Stat 2 */}
          <div className="flex items-center gap-4">
            <span className="text-3xl text-[#C9A24B]">⭐</span>
            <div className="text-left">
              <div className="text-[#7A1F2B] font-bold text-lg md:text-xl leading-tight">4.8</div>
              <div className="text-[#625A54] text-xs md:text-sm">average rating</div>
            </div>
          </div>

          <div className="hidden md:block w-px h-10 bg-[#C9A24B]/30" />

          {/* Stat 3 */}
          <div className="flex items-center gap-4">
            <span className="text-3xl">📦</span>
            <div className="text-left">
              <div className="text-[#7A1F2B] font-bold text-lg md:text-xl leading-tight">500+</div>
              <div className="text-[#625A54] text-xs md:text-sm">orders shipped</div>
            </div>
          </div>
        </div>

        {/* Carousel Area */}
        <div 
          className="animate-in relative w-full max-w-[1200px]"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          
          {/* Nav Buttons */}
          <button 
            onClick={scrollLeft}
            className="absolute left-[-20px] md:left-[-50px] top-1/2 -translate-y-1/2 w-10 h-10 md:w-14 md:h-14 bg-white rounded-full flex items-center justify-center shadow-md border border-[#C9A24B]/20 text-[#7A1F2B] hover:scale-105 transition-transform z-20"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </button>

          <button 
            onClick={scrollRight}
            className="absolute right-[-20px] md:right-[-50px] top-1/2 -translate-y-1/2 w-10 h-10 md:w-14 md:h-14 bg-white rounded-full flex items-center justify-center shadow-md border border-[#C9A24B]/20 text-[#7A1F2B] hover:scale-105 transition-transform z-20"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>

          {/* Cards Track */}
          <div 
            ref={sliderRef}
            onScroll={handleScroll}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide py-4 px-2"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {testimonials.map((t, index) => (
              <div 
                key={t.id} 
                className="snap-center shrink-0 w-full sm:w-[400px] md:w-[450px] lg:w-[380px] bg-white rounded-2xl border border-[#C9A24B]/30 shadow-[0_4px_20px_rgba(201,162,75,0.08)] flex flex-col overflow-hidden"
              >
                <div className="flex flex-row h-full">
                  {/* Image Side */}
                  <div className="relative w-[40%] min-h-[220px]">
                    <Image src={t.avatar} alt={t.name} fill className="object-cover" />
                  </div>
                  
                  {/* Content Side */}
                  <div className="relative w-[60%] p-5 flex flex-col justify-between">
                    
                    {/* Giant Quote Marks Overlay */}
                    <div className="absolute top-2 left-3 text-[50px] leading-none font-serif text-[#C9A24B]/20 pointer-events-none select-none">
                      &ldquo;
                    </div>
                    <div className="absolute bottom-6 right-4 text-[50px] leading-none font-serif text-[#C9A24B]/20 pointer-events-none select-none">
                      &rdquo;
                    </div>

                    <div className="relative z-10 flex flex-col h-full">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                        <div className="flex gap-0.5">
                          {Array.from({ length: 5 }).map((_, i) => <StarIcon key={i} />)}
                        </div>
                        <div className="flex items-center gap-1.5 px-2 py-0.5 border border-[#C9A24B]/50 rounded-full bg-[#FAF6EE]">
                          <div className="w-3 h-3 bg-[#C9A24B] rounded-full flex items-center justify-center">
                            <CheckIcon />
                          </div>
                          <span className="text-[9px] font-semibold text-[#9B702C] uppercase tracking-wide">
                            Verified Buyer
                          </span>
                        </div>
                      </div>

                      <p className="text-[#4A433E] text-[13px] leading-relaxed mb-6 flex-1 font-body">
                        {t.quote}
                      </p>

                      <div>
                        <h4 className="font-display font-semibold text-[#7A1F2B] text-[16px] mb-0.5">
                          {t.name}
                        </h4>
                        <p className="text-[#8B837D] text-[11px] uppercase tracking-wide">
                          {t.location}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Dots */}
        <div className="flex items-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button 
              key={i} 
              onClick={() => {
                if (sliderRef.current) {
                  // Calculate the exact scroll position for the requested dot
                  const { scrollWidth, clientWidth } = sliderRef.current;
                  const maxScroll = scrollWidth - clientWidth;
                  const targetScroll = (i / (testimonials.length - 1)) * maxScroll;
                  sliderRef.current.scrollTo({ left: targetScroll, behavior: "smooth" });
                }
              }}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${i === activeIndex ? 'bg-[#7A1F2B] w-6' : 'bg-[#C9A24B]/30'}`} 
            />
          ))}
        </div>

      </div>
    </section>
  );
}
