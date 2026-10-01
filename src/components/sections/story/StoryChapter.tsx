"use client";

import Image from "next/image";

interface ChapterProps {
  number: string;
  title: string;
  body: string;
  image: string;
  pullQuote: string | null;
  dhams: { name: string; icon: string }[] | null;
  reverse?: boolean;
}

export default function StoryChapter({ number, title, body, image, pullQuote, dhams, reverse = false }: ChapterProps) {
  return (
    <section className="relative w-full bg-[#FAF6EE] py-16 md:py-24 overflow-hidden">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className={`flex flex-col gap-12 lg:gap-20 items-center ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}>
          
          {/* Image Side */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="relative w-full max-w-[500px] aspect-[4/3] lg:aspect-[5/4] rounded-[16px] overflow-hidden border border-[#C9A24B]/40 shadow-lg">
              <Image 
                src={image} 
                alt={title} 
                fill 
                className="object-cover"
              />
            </div>
          </div>

          {/* Content Side */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="max-w-[520px] flex flex-col">
              
              <div className="flex items-center gap-3 mb-5">
                <span className="text-[#C9A24B] text-[11px] font-semibold tracking-[0.2em] uppercase">
                  {number}
                </span>
                <span className="h-px bg-[#C9A24B]/30 flex-1 max-w-[40px]" />
                <span className="text-[#C9A24B] text-[11px] font-semibold tracking-[0.2em] uppercase">
                  {title}
                </span>
              </div>
              
              <h2 className="font-display font-medium text-[#7A1F2B] text-[32px] md:text-[2rem] leading-[1.2] mb-6">
                {title}
              </h2>
              
              <div className="text-[#5A4F46] text-[16px] font-body leading-relaxed whitespace-pre-line mb-8">
                {body}
              </div>

              {dhams && dhams.length > 0 && (
                <div className="flex flex-wrap gap-6 mt-2">
                  {dhams.map((dham, idx) => (
                    <div key={idx} className="flex flex-col items-center gap-2">
                      <div className="w-12 h-12 rounded-full border border-[#C9A24B]/30 flex items-center justify-center text-[20px] bg-white">
                        {dham.icon}
                      </div>
                      <span className="text-[#7A1F2B] text-[12px] font-medium">{dham.name}</span>
                    </div>
                  ))}
                </div>
              )}

              {pullQuote && (
                <div className="mt-4 pl-6 border-l-2 border-[#C9A24B]">
                  <p className="font-display italic text-[#C9A24B] text-[22px] md:text-[26px] leading-[1.3]">
                    "{pullQuote}"
                  </p>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
