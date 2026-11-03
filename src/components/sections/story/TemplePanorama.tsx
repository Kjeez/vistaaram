import Image from "next/image";
import { OrnamentDivider } from "@/components/ui/Decor";

const DHAMS = ["Yamunotri", "Gangotri", "Kedarnath", "Badrinath"];

/** Full-width Devbhoomi panorama (the four dhams) between the timeline and the founder story. */
export default function TemplePanorama() {
  return (
    <section className="relative w-full overflow-hidden bg-[#FAF6EE] pt-10 md:pt-14" aria-label="The four dhams of Devbhoomi">
      <div className="relative z-10 text-center px-5">
        <p className="text-[#B48635] text-[11px] sm:text-[12px] uppercase tracking-[0.26em] font-semibold mb-3">
          Where it all comes from
        </p>
        <p className="font-display text-[#7A1F2B] text-[24px] sm:text-[30px] leading-snug">
          The four sacred dhams of Uttarakhand
        </p>
        <OrnamentDivider className="mt-4" />
        <p className="mt-4 flex flex-wrap justify-center gap-x-3 gap-y-1 text-[12px] sm:text-[13px] tracking-[0.18em] uppercase text-[#7A1F2B]/80">
          {DHAMS.map((d, i) => (
            <span key={d} className="flex items-center gap-3">
              {i > 0 && <span className="text-[#C9A24B]">✦</span>}
              {d}
            </span>
          ))}
        </p>
      </div>
      <div className="relative w-full h-[150px] sm:h-[220px] md:h-[300px] lg:h-[360px] -mt-2">
        <Image src="/images/temples.png" alt="Temples and peaks of Devbhoomi, Uttarakhand" fill sizes="100vw" className="object-cover object-bottom" />
        {/* Fade into the cream page above and below */}
        <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#FAF6EE] to-transparent" aria-hidden="true" />
        <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#FAF6EE] to-transparent" aria-hidden="true" />
      </div>
    </section>
  );
}
