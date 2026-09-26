"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { faqContent } from "@/data/content";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function FAQ() {
  const sectionRef = useRef<HTMLElement>(null);
  const { sectionTitle, faqs } = faqContent;
  const [openIndex, setOpenIndex] = useState<number | null>(0); // Default open first one

  useGSAP(
    () => {
      // Existing pillar animation
      gsap.from(".faq-pillar", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          once: true,
        },
        x: 100,
        opacity: 0,
        duration: 1.5,
        ease: "power3.out",
      });

      // New stagger animation for content
      gsap.from(".animate-in", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
      });
    },
    { scope: sectionRef }
  );

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" ref={sectionRef} className="relative w-full py-20 md:py-24 bg-[#FAF6EE] overflow-hidden">
      
      {/* Decorative Pillar */}
      <div className="faq-pillar absolute right-0 -top-[5%] h-[110%] w-[300px] md:w-[450px] lg:w-[600px] pointer-events-none opacity-20 z-0 translate-x-16 md:translate-x-24 lg:translate-x-[15%]">
        <Image src="/images/faq-pillar.png" alt="Decorative Pillar" fill className="object-contain object-right" />
      </div>

      <div className="relative z-10 max-w-[800px] mx-auto px-4 md:px-8">
        
        {/* Header */}
        <div className="animate-in flex flex-col items-center text-center mb-12">
          <h2 className="font-display font-medium text-[#7A1F2B] text-[36px] md:text-[48px] lg:text-[56px] leading-tight">
            {sectionTitle}
          </h2>
        </div>

        {/* Accordion Rows */}
        <div className="flex flex-col">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            
            return (
              <div 
                key={index}
                className="animate-in border-b border-[#C9A24B]/30 last:border-b-0"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between py-6 md:py-8 text-left hover:text-[#C9A24B] transition-colors duration-300 group"
                >
                  <span className={`font-display font-medium text-[18px] md:text-[22px] transition-colors duration-300 pr-6 ${isOpen ? 'text-[#C9A24B]' : 'text-[#7A1F2B] group-hover:text-[#C9A24B]'}`}>
                    {faq.question}
                  </span>
                  
                  {/* Plus/Minus Icon */}
                  <span className="relative w-4 h-4 md:w-5 md:h-5 flex-shrink-0 flex items-center justify-center">
                    <span className={`absolute w-full h-[2px] bg-[#C9A24B] transition-transform duration-300 ${isOpen ? 'rotate-180 bg-[#7A1F2B]' : ''}`} />
                    <span className={`absolute w-[2px] h-full bg-[#C9A24B] transition-transform duration-300 ${isOpen ? 'rotate-90 scale-0' : 'rotate-0 scale-100'}`} />
                  </span>
                </button>
                
                <div 
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    isOpen ? "max-h-[200px] opacity-100 pb-8" : "max-h-0 opacity-0 pb-0"
                  }`}
                >
                  <p className="text-[#625A54] text-[15px] md:text-[16px] leading-relaxed font-body pr-8 md:pr-12">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
