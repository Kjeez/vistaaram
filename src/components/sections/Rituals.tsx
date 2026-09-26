"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

/* =========================================================
   ICONS
========================================================= */

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

function LotusIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[#C9A24B]">
      <path d="M12 22c0-4.5 2.5-8 6-9-3 1-6 4.5-6 9z" />
      <path d="M12 22c0-4.5-2.5-8-6-9 3 1 6 4.5 6 9z" />
      <path d="M12 22c0-7 4-12 8-14-3 1.5-8 7-8 14z" />
      <path d="M12 22c0-7-4-12-8-14 3 1.5 8 7 8 14z" />
      <path d="M12 22c0-9 0-16 0-16" />
    </svg>
  );
}

function YogaIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#C9A24B]">
      <circle cx="12" cy="5" r="2"/>
      <path d="M6 10l3 2v6l3 2 3-2v-6l3-2"/>
      <path d="M9 22h6"/>
    </svg>
  );
}

function FlameIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#C9A24B]">
      <path d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 11-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 002.5 2.5z"/>
    </svg>
  );
}

function HouseIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#C9A24B]">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
      <polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12"></line>
      <polyline points="12 5 19 12 12 19"></polyline>
    </svg>
  );
}

const rituals = [
  {
    id: 1,
    title: "Morning Pooja",
    desc: "Start your day with positive\nenergy and divine blessings.",
    image: "/images/ritual-1.jpg",
    icon: <LotusIcon />,
  },
  {
    id: 2,
    title: "Meditation & Yoga",
    desc: "Create a calm and focused\natmosphere.",
    image: "/images/ritual-2.jpg",
    icon: <YogaIcon />,
  },
  {
    id: 3,
    title: "Festival Hawan",
    desc: "Perfect for Diwali, Navratri\nand all sacred occasions.",
    image: "/images/ritual-3.jpg",
    icon: <FlameIcon />,
  },
  {
    id: 4,
    title: "Home Cleansing",
    desc: "Purify your home and remove\nnegativity naturally.",
    image: "/images/ritual-4.jpg",
    icon: <HouseIcon />,
  }
];

export default function Rituals() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Header Animation
      gsap.from(".ritual-header", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      });

      // Cards Stagger Animation
      gsap.from(".ritual-card", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out"
      });
    },
    { scope: sectionRef }
  );

  return (
    <section id="rituals" ref={sectionRef} className="relative w-full pt-10 md:pt-12 pb-20 md:pb-24 bg-[#FAF6EE] overflow-hidden">
      
      <div className="relative z-10 mx-auto max-w-[1440px] px-4 md:px-8">
        
        {/* Header */}
        <div className="ritual-header flex flex-col items-center text-center mb-16">
          <div className="mb-4">
            <SmallLotus />
          </div>
          
          <div className="flex items-center justify-center w-full gap-4 md:gap-8 mb-4">
            {/* Left Line */}
            <div className="flex-1 max-w-[150px] md:max-w-[250px] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rotate-45 bg-[#C9A24B]" />
              <span className="h-px bg-[#C9A24B]/50 w-full" />
            </div>
            
            <h2 className="font-display font-semibold text-[#7A1F2B] text-[36px] md:text-[46px] lg:text-[54px] leading-none">
              For Every Ritual
            </h2>

            {/* Right Line */}
            <div className="flex-1 max-w-[150px] md:max-w-[250px] flex items-center gap-2 flex-row-reverse">
              <span className="w-1.5 h-1.5 rotate-45 bg-[#C9A24B]" />
              <span className="h-px bg-[#C9A24B]/50 w-full" />
            </div>
          </div>
          
          <p className="text-[#5A4F46] text-[14px] md:text-[16px] font-body">
            Bring purity, positivity and divine energy into every moment of your life.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 md:gap-8">
          {rituals.map((ritual) => (
            <div key={ritual.id} className="ritual-card h-full">
              <div 
                className="group relative h-full bg-white rounded-xl border border-[#C9A24B]/30 hover:border-[#C9A24B]/60 hover:shadow-xl transition-all duration-500 overflow-hidden flex flex-col"
              >
                
                {/* Image Container */}
              <div className="relative w-full aspect-[4/3] overflow-hidden rounded-t-xl">
                <Image
                  src={ritual.image}
                  alt={ritual.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>

              {/* Decorative Circular Badge */}
              <div className="absolute left-1/2 -translate-x-1/2 top-[calc(57%)] md:top-[calc(54%)] -mt-6 w-[56px] h-[56px] bg-[#FAF6EE] border border-[#C9A24B]/40 rounded-full flex items-center justify-center z-10 shadow-sm group-hover:scale-110 transition-transform duration-500">
                {ritual.icon}
              </div>

              {/* Text Content */}
              <div className="flex flex-col items-center text-center p-8 pt-10 flex-1 bg-gradient-to-b from-[#FAF6EE]/30 to-[#FAF6EE]/50">
                <h3 className="font-display font-semibold text-[#7A1F2B] text-[20px] md:text-[22px] mb-2">
                  {ritual.title}
                </h3>
                
                <p className="text-[#625A54] text-[13px] md:text-[14px] leading-[1.5] whitespace-pre-line mb-6 flex-1">
                  {ritual.desc}
                </p>

                {/* Learn More Link */}
                <button className="flex items-center gap-2 text-[#9B702C] hover:text-[#7A1F2B] font-semibold text-[13px] tracking-wide uppercase transition-colors duration-300">
                  <span>Learn More</span>
                  <ArrowRight />
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
