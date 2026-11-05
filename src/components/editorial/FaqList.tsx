"use client";

import { useState } from "react";
import Link from "next/link";
import { Eyebrow, Title, containerClass, textLinkClass } from "./ui";

/** Two-column "Questions, Answered" block with a single-open accordion. */
export default function FaqList({
  faqs,
  eyebrow,
  id,
  moreHref,
}: {
  faqs: { q: string; a: string }[];
  eyebrow: string;
  id?: string;
  moreHref?: string;
}) {
  const [open, setOpen] = useState(0);

  return (
    <section id={id} className="bg-[#FFFDF8] border-t border-[#EFE5D3] scroll-mt-[130px]">
      <div className={`${containerClass} py-[clamp(64px,8vw,104px)] flex flex-wrap gap-x-[clamp(40px,6vw,96px)] gap-y-10`}>
        <div className="flex-[1_1_280px]">
          <Eyebrow>{eyebrow}</Eyebrow>
          <Title size="md" className="mt-3">Questions, Answered</Title>
          {moreHref && (
            <Link href={moreHref} className={`${textLinkClass} mt-6`}>
              See all questions →
            </Link>
          )}
        </div>
        <div className="flex-[2_1_480px] min-w-0 border-t border-[#E6D9C2]">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className="border-b border-[#E6D9C2]">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="w-full flex justify-between items-center gap-5 py-[22px] text-left font-display text-[19px] sm:text-[20px] text-[#2A1B18] hover:text-[#7A1F2B] transition-colors"
                >
                  {f.q}
                  <span className="shrink-0 w-[30px] h-[30px] rounded-full border border-[#C6A15B] flex items-center justify-center font-body text-[16px] text-[#7A1F2B]" aria-hidden="true">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>
                {isOpen && <p className="pb-6 pr-12 text-[16px] leading-[1.65] text-[#4A3A34]">{f.a}</p>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
