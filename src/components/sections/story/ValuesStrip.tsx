"use client";

import { ourStoryContent } from "@/data/content";

function LeafIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#C9A24B" strokeWidth="1.2">
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" stroke="none" />
      <path d="M12 21c-4.97 0-9-4.03-9-9 0-4.97 4.03-9 9-9 1.5 0 2.92.38 4.15 1.05C18.25 4.6 21 8.2 21 12c0 4.97-4.03 9-9 9z" stroke="none" />
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" stroke="none" />
      <path d="M12 2c0 0 8 2 8 10s-8 10-8 10-8-2-8-10 8-10 8-10z" />
      <path d="M12 22V2" />
    </svg>
  );
}

function DiyaIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#C9A24B" strokeWidth="1.2">
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" stroke="none" />
      <path d="M12 21c-4.97 0-9-4.03-9-9 0-4.97 4.03-9 9-9 1.5 0 2.92.38 4.15 1.05C18.25 4.6 21 8.2 21 12c0 4.97-4.03 9-9 9z" fill="none" />
      <path d="M12 2c0 0 8 2 8 10s-8 10-8 10-8-2-8-10 8-10 8-10z" stroke="none" />
      <path d="M12 20s-6-3-6-8c0-3.3 2.7-6 6-9 3.3 3 6 5.7 6 9 0 5-6 8-6 8z" fill="none" />
      <path d="M12 11s-2-1.5-2-3.5c0-1.1.9-2 2-3 1.1 1 2 1.9 2 3 0 2-2 3.5-2 3.5z" />
    </svg>
  );
}

function MountainIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#C9A24B" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 3l4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}

export default function ValuesStrip() {
  const getIcon = (iconName: string) => {
    switch(iconName) {
      case '🌿': return <LeafIcon />;
      case '🪔': return <DiyaIcon />;
      case '🏔️': return <MountainIcon />;
      default: return null;
    }
  };

  return (
    <section className="relative w-full bg-[#FAF6EE] py-16 pb-24">
      <div className="mx-auto max-w-[1200px] px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ourStoryContent.values.map((val, i) => (
            <div 
              key={i} 
              className="bg-white rounded-[16px] border border-[#C9A24B]/30 hover:border-[#C9A24B]/70 hover:shadow-xl transition-all duration-500 p-8 flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-6 group"
            >
              <div className="w-[60px] h-[60px] shrink-0 rounded-full bg-[#FAF6EE] border border-[#C9A24B]/40 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                {getIcon(val.icon)}
              </div>
              <div className="flex flex-col">
                <h3 className="font-display font-medium text-[#7A1F2B] text-[20px] md:text-[22px] mb-2">
                  {val.title}
                </h3>
                <p className="text-[#5A4F46] text-[14px] leading-relaxed">
                  {val.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
