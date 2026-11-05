"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { faqContent } from "@/data/content";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

// Questions shown before "Show all"; the full list is still in the FAQ rich results on the page.
const FAQ_PREVIEW = 6;

export default function FAQ() {
  const sectionRef = useRef<HTMLElement>(null);
  const { sectionTitle, faqs } = faqContent;
  const [showAll, setShowAll] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useGSAP(
    () => {
      gsap.from(".faq-decor-left", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none none",
        },
        x: -80,
        opacity: 0,
        duration: 1.6,
        ease: "power3.out",
      });

      gsap.from(".faq-decor-right", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none none",
        },
        x: 80,
        opacity: 0,
        duration: 1.6,
        ease: "power3.out",
      });

      // fromTo with explicit end values: a from() tween records whatever opacity the cards
      // have at setup, which left them stuck invisible when that was already 0.
      gsap.fromTo(
        ".faq-animate",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.08,
          ease: "power3.out",
          clearProps: "transform,opacity",
          scrollTrigger: {
            trigger: ".faq-accordion-wrap",
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: sectionRef }
  );

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      ref={sectionRef}
      className="relative w-full bg-[#FAF6EE] overflow-hidden scroll-mt-20"
    >
      {/* ── FAQ Accordion Section ───────────────────────────── */}
      <div className="relative pt-20 pb-28 md:pt-28 md:pb-36">

        {/* Decorative Mountain — left bottom */}
        <div className="faq-decor-left absolute left-0 bottom-0 w-[220px] md:w-[320px] pointer-events-none select-none opacity-40">
          <Image
            src="/images/mountainelement.png"
            alt=""
            width={320}
            height={260}
            className="w-full h-auto"
          />
        </div>

        {/* Decorative Flower — right top */}
        <div className="faq-decor-right absolute right-0 top-6 w-[110px] md:w-[170px] pointer-events-none select-none opacity-50">
          <Image
            src="/images/flower2.png"
            alt=""
            width={170}
            height={170}
            className="w-full h-auto"
          />
        </div>

        {/* Decorative Flower — left middle */}
        <div className="faq-decor-left absolute -left-2 top-[38%] w-[90px] md:w-[130px] pointer-events-none select-none opacity-40">
          <Image
            src="/images/flower1.png"
            alt=""
            width={130}
            height={130}
            className="w-full h-auto"
          />
        </div>

        {/* Decorative Mountain — right bottom */}
        <div className="faq-decor-right absolute right-0 bottom-0 w-[160px] md:w-[240px] pointer-events-none select-none opacity-25 scale-x-[-1]">
          <Image
            src="/images/mountainelement.png"
            alt=""
            width={240}
            height={200}
            className="w-full h-auto"
          />
        </div>

        <div className="relative z-10 max-w-[860px] mx-auto px-5 md:px-10">

          {/* Header */}
          <div className="faq-animate flex flex-col items-center text-center mb-8 md:mb-14">
            <p className="text-[#C9A24B] text-[11px] font-semibold tracking-[0.22em] uppercase mb-4">
              COMMON QUESTIONS
            </p>
            <h2 className="font-display font-medium text-[#7A1F2B] text-[38px] md:text-[52px] lg:text-[60px] leading-tight">
              {sectionTitle}
            </h2>
            <div className="mt-5 w-16 h-[2px] bg-[#C9A24B]/60 rounded-full" />
          </div>

          {/* Accordion Cards */}
          <div className="faq-accordion-wrap flex flex-col gap-3 md:gap-4">
            {(showAll ? faqs : faqs.slice(0, FAQ_PREVIEW)).map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <div
                  key={index}
                  className={`faq-animate rounded-2xl border transition-[border-color,background-color,box-shadow] duration-300 overflow-hidden ${
                    isOpen
                      ? "border-[#C9A24B] bg-white shadow-[0_6px_32px_rgba(201,162,75,0.15)]"
                      : "border-[#E6DED2] bg-white/80 hover:border-[#C9A24B]/60 hover:shadow-[0_2px_16px_rgba(201,162,75,0.08)]"
                  }`}
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full flex items-center justify-between px-5 py-5 md:px-9 md:py-8 text-left group"
                  >
                    {/* Number + Question */}
                    <div className="flex items-start gap-4 md:gap-5 flex-1 pr-4">
                      <span
                        className={`font-display text-[13px] font-semibold tracking-[0.12em] mt-0.5 shrink-0 transition-colors duration-300 ${
                          isOpen
                            ? "text-[#C9A24B]"
                            : "text-[#C9A24B]/45 group-hover:text-[#C9A24B]/70"
                        }`}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={`font-display font-medium text-[17px] md:text-[22px] leading-snug transition-colors duration-300 ${
                          isOpen
                            ? "text-[#7A1F2B]"
                            : "text-[#4A3728] group-hover:text-[#7A1F2B]"
                        }`}
                      >
                        {faq.question}
                      </span>
                    </div>

                    {/* Plus / Minus circle toggle */}
                    <span
                      className={`relative w-9 h-9 md:w-10 md:h-10 shrink-0 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                        isOpen
                          ? "bg-[#7A1F2B] border-[#7A1F2B]"
                          : "bg-transparent border-[#C9A24B]/40 group-hover:border-[#C9A24B]"
                      }`}
                    >
                      <span
                        className={`absolute w-[14px] h-[2px] rounded-full transition-all duration-300 ${
                          isOpen ? "bg-white" : "bg-[#C9A24B]"
                        }`}
                      />
                      <span
                        className={`absolute w-[2px] h-[14px] rounded-full transition-all duration-300 ${
                          isOpen ? "opacity-0 scale-0 bg-white" : "opacity-100 scale-100 bg-[#C9A24B]"
                        }`}
                      />
                    </span>
                  </button>

                  {/* Answer panel */}
                  <div
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${
                      isOpen ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="px-5 md:px-9 pb-6 md:pb-10 pl-[calc(1.25rem+2.25rem)] md:pl-[calc(2.25rem+2.25rem+1rem)]">
                      <div className="w-10 h-[1.5px] bg-[#C9A24B]/40 mb-4 rounded-full" />
                      <p className="text-[#625A54] text-[15px] md:text-[17px] leading-relaxed font-body">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {faqs.length > FAQ_PREVIEW && (
            <div className="mt-8 flex justify-center">
              <button
                type="button"
                onClick={() => setShowAll((v) => !v)}
                className="h-11 px-6 rounded-full border border-[#C9A24B] text-[#7A1F2B] text-[13px] font-semibold tracking-[0.1em] uppercase hover:bg-[#7A1F2B] hover:text-[#FAF6EE] hover:border-[#7A1F2B] transition-colors"
              >
                {showAll ? "Show fewer questions" : `Show all ${faqs.length} questions`}
              </button>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
