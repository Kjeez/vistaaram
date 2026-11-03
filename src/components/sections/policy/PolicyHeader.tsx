import { PageHero } from "@/components/ui/Decor";

interface PolicyHeaderProps {
  eyebrow: string;
  headline: string;
  subline: string;
  lastUpdated?: string;
}

// Shared header for policy and help pages; uses the decorated temple-doorway hero.
export default function PolicyHeader({ eyebrow, headline, subline, lastUpdated }: PolicyHeaderProps) {
  return (
    <PageHero eyebrow={eyebrow} title={headline} subtitle={subline}>
      {lastUpdated && (
        <p className="text-[12px] tracking-[0.12em] uppercase text-[#A79C91]">Last updated: {lastUpdated}</p>
      )}
    </PageHero>
  );
}
