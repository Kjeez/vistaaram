"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function PanditStory() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Image zoom in animation
      gsap.fromTo(
        ".pandit-image",
        { scale: 1.1, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true,
          },
        }
      );

      // Text stagger animation
      gsap.from(".pandit-text > *", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          once: true,
        },
        x: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
      });
      
      // Mandala fade in
      gsap.from(".pandit-mandala", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          once: true,
        },
        opacity: 0,
        duration: 2,
        ease: "power2.out",
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="story"
      ref={sectionRef}
      className="w-full flex flex-col md:flex-row bg-[#7A1F2B] overflow-hidden"
    >
      {/* Left Image Side */}
      <div className="relative w-full md:w-[45%] h-[350px] md:h-auto min-h-[400px] lg:min-h-[500px] overflow-hidden">
        <Image
          src="/images/pandit_jis.jpg"
          alt="Pandits of Devbhoomi performing Havan"
          fill
          priority
          className="pandit-image object-cover object-center"
        />
      </div>

      {/* Right Content Side */}
      <div className="relative w-full md:w-[55%] flex flex-col justify-center px-8 py-16 md:p-12 lg:p-20 xl:p-24">
        
        {/* Decorative Mandala Top Right */}
        <div className="pandit-mandala absolute -top-[180px] -right-[180px] w-[500px] h-[500px] pointer-events-none select-none opacity-20">
          <Image
            src="/images/circle_design.png"
            alt="Decorative Mandala"
            fill
            className="object-contain animate-[spin_60s_linear_infinite]"
          />
        </div>

        <div className="pandit-text relative z-10 max-w-[550px]">
          {/* Eyebrow */}
          <p className="text-[#C9A24B] text-[10px] md:text-[11px] font-semibold tracking-[0.2em] uppercase mb-4 md:mb-5">
            500+ YEARS OF WISDOM
          </p>

          {/* Headline */}
          <h2 className="font-display font-medium text-[#FAF6EE] text-[34px] sm:text-[40px] md:text-[48px] lg:text-[54px] leading-[1.1] mb-5 md:mb-6">
            Blessed by the Pandits<br />of Devbhoomi
          </h2>

          {/* Description */}
          <p className="font-body text-[14px] md:text-[15px] lg:text-[16px] leading-[2.2]">
            <span className="bg-[#C9A24B] text-[#1a110a] font-medium py-1 px-1.5 box-decoration-clone">
              Every blend is guided by the knowledge of 500+ pandits —<br className="hidden xl:block" />
              the same hands that have performed havans in Devbhoomi's<br className="hidden xl:block" />
              temples for generations.
            </span>
          </p>
        </div>

      </div>
    </section>
  );
}
