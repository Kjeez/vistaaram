"use client";

import { useRef } from "react";
import Image from "next/image";
import { comingSoonContent } from "@/data/content";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

function getFeatureIcon(feature: string) {
  // Simple switch to return a relevant SVG icon path based on feature name keywords
  if (feature.toLowerCase().includes("sandalwood") || feature.toLowerCase().includes("wood")) {
    return <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>;
  }
  if (feature.toLowerCase().includes("kapoor") || feature.toLowerCase().includes("flower")) {
    return <path d="M12 22c4.97 0 9-4.03 9-9-4.97 0-9 4.03-9 9zM12 2c-4.97 0-9 4.03-9 9 4.97 0 9-4.03 9-9zM22 12c0-4.97-4.03-9-9-9 0 4.97 4.03 9 9 9zM2 12c0 4.97 4.03 9 9 9 0-4.97-4.03-9-9-9z"/>;
  }
  if (feature.toLowerCase().includes("water") || feature.toLowerCase().includes("wick") || feature.toLowerCase().includes("ghee")) {
    return <path d="M12 2c-5.33 4.55-8 8.48-8 11.8 0 4.98 3.8 8.2 8 8.2s8-3.22 8-8.2c0-3.32-2.67-7.25-8-11.8z"/>;
  }
  if (feature.toLowerCase().includes("pack") || feature.toLowerCase().includes("gift")) {
    return <path d="M20 6h-2.18c.11-.31.18-.65.18-1 0-1.66-1.34-3-3-3-1.05 0-1.96.54-2.5 1.35l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1h-4v-2h4zM9 4c.55 0 1 .45 1 1v2H6c0-.55.45-1 1-1s.45-1 1-1zM4 8h16v11H4V8z"/>;
  }
  // Default Leaf
  return <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66l.95-2.3c.48.17.98.3 1.34.3C15 20 19 11 19 3c-4 0-10 1-12 5z"/>;
}

export default function ComingSoon() {
  const sectionRef = useRef<HTMLElement>(null);
  const { sectionTitle, sectionSubtitle, items } = comingSoonContent;

  useGSAP(
    () => {
      gsap.from(".animate-in", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      });
    },
    { scope: sectionRef }
  );

  return (
    <section id="coming-soon" ref={sectionRef} className="relative w-full py-20 md:py-24 bg-[#FAF6EE] overflow-hidden">
      
      <div className="relative z-10 max-w-[1440px] mx-auto px-4 md:px-8">
        
        {/* Header */}
        <div className="animate-in flex flex-col items-center text-center mb-16">
          <h2 className="font-display font-medium text-[#7A1F2B] text-[36px] md:text-[48px] lg:text-[56px] leading-tight">
            Coming Soon Roadmap
          </h2>
          <p className="mt-4 text-[#625A54] text-[16px] md:text-[18px]">
            {sectionSubtitle}
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-[1200px] mx-auto">
          {items.map((item, i) => (
            <div
              key={i}
              className="animate-in flex flex-col bg-[#FDFCF8] border-[2px] border-dashed border-[#C9A24B] rounded-[16px] overflow-hidden p-5 shadow-sm hover:shadow-md transition-shadow duration-300 relative group"
            >
              {/* Corner Ornaments */}
              <div className="absolute top-1 left-1 w-3 h-3 md:w-4 md:h-4 text-[#C9A24B]">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C12 6.627 6.627 12 0 12C6.627 12 12 17.373 12 24C12 17.373 17.373 12 24 12C17.373 12 12 6.627 12 0Z" /></svg>
              </div>
              <div className="absolute top-1 right-1 w-3 h-3 md:w-4 md:h-4 text-[#C9A24B]">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C12 6.627 6.627 12 0 12C6.627 12 12 17.373 12 24C12 17.373 17.373 12 24 12C17.373 12 12 6.627 12 0Z" /></svg>
              </div>
              <div className="absolute bottom-1 left-1 w-3 h-3 md:w-4 md:h-4 text-[#C9A24B]">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C12 6.627 6.627 12 0 12C6.627 12 12 17.373 12 24C12 17.373 17.373 12 24 12C17.373 12 12 6.627 12 0Z" /></svg>
              </div>
              <div className="absolute bottom-1 right-1 w-3 h-3 md:w-4 md:h-4 text-[#C9A24B]">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C12 6.627 6.627 12 0 12C6.627 12 12 17.373 12 24C12 17.373 17.373 12 24 12C17.373 12 12 6.627 12 0Z" /></svg>
              </div>

              {/* Image Container */}
              <div className="relative w-full aspect-[4/3] rounded-[12px] overflow-hidden mb-6 border border-[#C9A24B]/20">
                <Image 
                  src={item.image} 
                  alt={item.name} 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 text-center items-center">
                <h3 className="font-display text-[26px] font-medium text-[#7A1F2B] mb-2 leading-tight">
                  {item.name}
                </h3>
                
                {/* Badge */}
                <div className="bg-[#EBD5A9] text-[#7A1F2B] text-[11px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-4">
                  {i === 0 ? "Launching Soon" : "Coming Soon"}
                </div>

                <p className="text-[#625A54] text-[14px] leading-relaxed mb-6">
                  {item.description}
                </p>

                {/* Features Row */}
                {item.features && (
                  <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 mb-8 mt-auto w-full border-t border-[#C9A24B]/20 pt-4">
                    {item.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 text-[11px] text-[#625A54] font-medium">
                        <svg className="w-3.5 h-3.5 fill-[#C9A24B]" viewBox="0 0 24 24">
                          {getFeatureIcon(feature)}
                        </svg>
                        {feature}
                      </div>
                    ))}
                  </div>
                )}

                {/* Email Capture */}
                <div className="w-full mt-auto">
                  <form className="relative flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg className="w-5 h-5 text-[#C9A24B]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                      </div>
                      <input 
                        type="email" 
                        placeholder="Enter your email address" 
                        className="w-full bg-[#FAF6EE] border border-[#C9A24B]/40 rounded-[12px] pl-12 pr-4 py-3.5 text-sm focus:outline-none focus:border-[#7A1F2B] transition-colors text-[#625A54] placeholder-[#C9A24B]/70 font-medium"
                        required
                      />
                    </div>
                    <button 
                      type="submit"
                      className="w-full bg-[#7A1F2B] hover:bg-[#5A1520] text-white font-bold text-[13px] tracking-wide py-3.5 rounded-[12px] transition-colors flex items-center justify-center gap-2"
                    >
                      Get 10% off at launch <span>→</span>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
}
