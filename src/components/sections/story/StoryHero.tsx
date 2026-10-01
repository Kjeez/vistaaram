"use client";

import Image from "next/image";
import { ourStoryContent } from "@/data/content";

export default function StoryHero() {
  return (
    <section className="relative w-full h-[60vh] min-h-[400px] overflow-hidden bg-[#7A1F2B]">
      
      {/* Background Image with Ken Burns effect */}
      <div className="absolute inset-0 z-0">
        <Image
          src={ourStoryContent.hero.image}
          alt="Devbhoomi landscape"
          fill
          priority
          className="object-cover motion-safe:animate-[kenburns_20s_ease-out_forwards]"
        />
      </div>

      {/* Dark maroon gradient scrim from bottom */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#3A0F14] via-[#7A1F2B]/40 to-transparent opacity-90" />

      {/* Content */}
      <div className="relative z-20 w-full h-full flex flex-col items-center justify-center text-center px-4 pt-16">
        <p className="text-[#C9A24B] text-[12px] md:text-[14px] font-semibold tracking-[0.25em] uppercase mb-4 md:mb-6">
          {ourStoryContent.hero.eyebrow}
        </p>
        
        <h1 className="font-display font-medium text-[#FAF6EE] text-[clamp(2.5rem,5vw,3.5rem)] leading-tight mb-8 max-w-[800px] drop-shadow-md">
          {ourStoryContent.hero.headline}
        </h1>
        
        {/* Thin Gold Rule */}
        <div className="flex items-center gap-2">
          <div className="h-[1px] w-12 bg-[#C9A24B]/60" />
          <div className="w-1.5 h-1.5 rotate-45 bg-[#C9A24B]" />
          <div className="h-[1px] w-12 bg-[#C9A24B]/60" />
        </div>
      </div>
      
      {/* Tailwind Ken Burns keyframes - we add this via custom class or global CSS, but here inline is fine if it works or standard transform */}
      <style jsx global>{`
        @keyframes kenburns {
          0% { transform: scale(1); }
          100% { transform: scale(1.1); }
        }
      `}</style>
    </section>
  );
}
