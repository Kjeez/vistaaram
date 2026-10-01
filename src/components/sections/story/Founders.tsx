"use client";

import Image from "next/image";
import { ourStoryContent } from "@/data/content";

function InstagramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>
  );
}

function QuoteIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" className="opacity-20">
      <text x="0" y="34" fontSize="48" fill="#C9A24B" fontFamily="Georgia, serif">&ldquo;</text>
    </svg>
  );
}

export default function Founders() {
  return (
    <section className="relative w-full bg-[#FDFBF7] py-20 md:py-28 overflow-hidden">

      {/* Subtle background texture rings */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full border border-[#C9A24B]/10" />
        <div className="absolute -top-16 -right-16 w-[340px] h-[340px] rounded-full border border-[#C9A24B]/8" />
        <div className="absolute -bottom-40 -left-40 w-[480px] h-[480px] rounded-full border border-[#7A1F2B]/6" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1000px] px-6">

        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-20">
          <p className="text-[#C9A24B] text-[11px] font-semibold tracking-[0.22em] uppercase mb-4">
            THE PERSON BEHIND VISTAARAM
          </p>
          <h2 className="font-display font-medium text-[#7A1F2B] text-[32px] md:text-[44px] leading-tight mb-4">
            A Vision From Devbhoomi
          </h2>
          <div className="w-14 h-[2px] bg-[#C9A24B]/50 rounded-full" />
        </div>

        {/* Founder Card */}
        <div className="flex justify-center">
          {ourStoryContent.founders.map((founder, index) => (
            <div
              key={index}
              className="relative w-full max-w-[860px] rounded-3xl overflow-hidden bg-white border border-[#E6DED2] shadow-[0_8px_48px_rgba(122,31,43,0.08)]"
            >
              {/* Top gold accent bar */}
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#C9A24B]/0 via-[#C9A24B] to-[#C9A24B]/0" />

              <div className="flex flex-col md:flex-row">

                {/* Left — Full-height photo */}
                <div className="relative w-full md:w-[340px] shrink-0 h-[360px] md:h-auto md:min-h-[460px] bg-[#FAF6EE]">
                  <Image
                    src={founder.image}
                    alt={founder.name}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 100vw, 280px"
                  />
                  {/* Gradient overlay bottom on mobile only */}
                  <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white/80 to-transparent md:hidden" />
                </div>

                {/* Right — Content */}
                <div className="relative flex flex-col justify-center flex-1 px-8 py-10 md:px-10 md:py-12">

                  {/* Decorative quote mark */}
                  <div className="absolute top-8 right-8 text-[80px] leading-none font-serif text-[#C9A24B]/12 select-none pointer-events-none">
                    ❝
                  </div>

                  {/* Role badge */}
                  <div className="inline-flex items-center self-start gap-2 bg-[#FAF6EE] border border-[#E6DED2] rounded-full px-4 py-1.5 mb-5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C9A24B] shrink-0" />
                    <span className="text-[#C9A24B] text-[10px] font-semibold tracking-[0.18em] uppercase">
                      {founder.role}
                    </span>
                  </div>

                  {/* Name */}
                  <h3 className="font-display font-medium text-[#751E29] text-[28px] md:text-[34px] leading-tight mb-4">
                    {founder.name}
                  </h3>

                  {/* Divider */}
                  <div className="w-10 h-[1.5px] bg-[#C9A24B]/40 rounded-full mb-5" />

                  {/* Bio note */}
                  <p className="text-[#6B6259] text-[15px] md:text-[16px] leading-[1.8] mb-8 max-w-[380px]">
                    {founder.note}
                  </p>

                  {/* Instagram CTA */}
                  <a
                    href={founder.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 self-start group bg-transparent border border-[#E6DED2] hover:border-[#751E29] hover:bg-[#751E29] text-[#8E8783] hover:text-white transition-all duration-300 rounded-full px-5 py-2.5"
                  >
                    <InstagramIcon />
                    <span className="text-[13px] font-medium">Follow on Instagram</span>
                  </a>

                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
