import PahadiDivider from "@/components/ui/PahadiDivider";
import { contactContent } from "@/data/content";

export default function ContactHeader() {
  const { eyebrow, headline, subline } = contactContent.header;

  return (
    <>
      <PahadiDivider className="py-4 bg-[#FAF6EE]" />
      <section className="relative w-full bg-[#FAF6EE] pt-12 pb-14 overflow-hidden">
        {/* Decorative mountain bg elements */}
        <div
          className="absolute inset-0 pointer-events-none select-none"
          aria-hidden="true"
          style={{
            backgroundImage:
              "url('/images/mountainelement.png')",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "left bottom",
            backgroundSize: "280px auto",
            opacity: 0.18,
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none select-none"
          aria-hidden="true"
          style={{
            backgroundImage: "url('/images/mountainelement.png')",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right bottom",
            backgroundSize: "280px auto",
            opacity: 0.18,
            transform: "scaleX(-1)",
          }}
        />

        <div className="relative z-10 max-w-[860px] mx-auto px-6 text-center">
          {/* Eyebrow */}
          <p
            className="text-[#C9A24B] font-semibold uppercase mb-4"
            style={{
              fontSize: "13px",
              letterSpacing: "0.18em",
              fontFamily: "var(--font-inter)",
            }}
          >
            {eyebrow}
          </p>

          {/* Headline */}
          <h1
            className="font-display font-medium text-[#7A1F2B] leading-tight mb-5"
            style={{
              fontSize: "clamp(2rem, 5vw, 2.75rem)",
            }}
          >
            {headline}
          </h1>

          {/* 48px gold rule */}
          <div className="flex justify-center mb-5">
            <div
              className="rounded-full"
              style={{
                width: "48px",
                height: "2px",
                background:
                  "linear-gradient(90deg, transparent, #C9A24B, transparent)",
              }}
            />
          </div>

          {/* Subline */}
          <p
            className="text-[#6B6259] leading-relaxed max-w-[560px] mx-auto"
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "16px",
            }}
          >
            {subline}
          </p>
        </div>
      </section>
    </>
  );
}
