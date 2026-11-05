import Image from "next/image";
import { ourStoryContent } from "@/data/content";
import { Eyebrow, Title } from "./ui";

/** Photo of the pandits beside a maroon panel with the "500+ pandits" figure (story page and homepage). */
export default function PanditSection({ id = "pandits", eyebrow }: { id?: string; eyebrow: string }) {
  const { panditNetwork } = ourStoryContent;
  return (
    <section id={id} className="bg-[#561520] grid grid-cols-1 min-[960px]:grid-cols-2 scroll-mt-20">
      <div className="relative min-h-[clamp(320px,44vw,620px)] bg-[#3A0E15]">
        <Image src={panditNetwork.image} alt="Pandits performing a hawan" fill sizes="(max-width: 960px) 100vw, 50vw" className="object-cover" />
      </div>
      <div className="px-[clamp(24px,6vw,96px)] py-[clamp(56px,7vw,112px)] flex flex-col justify-center">
        <Eyebrow light>{eyebrow}</Eyebrow>
        <Title light className="mt-[18px] max-w-[520px] !text-[clamp(36px,4.2vw,56px)] !leading-[1.08]">{panditNetwork.headline}</Title>
        <p className="text-[18px] leading-[1.7] text-[#EAD8C8] mt-6 max-w-[480px] [text-wrap:pretty]">{panditNetwork.body}</p>
        <div className="flex items-center gap-5 mt-11 pt-7 border-t border-[#E2BE72]/35 max-w-[480px]">
          <span className="font-display text-[64px] leading-none text-[#E2BE72]">500+</span>
          <span className="text-[15px] leading-normal text-[#EAD8C8]">
            pandits guide
            <br />
            every blend
          </span>
        </div>
      </div>
    </section>
  );
}
