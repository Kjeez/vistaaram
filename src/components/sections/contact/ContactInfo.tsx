import { contactContent } from "@/data/content";

/* ── Icons ────────────────────────────────── */

function DiyaIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C9A24B" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2C8 2 5 5 5 9c0 3 1.5 5.5 4 7l3 1 3-1c2.5-1.5 4-4 4-7 0-4-3-7-7-7z" />
      <path d="M12 9v4" />
      <path d="M9 12h6" />
      <path d="M12 19v3" />
      <path d="M8 22h8" />
    </svg>
  );
}

function EnvelopeIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C9A24B" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M2 7l10 7 10-7" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C9A24B" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.58 3.38 2 2 0 0 1 3.56 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.53a16 16 0 0 0 5.56 5.56l.83-.83a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="#25D366">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7A1F2B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

/* ── Card shell ───────────────────────────── */

function InfoCard({
  children,
  tint,
}: {
  children: React.ReactNode;
  tint?: string;
}) {
  return (
    <div
      className="flex items-start gap-4 rounded-xl border p-4"
      style={{
        background: tint ?? "white",
        borderColor: tint ? "#86EFAC40" : "#E6DED2",
        borderWidth: "1px",
      }}
    >
      {children}
    </div>
  );
}

function IconCircle({
  children,
  green,
}: {
  children: React.ReactNode;
  green?: boolean;
}) {
  return (
    <div
      className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
      style={{
        background: green ? "#D1FAE5" : "#FEF9EE",
        border: `1px solid ${green ? "#6EE7B7" : "#E8D9AA"}`,
      }}
    >
      {children}
    </div>
  );
}

/* ── Main component ───────────────────────── */

export default function ContactInfo() {
  const { cards, footnote } = contactContent.info;

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Address */}
      <InfoCard>
        <IconCircle>
          <DiyaIcon />
        </IconCircle>
        <div>
          <p className="text-[#C9A24B] text-[11px] font-semibold tracking-[0.14em] uppercase mb-1">
            {cards[0].label}
          </p>
          {cards[0].lines?.map((l, i) => (
            <p key={i} className="text-[#7A1F2B] text-[15px] font-medium leading-snug">
              {l}
            </p>
          ))}
        </div>
      </InfoCard>

      {/* Email */}
      <InfoCard>
        <IconCircle>
          <EnvelopeIcon />
        </IconCircle>
        <div>
          <p className="text-[#C9A24B] text-[11px] font-semibold tracking-[0.14em] uppercase mb-1">
            {cards[1].label}
          </p>
          <a
            href={cards[1].href}
            className="text-[#7A1F2B] text-[15px] font-medium hover:underline"
          >
            {cards[1].lines?.[0]}
          </a>
        </div>
      </InfoCard>

      {/* Phone */}
      <InfoCard>
        <IconCircle>
          <PhoneIcon />
        </IconCircle>
        <div>
          <p className="text-[#C9A24B] text-[11px] font-semibold tracking-[0.14em] uppercase mb-1">
            {cards[2].label}
          </p>
          <a
            href={cards[2].href}
            className="text-[#7A1F2B] text-[16px] font-semibold hover:underline block"
          >
            {cards[2].lines?.[0]}
          </a>
          {cards[2].note && (
            <p className="text-[#6B6259] text-[12px] mt-0.5">{cards[2].note}</p>
          )}
        </div>
      </InfoCard>

      {/* WhatsApp */}
      <InfoCard tint="#EAF5EC">
        <IconCircle green>
          <WhatsAppIcon />
        </IconCircle>
        <div className="flex flex-col gap-2 flex-1">
          <div>
            <p className="text-[#166534] text-[11px] font-semibold tracking-[0.14em] uppercase leading-none">
              {cards[3].label} &mdash;{" "}
              <span className="normal-case tracking-normal font-normal text-[#6B6259]">
                {cards[3].sublabel}
              </span>
            </p>
          </div>
          <a
            href={cards[3].href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 self-start border border-[#25D366] text-[#166534] text-[13px] font-semibold px-4 py-2 rounded-full hover:bg-[#25D366] hover:text-white transition-all duration-200"
          >
            <WhatsAppIcon />
            {cards[3].ctaText} &rarr;
          </a>
        </div>
      </InfoCard>

      {/* Footnote */}
      <p className="text-[#6B6259] text-[13px] italic mt-1" style={{ fontFamily: "var(--font-playfair-display)" }}>
        {footnote}
      </p>
    </div>
  );
}
