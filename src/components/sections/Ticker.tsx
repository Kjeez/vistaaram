"use client";

import { tickerContent } from "@/data/content";

export default function Ticker() {
  // A single group of items. We use fixed gaps instead of justify-around.
  // The pr-10 at the end ensures the spacing between groups matches the gap inside the group.
  const TickerGroup = () => (
    <div className="flex items-center w-max shrink-0 gap-10 pr-10">
      {tickerContent.map((item, i) => (
        <div key={i} className="flex items-center gap-10">
          <span className="flex items-center gap-2 text-[12px] tracking-[0.08em] text-gold-ticker whitespace-nowrap">
            {item.icon && <span>{item.icon}</span>}
            <span>{item.text}</span>
          </span>
          {/* Separator */}
          <span className="text-gold text-[10px]">✦</span>
        </div>
      ))}
    </div>
  );

  return (
    <div
      className="w-full h-[40px] overflow-hidden whitespace-nowrap bg-maroon-ticker flex items-center"
      role="marquee"
      aria-label="Announcements"
    >
      <div 
        className="flex w-max hover:[animation-play-state:paused]"
        style={{ animation: 'ticker 30s linear infinite' }}
      >
        {/* Render 4 groups to ensure it fills even ultrawide screens */}
        <TickerGroup />
        <TickerGroup />
        <TickerGroup />
        <TickerGroup />
      </div>
    </div>
  );
}
