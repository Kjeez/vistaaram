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
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useGSAP(
    () => {
      gsap.from(".faq-decor-left", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          once: true,
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
          once: true,
        },
        x: 80,
        opacity: 0,
        duration: 1.6,
        ease: "power3.out",
      });

      gsap.from(".faq-animate", {
        scrollTrigger: {
          trigger: ".faq-accordion-wrap",
          start: "top 80%",
          once: true,
        },
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
      });

      gsap.fromTo(
        ".faq-pandit-image",
        { scale: 1.08, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".faq-pandit-section",
            start: "top 75%",
            once: true,
          },
        }
      );

      gsap.from(".faq-pandit-text > *", {
        scrollTrigger: {
          trigger: ".faq-pandit-section",
          start: "top 70%",
          once: true,
        },
        x: 40,
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
    <section
      id="faq"
      ref={sectionRef}
      className="relative w-full bg-[#FAF6EE] overflow-hidden"
    >
      {/* ── Pandit Story Block ──────────────────────────────── */}
      <div className="faq-pandit-section w-full flex flex-col md:flex-row bg-[#7A1F2B] overflow-hidden">
        {/* Left Image */}
        <div className="relative w-full md:w-[45%] h-[340px] md:h-auto min-h-[420px] lg:min-h-[520px] overflow-hidden">
          <Image
            src="/images/pandit_jis.jpg"
            alt="Pandits of Devbhoomi performing Havan"
            fill
            priority
            className="faq-pandit-image object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#7A1F2B]/30 hidden md:block" />
        </div>

        {/* Right Text */}
        <div className="relative w-full md:w-[55%] flex flex-col justify-center px-8 py-16 md:p-12 lg:p-20 xl:p-24">
          {/* Spinning mandala */}
          <div className="absolute -top-[180px] -right-[180px] w-[500px] h-[500px] pointer-events-none select-none opacity-[0.12]">
            <Image
              src="/images/circle_design.png"
              alt=""
              fill
              className="object-contain animate-[spin_60s_linear_infinite]"
            />
          </div>

          <div className="faq-pandit-text relative z-10 max-w-[550px]">
            <p className="text-[#C9A24B] text-[10px] md:text-[11px] font-semibold tracking-[0.2em] uppercase mb-4 md:mb-5">
              500+ YEARS OF WISDOM
            </p>
            <h2 className="font-display font-medium text-[#FAF6EE] text-[34px] sm:text-[40px] md:text-[48px] lg:text-[54px] leading-[1.1] mb-5 md:mb-6">
              Blessed by the Pandits
              <br />of Devbhoomi
            </h2>
            <p className="font-body text-[14px] md:text-[15px] lg:text-[16px] leading-[2.2]">
              <span className="bg-[#C9A24B] text-[#1a110a] font-medium py-1 px-1.5 box-decoration-clone">
                Every blend is guided by the knowledge of 500+ pandits —
                <br className="hidden xl:block" />
                the same hands that have performed hawans in Devbhoomi&apos;s
                <br className="hidden xl:block" />
                temples for generations.
              </span>
            </p>
          </div>
        </div>
      </div>

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
          <div className="faq-animate flex flex-col items-center text-center mb-14">
            <p className="text-[#C9A24B] text-[11px] font-semibold tracking-[0.22em] uppercase mb-4">
              COMMON QUESTIONS
            </p>
            <h2 className="font-display font-medium text-[#7A1F2B] text-[38px] md:text-[52px] lg:text-[60px] leading-tight">
              {sectionTitle}
            </h2>
            <div className="mt-5 w-16 h-[2px] bg-[#C9A24B]/60 rounded-full" />
          </div>

          {/* Accordion Cards */}
          <div className="faq-accordion-wrap flex flex-col gap-4">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <div
                  key={index}
                  className={`faq-animate rounded-2xl border transition-all duration-400 overflow-hidden ${
                    isOpen
                      ? "border-[#C9A24B] bg-white shadow-[0_6px_32px_rgba(201,162,75,0.15)]"
                      : "border-[#E6DED2] bg-white/80 hover:border-[#C9A24B]/60 hover:shadow-[0_2px_16px_rgba(201,162,75,0.08)]"
                  }`}
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full flex items-center justify-between px-7 py-7 md:px-9 md:py-8 text-left group"
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
                        className={`font-display font-medium text-[18px] md:text-[22px] leading-snug transition-colors duration-300 ${
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
                    <div className="px-7 md:px-9 pb-8 md:pb-10" style={{ paddingLeft: "calc(1.75rem + 2.25rem + 1rem)" }}>
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

        </div>
      </div>
    </section>
  );
}
