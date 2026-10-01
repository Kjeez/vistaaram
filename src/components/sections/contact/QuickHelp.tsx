import Link from "next/link";
import { contactContent } from "@/data/content";

/* ── Icons ────────────────────────────────── */

function PackageIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C9A24B" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <line x1="16.5" y1="9.4" x2="7.5" y2="4.21" />
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  );
}

function RefreshIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C9A24B" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="1 4 1 10 7 10" />
      <polyline points="23 20 23 14 17 14" />
      <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4-4.64 4.36A9 9 0 0 1 3.51 15" />
    </svg>
  );
}

function BookIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C9A24B" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  );
}

const iconMap: Record<string, React.ReactNode> = {
  track: <PackageIcon />,
  returns: <RefreshIcon />,
  faq: <BookIcon />,
};

/* ── Main ────────────────────────────────── */

export default function QuickHelp() {
  const { headline, subline, cards } = contactContent.quickHelp;

  return (
    <section className="w-full bg-[#FAF6EE] py-16 md:py-20">
      {/* Header */}
      <div className="text-center mb-10 px-6">
        <h2 className="font-display font-medium text-[#7A1F2B] text-[28px] md:text-[36px] mb-3">
          {headline}
        </h2>
        <p className="text-[#6B6259] text-[15px] max-w-[480px] mx-auto">{subline}</p>
      </div>

      {/* Cards */}
      <div className="max-w-[1100px] mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-3 gap-5">
        {cards.map((card) => (
          <div
            key={card.type}
            className="bg-white rounded-xl border border-[#E6DED2] p-6 flex flex-col gap-3"
          >
            {/* Icon circle */}
            <div className="w-10 h-10 rounded-full bg-[#FEF9EE] border border-[#E8D9AA] flex items-center justify-center">
              {iconMap[card.type]}
            </div>

            <h3 className="font-display font-medium text-[#7A1F2B] text-[17px] leading-snug">
              {card.title}
            </h3>

            <p className="text-[#6B6259] text-[14px] leading-relaxed flex-1">
              {card.desc}
            </p>

            <Link
              href={card.href}
              className="text-[#7A1F2B] text-[13px] font-semibold hover:underline"
            >
              {card.cta} &rarr;
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
