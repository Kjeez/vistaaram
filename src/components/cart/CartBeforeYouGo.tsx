"use client";

import Image from "next/image";
import { comingSoonContent } from "@/data/content";

function BellIcon() {
  return (
    <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
    </svg>
  );
}

export default function CartBeforeYouGo() {
  // Grab Daily Puja Kit and Gifting Pack
  const items = [
    comingSoonContent.items.find(i => i.name === "Daily Puja Kit"),
    comingSoonContent.items.find(i => i.name === "Devotional Gifting Pack")
  ].filter(Boolean) as any[];

  return (
    <div className="flex flex-col items-center mt-12 md:mt-20">
      
      <div className="text-center mb-8">
        <h2 className="font-display font-medium text-[#7A1F2B] text-[24px] md:text-[28px] mb-2">
          Before You Go
        </h2>
        <p className="text-[#8E8783] text-[14px]">
          Complete your ritual with these essentials
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
        {items.map((item, idx) => (
          <div key={idx} className="flex flex-col sm:flex-row bg-white border border-[#E6DED2] rounded-xl overflow-hidden shadow-sm group hover:border-[#C9A24B]/40 hover:shadow-md transition-all duration-300">
            
            {/* Image Side */}
            <div className="relative w-full sm:w-[200px] h-[180px] sm:h-auto shrink-0 bg-[#FAF6EE] overflow-hidden">
              <Image 
                src={item.image} 
                alt={item.name} 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>

            {/* Content Side */}
            <div className="flex flex-col p-5 md:p-6 flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="font-display font-medium text-[#751E29] text-[18px]">
                  {item.name}
                </h3>
                <span className="bg-[#FAF6EE] border border-[#C9A24B]/40 text-[#78591A] text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap">
                  Coming Soon
                </span>
              </div>
              <p className="text-[#5A4F46] text-[13px] leading-relaxed mb-6">
                {item.description}
              </p>
              
              <div className="mt-auto">
                <button className="w-full h-10 rounded-full bg-[#751E29] text-[#FAF6EE] text-[12px] font-semibold tracking-wide flex items-center justify-center gap-2 hover:bg-[#5E1620] transition-colors">
                  <BellIcon />
                  Notify Me
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
