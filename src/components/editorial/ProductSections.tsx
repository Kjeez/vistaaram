import Image from "next/image";
import Link from "next/link";
import { comingSoonContent, testimonialsContent } from "@/data/content";
import { howToUseSteps, insideContent, processSteps, ritualCards, socialProof } from "@/data/editorial";
import { Eyebrow, RuledItem, Title, containerClass, textLinkClass } from "./ui";

const SECTION_PAD = "py-[clamp(72px,9vw,128px)]";

const SUB_NAV = [
  { href: "#inside", label: "What's inside" },
  { href: "#how", label: "How to use" },
  { href: "#rituals", label: "Rituals" },
  { href: "#process", label: "How it's made" },
  { href: "#voices", label: "Reviews" },
  { href: "#faq", label: "FAQ" },
];

/** In-page section links; sticks under the main navbar. */
export function ProductSubNav() {
  return (
    <nav aria-label="Product sections" className="sticky top-[64px] sm:top-[72px] z-30 bg-[#FAF6EE] border-y border-[#E6D9C2]">
      <div className={`${containerClass} flex gap-7 overflow-x-auto whitespace-nowrap text-[14px] font-medium [scrollbar-width:none] [&::-webkit-scrollbar]:hidden`}>
        {SUB_NAV.map((l) => (
          <a key={l.href} href={l.href} className="py-4 text-[#2A1B18] hover:text-[#7A1F2B] transition-colors">
            {l.label}
          </a>
        ))}
      </div>
    </nav>
  );
}

export function InsideSection() {
  return (
    <section id="inside" className="bg-[#FFFDF8] scroll-mt-[130px]">
      <div className={`${containerClass} ${SECTION_PAD}`}>
        <Eyebrow>{insideContent.eyebrow}</Eyebrow>
        <Title size="xl" className="mt-3.5">
          {insideContent.title[0]}
          <br />
          {insideContent.title[1]}
        </Title>
        <p className="text-[18px] leading-[1.65] text-[#4A3A34] mt-5 max-w-[560px]">{insideContent.intro}</p>
        <div className="mt-14 grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-x-10 gap-y-9">
          {insideContent.items.map((it) => (
            <RuledItem key={it.title} n={it.n} title={it.title} text={it.text} />
          ))}
        </div>
      </div>
    </section>
  );
}

/** Arched photo with an offset gold outline, used on the product and story pages. */
export function ArchImage({ src, alt, maxW = "max-w-[400px]", dark = false, priority = false }: { src: string; alt: string; maxW?: string; dark?: boolean; priority?: boolean }) {
  return (
    <div className={`relative w-full ${maxW} justify-self-center mx-auto`}>
      <div className={`absolute -inset-3.5 border rounded-[999px_999px_16px_16px] pointer-events-none ${dark ? "border-[#E2BE72]/60" : "border-[#C6A15B]"}`} />
      <div className={`relative aspect-[4/5] rounded-[999px_999px_10px_10px] overflow-hidden ${dark ? "bg-[#561520]" : "bg-[#EFE5D3]"}`}>
        <Image src={src} alt={alt} fill priority={priority} sizes="(max-width: 860px) 90vw, 480px" className="object-cover" />
      </div>
    </div>
  );
}

export function HowToUseSection() {
  return (
    <section id="how" className="bg-[#FAF6EE] scroll-mt-[130px]">
      <div className={`${containerClass} ${SECTION_PAD} grid grid-cols-1 min-[860px]:grid-cols-2 gap-[clamp(48px,7vw,104px)] items-center`}>
        <ArchImage src="/images/product/2.jpg" alt="Hawan cup giving gentle smoke" />
        <div>
          <Eyebrow>How to use</Eyebrow>
          <Title className="mt-3.5">Three steps to a fragrant puja</Title>
          <ol className="mt-10 flex flex-col">
            {howToUseSteps.map((s, i) => (
              <li key={s.title} className={`flex gap-6 py-[22px] border-t border-[#D9C49A] ${i === howToUseSteps.length - 1 ? "border-b" : ""}`}>
                <span className="font-display italic text-[34px] leading-none text-[#8A6526] w-10 shrink-0">{i + 1}</span>
                <div>
                  <div className="font-display text-[22px] text-[#2A1B18]">{s.title}</div>
                  <div className="text-[15px] text-[#66544D] mt-1">{s.text}</div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

export function RitualsSection() {
  return (
    <section id="rituals" className="bg-[#FFFDF8] border-t border-[#EFE5D3] scroll-mt-[130px]">
      <div className={`${containerClass} ${SECTION_PAD}`}>
        <div className="flex flex-wrap justify-between items-end gap-x-10 gap-y-4">
          <Title>For Every Ritual</Title>
          <p className="text-[16px] leading-relaxed text-[#4A3A34] max-w-[380px]">
            Bring purity, positivity and divine energy into every moment of your life.
          </p>
        </div>
        <div className="mt-11 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-9">
          {ritualCards.map((r) => (
            <figure key={r.title}>
              <div className="relative aspect-[4/5] rounded-md overflow-hidden bg-[#EFE5D3]">
                <Image src={r.image} alt="" fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" className="object-cover" />
              </div>
              <figcaption>
                <h3 className="font-display font-medium text-[22px] text-[#2A1B18] mt-[18px]">{r.title}</h3>
                <p className="text-[15px] leading-[1.55] text-[#66544D] mt-1.5">{r.text}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProcessSection() {
  return (
    <section id="process" className="bg-[#561520] scroll-mt-[130px] grid grid-cols-1 min-[960px]:grid-cols-2">
      <div className="relative min-h-[clamp(320px,40vw,640px)] bg-[#3A0E15]">
        <Image src="/images/process_step_4.jpg" alt="Hands filling a hawan cup" fill sizes="(max-width: 960px) 100vw, 50vw" className="object-cover" />
      </div>
      <div className="px-[clamp(24px,6vw,88px)] py-[clamp(56px,7vw,104px)]">
        <Eyebrow light>Devbhoomi to your home</Eyebrow>
        <Title light className="mt-3.5 !text-[clamp(36px,4.2vw,54px)]">Our Process</Title>
        <ol className="mt-9 grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-x-8 gap-y-6">
          {processSteps.map((s, i) => (
            <li key={s.title} className="border-t border-[#E2BE72]/35 pt-4">
              <span className="font-display italic text-[#E2BE72]">{String(i + 1).padStart(2, "0")}</span>
              <div className="font-display text-[19px] text-[#FAF1E4] mt-1">{s.title}</div>
              <div className="text-[14px] leading-[1.55] text-[#EAD8C8] mt-1">{s.text}</div>
            </li>
          ))}
        </ol>
        <Link href="/story#made" className="inline-block mt-9 text-[15px] font-medium text-[#E2BE72] border-b border-[#E2BE72]/60 pb-0.5 hover:text-[#F1D48F]">
          Read the full story →
        </Link>
      </div>
    </section>
  );
}

export function VoicesSection({ id = "voices" }: { id?: string } = {}) {
  const stats = [
    { value: socialProof.rating, star: true, label: "average rating" },
    { value: socialProof.homes, label: "homes across India" },
    { value: socialProof.ordersShipped, label: "orders shipped" },
  ];
  return (
    <section id={id} className="bg-[#FAF6EE] scroll-mt-[130px]">
      <div className={`${containerClass} pt-[clamp(72px,9vw,128px)] pb-8`}>
        <div className="flex flex-wrap justify-between items-end gap-x-12 gap-y-7">
          <div>
            <Eyebrow>Real stories from homes across India</Eyebrow>
            <Title className="mt-3.5">Voices of Devotion</Title>
          </div>
          <div className="flex flex-wrap gap-x-10 gap-y-5">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="font-display text-[36px] text-[#2A1B18] leading-none">
                  {s.value}
                  {s.star && <span className="text-[18px] text-[#B98A2E]"> ★</span>}
                </div>
                <div className="text-[13px] text-[#66544D] mt-1.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-10 md:mt-12 flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory -mx-5 px-5 sm:-mx-[clamp(20px,5vw,48px)] sm:px-[clamp(20px,5vw,48px)] md:mx-0 md:px-0 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {testimonialsContent.testimonials.map((t) => (
            <article key={t.id} className="shrink-0 w-[86%] sm:w-[60%] md:w-auto snap-start grid grid-cols-[110px_minmax(0,1fr)] md:grid-cols-[120px_minmax(0,1fr)] bg-[#FFFDF8] border border-[#E6D9C2] rounded-[10px] overflow-hidden">
              <div className="relative min-h-[200px]">
                <Image src={t.avatar} alt={t.name} fill sizes="120px" className="object-cover" />
              </div>
              <div className="p-[22px] flex flex-col gap-3">
                <span className="text-[#B98A2E] tracking-[2px] text-[13px]" aria-label={`${t.rating} out of 5 stars`}>
                  {"★".repeat(t.rating)}
                </span>
                <p className="text-[15px] leading-relaxed text-[#2A1B18] flex-1">{t.quote}</p>
                <div>
                  <div className="font-display text-[17px] text-[#7A1F2B]">{t.name}</div>
                  <div className="text-[12px] text-[#66544D] mt-0.5">{t.location}</div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Three upcoming products in a compact row, linking to the shop. */
export function ComingSoonStrip() {
  return (
    <section className="bg-[#FAF6EE] border-t border-[#EFE5D3]">
      <div className={`${containerClass} py-[clamp(64px,8vw,96px)]`}>
        <div className="flex flex-wrap justify-between items-end gap-4">
          <Title size="sm">Coming soon from Devbhoomi</Title>
          <Link href="/shop" className={textLinkClass}>
            Visit the shop →
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {comingSoonContent.items.map((item) => (
            <Link key={item.name} href="/shop#coming-soon" className="group flex gap-4 items-center text-[#2A1B18]">
              <div className="relative w-24 h-24 shrink-0 rounded-md overflow-hidden bg-[#EFE5D3]">
                <Image src={item.image} alt="" fill sizes="96px" className="object-cover" />
              </div>
              <div>
                <div className="font-display text-[19px] group-hover:text-[#7A1F2B] transition-colors">{item.name}</div>
                <div className="text-[13px] text-[#66544D] mt-1">Notify me on WhatsApp →</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
