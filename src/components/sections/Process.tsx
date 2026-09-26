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

function DecorDiamond() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-[#C9A24B]">
      <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="currentColor" />
    </svg>
  );
}

function SmallLotus() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-[#C9A24B]">
      <path d="M12 22c0-4.5 2.5-8 6-9-3 1-6 4.5-6 9z" fill="currentColor" />
      <path d="M12 22c0-4.5-2.5-8-6-9 3 1 6 4.5 6 9z" fill="currentColor" />
      <path d="M12 22c0-7 4-12 8-14-3 1.5-8 7-8 14z" fill="currentColor" />
      <path d="M12 22c0-7-4-12-8-14 3 1.5 8 7 8 14z" fill="currentColor" />
      <path d="M12 22c0-9 0-16 0-16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

const processSteps = [
  {
    step: 1,
    title: "Sacred Temple\nFlowers Collected",
    desc: "Fresh flowers from\nUttarakhand's temples\nare collected with care.",
    image: "/images/process_step_1.jpg",
  },
  {
    step: 2,
    title: "Carefully Sorted\nby Hand",
    desc: "Each flower is carefully\nsorted to remove impurities.",
    image: "/images/process_step_2.jpg",
  },
  {
    step: 3,
    title: "Naturally\nSun-Dried",
    desc: "Dried naturally in the\npure mountain air.",
    image: "/images/process_step_3.jpg",
  },
  {
    step: 4,
    title: "Blended with\nSacred Ingredients",
    desc: "Mixed with cow dung and\ntraditional herbs using\nancient knowledge.",
    image: "/images/process_step_4.jpg",
  },
  {
    step: 5,
    title: "Hand-Filled into\nHawan Cups",
    desc: "Lovingly filled by hand\ninto eco-friendly cups.",
    image: "/images/process_step_5.jpg",
  },
  {
    step: 6,
    title: "Packed in\nDehradun",
    desc: "Hygienically packed\nat our facility in\nDehradun, Uttarakhand.",
    image: "/images/process_step_6.jpg",
  },
];

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<SVGPathElement>(null);

  useGSAP(
    () => {
      if (!lineRef.current) return;
      
      // Animate the line drawing using clip-path instead of stroke-dashoffset
      // This is 100% reliable and guarantees it will reach the very end node
      gsap.fromTo(lineRef.current, 
        { clipPath: "inset(0 100% 0 0)" },
        { 
          clipPath: "inset(0 0% 0 0)",
          duration: 2.5,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: ".process-track",
            start: "top 65%",
            once: true,
          }
        }
      );

      // Also stagger fade-in the steps slightly
      gsap.from(".process-step", {
        scrollTrigger: {
          trigger: ".process-track",
          start: "top 65%",
          once: true,
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out"
      });
      // Background Art Left
      gsap.from(".bg-left-art", {
        scrollTrigger: {
          trigger: ".process-header",
          start: "top 80%",
          once: true,
        },
        x: -60,
        opacity: 0,
        duration: 1.5,
        ease: "power3.out"
      });

      // Background Art Right
      gsap.from(".bg-right-art", {
        scrollTrigger: {
          trigger: ".process-header",
          start: "top 80%",
          once: true,
        },
        x: 60,
        opacity: 0,
        duration: 1.5,
        ease: "power3.out"
      });

      // Header
      gsap.from(".process-header", {
        scrollTrigger: {
          trigger: ".process-header",
          start: "top 80%",
          once: true,
        },
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      });
    },
    { scope: sectionRef }
  );

  return (
    <section id="process" ref={sectionRef} className="relative w-full bg-[#FAF6EE] overflow-hidden py-16">
      
      {/* Background Line Art Illustrations */}
      <div className="bg-left-art absolute top-0 left-0 w-full md:w-1/2 h-[300px] opacity-[0.85] pointer-events-none select-none z-0">
        <Image
          src="/images/process_left.png"
          alt="Mountains Background Left"
          fill
          className="object-cover object-left-top"
        />
      </div>
      <div className="bg-right-art absolute top-0 right-0 w-full md:w-1/2 h-[300px] opacity-[0.85] pointer-events-none select-none z-0">
        <Image
          src="/images/process_right.png"
          alt="Temple Background Right"
          fill
          className="object-cover object-right-top"
        />
      </div>
      {/* Global Gradient fade out to bottom to blend into the cream background */}
      <div className="absolute top-0 left-0 w-full h-[300px] bg-gradient-to-b from-transparent via-[#FAF6EE]/60 to-[#FAF6EE] pointer-events-none z-0" />

      {/* Top Border */}
      <div className="absolute top-0 left-0 w-full border-t border-[#E6DED2] z-10">
        <div className="absolute left-1/2 -translate-x-1/2 -top-[9px] bg-[#FAF6EE] px-2">
          <DecorDiamond />
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-[1440px] px-4 md:px-8">
        
        {/* Header */}
        <div className="process-header flex flex-col items-center text-center mb-20 pt-4">
          <div className="flex items-center gap-4 mb-3">
            <div className="w-12 h-px bg-[#C9A24B]/50" />
            <span className="text-[#C9A24B] text-[12px] font-semibold tracking-[0.24em] uppercase">
              DEVBHOOMI TO YOUR HOME
            </span>
            <div className="w-12 h-px bg-[#C9A24B]/50" />
          </div>
          
          <h2 className="font-display font-bold text-[#7A1F2B] text-[42px] md:text-[54px] leading-none mb-3">
            Our Process
          </h2>
          
          <div className="text-[#C9A24B]">
            <SmallLotus />
          </div>
        </div>

        {/* Steps Track Container */}
        <div className="process-track relative w-full pb-8">
          
          {/* Animated Connecting SVG Wave (Behind) */}
          <div className="absolute top-[22px] left-[8.33%] right-[8.33%] h-[1px] z-0 overflow-visible hidden md:block pointer-events-none">
            <svg 
              className="absolute top-1/2 left-0 w-full h-[50px] -translate-y-1/2 overflow-visible" 
              preserveAspectRatio="none" 
              viewBox="0 0 1000 100"
            >
              <path 
                ref={lineRef}
                d="M 0,50 C 60,80 140,80 200,50 C 260,20 340,20 400,50 C 460,80 540,80 600,50 C 660,20 740,20 800,50 C 860,80 940,80 1000,50" 
                fill="none" 
                stroke="#7A1F2B" 
                strokeOpacity="0.7"
                strokeWidth="1.5"
                strokeDasharray="6 6"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </div>

          {/* Steps Grid */}
          <div className="relative z-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-4 gap-y-12">
            {processSteps.map((step) => (
              <div key={step.step} className="process-step flex flex-col items-center text-center">
                
                {/* Image & Number Wrapper */}
                <div className="relative mb-6">
                  {/* Step Number Badge */}
                  <div className="absolute -top-[16px] left-1/2 -translate-x-1/2 w-[32px] h-[32px] rounded-full bg-[#E5B55A] border-2 border-[#FAF6EE] flex items-center justify-center text-white font-semibold text-[15px] z-20 shadow-sm">
                    {step.step}
                  </div>
                  
                  {/* Circle Image */}
                  <div className="w-[140px] h-[140px] md:w-[160px] md:h-[160px] rounded-full border-[4px] border-[#C9A24B] overflow-hidden bg-white relative z-10">
                    <Image
                      src={step.image}
                      alt={step.title.replace('\n', ' ')}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* Text Content */}
                <h3 className="font-display font-semibold text-[#7A1F2B] text-[18px] md:text-[20px] leading-[1.2] mb-3 whitespace-pre-line px-1">
                  {step.title}
                </h3>
                
                <p className="text-[#5A4F46] text-[12px] md:text-[13px] leading-[1.4] whitespace-pre-line max-w-[190px]">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Border */}
      <div className="absolute bottom-0 left-0 w-full border-t border-[#E6DED2] z-10">
        <div className="absolute left-1/2 -translate-x-1/2 -top-[9px] bg-[#FAF6EE] px-2">
          <DecorDiamond />
        </div>
      </div>
    </section>
  );
}
