import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import PageTransition from "@/components/ui/PageTransition";
import { ArchImage } from "@/components/editorial/ProductSections";
import { MadeCarousel, StoryAddToCart } from "@/components/editorial/StoryClient";
import { Eyebrow, Title, containerClass } from "@/components/editorial/ui";
import { ourStoryContent, storePolicy } from "@/data/content";
import { DHAMS, HINDI_TAGLINE, storyChapters, storyTimeline } from "@/data/editorial";

export const metadata: Metadata = {
  title: "Our Story | Vistaaram",
  description: "The journey of Vistaaram, from the sacred temples of Devbhoomi to your home.",
  alternates: { canonical: "/story" },
};

const CHAPTER_PAD = "py-[clamp(80px,10vw,144px)]";
const BODY = "text-[17px] sm:text-[18px] leading-[1.7] text-[#4A3A34] max-w-[500px] [text-wrap:pretty]";

function ChapterNumber({ n }: { n: string }) {
  return <div className="font-display italic text-[clamp(72px,9vw,128px)] leading-[0.8] text-[#E8D7B2]" aria-hidden="true">{n}</div>;
}

export default function StoryPage() {
  const [land, why] = ourStoryContent.chapters;
  const { panditNetwork, values } = ourStoryContent;

  return (
    <>
      <Navbar />
      <PageTransition>
        <main className="bg-[#FAF6EE] text-[#2A1B18]">
          {/* Hero */}
          <section className={`${containerClass} pt-[clamp(48px,7vw,96px)] pb-[clamp(72px,9vw,128px)] grid grid-cols-1 min-[900px]:grid-cols-2 gap-[clamp(48px,7vw,104px)] items-center`}>
            <div>
              <p className="flex items-center gap-3.5 text-[12px] tracking-[0.24em] uppercase text-[#8A6526] font-semibold">
                <span className="w-9 h-px bg-[#C6A15B]" />
                The Vistaaram Story
              </p>
              <h1 className="font-display font-medium text-[clamp(52px,7.2vw,104px)] leading-[0.98] tracking-[-0.02em] text-[#7A1F2B] mt-7">
                It Begins in <span className="italic">Devbhoomi</span>
              </h1>
              <p lang="hi" className="font-hindi text-[clamp(20px,2vw,26px)] text-[#8A6526] mt-7">{HINDI_TAGLINE}</p>
              <p className="text-[18px] leading-[1.65] text-[#66544D] max-w-[460px] mt-5 [text-wrap:pretty]">
                From the temples of Uttarakhand to the corner of your home where the diya is lit each evening. This is how Vistaaram came to be.
              </p>
              <nav aria-label="Chapters" className="mt-11 max-w-[440px] flex flex-col border-t border-[#E6D9C2]">
                {storyChapters.map((c, i) => (
                  <a key={c.id} href={`#${c.id}`} className="flex gap-[18px] items-baseline py-[13px] border-b border-[#E6D9C2] text-[#2A1B18] hover:text-[#7A1F2B] transition-colors">
                    <span className="font-display italic text-[#8A6526] w-[22px]">{String(i + 1).padStart(2, "0")}</span>
                    <span className="flex-1">{c.title}</span>
                    <span className="text-[#C6A15B]" aria-hidden="true">↓</span>
                  </a>
                ))}
              </nav>
            </div>
            <div>
              <ArchImage src={ourStoryContent.hero.image} alt="Temple at sunrise in the Himalaya" maxW="max-w-[480px]" priority />
              <p className="mt-[26px] text-center font-display italic text-[#66544D] text-[15px]">Uttarakhand, at first light</p>
            </div>
          </section>

          {/* Chapter 1 */}
          <section id="land" className="bg-[#FFFDF8] border-t border-[#EFE5D3] scroll-mt-20">
            <div className={`${containerClass} ${CHAPTER_PAD} grid grid-cols-1 min-[900px]:grid-cols-2 gap-[clamp(48px,7vw,104px)] items-center`}>
              <div className="relative aspect-[5/4] rounded-md overflow-hidden bg-[#E6D9C2]">
                <Image src={land.image} alt="Hands lighting a brass diya" fill sizes="(max-width: 900px) 100vw, 560px" className="object-cover" />
              </div>
              <div>
                <ChapterNumber n="01" />
                <Eyebrow className="mt-5">Chapter One</Eyebrow>
                <Title className="mt-3.5 !text-[clamp(36px,4.4vw,58px)]">{land.title}</Title>
                <p className={`${BODY} mt-6`}>{land.body}</p>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2.5 mt-8 font-display italic text-[20px] text-[#7A1F2B]">
                  {DHAMS.map((d, i) => (
                    <span key={d} className="flex items-center gap-4">
                      {i > 0 && <span className="text-[#C6A15B] text-[11px] not-italic" aria-hidden="true">◆</span>}
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Chapter 2 + pull quote */}
          <section id="why" className="bg-[#FAF6EE] scroll-mt-20">
            <div className={`${containerClass} pt-[clamp(80px,10vw,144px)] pb-[clamp(56px,7vw,96px)] grid grid-cols-1 min-[900px]:grid-cols-2 gap-[clamp(48px,7vw,104px)] items-center`}>
              <div>
                <ChapterNumber n="02" />
                <Eyebrow className="mt-5">Chapter Two</Eyebrow>
                <Title className="mt-3.5 !text-[clamp(36px,4.4vw,58px)]">{why.title}</Title>
                {why.body.split("\n\n").map((para, i) => (
                  <p key={i} className={`${BODY} ${i === 0 ? "mt-6" : "mt-[18px]"}`}>{para}</p>
                ))}
              </div>
              <div className="relative w-[calc(100%-22px)] min-[900px]:w-full max-w-[460px] mx-auto min-[900px]:mx-auto mr-[22px] min-[900px]:mr-auto">
                <div className="absolute top-[22px] left-[22px] -right-[22px] -bottom-[22px] border border-[#C6A15B] rounded-md" aria-hidden="true" />
                <div className="relative aspect-[4/5] rounded-md overflow-hidden bg-[#E6D9C2]">
                  <Image src={why.image} alt="Basket of temple marigolds" fill sizes="(max-width: 900px) 90vw, 460px" className="object-cover" />
                </div>
              </div>
            </div>
            {why.pullQuote && (
              <div className="mx-auto max-w-[1000px] px-5 pt-[clamp(56px,7vw,96px)] pb-[clamp(88px,11vw,152px)] text-center">
                <div className="flex items-center justify-center gap-3.5 text-[#C6A15B]" aria-hidden="true">
                  <span className="w-16 h-px bg-[#C6A15B]" />
                  <span className="text-[11px]">◆</span>
                  <span className="w-16 h-px bg-[#C6A15B]" />
                </div>
                <blockquote className="mt-9 font-display italic font-normal text-[clamp(30px,4.6vw,62px)] leading-[1.18] text-[#7A1F2B] [text-wrap:balance]">
                  “{why.pullQuote}”
                </blockquote>
              </div>
            )}
          </section>

          {/* Chapter 3: how a cup is made */}
          <section id="made" className="bg-[#FFFDF8] border-t border-[#EFE5D3] py-[clamp(80px,10vw,144px)] scroll-mt-20">
            <MadeCarousel>
              <div className="max-w-[620px]">
                <Eyebrow>Chapter Three · From flower to flame</Eyebrow>
                <Title className="mt-3.5 !text-[clamp(36px,4.4vw,58px)]">How a Vistaaram Cup Is Made</Title>
                <p className="text-[18px] leading-relaxed text-[#4A3A34] mt-[18px]">Every cup starts as an offering in a Devbhoomi temple.</p>
              </div>
            </MadeCarousel>
          </section>

          {/* Chapter 4: the pandits */}
          <section id="pandits" className="bg-[#561520] grid grid-cols-1 min-[960px]:grid-cols-2 scroll-mt-20">
            <div className="relative min-h-[clamp(320px,44vw,620px)] bg-[#3A0E15]">
              <Image src={panditNetwork.image} alt="Pandits performing a hawan" fill sizes="(max-width: 960px) 100vw, 50vw" className="object-cover" />
            </div>
            <div className="px-[clamp(24px,6vw,96px)] py-[clamp(56px,7vw,112px)] flex flex-col justify-center">
              <Eyebrow light>Chapter Four · 500+ years of wisdom</Eyebrow>
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

          {/* Chapter 5: timeline */}
          <section id="journey" className="bg-[#FAF6EE] scroll-mt-20">
            <div className={`${containerClass} ${CHAPTER_PAD}`}>
              <Eyebrow>Chapter Five</Eyebrow>
              <Title className="mt-3.5 !text-[clamp(36px,4.4vw,58px)]">The Journey So Far</Title>
              <ol className="mt-16 grid grid-cols-[repeat(auto-fit,minmax(190px,1fr))] gap-x-7 gap-y-12">
                {storyTimeline.map((t) => (
                  <li key={t.title} className={`relative pt-[30px] border-t ${t.upcoming ? "border-dashed border-[#C6A15B]" : "border-[#D9C49A]"}`}>
                    <span
                      className={`absolute -top-1.5 left-0 w-[11px] h-[11px] rounded-full ${t.upcoming ? "bg-[#C6A15B]" : "bg-[#FAF6EE] border-[1.5px] border-[#8A6526]"}`}
                      aria-hidden="true"
                    />
                    <div className={`font-display text-[44px] leading-none ${t.upcoming ? "italic text-[#8A6526]" : "text-[#7A1F2B]"}`}>{t.year}</div>
                    <div className="text-[11px] tracking-[0.2em] uppercase text-[#8A6526] font-semibold mt-3.5">{t.place}</div>
                    <h3 className="font-display font-medium text-[21px] text-[#2A1B18] mt-2.5">{t.title}</h3>
                    <p className="text-[15px] leading-relaxed text-[#66544D] mt-2">{t.text}</p>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {/* Four dhams */}
          <section className="bg-[#FAF6EE] pb-[clamp(72px,9vw,128px)]" aria-labelledby="dhams-title">
            <div className="text-center px-5">
              <Eyebrow>Where it all comes from</Eyebrow>
              <h2 id="dhams-title" className="font-display font-medium text-[clamp(30px,3.6vw,46px)] leading-[1.1] text-[#7A1F2B] mt-3.5">
                The four sacred dhams of Uttarakhand
              </h2>
            </div>
            <Image
              src="/images/temples.png"
              alt="Illustration of Yamunotri, Gangotri, Kedarnath and Badrinath"
              width={2170}
              height={725}
              sizes="100vw"
              className="block w-full h-auto mt-[clamp(24px,3vw,40px)]"
            />
            <div className="mx-auto max-w-[1440px] grid grid-cols-4 text-center font-display italic text-[clamp(14px,1.6vw,22px)] text-[#7A1F2B] px-[2%]">
              {DHAMS.map((d) => (
                <span key={d}>{d}</span>
              ))}
            </div>
          </section>

          {/* Values */}
          <section className="bg-[#FFFDF8] border-t border-[#EFE5D3]">
            <div className={`${containerClass} py-[clamp(72px,9vw,120px)]`}>
              <Eyebrow>The Vistaaram promise</Eyebrow>
              <div className="mt-10 grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-x-12 gap-y-10">
                {values.map((v) => (
                  <div key={v.title} className="border-t border-[#D9C49A] pt-7">
                    <h3 className="font-display font-medium text-[clamp(30px,3vw,40px)] text-[#7A1F2B]">{v.title}</h3>
                    <p className="text-[17px] leading-relaxed text-[#4A3A34] mt-3">{v.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Final CTA */}
          <section className="bg-[#7A1F2B]">
            <div className={`${containerClass} py-[clamp(72px,9vw,120px)] grid grid-cols-1 min-[900px]:grid-cols-2 gap-[clamp(48px,6vw,88px)] items-center`}>
              <div>
                <h2 className="font-display font-medium text-[clamp(40px,5vw,68px)] leading-[1.04] text-[#FAF1E4] [text-wrap:balance]">
                  {ourStoryContent.cta.headline}
                </h2>
                <p lang="hi" className="font-hindi text-[clamp(20px,2vw,24px)] text-[#E2BE72] mt-[22px]">{HINDI_TAGLINE}</p>
                <div className="flex flex-wrap gap-3.5 mt-10">
                  <StoryAddToCart />
                  <Link
                    href="/shop"
                    className="h-[54px] px-[30px] rounded-full border border-[#FAF1E4]/60 text-[#FAF1E4] font-semibold text-[14px] tracking-[0.12em] uppercase flex items-center hover:bg-[#FAF1E4]/10 transition-colors"
                  >
                    See all packs
                  </Link>
                </div>
                <p className="text-[14px] text-[#EAD8C8] mt-[22px]">
                  Cash on Delivery · Free shipping above ₹{storePolicy.freeShippingThreshold} · {storePolicy.returnWindowDays}-day returns
                </p>
              </div>
              <ArchImage src="/images/product/1.jpg" alt="Vistaaram Sambrani Hawan Cup box" dark />
            </div>
          </section>
        </main>
      </PageTransition>
      <Footer />
    </>
  );
}
