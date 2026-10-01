import { contactContent } from "@/data/content";

function PinIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#7A1F2B"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

export default function ContactMap() {
  const { src, overlayLine1, overlayLine2 } = contactContent.map;

  return (
    <section className="w-full px-4 md:px-8 lg:px-12 py-8 bg-[#FAF6EE]">
      <div className="relative w-full rounded-2xl overflow-hidden" style={{ height: "420px" }}>
        {/* Muted Google Maps iframe */}
        <iframe
          src={src}
          width="100%"
          height="100%"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Vistaaram location — Sahastradhara Road, Dehradun"
          style={{
            border: "none",
            width: "100%",
            height: "100%",
            filter: "sepia(0.2) saturate(0.8) hue-rotate(-10deg)",
          }}
        />

        {/* Overlay card — bottom-left, hidden on mobile */}
        <div className="hidden md:flex absolute bottom-5 left-5 bg-white border border-[#E6DED2] rounded-xl px-4 py-3 shadow-md items-start gap-2.5 max-w-[280px]">
          <div className="mt-0.5 shrink-0">
            <PinIcon />
          </div>
          <div>
            <p className="text-[#7A1F2B] text-[13px] font-semibold leading-snug">
              {overlayLine1}
            </p>
            <p className="text-[#6B6259] text-[12px] leading-snug mt-0.5">
              {overlayLine2},<br />Dehradun – 248013
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
