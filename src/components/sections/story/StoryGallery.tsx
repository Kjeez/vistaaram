import Image from "next/image";
import { storiesContent } from "@/data/content";
import { FlowerSpray, Mandala, OrnamentDivider } from "@/components/ui/Decor";

/** Photo walk-through of how a cup is made; a swipeable row on phones, a grid on larger screens. */
export default function StoryGallery() {
  const { sectionEyebrow, sectionTitle, sectionSubtitle, stories } = storiesContent;

  return (
    <section className="relative w-full overflow-hidden bg-[#FAF6EE] py-16 md:py-20" aria-labelledby="story-gallery-title">
      <Mandala className="absolute left-1/2 -top-24 -translate-x-1/2 w-[520px] h-[520px]" opacity={0.06} />
      <FlowerSpray variant={2} className="hidden md:block absolute right-0 top-6 w-[130px] h-[190px]" opacity={0.35} />
      <FlowerSpray variant={1} className="hidden md:block absolute left-0 bottom-6 w-[130px] h-[190px]" opacity={0.35} />
      <div className="relative mx-auto max-w-[1200px] px-4 sm:px-6">
        <div className="text-center mb-10">
          <p className="text-[#B48635] text-[11px] sm:text-[12px] uppercase tracking-[0.24em] font-semibold mb-3">
            {sectionEyebrow}
          </p>
          <h2 id="story-gallery-title" className="font-display font-medium text-[#7A1F2B] text-[30px] md:text-[40px] leading-tight mb-3">
            {sectionTitle}
          </h2>
          <OrnamentDivider className="mb-4" />
          <p className="text-[#5A4F46] text-[15px]">{sectionSubtitle}</p>
        </div>

        <ol className="flex md:grid md:grid-cols-3 gap-4 md:gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory -mx-4 px-4 md:mx-0 md:px-0 pb-2">
          {stories.map((story, index) => (
            <li key={story.image} className="snap-start shrink-0 w-[78%] sm:w-[46%] md:w-auto">
              <figure className="group">
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-[#EFE8D8]">
                  <Image
                    src={story.image}
                    alt={story.caption}
                    fill
                    sizes="(max-width: 640px) 78vw, (max-width: 768px) 46vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute top-3 left-3 w-8 h-8 rounded-full bg-[#FAF6EE]/95 text-[#751E29] font-display font-semibold text-[15px] flex items-center justify-center">
                    {index + 1}
                  </span>
                </div>
                <figcaption className="mt-3 text-[14px] text-[#4A423C] leading-snug">{story.caption}</figcaption>
              </figure>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
