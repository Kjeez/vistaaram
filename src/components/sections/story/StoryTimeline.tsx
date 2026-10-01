"use client";

import { useRef } from "react";
import Image from "next/image";
import { ourStoryContent } from "@/data/content";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function StoryTimeline() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".timeline-node", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="relative w-full bg-[#FAF6EE] py-20 md:py-28 overflow-hidden">
      <div className="mx-auto max-w-[1000px] px-6">
        
        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
          <h2 className="font-display font-medium text-[#7A1F2B] text-[32px] md:text-[40px]">
            The Journey So Far
          </h2>
        </div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-[1px] bg-[#C9A24B]/30 md:-translate-x-1/2" />

          {/* Timeline Nodes */}
          <div className="flex flex-col gap-12 md:gap-0">
            {ourStoryContent.timeline.map((item, index) => {
              const isEven = index % 2 === 0;

              return (
                <div 
                  key={index} 
                  className={`timeline-node relative flex flex-col md:flex-row items-start md:items-center w-full ${isEven ? 'md:flex-row-reverse' : ''}`}
                >
                  
                  {/* Empty space for alternating side */}
                  <div className="hidden md:block w-1/2" />

                  {/* Dot */}
                  <div className="absolute left-[-5px] md:left-1/2 top-6 md:top-1/2 w-[11px] h-[11px] rounded-full bg-[#FAF6EE] border-[2px] border-[#C9A24B] md:-translate-x-1/2 md:-translate-y-1/2 z-10" />

                  {/* Card Content */}
                  <div className={`w-full md:w-1/2 pl-8 md:pl-0 ${isEven ? 'md:pr-16 md:text-right flex md:justify-end' : 'md:pl-16'}`}>
                    
                    <div className="flex flex-col md:flex-row gap-6 items-start md:items-center bg-white border border-[#E6DED2] rounded-xl p-5 shadow-sm max-w-[420px] w-full group hover:border-[#C9A24B]/40 hover:shadow-md transition-all duration-300">
                      
                      {/* Image Thumbnail */}
                      <div className="relative w-24 h-24 shrink-0 rounded-lg overflow-hidden border border-[#E6DED2]">
                        <Image src={item.image} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                      </div>

                      <div className={`flex flex-col flex-1 ${isEven ? 'md:items-end' : ''}`}>
                        <span className="text-[#C9A24B] text-[10px] md:text-[11px] font-semibold tracking-[0.2em] uppercase mb-1">
                          {item.year}
                        </span>
                        <h3 className="font-display font-medium text-[#751E29] text-[20px] md:text-[22px] mb-2">
                          {item.title}
                        </h3>
                        <p className="text-[#5A4F46] text-[13px] md:text-[14px] leading-relaxed">
                          {item.desc}
                        </p>
                      </div>

                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
